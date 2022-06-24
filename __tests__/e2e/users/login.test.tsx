import puppeteer from 'puppeteer'

const logUser = async (page: puppeteer.Page) => {
  await page.goto('http://localhost:3000/login')
  await page.waitForSelector('.username-field')
  await page.type('.username-field', 'admin')
  await page.type('.password-field', 'admin')
  await page.click('.login-button')
  await page.waitForNavigation()
}

describe('login feature', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: process.env.E2E_HEADLESS === 'false' ? false : true,
      executablePath: '/usr/bin/chromium-browser',
    })
    page = await browser.newPage()
  })

  it('shows alert when user is not logged correctly', async () => {
    await page.goto('http://localhost:3000/login')
    await page.waitForSelector('.login-button')
    await page.type('.username-field', '.')
    await page.type('.password-field', '.')
    await page.click('.login-button')
    await page.waitForSelector('.warning', { visible: true })
    const alert = await page.$('.warning');
    const boundingBox = await alert?.boundingBox();
    expect(boundingBox).not.toBe(null);
  })
  
  it('redirects when user is logged correctly', async () => {
    await logUser(page);
    await page.waitForSelector('h1')
    const text = await page.$eval("h1", (e) => e.textContent);
    expect(text).toBe("Bienvenido Administrador a RecipeLib");
  })

  afterAll(() => browser.close())
})

export default logUser;
