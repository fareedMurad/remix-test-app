import { expect, test } from "@playwright/test";

export const myTest = test.extend({
  myPage: async ({ page }, use) => {
    await use(page);
    // Finished competition
    await expect(page.getByText("November Demo Competition")).toBeVisible();
    await expect(
      page.getByText("Challenge Accounts + Discount").first()
    ).toBeVisible();

    // In_progress competition
    await expect(page.getByText("December Demo Competition")).toBeVisible();
    await expect(page.getByText("Challenge Accounts + Cash")).toBeVisible();

    // Upcoming competition
    await expect(page.getByText("January Demo Competition")).toBeVisible();
    await expect(
      page.getByText("Challenge Accounts + Discount 2")
    ).toBeVisible();
  },
});
