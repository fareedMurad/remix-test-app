import { z } from "zod";

const oauthEnvironmentSchema = z.object({
  OAUTH_CLIENT_ID: z.string(),
  OAUTH_REDIRECT_URI: z.string(),
  OAUTH_AUTHORIZE_URI: z.string(),
  OAUTH_TOKEN_URI: z.string(),
  PROJECT_ID: z.string(),
});

// Use zod to parse oauth environment variables at the same time, giving one
// single error if any are missing
const oauthEnvironment = oauthEnvironmentSchema.parse(process.env);

export const oauthParams = {
  clientId: oauthEnvironment.OAUTH_CLIENT_ID,
  redirectUri: oauthEnvironment.OAUTH_REDIRECT_URI,
  authorizeUri: oauthEnvironment.OAUTH_AUTHORIZE_URI,
  tokenUri: oauthEnvironment.OAUTH_TOKEN_URI,
  projectId: oauthEnvironment.PROJECT_ID,
};
