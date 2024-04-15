import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import type { z } from "zod";

export async function makeRequest<Schema extends z.ZodType<any, any>>(
  config: AxiosRequestConfig,
  schema: Schema
) {
  const response = await axios<z.infer<Schema>>(config);
  const parsed = await schema.safeParseAsync(response.data);
  if (parsed.success) {
    response.data = parsed.data;
  } else {
    console.error(
      `Error parsing response from ${config.method} ${config.url}`,
      parsed.error
    );
  }
  return response;
}
