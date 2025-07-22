import { chromium } from 'k6/experimental/browser'
import { check } from 'k6'

export async function openCashieringAndSearchForDonor() {
	const browser = chromium.launch({ headless: false })
	const page = browser.newPage()

	const $navbarLogin = page.locator(`#mainTopNavbar > ul > li:nth-child(3) > a`)
	const $loginBtn = page.locator(`app-login-page > div > div > div > button.btn.btn-primary`)
	const $email = page.locator(`input[type="email"]`)
	const $password = page.locator(`input[type="password"]`)
	const $signInBtn = page.locator(`#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div > button`)
	const $navBarDashboardsDropDown = page.locator(`#navbarDropdown1`)
	const $cashieringDashboardOption = page.locator(`#mainTopNavbar > ul > li.nav-item.show.dropdown > div > a:nth-child(3)`)
	const $donorSearchBtn = page.locator(`app-cashiering-dashboard > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(1) > a`)
	const $firstName = page.locator(`#firstName`)
	const $lastName = page.locator(`#lastName`)
	const $searchBtn = page.locator(`app-donor-advanced-search > form > div:nth-child(2) > div > button.btn.btn-sm.btn-success`)
	const $firstSearchResult = page.locator(`app-donor-advanced-search-list > div > table > tbody > tr:nth-child(2) > td:nth-child(1)`)
	const $editBtn = page.locator(`#ngb-nav-0-panel > div > div > form > div:nth-child(2) > div > button`)

	try {
		await page.goto(`https://testadmin.mygift4kids.org/`)
		
		await $navbarLogin.waitFor({ state: "visible", timeout: 25_000 })
		await $navbarLogin.click()
		await $loginBtn.waitFor({ state: "visible", timeout: 25_000 })
		await $loginBtn.click()
		
		await page.waitForNavigation({ waitUntil: "load" })
		await $email.waitFor({ state: "visible", timeout: 25000 })
		await $email.type(`pieuser@cmnhospitals.org`)
		await $password.type(`Miracles4Kids!`)
		await $signInBtn.click()
		
		await page.waitForNavigation({ timeout: 60000, waitUntil: "load" })
		await $navBarDashboardsDropDown.waitFor({ state: "visible", timeout: 25000 })
		await $navBarDashboardsDropDown.click()
		await $cashieringDashboardOption.waitFor({ state: "visible", timeout: 25000 })
		await $cashieringDashboardOption.click()

		await page.waitForNavigation({ timeout: 60000, waitUntil: "load" })
		await $donorSearchBtn.waitFor({ state: "visible", timeout: 25000 })
		await $donorSearchBtn.click()
		
		await page.waitForNavigation({ waitUntil: "load" })
		await $firstName.waitFor({ state: "visible", timeout: 25000 })
		await $firstName.type(`tim`)
		await $lastName.type(`watson`)
		await $searchBtn.click()

		await $firstSearchResult.waitFor({ state: "visible", timeout: 25000 })
		await $firstSearchResult.click()
		await page.waitForNavigation({ waitUntil: "load" })
		await $editBtn.waitFor({ state: "visible", timeout: 25000 })

		check(page, {
			urlValue: page.url() == 'https://testadmin.mygift4kids.org/#/donors/donor/2481127',
		})
	} finally {
		page.close()
		browser.close()
	}
}