import { chromium } from 'k6/experimental/browser'
import { sleep, check } from 'k6'
import http from 'k6/http'
import { setTimeout } from 'k6/experimental/timers'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'

export const options = {
	scenarios: {
		// openDashboardAndViewDetails: {
		// 	executor: 'constant-vus',
		// 	exec: 'openDashboardAndViewDetails',
		// 	vus: 1,
		// 	duration: '10m',
		// },
		// openDashboardWithDj: {
		// 	executor: 'constant-vus',
		// 	exec: 'openDashboardWithDj',
		// 	vus: 1,
		// 	duration: '12m',
		// },
		openCashieringAndSearchForDonor: {
			executor: 'constant-vus',
			exec: 'openCashieringAndSearchForDonor',
			vus: 2,
			duration: '9m',
		},
		openCSRAndTakeDonation: {
			executor: 'constant-vus',
			exec: 'openCSRAndTakeDonation',
			vus: 2,
			duration: '10m',
		},
		OpenHospitalManagement: {
			executor: `constant-vus`,
			exec: `OpenHospitalManagement`,
			vus: 637,
			duration: `9m`,
		},
		GetHospitalLogo: {
			executor: `constant-vus`,
			exec: `GetHospitalLogo`,
			vus: 650,
			duration: `10m`,
		},
		GetDonorFromBarcode: {
			executor: `constant-vus`,
			exec: `GetDonorFromBarcode`,
			vus: 637,
			duration: `11m`,
		},
		postCommentOnDonor: {
			executor: `constant-vus`,
			exec: `postCommentOnDonor`,
			vus: 6,
			duration: `3m`,
		},
	},
	thresholds: {
		http_req_failed: ['rate<0.01'],
		http_req_duration: ['p(90) < 1000', 'p(95) < 1500'],
		'webvital_first_contentful_paint': ['max < 4500', 'p(90) < 3500'],
		'webvital_first_input_delay': ['p(90) < 500'],
		'webvital_largest_content_paint': ['p(90) < 4500'],
		'webvital_first_input_delay{url:https://devadmin.mygift4kids.org/#/cashieringdashboard}': ['p(90) < 4000'],
		'webvital_first_input_delay{url:https://devadmin.mygift4kids.org/#/donors}': ['p(90) < 6000'],
	},
}

export async function openDashboardAndViewDetails() {
	const browser = chromium.launch({ headless: true })
	const page = browser.newPage()

	const $loginBtn = page.locator(`[type="submit"]`)
	const $logoutBtn = page.locator(`[type=button]`)
	const $email = page.locator(`input[type="email"]`)
	const $password = page.locator(`input[type="password"]`)
	const $signInBtn = page.locator(`#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div > button`)
	const $detailsBtn = page.locator(`div.panel.panel-primary.dashboardDailyTotals.ng-star-inserted > div.panel-body > form > div:nth-child(8) > div > p > button`)
	const $closeDetailsModalBtn = page.locator(`app-modal:nth-child(2) > div > div > div > div.modal-footer > button`)

	try {
		await page.goto(`https://devdashboard.mygift4kids.org/`)

		await $logoutBtn.waitFor({ state: `visible`, timeout: 25000 })
		await $logoutBtn.click()
		await page.reload({ timeout: 35000, waitUntil: `load` })
		await $loginBtn.waitFor({ state: "visible", timeout: 25000 })
		await $loginBtn.click()
		
		await page.waitForNavigation({ waitUntil: "load" })
		await $email.waitFor({ state: "visible", timeout: 25000 })
		await $email.type(`cmnh01@cmnhospitals.org`)
		await $password.type(`randomMoti10#`)
		await $signInBtn.click()
		
		await page.waitForNavigation({ timeout: 60000, waitUntil: "load" })
		await $detailsBtn.waitFor({ state: `visible`, timeout: 25000 })
		await $detailsBtn.click()

		await $closeDetailsModalBtn.waitFor({ state: `visible`, timeout: 15000 })
		await $closeDetailsModalBtn.click()

		await $detailsBtn.waitFor({ state: `visible`, timeout: 25000 })

		check(page, {
			urlValue: page.url() == 'https://devdashboard.mygift4kids.org/dashboard',
			'details button is shown': $detailsBtn.isVisible() === true,
		})
	} finally {
		page.close()
		browser.close()
	}
}

