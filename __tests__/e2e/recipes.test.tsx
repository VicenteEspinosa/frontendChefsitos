import puppeteer from 'puppeteer'
import logUser from './users/login.test'

describe('rescipes features', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
    })
    page = await browser.newPage()
    await logUser(page)
  })
  
  describe('show recipes', () => {
    it('redirects to /recipes', async () => {
      await page.waitForSelector('.recipes-link')
      await page.click('.recipes-link')
      await page.waitForNavigation()
      expect(page.url()).toBe("http://localhost:3000/recipes");
    })
  })

  describe('create recipe', () => {
    it('redirects to /recipes/new', async () => {
      await page.waitForSelector('.new-recipe-link')
      await page.click('.new-recipe-link')
      await page.waitForNavigation()
      expect(page.url()).toBe("http://localhost:3000/recipes/new");
    })

    it('shows alert for empty instructions', async () => {
      await page.type('.name-field', 'test-recipe')
      await page.click('.submit-button')
      await page.waitForSelector('.warning', { visible: true })
      const alert = await page.$('.warning');
      const boundingBox = await alert?.boundingBox();
      expect(boundingBox).not.toBe(null);
      const text = await page.$eval(".warning", (e) => e.textContent);
      expect(text).toBe("Las instrucciones deben tener una imagen o una descripción");
    })

    it('shows alert for empty ingredients', async () => {
      await page.type('.item-field', 'test-instruction')
      await page.click('.submit-button')
      const text = await page.$eval(".warning", (e) => e.textContent);
      expect(text).toBe("Debes completar todos los campos de los ingredientes");
    })

    it('create recipe correctly', async () => {
      await page.click('.ingredients-field')
      await page.type('.ingredients-field', 'huevo')
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.type('.quantity-field', '1')
      await page.click('.measurements-field')
      await page.type('.ingredients-field', 'unidad')
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.click('.submit-button')
      await page.waitForNavigation()
      expect(page.url()).not.toBe("http://localhost:3000/recipes/new");
      await page.waitForSelector('h1', { visible: true })
      const text = await page.$eval("h1", (e) => e.textContent);
      expect(text).toBe("test-recipe");
    })

    it('delete recipe correctly', async () => {
      await page.click('.delete-button')
      await page.waitForNavigation()
      expect(page.url()).toBe("http://localhost:3000/profile");
    })
  })
  afterAll(() => browser.close())
})