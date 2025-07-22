import { sleep, check } from 'k6'
import { Options } from 'k6/options'
import { Counter } from 'k6/metrics'
import http from 'k6/http'

export const CounterErrors = new Counter('Errors')

export const options: Options = {
	scenarios: {
		OpenHospitalManagement: {
			executor: `constant-vus`,
			exec: `OpenHospitalManagement`,
			vus: 5,
			duration: `9m`,
		},
		GetHospitalLogo: {
			executor: `constant-vus`,
			exec: `GetHospitalLogo`,
			vus: 10,
			duration: `10m`,
		},
		GetDonorFromBarcode: {
			executor: `constant-vus`,
			exec: `GetDonorFromBarcode`,
			vus: 8,
			duration: `8m`,
		},
	},
	thresholds: {
		http_req_failed: ['rate<0.01'],
		http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
		'Errors': ['count<10'],
	},
}

export function OpenHospitalManagement() {
	const response = http.get(`https://devwebapi.mygift4kids.org/api/OpenHospitalManagement/Get/2`)
	
	check(response, {
		'status is 200': () => response.status === 200,
	})
	sleep(1)
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
	sleep(3)
}