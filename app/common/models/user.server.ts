import { getAccessToken } from "../session.server";
import type { JSONResponse } from "./api.server";
import { api } from "./api.server";

export type User = {
  id: string;
  email: string;
  imageUrl: string;
  country?: {
    label: string;
    dial_code: string;
  };
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  stateName: string;
  phone: string;
  newsletterOptIn: boolean;
};

export const mockUser: User = {
  id: "1",
  email: "test@example.com",
  imageUrl: "https://placekitten.com/128/128",
  country: {
    label: "Yemen",
    dial_code: "+967",
  },
};

const mockToken = "reset_token_abc123";

export async function getUser(request: Request) {
  const token = await getAccessToken(request);
  const user = await api
    .get("users/current/profile", token)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return user;
}

export async function getUserById(id: User["id"]) {
  if (id === mockUser.id) {
    return mockUser;
  } else {
    return null;
  }
}

export async function getUserByEmail(email: User["email"]) {
  if (email === mockUser.email) {
    return mockUser;
  } else {
    return null;
  }
}

export async function verifyLogin(
  email: string,
  password: string
): Promise<User | null> {
  if (email === mockUser.email && password === "password") {
    return mockUser;
  } else {
    return null;
  }
}

export async function createAccount(params: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
  state?: string;
  phone?: string;
  password: string;
  newsletterOptIn: boolean;
  dial_code?: string;
}): Promise<JSONResponse> {
  const body = {
    firstName: params.firstName,
    lastName: params.lastName,
    nickname: params.username,
    state: params.state,
    email: params.email,
    country: params.country,
    phone: (params.dial_code ?? "") + params.phone,
    password: params.password,
    newsletterOptIn: params?.newsletterOptIn,
  };

  const user = await api
    .post("users/register", { ...body })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
  return user;
}

export async function updateAccount(
  params: {
    firstName: string;
    lastName: string;
    email?: string;
    country: string;
    phone: string;
    address: string;
    state: string;
    city: string;
    zipCode: string;
    newsletterOptIn?: boolean;
  },
  token: string
): Promise<JSONResponse> {
  const body = {
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    country: params.country,
    phone: params.phone,
    state: params.state,
    city: params.city,
    zipCode: params.zipCode,
    address: params.address,
    newsletterOptIn: Boolean(params?.newsletterOptIn),
  };

  const user = await api
    .put("users/current/profile", { ...body }, token)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return user;
}

export async function updatePassword(
  params: {
    oldPassword: string;
    newPassword: string;
  },
  token: string
): Promise<JSONResponse> {
  const body = {
    oldPassword: params.oldPassword,
    newPassword: params.newPassword,
  };

  const user = await api
    .post("users/changePassword", { ...body }, token)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return user;
}

export async function startPasswordReset(email: string): Promise<JSONResponse> {
  const body = {
    email,
  };

  const user = await api
    .post("users/forgotPassword", { ...body })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return user;
}

export async function finishPasswordReset(
  token: string,
  password: string
): Promise<{ error?: string } | void> {
  console.log("resetting password for user");
  if (token !== mockToken) {
    return { error: "token" };
  }
}