export async function openDashboardWithDj() {
	const browser = chromium.launch({ headless: false })
	const page = browser.newPage()

	const $loginBtn = page.locator(`[type="submit"]`)
	const $logoutBtn = page.locator(`[type=button]`)
	const $email = page.locator(`input[type="email"]`)
	const $password = page.locator(`input[type="password"]`)
	const $signInBtn = page.locator(`#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div > button`)
	const $progressBar = page.locator(`body > app-root > div.texture > div > div > ng-component > main > div > div.dashboardSeats > div`)

	try {
		await page.goto(`https://devdashboard.mygift4kids.org/`)

		await $logoutBtn.waitFor({ state: `visible`, timeout: 25000 })
		await $logoutBtn.click()
		await page.reload({ timeout: 35000, waitUntil: `load` })
		await $loginBtn.waitFor({ state: "visible", timeout: 25000 })
		await $loginBtn.click()
		
		await page.waitForNavigation({ waitUntil: "load" })
		await $email.waitFor({ state: "visible", timeout: 25000 })
		await $email.type(`cmnh02@cmnhospitals.org`)
		await $password.type(`randomMoti20#`)
		await $signInBtn.click()
		
		await page.waitForNavigation({ timeout: 60000, waitUntil: "load" })
		await $progressBar.waitFor({ state: `visible`, timeout: 25000 })
		await $progressBar.click()


		check(page, {
			urlValue: page.url() == 'https://devdashboard.mygift4kids.org/dashboard',
			'details button is shown': $progressBar.isVisible() === true,
		})
	} finally {
		page.close()
		browser.close()
	}
}

export async function openCSRAndTakeDonation() {
	const browser = chromium.launch({ headless: true })
	const browserContext = browser.newContext()
	const page = browserContext.newPage()

	const $callForDonationYesBtn = page.locator(`app-answer-call-ask-if-donation > div > div > div > button.btn.btn-success`)
	const $haveMailNoBtn = page.locator(`app-answer-call-ask-if-appeal > div > div > div > button.btn.btn-danger`)
	const $authEmail = page.locator(`input[type="email"]`)
	const $authPassword = page.locator(`input[type="password"]`)
	const $signInBtn = page.locator(`#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > div > button`)
	const $newDonorBtn = page.locator(`app-answer-call-donor-find > form > div:nth-child(2) > div > div > button.btn.btn-sm.btn-primary`)
	
	const $firstName = page.locator(`#firstName`)
	const $lastName = page.locator(`#lastName`)
	const $email = page.locator(`#email`)
	const $telephone = page.locator(`#telephone`)
	const $postalCode = page.locator(`#postalCode`)
	const $saveNewDonorBtn = page.locator(`.btn-success`)
	
	const $verifyAddressModalIgnoreBtn = page.locator(`.btn-warning`)
	const $donationAmount = page.locator(`#donationAmount`)

	// const $iframeCCNumberInput = page.frameLocator(`#braintree-hosted-field-number`).getByText(`credit-card-number`)
	// const $iframeCCMonthExpInput = frame.$(`#braintree-hosted-field-expirationMonth`).getByText(`expirationMonth`)
	// const $iframeCCYearExpInput = frame.$(`#braintree-hosted-field-expirationYear`).getByText(`expirationYear`)

	// const $savePaym=

	try {
		await page.goto(`https://devadmin.mygift4kids.org/#/answercallloginpop/79243/%2B/79`)

		await $callForDonationYesBtn.waitFor({ state: "visible", timeout: 25000 })
		await $callForDonationYesBtn.click()

		await page.waitForNavigation({ waitUntil: "load", timeout: 25000 })
		await $authEmail.waitFor({ state: "visible", timeout: 25000 })
		await $authEmail.type(`pieuser@cmnhospitals.org`)
		await $authPassword.type(``)
		await $signInBtn.click()
		
		await page.waitForNavigation({ waitUntil: "load", timeout: 15000 })
		await $haveMailNoBtn.waitFor({ state: "visible", timeout: 25000 })
		await $haveMailNoBtn.click()

		await $newDonorBtn.waitFor({ state: `visible`, timeout: 15000 })
		await $newDonorBtn.click()
		
		await $firstName.waitFor({ state: "visible", timeout: 15000 })
		await $firstName.type(`davy`)
		await $lastName.type(`joens`)
		await $email.type(`davy@joens.org`)
		await $telephone.type(`1234567890`)
		await $postalCode.type(`57201`)
		await $saveNewDonorBtn.click()

		await $verifyAddressModalIgnoreBtn.waitFor({ state: `visible`, timeout: 25000 })
		await $verifyAddressModalIgnoreBtn.click()

		await $donationAmount.waitFor({ state: `visible`, timeout: 25000 })
		await $donationAmount.type(`250`)
		// await $iframeCCNumberInput.type(`4111111111111111`)
		// await $iframeCCMonthExpInput.type(`12`)
		// await $iframeCCYearExpInput.type(`2029`)
		// await $savePaymentInfoBtn.click()

		// await $confirmPaymentDetailsModalContinueBtn.waitFor({ state: `visible`, timeout: 45000 })
		// await $confirmPaymentDetailsModalContinueBtn.click()
		// await $paymentConfirmationCloseBtn.waitFor({ state: `visible`, timeout: 25000 })

		// await page.waitForNavigation({ waitUntil: `load`, timeout: 25000 })
		// await $commentForm.waitFor({ state: `visible`, timeout: 15000 })
		// await $donationCheckBtn.click()
		// await $saveCallBtn.click()

		// await page.waitForNavigation({ waitUntil: `load`, timeout: 30000 })
		// await $trunkNumber.waitFor({ state: `visible`, timeout: 25000 })

		check(page, {
			'did we get to saving new donor page': $haveMailNoBtn.isVisible() === true,
		})

	} catch(error) {
		console.log(`what is dis? `, error)
	} finally {
		page.close()
		browser.close()
	}
}

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
		await page.goto(`https://devadmin.mygift4kids.org/`)
		
		await $navbarLogin.waitFor({ state: "visible", timeout: 25000 })
		await $navbarLogin.click()
		await $loginBtn.waitFor({ state: "visible", timeout: 25000 })
		await $loginBtn.click()
		
		await page.waitForNavigation({ waitUntil: "load" })
		await $email.waitFor({ state: "visible", timeout: 25000 })
		await $email.type(`pieuser@cmnhospitals.org`)
		await $password.type(``)
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
			urlValue: page.url() == 'https://devadmin.mygift4kids.org/#/donors/donor/2481127',
			'edit button is shown': $editBtn.isVisible() === true,
		})
	} finally {
		page.close()
		browser.close()
	}
}

