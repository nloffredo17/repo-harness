import { test, expect } from "@playwright/test";

test("home page loads and shows harness title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /repo harness starter kit/i })).toBeVisible();
  await expect(page.getByText(/one-command dev/i)).toBeVisible();
});
