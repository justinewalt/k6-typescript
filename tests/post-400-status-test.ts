import { sleep, check } from 'k6'
import { Options } from 'k6/options'
import http from 'k6/http'

export let options: Options = {
	vus: 1,
	duration: '5s'
}

const boby = 
    `{
      "friendsId": 1,
      "donorId": 1,
      "campaignId": 1,
      "firstName": "jim",
      "lastName": "test",
      "address1": "test street",
      "address2": "",
      "city": "burkshire",
      "stateId": 1,
      "state": "Alaska",
      "postalCode": "11111",
      "telephone": "1234567890",
      "email": "jim@test.org",
      "companyName": "company name here",
      "campaignName": "?"
    }`

export default () => {
	const response = http.post(
		`https://devwebapi.mygift4kids.org/api/OpenDonorManagement/SaveFriendReferrals`,
		 boby,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	console.log(`what is response anyways? : `, response.json())

	check(response, {
		'status is 200 for save friends referral': () => response.status === 200,
	})

	sleep(2)
}

// { "remote_ip": "10.210.0.10", "remote_port": 443, "url": "https://testwebapi.mygift4kids.org/api/OpenDonorManagement/SaveFriendReferrals", "status": 400, "status_text": "400 Bad Request", "proto": "HTTP/2.0", "headers": { "Set-Cookie": "TiPMix=92.34763494899777; path=/; HttpOnly; Domain=testwebapi.mygift4kids.org; Max-Age=3600; Secure; SameSite=None, x-ms-routing-name=self; path=/; HttpOnly; Domain=testwebapi.mygift4kids.org; Max-Age=3600; Secure; SameSite=None, ARRAffinity=37b65ccfc490bef3ec5fcffaf1bbcee1e24af6a10d08891f93c66934c78186b9;Path=/;HttpOnly;Secure;Domain=testwebapi.mygift4kids.org, ARRAffinitySameSite=37b65ccfc490bef3ec5fcffaf1bbcee1e24af6a10d08891f93c66934c78186b9;Path=/;HttpOnly;SameSite=None;Secure;Domain=testwebapi.mygift4kids.org", "Content-Length": "884", "X-Powered-By": "ASP.NET", "Date": "Mon, 22 May 2023 14:49:26 GMT", "Content-Type": "application/problem+json; charset=utf-8", "Server": "Microsoft-IIS/10.0" }, "cookies": { "TiPMix": [{ "name": "TiPMix", "value": "92.34763494899777", "domain": "testwebapi.mygift4kids.org", "path": "/", "http_only": true, "secure": true, "max_age": 3600, "expires": -6795364578871 }], "x-ms-routing-name": [{ "name": "x-ms-routing-name", "value": "self", "domain": "testwebapi.mygift4kids.org", "path": "/", "http_only": true, "secure": true, "max_age": 3600, "expires": -6795364578871 }], "ARRAffinity": [{ "name": "ARRAffinity", "value": "37b65ccfc490bef3ec5fcffaf1bbcee1e24af6a10d08891f93c66934c78186b9", "domain": "testwebapi.mygift4kids.org", "path": "/", "http_only": true, "secure": true, "max_age": 0, "expires": -6795364578871 }], "ARRAffinitySameSite": [{ "name": "ARRAffinitySameSite", "value": "37b65ccfc490bef3ec5fcffaf1bbcee1e24af6a10d08891f93c66934c78186b9", "domain": "testwebapi.mygift4kids.org", "path": "/", "http_only": true, "secure": true, "max_age": 0, "expires": -6795364578871 }] }, "body": "{\"errors\":{\"\":[\"Error converting value \\\"\\\"friendReferrals\\\": [\\n    {\\n      \\\"friendsId\\\": 0,\\n      \\\"donorId\\\": 1,\\n      \\\"campaignId\\\": 1,\\n      \\\"firstName\\\": \\\"jim\\\",\\n      \\\"lastName\\\": \\\"test\\\",\\n      \\\"address1\\\": \\\"test street\\\",\\n      \\\"address2\\\": \\\"\\\",\\n      \\\"city\\\": \\\"burkshire\\\",\\n      \\\"stateId\\\": 1,\\n      \\\"state\\\": \\\"Alaska\\\",\\n      \\\"postalCode\\\": \\\"11111\\\",\\n      \\\"telephone\\\": \\\"1234567890\\\",\\n      \\\"email\\\": \\\"jim@test.org\\\",\\n      \\\"companyName\\\": \\\"company name here\\\",\\n      \\\"campaignName\\\": \\\"?\\\"\\n    }\\n]\\\" to type 'Donornet.ApplicationCore.Domain.DonorFriendReferrals'. Path '', line 1, position 513.\"],\"model\":[\"The model field is required.\"]},\"type\":\"https://tools.ietf.org/html/rfc7231#section-6.5.1\",\"title\":\"One or more validation errors occurred.\",\"status\":400,\"traceId\":\"00-66f4ceddc9c417e10c3229d1ef6ad55d-e3092c9b1a5d4f2d-00\"}", "timings": { "duration": 596.492, "blocked": 0.001, "looking_up": 0, "connecting": 0, "tls_handshaking": 0, "sending": 0.157, "waiting": 596.267, "receiving": 0.068 }, "tls_version": "tls1.2", "tls_cipher_suite": "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256", "ocsp": { "produced_at": 0, "this_update": 0, "next_update": 0, "revoked_at": 0, "revocation_reason": "", "status": "unknown" }, "error": "", "error_code": 1400, "request": { "method": "POST", "url": "https://testwebapi.mygift4kids.org/api/OpenDonorManagement/SaveFriendReferrals", "headers": { "User-Agent": ["k6/0.44.1 (https://k6.io/)"], "Content-Type": ["application/json-patch+json"], "Accept": ["*/*"] }, "body": "\"\\\"friendReferrals\\\": [\\n    {\\n      \\\"friendsId\\\": 0,\\n      \\\"donorId\\\": 1,\\n      \\\"campaignId\\\": 1,\\n      \\\"firstName\\\": \\\"jim\\\",\\n      \\\"lastName\\\": \\\"test\\\",\\n      \\\"address1\\\": \\\"test street\\\",\\n      \\\"address2\\\": \\\"\\\",\\n      \\\"city\\\": \\\"burkshire\\\",\\n      \\\"stateId\\\": 1,\\n      \\\"state\\\": \\\"Alaska\\\",\\n      \\\"postalCode\\\": \\\"11111\\\",\\n      \\\"telephone\\\": \\\"1234567890\\\",\\n      \\\"email\\\": \\\"jim@test.org\\\",\\n      \\\"companyName\\\": \\\"company name here\\\",\\n      \\\"campaignName\\\": \\\"?\\\"\\n    }\\n]\"", "cookies": { } } }