export function postCommentOnDonor() {
	const data = {
		donorId: 2481127,
  		comment: "dev comment from k6 load deving 6"
	}

	const response = http.post(`https://devwebapi.mygift4kids.org/api/DonorManagement/SaveComment`, JSON.stringify(data), {
		headers: { 
			'Content-Type': 'application/json-patch+json',
			'accept': 'text/plain',
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InBpZXVzZXIiLCJuYW1laWQiOiI1NzEyZTc1Yi04NjdhLTRlZjgtOWZmMi0zNmQwN2VhZTJhM2IiLCJyb2xlIjpbIkNTUiIsIkNhc2hpZXJpbmciLCJBZG1pbiIsIkhvc3BpdGFsTGlrZSIsIlByb2dyYW1zQWRtaW4iXSwibmJmIjoxNzAyNDgzMzUyLCJleHAiOjE3MDI0OTkxNTEsImlhdCI6MTcwMjQ4MzM1MiwiaXNzIjoiaHR0cHM6Ly90ZXN0Y21uaG9zcGl0YWxzLmF1dGgwLmNvbSIsImF1ZCI6IkVnWUE5NjVtYmNVTVBFUUpyRmY3Z0JzRVlpa2RsaXRRIn0.9mK2rzJXKxldt1b_boYf3MwG45EojclLwdXmxPbCY6s',

		},
	})
	// console.log(response.json())
	check(response, {
		'status is 200 for postCommentOnDonor': () => response.status === 200,
	})
	sleep(randomIntBetween(20, 45))
}

export function OpenHospitalManagement() {
	const response = http.get(`https://devwebapi.mygift4kids.org/api/OpenHospitalManagement/Get/2`)
	
	check(response, {
		'status is 200 for OpenHospitalManagement': () => response.status === 200,
	})
	sleep(2)
}

export function GetHospitalLogo() {
	const response = http.get(`https://devwebapi.mygift4kids.org/api/OpenHospitalManagement/GetHospitalLogo/1`)
	
	check(response, {
		'status is 200 for GetHospitalLogo' : () => response.status === 200,
	})
	sleep(2)
}

export function GetDonorFromBarcode() {
	const response = http.get(`https://devwebapi.mygift4kids.org/api/OpenDonorManagement/GetDonorFromBarcode/150989268/72390`)

	check(response, {
		'status is 200 for getDonorFromBarcode': () => response.status === 200,
	})
	sleep(1)
}