import { test, expect } from "@playwright/test";

test("home renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Build the bureaucracy once.")).toBeVisible();
});

test("legal privacy page renders", async ({ page }) => {
  await page.goto("/legal/privacy");
  await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
});

test("dashboard redirects to sign-in when logged out", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/auth\/sign-in/);
});

test("admin redirects to sign-in when logged out", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/auth\/sign-in/);
});

test.describe("integration (optional)", () => {
  const run = process.env.E2E_RUN_INTEGRATION === "true";
  test.skip(!run, "Set E2E_RUN_INTEGRATION=true to run Supabase-backed E2E.");

  test("can sign in and reach dashboard", async ({ page }) => {
    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;
    test.skip(!email || !password, "Set E2E_EMAIL and E2E_PASSWORD.");

    await page.goto("/auth/sign-in");
    await page.getByLabel("Email").fill(email!);
    await page.getByLabel("Password").fill(password!);
    await page.getByRole("button", { name: "Sign in" }).click();

    await page.waitForURL("**/dashboard");
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });
});

