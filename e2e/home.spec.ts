import { test, expect } from '@playwright/test'

test('captura screenshot de la home', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await page.waitForSelector('h1')
  await page.screenshot({ path: 'e2e/screenshots/home.png', fullPage: true })
  expect(await page.title()).toContain('Agencia')
})
