import puppeteer, { Page, Browser } from 'puppeteer'

const fillRegisterForm = async (page: Page, username: string) => {
  await page.type('.username-field', username)
  await page.type('.confirm-username-field', username)
  await page.type('.email-field', 'test@test.cl')
  await page.type('.first-name-field', 'test')
  await page.type('.last-name-field', 'username')
  await page.type('.confirm-email-field', 'test@test.cl')
  await page.type('.password-field', 'password')
  await page.type('.confirm-password-field', 'password')
  await page.click('button')
    
}

describe('register feature', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: process.env.E2E_HEADLESS === 'false' ? false : true,
      executablePath: '/usr/bin/chromium-browser',
    })
    page = await browser.newPage()
  })

  it('shows alert when user is not logged correctly', async () => {
    await page.goto('http://localhost:3000/register')
    await page.waitForSelector('.username-field')
    await fillRegisterForm(page, 'admin')
    await page.waitForSelector('.warning', { visible: true })
    const alert = await page.$('.warning');
    const boundingBox = await alert?.boundingBox();
    expect(boundingBox).not.toBe(null);
  })
  
  it('redirects when user is register correctly', async () => {
    await page.goto('http://localhost:3000/register')
    await page.waitForSelector('.username-field')
    await fillRegisterForm(page, 'test-username')
    await page.waitForNavigation()
    await page.waitForSelector('h1')
    
    const text = await page.$eval("h1", (e) => e.textContent);
    expect(text).toBe("Bienvenido test a RecipeLib");
  })

  it('redirects when user is deleted correctly', async () => {
    await page.goto('http://localhost:3000/profile')
    await page.waitForSelector('.delete-button')
    await page.click('.delete-button')
    await page.waitForNavigation()
    expect(page.url()).toBe("http://localhost:3000/profile/delete");
    await page.waitForNavigation()
    expect(page.url()).toBe("http://localhost:3000/");
    await page.waitForNavigation()
    expect(page.url()).toBe("http://localhost:3000/login");
  })

  afterAll(() => browser.close())
})