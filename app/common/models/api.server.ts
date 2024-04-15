import { authParams } from "../auth.server";

export type ApiErrorResponseData = {
  message?: string;
  field?: string;
  type?: string;
};

export type JSONResponse = {
  data?: any;
  message?: string;
  errors?: ApiErrorResponseData[];
};

export function getApiHeaders(token?: string) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "x-tenant": authParams.xTenant,
  });

  // ONLY FOR DEVELOPMENT PURPOSE -> WILL BE REMOVE ON PROD.
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // ONLY FOR DEVELOPMENT PURPOSE -> WILL BE REMOVE ON PROD.
  console.log(token, "TOkEN");

  return headers;
}

export const api = {
  get,
  post,
  put,
  delete: _delete,
};

async function get(url: string, token?: string) {
  const requestOptions = {
    method: "GET",
    headers: getApiHeaders(token),
  };
  const response = await fetch(authParams.baseURL + url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: any, token?: string) {
  const requestOptions = {
    method: "POST",
    headers: getApiHeaders(token),
    body: JSON.stringify(body),
  };
  const response = await fetch(authParams.baseURL + url, requestOptions);
  return handleResponse(response);
}

async function put(url: string, body: any, token?: string) {
  const requestOptions = {
    method: "PUT",
    headers: getApiHeaders(token),
    body: JSON.stringify(body),
  };

  const response = await fetch(authParams.baseURL + url, requestOptions);
  return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url: string) {
  const requestOptions = {
    method: "DELETE",
  };
  const response = await fetch(authParams.baseURL + url, requestOptions);
  return handleResponse(response);
}

// helper functions
async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const error = data || { message: "Something went wrong" };
    return Promise.reject(error);
  }
  return data || { message: "Success", status: response.status };
}
