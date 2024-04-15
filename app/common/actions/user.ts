import { getAccessToken } from "@fareeds-remix-app/common/session.server";
import { type DataFunctionArgs, json, redirect } from "@remix-run/node";
import {
  accountSecurityValidator,
  billingInformationvalidator,
  forgotPasswordValidator,
  registerValidator,
} from "@fareeds-remix-app/common/models/user.shared";
import { validationError } from "remix-validated-form";
import {
  createAccount,
  startPasswordReset,
  updateAccount,
  updatePassword,
} from "@fareeds-remix-app/common/models/user.server";

export const profileActions = async ({ request }: DataFunctionArgs) => {
  let formData = await request.formData();
  const token = (await getAccessToken(request)) ?? "";
  if (formData.get("action") === "billingInformationAction") {
    const result = await billingInformationvalidator.validate(formData);

    if (result.error) return validationError(result.error);
    const user = await updateAccount(result.data, token);
    if (user?.errors?.length) {
      const error = user?.errors?.[0];
      return validationError(
        { fieldErrors: { [error?.field ?? "firstName"]: error.message ?? "" } },
        result.data
      );
    }

    return user;
  } else if (formData.get("action") === "accountSecurityAction") {
    const result = await accountSecurityValidator.validate(formData);
    if (result.error) return validationError(result.error);
    const user = await updatePassword(result.data, token);
    if (user?.errors?.length) {
      const error = user?.errors?.[0];
      return validationError(
        {
          fieldErrors: { [error?.field ?? "oldPassword"]: error.message ?? "" },
        },
        result.data
      );
    }

    return user;
  }
};

export const signupActions = async ({ request }: DataFunctionArgs) => {
  const result = await registerValidator.validate(await request.formData());
  if (result.error) return validationError(result.error);

  const user = await createAccount(result.data);
  if (user?.errors?.length) {
    const error = user?.errors?.[0];
    return validationError(
      { fieldErrors: { [error?.field ?? "email"]: error.message ?? "" } },
      result.data
    );
  }
  return redirect(result.data.redirectTo ?? "");
};

export const forgotPasswordActions = async ({ request }: DataFunctionArgs) => {
  const result = await forgotPasswordValidator.validate(
    await request.formData()
  );
  if (result.error) return validationError(result.error);

  const data = await startPasswordReset(result.data.email);
  if (data?.errors?.length) {
    const error = data?.errors?.[0];
    return validationError(
      { fieldErrors: { [error?.field ?? "email"]: error.message ?? "" } },
      result.data
    );
  }
  return json({ success: true });
};
