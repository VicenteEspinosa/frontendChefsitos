import puppeteer from 'puppeteer'
import logUser from './users/login.test'

describe('rescipes features', () => {
  let browser: puppeteer.Browser
  let page: puppeteer.Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: process.env.E2E_HEADLESS === 'false' ? false : true,
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

    it('redirects to /recipe/:id', async () => {
      await page.waitForSelector('.recipe-image', { visible: true })
      await page.click('.recipe-image')
      await page.waitForNavigation()
      expect(page.url()).toContain("http://localhost:3000/recipes/");
    })

    it('like button works correctly', async () => {
      await page.waitForSelector('.like-icon', { visible: true })
      const initialLikes = await page.$eval(".likes-counter", (e) => e.textContent);
      await page.click('.like-icon')
      await page.waitForTimeout(1000)
      const likes = await page.$eval(".likes-counter", (e) => e.textContent);
      expect(initialLikes).not.toBe(likes);
    })

    it('dislike button works correctly', async () => {
      const initialDislikes = await page.$eval(".dislikes-counter", (e) => e.textContent);
      await page.click('.dislike-icon')
      await page.waitForTimeout(1000)
      const dislikes = await page.$eval(".dislikes-counter", (e) => e.textContent);
      expect(initialDislikes).not.toBe(dislikes);
    })
  })

  describe('create, edit and delete recipe', () => {
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
      await page.type('.measurements-field', 'unidad')
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.click('.submit-button')
      await page.waitForNavigation()
      expect(page.url()).not.toBe("http://localhost:3000/recipes/new");
      await page.waitForSelector('h1', { visible: true })
      const text = await page.$eval("h1", (e) => e.textContent);
      expect(text).toBe("test-recipe");
    })

    it('redirects to edit recipe page correctly', async () => {
      await page.click('.edit-button')
      await page.waitForNavigation()
      expect(page.url()).toContain("/edit");
    })

    it('edit recipe correctly', async () => {
      await page.waitForSelector('.tags-field', { visible: true })
      await page.click('.tags-field')
      await page.type('.tags-field', 'dulce')
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.click('.submit-button')
      await page.waitForNavigation()
      await page.waitForSelector('.tag-name', { visible: true })
      const text = await page.$eval(".tag-name", (e) => e.textContent);
      expect(text).toBe("dulce");
    })

    it('delete recipe correctly', async () => {
      await page.click('.delete-button')
      await page.waitForNavigation()
      expect(page.url()).toBe("http://localhost:3000/profile");
    })
  })
  afterAll(() => browser.close())
})