import { createCookieSessionStorage, redirect } from "@remix-run/node";
import * as crypto from "crypto";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET not set");
}

type SessionData = {
  accessToken: string;
  idToken: string;
  redirectUri: string;
  oauthCode: string;
  returnTo: string;
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production" && !process.env.CI,
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getAccessToken(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request);
  return session.get("accessToken");
}

export async function isAuthenticated(request: Request) {
  const accessToken = await getAccessToken(request);
  return accessToken !== undefined;
}

export async function requireAuthentication(request: Request) {
  const authenticated = await isAuthenticated(request);
  if (!authenticated) {
    throw redirect(`/login?return_to=${request.url}`, { status: 302 });
  }
}

function sha256Base64(str: string) {
  const hash = crypto.createHash("sha256");
  hash.update(str);
  return hash
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export type StartAuthenticationParams = {
  authorizeUri: string;
  clientId: string;
  redirectUri: string;
  projectId: string;
};

export async function startAuthentication(
  request: Request,
  params: StartAuthenticationParams
) {
  const code = "abc123-replaceme" + Math.random();
  const session = await getSession(request);
  session.flash("oauthCode", code);
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("return_to");
  if (returnTo) {
    session.flash("returnTo", returnTo);
  }

  const codeChallenge = sha256Base64(code);
  const redirectTo = `${params.authorizeUri}?client_id=${
    params.clientId
  }&redirect_uri=${encodeURIComponent(
    params.redirectUri
  )}&scope=openid%20profile%20email%20urn:zitadel:iam:user:resourceowner%20urn:zitadel:iam:org:project:id:zitadel:aud%20urn:zitadel:iam:org:project:id:${
    params.projectId
  }:aud%20urn:zitadel:iam:org:projects:roles&code_challenge=${codeChallenge}&code_challenge_method=S256&response_type=code`;
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export type FinishAuthenticationParams = {
  tokenUri: string;
  clientId: string;
  redirectUri: string;
};

export async function finishAuthentication(
  request: Request,
  params: FinishAuthenticationParams
) {
  const session = await getSession(request);
  const codeVerifier = session.get("oauthCode");
  const returnTo = session.get("returnTo");
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!codeVerifier || !code) {
    return redirect("/login");
  }
  const body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("code", code);
  body.append("redirect_uri", params.redirectUri);
  body.append("client_id", params.clientId);
  body.append("code_verifier", codeVerifier);
  const resp = await fetch(params.tokenUri, { method: "POST", body });
  if (!resp.ok) {
    throw new Error(await resp.text());
  }
  const json = await resp.json();
  session.set("accessToken", json.access_token);
  // session.set("idToken", json.id_token);
  return redirect(returnTo ?? "/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: json.expires_in,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
