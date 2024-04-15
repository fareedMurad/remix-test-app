import { getAccessToken } from "@fareeds-remix-app/common/session.server";
import { type DataFunctionArgs, json, redirect } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import {
  calculateChallengePrice,
  createChallenge,
  challengeFieldsSchema as challengeFieldsSchema1,
  orderDiscountAffiliateCodeSchema as orderDiscountAffiliateCodeSchema1,
} from "@fareeds-remix-app/common/models/challenge-form.server";
import { object } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

export const challengeFieldsSchema = withZod(
  object({
    ...challengeFieldsSchema1,
  })
);

export const orderDiscountAffiliateCodeSchema = withZod(
  object({
    ...orderDiscountAffiliateCodeSchema1,
  })
);

export const newChllengeActions = async ({ request }: DataFunctionArgs) => {
  let formData = await request.formData();

  const token = await getAccessToken(request);

  if (formData.get("action") === "challengeForm") {
    const result = await challengeFieldsSchema.validate(formData);
    if (result.error) return validationError(result.error);
    const challenge = await createChallenge(result.data, token);
    if (challenge?.errors?.length) {
      const error = challenge?.errors?.[0];
      return validationError(
        { fieldErrors: { [error?.field ?? "email"]: error.message ?? "" } },
        result.data
      );
    }
    return redirect(result.data.redirectTo ?? "");
  } else if (formData.get("action") === "orderListAndDiscount") {
    const result = await orderDiscountAffiliateCodeSchema.validate(formData);
    if (result.error) return validationError(result.error);
    const calculatePrice = await calculateChallengePrice(result.data);

    return json({ discounts: calculatePrice });
  }
};
