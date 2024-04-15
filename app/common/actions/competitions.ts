import { getAccessToken } from "@fareeds-remix-app/common/session.server";
import { type DataFunctionArgs, json } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { registerCompetition } from "@fareeds-remix-app/common/models/competitions.server";

import { zfd } from "zod-form-data";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const registerValidator = withZod(
  z.object({
    competitionId: zfd.text(z.string()),
  })
);

export async function competitionActions({ request }: DataFunctionArgs) {
  const result = await registerValidator.validate(await request.formData());
  if (result.error) return validationError(result.error);
  const token = await getAccessToken(request);
  const competition = await registerCompetition(
    result.data.competitionId,
    token
  );
  return json({ registered: true, competition });
}
