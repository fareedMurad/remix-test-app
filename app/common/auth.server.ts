import { z } from "zod";

const authEnvironmentSchema = z.object({
  API_BASE_URL: z.string(),
  X_TENANT: z.string(),
});

// Use zod to parse auth environment variables at the same time, giving one
// single error if any are missing
const authEnvironment = authEnvironmentSchema.parse(process.env ?? {});

export const authParams = {
  baseURL: authEnvironment.API_BASE_URL,
  xTenant: authEnvironment.X_TENANT,
};
