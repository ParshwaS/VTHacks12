function refreshCaptcha() {
	let buts = document.getElementsByTagName("button");
	if (buts.length > 2) {
		buts[2].click();
	} else {
		document.getElementById("username").dispatchEvent(new Event("change"));
	}
}

function taxFillingStatus(gstin) {
	return fetch(
		"https://services.gst.gov.in/services/api/search/taxpayerReturnDetails",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"content-type": "application/json;charset=UTF-8",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: "https://services.gst.gov.in/services/searchtp",
			referrerPolicy: "no-referrer-when-downgrade",
			body: `{\"gstin\":\"${gstin}\",\"captcha\":\"\"}`,
			method: "POST",
			mode: "cors",
			credentials: "include",
		}
	).then((res) => {
		return res.json();
	});
}

function taxPayerDetails(gstin, captcha) {
	return fetch(
		"https://services.gst.gov.in/services/api/search/taxpayerDetails",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"content-type": "application/json;charset=UTF-8",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: "https://services.gst.gov.in/services/searchtp",
			referrerPolicy: "no-referrer-when-downgrade",
			body: `{\"gstin\":\"${gstin}\",\"captcha\":\"${captcha}\"}`,
			method: "POST",
			mode: "cors",
			credentials: "include",
		}
	).then((res) => {
		return res.json();
	});
}

function checkLogin() {
	return fetch("https://services.gst.gov.in/services/api/ustatus", {
		headers: {
			accept: "application/json, text/plain, */*",
			"accept-language": "en-US,en;q=0.9",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
		},
		referrer: "https://services.gst.gov.in/services/login",
		referrerPolicy: "no-referrer-when-downgrade",
		body: null,
		method: "GET",
		mode: "cors",
		credentials: "include",
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.gstin) {
				return true;
			}
			return false;
		});
}

function statAPI() {
	return fetch(
		"https://services.gst.gov.in/services/auth/api/getAPIAccessStatus",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-US,en;q=0.9",
				"sec-ch-ua":
					'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://services.gst.gov.in/services/auth/manageapiaccess",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	).then((res) => res.json());
}

function enableAPI() {
	return fetch(
		"https://services.gst.gov.in/services/auth/api/getAPIAccessStatus",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-US,en;q=0.9",
				"sec-ch-ua":
					'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://services.gst.gov.in/services/auth/manageapiaccess",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((res) => res.json())
		.then((res) => {
			return fetch(
				"https://services.gst.gov.in/services/auth/api/updateAPIAccessStatus",
				{
					headers: {
						accept: "application/json, text/plain, */*",
						"accept-language": "en-US,en;q=0.9",
						"content-type": "application/json;charset=UTF-8",
						"sec-ch-ua":
							'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
						"sec-ch-ua-mobile": "?0",
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin",
					},
					referrer:
						"https://services.gst.gov.in/services/auth/manageapiaccess",
					referrerPolicy: "strict-origin-when-cross-origin",
					body: '{"isAPIEnable":"Y","exDm":"43200"}',
					method: "POST",
					mode: "cors",
					credentials: "include",
				}
			).then((res) => res.json());
		});
}

function uploadSummary() {
	return fetch(
		"https://return.gst.gov.in/returns/auth/api/offline/upload/summary?rtn_prd=052021&rtn_typ=GSTR1",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-US,en;q=0.9",
				"sec-ch-ua":
					'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://return.gst.gov.in/returns/auth/gstr/offlineupload",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	).then((res) => res.json());
}

function uploadGSTR1(data) {
	data = JSON.parse(data);
	const formData = new FormData();
	var tmp = JSON.stringify(data.file);
	var blob = new Blob([tmp], { type: "application/json" });
	let file = new File([blob], "upload.json", {
		lastModified: Date.now(),
		type: "application/json",
	});
	formData.append("upFile", blob, "up.json");
	formData.append("ty", "ROUZ");
	formData.append("rtn_typ", "GSTR1");
	formData.append("ret_period", data.fp);
	return fetch("https://return.gst.gov.in/returndocs/offline/upload", {
		headers: {
			accept: "*/*",
			"accept-language": "en-US,en;q=0.9",
			"sec-ch-ua":
				'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			sz: "1278",
			"x-requested-with": "XMLHttpRequest",
		},
		referrer: "https://return.gst.gov.in/returns/auth/gstr/offlineupload",
		referrerPolicy: "strict-origin-when-cross-origin",
		body: formData,
		method: "POST",
		mode: "cors",
		credentials: "include",
	})
		.then((res) => res.json())
		.then((re) => {
			re.fp = fp;
			return fetch(
				"https://return.gst.gov.in/returns/auth/api/gstr1/upload",
				{
					headers: {
						accept: "application/json, text/plain, */*",
						"accept-language": "en-US,en;q=0.9",
						"content-type": "application/json;charset=UTF-8",
						"sec-ch-ua":
							'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
						"sec-ch-ua-mobile": "?0",
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin",
					},
					referrer:
						"https://return.gst.gov.in/returns/auth/gstr/offlineupload",
					referrerPolicy: "strict-origin-when-cross-origin",
					body: JSON.stringify(re),
					method: "POST",
					mode: "cors",
					credentials: "include",
				}
			).then((res) => res.json());
		});
}

function getPAN() {
	return fetch(
		"https://reg.gst.gov.in/registration/auth/api/amendnoncoredraft",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-US,en;q=0.9",
				"sec-ch-ua":
					'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://reg.gst.gov.in/registration/auth/amend/core/amendbusinessdetail",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((res) => res.json())
		.then((data) => {
			var x = data.asgdtls.filter((el) => {
				return el.ispas == "Y";
			});
			return { pan: x[0].pan.num, name: x[0].fn + " " + x[0].ln };
		});
}

function login(username, password, captcha) {
	return fetch("https://services.gst.gov.in/services/authenticate", {
		headers: {
			accept: "application/json, text/plain, */*",
			"accept-language": "en-US,en;q=0.9",
			"content-type": "application/json;charset=UTF-8",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
		},
		referrer: "https://services.gst.gov.in/services/login",
		referrerPolicy: "no-referrer-when-downgrade",
		body:
			'{"username":"' +
			username +
			'","password":"' +
			password +
			'","captcha":"' +
			captcha +
			'","mFP":"{\\"VERSION\\":\\"2.1\\",\\"MFP\\":{\\"Browser\\":{\\"UserAgent\\":\\"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36\\",\\"Vendor\\":\\"Google Inc.\\",\\"VendorSubID\\":\\"\\",\\"BuildID\\":\\"20030107\\",\\"CookieEnabled\\":true},\\"IEPlugins\\":{},\\"NetscapePlugins\\":{\\"Chromium PDF Plugin\\":\\"\\",\\"Chromium PDF Viewer\\":\\"\\",\\"Native Client\\":\\"\\"},\\"Screen\\":{\\"FullHeight\\":1080,\\"AvlHeight\\":1080,\\"FullWidth\\":1920,\\"AvlWidth\\":1920,\\"ColorDepth\\":24,\\"PixelDepth\\":24},\\"System\\":{\\"Platform\\":\\"Win32\\",\\"systemLanguage\\":\\"en-US\\",\\"Timezone\\":-330}},\\"ExternalIP\\":\\"\\",\\"MESC\\":{\\"mesc\\":\\"mi=2;cd=150;id=30;mesc=561540;mesc=581632\\"}}","deviceID":null,"type":"username"}',
		method: "POST",
		mode: "cors",
		credentials: "include",
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.message == "auth") {
				return { status: true, data };
			}
			return { status: false, data };
		});
}

function getDetailsGSTR1(ctin, inum, period) {
	var fyear = parseInt(period.substring(2));
	var month = parseInt(period.substring(0, 2));
	if (month <= 3) {
		fyear -= 1;
	}
	return fetch(
		`https://return.gst.gov.in/returns/auth/api/gstr1/invoice?ctin?=${ctin}&inum=${inum}_${fyear}&rtn_prd=${period}&sec_name=B2B&uploaded_by=SU`,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://return.gst.gov.in/returns/auth/gstr1/b2b/invoice/edit",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((res) => res.json())
		.then((invs) => {
			var inv;
			try {
				inv = invs.data.b2b[0].inv[0];
			} catch {
				inv = false;
			}
			if (inv == false) {
				return null;
			}
			let le = inv.itms.length;
			let temp = [];
			for (let j = 0; j < le; j++) {
				let itm = inv.itms[j];
				if (itm.itm_det.txval) {
					let ob = {
						stin: invs.data.b2b[0].ctin,
						inum: inv.inum,
						idt: inv.idt,
						rate: itm.itm_det.rt,
						val: itm.itm_det.txval,
						iamt: itm.itm_det.iamt || 0,
						camt: itm.itm_det.camt || 0,
						samt: itm.itm_det.samt || 0,
						tty: "I",
					};
					temp.push(ob);
				}
			}
			return temp;
		});
}

function getDetailsGSTR1CDN(ctin, inum, period) {
	var fyear = parseInt(period.substring(2));
	var month = parseInt(period.substring(0, 2));
	if (month <= 3) {
		fyear -= 1;
	}
	return fetch(
		`https://return.gst.gov.in/returns/auth/api/gstr1/invoice?ctin?=${ctin}&inum=${inum}_${fyear}&&rtn_prd=${period}&sec_name=CDNR&uploaded_by=SU`,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://return.gst.gov.in/returns/auth/gstr1/b2b/invoice/edit",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((res) => res.json())
		.then((invs) => {
			var inv;
			try {
				inv = invs.data.cdnr[0].nt[0];
			} catch {
				return null;
			}
			let le = inv.itms.length;
			let temp = [];
			for (let j = 0; j < le; j++) {
				let itm = inv.itms[j];
				if (itm.itm_det.txval) {
					let ob = {
						stin: invs.data.cdnr[0].ctin,
						inum: inv.nt_num,
						idt: inv.nt_dt,
						rate: itm.itm_det.rt,
						val: itm.itm_det.txval,
						iamt: itm.itm_det.iamt || 0,
						camt: itm.itm_det.camt || 0,
						samt: itm.itm_det.samt || 0,
						tty: inv.ntty,
						xtty: inv.tty,
					};
					temp.push(ob);
				}
			}
			return temp;
		});
}

function getMonthGSTR1B2B(period) {
	return fetch(
		`https://return.gst.gov.in/returns/auth/api/gstr1/invoice?rtn_prd=${period}&sec_name=B2B&uploaded_by=SU`,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-US,en;q=0.9",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://return.gst.gov.in/returns/auth/gstr1/b2b/invoice",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((response) => response.json())
		.then((data) => {
			let promises = [];
			if (data.status) {
				let len = data.data.processedInvoice.length;
				for (let i = 0; i < len; i++) {
					promises.push(
						getDetailsGSTR1(
							data.data.processedInvoice[i].ctin,
							data.data.processedInvoice[i].inum,
							period
						)
					);
				}
			}
			return Promise.all(promises).then((responses) => {
				var final = [];
				responses.forEach((res) => {
					if (res && res != null && res != undefined)
						final = final.concat(res);
				});
				return final;
			});
		});
}

function getMonthGSTR1CDN(period) {
	return fetch(
		`https://return.gst.gov.in/returns/auth/api/gstr1/invoice?rtn_prd=${period}&sec_name=CDNR&uploaded_by=SU`,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-US,en;q=0.9",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://return.gst.gov.in/returns/auth/gstr1/b2b/invoice",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((response) => response.json())
		.then((data) => {
			let promises = [];
			if (data.status) {
				let len = data.data.processedInvoice.length;
				for (let i = 0; i < len; i++) {
					promises.push(
						getDetailsGSTR1CDN(
							data.data.processedInvoice[i].ctin,
							data.data.processedInvoice[i].nt_num,
							period
						)
					);
				}
			}
			return Promise.all(promises).then((responses) => {
				var final = [];
				responses.forEach((res) => {
					if (res != null && res && res != undefined)
						final = final.concat(res);
				});
				return final;
			});
		});
}

async function getMonthGSTR1(period) {
	let x = await getMonthGSTR1B2B(period);
	let y = await getMonthGSTR1CDN(period);
	x = x.concat(y);
	return x;
}

function getGSTR1Full(start_year, end_year) {
	let promises = [];
	var curr_per = start_year.toString();
	end_year = end_year.toString();
	console.log({ start_year, end_year });
	var month = parseInt(curr_per.substring(0, 2));
	var year = parseInt(curr_per.substring(2, 6));
	var emonth = parseInt(end_year.substring(0, 2));
	var eyear = parseInt(end_year.substring(2, 6));
	if (eyear * 100 + emonth < year * 100 + month) {
		return false;
	}
	while (curr_per != end_year) {
		promises.push(getMonthGSTR1(curr_per));
		month = parseInt(month);
		month += 1;
		if (month == 13) {
			year += 1;
			month = 1;
		}
		if (month < 10) {
			month = "0" + month.toString();
		} else {
			month = month.toString();
		}
		curr_per = month + year.toString();
	}
	promises.push(getMonthGSTR1(curr_per));
	month = parseInt(month);
	month += 1;
	if (month == 13) {
		year += 1;
		month = 1;
	}
	if (month < 10) {
		month = "0" + month.toString();
	} else {
		month = month.toString();
	}
	curr_per = month + year.toString();
	promises.push(getMonthGSTR1(curr_per));
	return Promise.all(promises).then((responses) => {
		var final = [];
		responses.forEach((res) => {
			final = final.concat(res);
		});
		return { data: final, type: "gstr1" };
	});
}

function getMonthGSTR2AB2B(period) {
	return fetch(
		`https://return.gst.gov.in/returns/auth/api/gstr2a/ctin?rtn_prd=${period}&section_name=B2B`,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://return.gst.gov.in/returns/auth/gstr2/preview/b2bcounterpreview",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((response) => response.json())
		.then(async (data) => {
			if (data.cpty) {
				var ctin = Object();
				data.cpty.forEach((client) => {
					ctin[client.stin] = client.cname;
				});
				return fetch(
					`https://return.gst.gov.in/returns/auth/api/gstr2a/b2b?rtn_prd=${period}`,
					{
						headers: {
							accept: "application/json, text/plain, */*",
							"accept-language":
								"en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
						},
						referrer:
							"https://return.gst.gov.in/returns/auth/gstr2/preview/b2bcountersupplier",
						referrerPolicy: "no-referrer-when-downgrade",
						body: null,
						method: "GET",
						mode: "cors",
						credentials: "include",
					}
				)
					.then((response) => response.json())
					.then((b2b) => {
						var ttt = [];
						if (b2b.b2b) {
							b2b.b2b.forEach((client) => {
								var temp = Object();
								temp.stin = client.ctin;
								temp.name = ctin[client.ctin];
								temp.cfs = client.cfs;
								temp.cfs3b = client.cfs3b;
								temp.fldtr1 = client.fldtr1;
								temp.flprdr1 = client.flprdr1;
								temp.iseli = true;
								client.inv.forEach((inv) => {
									var temp2 = JSON.parse(
										JSON.stringify(temp)
									);
									temp2.idt = inv.idt;
									temp2.inum = inv.inum;
									temp2.inv_typ = inv.inv_typ;
									temp2.pos = inv.pos;
									temp2.rchrg = inv.rchrg;
									temp2.v = inv.val;
									temp2.tty = "I";
									let i = inv.itms.length;
									for (let j = 0; j < i; j++) {
										let itm = inv.itms[j];
										var temp3 = JSON.parse(
											JSON.stringify(temp2)
										);
										temp3.val = itm.itm_det.txval;
										temp3.iamt = itm.itm_det.iamt || 0;
										temp3.samt = itm.itm_det.samt || 0;
										temp3.camt = itm.itm_det.camt || 0;
										temp3.rate = itm.itm_det.rt;
										if (temp3.rate != 0) {
											ttt.push(temp3);
										}
									}
								});
							});
						}
						return ttt;
					});
			}
			return [];
		});
}

function getMonthGSTR2ACDN(period) {
	return fetch(
		`https://return.gst.gov.in/returns/auth/api/gstr2a/ctin?rtn_prd=${period}&section_name=CDN`,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer:
				"https://return.gst.gov.in/returns/auth/gstr2/preview/b2bcounterpreview",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((response) => response.json())
		.then(async (data) => {
			if (data.cpty) {
				var ctin = Object();
				data.cpty.forEach((client) => {
					ctin[client.stin] = client.cname;
				});
				return fetch(
					`https://return.gst.gov.in/returns/auth/api/gstr2a/cdn?rtn_prd=${period}`,
					{
						headers: {
							accept: "application/json, text/plain, */*",
							"accept-language":
								"en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
							"sec-fetch-dest": "empty",
							"sec-fetch-mode": "cors",
							"sec-fetch-site": "same-origin",
						},
						referrer:
							"https://return.gst.gov.in/returns/auth/gstr2/preview/b2bcountersupplier",
						referrerPolicy: "no-referrer-when-downgrade",
						body: null,
						method: "GET",
						mode: "cors",
						credentials: "include",
					}
				)
					.then((response) => response.json())
					.then((b2b) => {
						var ttt = [];
						if (b2b.cdn) {
							b2b.cdn.forEach((client) => {
								var temp = Object();
								temp.stin = client.ctin;
								temp.name = ctin[client.ctin];
								temp.cfs = client.cfs;
								temp.cfs3b = client.cfs3b;
								temp.fldtr1 = client.fldtr1;
								temp.flprdr1 = client.flprdr1;
								temp.iseli = true;
								temp.fp = period;
								client.nt.forEach((inv) => {
									var temp2 = JSON.parse(
										JSON.stringify(temp)
									);
									temp2.idt = inv.nt_dt;
									temp2.inum = inv.nt_num;
									temp2.inv_typ = inv.inv_typ;
									temp2.pos = inv.pos;
									temp2.rchrg = inv.rchrg;
									temp2.v = inv.val;
									temp2.tty = inv.ntty;
									let i = inv.itms.length;
									for (let j = 0; j < i; j++) {
										let itm = inv.itms[j];
										var temp3 = JSON.parse(
											JSON.stringify(temp2)
										);
										temp3.val = itm.itm_det.txval;
										temp3.iamt = itm.itm_det.iamt || 0;
										temp3.samt = itm.itm_det.samt || 0;
										temp3.camt = itm.itm_det.camt || 0;
										temp3.rate = itm.itm_det.rt;
										if (temp3.rate != 0) {
											ttt.push(temp3);
										}
									}
								});
							});
						}
						return ttt;
					});
			}
			return [];
		});
}

async function getMonthGSTR2A(period) {
	let x = await getMonthGSTR2AB2B(period);
	let y = await getMonthGSTR2ACDN(period);
	x = x.concat(y);
	return x;
}

function getGSTR2AFull(start_year, end_year) {
	promises = [];
	var curr_per = start_year.toString();
	end_year = end_year.toString();
	var month = parseInt(curr_per.substring(0, 2));
	var year = parseInt(curr_per.substring(2, 6));
	var emonth = parseInt(end_year.substring(0, 2));
	var eyear = parseInt(end_year.substring(2, 6));
	if (eyear * 100 + emonth < year * 100 + month) {
		return false;
	}
	while (curr_per != end_year) {
		promises.push(getMonthGSTR2A(curr_per));
		month = parseInt(month);
		month += 1;
		if (month == 13) {
			year += 1;
			month = 1;
		}
		console.log(curr_per);
		if (month < 10) {
			month = "0" + month.toString();
		} else {
			month = month.toString();
		}
		curr_per = month + year.toString();
	}
	promises.push(getMonthGSTR2A(curr_per));
	month = parseInt(month);
	month += 1;
	if (month == 13) {
		year += 1;
		month = 1;
	}
	console.log(curr_per);
	if (month < 10) {
		month = "0" + month.toString();
	} else {
		month = month.toString();
	}
	curr_per = month + year.toString();
	promises.push(getMonthGSTR2A(curr_per));
	return Promise.all(promises).then((responses) => {
		var final = [];
		responses.forEach((res) => {
			final = final.concat(res);
		});
		return { data: final, type: "gstr2A" };
	});
}

function getMe() {
	return fetch("https://services.gst.gov.in/services/auth/profile/detail", {
		headers: {
			accept: "application/json, text/plain, */*",
			"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
		},
		referrer: "https://services.gst.gov.in/services/auth/myprofile",
		referrerPolicy: "no-referrer-when-downgrade",
		body: null,
		method: "POST",
		mode: "cors",
		credentials: "include",
	})
		.then((res) => res.json())
		.then((details) => {
			return fetch(
				"https://services.gst.gov.in/returns/auth/api/filingsnapshot",
				{
					headers: {
						accept: "application/json, text/plain, */*",
						"accept-language": "en-US,en;q=0.9",
						at: "67f921b05b0d4416a3982838ea2f460f",
						"sec-ch-ua":
							'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
						"sec-ch-ua-mobile": "?0",
						"sec-fetch-dest": "empty",
						"sec-fetch-mode": "cors",
						"sec-fetch-site": "same-origin",
					},
					referrer:
						"https://services.gst.gov.in/services/auth/fowelcome",
					referrerPolicy: "strict-origin-when-cross-origin",
					body: null,
					method: "GET",
					mode: "cors",
					credentials: "include",
				}
			)
				.then((res) => res.json())
				.then((det) => {
					var juridiction = details.ctj;
					if (details.stj.includes("(Jurisdictional Office)")) {
						juridiction = details.stj;
					}
					console.log(det.currFilingPref);
					return {
						gstn: details.gstin,
						trade_name: details.tradeNam,
						legal_name: details.lgnm,
						juridiction,
						registered_number: details.contacted.mobNum,
						registered_email: details.contacted.email,
						enrollment_date: details.rgdt,
						address: details.pradr.adr,
						curFP: det.data.currFilingPref,
						dty: details.dty,
					};
				});
		});
}

function getCredits() {
	return fetch(
		"https://services.gst.gov.in/services/auth/api/dashboard/itcashldg",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: "https://services.gst.gov.in/services/auth/dashboard",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	).then((res) => res.json());
}

function searchApplications(type, startDate, endDate) {
	return fetch("https://services.gst.gov.in/litserv/auth/api/case/search", {
		headers: {
			accept: "application/json, text/plain, */*",
			"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
			"content-type": "application/json;charset=UTF-8",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
		},
		referrer: "https://services.gst.gov.in/litserv/auth/case/search",
		referrerPolicy: "no-referrer-when-downgrade",
		body: `{\"caseTypeCd\":\"${type}\",\"startDate\":\"${startDate}\",\"endDate\":\"${endDate}\"}`,
		method: "POST",
		mode: "cors",
		credentials: "include",
	}).then((res) => {
		return res.json();
	});
}

function searchAllRefunds() {
	type = "RFUND";
	startDate = "01/08/2018";
	endDate = moment().format("DD/MM/YYYY");
	return fetch("https://services.gst.gov.in/litserv/auth/api/case/search", {
		headers: {
			accept: "application/json, text/plain, */*",
			"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
			"content-type": "application/json;charset=UTF-8",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
		},
		referrer: "https://services.gst.gov.in/litserv/auth/case/search",
		referrerPolicy: "no-referrer-when-downgrade",
		body: `{\"caseTypeCd\":\"${type}\",\"startDate\":\"${startDate}\",\"endDate\":\"${endDate}\"}`,
		method: "POST",
		mode: "cors",
		credentials: "include",
	}).then((res) => {
		return res.json();
	});
}

function refundStatus(arn) {
	return fetch(
		"https://publicservices.gst.gov.in/publicservices/pretrackarn?arn=" +
			arn,
		{
			credentials: "omit",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0",
				Accept: "application/json, text/plain",
				"Accept-Language": "en-US,en;q=0.9",
				"Content-Type": "application/json;charset=UTF-8",
				"Sec-Fetch-Dest": "empty",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Site": "same-site",
			},
			referrer: "https://services.gst.gov.in/",
			method: "GET",
			mode: "cors",
		}
	).then((res) => {
		return res.json();
	});
}

function auditHistory(arn, caseId) {
	return fetch(
		`https://services.gst.gov.in/litserv/auth/api/rfd/auditdata?arn=${arn}&caseId=${caseId}`,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: "https://services.gst.gov.in/litserv/auth/case/folder",
			referrerPolicy: "no-referrer-when-downgrade",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	).then((res) => {
		return res.json();
	});
}

function folderData(caseId, casetyp, gstin) {
	return fetch("https://services.gst.gov.in/litserv/auth/api/case/folder", {
		headers: {
			accept: "application/json, text/plain, */*",
			"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
			"content-type": "application/json;charset=UTF-8",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
		},
		referrer: "https://services.gst.gov.in/litserv/auth/case/folder",
		referrerPolicy: "no-referrer-when-downgrade",
		body: `{\"caseId\":${caseId},\"gstid\":\"${gstin}\",\"caseTypeCd\":\"${casetyp}\"}`,
		method: "POST",
		mode: "cors",
		credentials: "include",
	}).then((res) => {
		return res.json();
	});
}

function itemsData(caseId) {
	return fetch(
		"https://services.gst.gov.in/litserv/auth/api/case/folder/items",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"content-type": "application/json;charset=UTF-8",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: "https://services.gst.gov.in/litserv/auth/case/folder",
			referrerPolicy: "no-referrer-when-downgrade",
			body: `{\"caseFolderId\":${caseId}}`,
			method: "POST",
			mode: "cors",
			credentials: "include",
		}
	).then((res) => {
		return res.json();
	});
}

function docDownload(docId) {
	return fetch(
		"https://services.gst.gov.in/downloadhb/download?docId=" + docId,
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
				"content-type": "application/json;charset=UTF-8",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: "https://services.gst.gov.in/litserv/auth/case/folder",
			referrerPolicy: "no-referrer-when-downgrade",
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((res) => {
			return res.blob();
		})
		.then((blob) => {
			var url = window.URL.createObjectURL(blob);
			var a = document.createElement("a");
			a.href = url;
			a.download = "filename.pdf";
			document.body.appendChild(a);
			a.click();
			a.remove();
		});
}

function downloadGSTR3Bpdf(rtn_prd) {
	var sscope = Object();
	var shareData = {
		rtn_prd: rtn_prd,
	};
	sscope.servers = $().getServers();
	sscope.trans = trans.data;
	// var url = new URL(window.location.host + "auth/api/formdetails");
	// url.search = new URLSearchParams(params).toString();
	return fetch(
		"https://return.gst.gov.in/returns/auth/api/formdetails?rtn_prd=" +
			rtn_prd +
			"&rtn_typ=GSTR3B",
		{
			headers: {
				accept: "application/json, text/plain, */*",
				"accept-language": "en-US,en;q=0.9",
				"sec-ch-ua":
					'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"sec-ch-ua-mobile": "?0",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
			},
			referrer: "https://return.gst.gov.in/returns/auth/dashboard",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	)
		.then((res) => res.json())
		.then(
			function (response) {
				if (response.status === 1) {
					shareData.formDetails = response.data;
					//2B-3B Autopopulation - @Vishakha
					sscope.valid2Brel2rtnprd = validateGstr2bRetPrd(
						shareData,
						sscope
					);
					if (sscope.valid2Brel2rtnprd) {
						sscope.pdflglnm = "";
						sscope.pdftrdnm = "";
						sscope.pdfarn = "";
						sscope.pdfarndt = "";
						sscope.pdfauthSig = "";
						sscope.pdfdesig = "";
						return fetch(
							"https://return.gst.gov.in/returns/auth/api/gstr3b/getgenpdf?rtn_prd=" +
								rtn_prd,
							{
								headers: {
									accept: "application/json, text/plain, */*",
									"accept-language": "en-US,en;q=0.9",
									"sec-ch-ua":
										'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
									"sec-ch-ua-mobile": "?0",
									"sec-fetch-dest": "empty",
									"sec-fetch-mode": "cors",
									"sec-fetch-site": "same-origin",
								},
								referrer:
									"https://return.gst.gov.in/returns/auth/dashboard",
								referrerPolicy:
									"strict-origin-when-cross-origin",
								body: null,
								method: "GET",
								mode: "cors",
								credentials: "include",
							}
						)
							.then((res) => res.json())
							.then(
								function (response) {
									// $().blockPage(false);
									// console.log(response);
									if (response.status == 1) {
										shareData.gstr3bSummary = angular.copy(
											response.data.r3b
										);
										sscope.pdflglnm = shareData.pdflglnm =
											response.data.lglnm;
										sscope.pdftrdnm = shareData.pdftrdnm =
											response.data.trdnm;
										sscope.pdfarn = shareData.pdfarn =
											response.data.arn;
										sscope.pdfauthSig =
											shareData.pdfauthSig =
												response.data.authSig;
										sscope.pdfdesig = shareData.pdfdesig =
											response.data.desig;
										console.log(response.data);
										if (
											response.data != undefined &&
											response.data.arnDt != undefined &&
											checkForNull(response.data.arnDt)
										) {
											sscope.pdfarndt =
												shareData.pdfarndt =
													response.data.arnDt.replace(
														/-/g,
														"/"
													);
										}
										return downloadPdf(
											"FIL",
											shareData,
											sscope
										);
									} else {
										shareData.gstr3bSummary = {};
									}
								},
								function (response) {
									sscope.errorFlag =
										shareData.errorFlag = false;
									// console.log(response);
								}
							);
					} else {
						return fetch(
							"/returns/auth/api/gstr3b/summary?rtn_prd=" +
								shareData.rtn_prd
						)
							.then((res) => res.json())
							.then(
								function (response) {
									// $().blockPage(false);
									//console.log(response);
									if (response.status == 1) {
										shareData.gstr3bSummary = response.data;
									} else {
										shareData.gstr3bSummary = {};
									}
									sscope.calculateSummary();
									return downloadPdf(
										"FIL",
										shareData,
										sscope
									);
								},
								function (response) {
									// $().blockPage(false);
									//console.log(response);
								}
							);
					}
				}
			},
			function (response) {
				// $log.debug(response);
				// var url = $().getServers().GST_SERVICES_R1_URL + "/services/error/system";
				// $window.location.href = url;
				return null;
			}
		);
}

async function downloadPdf(filing_stat, shareData, sscope) {
	//console.log('actualmethod'+filing_stat);
	var status = filing_stat;
	if (!status) {
		status = sscope.filing;
	}

	(sscope.osupTaxvl = 0.0),
		(sscope.osupIamt = 0.0),
		(sscope.osupCamt = 0.0),
		(sscope.osupSamt = 0.0),
		(sscope.osupCsamt = 0.0),
		(sscope.osupZeroRatedTxval = 0.0),
		(sscope.osupZeroRatedIamt = 0.0),
		(sscope.osupZeroRatedCsamt = 0.0),
		(sscope.osupNilTxval = 0.0),
		(sscope.isupRevTxval = 0.0),
		(sscope.isupRevIamt = 0.0),
		(sscope.isupRevCamt = 0.0),
		(sscope.isupRevSamt = 0.0),
		(sscope.isupRevCsamt = 0.0),
		(sscope.isupNongstTxval = 0.0),
		(sscope.intrestIamt = 0.0),
		(sscope.intrestCamt = 0.0),
		(sscope.intrestSamt = 0.0),
		(sscope.intrestCsamt = 0.0),
		(sscope.lateFeeCamt = 0.0),
		(sscope.lateFeeSamt = 0.0),
		(sscope.interSupUnregTotalTax = 0.0),
		(sscope.interSupUnregIntTax = 0.0),
		(sscope.interSupCompTotalTax = 0.0),
		(sscope.interSupCompIntTax = 0.0),
		(sscope.intersupUINTotalTax = 0.0),
		(sscope.intersupUINIntTax = 0.0),
		(sscope.avITCIamt = 0.0),
		(sscope.avITCCamt = 0.0),
		(sscope.avITCSamt = 0.0),
		(sscope.avITCCsamt = 0.0),
		(sscope.revITCIamt = 0.0),
		(sscope.revITCCamt = 0.0),
		(sscope.revITCSamt = 0.0),
		(sscope.revITCCsamt = 0.0),
		(sscope.netITCIamt = 0.0),
		(sscope.netITCCamt = 0.0),
		(sscope.netITCSamt = 0.0),
		(sscope.netITCCsamt = 0.0),
		(sscope.inlgITCIamt = 0.0),
		(sscope.inlgITCCamt = 0.0),
		(sscope.inlgITCSamt = 0.0),
		(sscope.inlgITCCsamt = 0.0),
		(sscope.insupCompInter = 0.0),
		(sscope.insupCompIntra = 0.0),
		(sscope.insupNonGstInter = 0.0),
		(sscope.insupNonGstIntra = 0.0),
		(sscope.taxPaidItcIgst_Igst_amt = 0.0),
		(sscope.taxPaidItcIgst_Cgst_amt = 0.0),
		(sscope.taxPaidItcIgst_Sgst_amt = 0.0),
		(sscope.taxPaidCashNonRevigsttx = 0.0),
		(sscope.taxPaidCashNonRevigstintr = 0.0),
		(sscope.taxPaidItcCgst_Igst_amt = 0.0),
		(sscope.taxPaidItcCgst_Cgst_amt = 0.0),
		(sscope.taxPaidCashNonRevcgsttx = 0.0),
		(sscope.taxPaidCashNonRevcgstintr = 0.0),
		(sscope.taxPaidCashNonRevcgstfee = 0.0),
		(sscope.taxPaidItcSgst_Igst_amt = 0.0),
		(sscope.taxPaidItcSgst_Sgst_amt = 0.0),
		(sscope.taxPaidCashNonRevsgsttx = 0.0),
		(sscope.taxPaidCashNonRevsgstintr = 0.0),
		(sscope.taxPaidCashNonRevsgstfee = 0.0),
		(sscope.taxPaidItcCess_Cess_amt = 0.0),
		(sscope.taxPaidCashNonRevcesstx = 0.0),
		(sscope.taxPaidCashNonRevcessintr = 0.0),
		(sscope.taxPaidCashRevigsttx = 0.0),
		(sscope.taxPaidCashRevcgsttx = 0.0),
		(sscope.taxPaidCashRevsgsttx = 0.0),
		(sscope.taxPaidCashRevcesstx = 0.0);
	sscope.othRev_iamt = 0.0;
	sscope.othRev_camt = 0.0;
	sscope.othRev_samt = 0.0;
	sscope.othRev_csamt = 0.0;
	sscope.revrs_iamt = 0.0;
	sscope.revrs_camt = 0.0;
	sscope.revrs_samt = 0.0;
	sscope.revrs_csamt = 0.0;
	sscope.taxPaidCashNonRev = null;
	sscope.taxPaidCashRev = null;
	sscope.avITCIMPGiamt = 0.0;
	sscope.avITCIMPGcamt = 0.0;
	sscope.avITCIMPGsamt = 0.0;
	sscope.avITCIMPGcsamt = 0.0;
	sscope.avITCIMPSiamt = 0.0;
	sscope.avITCIMPScamt = 0.0;
	sscope.avITCIMPSsamt = 0.0;
	sscope.avITCIMPScsamt = 0.0;
	sscope.avITCISRCiamt = 0.0;
	sscope.avITCISRCcamt = 0.0;
	sscope.avITCISRCsamt = 0.0;
	sscope.avITCISRCcsamt = 0.0;
	sscope.avITCISDiamt = 0.0;
	sscope.avITCISDcamt = 0.0;
	sscope.avITCISDsamt = 0.0;
	sscope.avITCISDcsamt = 0.0;
	sscope.avITCOTHiamt = 0.0;
	sscope.avITCOTHcamt = 0.0;
	sscope.avITCOTHsamt = 0.0;
	sscope.avITCOTHcsamt = 0.0;
	sscope.revITCRULiamt = 0.0;
	sscope.revITCRULcamt = 0.0;
	sscope.revITCRULsamt = 0.0;
	sscope.revITCRULcsamt = 0.0;
	sscope.revITCOTHiamt = 0.0;
	sscope.revITCOTHcamt = 0.0;
	sscope.revITCOTHsamt = 0.0;
	sscope.revITCOTHcsamt = 0.0;
	sscope.inlgITCRULiamt = 0.0;
	sscope.inlgITCRULcamt = 0.0;
	sscope.inlgITCRULsamt = 0.0;
	sscope.inlgITCRULcsamt = 0.0;
	sscope.inlgITCOTHiamt = 0.0;
	sscope.inlgITCOTHcamt = 0.0;
	sscope.inlgITCOTHsamt = 0.0;
	sscope.inlgITCOTHcsamt = 0.0;

	var gstr3bsummData = shareData.gstr3bSummary;

	//table 3.1
	if (gstr3bsummData.sup_details) {
		if (gstr3bsummData.sup_details.osup_det) {
			sscope.osupTaxvl = gstr3bsummData.sup_details.osup_det.txval;
		}
		if (gstr3bsummData.sup_details.osup_det) {
			sscope.osupIamt = gstr3bsummData.sup_details.osup_det.iamt;
		}
		if (gstr3bsummData.sup_details.osup_det) {
			sscope.osupCamt = gstr3bsummData.sup_details.osup_det.camt;
		}
		if (gstr3bsummData.sup_details.osup_det) {
			sscope.osupSamt = gstr3bsummData.sup_details.osup_det.samt;
		}
		if (gstr3bsummData.sup_details.osup_det) {
			sscope.osupCsamt = gstr3bsummData.sup_details.osup_det.csamt;
		}
		if (gstr3bsummData.sup_details.osup_zero) {
			sscope.osupZeroRatedTxval =
				gstr3bsummData.sup_details.osup_zero.txval;
		}
		if (gstr3bsummData.sup_details.osup_zero) {
			sscope.osupZeroRatedIamt =
				gstr3bsummData.sup_details.osup_zero.iamt;
		}
		if (gstr3bsummData.sup_details.osup_zero) {
			sscope.osupZeroRatedCsamt =
				gstr3bsummData.sup_details.osup_zero.csamt;
		}
		if (gstr3bsummData.sup_details.osup_nil_exmp) {
			sscope.osupNilTxval =
				gstr3bsummData.sup_details.osup_nil_exmp.txval;
		}
		if (gstr3bsummData.sup_details.isup_rev) {
			sscope.isupRevTxval = gstr3bsummData.sup_details.isup_rev.txval;
		}
		if (gstr3bsummData.sup_details.isup_rev) {
			sscope.isupRevIamt = gstr3bsummData.sup_details.isup_rev.iamt;
		}
		if (gstr3bsummData.sup_details.isup_rev) {
			sscope.isupRevCamt = gstr3bsummData.sup_details.isup_rev.camt;
		}
		if (gstr3bsummData.sup_details.isup_rev) {
			sscope.isupRevSamt = gstr3bsummData.sup_details.isup_rev.samt;
		}
		if (gstr3bsummData.sup_details.isup_rev) {
			sscope.isupRevCsamt = gstr3bsummData.sup_details.isup_rev.csamt;
		}
		if (gstr3bsummData.sup_details.osup_nongst) {
			sscope.isupNongstTxval =
				gstr3bsummData.sup_details.osup_nongst.txval;
		}
	}

	//table 3.2
	if (gstr3bsummData.intr_ltfee) {
		if (gstr3bsummData.intr_ltfee.intr_details) {
			sscope.intrestIamt = gstr3bsummData.intr_ltfee.intr_details.iamt;
		}
		if (gstr3bsummData.intr_ltfee.intr_details) {
			sscope.intrestCamt = gstr3bsummData.intr_ltfee.intr_details.camt;
		}
		if (gstr3bsummData.intr_ltfee.intr_details) {
			sscope.intrestSamt = gstr3bsummData.intr_ltfee.intr_details.samt;
		}
		if (gstr3bsummData.intr_ltfee.intr_details) {
			sscope.intrestCsamt = gstr3bsummData.intr_ltfee.intr_details.csamt;
		}
		if (gstr3bsummData.intr_ltfee.ltfee_details) {
			sscope.lateFeeCamt = gstr3bsummData.intr_ltfee.ltfee_details.camt;
		}
		if (gstr3bsummData.intr_ltfee.ltfee_details) {
			sscope.lateFeeSamt = gstr3bsummData.intr_ltfee.ltfee_details.samt;
		}
	}

	//table 4
	if (gstr3bsummData.inter_sup) {
		angular.forEach(gstr3bsummData.inter_sup, function (val, key) {
			if (!val.empty) {
				if (angular.equals(key, "unreg_details")) {
					angular.forEach(val, function (obj) {
						// angular.forEach(value, function(val, label) {
						sscope.interSupUnregTotalTax += parseFloat(
							obj.txval.toString().replace("₹", "") || 0.0
						);
						sscope.interSupUnregIntTax += parseFloat(
							obj.iamt.toString().replace("₹", "") || 0.0
						);
					});
				}
			}
		});
		angular.forEach(gstr3bsummData.inter_sup, function (val, key) {
			if (!val.empty) {
				if (angular.equals(key, "comp_details")) {
					angular.forEach(val, function (obj) {
						// angular.forEach(value, function(val, label) {
						sscope.interSupCompTotalTax += parseFloat(
							obj.txval.toString().replace("₹", "") || 0.0
						);
						sscope.interSupCompIntTax += parseFloat(
							obj.iamt.toString().replace("₹", "") || 0.0
						);
					});
				}
			}
		});
		angular.forEach(gstr3bsummData.inter_sup, function (val, key) {
			if (!val.empty) {
				if (angular.equals(key, "uin_details")) {
					angular.forEach(val, function (obj) {
						//angular.forEach(value, function(val, label) {
						sscope.intersupUINTotalTax += parseFloat(
							obj.txval.toString().replace("₹", "") || 0.0
						);
						sscope.intersupUINIntTax += parseFloat(
							obj.iamt.toString().replace("₹", "") || 0.0
						);
					});
				}
			}
		});
	}

	//table 5

	if (gstr3bsummData.itc_elg) {
		angular.forEach(gstr3bsummData.itc_elg, function (val, key) {
			if (angular.equals(key, "itc_avl")) {
				angular.forEach(val, function (obj) {
					sscope.avITCIamt += parseFloat(
						obj.iamt.toString().replace("₹", "") || 0.0
					);
					sscope.avITCCamt += parseFloat(
						obj.camt.toString().replace("₹", "") || 0.0
					);
					sscope.avITCSamt += parseFloat(
						obj.samt.toString().replace("₹", "") || 0.0
					);
					sscope.avITCCsamt += parseFloat(
						obj.csamt.toString().replace("₹", "") || 0.0
					);
					if (sscope.valid2Brel2rtnprd) {
						switch (obj.ty) {
							case "IMPG":
								sscope.avITCIMPGiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCIMPGcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCIMPGsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCIMPGcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
							case "IMPS":
								sscope.avITCIMPSiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCIMPScamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCIMPSsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCIMPScsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
							case "ISRC":
								sscope.avITCISRCiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCISRCcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCISRCsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCISRCcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
							case "ISD":
								sscope.avITCISDiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCISDcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCISDsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCISDcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
							case "OTH":
								sscope.avITCOTHiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCOTHcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCOTHsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.avITCOTHcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
						}
					}
				});
			} else if (angular.equals(key, "itc_rev")) {
				angular.forEach(val, function (obj) {
					sscope.revITCIamt += parseFloat(
						obj.iamt.toString().replace("₹", "") || 0.0
					);
					sscope.revITCCamt += parseFloat(
						obj.camt.toString().replace("₹", "") || 0.0
					);
					sscope.revITCSamt += parseFloat(
						obj.samt.toString().replace("₹", "") || 0.0
					);
					sscope.revITCCsamt += parseFloat(
						obj.csamt.toString().replace("₹", "") || 0.0
					);
					if (sscope.valid2Brel2rtnprd) {
						switch (obj.ty) {
							case "RUL":
								sscope.revITCRULiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.revITCRULcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.revITCRULsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.revITCRULcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
							case "OTH":
								sscope.revITCOTHiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.revITCOTHcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.revITCOTHsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.revITCOTHcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
						}
					}
				});
			} else if (angular.equals(key, "itc_inelg")) {
				angular.forEach(val, function (obj) {
					sscope.inlgITCIamt += parseFloat(
						obj.iamt.toString().replace("₹", "") || 0.0
					);
					sscope.inlgITCCamt += parseFloat(
						obj.camt.toString().replace("₹", "") || 0.0
					);
					sscope.inlgITCSamt += parseFloat(
						obj.samt.toString().replace("₹", "") || 0.0
					);
					sscope.inlgITCCsamt += parseFloat(
						obj.csamt.toString().replace("₹", "") || 0.0
					);
					if (sscope.valid2Brel2rtnprd) {
						switch (obj.ty) {
							case "RUL":
								sscope.inlgITCRULiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.inlgITCRULcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.inlgITCRULsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.inlgITCRULcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
							case "OTH":
								sscope.inlgITCOTHiamt = parseFloat(
									obj.iamt.toString().replace("₹", "") || 0.0
								);
								sscope.inlgITCOTHcamt = parseFloat(
									obj.camt.toString().replace("₹", "") || 0.0
								);
								sscope.inlgITCOTHsamt = parseFloat(
									obj.samt.toString().replace("₹", "") || 0.0
								);
								sscope.inlgITCOTHcsamt = parseFloat(
									obj.csamt.toString().replace("₹", "") || 0.0
								);
								break;
						}
					}
				});
			}
			sscope.netITCIamt = sscope.avITCIamt - sscope.revITCIamt;
			sscope.netITCCamt = sscope.avITCCamt - sscope.revITCCamt;
			sscope.netITCSamt = sscope.avITCSamt - sscope.revITCSamt;
			sscope.netITCCsamt = sscope.avITCCsamt - sscope.revITCCsamt;
		});
	}
	sscope.insupArrInter = [];
	sscope.insupArrIntra = [];

	if (gstr3bsummData.inward_sup) {
		angular.forEach(gstr3bsummData.inward_sup.isup_details, function (obj) {
			sscope.insupArrInter.push(parseFloat(obj.inter));
			sscope.insupArrIntra.push(parseFloat(obj.intra));
		});
		sscope.insupCompInter = sscope.insupArrInter[0];
		sscope.insupCompIntra = sscope.insupArrIntra[0];
		sscope.insupNonGstInter = sscope.insupArrInter[1];
		sscope.insupNonGstIntra = sscope.insupArrIntra[1];
	}

	//table 6.1
	if (
		status != "NF" &&
		gstr3bsummData &&
		gstr3bsummData.qn &&
		gstr3bsummData.qn.q1 === "Y"
	) {
		let x = await createGstPdf(shareData, sscope);
		console.log(x);
		return x;
	} else if (status != "NF") {
		return fetch(
			"https://return.gst.gov.in/returns/auth/api/gstr3b/taxpayble?rtn_prd=" +
				sscope.rtn_prd,
			{
				headers: {
					accept: "*/*",
					"accept-language": "en-US,en;q=0.9",
					"sec-ch-ua":
						'" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"sec-ch-ua-mobile": "?0",
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin",
				},
				referrer: "https://return.gst.gov.in/returns/auth/dashboard",
				referrerPolicy: "strict-origin-when-cross-origin",
				body: null,
				method: "GET",
				mode: "cors",
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then(
				async function (response) {
					// $().blockPage(true);
					if (response.status == 1 && response.data.status == 2) {
						sscope.emptyString = null;
						if (response.data.returnsDbCdredList.tax_pay) {
							sscope.taxPayableNonRev =
								response.data.returnsDbCdredList.tax_pay[0];
							sscope.taxPayableRev =
								response.data.returnsDbCdredList.tax_pay[1];
						}
						if (
							response.data.returnsDbCdredList.tax_paid.pd_by_cash
						) {
							if (
								response.data.returnsDbCdredList.tax_paid
									.pd_by_cash[0]
							) {
								sscope.taxPaidCashNonRev =
									response.data.returnsDbCdredList.tax_paid
										.pd_by_cash[0].trancd === 30002
										? response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[0]
										: sscope.emptyString;

								sscope.taxPaidCashRev =
									response.data.returnsDbCdredList.tax_paid
										.pd_by_cash[0].trancd === 30003
										? response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[0]
										: sscope.emptyString;
							}

							if (
								response.data.returnsDbCdredList.tax_paid
									.pd_by_cash[1]
							) {
								sscope.taxPaidCashNonRev =
									response.data.returnsDbCdredList.tax_paid
										.pd_by_cash[1].trancd === 30002
										? response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[1]
										: sscope.emptyString;

								sscope.taxPaidCashRev =
									response.data.returnsDbCdredList.tax_paid
										.pd_by_cash[1].trancd === 30003
										? response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[1]
										: sscope.emptyString;
							}

							if (
								response.data.returnsDbCdredList.tax_paid
									.pd_by_cash[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_cash[1]
							) {
								sscope.taxPaidCashNonRev =
									response.data.returnsDbCdredList.tax_paid
										.pd_by_cash[0].trancd === 30002
										? response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[0]
										: response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[1];

								sscope.taxPaidCashRev =
									response.data.returnsDbCdredList.tax_paid
										.pd_by_cash[0].trancd === 30003
										? response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[0]
										: response.data.returnsDbCdredList
												.tax_paid.pd_by_cash[1];
							}
						}
						if (
							Object.keys(
								response.data.returnsDbCdredList.tax_paid
							).length > 0 &&
							response.data.returnsDbCdredList.tax_paid.pd_by_itc
						) {
							sscope.taxPaidItc =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0]
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0]
									: 0;
							sscope.taxPaidItcIgst_Igst_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].igst_igst_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].igst_igst_amt
									: 0;
							sscope.taxPaidItcIgst_Cgst_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].igst_cgst_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].igst_cgst_amt
									: 0;
							sscope.taxPaidItcIgst_Sgst_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].igst_sgst_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].igst_sgst_amt
									: 0;

							sscope.taxPaidItcCgst_Igst_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].cgst_igst_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].cgst_igst_amt
									: 0;
							sscope.taxPaidItcCgst_Cgst_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].cgst_cgst_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].cgst_cgst_amt
									: 0;

							sscope.taxPaidItcSgst_Igst_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].sgst_igst_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].sgst_igst_amt
									: 0;
							sscope.taxPaidItcSgst_Sgst_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].sgst_sgst_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].sgst_sgst_amt
									: 0;

							sscope.taxPaidItcCess_Cess_amt =
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0] &&
								response.data.returnsDbCdredList.tax_paid
									.pd_by_itc[0].cess_cess_amt
									? response.data.returnsDbCdredList.tax_paid
											.pd_by_itc[0].cess_cess_amt
									: 0;
						}
						if (sscope.taxPaidCashNonRev != null) {
							sscope.taxPaidCashNonRevigsttx =
								sscope.taxPaidCashNonRev.igst.tx;
							sscope.taxPaidCashNonRevigstintr =
								sscope.taxPaidCashNonRev.igst.intr;
							sscope.taxPaidCashNonRevcgsttx =
								sscope.taxPaidCashNonRev.cgst.tx;
							sscope.taxPaidCashNonRevcgstintr =
								sscope.taxPaidCashNonRev.cgst.intr;
							sscope.taxPaidCashNonRevcgstfee =
								sscope.taxPaidCashNonRev.cgst.fee;
							sscope.taxPaidCashNonRevsgsttx =
								sscope.taxPaidCashNonRev.sgst.tx;
							sscope.taxPaidCashNonRevsgstintr =
								sscope.taxPaidCashNonRev.sgst.intr;
							sscope.taxPaidCashNonRevsgstfee =
								sscope.taxPaidCashNonRev.sgst.fee;
							sscope.taxPaidCashNonRevcesstx =
								sscope.taxPaidCashNonRev.cess.tx;
							sscope.taxPaidCashNonRevcessintr =
								sscope.taxPaidCashNonRev.cess.intr;
						}
						if (sscope.taxPaidCashRev != null) {
							sscope.taxPaidCashRevigsttx =
								sscope.taxPaidCashRev.igst.tx;
							sscope.taxPaidCashRevcgsttx =
								sscope.taxPaidCashRev.cgst.tx;
							sscope.taxPaidCashRevsgsttx =
								sscope.taxPaidCashRev.sgst.tx;
							sscope.taxPaidCashRevcesstx =
								sscope.taxPaidCashRev.cess.tx;
						}
						let x = await createGstPdf(shareData, sscope);
						console.log(x);
						return x;
					} else {
						sscope.noLiab = true;
						let x = await createGstPdf(shareData, sscope);
						console.log(x);
						return x;
					}
				},
				function (response) {
					//console.log(response);
				}
			);
	}
}

async function createGstPdf(shareData, sscope) {
	var pdfname =
		"GSTR3B_" +
		shareData.gstr3bSummary.gstin +
		"_" +
		shareData.rtn_prd +
		".pdf";
	var text = sscope.valid2Brel2rtnprd ? "  FILED " : "  FINAL ";

	//GSTR2B-3B new GSTR3B pdf template download by - @Vishakha
	if (sscope.valid2Brel2rtnprd) {
		var contents = [
			{
				text: "Form GSTR-3B",
				style: "header",
			},
			{
				text: "[See rule 61(5)]",
				style: ["italicText", "centerAlign"],
			},
			{
				marginTop: 20,
				marginLeft: 360,
				layout: {
					hLineWidth: function (i, node) {
						return 0.5;
					},
					vLineWidth: function (i, node) {
						return 0.5;
					},
				},
				table: {
					widths: [75, 100],
					body: [
						[
							{
								text: "Year",
								bold: true,
								fontSize: 9,
								fillColor: "#FAD2B1",
							},
							{ text: shareData.formDetails.fy, fontSize: 9 },
						],
						[
							{
								text: "Period",
								bold: true,
								fontSize: 9,
								fillColor: "#FAD2B1",
							},
							{ text: shareData.formDetails.fm, fontSize: 9 },
						],
					],
				},
			},
			{
				marginTop: 20,
				layout: {
					hLineWidth: function (i, node) {
						return 0.5;
					},
					vLineWidth: function (i, node) {
						return 0.5;
					},
				},
				table: {
					widths: [200, "*"],
					body: [
						[
							{
								text: "1. GSTIN",
								style: "leftAlign",
								fontSize: 8,
								fillColor: "#FAD2B1",
							},
							{ text: shareData.formDetails.gstin, fontSize: 8 },
						],
						[
							{
								text: "2(a). Legal name of the registered person",
								style: "leftAlign",
								fontSize: 8,
								fillColor: "#FAD2B1",
							},
							{ text: sscope.pdflglnm, fontSize: 8 },
						],
						[
							{
								text: "2(b). Trade name, if any",
								style: "leftAlign",
								fontSize: 8,
								fillColor: "#FAD2B1",
							},
							{ text: sscope.pdftrdnm, fontSize: 8 },
						],
						[
							{
								text: "2(c). ARN",
								style: "leftAlign",
								fontSize: 8,
								fillColor: "#FAD2B1",
							},
							{ text: sscope.pdfarn, fontSize: 8 },
						],
						[
							{
								text: "2(d). Date of ARN",
								style: "leftAlign",
								fontSize: 8,
								fillColor: "#FAD2B1",
							},
							{ text: sscope.pdfarndt, fontSize: 8 },
						],
					],
				},
			},
			{
				marginTop: 10,
				layout: "noBorders",
				table: {
					widths: ["*"],
					body: [
						[
							{
								text: "3.1 Details of Outward supplies and inward supplies liable to reverse charge",
								style: "subheader",
							},
						],
					],
				},
			},
			{
				style: "tableExample",
				table: {
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B8,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.AMAB2bINVR6_51,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B53 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B71,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B55 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B56 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B24, fontSize: 9 },
							{
								text: parseFloat(sscope.osupTaxvl).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.osupIamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.osupCamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.osupSamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.osupCsamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],

						[
							{ text: sscope.trans.LBL_PDF_3B25, fontSize: 9 },
							{
								text: parseFloat(
									sscope.osupZeroRatedTxval
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.osupZeroRatedIamt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.osupZeroRatedCsamt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],

						[
							{ text: sscope.trans.LBL_PDF_3B72, fontSize: 9 },
							{
								text: parseFloat(sscope.osupNilTxval).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B27, fontSize: 9 },
							{
								text: parseFloat(sscope.isupRevTxval).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.isupRevIamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.isupRevCamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.isupRevSamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.isupRevCsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B28, fontSize: 9 },
							{
								text: parseFloat(
									sscope.isupNongstTxval
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
					],
				},
			},
			{
				marginTop: 10,
				layout: "noBorders",
				table: {
					widths: ["*"],
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B64,
								style: "subheader",
							},
						],
					],
				},
			},
			{
				style: "tableExample",
				table: {
					widths: ["*", "*", "*"],
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B8,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.AMAB2bINVR6_51,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B53 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B30, fontSize: 9 },
							{
								text: parseFloat(
									sscope.interSupUnregTotalTax
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.interSupUnregIntTax
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B31, fontSize: 9 },
							{
								text: parseFloat(
									sscope.interSupCompTotalTax
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.interSupCompIntTax
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B32, fontSize: 9 },
							{
								text: parseFloat(
									sscope.intersupUINTotalTax
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.intersupUINIntTax
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
					],
				},
			},
			{
				marginTop: 10,
				layout: "noBorders",
				table: {
					widths: ["*"],
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B33,
								style: "subheader",
							},
						],
					],
				},
			},
			{
				style: "tableExample",
				table: {
					widths: ["55%", "12%", "12%", "12%", "9%"],
					body: [
						[
							{
								text: sscope.trans.ISDAMDADDINVPG2R6_446,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B53 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B54 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B55 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B56 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
						],
						[
							{
								text: sscope.trans.LBL_PDF_3B34,
								bold: true,
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B45, fontSize: 9 },
							{
								text: parseFloat(sscope.avITCIMPGiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCIMPGcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCIMPGsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCIMPGcsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B46, fontSize: 9 },
							{
								text: parseFloat(sscope.avITCIMPSiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCIMPScamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCIMPSsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCIMPScsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B47, fontSize: 9 },
							{
								text: parseFloat(sscope.avITCISRCiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCISRCcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCISRCsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCISRCcsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B48, fontSize: 9 },
							{
								text: parseFloat(sscope.avITCISDiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCISDcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCISDsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCISDcsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B49, fontSize: 9 },
							{
								text: parseFloat(sscope.avITCOTHiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCOTHcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCOTHsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.avITCOTHcsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{
								text: sscope.trans.LBL_PDF_3B38,
								bold: true,
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "",
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B50, fontSize: 9 },
							{
								text: parseFloat(sscope.revITCRULiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.revITCRULcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.revITCRULsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.revITCRULcsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B51, fontSize: 9 },
							{
								text: parseFloat(sscope.revITCOTHiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.revITCOTHcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.revITCOTHsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.revITCOTHcsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{
								text: sscope.trans.LBL_PDF_3B35,
								bold: true,
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.netITCIamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.netITCCamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.netITCSamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.netITCCsamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{
								text: sscope.trans.LBL_PDF_3B36,
								bold: true,
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCIamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCCamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCSamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCCsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B52, fontSize: 9 },
							{
								text: parseFloat(sscope.inlgITCRULiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCRULcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCRULsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.inlgITCRULcsamt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B51, fontSize: 9 },
							{
								text: parseFloat(sscope.inlgITCOTHiamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCOTHcamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.inlgITCOTHsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.inlgITCOTHcsamt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
					],
					lineHeight: 3,
				},
			},
			{
				marginTop: 10,
				layout: "noBorders",
				table: {
					widths: ["*"],
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B65,
								style: "subheader",
							},
						],
					],
				},
			},
			{
				style: "tableExample",
				table: {
					widths: ["60%", "*", "*"],
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B8,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B9 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B10 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B73, fontSize: 9 },
							{
								text: parseFloat(sscope.insupCompInter).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.insupCompIntra).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B74, fontSize: 9 },
							{
								text: parseFloat(
									sscope.insupNonGstInter
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.insupNonGstIntra
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
					],
				},
			},
			{
				marginTop: 10,
				layout: "noBorders",
				table: {
					widths: ["*"],
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B13,
								style: "subheader",
							},
						],
					],
				},
			},
			{
				style: "tableExample",
				table: {
					widths: ["*", "*", "*", "*", "*"],
					body: [
						[
							{
								text: sscope.trans.ISDAMDADDINVPG2R6_446,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B53 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B54 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B55 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B56 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B14, fontSize: 9 },
							{
								text: parseFloat(sscope.intrestIamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.intrestCamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.intrestSamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.intrestCsamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B15, fontSize: 9 },
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.lateFeeCamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(sscope.lateFeeSamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
					],
				},
			},
			{
				marginTop: 10,
				layout: "noBorders",
				table: {
					widths: ["*"],
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B16,
								style: "subheader",
							},
						],
					],
				},
			},
			{
				style: "tableExample",
				table: {
					body: [
						[
							{
								text: sscope.trans.LBL_PDF_3B17,
								rowSpan: 2,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B66,
								rowSpan: 2,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text:
									sscope.trans.LBL_PDF_3B19 +
									"" +
									sscope.trans.LBL_PDF_3B70,
								style: "tableHeader",
								colSpan: 4,
								alignment: "center",
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{},
							{},
							{},
							{
								text: sscope.trans.LBL_PDF_3B67,
								rowSpan: 2,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B68,
								rowSpan: 2,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B69,
								rowSpan: 2,
								bold: true,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
						],

						[
							{
								text: sscope.trans.LBL_PDF_3B17,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B66,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B53,
								fillColor: "#F2F2F2",
								bold: true,
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B54,
								fillColor: "#F2F2F2",
								bold: true,
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B55,
								fillColor: "#F2F2F2",
								bold: true,
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B56,
								fillColor: "#F2F2F2",
								bold: true,
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B67,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B68,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
							{
								text: sscope.trans.LBL_PDF_3B69,
								fillColor: "#F2F2F2",
								fontSize: 9,
							},
						],
						[
							{
								text: sscope.trans.LBL_PDF_3B23,
								style: "tableHeader",
								colSpan: 9,
								alignment: "left",
								fontSize: 9,
							},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B53, fontSize: 9 },
							{
								text: parseFloat(sscope.othRev_iamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcIgst_Igst_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcIgst_Cgst_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcIgst_Sgst_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevigsttx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevigstintr
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B54, fontSize: 9 },
							{
								text: parseFloat(sscope.othRev_camt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcCgst_Igst_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcCgst_Cgst_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevcgsttx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevcgstintr
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevcgstfee
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B55, fontSize: 9 },
							{
								text: parseFloat(sscope.othRev_samt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcSgst_Igst_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcSgst_Sgst_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevsgsttx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevsgstintr
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevsgstfee
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B56, fontSize: 9 },
							{
								text: parseFloat(sscope.othRev_csamt).toFixed(
									2
								),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidItcCess_Cess_amt
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevcesstx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashNonRevcessintr
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
						[
							{
								text: sscope.trans.LBL_PDF_3B40,
								style: "tableHeader",
								colSpan: 9,
								alignment: "left",
								fontSize: 9,
							},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B53, fontSize: 9 },
							{
								text: parseFloat(sscope.revrs_iamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashRevigsttx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B54, fontSize: 9 },
							{
								text: parseFloat(sscope.revrs_camt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashRevcgsttx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B55, fontSize: 9 },
							{
								text: parseFloat(sscope.revrs_samt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashRevsgsttx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
						[
							{ text: sscope.trans.LBL_PDF_3B56, fontSize: 9 },
							{
								text: parseFloat(sscope.revrs_csamt).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: parseFloat(
									sscope.taxPaidCashRevcesstx
								).toFixed(2),
								alignment: "right",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
							{
								text: "-",
								alignment: "center",
								fontSize: 9,
							},
						],
					],
				},
			},
		];
		contents.push({
			text: sscope.trans.LBL_PDF_3B57,
			bold: true,
			fontSize: 10,
		});
		contents.push({
			text: sscope.trans.LBL_PDF_3B58,
			fontSize: 9,
		});
		contents.push({
			marginTop: 10,
			style: "tableExample",
			layout: "noBorders",
			table: {
				widths: ["*", "60%"],
				body: [
					[
						{
							layout: "noBorders",
							table: {
								widths: ["*"],
								body: [
									[
										{
											text:
												sscope.trans.LBL_PDF_3B59 +
												" " +
												sscope.pdfarndt,
											fontSize: 9,
										},
									],
								],
							},
						},
						{
							layout: "noBorders",
							table: {
								widths: ["*"],
								body: [
									[
										{
											layout: "noBorders",
											table: {
												widths: ["*", "*"],
												body: [
													[
														{
															text: sscope.trans
																.LBL_PDF_3B60,
															fontSize: 9,
														},
														{
															text: "",
															fontSize: 9,
														},
													],
													[
														{
															text: sscope.trans
																.LBL_PDF_3B61,
															fontSize: 9,
														},
														{
															text: sscope.pdfauthSig,
															fontSize: 9,
														},
													],
												],
											},
										},
									],
									[
										{
											layout: "noBorders",
											table: {
												widths: ["*", "*"],
												body: [
													[
														{
															text: "",
															fontSize: 9,
														},
														{
															text: "",
															fontSize: 9,
														},
													],
													[
														{
															text: sscope.trans
																.LBL_PDF_3B62,
															fontSize: 9,
														},
														{
															text: sscope.pdfdesig,
															fontSize: 9,
														},
													],
												],
											},
										},
									],
								],
							},
						},
					],
				],
			},
		});

		var dd = {
			pageSize: "A4",
			pageOrientation: "portrait",
			pageMargins: [20, 40],
			watermark: {
				text: text,
				color: "grey",
				opacity: 0.3,
				fontSize: 150,
			},
			content: contents,
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					margin: [10, 0, 0, 10],
					alignment: "center",
				},
				subheader: {
					fillColor: "#FDE9D9",
					fontSize: 10,
					bold: true,
					marginLeft: 5,
				},
				tableExample: {
					margin: [0, 5, 0, 15],
				},
				tableITC: {
					margin: [0, 5, 0, 50],
				},
				retprd: {
					margin: [470, 0, 0, 10],
				},
				italicText: {
					italics: true,
				},
				centerAlign: {
					alignment: "center",
				},
				rightAlign: {
					alignment: "right",
				},
				leftAlign: {
					alignment: "left",
				},
				tableHeader: {
					bold: true,
					fontSize: 9,
					color: "black",
				},
				rule: {
					margin: [315, 0, 0, 10],
				},
			},
		};

		return new Promise((resolve) => {
			pdfMake.createPdf(dd).getDataUrl((data) => {
				resolve(data);
			});
		});
	} else {
		var dd = {
			pageSize: "A4",
			pageOrientation: "landscape",
			pageMargin: [40, 60, 40, 60],
			watermark: {
				text: text,
				color: "black",
				opacity: 0.3,
				bold: true,
				italics: false,
			},
			content: [
				{
					text: "Form GSTR-3B",
					style: "header",
				},
				{
					text: "[See rule 61(5)]",
					style: "center",
				},

				{
					style: "retprd",
					table: {
						widths: ["30%", "auto"],
						body: [
							["Year", shareData.formDetails.fy],
							["Period", shareData.formDetails.fm],
						],
					},
				},
				{
					style: "tableExample",
					table: {
						widths: ["65%", "auto"],
						body: [
							["1. GSTIN", shareData.formDetails.gstin || "-"],
							[
								"2. Legal name of the registered person",
								shareData.formDetails.ln || "-",
							],
						],
					},
				},
				{
					text: "3.1 Tax on outward and reverse charge inward supplies",
					style: "subheader",
				},

				{
					style: "tableExample",
					table: {
						body: [
							[
								{
									text: "Nature of Supplies",
									bold: true,
								},
								{
									text: "Total Taxable value",
									bold: true,
								},
								{
									text: "Integrated Tax",
									bold: true,
								},
								{
									text: "Central Tax",
									bold: true,
								},
								{
									text: "State/UT Tax",
									bold: true,
								},
								{
									text: "Cess",
									bold: true,
								},
							],
							[
								"(a) Outward taxable supplies (other than zero rated, nil rated and exempted)",
								{
									text: parseFloat(sscope.osupTaxvl).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.osupIamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.osupCamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.osupSamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.osupCsamt).toFixed(
										2
									),
									alignment: "right",
								},
							],

							[
								"(b) Outward taxable supplies (zero rated)",
								{
									text: parseFloat(
										sscope.osupZeroRatedTxval
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.osupZeroRatedIamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.osupZeroRatedCsamt
									).toFixed(2),
									alignment: "right",
								},
							],

							[
								"(c) Other outward supplies (Nil rated, exempted)",
								{
									text: parseFloat(
										sscope.osupNilTxval
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
							[
								"(d) Inward supplies (liable to reverse charge)",
								{
									text: parseFloat(
										sscope.isupRevTxval
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.isupRevIamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.isupRevCamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.isupRevSamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.isupRevCsamt
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"(e) Non-GST outward supplies",
								{
									text: parseFloat(
										sscope.isupNongstTxval
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
						],
					},
				},
				{
					text: "3.2 Inter-state supplies",
					style: "subheader",
				},

				{
					style: "tableExample",
					table: {
						body: [
							[
								{
									text: "Nature of Supplies",
									bold: true,
								},
								{
									text: "Total Taxable value",
									bold: true,
								},
								{
									text: "Integrated Tax",
									bold: true,
								},
							],
							[
								"Supplies made to Unregistered Persons",
								{
									text: parseFloat(
										sscope.interSupUnregTotalTax
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.interSupUnregIntTax
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"Supplies made to Composition Taxable Persons",
								{
									text: parseFloat(
										sscope.interSupCompTotalTax
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.interSupCompIntTax
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"Supplies made to UIN holders",
								{
									text: parseFloat(
										sscope.intersupUINTotalTax
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.intersupUINIntTax
									).toFixed(2),
									alignment: "right",
								},
							],
						],
					},
				},
				{
					text: "4. Eligible ITC",
					style: "subheader",
				},

				{
					style: "tableITC",
					table: {
						body: [
							[
								{
									text: "Details",
									bold: true,
								},
								{
									text: "Integrated Tax",
									bold: true,
								},
								{
									text: "Central Tax",
									bold: true,
								},
								{
									text: "State/UT Tax",
									bold: true,
								},
								{
									text: "Cess",
									bold: true,
								},
							],
							[
								"(A) ITC Available",
								{
									text: parseFloat(sscope.avITCIamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.avITCCamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.avITCSamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.avITCCsamt).toFixed(
										2
									),
									alignment: "right",
								},
							],
							[
								"(B) ITC Reversed",
								{
									text: parseFloat(sscope.revITCIamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.revITCCamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.revITCSamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.revITCCsamt
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"(C) Net ITC Available (A) – (B)",
								{
									text: parseFloat(sscope.netITCIamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.netITCCamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(sscope.netITCSamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.netITCCsamt
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"(D) Ineligible ITC",
								{
									text: parseFloat(
										sscope.inlgITCIamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.inlgITCCamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.inlgITCSamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.inlgITCCsamt
									).toFixed(2),
									alignment: "right",
								},
							],
						],
						lineHeight: 3,
					},
				},
				{
					text: "5. Exempt, nil and Non GST inward supplies",
					style: "subheader",
				},

				{
					style: "tableExample",
					table: {
						body: [
							[
								{
									text: "Nature of Supplies",
									bold: true,
								},
								{
									text: "Inter-state supplies",
									bold: true,
								},
								{
									text: "Intra-state supplies",
									bold: true,
								},
							],
							[
								"From a supplier under composition scheme, Exempt and Nil rated supply",
								{
									text: parseFloat(
										sscope.insupCompInter
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.insupCompIntra
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"Non-GST supply",
								{
									text: parseFloat(
										sscope.insupNonGstInter
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.insupNonGstIntra
									).toFixed(2),
									alignment: "right",
								},
							],
						],
					},
				},
				{
					text: "5.1 Interest and Late fee",
					style: "subheader",
				},

				{
					style: "tableExample",
					table: {
						body: [
							[
								{
									text: "Details",
									bold: true,
								},
								{
									text: "Integrated Tax",
									bold: true,
								},
								{
									text: "Central Tax",
									bold: true,
								},
								{
									text: "State/UT Tax",
									bold: true,
								},
								{
									text: "Cess",
									bold: true,
								},
							],
							[
								"Interest",
								{
									text: parseFloat(
										sscope.intrestIamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.intrestCamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.intrestSamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.intrestCsamt
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"Late fee",
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.lateFeeCamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.lateFeeSamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
						],
					},
					pageBreak: "after",
				},
				{
					text: "6.1 Payment of tax",
					style: "subheader",
				},

				{
					style: "tableExample",
					table: {
						body: [
							[
								{
									text: "Description",
									rowSpan: 2,
									bold: true,
								},
								{
									text: "Total tax payable",
									rowSpan: 2,
									bold: true,
								},
								{
									text: "Tax paid through ITC",
									style: "tableHeader",
									colSpan: 4,
									alignment: "center",
								},
								{},
								{},
								{},
								{
									text: "Tax/Cess paid in cash",
									rowSpan: 2,
									bold: true,
								},
								{
									text: "Interest paid in cash",
									rowSpan: 2,
									bold: true,
								},
								{
									text: "Late fee paid in cash",
									rowSpan: 2,
									bold: true,
								},
							],

							[
								"Description",
								"Total tax payable",
								"Integrated Tax",
								"Central Tax",
								"State/UT Tax",
								"Cess",
								"Tax/Cess paid in cash",
								"Interest paid in cash",
								"Late fee paid in cash",
							],
							[
								{
									text: "(A) Other than reverse charge",
									style: "tableHeader",
									colSpan: 9,
									alignment: "left",
								},
								{},
								{},
								{},
								{},
								{},
								{},
								{},
								{},
							],
							[
								"Integrated Tax",
								{
									text: parseFloat(
										sscope.othRev_iamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcIgst_Igst_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcIgst_Cgst_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcIgst_Sgst_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevigsttx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevigstintr
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
							[
								"Central Tax",
								{
									text: parseFloat(
										sscope.othRev_camt
									).toFixed(),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcCgst_Igst_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcCgst_Cgst_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevcgsttx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevcgstintr
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevcgstfee
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"State/UT Tax",
								{
									text: parseFloat(
										sscope.othRev_samt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcSgst_Igst_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcSgst_Sgst_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevsgsttx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevsgstintr
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevsgstfee
									).toFixed(2),
									alignment: "right",
								},
							],
							[
								"Cess",
								{
									text: parseFloat(
										sscope.othRev_csamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidItcCess_Cess_amt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevcesstx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashNonRevcessintr
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
							[
								{
									text: "(B) Reverse charge",
									style: "tableHeader",
									colSpan: 9,
									alignment: "left",
								},
								{},
								{},
								{},
								{},
								{},
								{},
								{},
								{},
							],
							[
								"Integrated Tax",
								{
									text: parseFloat(sscope.revrs_iamt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashRevigsttx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
							[
								"Central Tax",
								{
									text: parseFloat(sscope.revrs_camt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashRevcgsttx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
							[
								"State/UT Tax",
								{
									text: parseFloat(sscope.revrs_samt).toFixed(
										2
									),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashRevsgsttx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
							[
								"Cess",
								{
									text: parseFloat(
										sscope.revrs_csamt
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: parseFloat(
										sscope.taxPaidCashRevcesstx
									).toFixed(2),
									alignment: "right",
								},
								{
									text: "-",
									alignment: "center",
								},
								{
									text: "-",
									alignment: "center",
								},
							],
						],
					},
				},
				// , {
				//     text: '6.2. TDS/TCS Credit',
				//     style: 'subheader'
				// },

				// {
				//     style: 'tableExample',
				//     table: {
				//         body: [
				//             [
				//                 {
				//                     text: 'Details',
				//                     bold: true
				//                 },
				//                 {
				//                     text: 'Integrated Tax',
				//                     bold: true
				//                 },
				//                 {
				//                     text: 'Central Tax',
				//                     bold: true
				//                 },
				//                 {
				//                     text: 'State/UT Tax',
				//                     bold: true
				//                 }
				//             ],
				//             [
				//                 'TDS',
				//                 {
				//                     text: '0',
				//                     alignment: 'right'
				//                 },
				//                 {
				//                     text: '0',
				//                     alignment: 'right'
				//                 },
				//                 {
				//                     text: '0',
				//                     alignment: 'right'
				//                 }
				//             ],
				//             [
				//                 'TCS',
				//                 {
				//                     text: '0',
				//                     alignment: 'right'
				//                 },
				//                 {
				//                     text: '0',
				//                     alignment: 'right'
				//                 },
				//                 {
				//                     text: '0',
				//                     alignment: 'right'
				//                 }
				//             ]
				//         ]
				//     }
				// }
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					margin: [300, 0, 0, 10],
				},
				subheader: {
					fontSize: 16,
					bold: true,
					margin: [0, 10, 0, 5],
				},
				tableExample: {
					margin: [0, 5, 0, 15],
				},
				tableITC: {
					margin: [0, 5, 0, 50],
				},
				retprd: {
					margin: [470, 0, 0, 10],
				},
				center: {
					margin: [320, 0, 0, 10],
				},
				tableHeader: {
					bold: true,
					fontSize: 13,
					color: "black",
				},
				rule: {
					margin: [315, 0, 0, 10],
				},
			},
		};

		return new Promise((resolve) => {
			pdfMake.createPdf(dd).getDataUrl((data) => {
				resolve(data);
			});
		});
	}
}

//GSTR2B-3B new GSTR3B pdf template download by - @Vishakha
// sscope.gstr2bLiveFlag = sscope.servers.IS_GSTR2B_LIVE && sscope.servers.IS_GSTR2B_LIVE == "true" ? true : false;
// sscope.r2br3bEnableRel3Flag = sscope.servers.GSTR2B3B_ENABLE_REL3 && sscope.servers.GSTR2B3B_ENABLE_REL3 == "true" ? true : false;
// sscope.valid2Brel2rtnprd = false;

validateGstr2bRetPrd = function (shareData, sscope) {
	var retPrdStr =
		shareData.rtn_prd.substring(2) +
		"-" +
		shareData.rtn_prd.substring(0, 2) +
		"-" +
		"01";
	if (sscope.gstr2bLiveFlag && sscope.servers.GSTR2B3B_REL2_STRPRD) {
		var retPrdrel2b =
			sscope.servers.GSTR2B3B_REL2_STRPRD.substring(6) +
			"-" +
			sscope.servers.GSTR2B3B_REL2_STRPRD.substring(3, 5) +
			"-" +
			sscope.servers.GSTR2B3B_REL2_STRPRD.substring(0, 2);
		if (new Date(retPrdStr) >= new Date(retPrdrel2b)) {
			sscope.valid2Brel2rtnprd = true;
			shareData.valid2Brel2rtnprd = true;
			return true;
		}
		return true;
	}
	return true;
};

checkForNull = function (val) {
	if (null != val && val != "") {
		return true;
	}
	return false;
};

var trans = {
	data: {
		GSTR1_EXPA_STEP:
			"Please confirm to below guidelines for refund of IGST paid on export of goods:",
		GSTR1_EXPA_STEP1:
			"Invoice data for export of goods is provided in Table 6A of GSTR 1 for the relevant tax period",
		GSTR1_EXPA_STEP2:
			"Invoice numbers provided in Table-6A of GSTR 1 are same as that of the invoice details given in Shipping Bill.",
		GSTR1_EXPA_STEP3:
			"(The invoice with different invoice number/date than given in shipping bill will be rejected by ICEGATE)",
		GSTR1_EXPA_STEP4:
			"Select With payment of tax from the GST Payment drop down when filling the invoice details ",
		GSTR1_EXPA_STEP5:
			"(Invoices selected as without payment of tax are not eligible for refund from ICEGATE)",
		GSTR1_EXPA_STEP6:
			"Shipping bill number, shipping bill date and port code are specified mandatorily and correctly, in case of export of goods.",
		GSTR1_EXPA_STEP7:
			"(Invoices, which don’t have these details, shall not be sent to ICEGATE for further processing)",
		GSTR1_EXPA_STEP8:
			"Port code is alphanumeric six character code as prescribed by ICEGATE. Refer to list given by ICEGATE at",
		GSTR1_EXPA_STEP9:
			"(Invoice, which have incorrect port code, are likely to get rejected by ICEGATE)",
		IOSUP3B_187:
			"Please confirm to below guidelines for refund of IGST paid on export of goods:",
		IOSUP3B_189:
			"IGST amount, to be paid on export of goods/services outside India or to SEZ, are filled under table 3.1 (b) and not under table 3.1(a) or 3.1(c)",
		IOSUP3B_190:
			"IGST amount filled in table 3.1(b) of GSTR 3B is either equal to, or greater than the total IGST shown to have been paid under Table 6A (exports), and Table 6B(SEZ) of GSTR 1",
		IOSUP3B_197: "OK",
		IOSUP3B_191: "NONE",
		HDR_GSTR2_IFF: "IFF - Invoice Details",
		LBL_DASH_TXT_6: "FROM DATE",
		LBL_DASH_TXT_7: "TO DATE",
		LBL_END_DATE: "End Date - ",
		HDR_IFF: "IFF - Details of outward supplies of goods or services",
		DASHBOARD3B_5032:
			"You have field(s), highlighted in red, where the value entered is significantly different from the system computed value.",
		IOSUP3B_192:
			"of the export invoices shall be processed for transmission to ICEGATE if correct IGST amount is not mentioned and paid through table 3.1(b) of GSTR 3B",
		HEAD_GROSS_ADJ_TEMP_RS: "Gross Advance Adjusted (₹)",
		HEAD_GROSS_REC_TEMP_RS: "Gross Advance Received (₹)",
		LBL_TTL_SPLAMT_RS: "Total Non-GST Amt (₹)",
		LBL_TTL_EXP_AMT_RS: "Total Exempted Amt (₹)",
		LBL_TTL_NIL_AMT_RS: "Total Nil Amt (₹)",
		HEAD_TOTAL_TAX_LIABILITY_RS: "Total Tax Liability (₹)",
		HEAD_TOT_INV_VAL_RS: "Total Value (₹)",
		LBL_OFF_PG_MSG_2: "Generate error report",
		LBL_OFF_PG_MSG_1: "Error report generation requested",
		LBL_OFF_PG_MSG_3: "Download error report",
		HEAD_IGST: "IGST",
		HEAD_IGST_R: "IGST (₹)",
		HEAD_CGST: "CGST",
		HEAD_CGST_R: "CGST (₹)",
		HEAD_SGST: "SGST",
		HEAD_SGST_R: "SGST (₹)",
		HEAD_SGST_UT_R: "SGST/UT (₹)",
		LBL_POP_R7_4:
			"Proceed to file request has been received, please check the status in sometime",
		HEAD_CESS: "CESS",
		HEAD_SELECT_PERIOD: "Select Period",
		HEAD_B2B_INVOICE_DETAILS: "B2B - Invoice Details",
		HEAD_GSTR11B2B: "Details of Invoices received- Add Invoice",
		HEAD_B2BE_VIEW: "B2B- View Invoice",
		HEAD_B2CS: "B2CS- Add Details",
		HEAD_B2CSE: "B2CS- Edit Details",
		HEAD_B2CS_AMEND_E: "B2CSA- Edit Details",
		HEAD_B2CS_AMEND: "B2CSA- Amend Details",
		HEAD_GSTR11B2BE: "Details of Invoices received- Edit Invoice",
		HEAD_B2BUNREGE: "B2B Unregistered Supplier- Edit Invoice",
		HEAD_B2BUNREGA: "B2B Unregistered Supplier- Add Invoice",
		HEAD_B2BUNRAEGE: "Amend B2B Unregistered Supplier- Edit Invoice",
		HEAD_B2BUNRAEGA: "Amend B2B Unregistered Supplier- Add Invoice",
		HEAD_CDNUNREGE: "Amend CDN Unregistered Supplier -Edit Invoice",
		HEAD_CDNUNRAEGA: "Amend CDN Unregistered Supplier -Add Invoice",
		HEAD_B2CL: "B2C(Large) Invoices- Add Invoice",
		HEAD_B2BA: "B2BA- Add Invoice",
		HEAD_B2CLA: "B2CLA- Add Invoice",
		HEAD_ITEM_DETAILS: "Item details",
		HEAD_CRED_DEB_SUMM: "Credit/Debit Notes- Summary",
		HEAD_CRED_DEB_DET: "Credit/Debit Notes- Details",
		HEAD_GSTR11CRED_DEB_DET:
			"Details of Credit/Debit Notes received - Edit",
		TTL_TAX_ALRDY_PAID_EDIT:
			"Tax already paid on invoices issued in the current period - Edit Details",
		TTL_TXPDA_AMEND: "Amendment of Adjustment of Advances - Amend Details",
		TTL_TXPDA_EDIT: "Amendment of Adjustment of Advances - Edit Details",
		TITLE_TAX_LAI_EDIT: "Tax Liability (Advance Received) - Edit Details",
		HEAD_POS_AT: "Place of Supply (Name of State)",
		HEAD_GROSS_ADV: "Gross Advance Received/Adjusted",
		HEAD_GROSS_ADJ: "Gross Advance Adjusted (excluding tax) (₹)",
		HEAD_GROSS_REC: "Gross Advance Received (excluding tax) (₹)",
		HEAD_GROSS_REC_R4: "Gross Advance Paid (excluding tax) (₹)",
		HEAD_GROSS_ADJ_TEMP: "Gross Advance Adjusted",
		HEAD_GROSS_REC_TEMP: "Gross Advance Received",
		HEAD_TOT_DOC: "Total Docs",
		HEAD_CAN_DOC: "Cancelled Docs",
		HEAD_NET_DOC: "Net Issued  Docs",
		HEAD_DOC_ISSUED: "Documents issued during the tax period ",
		HEAD_NAT_OF_DOC: "Nature of document",
		HEAD_FROM: "From",
		HEAD_TO: "To",
		HEAD_SN: "Sr. No.",
		HEAD_TOT_NUM: "Total number",
		HEAD_CAN: "Cancelled",
		HEAD_NET_ISSUED: "Net issued",
		TITLE_DOC: "13 - Documents Issued",
		LBL_LEDGER_VIEWS: "Ledger Views",
		LBL_SAVE_SUCC: "Note saved successfully.",
		LBL_UPD_REC: "Uploaded by Receiver",
		ITC3_TAB_6: "6 - Amount of ITC payable and paid ",
		ITC3_HEAD: "GST ITC -03",
		LBL_ITC3_HEAD:
			"Declaration for intimation of ITC reversal/payment of tax on inputs held in stock, inputs contained in semi-finished and finished goods held in stock and capital goods under sub-section (4) of section 18 ",
		LBL_MOD_REC: "Modified by Receiver",
		LBL_UPD_TAXP: "Uploaded by Taxpayer",
		LBL_ADD_CREDIT_DET: "Add Credit Note/Debit Note",
		LBL_FIN_YR: "Financial Year",
		LBL_MON: "Month",
		LBL_MON_OGL: "Original Month",
		LBL_ARN_NUMBER: "ARN ",
		LBL_TAX: "Tax",
		LBL_JANUARY: "January",
		LBL_FEBRUARY: "February",
		LBL_MARCH: "March",
		LBL_INTEREST: "Interest",
		LBL_PENALTY: "Penalty",
		LBL_FEE: "Fee",
		LBL_OTHERS: "Others",
		LBL_TOTAL: "Total",
		LBL_CESS: "Cess (₹)",
		HEAD_CDN_INVOICE_SUPPLIER: "Credit/debit notes – Supplier wise details",
		LBL_TDS_CREDIT_RECEIVED: "9A - TDS Credit Recieved",
		LBL_TDS_CREDIT_RECEIVED_2A: "TDS Credit Recieved - Summary",
		LBL_TDSA_CREDIT_RECEIVED_2A:
			"Amendments to TDS Credit Recieved - Summary",
		LBL_TDS_RECEIVED: "TDS Received",
		LBL_TCS_CREDIT_RECVD: "TCS Credit Recieved",
		LBL_TCS_RECVD: "TCS Received",
		LBL_ITC_RECVD: "ITC Received",
		LBL_TOT_ITC_RECVD: "Total ITC Reversed",
		LBL_ITC_REV_ADD: "Input Tax Credit Reversal / Reclaim - Add",
		LBL_ITC_REV_ED: "Input Tax Credit Reversal / Reclaim - Edit",
		LBL_AVAILD_EARLIER: "ITC Availed Earlier",
		LBL_AVAILD_MNTH: "ITC Availed This Month",
		LBL_TAX_LIABLITY_REVRSE_CHRGE:
			"10A - Advance amount paid for reverse charge supplies",
		LBL_TAX_LIABLITY_REVRSE_CHRGE_TILE:
			"10(I) - 10A - Advance amount paid for reverse charge supplies",
		LBL_TAX_LIABLITY_REVRSE_CHRGE_SUM:
			"Advance amount paid for reverse charge supplies - Summary",
		LBL_TAX_LIABLITY_ADD:
			"Advance amount paid for reverse charge supplies - Add",
		LBL_TAX_LIABLITY_EDIT:
			"Advance amount paid for reverse charge supplies - Edit",
		LBL_TAX_LIABILITY_LEDGER_FOR_RETURN: "Tax Liability Ledger for Return",
		TITLE_DOWNLOAD_GSTR1:
			"Click here to download GSTR-1 summary for all tax periods in PDF format.",
		TITLE_DOWNLOAD_GSTR1_IFF:
			"Please click here to download the Summary page of GSTR-1/IFF for your review",
		TITLE_DOWNLOAD_IFF:
			"Please click here to download the Summary page of IFF for your review",
		LBL_TAX_LIABILITY_LEDGER_FOR_LIABILITIES_OTHER_THAN_RETURN:
			"Tax Liability Ledger for Liabilities other than Return",
		LBL_TAX_LBLTY_SVD_AMDNTS_SCTN:
			"tax liability saved to amendments section successfully.",
		LBL_IFF: "IFF",
		TITLE_IFF_UPDATE:
			"Click here to update the IFF <br> and its summary to include the auto drafted details from recipients",
		LBL_ADDINV: "Add Details",
		LBL_ADDPOS: "Add POS",
		LBL_GSTR1_RECHECK:
			"Generate GSTR1 Summary process is initiated, Please recheck after one minute",
		LBL_IFF_RECHECK:
			"Generate IFF Summary process is initiated, Please recheck after one minute",
		LBL_ADDBOE: "Add BOE",
		LBL_BACK: "Back",
		LBL_FILE_BACK: "BACK TO FILE RETURNS",
		LBL_GSTR7_BACK: "BACK TO GSTR-7 DASHBOARD",
		MANAGE_PROFILE_FORM_IFF: "GSTR - 1/ IFF",
		LBL_CANCEL: "Cancel",
		LBL_CONFIRM: "Confirm",
		LBL_SAVE: "Save",
		LBL_OK: "Ok",
		LBL_DISPLAY_HIDE: "Display/Hide Columns:",
		LBL_ADD: "ADD",
		LBL_ADD_DOC: "Add Document",
		LBL_EDIT: "EDIT",
		LBL_LIABILITIES: "Liabilities (A)",
		LBL_ORGNL_DETALS: "Original Details",
		LBL_TOTAL_PAYABLE: "Total Payable (A)",
		LBL_PAYMENT_ITC_CASH: "Payments: Through ITC/Cash (B)",
		LBL_AMOUNT_OVERDUE: "Amount Overdue (A-B)",
		LBL_THROUGH_ITC: "Through ITC",
		LBL_ITC: "ITC",
		LBL_THROUGH_CASH: "Through Cash",
		LBL_DATE: "Date",
		LBL_REFERENCE: "Reference No.",
		LBL_REFRNCE: "Reference",
		LBL_TAX_PERIOD: "Tax Period",
		LBL_DESCRIPTION: "Description",
		LBL_TOTAL_LIABILITY: "Total Liabilty Discharged/Paid",
		LBL_PDF: "Save as PDF",
		LBL_PRINT: "Print",
		LBL_EXCEL: "Save as Excel",
		LBL_SAMPLE_FILE: "Sample File",
		LBL_STATUS_LIABILITY: "Status Of Liability",
		LBL_CLOSING_BALANCE_AS_ON: "Closing Balance as on (A-B-C)",
		LBL_CLOSING_BALANCE: "Closing Balance",
		LBL_PARTICULARS: "Particulars",
		LBL_DEBIT_CREDIT: "Debit/Credit",
		LBL_BALANCE: "Balance",
		LBL_TAX_DETAILED: "Tax Liability Register for Returns - Detailed",
		LBL_OTHER_TAX_DETAILED:
			"Tax Liability Register for Liabilities Other Than Return - Detailed ",
		LBL_DETAILED_LEDGER: "Detailed Ledger",
		LBL_TAX_LIABILITY: "Tax Liability Register",
		LBL_TAX_LIABLTY: "Tax Liability ",
		LBL_SUB_TOTAL: "Sub-Total",
		LBL_COLLAPSE: "Collapse All",
		LBL_EXPAND: "Expand All",
		LBL_FROM: "From",
		LBL_TO: "To",
		LBL_TAX_LIABILITY_OTHER_THAN_RETURN:
			"Tax Liability Register For Liabilities Other Than Return ",
		LBL_RECEIVER_GSTIN: "Receiver GSTIN/UIN",
		LBL_SUPP4_GSTIN: "Supplier GSTIN/UIN",
		LBL_RECEIVER_NAME: "Receiver Name",
		LBL_INVOICE_NUMBER: "Invoice no.",
		LBL_INVOICE_DATE: "Invoice date",
		LBL_INVOICE_SOURCE: "Source",
		LBL_INVOICE_IRN: "IRN",
		LBL_INVOICE_IRN_DATE: "IRN date",
		LBL_POS: "POS",
		ORG_LBL_POS: "Original POS",
		LBL_TAXABLE_VALUE: "Total taxable value ",
		LBL_GROSS: "Gross Advance Paid",
		LBL_SUPPLY_REVERSE: "Supply attract reverse charge",
		LBL_REVERSE_CHARGE: "% Reverse Charge",
		LBL_INVOICE_VALUE: "Total invoice value (₹)",
		LBL_INV_VAL: "Invoice Value (₹)",
		LBL_TOT_REVISED_INVOICE_VALUE: "Total Revised Invoice Value",
		LBL_TAX_INVOICE: "Supplies through E-commerce operator",
		LBL_CRDR_NOT_NO: "Debit/Credit Note No.",
		LBL_CRDR_DATE: "Debit/Credit Note Date",
		LBL_RSN_NOTE: "Reason For Issuing Note",
		LBL_TOT_DIFF_VAL: "Total Differential Value",
		LBL_NOT_TYP: "Note Type",
		LBL_SUPP_TYP: "Supply type",
		LBL_SR_NO: "Sr. No.",
		LBL_ORG_INV: "Original Invoice",
		LBL_DIFF_VAL: "Differential Value",
		LBL_NO: "No.",
		LBL_YES: "Yes.",
		LBL_RATE: "Rate (%)",
		LBL_AMT: "Amount",
		TITLE_HSN: "HSN-wise summary of outward supplies",
		TITLE_HSN_SAC: "12 - HSN-wise summary of outward supplies",
		TITLE_HSN_SAC_INWRD_SUPPLIES: "13 - HSN summary of inward supplies",
		HEAD_CAT: "Category",
		LBL_DESC: "Description",
		LBL_HSN_CODE: "HSN Code",
		LBL_UQC: "UQC",
		LBL_QUANTITY: "Total Quantity",
		LBL_TOT_QUANTITY: "Total Quantity",
		LBL_VALUE: "Value (₹)",
		LBL_NOTE_VALUE: "Note value",
		LBL_NOTE_VALUE_SYM: "Note Value (₹)",
		TTL_HSN_ADD:
			"HSN/Service Classification Code summary of outward supplies - Add",
		TTL_HSN_ED:
			"HSN/Service Classification Code summary of outward supplies - Edit",
		LBL_NATURE_SUPP: "Nature of Supply",
		LBL_TAX_VAL_OTWRD_SUPP: "Taxable Value/Value of Outward Supplies ",
		TITLE_ADD_ITEM: "Add Item",
		HEAD_HSN_SAC: "HSN/Service Classification Code",
		TTL_TAX_ALRDY_PAID:
			"Tax already paid on invoices issued in the current period - Add Details",
		TITLE_TAX_PAID:
			"Tax already paid on invoices issued in the current period",
		ERR_MANDATORY: "This information is required.",
		ERR_DOC_MAND: "Please fill all the mandatory fields",
		ERR_INV_CHAR: "Do enter only allowed characters.",
		ERR_MIN_BOE: "SBN/BOE should be min. 3 and max. 7 digit numeric",
		ERR_INVR: "Rate is invalid",
		ERR_IGST:
			"Amount entered under total IGST available as ITC  shall be less than or equal to IGST paid",
		ERR_SGST_CGST_VAL: "Please enter  value greater than 0",
		HLP_SELCT: "Select",
		HLP_MAND_FIELD: "Indicates Mandatory Fields",
		HLP_GOODS_SERV: "G = Goods, S = Services",
		HDR_GSTIN: "Receiver GSTIN/UIN",
		HDR_GSTR1: "GSTR-1 - Details of outward supplies of goods or services",
		HDR_GSTR1A:
			"GSTR-1 Amendment - Details of outward supplies of goods or services",
		HDR_GSTR2_INWRD_SUPPLIS_RECEIVED:
			"GSTR-2 - Inward Supplies received by the Taxpayer",
		HDR_GSTR2: "GSTR-1 - Invoice Details",
		HDR_GSTR2_INVOICE_DETAILS: "GSTR-2 - Invoice Details",
		HDR_GSTR1_DETAILS: "GSTR-1 - Other Details",
		HDR_GSTR2_DETAILS: "GSTR-2 - Other Details",
		BTN_ADD_DET: "Add Details",
		BTN_ADD_DET_AT: "Add State wise Details",
		ADD_EDIT_DET: "Add/Edit Details",
		LBL_CD_NOTE: "C/D Note No.",
		LBL_CD_NOTE_DATE: "C/D Note Date",
		LBL_NONGST_SUPP: "Non GST Supplies",
		LBL_TAXPAYER_NAME: "Name of the Taxpayer",
		LBL_GROSS_TURNOVER: "Gross Turnover in the previous FY",
		LBL_GRSS_TRNOVR: "Gross Turnover",
		LBL_PERIOD: "Period -",
		LBL_TAXABLE_SUPPLIES: "Taxable Outward Supplies to Registered Persons",
		LBL_AMND_DETAILS_OUTWARD_SUPPLIES:
			"Amendments to Details of Outward Supplies",
		LBL_TAXABLE_INTER_STATE_OUTWARD_SUPPLIES:
			"Taxable Inter-State Outward Supplies to Consumers Invoice Level details",
		LBL_AMND_INTER_STATE_SUPP:
			"Amendment to Taxable Inter-state Outward Supplies to Consumers Invoice Level",
		LBL_TAX_SUPP_CUSTMRS: "Taxable Outward Supplies to Consumers",
		LBL_AMND_TAX_VAL_SUPP:
			"Amendment to Taxable Outward Supplies to Consumers",
		LBL_DETAILS_CRE_DEB: "Amendments to details of Credit/Debit Notes",
		LBL_NIL_EXEMPT_NON_GST: "Nil Rated Exempt and Non GST",
		LBL_SUPP_EXPRTD: "Supplies Exported (including deemed Exports)",
		LBL_AMND_SUPP_EXPRTD:
			"Amendment to Supplies Exported (including deemed Exports)",
		LBL_TAX_LIABLITY_SUPPLY:
			"Tax Liability Arising on account of Time of Supply before the issuance of Invoices",
		LBL_AMND_TAX_SUPP:
			"Amendment to Tax Liability Arising on account of Time of Supply before the issuance of Invoices",
		LBL_TAX_PAID_ALREADY:
			"Tax Already paid on Invoices Issued in this Period",
		LBL_SUPP_THRGH_ECOMM: "Supplies Made through E-commerce Portal",
		LBL_QUANTITVE_SUMMRY: "Quantitative Summary of Outward Supplies",
		LBL_ORG_INV_NO: "Original invoice no.",
		LBL_AGREGATE_TXBLE_VALUE: "Aggregate Taxable Value",
		LBL_ORG_INV_DATE: "Original invoice date",
		LBL_DIFF_VAL_P: "Differential Value (Plus or Minus) (₹)",
		HEAD_CRDR_ADD_NOTE: "Amended Credit/Debit Notes- Add Note",
		PLH_GSTIN: "Please Enter GSTIN",
		HEAD_AMD_CRDR: "Amended Credit/Debit Notes - Summary",
		"TITLE_TAX_ALREADY_ PAID_SUM":
			"Tax already paid on invoices issued in the current period - Summary",
		LBL_CRDR_NO: "Credit/Debit Note No.",
		BTN_AMD_NOTE: "Amend Note",
		LBL_ORG_CRDR_NOT_NO: "Original Credit/Debit Note No.",
		LBL_ORG_CRDR_NOT_DATE: "Original Credit/Debit Note Date",
		LBL_RVD_CRDR_NOT_NO: "Revised Credit/Debit Note No.",
		LBL_RVD_CRDR_NOT_DATE: "Revised Credit/Debit Note Date",
		HEAD_AMD_CRDR_NOT: "Amended Credit/Debit Notes- Details",
		LBL_RVD_ORG_CRDR_NOT_NO: "Revised/Original Credit/Debit Note No.",
		LBL_RVD_ORG_CRDR_NOT_DATE: "Revised/Original Credit/Debit Note Date",
		HEAD_NIL: "8A, 8B, 8C, 8D - Nil Rated Supplies",
		HEAD_NIL_RATED: "Nil Rated",
		LBL_DATA_SAVE: "Data saved successfully.",
		LBL_DATA_NSAVE: "Data was not saved successfully.",
		LBL_NDEL: "Data was not deleted.",
		LBL_DEL: "Data was deleted successfully.",
		LBL_GOODS: "Goods",
		LBL_SERV: "Services",
		LBL_GOODS_SERVICES: "Goods/Services",
		LBL_NMBER_OF_INVOICES: "Number of Invoices : ",
		GSTR4_LBL_NMBER_OF_INVOICES: "No. of Invoices : ",
		LBL_NMBR_OF_DCMNTS: "Number of Documents/Cases",
		LBL_NMBR_OF_REVISD_DCMNTS: "Number of Revised Documents/Cases",
		LBL_NIL_AMT: "Nil Rated Supplies (₹)",
		LBL_EXP_AMT: "Exempted(Other than Nil rated/non-GST supply) (₹)",
		LBL_TTL_NIL_AMT: "Total Nil Amt",
		LBL_TTL_EXP_AMT: "Total Exempted Amt",
		LBL_TTL_SPLAMT: "Total Non-GST Amt",
		LBL_NGST_SUPP_AMT: "Non-GST Supplies (₹)",
		LBL_IESRP: "Inter-state supplies to registered person",
		LBL_IASRP: "Intra-state supplies to registered person",
		LBL_IESC: "Inter-state supplies to unregistered person",
		LBL_IASC: "Intra-state supplies to unregistered person",
		HEAD_TRANS_ID: "Transaction ID",
		HEAD_TAX_RECPT_ADV:
			"TAX Paid on receipt of advance/on account of time of supply",
		TTL_TAX_ALRDY_SUMM: "Adjustment of Advances - Summary",
		TTL_TXPDA_SUMM: "Amendment of Adjustment of Advances - Summary",
		TTL_E_COMM_PRTL:
			"Supplies made through e-commerce portals of other companies",
		TTL_E_COMM_PRTL_SUMM:
			"Supplies made through e-commerce portals of other companies (Inter-State) - Summary",
		GSTIN_OF_E_COMM_PRTL: "GSTIN of e-commerce portal",
		HEAD_MERCHANT_ID: "Merchant ID allocated by e-commerce portal",
		HEAD_TOT_INV_VAL: "Total Value ",
		HEAD_TOT_TAX_VAL: "Total Taxable Value ",
		HEAD_TOT_ADV_AMT: "Total Advance Amount (excluding tax)",
		LBL_TOT_VALUE: "Total Value",
		"TTL_ECOM_ INTR_STATE_DETILS":
			"Supplies made through e-commerce portals of other companies (Inter-State) - Details",
		HEAD_GRSS_VAL_SUPLIES: "Gross Value of supplies ",
		TTL_ECOM_INTRA_STATE_DETLS:
			"Supplies made through e-commerce portals of other companies (Intra-State) - Summary",
		TTL_ECOM_INTER_STATE_DETLS:
			"Supplies made through e-commerce portals of other companies (Intra-State) - Details",
		TITLE_INTRA_STATE: "Intra-State",
		TITLE_INTER_STATE: "Inter-State",
		HEAD_ACTIONS: "Actions",
		HEAD_ACTION: "Action",
		TTL_TAX_LIBLTY_SUMM: "Tax Liability (Advance Received) - Summary",
		TITLE_TAX_LIABILITY:
			"11A(1), 11A(2) - Tax Liability (Advances Received)",
		TTL_SUPP_ECOM:
			"Supplies paid through e-commerce portals of other companies",
		HEAD_CUSTOMER_DETAILS: "Customer's Details",
		HEAD_CUSTOMER_STATE_CODE: "Customer's state code",
		HEAD_ADVANCED_AMT_RCV: "Amount of advance excluding tax (₹)",
		TITLE_TAX_LIA_DET: "Tax Liability (Advance Payment) - Details",
		HEAD_DOC_NO: "Document No.",
		HEAD_DOC_DATE: "Document Date",
		LBL_WITH_WITHOUT_PAYMENT: "With/Without Payment of Duty",
		"HEAD_CUST_GSTIN?NAME": "Customer GSTIN/UIN/Name",
		HEAD_HSN_SAC_SUP: "HSN/Service Classification Code of Supply",
		HEAD_AMT_ADV_RCV: "Amount of Advance Received ",
		HEAD_AMT_ADV_RCV_WITHOUT_RAISING_BILL:
			"Amount of advance received/ Value of Supply provided without raising a bill",
		TITLE_AMEND_TAX_LIA_SUM:
			"Amended Tax Liability (Advance Received) - Summary",
		HEAD_ORG_CUST_DET: "Original Customer's Details",
		HEAD_ORG_CUST_STATE_CODE: "Original Customer's state code",
		HEAD_REV_CUST_DET: "Revised/Original Customer Details",
		HEAD_REV_CUST_STATE_CODE: "Revised/Original Customer state code",
		BTN_AMEND_TAX_LIAB: "Amend Tax Liability",
		TITLE_AMEND_TAX_LIAB: "11A - Amended Tax Liability (Advance Received)",
		TITLE_AMEND_TAX_LIAB_UNDER_REVRSD_CHRGE:
			"Amended Tax Liability Under Reverse Charge",
		LBL_ORG_STATE_CODE: "Original State Code",
		LBL_ORG_HSN: "Original HSN/Service Classification Code",
		LBL_GSTIN_UIN_NAME: "GSTIN/UIN/Name",
		BTN_PROCEED: "Proceed",
		BTN_CLOSE: "close",
		LBL_ORG_CUST_UIN_NAME: "Original Customer GSTIN/UIN/Name",
		LBL_ORG_DATE: "Original Date",
		LBL_ORG_DOC_NO: "Original Document No.",
		LBL_REV_CUST_GSTIN: "Revised/Original Customer GSTIN/UIN",
		LBL_REV_STATE_CODE: "Revised/Original State Code (Place of Supply)",
		LBL_REV_DOC_NO: "Revised Document No.",
		LBL_STATE_CODE: "State Code (POS)",
		LBL_REV_DATE: "Revised Date",
		TTL_EXPRT_SUMM: "Exports Invoices - Summary",
		HEAD_SHIP_BILL_NO: "Shipping Bill No./Bill of Export No.",
		HEAD_SHIP_BILL_DATE: "Shipping Bill Date/Bill of Export Date",
		HEAD_REV_SHIP_BILL_NO:
			"Revised/Original Shipping Bill No./Bill of Export No.",
		HEAD_REV_SHIP_BILL_DATE:
			"Revised/Original Shipping Bill Date/Bill of Export Date",
		HEAD_GST_PAY: "GST Payment",
		TTL_AMEN_EXPRT: "Amended Exports Invoices - Summary",
		HEAD_REV_ORG_INV_DATE: "Revised/Original Invoice Date.",
		HEAD_REV_ORG_INV_NO: "Revised/Original Invoice No.",
		BTN_AMEND_INV: "Amend Invoice",
		TTL_AMEND_EXPRT_INV: "Amended Exports - Amend Export Invoice",
		HEAD_AMD_CRDR_DET: "Amended Credit/Debit Notes - Details",
		HEAD_CUST_STATE_CODE: "Customer State Code",
		TITLE_TAX_LAI_ADD: "Tax Liability (Advance Received) - Add Details",
		TITLE_TAX_LAI_AMEND: "Tax Liability (Advance Received) - Amend Details",
		LBL_SUPPLY_TYPE: "Supply Type",
		LBL_REC_STATECD: "Place of supply",
		LBL_REC_STATENM: "Recipient's Name",
		LBL_ORG_INV_NUM: "Original Invoice No.",
		LBL_REV_ORG_INV_NO: "Revised Invoice No.",
		LBL_ISD_TYP: "ISD Type",
		LBL_REV_ISD_NO: "Revised ISD No.",
		LBL_REV_ISD_DT: "Revised ISD Date",
		LBL_REV_ORG_INV_DT: "Revised/Original Invoice Date",
		HEAD_CUST_GSTIN_NAME: "Customer GSTIN/UIN/Name",
		PRE_REGISTRATION_RECEIPT_DETAILS: "Pre-Registration Receipt Details",
		LBL_GSTIN: "GSTIN - ",
		LBL_UIN: "UIN - ",
		LBL_BUISNESS_NAME: "Business Name - ",
		LBL_TRADE_NAME: "Trade Name - ",
		LBL_LEGAL_NAME: "Legal Name - ",
		LBL_TRADE_LEGAL_NAME: "Trade/Legal name - ",
		LBL_LEGAL_NAME_UN: "Name of the person having UIN - ",
		LBL_TABLE_NAME: "Table Name",
		LBL_DATE_OF_LIABILITY_AS_STATED_IN_REGISTRATION_APPLICATION:
			"Date of liability as stated in registration application -",
		LBL_DATE_OF_APPLICATION_OF_REGISTRATION:
			"Date of application of registration -",
		TTL_PRTCULRS_OF_STCK: "Particulars of Stock held - Inputs As Such",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUTS_IN_WIP:
			"Particulars of Stock held-Inputs in WIP",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUTS_IN_WIP_SUMMARY:
			"Particulars of Stock held - Inputs In WIP - Summary",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUTS_IN_WIP_EDIT:
			"Particulars of Stock held - Inputs In WIP - Edit",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUTS_IN_FINISHED_GOODS:
			"Particulars of Stock held-Inputs in Finished Goods",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUTS_IN_FINISHED_GOODS_SUMMARY:
			"Particulars of Stock held - Inputs in Finished Goods - Summary",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUTS_IN_FINISHED_GOODS_EDIT:
			"Particulars of Stock held - Inputs in Finished Goods - Edit",
		TITLE_PARTICULARS_OF_STOCK_HELD_CAPITAL_GOODS:
			"Particulars of Stock held - Capital Goods",
		TITLE_PARTICULARS_OF_STOCK_HELD_CAPITAL_GOODS_SUMMARY:
			"Particulars of Stock held - Capital Goods - Summary",
		TITLE_PARTICULARS_OF_STOCK_HELD_CAPITAL_GOODS_EDIT:
			"Particulars of Stock held - Capital Goods - Edit",
		TITLE_PARTICULARS_OF_PURHASES_OF_STOCK_MADE_INPUTS_AS_SUCH:
			"Particulars of purchases of stock made-Inputs As Such",
		TITLE_PARTICULARS_OF_PURHASES_OF_STOCK_MADE_INPUTS_AS_SUCH_SUMMARY:
			"Particulars of purchases of stock made-Inputs As Such - Summary",
		TITLE_PARTICULARS_OF_PURHASES_OF_STOCK_MADE_INPUTS_AS_SUCH_EDIT:
			"Particulars of purchases of stock made-Inputs As Such - Edit",
		TITLE_PARTICULARS_OF_PURCHASES_OF_STOCK_MADE_INPUT_SERVICES:
			"Particulars of purchases of stock made-Inputs Services",
		TITLE_PARTICULARS_OF_PURCHASES_OF_STOCK_MADE_INPUT_SERVICES_SUMMARY:
			"Particular of Purchase of stock made - Inputs Services - Summary",
		TITLE_PARTICULARS_OF_PURCHASES_OF_STOCK_MADE_INPUT_SERVICES_EDIT:
			"Particular of Purchase of stock made-Inputs Services - Edit",
		TITLE_PARTICULARS_OF_PURCHASES_OF_STOCK_MADE_CAPITAL_GOODS:
			"Particulars of purchases of stock made-Capital Goods",
		TITLE_PARTICULARS_OF_PURCHASES_OF_STOCK_MADE_CAPITAL_GOODS_SUMMARY:
			"Particulars of purchases of stock made- Capital Goods- Summary",
		TITLE_PARTICULARS_OF_PURCHASES_OF_STOCK_MADE_CAPITAL_GOODS_EDIT:
			"Particulars of purchases of stock made- Capital Goods - Edit",
		BTN_PREVIEW: "Preview",
		BTN_FILE_GSTR13: "File GSTR-13",
		BTN_REFUNDGSTR11: "Generate RFD-10",
		BTN_FILE_GSTR1: "File GSTR-1 with DSC",
		BTN_FILE_EVC_GSTR1: "File GSTR-1 with EVC",
		BTN_FILE_EVC_GSTR2: "File GSTR-2 with EVC",
		BTN_FILE_EVC_GSTR3: "File GSTR-3 with EVC",
		BTN_FILE_EVC_GSTR5: "File GSTR-5 with EVC",
		BTN_FILE_EVC_GSTR8: "File GSTR-8 with EVC",
		ERR_EVC_OTP:
			"Please enter correct OTP which has been sent to your registered Email ID and Mobile number.",
		BTN_FILE_GSTR_1: "File GSTR-1",
		BTN_FILE_GSTR_2: "File GSTR-2",
		BTN_UPLOAD_DETAIL: "Upload Detail",
		BTN_DSC: "DSC",
		BTN_EVC: "EVC",
		BTN_E_SIGN: "E Sign",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUT_AS_SUCH_SUMMARY:
			"Particulars of Stock held - Inputs As Such - Summary",
		TITLE_PARTICULARS_OF_STOCK_HELD_INPUT_AS_SUCH_EDIT:
			"Particulars of Stock held - Inputs As Such - Edit",
		SUPPLIERS_GSTIN: "Supplier's GSTIN",
		LBL_SUPPLIERS_GSTIN_UIN: "Supplier's GSTIN/UIN",
		BTN_UPLOAD: "Upload",
		LBL_GSTR13: "GSTR13",
		DASHBOARD: "Dashboard",
		LBL_ATTACHING_DIG_SIG: "Attaching Digital Signature",
		LBL_PREVIEW_FORM:
			"You are about to attach Digital Signature. Kindly Preview the form, before signing it.",
		LBL_DATA_DECLARATION:
			"I declare that all data filled by me are best to my knowledge.",
		LBL_DESCRIPTION_OF_COMMODITY: "Description/Nature of Commodity",
		LBL_ITC_OF_GOODS_IN_STOCK: "ITC of goods in stock ",
		LBL_PRICE_PER_UNIT: "Price per unit ",
		LBL_QUANTITY_OF_GOODS_IN_STOCK: "Quantity of goods in stock",
		LBL_QUANTITY_OF_GOODS_PURCHASED: "Quantity of goods Purchased",
		LBL_RETURNS: "Returns",
		LBL_REFRESH: "Refresh",
		LBL_MONTH_TAX_PERIOD: "Month (Tax Period)",
		LBL_REFRESH_OF_PAGE:
			"On Refresh of the page the unsaved data will be lost. Would you like to continue ?",
		LBL_PROCEED_TO_CONTINUE:
			"Press proceed to continue or cancel to go back",
		LBL_UNIT_OF_MEASUREMENT: "Unit of measurement",
		LBL_VALUE_IN_INVOICE: "Value in Invoice ",
		LBL_VALUE_OF_GOODS_IN_STOCK: "Value of goods in stock ",
		HEAD_UPLOADED_TAXPAYER: "Uploaded by Taxpayer",
		HEAD_UPLOADED_SUPPLIER: "Uploaded by Supplier",
		HEAD_MODIFIED_SUPPLIER: "Modified by Supplier",
		HEAD_CREDIT_DEBIT_NOTE_No: "Credit/debit note no.",
		HEAD_CREDIT_DEBIT_NOTE_DATE: "Credit/debit note date",
		HEAD_ORIGINAL_INVOICE_NO: "Original invoice no.",
		HEAD_ORIGINAL_INVOICE_DATE: "Original invoice date",
		HEAD_REVERSE_CHARGE: "Supply attract reverse charge",
		HEAD_DIFF_VALUE: "Differential Value",
		HEAD_STATUS: "Status",
		HEAD_CREDIT_DEBIT_NOTE_SUMMARY: "Credit/Debit Notes- Summary",
		HEAD_CRED_DEB_NOTE_WISE: "Credit/debit note wise details",
		HEAD_CREDIT_DEBIT_NOTE_UNREG_SUMMARY:
			"Credit/Debit Notes Unregistered- Summary",
		HEAD_CREDIT_DEBIT_NOTE_EDIT: "Credit/Debit Notes- Edit",
		HEAD_SR_NO: "Sr No.",
		HEAD_DIFF_TAX: "Differential Tax",
		HEAD_ELIGIBILITY_ITC: "Eligibility for ITC",
		LBL_TOTAL_IGST_AVAIL_IGST: "Total Tax available as ITC (IGST)(₹)",
		LBL_TOTAL_IGST_AVAIL: "Total Tax available as ITC (₹)",
		LBL_TOTAL_IGST_AVAIL_CESS: "Total Tax available as ITC (CESS)(₹)",
		HEAD_ITC_AVAILABLE_THIS_MONTH: "ITC available this month",
		LBL_TT_ITC_S: "Total Tax available as ITC (SGST)(₹)",
		HEAD_NO: "No.",
		HEAD_DATE: "Date",
		HEAD_RATE: "Rate (%)",
		HEAD_AMOUNT: "Amount (₹)",
		HEAD_ORIGINAL_INVOICE: "Original Invoice",
		HEAD_CREDIT_DEBIT_NOTE_AMENDMENT_SUMMARY:
			"Amended credit/debit note wise details",
		HEAD_CRE_DEB_AMNDT_EDT: "Amended Credit/Debit Notes - Edit",
		HEAD_IMPG_SUMM: "Import Of Goods/Capital Goods - Summary",
		HEAD_IMPG:
			"5 - Import of Inputs/Capital goods and Supplies received from SEZ",
		LBL_BOE_NO: "Bill of Entry No.",
		LBL_BOE_DT: "Bill of Entry Date",
		HEAD_TOTAL_TAXABLE_VALUE: "Total taxable value (₹)",
		HEAD_TTL_REV_TAX_VAL: "Total Revised Taxable value",
		HEAD_IMPG_EDIT: "Import Of Goods/Capital Goods - Edit",
		HEAD_ADD_ITEM: "Add Item",
		LBL_BOE: "Bill of Entry",
		LBL_ISAC: "Invoice Service Classification Code",
		LBL_ITXVAL: "Invoice Taxable value (₹)",
		HEAD_TOTAL_IGST_AVAILABLE_ITC: "Total Tax available as ITC (₹)",
		HEAD_VALUE: "Value",
		HEAD_TAXABLE_VALUE: "Taxable value",
		LBL_HSN: "HSN",
		HEAD_IMPS_SUMM: "Import Of Services - Summary",
		HEAD_INVOICE_NO: "Invoice No.",
		HEAD_INVOICE_DATE: "Invoice Date",
		HEAD_TTL_INV_VAL: "Total invoice value",
		HEAD_IMPS_EDIT: "Import Of Services - Edit",
		HEAD_IMPS_ADD: "Import Of Services - Add",
		HEAD_IMPS: "4C - Import of service",
		HEAD_INVOICE: "Invoice",
		LBL_TVAL: "Total Invoice Value (₹)",
		LBL_SAC: "Service Classification Code",
		LBL_NIL_SUMM: "Nil Rated - Summary",
		LBL_NIL_ADD: "Nil Rated - Add",
		LBL_NIL_ED: "Nil Rated - Edit",
		HEAD_GOODS: "Goods",
		HEAD_HSN_CODE: "HSN Code",
		LBL_VAL_SUPP: "Values of supplies received from",
		LBL_COMPD: "Compounding Dealer",
		LBL_UNREGD: "Unregistered Dealer",
		HEAD_EXEMP: "Exempted Supply",
		LBL_NILR: "Nil Rated Supply",
		LBL_NON_GSTS: "Non GST Supply",
		HEAD_SAC_CODE: "Service Classification Code",
		HEAD_ISD_CREDIT_RECEIVED_SUMMARY: "ISD Credit Received-Summary",
		HEAD_SUPPLIER_DETAILS: "GSTIN",
		HEAD_SUPPLY_TYPE: "Supply Type",
		HEAD_ISD_CREDIT_RECEIVED_EDIT: "ISD Credit Received - Edit",
		HEAD_IGST_ISD_CREDIT: "IGST - ISD Credit",
		HEAD_IMPGA_SUMM: "Amended Import Of Goods/Capital Goods - Summary",
		HEAD_TDSA_SUMM:
			"Amendments to details of tax deducted at source in respect of any earlier tax period",
		LBL_ORIG_BOE_NO: "Original Bill of Entry No.",
		LBL_ORIG_GSTIN_NO: "Original Gstin of Entry No.",
		LBL_ORIG_BOE_DT: "Original Bill of Entry Date",
		LBL_ORIG_GSTIN_DT: "Original Gstin of Entry Date",
		LBL_REV_BOE_NO: "Revised/Original Bill of Entry No.",
		LBL_REV_GSTIN_NO: "Revised/Original Gstin of Entry No.",
		LBL_REV_BOE_DT: "Revised/Original Bill of Entry Date",
		LBL_REV_GSTIN_DT: "Revised/Original Gstin of Entry Date",
		HEAD_IMPGA_EDIT: "Amended Import Of Goods/Capital Goods - Edit",
		HEAD_TDSA_EDIT: "Amend TDS Details- Edit",
		HEAD_TDSA_Amend: "Amend TDS Details- Amend",
		HEAD_IMPGA_ADD: "Amended Import Of Goods/Capital Goods - Add",
		HEAD_IMPGA_R: "Amended Import Of Goods/Capital Goods",
		HEAD_IMPGA: "Amended Import Of Goods",
		HEAD_AIMPS_SUMM: "Amended Import Of Service - Summary",
		HEAD_REVISED_INVOICE_NO: "Revised/Original Invoice No.",
		HEAD_REVISED_INVOICE_DATE: "Revised/Original Invoice Date",
		HEAD_TOTAL_INVOICE_AMOUNT: "Total Invoice Amount",
		HEAD_TOTAL_TAXABLE_AMOUNT: "Total Taxable Amount",
		HEAD_AIMPS_EDIT: "Amended Import of Service - Edit",
		HEAD_ITC_ADMISSIBILITY: "ITC Admissibility",
		HEAD_REVISED_INVOICE: "Revised/Original Invoice",
		LBL_TOT_ITC_ADMS_IG: "Total ITC Admissible as IGST (₹)",
		LBL_TOT_ITC_ADMS_CS: "Total ITC Admissible as CESS (₹) ",
		LBL_CURRENT_ITC: "ITC Admissible this month",
		LBL_CURRENT_ITC_IGST: "ITC Admissible this month as IGST (₹) ",
		LBL_CURRENT_ITC_CESS: "ITC Admissible this month as CESS (₹) ",
		HEAD_CREDIT_DEBIT_NOTES_ADD: "Credit/Debit Notes - Add",
		HEAD_CREDIT_DEBIT_NOTES_UNREG_ADD:
			"Credit/Debit Notes Unregistered - Add",
		LBL_SUPPLIER_DETAILS: "Supplier's Details",
		LBL_SUPPLIER_GSTIN: "Supplier's GSTIN",
		LBL_B2B_SUMMARY: "B2B Invoice Summary",
		LBL_UB2B_SUMMARY: "Unregistered B2B Invoice summary",
		LBL_UPD_BY_TXPYR: "Uploaded by Taxpayer",
		LBL_MDFD_BY_SUPP: "Modified by Supplier",
		LBL_ACTIONS: "Actions",
		LBL_UPLOAD: "UPLOAD",
		LBL_PENDING: "PENDING",
		LBL_ACCEPT: "ACCEPT",
		LBL_REJECT: "REJECT",
		LBL_WARNING: "Warning",
		LBL_NOTE_SAVED_SUCCFULLY: "Note saved successfully",
		LBL_B2B_EDIT: "B2B Invoices- Edit",
		LBL_TAX_AT_ITC: "Total tax available at ITC ",
		LBL_TOT_AMT_ADV_SUPP: "Total Amount of Advance/value of Supply",
		LBL_TOT_RVISD_AMT_ADV_SUPP:
			"Total Revised Amount of Advance/value of Supply",
		LBL_TOT_AMND_INVOICE_VALUE: "Total Amended Invoice Value",
		LBL_TOT_AMND_TAXABLE_VALUE: "Total Amended Taxable Value ",
		LBL_ITC_THIS_MONTH: "ITC Available this month ",
		LBL_ITEM_DETAILS: "Item Details",
		LBL_UP_DETAIL: "Upload Details",
		LBL_MISS_INV: "Add missing Invoice Details",
		LBL_ELIG_ITC: "Eligibility for ITC",
		LBL_INVOICE: "INVOICE",
		LBL_POS_STATE_CODE: "POS State Code",
		LBL_REVISED_STATE_CODE: "Revised State Code(POS)",
		LBL_ORGINL_POS_STATE_CODE: "Original POS State Code",
		LBL_INVOICE_DETAILS_INVOICE_NUMBER: "Invoice Details",
		LBL_SAVE_INVOICE: "SAVE INVOICE",
		LBL_TAX_VALUE: "Taxable value (₹)",
		LBL_CAT: "Category",
		LBL_HSN_SAC: "HSN/Service Classification Code",
		LBL_SCH: "Search",
		LBL_ADD_ITEM: "ADD ITEM",
		LBL_RVISD_DETLS: "Revised Details",
		LBL_SUPPLIER_NAME: "Supplier's Name",
		LBL_AMEND_B2B: "Amend B2B Invoice",
		LBL_B2B_INVOICE_SUPPLIER: "B2B Invoices - Supplier Details",
		LBL_AMND_B2B_INV_SUMM: "Amended B2B Invoices - Summary",
		LBL_AMENDED_B2B: "Amended B2B Invoices - Supplier Details",
		TTL_AMND_B2B_INV: "Amended B2B - Amend Invoice",
		TTL_AMND_B2B_EDITINV: "Amended B2B - Edit Invoice",
		LBL_ORIGINAL_INVOICE_NUMBER: "Original Invoice Number",
		LBL_ORIGINAL_INVOICE_DATE: "Original Invoice Date",
		LBL_REVISED_INVOICE_NUMBER: "Revised/Original invoice number",
		LBL_REVISED_INVOICE_DATE: "Revised/Original invoice date",
		LBL_AMEND_INVOICE: "Amend Invoice",
		LBL_SAVE_AMNDED_INV: "Save Amended Invoice",
		LBL_B2B_AMEND_EDIT: "Amended B2B Invoices- Edit",
		LBL_DEBIT_CREDIT_NOTE_NO: "Debit/Credit Note No.",
		LBL_DEBIT_CREDIT_NOTE_DATE: "Debit/Credit Note Date",
		LBL_REASON_ISSUING_NOTE: "Reason for Issuing Note",
		LBL_DIFFERENTIAL_VALUE: "Differential value",
		LBL_TOTAL_TAX_AVAILABLE_ITC: "Total tax available at ITC",
		LBL_CURRENT_ITC_AVAIL_IG: "ITC available this month as IGST(₹)",
		LBL_CURRENT_ITC_AVAIL_CS: "ITC available this month as CESS(₹)",
		LBL_CUR_ITC_C: "ITC available this month as CGST(₹)",
		LBL_CUR_ITC_S: "ITC available this month as SGST(₹)",
		LBL_NOTE_TYPE: "Note type",
		LBL_ORIGINAL_DEBIT_CREDIT_NOTE_NO: "Original Credit/Debit note no.",
		LBL_ORIGINAL_DEBIT_CREDIT_NOTE_DATE: "Original Credit/Debit note date",
		LBL_REVISED_DEBIT_CREDIT_NOTE_NO:
			"Original/Revised Credit/Debit Note No.",
		LBL_REVISED_DEBIT_CREDIT_NOTE_DATE:
			"Original/Revised Credit/Debit Note Date",
		LBL_INV_VAL_ONLY: "Total Invoice Value",
		LBL_ADD_ISD_INVOICE: "Add ISD Invoice",
		LBL_ENTER_BOE: "Enter Bill of Entry",
		LBL_BOEA: "AMEND BILL OF ENTRY",
		LBL_GOEA: "AMEND GSTIN OF ENTRY",
		LBL_ENTER_INVOICE_NO: "Enter Invoice No.",
		LBL_ORIGINAL_INVOICE_NO: "Original Invoice No.",
		LBL_REVISED_INVOICE_NO: "Revised/Original Invoice No.",
		LBL_REVISED_INVOICE_VALUE: "Revised/Original Invoice Value",
		LBL_TOT_TAX: "Total Tax Liability",
		LBL_CHK_PROS: "Check Pending Processes",
		LBL_BUISNESS_NAME_STARK_PVT_LTD: "Business Name - ",
		LBL_RETURN_PERIOD: "Return Period - ",
		LBL_FY: "FY - ",
		LBL_STATUS: "Status - ",
		LBL_DUE_DATE: "Due Date - ",
		LBL_GRSS_TRNOVER_TAXPYR:
			"Aggregate Turnover in the preceeding financial year",
		LBL_CUR_GRSS_TRNOVER: "Aggregate Turnover - April to June, 2017",
		LBL_B2B_INVOICES: "4A, 4B, 4C, 6B, 6C - B2B Invoices",
		LBL_GSTR11B2B_INVOICES: "3A - Details of Invoices received",
		LBL_B2B_R1A_INV: "3, 4 - B2B Invoices",
		LBL_B2B_GSTR2_INV:
			"3,4A - Inward supplies received from Registerd person including reverse charge supplies",
		LBL_TOTAL_IGST: "Total IGST",
		LBL_TOTAL_SGST: "Total SGST",
		LBL_TOTAL_CGST: "Total CGST",
		LBL_PNDNG_ACTN: "Pending for Action",
		LBL_B2C_INVOICES: "5A, 5B - B2C (Large) Invoices",
		LBL_CREDIT_DEBIT_NOTES: "5 - Credit / Debit Notes (Registered)",
		LBL_NUMBR_CREDIT_DEBIT_NOTES: "Number of Credit/Debit Notes",
		LBL_NUMBR_ORIGINAL_INVOICES: "Number of Original Invoices",
		LBL_NMBR_EXPRT_INV: "Number of Export Invoices",
		LBL_NMBR_REV_EXPRT_INV: "Number of Revised Export Invoices",
		LBL_EXPORTS_INVOICES: "6A - Exports Invoices",
		LBL_AMNDED_B2B_INV: "9A - Amended B2B Invoices",
		LBL_AMNDED_B2B_INV_TILE: "6A - Amended B2B Invoices",
		HEAD_AMNDED_B2B_INV_SUMRY: "Amended B2B Invoices Summary",
		LBL_B2B_INV_SUMRY: "B2B Invoices - Summary",
		LBL_GSTR11B2B_INV_SUMRY: "Details of Invoices received - Summary",
		LBL_B2B_INV_RCVR_SUMRY: "B2B Invoices - Receiver-Wise-Summary",
		LBL_B2B_INV_SUPP_SUMRY: "B2B Invoices - Supplier-Wise-Summary",
		LBL_GSTR11B2B_INV_SUPP_SUMRY:
			"Details of Invoices received- Supplier-Wise-Summary",
		HEAD_B2B_INV_SUMRY_MAH_ELTRNCS:
			"B2B Invoices - Summary | Mahesh Electronics",
		LBL_AMEND_DETAILS: "Amend Details",
		LBL_AMNDD_B2C_INV: "9A - Amended B2C ( Large ) Invoices",
		TTL_AMND_B2C_AMND_INVC: "Amended B2C(Large) - Amend Invoice",
		TTL_AMND_B2C_EDIT_INVC: "Amended B2C(Large) - Edit Invoice",
		TITLE_AMENDED_B2C_AMEND_DETAILS: "Amended B2C(Others) - Amend Details",
		TTL_AMND_B2C_ADD_AMEND_DETILS:
			"Amended B2C(Others) - Add Amended Details",
		TTL_AMND_B2C_AMND_INVC_SUMRY: "Amended B2C(Others) Details - Summary",
		TTL_AMND_B2C_DETILS_SUMRY: "Amended B2C(Large) Invoices- Summary",
		TITLE_B2C_INVOICES_DETAILS: "B2C(Large) Invoices- Details",
		LBL_AMENDED_B2C_DETAILS: "Amended B2C (Others) Details",
		LBL_AMD_B2C: "10 - Amended B2C(Others)",
		HEAD_B2C_DETAILS_SUMMRY: "B2C (Others) Details - Summary",
		LBL_AMENDED_CREDIT_DEBIT_NOTES:
			"Amended Credit / Debit Notes (Registered)",
		LBL_AMENDED_CREDIT_DEBIT_NOTES_TILE:
			"6D - Amended Credit / Debit Notes (Registered)",
		LBL_AMEND_EXP_INV: "9A - Amended Exports Invoices",
		LBL_B2C: "7 - B2C (Others)",
		LBL_ISD_CREDIT_RECEIVED: "8 - ISD Credit received",
		LBL_ADVANCE_TAX_AMT_PAID: "Amount of Tax to be Paid on Advance",
		LBL_ADVANCE_TAX_PAID: "Advance Tax Paid",
		LBL_ADVANCE_TAX_LIABILITY: "Advance Tax Liability",
		LBL_TAX_PAID: "Tax Paid",
		LBL_TOTAL_TAX: "Total Tax",
		LBL_TAX_PAID_UNDER_REVRS_CHRGE:
			"10B - Adjustment of advance amount paid earlier for reverse charge supplies",
		LBL_TAX_PAID_UNDER_REVRS_CHRGE_TILE:
			"10(I) - 10B - Adjustment of advance amount paid earlier for reverse charge supplies",
		LBL_TAX_PAID_UNDER_REVRS_CHRGE_SUM:
			"Adjustment of advance amount paid earlier for reverse charge supplies - Summary",
		LBL_TAX_PAID_UNDER_REVRS_CHRGE_ADD:
			"Adjustment of advance amount paid earlier for reverse charge supplies - Add",
		LBL_TAX_PAID_UNDER_REVRS_CHRGE_EDIT:
			"Adjustment of advance amount paid earlier for reverse charge supplies - Edit",
		LBL_TAX_CREDIT_RECEIVED: "Tax Credit Received",
		LBL_ITC_AVAILED: "ITC availed added as output Tax",
		LBL_TOTAL_ITC: "Total ITC available",
		LBL_AUTHORISED_SIGNATORY: "Authorised Signatory",
		LBL_VIEW_DETAILS_TABLE:
			"To Add / View Details in a Particular Table Please Click in the Respective Table.",
		LBL_DECLARATION:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my/our knowledge and belief and nothing has been concealed therefrom.",
		LBL_TEXT: "text",
		LBL_COUNTERPARTY_INVOICE:
			"You do not have counterparty invoice for the selected period.",
		LBL_CNTRPRTY_INV:
			"You do not have counterparty debit/credit note for the selected period.",
		LBL_RECEIVER_DETAILS: "Receiver Details ",
		LBL_SUPP_DETAILS: "Supplier Details ",
		LBL_ERROR: "Error!",
		GSTR1: "Details of outward supplies of goods or services",
		GSTR2: "Inward supplies received by taxpayer (For taking action)",
		GSTR1E: "Table 6A of FORM GSTR1",
		GSTR3V1: "Comparison of liability declared and ITC claimed",
		GSTR3: "Monthly Return",
		GSTR3B: "Monthly Return",
		GSTR3B_M_TITLE: "Monthly Return",
		GSTR3B_Q_TITLE: "Quarterly Return",
		GSTR3B_M_LABEL: "GSTR-3B",
		GSTR3B_Q_LABEL: "GSTR-3BQ",
		GSTR9: "Annual Return",
		GSTR1A: "Details of auto drafted supplies",
		GSTR5: "Monthly return by Non-Resident Foreign Taxpayer",
		GSTR2A: "Auto Drafted details (For view only)",
		GSTR2B: "Auto - drafted ITC Statement for the month",
		GSTR2BQ: "Auto - drafted ITC Statement for the quarter",
		GSTR2X: "TDS and TCS credit received",
		LBL_IGSTR: "IGST Rate (%)",
		LBL_IGSTA: "IGST Amount (₹)",
		LBL_SGSTR: "SGST Rate (%)",
		LBL_CESSR: "CESS Rate (%)",
		HEAD_IMPG_ADD: "Import Of Goods/Capital Goods - Add",
		LBL_SVITM: "Save Item",
		LBL_NO_BILL:
			"You do not have any Bill of Entry for the current period.",
		LBL_ADD_BILL_SUCCESS: "Your Bill Entry has been saved successfully.",
		LBL_INV_SAVE: "Invoice saved successfully.",
		LBL_ADD_BOE: "Add new Bill of Entry",
		HEAD_OUTWARD_SUPPLIES: "4. Outward Supplies",
		HEAD_INTERSTATE_REGTAX: "Inter State Supplies to Registered Taxpayers",
		HEAD_INTRASTATE_REGTAX: "Intra State Supplies to Registered Taxpayers",
		HEAD_OUTSUP_EXPORT: "Exports",
		HEAD_TOTTAX_LIAB_OUTSUP: "Total Tax Liability on Outward Supplies",
		HEAD_INTERSTATE_CONSUMER: "Inter State Supplies to Consumers",
		HEAD_INTRASTATE_CONSUMER: "Intra State Supplies to Consumers",
		HEAD_REVISION_SUP_INVOICE: "Revision Of Supply Invoices",
		LBL_DET_OUTSUP:
			"Details of Outward Supplies are auto-populated from GSTR-1",
		LBL_DET_NAME: "Details Name",
		LBL_IGST: "IGST",
		LBL_CGST: "CGST",
		LBL_SGST: "SGST",
		LBL_STATE_COD: "State Code",
		LBL_RATE_TAX: "Rate of Tax (%)",
		HLP_INV: "Enter Invoice Number",
		HLP_INV_SAC: "Enter Invoice Service Classification Code",
		HLP_INV_TAX: "Enter Invoice Taxable Value",
		HLP_HSN: "Enter HSN",
		HLP_TVAL: "Enter Taxable Value",
		HLP_IGST_RT: "Enter IGST Rate",
		HLP_CESS_RT: "Enter CESS Rate",
		HLP_CESS_AMT: "Enter CESS Amount",
		HLP_TT_AVAIL_IG: "Enter Total Tax available as ITC (IGST)",
		HLP_TT_AVAIL_S: "Enter Total Tax available as ITC (SGST)",
		HLP_TT_AVAIL_C: "Enter Total Tax available as ITC (CGST)",
		HLP_TT_AVAIL_CS: "Enter Total Tax available as ITC (CESS)",
		HLP_ITC_AVAIL_IG: "Enter ITC available this month (IGST)",
		HLP_ITC_AVAIL_S: "Enter ITC available this month (SGST)",
		HLP_ITC_AVAIL_C: "Enter ITC available this month (CGST)",
		HLP_ITC_AVAIL_CS: "Enter ITC available this month (CESS)",
		HLP_ITC_ADD: "Enter Total ITC Admissible",
		HLP_ITC_ADD_IG: "Enter Total ITC Admissible as IGST",
		HLP_ITC_ADD_CS: "Enter Total ITC Admissible as CESS",
		HLP_ITC_ADDM_IG: "Enter ITC Admissible this month as IGST",
		HLP_ITC_ADDM_CS: "ITC Admissible this month as CESS",
		HLP_VAL_SUPP: "Enter value of Supplies",
		HLP_ITC_LESS: "Total ITC  Amount shall not exceed the IGST amount",
		HLP_ITC_LESS_CESS: "Total ITC  Amount shall not exceed the CESS amount",
		HLP_ITCM:
			"ITC availed this month is more than the Total IGST available as ITC.",
		HLP_DATA_Z: "Amount should be greater than zero",
		ERR_INVD: "Invalid Date",
		ERR_HSN: "HSN length should be between 2 and 8",
		ERR_SAC:
			"HSN/Service Classification Code is invalid. Please enter a valid HSN/Service Classification Code.",
		HEAD_TCS_SUMM: "TCS Credit Received-View",
		LBL_NOTE_ACCEPTED: "Note Accepted",
		LBL_NOTE_REJECTED: "Note Rejected",
		HEAD_TDS_CREDIT_RECEIVED: "TDS Credit Received-Summary",
		LBL_UPD_BY_SUPP: "Uploaded by Supplier",
		HEAD_TAXPD_SUMM: "Tax paid under Reverse Charge - Summary",
		HEAD_TAXPD_ADD: "Tax paid under Reverse Charge - Add",
		HEAD_TAXPD_EDIT: "Tax paid under Reverse Charge - Edit",
		HEAD_DETAILS: "Details",
		LBL_CGSTR: "CGST Rate (%)",
		HLP_CGST_RT: "Enter CGST Rate",
		HLP_CGST_AMT: "Enter CGST Amount",
		HLP_SGST_RT: "Enter SGST Rate",
		HLP_SGST_AMT: "Enter SGST Amount",
		LBL_ADVANCE_RECEIPT: "Advance Receipt Number",
		TITLE_TAX_LAI_ADV_PMT_ADD: "Tax Liability (Advance Payment) - Add",
		LBL_SUPP_GSTIN_NAME: "Supplier GSTIN/Name",
		LBL_ORG_DOC_DATE: "Original Document Date",
		LBL_INTRA_STATE: "Intra-State",
		LBL_INTER_STATE: "Inter-State",
		LBL_STATE_CODE1: "State Code",
		TITLE_TAX_LAI_ADV_PMT_EDIT: "Tax Liability (Advance Payment) - Edit",
		HLP_SUPP_GSTIN_NAME: "Enter Supplier GSTIN/Name",
		HLP_ORG_DOC_NO: "Enter Original Document No.",
		HLP_ORG_DOC_DATE: "Enter Original Document Date",
		HLP_STATE_CODE: "Enter State Code",
		HLP_TAXABLE_VALUE: "Enter Total Taxable Value",
		LBL_HSN_SAC_SUP: "HSN/Service Classification Code of supply",
		HLP_HSN_SAC_SUP: "Enter HSN/Service Classification Code of supply",
		LBL_G: "G",
		LBL_S: "S",
		LBL_CGSTA: "CGST Amount (₹)",
		LBL_SGSTA: "SGST Amount (₹)",
		HLP_IGST_AMT: "Enter IGST Amount",
		LBL_SAVE_TAX_LIAB: "SAVE TAX LIABILITY",
		HLP_SUP_N: "Enter Supplier's Name",
		HLP_TT_VAL: "Enter Total Invoice Value",
		HLP_ORG_INV_NO: "Enter Original Invoice No.",
		HLP_REV_ORG_INV_NO: "Enter Revised/Original Invoice No.",
		HLP_TOTAL_INVOICE_AMOUNT: "Enter Total Invoice Amount",
		HLP_TOTAL_TAXABLE_AMOUNT: "Total Taxable Amount",
		LBL_TOTAL_INVOICE_AMOUNT: "Total Invoice Amount",
		LBL_TOTAL_TAXABLE_AMOUNT: "Total Taxable Amount",
		LBL_CESS_RATE: "CESS Rate",
		LBL_CESS_AMOUNT: "CESS Amount",
		LBL_REGISTERED: "REGISTERED",
		LBL_UNREGISTERED: "UNREGISTERED",
		LBL_TOTAL_IGST_AVAILABLE_ITC: "Total available as ITC IGST",
		LBL_TOTAL_CESS_AVAILABLE_ITC: "Total available as ITC CESS",
		HEAD_ITC_IGST_AVAILABLE_THIS_MONTH: "ITC admissible this month IGST",
		HEAD_ITC_CESS_AVAILABLE_THIS_MONTH: "ITC admissible this month CESS",
		HLP_CESSM:
			"ITC availed this month is more than the Total CESS available as ITC.",
		LBL_BOE_VAL: "Bill of Entry Value (₹)",
		HLP_BOE_VAL: "Enter Bill of Entry Value",
		LBL_PORT_CODE: "Port Code",
		LBL_ORG_PORT_CODE: "Original Port Code",
		LBL_ORG_REV_PORT_CODE: "Original/Revised Port Code",
		HLP_PORT_CODE: "Enter Port Code",
		TITLE_REGISTER_TYPE: "Registered",
		TITLE_UNREG_TYPE: "UnRegistered",
		LBL_REG_TYP: "Registration Type",
		HLP_DOC: "Enter Document Number",
		ERR_INV_RATE: "Invalid Rate",
		LBL_ADD_NIL_SUP: "ADD NIL SUPPLIES",
		ERR_CESS:
			"Amount entered under total CESS available as ITC  shall be less than or equal to CESS paid",
		HLP_HSN_SAC: "Enter HSN/Service Classification Code",
		LBL_TOT_CESS: "CESS (₹)",
		LBL_GSTIN_ECOM: "GSTIN of e-commerce operator",
		ERR_LIM: "Should be between 0 to 100",
		ERR_SAME_CTIN: "Recipient and supplier cannot be the same.",
		TIT_B2CL_INV_SUMM: "B2C(Large) Invoices- Summary",
		MSG_UPDATE: "Click Here for update",
		MSG_PROCESSED: " Your request is being processed with reference id",
		HEAD_ITC_RECEIVED:
			"ITC Received on which Partial Credit Availed - Summary",
		TITLE_ITC_RECEIVED_ADD: "ITC Received - Add",
		TITLE_ITC_RECEIVED_EDIT: "ITC Received - Edit",
		LBL_IGST_EARLIER: "IGST Earlier(₹)",
		LBL_IGST_THIS_MONTH: "IGST This month(₹)",
		LBL_CGST_EARLIER: "CGST Earlier(₹)",
		LBL_CGST_THIS_MONTH: "CGST This month(₹)",
		LBL_SGST_EARLIER: "SGST Earlier(₹)",
		LBL_SGST_THIS_MONTH: "SGST This month(₹)",
		LBL_CESS_EARLIER: "CESS Earlier(₹)",
		LBL_CESS_THIS_MONTH: "CESS This month(₹)",
		HLP_LBL_IGST_EARLIER: "Enter IGST Earlier",
		HLP_LBL_IGST_THIS_MONTH: "Enter IGST This Month",
		HLP_LBL_CGST_EARLIER: "Enter CGST Earlier",
		HLP_LBL_CGST_THIS_MONTH: "Enter CGST This Month",
		HLP_LBL_SGST_EARLIER: "Enter SGST Earlier",
		HLP_LBL_SGST_THIS_MONTH: "Enter SGST This Month",
		HLP_LBL_CESS_EARLIER: "Enter CESS Earlier",
		HLP_LBL_CESS_THIS_MONTH: "Enter CESS This Month",
		HEAD_GSTIN: "GSTIN",
		LBL_DBNOTE: "DEBIT NOTE",
		HEAD_DOC_TYPE: "Document Type",
		HEAD_STIN: "STIN",
		HLP_STIN: "ENTER STIN",
		LBL_IMPG: "IMPG",
		LBL_REV_SUPP_UIN_NAME: "Original/Revised Supplier GSTIN/UIN",
		LBL_OCOUNTER_PARTY: "Original Counter Party Details",
		HLP_OCOUNTER_PARTY: "Enter Original Counter Party Details",
		LBL_COUNTER_PARTY: "Counter Party Details",
		HLP_COUNTER_PARTY: "Enter Counter Party Details",
		LBL_TAX_VAL_INWRD_SUPP: "Taxable Value/Value of inward supply(₹) ",
		LBL_INTER_B2B: "Inter state B2B",
		LBL_INTRA_B2B: "Intra state B2B",
		LBL_INTER_B2C: "Inter state B2C",
		LBL_INTRA_B2C: "Intra state B2C",
		LBL_Imports: "Imports",
		LBL_Type_Supply: "Type of Supply",
		HLP_BOE_NO: "Enter Bill of Entry No.",
		HLP_GSTIN_NO: "Enter Gstin of Entry No.",
		HEAD_GSTR11: "GSTR-11 -Quaterly Return",
		LBL_CESSA: "CESS Amount (₹)",
		LBL_RC: "Refunds claimed from cash ledger",
		HLP_CESS_LESS: "Total ITC Amount shall not exceed the CESS Amount",
		LBL_TT_ITC_C: "Total Tax available as ITC (CGST)(₹)",
		ERR_ADD_ITEM: "Do add an item.",
		ERR_REG_CTIN: "Do enter a registered GSTIN/UIN.",
		ERR_REG_CTIN_DET: "Do enter a registered GSTIN",
		ERR_REG_ETIN: "Please enter a registered ETIN",
		ERR_SEZ_CTIN: "Please enter SEZ GSTIN",
		LBL_HSN_SAC_CODE: "HSN/Service Classification Code",
		HEAD_TURNOVDET: "3. Turnover Details",
		LBL_NET_TAX_TRNOVR: "Net Taxable Turnover",
		LBL_TOTAL_TRNOVR: "Total  Turnover [A to D]",
		LBL_TOTAL_TURNOVER: "Total  Turnover",
		LBL_NON_GST_TRNOVR: "Non GST Turnover",
		LBL_NILRATED_EXEMPTED_TRNOVR: "Nil Rated and Exempted Turnover",
		LBL_DETAIL_SVD: "Details saved successfully",
		LBL_TAX_TRNOVR: "Taxable Turnover ",
		BTN_FILE_GSTR_3: "File GSTR-3 with DSC",
		LBL_GST3_MONTHLY_RETURN: "GSTR-3 - Monthly Return",
		LBL_ADD_VIEW_MESSAGE:
			"To Add / View Details in a Particular Table Please Click in the Respective Table.",
		LBL_TRNOVER_DETAILS: "Turnover Details",
		LBL_GRS_TRNOVR: "Gross Turnover",
		HEAD_TRNOVER_DETAILS: "Turnover Details",
		HEAD_ITC_CREDIT: "6. Input Tax Credit",
		HEAD_TAX_PAID: "Tax Paid",
		HEAD_REFUND_CLAIM: "11 - Refund claimed from Electronic cash ledger",
		HEAD_TOTAL_TAX_LIABILITY: "Total Tax Liability",
		HEAD_TDS_CREDIT: "9A. TDS Credit",
		HEAD_TCS_CREDIT: "9B. TCS Credit",
		LBL_DOC_NUMBER: "Document No.",
		LBL_DOC_DATE: "Document Date",
		LBL_DET_INWSUP:
			"Details of Inward Supplies are auto-populated from GSTR-2",
		LBL_TAX_CRED: "Tax Credit",
		LBL_INTER_SUP: "5.A.1 Inter-State inward supplies [Rate Wise]",
		LBL_INTRA_SUP: "5.A.2 Intra-State inward supplies  [Rate Wise]",
		LBL_IMPORTS: "Imports",
		LBL_REV_INV: "Revision of Invoices",
		HEAD_INTER_SUP: "Inter State Supplies Received",
		LBL_ITC_CREDIT: "ITC Credit",
		HEAD_TotalTaxLiability: "8. Total Tax Liability for the month",
		HEAD_TTLOUTWARD:
			"8A. Total Tax Liability for the month on outward supplies",
		HEAD_TTLINWARD:
			"8B. Total Tax Liability for the month on inward supplies attracting reverse charge",
		HEAD_TTLITC:
			"8C. Total Tax Liability for the month on account of Input Tax Credit reversal/reclaim",
		HEAD_TTLMIS:
			"8D. Total Tax Liability for the month on account of mismatch/rectification/other reasons",
		LBL_TotalTaxLiability_Info:
			"Details of Total Tax Liabilty are auto-populated from GSTR-3",
		LBL_TYPE_SUPPLY: "Type of Supply",
		LBL_ITC_IGST: "ITC of IGST Available in the Current Month (₹)",
		LBL_ITC_IGST_R: "ITC - IGST Available in the Current Month (₹)",
		LBL_ITC_CESS: "Amount of ITC claimed as CESS(₹)",
		LBL_ITC_CGST: "ITC - CGST Available in the Current Month (₹)",
		LBL_ITC_SGST: "ITC - SGST Available in the Current Month (₹)",
		LBL_ITC_CESS_R: "ITC - CESS available in current month (₹)",
		LBL_ASSESS_VALUE: "Assessable Value (₹)",
		LBL_GSTIN_UIN: "GSTIN/UIN",
		LBL_DOC_TYPE: "Document Type",
		LBL_NUMBER: "Number",
		LBL_ITC_CUR_MONTH: "ITC Available in the Current Month",
		HEAD_GSTR2: "GSTR-2 - Inward Supplies received by the Taxpayer",
		HEAD_GSTR2_DETAILS: "GSTR-2 - Invoice Details",
		HEAD_IMPSA: "Amended Import Of Services",
		HEAD_CDN: "6C - Debit/Credit Notes for supplies from registered person",
		HEAD_TCS: "TCS Credit received",
		HEAD_GSTN_SP: "GSTIN of supplier",
		HEAD_GSTN_ISD_SP: "GSTIN_ISD",
		HEAD_TYP_DC: "Type of note (Debit/Credit)",
		LBL_ORIGINAL_DEBIT_CREDIT: "Original Debit/Credit Note",
		LBL_REVISED_DEBIT_CREDIT_NOTE:
			"Original/Revised Debit Note/credit note",
		HEAD_GSTN_DC: "GSTIN of deductor",
		HEAD_PAY_DT_DC: "Date of Payment made to the deductee",
		HEAD_TDS_VL: "Value on which TDS is to be deducted",
		HEAD_TCS_TLD_VL: "Taxable Value on which TCS has been deducted",
		BTN_SUBMIT: "SUBMIT",
		LBL_REGISTERED_TAXPAYERS:
			"Inward supplies received from Registered Taxable Persons",
		LBL_B2BA_INW_SUP:
			"Amendments to details of inward supplies received in earlier tax periods",
		LBL_CRE_DEB: "Details of Credit/Debit Notes",
		LBL_INVOICE_DETAILS: "Invoice/Document Details",
		HEAD_LED_IGST: "IGST",
		ERR_INV_DATE: "Do enter the correct date in DD/MM/YYYY format.",
		ERR_INV_DATE_To_New: "To Date cannot be later than the current date.",
		ERR_INV_DATE_From_New:
			"From Date cannot be later than the current date.",
		HEAD_LED_CGST: "CGST",
		HEAD_LED_SGST: "SGST",
		HEAD_LED_CESS: "CESS",
		LBL_CREDIT: "Credit(A)",
		LBL_DEBIT: "Debit: Credit Utilisation (B)",
		LBL_MATCHED: "Matched",
		LBL_MISMATCHED: "Mismatched",
		LBL_PROVIS: "Provisional",
		LBL_FIN_YEAR: "Financial Year",
		LBL_MONTH: "Month",
		LBL_ITC_BAL: "ITC Balance",
		LBL_UTIL_ITC: "Utilize ITC",
		LBL_LED_VIEW: "Ledger Views",
		LBL_SUM_LEDG: "Summary Ledger",
		LBL_DET_LEDG: "Detailed Ledger",
		LBL_GO: "GO",
		LBL_DET_TDSCREDIT:
			"Details of TDS Credit are auto-populated from GSTR-2",
		LBL_GSTN_TDS_DEDUCTOR: "GSTIN of TDS Deductor",
		ERR_HSN_VAL:
			"Invalid HSN/Service Classification Code.It can be minimum of 2 digits and maximum of 8 digits.",
		ERR_SAC_DIG_VAL:
			"Invalid Service Classification Code.It can be minimum of 2 digits and maximum of 8 digits.",
		ERR_EXP_HSN_VAL:
			"HSN/Service Classification Code should be of 8 digits",
		ERR_SAC_VAL:
			"Invalid Service Classification Code. Service Classification Code is mandatory if previous year turnover is more than 5 Cr.",
		ERR_DUP_INV_NO: "This Invoice number already exist",
		ERR_DUP_DOC_NO: "This DOC No already exist",
		"ERR_DUP_CRED/DEBT_NO": "This Credit/Debit No already exist",
		ERR_INV_GSTN:
			"The GSTIN/UIN is invalid. Please enter a valid GSTIN/UIN",
		ERR_INV_GSTIN_DET: "The GSTIN is invalid. Please enter a valid GSTIN",
		LBL_TOT_IGST: "IGST (₹)",
		LBL_TOT_CGST: "CGST (₹)",
		LBL_TOT_SGST: "SGST (₹)",
		LBL_TAXABLE_VALUE_RS: "Total Taxable Value(₹)",
		LBL_VALUE_RS: "Value(₹)",
		LBL_TAX_CRED_RS: "Tax Credit (₹)",
		LBL_TAX_RS: "Tax (₹)",
		LBL_SER_NUM: "Sr. No.",
		LBL_MAIN_PG_IS: "GENERATE GSTR2 SUMMARY",
		LBL_GEN_SUM: "GENERATE GSTR1 SUMMARY",
		IFF: "Invoice Furnishing Facility",
		LBL_OPTIONAL: "Optional",
		LBL_GSTINISD: "GSTIN_ISD",
		LBL_ELIGIBLE_ISD: "Eligible ISD Credit",
		HLP_ITC_IIG:
			"Total Tax available as ITC(Integrated Tax) shall not exceed the Integrated Tax Amount",
		HLP_ITC_ISG:
			"Total Tax available as ITC(State/UT tax) shall not exceed the State/UT tax Amount",
		HLP_ITC_ICG:
			"Total Tax available as ITC(Central Tax) shall not exceed the Central Tax Amount",
		HLP_ITC_ICS:
			"Total Tax available as ITC(CESS) shall not exceed the CESS Amount",
		HLP_ITC_TAX:
			"Amount of ITC available shall not exceed the Amount of Tax",
		HLP_ITCM_IIGM:
			"ITC availed this month as IGST is more than the Total IGST available as ITC.",
		HLP_ITCM_ISGM:
			"ITC availed this month as SGST is more than the Total SGST available as ITC.",
		HLP_ITCM_ICSM:
			"ITC availed this month as CESS is more than the Total CESS available as ITC.",
		HLP_ITCM_ICM:
			"ITC availed this month as CGST is more than the Total CGST available as ITC.",
		TITLE_CDT_NTS_EDIT: "Credit/Debit Notes - Edit",
		TITLE_CDT_NTS_UNREG_EDIT: "Credit/Debit Notes Unregistered - Edit",
		LBL_SUPP_GSTIN_UID: "Supplier GSTIN",
		HLP_SUPP_GSTIN_UID: "Enter Supplier GSTIN",
		HLP_REC_GSTIN: "Enter Receiver GSTIN",
		LBL_SUPP_NAME: "Supplier name",
		HLP_SUPP_NAME: "Enter Supplier Name",
		HLP_CDT_NOT_NUM: "Enter Debit/Credit Note No.",
		TITLE_CREDIT: "Credit",
		LBL_SLS_RET: "Sales Return",
		LBL_CORR_INV: "Correction in Invoice",
		LBL_DEFI_SER: "Deficiency in services",
		LBL_POST_SALE_DIS: "Post Sale Discount",
		LBL_CDN_INVOICE_SUPPLIER: "Credit/Debit Notes - Supplier Details",
		HLP_CTCM:
			"ITC availed this month is more than the Total CGST available as ITC.",
		HLP_STCM:
			"ITC availed this month is more than the Total SGST available as ITC.",
		LBL_ADD_SUPP_DET: "Add Receiver Details",
		TITLE_DEBIT: "Debit",
		TITLE_REFUND: "Refund",
		TITLE_REFUND_VOUCHER: "Refund voucher",
		LBL_REV_CHARGE: "% Reverse Charges",
		HLP_INV_NUM: "Enter Invoice No",
		HEAD_TYPEOF_NOTE: "Type of note (Debit/Credit)",
		"HEAD_D/C_NOTE": "Debit Note/ Credit Note)",
		LBL_SAVE_SUPP_DETA: "SAVE SUPPLIER DETAILS",
		LBL_SAVE_TXPYR_DETA: "SAVE TAXPAYER DETAILS",
		LBL_ADD_TXPYR_DETA: "ADD TAXPAYER DETAILS",
		HEAD_TAXPAYER_DETAILS: "Taxpayer Details",
		HEAD_SELECT: "Select",
		LBL_GSTIN1: "GSTIN",
		BTN_AMEND_TAXPAYER_DETAILS: "Amend Taxpayer Details",
		LBL_CDNA_INVOICE_SUPPLIER:
			"Amended Credit/Debit Notes - Supplier Details",
		HEAD_CDNA_INVOICE_SUPPLIER:
			"Amended Credit/debit notes – Supplier wise details",
		ERR_DT_EXC_CRDT:
			"Date is Invalid. Date of invoice cannot exceed the current tax period",
		ERR_SBDT_EXC_CRDT:
			"Date is Invalid. Date of shipping cannot exceed the current tax period",
		ERR_SBDT_EXC_INVDT:
			"Shipping Bill Date will always be on or after Invoice Date",
		ERR_VALID_AMOUNT: "Total Amount should not be less than 1000",
		ERR_VALID_INPUTS: "Please Enter Valid Input",
		LBL_MODIFY: "Modify",
		LBL_B2BT_DHS_TTL:
			"3, 4A - Inward supplies from registered person including supplies attracting reverse charge",
		LBL_IMPGT_DHS_TTL:
			"Inputs/Capital goods received from Overseas or from SEZ units on a Bill of Entry",
		LBL_IMPGAT_DHS_TTL:
			"Amendments in Goods/Capital goods received from Overseas (Import of goods) of earlier tax periods",
		LBL_IMPST_DHS_TTL:
			"Services received from a supplier located outside India (Import of services)",
		LBL_IMPSAT_DHS_TTL:
			"Amendments in Services received from a supplier located outside India (Import of services) of earlier tax periods",
		LBL_CDNT_DHS_TTL: "Details of Credit/Debit Notes",
		LBL_CDNAT_DHS_TTL:
			"Amendment to Details of Credit/Debit Notes of earlier tax periods",
		LBL_ISDT_DHS_TTL: "ISD credit received",
		LBL_NILT_DHS_TTL:
			"Supplies received from compounding /unregistered dealer & other exempt/nil/non GST supplies",
		LBL_TDST_DHS_TTL: "TDS Credit received",
		LBL_TCST_DHS_TTL: "TCS Credit received",
		LBL_ITCT_DHS_TTL:
			"ITC Received on an invoice on which partial credit availed earlier",
		LBL_ATT_DHS_TTL:
			"Tax liability under Reverse Charge arising on account of time of Supply without receipt of Invoice",
		LBL_ATAT_DHS_TTL:
			"Amendment in Tax liability under Reverse Charge arising on account of time of Supply without receipt of Invoice",
		LBL_TXPDT_DHS_TTL:
			"Tax already paid under Reverse Charge in earlier tax periods on account of time of supply for which invoiissued in the current period",
		LBL_ITCRT_DHS_TTL: "ITC Reversal",
		LBL_HSN_DHS_TTL: "Quantity of goods Purchased",
		LBL_MAIN_PG_GSTR1A: "GENERATE GSTR1A SUMMARY",
		LBL_RTN_FIL_PRD: "Return Filing Period",
		HEAD_CESS_R: "CESS (₹)",
		LBL_CTIN_SEARCH: "CTIN",
		BTN_FILE_GSTR2: "FILE GSTR2 with DSC",
		LBL_EXP_TRNOVR: "Export Turnover",
		ERR_SWEB_10001: "No record(s) found",
		EM_SRS_FO_030_04: "'From' Date cannot be greater than ‘To’ Date",
		ERR_EM_SRS_FO_030_03: " Please select a State/UT.",
		ERR_HSN_CODE_NAME: "Please enter HSN code or name",
		ERR_SAC_CODE_NAME: "Please enter Service Classification Code or name",
		ERR_ENTER_FROM: "Please select a ‘From’ Date",
		ERR_ENTER_TO: "Please select a ‘To’ Date",
		SUCSS_SWEB_9019:
			"Your password has been successfully reset. Kindly login using the new password.",
		SUCSS_SWEB_9020:
			"Username has been emailed to your registered Email Address. Kindly check your email.",
		SUCSS_USR_CR:
			"Username and password have been successfully created. Kindly login using these credentials",
		INFO_NO_DRFT_APPLN: "No draft application is available.",
		HLP_ARN: "Enter ARN",
		HEAD_TRA_RET_STA: "Track Return Status",
		LBL_ACK_NUM: "Enter ARN Number",
		LBL_RET_FIL_PER: "Return Filing Period",
		LBL_SER_BY_ARN: "Search based on ARN Number",
		LBL_SER_BY_DOF: "Search based on Return Filing Period",
		LBL_SER_BY_STS: "Search based on Status",
		ERR_MAND_ACK: "It is a mandatory field; cannot be left blank.",
		ERR_FROM_DATE_GRT_TO: "From Date cannot be greater than ‘To’ Date",
		ERR_FROM_DATE_ENTER: "Please select a ‘From’ Date",
		ERR_TO_DATE_ENTER: "Please select a ‘To’ Date",
		ERR_TO_SMALL_THAN_FROM: "'To' Date cannot be less than ‘From’ Date",
		ERR_FROM_GRT_THAN_TO: "From Date cannot be greater than ‘To’ Date",
		ERR_FROM_GRT_THAN_CURRENT: "‘From’ date cannot be a future date",
		ERR_TO_GRT_THAN_CURRENT: "'To' date cannot be a future date",
		ERR_INVALID_ARN: "The ARN is invalid. Please enter a valid ARN.",
		ERR_SELECT_STATUS: "Please select a 'Status'",
		ERR_SYSTEM_ERROR: "System error occured",
		ERR_MALFOR_REQ: "Malformed Request",
		LBL_TAX_PER: "Tax Period",
		LBL_RET_NO: "Return Type",
		LBL_FILLED_BY: "Filed By",
		LBL_DAT_OF_FIL: "Date of filing",
		LBL_MOD_OF_FILLI: "Mode of filing",
		LBL_SEARCH: "Search",
		LBL_DEB_NUM: "Debit Number",
		LBL_BANK_AC_NUM: "Bank Account Number",
		LBL_MIN_HEAD: "Minor Head",
		LBL_INTEREST_RS: "Interest (₹)",
		LBL_PENALTY_RS: "Penalty (₹)",
		LBL_FEE_RS: "Fee (₹)",
		LBL_OTHERS_RS: "Others (₹)",
		LBL_TOTAL_RS: "Total (₹)",
		ERR_INV_DT: "Invoice date cannot be later than current return period.",
		ERR_INV: "Invalid Invoice",
		HEAD_EDIT_TAX: "Amended Tax Liability (Advance Payment) - Edit",
		LBL_STATUS_TRACK: "Status",
		HEAD_VIEW_EFILED_RETURNS: "View Filed Returns",
		HEAD_RET_TYPE: "Return Type",
		HEAD_FINAN_YEAR: "Financial Year",
		HEAD_TAX_PERIOD: "Tax Period",
		HEAD_ACKNO: "Acknowledgement Number",
		HEAD_DOF: "Date of filing",
		HEAD_MOF: "Mode of filing",
		HEAD_FILED_BY: "Filed By",
		HEAD_VIEW_DOWNLOAD: "View/Download",
		LBL_FINAN_YEAR: "Financial year",
		LBL_RET_FILING_PERIOD: "Return Filing Period",
		LBL_QUARTER: "Quarter",
		LBL_RET_TYPE: "Return Type",
		ERR_NO_EFILED_RETURNS: "No returns filed for selected period",
		EM_SRS_FO_013_01: "Please select the mandatory fields",
		HEAD_LEDG_BALA: "Ledger Balance",
		HEAD_SUMM_CURR_PERIOD: "Summary for Current Period",
		HEAD_RECEI_MISMA_REPOR: "Receiver's Mismatch Reports",
		HEAD_SUPPL_MISMA_REPOR: "Supplier's Mismatch Reports",
		ERR_VIEW_ANNUAL_BY_YEAR:
			" To view Annual Returns please select Financial Year",
		LBL_SUPP_GSTIN: "Supplier GSTIN",
		HLP_SUPP_GSTIN: "Enter Supplier GSTIN",
		LBL_DETAILS_SAVE_SUCCESS: "Details saved successfully",
		LBL_PAYABLE: "Payable",
		LBL_DEBIT_NO_CASH_LEDG: "Debit no. in cash ledger",
		LBL_DETAILS_TAX_PAID_AUTO_CASH_ITC_LEDGER:
			"Details of tax paid are auto populated from cash and ITC ledger",
		LBL_DEBIT_NO_ITC_LEDGR: "Debit no. in ITC ledger",
		LBL_TAX_CURRENT_PRD: "Tax for Current Tax Period",
		LBL_TAX_PREV_PRDS: "Tax for previous Tax Periods",
		LBL_ON_MISMATCH_ACC: "Liability on account of mismatch",
		LBL_LATE_FEE: "Late Fees",
		LBL_OTH_SPECIFY: "Others(Please specify)",
		LBL_UTILIZE_CASH_ITC: "UTILIZE CASH/ITC",
		LBL_UTILIZE_CASH_AND_ITC: "Utilize Cash and ITC",
		LBL_TAX_PRD: "Tax period",
		LBL_RETURN_LIAB: "Return Related Liability",
		LBL_GSTR3: "GSTR 3",
		LBL_ASSESED_APPEAL_REL_LIAB: "Assesed/Appeal related liability",
		LBL_DEMAND_ID: "Demand ID",
		LBL_TAX_PAYABLE_OPEN_STOCK_NORMAL_COMPD:
			"Tax payable on opening stock on converting from normal to compounding scheme",
		LBL_AMT_PAID_CLOSE_STK:
			"Amount paid on closing stock for surrender/cancellation of Registration (Form No)",
		LBL_DPST_INV_ID: "Deposit against investigation ID",
		LBL_ID_NO: "ID Number",
		LBL_REG_LIAB: "Regular Liability",
		LBL_REV_CHRG_OTHER: "Other than reverse charge",
		LBL_REV_CHRG: "Reverse charge",
		LBL_PAYMENT_OPTIONS: "Payment Options",
		LBL_PAY_THR_PROVITC: "Pay through ITC",
		LBL_PAY_THR_ITC_PREV_MONTH: "Pay through ITC upto previous month",
		LBL_PAY_THR_CASH: "Pay through Cash",
		LBL_PROVITC_EQ_ITC_CURRENT: "Provisional ITC = ITC for current period",
		LBL_ONLINE_PAYMT: "Make Online Payment",
		LBL_UTIL_CASH: "Utilize Cash",
		LBL_SUBMIT: "Submit",
		LBL_CHK_BAL: "Check Ledger Balance",
		LBL_FINAL_ITC_BAL: "Carried forward ITC Balance",
		LBL_CASH_BALANCE: "Cash Balance",
		LBL_PROV_ITC_BAL: "ITC Balance",
		LBL_MSG: "Message",
		LBL_CONFIRMATION: "Confirmation",
		LBL_CNFRM_PROCEED: "Confirm and Proceed",
		LBL_EMPTY: "Should not be empty",
		LBL_INVALID: "Invalid Debit No.",
		HLP_TXVAL_LESS:
			"Taxable value shall not exceed the Bill of entry value",
		HLP_TXVAL_LESS_IMPS:
			"Taxable value shall not exceed the Total Invoice value",
		HLP_TXVAL_LESS_IMPSA:
			"Taxable value shall not exceed the Total Taxable amount",
		LBL_TAX_LIABLITY_REVRSE_CHRGE_ADD:
			"Tax Liability Under Reverse Charge - Add",
		LBL_TAX_LIABLITY_REVRSE_CHRGE_EDIT:
			"Tax Liability Under Reverse Charge - Edit",
		ERR_MINOR_HEAD_INVALID:
			"Total balance should not exceed available balance",
		ERR_DATE_LT_M_DATE:
			"Original invoice date should be less than Note Date",
		ERR_DATE_GT_M_DATE:
			"Note date should be greater than Original Invoice Date",
		LBL_JOB_WRK: "Job Work",
		LBL_OPTAX_MIS: "Output tax added/reduced due to mismatched",
		LBL_OPTAX_LIAB: "Output Tax liability",
		LBL_EXC_IP_CC: "Excess input tax credit claimed",
		LBL_NR_ITC_CN: "Non Reduction in ITC by Recipients on credit notes",
		LBL_SUP_ECOM_OPR: "Supplies through E-commerce operators",
		LBL_OPTAX_MISINV:
			"Output tax reduced due to matching of earlier mismatched invoices",
		LBL_OPTAX_JWWI:
			"Output tax added on account of non-receipt of goods sent for job-work within prescribed time",
		LBL_OPTAX_JWAFTER:
			"Output tax reduced on account of receipt of goods sent for job-work after prescribed time",
		LBL_OPTAX_ADD:
			"Output tax added due to non-payment for services within three months",
		LBL_OPTAX_RED:
			"Output tax reduced due to payment for services after three months",
		LBL_CREDIT_DEBIT_NOTES_UNREG1:
			"9B - Credit / Debit Notes (Unregistered)",
		LBL_CRED_DEBT_NOTES_REG: "9B - Credit / Debit Notes (Registered)",
		LBL_GSTR11CRED_DEBT_NOTES_REG:
			"3B - Details of Credit/Debit Notes received",
		LBL_OREG_TYP: "Original Registration Type",
		LBL_ACT_TAK: "Action Taken",
		LBL_PEND_INV: "Pending Invoices (These will be added after validation)",
		LBL_PEND_DOC:
			"Pending Documents (These will be added after validation)",
		LBL_TDS_PEND_INV:
			"Pending TDS Details(These will be added after validation)",
		LBL_PEND_ITMS: "Pending line item Details",
		LBL_PROS_INV: "Processed Invoices",
		LBL_PROS_DOC: "Processed Documents",
		LBL_TDS_PROS_INV: "Processed TDS Details",
		LBL_PEND_NOTE: "Pending Notes(These will be added after validation)",
		LBL_PROS_NOTE: "Processed Notes",
		LBL_ATDS_DETAILS: "TDSA Details",
		LBL_NO_DOC: "There are no documents to be displayed.",
		TITLE_HSN_ADD:
			"HSN/Service Classification Code summary of outward supplies - Add",
		TITLE_HSN_EDT:
			"HSN/Service Classification Code summary of outward supplies - Edit",
		LBL_NO_INV: "No. of Invoices",
		ERR_NO_NOTE: "There are no notes to be displayed.",
		HEAD_CRED_DEB_SUMM_REG: "Credit / Debit Notes (Registered) - Summary",
		LBL_PRT_A: "Part (a)",
		LBL_PRT_B: "Part (b)",
		LBL_TAX_PAYBLE: "Tax payable",
		LBL_TX_PD_AUTO_PPLTD:
			"Details of tax paid are auto populated from cash and ITC ledger",
		LBL_DEB_ENTRY_CSH_LDGR: "Debit entry in Cash Ledger",
		LBL_DEB_ENTRY_CRDT_LDGR: "Debit entry in Credit Ledger ",
		LBL_DEB_NO: "Debit no.",
		LBL_IGST_PD: "IGST  Paid (₹)",
		LBL_CGST_PD: "CGST  Paid (₹)",
		LBL_SGST_PD: "SGST  Paid (₹)",
		LBL_PD_THRU_CSH: "Paid through Cash",
		LBL_PD_THRU_IGST: "Paid through ITC - IGST",
		LBL_PD_THRU_CGST: "Paid through ITC - CGST",
		LBL_PD_THRU_SGST: "Paid through ITC - SGST",
		LBL_PD_THRU_CESS: "Paid through ITC - CESS",
		LBL_TX_PYBLE: "Tax Payable",
		LBL_CESS_PD: "CESS Paid (₹)",
		HEAD_CESS_RR: "CESS (₹)",
		LBL_PAYBLE: "Payable",
		LBL_LT_FEE: "Late fee(₹)",
		HEAD_TAX_INTRST_LT_FEE_PNLTY_PD:
			"Tax, interest, late fee and penalty paid",
		LBL_OTHR_PLS_SPCFY: "Others (Please Specify)",
		LBL_OTHR: "Others (₹)",
		LBL_DBT_ID: "Debit ID",
		LBL_UTLZ_CSH_ITC: "UTILIZE CASH/ITC",
		HDR_GSTR8: "GSTR-8 Invoice Details",
		LBL_B2C_INV: "B2C Invoices",
		LBL_B2CA_INVOICES: "Amended B2C Invoices",
		LBL_TCS_DERTAILS: "Details of TCS",
		LBL_MAIN_PG_GSTR8: "Generate Gstr-8 Summary",
		LBL_LIABILITY: "Liability (Export and supplies to SEZ)",
		HEAD_B2BAE: "B2BA- Edit Invoice",
		LBL_TCSR_DERTAILS: "Revision in TCS details",
		LBL_COM_TAX_LIAB: "Compute tax liability",
		LBL_FILE_GSTR8: "File GSTR-8 with DSC",
		LBL_DASHBRDR8_TIT1: "Values are net of summary",
		LBL_AMENDED_CREDIT_DEBIT_NOTES_REG:
			"9C - Amended Credit/Debit Notes (Registered)",
		LBL_AMENDED_CREDIT_DEBIT_NOTES_UNREG:
			"9C - Amended Credit/Debit Notes (Unregistered)",
		LBL_CREDIT_DEBIT_NOTES_REG:
			"Credit / Debit Notes (Registered Taxpayer)",
		LBL_CREDIT_DEBIT_NOTES_UNREG: "Credit / Debit Notes (Unregistered)",
		LBL_REFUNDS_CASH_LEDGER: "Refunds from Cash Ledger",
		LBL_DES_GOODS: "Description of goods",
		HEAD_PENDING_PRO: "Pending Process",
		HEAD_GSTR5: "GSTR - 5 - Return for Non-resident taxable person",
		LBL_OUTWARD_SUPPLIES: "Outward Supplies Made",
		LBL_AMENDED_OUTWARD_SUPPLIES: "Amended Outward Supplies",
		LBL_OUTWARD_SUPPLIES_SUMMARY: "Outward Supplies Made - Summary",
		HEAD_GSTIN_SUPP_NAME: "GSTIN/Supplier's Name",
		HEAD_OUTWARD_SUPPLIES_EDIT: "Outward Supplies Made - Edit",
		HEAD_OUTWARD_SUPPLIES_ADD: "Outward Supplies Made - Add",
		LBL_SAVE_OUTWARD_SUPPLIES: "SAVE OUTWARD SUPPLIES",
		LBL_OUTWARD_SUPPLIES_RECEIVER_WISE_SUMMARY:
			"Outward Supplies Made - Receiver Wise Summary",
		HEAD_CDNA: "Amended Credit/Debit Notes",
		LBL_CRE_DEB_AMENDED: "Details of Amended Credit/Debit Notes",
		LBL_AMENDED_OUTWARD_SUPPLIES_RECEIVER_WISE_SUMMARY:
			"Amended Outward Supplies Made - Receiver Wise Summary",
		LBL_AMENDED_OUTWARD_SUPPLIES_SUMMARY:
			"Amended Outward Supplies Made - Summary",
		HEAD_AMENDED_OUTWARD_SUPPLIES_EDIT:
			"Amended Outward Supplies Made - Edit",
		HEAD_UPD_REC: "Uploaded by Receiver",
		LBL_DT_TIME_OF_SUPPLY: "Date of time of supply",
		LBL_REV_INV_NUMBER: "Revised Invoice No.",
		HLP_REV_INV_NUMBER: "Enter Revised Invoice No.",
		LBL_REV_INV_DATE: "Revised Invoice Date",
		LBL_CDN_RECEIVER_WISE_SUMMARY:
			"Credit/Debit Notes - Receiver Wise Summary",
		LBL_CDNA_RECEIVER_WISE_SUMMARY:
			"Amended Credit/Debit Notes - Receiver Wise Summary",
		BTN_FILE_GSTR5: "FILE GSTR-5 WITH DSC",
		BTN_GENE_GSTR5_SUMM: "GENERATE GSTR5 SUMMARY",
		LBL_PROC_REF_CLAIM: "Processed Refund Claim",
		LBL_PEND_REF_CLAIM: "Pending Refund Claim",
		HEAD_TAXPAID: "Tax payable and paid",
		HEAD_CSOG: "Closing stock of Goods",
		HEAD_GOODS_IMP: "Import of goods",
		HEAD_GOODS_IMP_SUM: "Import of goods - Summary",
		HEAD_GOODS_IMP_ADD: "Import of goods - Add",
		HEAD_GOODS_IMP_EDIT: "Import of goods - Edit",
		HEAD_GOODS_SER: "Import of services",
		HEAD_GOODS_SER_A: "Amended Import of services",
		HEAD_GOODS_IMP_A: "Amended Import of goods",
		HEAD_GOODS_IMP_A_SUM: "Amended Import of goods - Summary",
		HEAD_GOODS_IMP_A_EDIT: "Amended Import of goods - Edit",
		HEAD_TXP_SUMM: "Tax Paid - Summary",
		LBL_TXP_PRD: "Current Period",
		LBL_CSOG_ADD: "Closing stock of Goods - Add",
		LBL_CSOG_EDIT: "Closing stock of Goods - Edit",
		HEAD_CSOG_SUMM: "Closing stock of Goods - Summary",
		ERR_NO_INV: "There are no invoices to be displayed.",
		HEAD_GSTR11CRED_DEB_SUMM_REG:
			"Details of Credit/Debit Notes received - Summary",
		HEAD_CRED_DEB_SUMM_UNREG:
			"Credit / Debit Notes (Unregistered) - Summary",
		LBL_ORIG_DOC: "Original invoice/doc",
		LBL_DOC: "Doctype",
		LBL_EARLIER: "Earlier",
		B2VATAXPAYEDIR6_325: "currency",
		LBL_CMONTH: "This month",
		LBL_DOC_NO: "Document Number",
		LBL_TXPD: "Tax Paid On Time Of Supply",
		LBL_SINV: "Status of Invoice",
		LBL_B2BUNREG: "4B - Inward supplies from an unregistered supplier",
		LBL_B2BAUNREG: "Amend Unregistered Supplier Invoice Summary",
		LBL_B2BAUNREG_TILE: "6A - Amend Unregistered Supplier Invoice",
		LBL_ITCRA_TILE: "11B - Amended ITC Reversal",
		LBL_AMEND_TAXPAID_TILE: "10(II) - 10B - Amend Tax Paid",
		LBL_AMEND_CDNUR_TILE:
			"6D - Amended Credit / Debit Notes (Unregistered)",
		LBL_AMEND_CDNUR:
			"Amend Debit Notes/Credit Notes for Unregistered Supplier - Summary",
		LBL_CDNUNREG: "Unregistered Credit/Debit Notes",
		LBL_CDNAUNREG: "Amended Unregistered Credit/Debit Notes",
		ERR_CDN_INV: "Note: Date cannot be earlier than invoice date.",
		TITLE_TAX_PAID1: "11B(1), 11B(2) - Adjustment of Advances",
		TTL_TXPDA: "11B - Amendment of Adjustment of Advances",
		TITLE_TAX_PAID2: "issued in the current period",
		LBL_TOTAL_AMOUNT: "Total",
		LBL_OCAT: "Original Category",
		LBL_RCAT: "Revised Category",
		LBL_RHSN: "Revised HSN/Service Classification Code",
		LBL_MERCH_ID: "Merchant ID",
		GSTR8: "Tax Collected At Source",
		LBL_REC_GSTIN: "Receiver GSTIN",
		LBL_TOT_ITC_ADMS: "Total ITC Admissible",
		ERR_CRDT_LSS_ODT:
			"Debit / credit note date cannot be earlier than original invoice date.",
		ERR_CRDT_LSS_ODT_REF:
			"Refund voucher date cannot be earlier than Receipt voucher date.",
		ERR_CRDT_CMD_MSG:
			"Credit / Debit Notes date cannot be before the Date of registration or after current tax period or less than Invoice date",
		ERR_CRDT_CMD_MSG_REF:
			"Refund voucher date cannot be before the Date of registration or after current tax period or less than Receipt voucher date",
		LBL_UPL_BY_ECOM: "Uploaded by E-Commerce",
		LBL_LIMIT:
			"You have reached the limit of 500 Invoices for the respective section.",
		LBL_LIMIT_B2B:
			"The number of Invoices/Records that can be viewed for a particular table /section in Form GSTR-2 e.g. B2B, CDN etc. is restricted to 500 for ONLINE VIEW on account of limitation of what can be comfortably browsed online. Taxpayer having invoices/records more than the said limit, may please download the details through 'Download'  link and view the details in offline utility tool. The download facility will be made available soon and communication in this regard will be published in the 'News & Updates' section in the portal",
		HLP_SAC: "Enter Service Classification Code",
		ERR_INV_GSTN_ECOM: "Do enter correct GSTIN of e-commerce operator.",
		LBL_STATE_CODE_OF_SUP: "State Code of the Supplier",
		LBL_TOTAL_AVAIL_ITC: "Total available as ITC",
		LBL_ED_B2B: "Edit Amended B2B Invoice",
		LBL_TT_AVAIL_ITC: " Total Tax available as ITC",
		LBL_ELG_IMPS: "Eligibility of ITC as Input Services/None",
		LBL_SIX_MTH: "You can view your returns for the past six months only.",
		LBL_UPD:
			"Your Uploaded Invoices are being processed with the reference id:",
		LBL_FUT_ACT:
			"Action has already been taken and the invoice is present in pending list please take further actions in pending version until it gets processed",
		LBL_SUC_MSG: "Request accepted successfully",
		HEAD_CDNUR_ADD: "Credit/Debit Notes (Unregistered)- Add Note",
		HEAD_CDNR_ADD: "Credit/Debit Notes (Registered)- Add Note",
		HEAD_GSTR11CDNR_ADD:
			"Details of Credit/Debit Notes received - Add Note",
		HEAD_CDNR_AMEND: "Credit/Debit Notes (Registered)- Details",
		LBL_AMENDED_CREDIT_DEBIT_NOTES_UNREGI:
			"9C - Amended Credit/Debit Notes (Unregistered)",
		HEAD_CDNR_VIEW: "Credit/Debit Notes (Registered)- View Note",
		ERR_ITC_IGST:
			"Total Tax available as ITC (IGST) shall not exceed the IGST Amount",
		LBL_DOCMNT_DATE: "Document Date",
		HLP_SAC_SUP: "Service Classification Code of supply",
		BTN_FILE_GSTR6: "FILE GSTR6 with DSC",
		BTN_FILE_GSTR7: "FILE GSTR-7",
		BTN_FILE_EVC_GSTR6: "File GSTR-6 with EVC",
		BTN_FILE_EVC_GSTR7: "File GSTR-7 with RTD",
		HEAD_GSTR6: "GSTR-6 - Inward Supplies received by the Taxpayer",
		HEAD_GSTR7: "GSTR-7 - Return for Tax Deducted at Source",
		HEAD_GSTR7_DETAILS: "GSTR-7 -TDS Details",
		LBL_PERROR_REPORT: "Proceed to File Error Report",
		HEAD_GSTR6_DETAILS: "GSTR-6 - Invoice Details",
		LBL_REJ_REC: "Rejected by Receiver",
		LBL_CDN_CP_WISE_SUMMARY:
			"Credit/Debit Notes - Counterparty Wise Summary",
		LBL_CDN_ADD_CP_DET: "Add Counterparty Details",
		LBL_CDN_CP_GSTIN_UID: "Counterparty GSTIN",
		HLP_CDN_CP_GSTIN_UID: "Enter Counterparty GSTIN",
		LBL_CDN_CP_NAME: "Counterparty Name",
		HLP_CDN_CP_NAME: "Enter Counterparty Name",
		LBL_CDN_CP_GSTIN_NAME: "Counterparty GSTIN/Name",
		LBL_CP_DETAILS: "Counterparty Details",
		LBL_TX_PD_AUTO_PPLTD1:
			"Details of tax paid are auto populated from cash ledger",
		HEAD_TAX_PD_RVRS_CHRG_SPPLS: "Tax paid for reverse charge supplies",
		LBL_MAIN_PG_GSTR6: "GENERATE GSTR6 SUMMARY",
		LBL_INV_DETAILS: "Invoice Details",
		LBL_REDUNCTION_OUT: "Reduction of Output Taxes added earlier",
		LBL_OUT_TAX_RED: "Output Tax Reduce",
		LBL_OUT_ADD: "Output Tax added",
		HEAD_UPD_CP: "Uploaded by Counterparty",
		HLP_DIFFERENTIAL_VALUE: "Enter differential value",
		HEAD_B2B_INP_TAX_DIS: "3. Input tax credit received for distribution",
		HEAD_LED_UTGST: "UTGST",
		LBL_B2CS: "B2C (Small)",
		HEAD_B2CS_DETAILS_SUMMRY: "B2C (Small) Details - Summary",
		HEAD_B2CS_ADD: "B2C(Small) - Add",
		HEAD_B2CS_EDIT: "B2C(Small) - Edit",
		LBL_ADD_REMOVE_OP: "Add to or reduce from output liability",
		LBL_TAX_AMT: "Amount of tax",
		LBL_INT_TAX: "Integrated tax (₹)",
		LBL_CEN_TAX: "Central  tax (₹)",
		LBL_STATE_UAT_TAX: "State/UT tax (₹)",
		HEAD_CESS_TAX: "Cess (₹)",
		LBL_CESS_TAX: "Cess (₹)",
		LBL_MISMATCH_ITC: "ITC claimed on mismatched invoices/debit notes",
		LBL_MISMATCH_TAXLIAB:
			"Tax liability on mismatched invoices/ credit notes",
		LBL_MISMATCH_COR: "Correction of mismatched invoices/credit notes",
		LBL_MISMATCH_NEG: "Negative tax liability from previous tax periods",
		LBL_MISMATCH_ADV:
			"Tax paid on advance in earlier tax periods and adjusted with tax on supplies made in current tax period",
		LBL_REMOVE: "REMOVE",
		LBL_ADD_REDUCTION:
			"Addition and reduction of amount in output tax for mismatch and other reasons",
		LBL_ADD_REDUCTION_NO:
			"12 - Addition and reduction of amount in output tax for mismatch and other reasons",
		HEAD_ELEC_LIAB_REG: "Electronic Liability Register",
		HEAD_ELEC_LIAB_REG_1: "Electronic Liability Register (Part-I)",
		LBL_PRT_RET_REL_LIAB: "Part -1 Return related liabilities",
		ISDAMDADDINVPG2R6_321: "CESS (₹)",
		ISDAMDADDINVPG2R6_459: "As Integrated Tax",
		LBL_CENTRAL_TAX: "Central tax",
		LBL_STATE_TAX: "State Tax",
		LBL_UT_TAX: "UT Tax",
		LBL_LED_CESS_N: "Cess",
		LBL_LED_USE_FR_DISCH: "Ledger used for discharging liability",
		LBL_LED_DESC: "Description",
		LBL_GSTN_DEDUCTE: "GSTIN of Deductee",
		LBL_GSTN_DEDUCTOR: "GSTIN of Deductor",
		LBL_ORIGINAL_GSTN_DEDUCTE: "Original GSTIN Deductee",
		LBL_REVISED_GSTN_DEDUCTE: "Revised GSTIN of Deductee",
		LBL_AMT_PAID_TAX:
			"Amount paid to deductee on which tax is deducted (₹)",
		LBL_AMT_PAID_TAX_ORG:
			"Original Amount paid to deductee on which tax is deducted (₹)",
		LBL_AMT_PAID_TAX_REV:
			"Revised Amount paid to deductee on which tax is deducted (₹)",
		LBL_ORIGINAL_AMT_PAID_TAX: "Original Amount paid to deducte (₹)",
		LBL_REVISED_AMT_PAID_TAX: "Revised Amount paid to deductee (₹)",
		LBL_AMT_TAX_GSTR7: "Amount of tax deducted at source",
		LBL_TRANS_TYPE_LDG: "Transaction Type (Debit/ Credit)",
		LBL_AMT_DEB_CRED: "Amount debited / credited ",
		LBL_LEDG_BAL: "Balance",
		LBL_LEDG_CREDIT: "Credit",
		LBL_LEDG_DEBIT: "Debit",
		LBL_ELEC_CREDIT_LEDG: "Electronic Credit Ledger",
		LBL_TAX_PER_LED: "Tax Period,if any",
		LBL_CR_DR_LED: "Credit / Debit",
		LBL_AMT_OF_PROV_CRED: "Amount of provisional credit balance",
		LBL_DEEM_EXP: "Deemed Exports",
		LBL_SEZ_PAY: "SEZ Supplies with payment",
		LBL_SEZ_WPAY: "SEZ Supplies without payment",
		LBL_VAL_SUPP_REC: "Value of supplies received from",
		LBL_COMP_TAX_PER: "Composition taxable person",
		LBL_COMP_DEALER: "Composition Dealer",
		LBL_EXEMPT_SUPP: "Exempt supply",
		HEAD_EXEMPT_SUPP:
			"7 - Supplies from composition taxable person and other exempt/nil rated/non GST supplies",
		LBL_INTER_SUPP: "Inter-state supplies",
		LBL_INTRA_SUPP: "Intra-state supplies",
		LBL_DELETE: "Delete",
		HEAD_GSTR5_IMPG: "3 - Import Of Goods",
		HEAD_GSTR5_IMPGA: "4 - Amended Import Of Goods",
		HEAD_GSTR5_OUTSUPP: "5 - Outward Supplies Made",
		HEAD_GSTR5_B2CL: "6 - B2C (Large) Invoices",
		HEAD_GSTR5_B2CS: "7A,7B - B2C (Small)",
		HEAD_GSTR5_AMEND_OUTSUPP: "8A - Amended Outward Supplies",
		HEAD_GSTR5_CDN: "8B - Credit/Debit Notes",
		HEAD_GSTR5_CDNUR: "8B - Unregistered Credit/Debit Notes",
		HEAD_GSTR5_AMEND_CDN: "8C - Amended Credit/Debit Notes",
		HEAD_GSTR5_AMEND_CDNUR: "8C - Amended Unregistered Credit/Debit Notes",
		HEAD_GSTR5_AMEND_B2CL: "8A - Amended B2C (Large) Invoices",
		HEAD_GSTR5_AMEND_B2CS: "9 - Amended B2C (Small)",
		HEAD_GSTR5_TXI: "10A,10B - Tax Liability",
		HEAD_GSTR5_TAXPAID: "11,12,14 - Tax Payable And Paid",
		HEAD_GSTR5_PAYMENT: "Payment of Tax",
		HEAD_GSTR5_REFUND: "13 - Refund Claimed",
		ERR_PORT_CODE_VAL: "The Port Code accepts 6 alphanumeric characters.",
		LBL_INTERSTATE: "4.1 Inter-State supplies (Net Supply for the month)",
		LBL_INTRASTATE: "4.2 Intra-State supplies (Net supply for the month)",
		LBL_TAX_AMEND_OS:
			"4.3 Tax effect of amendments made in respect of outward supplies",
		LBL_TSUP_RCZR:
			"Taxable supplies (other than reverse charge and zero rated supply) [Tax Rate Wise]",
		LBL_TAXSUP_RCZR:
			"4.1.A Taxable supplies (other than reverse charge and zero rated supply) [Tax Rate Wise]",
		LBL_SP_RC:
			"Supplies attracting  reverse charge - Tax payable by recipient of supply",
		LBL_SUP_RC:
			"4.1.B Supplies attracting  reverse charge - Tax payable by recipient of supply",
		LBL_ZRAT_IGST: "Zero rated supply made with payment of Integrated Tax",
		LBL_ZERO_IGST:
			"4.1.C Zero rated supply made with payment of Integrated Tax",
		LBL_ECOM_TCS:
			"Out of the supplies mentioned at A, the value of supplies made though an e-commerce operator attracting TCS - [Rate wise]",
		LBL_VALUE_ECOM:
			"4.1.D Out of the supplies mentioned at A, the value of  supplies made though an e-commerce operator attracting TCS - [Rate wise]",
		LBL_SNO: "S. No.",
		LBL_AMT_TAX: "Amount of Tax",
		LBL_INTE_TAX: "Integrated Tax (₹)",
		LBL_CENT_TAX: "Central tax (₹)",
		LBL_STATEUT_TAX: "State/UT Tax (₹)",
		LBL_TAXOTH_RC:
			"Taxable supplies (other than reverse charge) [Tax Rate wise]",
		LBL_TAXSUP_RC:
			"4.2.A Taxable supplies (other than reverse charge) [Tax Rate wise]",
		LBL_SUP_RCINTRA:
			"4.2.B Supplies attracting  reverse charge - Tax payable by recipient of supply",
		LBL_VALUE_ECOMINTRA:
			"4.2.C Out of the supplies mentioned at A, the value of  supplies made though an e-commerce operator attracting TCS-[Rate wise]",
		LBL_TSUP_RCZR_IGST:
			"Taxable supplies (other than reverse charge and Zero Rated supply made with payment of Integrated Tax) [Rate wise]",
		LBL_TAXSUP_RCZR_IGST:
			"4.3(I).A Taxable supplies (other than reverse charge and Zero Rated supply made with payment of Integrated Tax) [Rate wise]",
		LBL_ZRAT_IGST_RATE:
			"Zero rated supply made with payment of Integrated Tax [Rate wise]",
		LBL_ZERO_IGST_RATE:
			"4.3(I).B Zero rated supply made with payment of Integrated Tax [Rate wise]",
		LBL_VALUESUP_ECOM_TCS:
			"Out of the Supplies mentioned at A, the value of supplies made though an e-commerce operator attracting TCS",
		LBL_VALUE_ECOM_TCS:
			"4.3(I).C Out of the Supplies mentioned at A, the value of supplies made though an e-commerce operator attracting TCS",
		LBL_TAXSUP_RCTA:
			"4.3(II).A Taxable supplies (other than reverse charge) [Tax Rate wise]",
		LBL_VALUE_ECOM_TCSTA:
			"4.3(II).B Out of the Supplies mentioned at A, the value of supplies made though an e-commerce operator attracting TCS",
		LBL_NETDIFF_VAL: "Net differential value (₹)",
		LBL_OUT_SUP:
			"4. Liability arising on account of Outward supplies and Advances received",
		HEAD_INWSUP: "5. Inward Supplies attracting reverse charge",
		LBL_INWARD_ATTRACTING_REVERSE_CHARGE:
			"5. Inward supplies attracting reverse charge including import of services (Net of advance adjustments)",
		LBL_INWARD_SUPPLIES_TAX_PAYABLE:
			"5A. Inward supplies on which tax is payable on reverse charge basis",
		LBL_INWARD_SUPPLIES_TAX_EFFECT_OF_AMENDMENTS:
			"5B. Tax effect of amendments in respect of supplies attracting reverse charge",
		LBL_TOT_IGST3: "Integrated Tax  (₹)",
		LBL_TOT_CGST3: "Central Tax  (₹)",
		LBL_TOT_SGST3: "State/UT Tax (₹)",
		LBL_DIFFERENTIAL_TAXABLE_VALUE: "Differential Taxable Value (₹)",
		LBL_EXEMPTED_TRNOVR: "Exempted",
		LBL_ZERO_RTED_ON_PYMT: "Zero rated supply on  payment of Tax",
		LBL_ZERO_RTED_WTHOUT_PYMT: "Zero rated supply without payment of Tax",
		LBL_DEEMED_EXPORT: "Deemed exports",
		LBL_NILRATED_TRNOVR: "Nil Rated",
		LBL_TOTAL_TURNOVR: "Total TurnOver",
		LBL_TAX_TURNOVR: "Taxable [other than zero rated]",
		LBL_TYPE_OF_TURNOVER: "Type Of Turnover",
		LBL_AMT_ITC: "Amount of ITC available",
		LBL_INV_TYP: "Invoice Type",
		LBL_REG_B2B: "Regular B2B Invoices",
		LBL_DMD_EXP: "Deemed Exports",
		LBL_INP: "Inputs",
		LBL_GNS: " Capital goods",
		LBL_INP_SEV: "Input Services",
		LBL_ING_ITC: "Ineligible ITC",
		LBL_TXBL_VAL: "Taxable value",
		LBL_TX_AMT: "Amount of tax",
		LBL_ITC_AMT: "Amount of ITC",
		LBL_ITC_AMMEND:
			"(II) On account of amendments made (of the details furnished in earlier tax periods)",
		HEAD_ITC_DET:
			"6. ITC on inward taxable supplies, including imports and ITC received from ISD [Net of debit notes/credit notes]",
		LBL_ITC_DTL:
			"(I) On account of supplies received and debit notes/credit notes received during the current tax period",
		HEAD_MISMATCH: "7. Addition and reduction of output tax",
		HEAD_MM_DET:
			"7. Addition and reduction of amount in output tax for mismatch and other reasons",
		HEAD_CRIDIT_MISMATCH: "Mismatch Details",
		LBL_AD_RED_OL: "Add To Or Reduce From Output Liability",
		LBL_AMOUNT: "Amount",
		ERR_BOE_VAL: "The Bill of Entry accepts 7 numbers.",
		LBL_AMT_REVITC: "Amount of ITC available",
		LBL_AMT_CLAUSE:
			"Clause (g) cannot be more than the amount of ITC reversed in Clause (a)",
		LBL_MANDATE_ITC: "Please add at least one item",
		LBL_ITC_HEAD: "11 - Input Tax Credit Reversal/Reclaim",
		LBL_CDNUR: "6C - Debit Notes/Credit Notes for Unregistered Supplier",
		LBL_MANDATE_SG: "State/UT Tax is mandatory if Central Tax is filled",
		LBL_MANDATE_CG: "Central Tax is mandatory if State/UT Tax is filled",
		LBL_MANDATE_ISG: "Please enter Integrated/Central/State Tax",
		LBL_BOE_L: "BOE should be minimum of 3 digits and maximum of 15 digits",
		LBL_GSTIN_L: "Gstin no. should be 16 digit numeric",
		LBL_PORTCODE: "The Port Code accepts 6 alphanumeric characters.",
		LBL_ADD_DEB_CRED_NT: "Add Credit/Debit Note",
		LBL_IMPORTS_SEZ: "Imports from SEZ",
		LBL_PRE_GST: "Pre GST Regime",
		LBL_GROSS_ADV_PAID: "Gross Advance Paid (₹)",
		LBL_DESC_REVITC: "Description for reversal of ITC",
		LBL_AMT_LESS:
			"Agreggate Taxable Value cannot be greater than 2,50,000/-",
		HEAD_LT_FEE: "10. Late Fee",
		LBL_CAMT: "Central Tax  (₹)",
		LBL_SAMT: "State/UT Tax (₹)",
		LBL_BOE_LENGTH:
			"BOE should be minimum of 3 digits and maximum of 15 digits",
		LBL_ITC_CLM_MM:
			"ITC claimed on mismatched/duplication of invoices/debit notes",
		LBL_TAX_LIAB_MM: "Tax liability on mismatched  credit notes",
		LBL_REC_MM_DN:
			"Reclaim on rectification of mismatched invoices/Debit Notes ",
		LBL_REC_MM_CN: "Reclaim on rectification of mismatch credit note",
		LBL_NEG_PRVTAX: "Negative tax liability from previous tax periods",
		LBL_TAX_ADV:
			"Tax paid on advance in earlier tax periods and adjusted with tax on supplies made in current tax period ",
		LBL_IPTAX_REC: "Input Tax credit reversal/reclaim",
		LBL_ADD_MM: "Add",
		LBL_RED_MM: "Reduce",
		LBL_ADDRED_MM: "Add/Reduce",
		LBL_TDS: "TDS",
		LBL_TCS: "TCS",
		LBL_CES: "CESS",
		LBL_TXPAY_RS: "Tax payable (₹)",
		LBL_ST_UT_TAX: "State/UT tax",
		LBL_CENTR_TAX: "Central tax",
		LBL_INTEG_TAX: "Integrated tax",
		LBL_GSTR5_POS: "Place of Supply(Name of State)",
		LBL_QTY_PAT:
			"Total Quantity should be numeric and can be maximum of 15 digits and 2 decimal places. Eg:999999999999999.99",
		LBL_UQC_PAT: "UQC should be alphabetic",
		HEAD_TTL_NOTE_VAL: "Total Note Value",
		HEAD_TTL_TAX_AMT: "Total Tax Amount",
		HEAD_LIAB_PAYBL: "Liability Payable",
		HEAD_LIAB_PAID_CASH: "Liability Paid in Cash",
		HEAD_LIAB_PAID_ITC: "Liability Paid in ITC",
		HEAD_TAX_LIAB: "Tax Liability",
		ERR_HIGH_FLD: "Highlighted field(s) is mandatory.",
		HEAD_INT_LIAB: "10. Interest Liability",
		LBL_ON_ACC: "On account of",
		LBL_OPLIAB_MM: "Output liability on mismatch",
		LBL_ITCCLM_MM: "ITC claimed on mismatched invoice",
		LBL_ITC_REV: "On account of other ITC reversal",
		LBL_EXCESS_CLMRED:
			"Undue excess claims or excess reduction[refer sec 50(3)]",
		LBL_CREDINT_RECTMM: "Credit of interest on rectification of mismatch",
		LBL_INTLIAB_CF: "Interest liability carry forward",
		LBL_DEL_PYMNT_TAX: "Delay in payment of tax",
		LBL_TOT_INTLIAB: "Total interest liability",
		HEAD_TAXPAID_GSTR3: "12. Tax payable and paid",
		HEAD_INTFEE_PAID:
			"13. Interest, Late Fee and any other amount (other than tax) payable and paid",
		HEAD_REFCLM_LEDG: "Refund claimed from electronic cash ledger",
		LBL_PAY_CASH: "Pay In Cash (₹)",
		LBL_PAYABLE_CASH: "Payable in Cash (₹)",
		LBL_TAXP_RS: "Tax Paid (₹)",
		LBL_ITC_DETAILS: "ITC DETAILS",
		LBL_TDS_DETAILS: "TDS DETAILS",
		LBL_TDS_ADD: "TDS Details - ADD",
		LBL_TDS_EDIT: "TDS Details - EDIT",
		LBL_AMT_PAY: "Amount Payable (₹)",
		LBL_AMT_PAID: "Amount to be offset from cash ledger (₹)",
		LBL_INT_ONACC: "(I) Interest on account of",
		LBL_AINTE_TAX: "(a) Integrated Tax",
		LBL_BCENT_TAX: "(b) Central Tax",
		LBL_CSTATEUT_TAX: "(c) State/UT Tax",
		LBL_DCESS_TAX: "(d) CESS",
		LBL_LATE_FEE_GSTR3: "(II) Late Fee",
		LBL_ACENT_TAX: "(a) Central Tax",
		LBL_BSTATEUT_TAX: "(b) State/UT Tax",
		LBL_OFF_LIAB: "Offset Liability",
		LBL_ISD_DETAIL: "ISD Ledger",
		LBL_PEND_RCD: "Pending Records",
		LBL_PRO_RCD: "Processed Records",
		LBL_ISD: "ISD",
		LBL_AMN_CREDIT_DEBIT: "Amended Credit/Debit Notes",
		LBL_AMN_INP_SERV_DIST: "Amended Input Service Distribution",
		LBL_B2B_INV: "B2B Invoices",
		LBL_GST3B_MONTHLY_RETURN: "GSTR-3B - Monthly Return",
		HEAD_IOSUP_DETAILS_TILE:
			"3.1 Tax on outward and reverse charge inward supplies",
		HEAD_INTER_STATE_SUPPLIES_TILE: "3.2 Inter-state supplies",
		HEAD_ISUP_DETAILS_TILE: "5. Exempt, nil and Non GST inward supplies",
		HEAD_INTEREST_LTFEE_TILE_OLD: "5.1 Interest and Late fee",
		HEAD_INTEREST_LTFEE_TILE:
			"5.1 Interest and Late fee for previous tax period",
		HEAD_IOSUP_DETAILS:
			"3.1 Details of Outward Supplies and inward supplies liable to reverse charge",
		HEAD_INTER_STATE_SUPPLIES:
			"3.2 Of the supplies shown in 3.1 (a), details of inter-state supplies made to unregistered persons, composition taxable person and UIN holders",
		HEAD_ELG_ITC: "4. Eligible ITC",
		HEAD_ISUP_DETAILS:
			"5. Values of exempt, nil-rated and non-GST inward supplies",
		HEAD_INTEREST_LTFEE: "5.1 Interest & late fee payable",
		HEAD_PAYMENT_TILE: "6.1 Payment of tax",
		HEAD_TDS_TCS_TILE: "6.2 TDS/TCS Credit",
		LBL_NATURE_OF_SUP: "Nature of Supplies",
		LBL_GSTR3B_CASH_LDG_BAL: "Cash Ledger Balance",
		LBL_GSTR3B_CREDIT_LDG_BAL:
			"Credit Ledger Balance(including current month's credit)",
		LBL_INTR_PAYBLE: "Interest Payable (₹)",
		LBL_INTR_TO_PAY_CASH: "Interest to be paid in cash (₹)",
		LBL_LATEFEE_PAYBLE: "Late Fee Payable (₹)",
		LBL_LATEFEE_TO_PAY_CASH: "Late Fee to be paid in cash (₹)",
		LBL_TOTAL_TAXABLE_VAL: "Total Taxable value (₹)",
		LBL_GST3B_ITAX: "Integrated Tax (₹)",
		LBL_GST3B_CTAX: "Central Tax (₹)",
		LBL_GST3B_STAX: "State/UT Tax (₹)",
		LBL_GST3B_CS: "CESS (₹)",
		LBL_GST3B_OUT_TAX_SUP:
			"(a) Outward taxable  supplies  (other than zero rated, nil rated and exempted)",
		LBL_GST3B_OUT_TAX_SUP_ZERO_RATED:
			"(b) Outward taxable  supplies  (zero rated )",
		LBL_GST3B_OTHER_OUT_SUP:
			"(c) Other outward supplies (Nil rated, exempted)",
		LBL_GST3B_INV_SUP: "(d) Inward supplies (liable to reverse charge)",
		LBL_GST3B_NON_GST_OUT_SUP: "(e) Non-GST outward supplies ",
		BTN_FILE_GSTR_3B: "File GSTR-3B with DSC",
		BTN_FILE_EVC_GSTR3B: "File GSTR-3B with EVC",
		LBL_TOTAL_TAX_VAL: "Taxable Value",
		LBL_TOTAL_ITAX: "Integrated Tax",
		LBL_TOTAL_CTAX: "Central Tax",
		LBL_TOTAL_STAX: "State/UT Tax",
		LBL_AMT_DED: "Total Amount Paid to Deductee",
		LBL_TOTAL_CESS_IOSUP: "CESS",
		LBL_TOTAL_INTER_STATE_SUP: "Inter State Supply",
		LBL_TOTAL_INTRA_STATE_SUP: "Intra State Supply",
		LBL_GSTR3B_POS: "Place of Supply (State/UT)",
		LBL_GST3B_AMT_ITAX: "Amount of Integrated Tax (₹)",
		LBL_GST3B_ITC_AVL: "(A) ITC Available (whether in full or part)",
		LBL_GST3B_ITC_AVL_IMPG: "(1) Import of goods",
		LBL_GST3B_ITC_AVL_IMPS: "(2) Import of services",
		LBL_GST3B_ITC_AVL_ISRC:
			"(3) Inward supplies liable to reverse charge (other than 1 & 2 above)",
		LBL_GST3B_ITC_AVL_ISD: "(4) Inward supplies from ISD",
		LBL_GST3B_ITC_AVL_OTH: "(5) All other ITC",
		LBL_GST3B_ITC_REV: "(B) ITC Reversed",
		LBL_GST3B_ITC_REV_RUL: "(1) As per Rule 42 & 43 of CGST/SGST rules",
		LBL_GST3B_ITC_REV_OTH: "(2) Others",
		LBL_GST3B_NET_ITC_AVL: "(C) Net ITC Available (A) - (B)",
		LBL_GST3B_INELG_ITC: "(D) Ineligible ITC",
		LBL_GST3B_INELG_ITC_RUL: "(1) As per section 17(5)",
		LBL_GST3B_INELG_ITC_OTH: "(2) Others",
		LBL_INTER_STATE_SUP: "Inter-State Supplies (₹)",
		LBL_INTRA_STATE_SUP: "Intra-State Supplies (₹)",
		LBL_GST3B_SUP_UNDER_COMP:
			"From a supplier under composition scheme, Exempt and Nil rated supply",
		LBL_GST3B_NON_GST_SUP: "Non GST supply",
		LBL_GST3B_INTEREST: "Interest (₹)",
		LBL_GST3B_LATEFEE: "Late fee (₹)",
		LBL_ADDED_DATA_SUCCESSFULLY:
			"You have unsaved changes, Please click on SAVE GSTR3B below to save the data.",
		LBL_GST3B_UNREG: "Supplies made to Unregistered Persons",
		LBL_GST3B_COMP: "Supplies made to Composition Taxable Persons",
		LBL_GST3B_UIN: "Supplies made to UIN holders",
		LBL_GSTR3B_INTLFEE_INFO:
			"Declare interest payable on tax liabilities on supplies attracting reverse charge as well as other than reverse charge",
		LBL_GSTR3B_PAYMENT_INFO:
			"Interest to be paid on tax liabilities both for supplies attracting reverse charge as well as other than reverse charge.",
		LBL_GSTR3B_LEDGER_BAL_INFO:
			"The cash available as on date and ITC available (considering ITC of current tax period) are shown in this table.",
		LBL_GSTR3B_ITC_AUTOFILL_INFO_1:
			"System has auto-populated “Tax to be paid through ITC” fields with optimum utilization amounts based on provisions of the law relating to credit utilization. However, you may edit the ITC utilization. As you change ITC utilization, the cash to be paid will also get changed.",
		LBL_GSTR3B_ITC_AUTOFILL_INFO_2:
			"If available cash balance in Electronic cash ledger is not sufficient to offset the liabilities, additional cash required for paying liability is being reflected in the last column of the Table (Addition cash required). You may create challan for that amount directly by clicking on the “Create Challan” button",
		LBL_PAID_THR_ITC: "Paid through ITC",
		LBL_TAXPD_TDS_TCS: "Tax Paid TDS/TCS (₹)",
		LBL_TAXPD_CASH: "Tax/Cess Paid in cash (₹)",
		LBL_TAXPAID_CASH: "Tax Paid (₹)",
		LBL_NON_REV_CHRG: "Non reverse charge",
		LBL_SAVE_GSTR3B: "SAVE GSTR3B",
		LBL_RESET_GSTR3B: "RESET GSTR3B",
		LBL_DATA_3BSAVE: "GSTR3B details saved successfully.",
		LBL_DATA_3BSUB:
			"Submit request has been posted successfully. Values entered are rounded off to nearest whole number while posting to Ledgers.",
		HLP_VAL: "Enter Value",
		LBL_TOT_TAX_TILE: "Balance Liability",
		LBL_CASH_PAID: "Paid through Cash",
		LBL_ITC_PAID: "Paid through Credit",
		LBL_NEGLIAB_CARRYFWD: "Negative Liability Carried Forward",
		LBL_TOOLTIP_CDN: "Debit Notes/Credit Notes[Original]",
		LBL_TOOLTIP_IMPG:
			"Inputs/Capital goods received from Overseas or from SEZ units on a Bill of Entry",
		LBL_AITC_REV_ADD: "Amended Input Tax Credit Reversal / Reclaim - Add",
		LBL_AITC_REV_ED: "Amended Input Tax Credit Reversal / Reclaim - Edit",
		HEAD_ITCRA_SUMM: "Amended Input Tax Credit Reversal / Reclaim",
		BTN_AMD_ITC: "Amend ITC",
		LBL_REG_PRD: "Registration Period - ",
		LBL_FILING_STATUS: "Filing - ",
		LBL_GST3B_TDS: "TDS",
		LBL_GST3B_TCS: "TCS",
		MSG_JSON_UPLD:
			"Your JSON file has been uploaded successfully. The validation process may take up to 15 minutes. Please revisit accordingly.",
		MSG_JSON_UPLD1:
			"Your JSON file has been uploaded successfully. The validation process may take up to 15 minutes. Please revisit accordingly.",
		MSG_JSON_UPLD_GSTR3B:
			"Your JSON file has been uploaded successfully. The GST Systems will now validate uploaded data. Please come back after 15 minutes",
		MSG_JSON_UPLD_UN:
			"Your JSON file has been uploaded successfully. The GST Systems will now validate uploaded data for the following:'GSTIN of supplier'; 'Duplicate invoices and notes' ; 'Tax amount and Tax type' etc. It may take up to 15 minutes to do validation. Please come back after 15 minutes.",
		ERR_MSG_NOTE:
			"In case uploaded data (invoice data or other record) fails validation, an Error File will be created on the online portal for only those records which fail. Please download the error file and view it in the Offline tool to correct the same. After making required correction, please prepare JSON file following the same process as that for regular invoice data upload and submit the JSON file on the GST portal. The JSON file will be validated again and will be taken in by the system if found OK.",
		ERR_MSG_NOTE_GSTR3B:
			"In case uploaded data fails validation, the error message will be displayed in the Error Report column of Upload History table below. After making required correction in the offline tool, please prepare JSON file and upload the JSON file on the GST portal. The JSON file will be validated again and will be taken in by the system if found OK.",
		ERR_MSG_NOTE_GSTR7:
			"In case uploaded data (TDS details) fails validation, an Error File will be created on the online portal for only those records which fail. Please download the error file and view it in the Offline tool to correct the same. After making required correction, please prepare JSON file following the same process as that for regular invoice data upload and submit the JSON file on the GST portal. The JSON file will be validated again and will be taken in by the system if found OK.",
		TTL_UPLD: "Upload",
		LBL_INV_UPLD: "Invoice Upload",
		LBL_INV_UPLD_GSTR4: "Upload GSTR-4 JSON File(Offline Tool)",
		LBL_RET_FIL_UPLD: "Returns File Upload",
		LBL_UPLD_HIST: "Upload History",
		LBL_UPLD_OFF_JSON_GSTR7: "Upload GSTR-7 offline Json",
		LBL_UPLD_OFF_JSON_GSTR8: "Upload GSTR-8 offline Json",
		LBL_UPLD_OFF_JSON_GSTR10: "Upload GSTR-10 offline Json",
		LBL_UPLD_OFF_JSON_GSTR9C: "Upload GSTR 9C offline Json",
		GSTR4_SUM_DISPLAY1: "The summary displayed as on",
		GSTR1_GENERATE_MSG: ".For update click on Generate GSTR1 summary",
		IFF_GENERATE_MSG: ".For update click on Generate IFF summary",
		LBL_IFF_GEN_SUM: "GENERATE IFF SUMMARY",
		CON_YOU_ARE_ABOUT_IFF:
			"You are about to SUBMIT IFF. Would you like to proceed? No changes can be made in this return after filing.",
		HEAD_TIME: "Time",
		HEAD_REFID: "Reference id",
		HEAD_ERR_REP: "Error Report",
		TTL_DNLD: "Download",
		IFF_GSTIN: "IFF of GSTIN - ",
		IFF_SUCCESS_VIEW: ". The IFF can be viewed on your Dashboard Login=",
		LBL_INV_DNLD: "Invoice Download",
		LB_GEN_FIL: "Generate File",
		LB_GEN_JSON_FIL: "Generate JSON File to Download",
		LB_GEN_FIL_EXCEL: "Generate Excel File to Download",
		LB_GEN_FIL_EXCEL_GSTR8: "DOWNLOAD GSTR-8 DETAILS (EXCEL)",
		LB_GEN_FIL_EXCEL_GSTR7: "DOWNLOAD GSTR-7 DETAILS (EXCEL)",
		LB_GEN_FIL_PDF_GSTR7: "DOWNLOAD GSTR-7 DETAILS (PDF)",
		LBL_SUB_ERR: "Submit Error Report",
		LBL_DOWN_ERR: "Download Error Report",
		MAINPAGE_1R6_99: "Error in processing",
		HEAD_ERRMSG: "Error Message",
		HEAD_ERRCODE: "Error Code",
		GSTR6: "Return for input service distributor",
		GSTR7: "Return for Tax Deducted at Source",
		GSTR6A: "Auto Drafted details (For view only)",
		GSTR7A: "GSTR7A - Tax Deduction at Source Certificate",
		LBL_LTFEE_SETOFF: "Set OFF Late Fee",
		LBL_TAX_DEDUCTED: "Amount of tax deducted",
		LBL_AMTPAID: "Amount paid (₹)",
		LBL_STATE_UT_TAX: "State/UT tax",
		LBL_DECLARATION_GSTR3B:
			"I/We hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.",
		LBL_DETAIL_PMT_SVD:
			"Payment of tax has been done successfully and all liabilities are cleared.",
		LBL_GST3B_INTEREST_PDCASH: "Interest Paid in cash (Total in ₹)",
		LBL_INTEREST_PDCASH: "Interest Paid (₹)",
		LBL_GST3B_LATEFEE_PDCASH: "Late fee Paid in cash (₹)",
		LBL_LATEFEE_PDCASH: "Late fee Paid (₹)",
		LBL_INTLATEFEE_INFO:
			"Please select the check box if you wish to declare any Interest liabilities. Please note Interest amounts declared here under respective heads need to be paid in cash in addition to tax liabilities for the month. GSTR 3B can be filed only after complete payment of all liabilities.",
		HEAD_POS_AT_UT: "Place of Supply (Name of State/UT)",
		LBL_CANCEL_UP: "CANCEL",
		LBL_CONFIRM_UP: "CONFIRM",
		HEAD_GSTR6_TILE: "GSTR-6 - Return for Input Service Distributor",
		LBL_AMOUNT_PAID: "Amount Paid",
		LBL_INT_TDS_ACC: "(I) Interest on account of TDS in respect of",
		LBL_LATE_FEE_GSTR7: "(II) Late Fee",
		LBL_TYP: "Type",
		LBL_ELG_ITC: "Eligible ITC",
		LBL_ACC_SUB: "CONFIRM INTEREST AND LIABILITY",
		HEAD_GSTR6A_TILE:
			"GSTR6A - Details of supplies auto-drafted from GSTR-1,5",
		HEAD_GSTR6A_B2B: "Input tax credit received for distribution",
		HEAD_GSTR6A_B2B_AMENDMENTS:
			"Amendments to Input tax credit received for distribution",
		HEAD_GSTR6A_CDN:
			"Debit / Credit notes (including amendments thereof) received during current tax period",
		ERR_LDG_TOGRTFRM1:
			"Period selected for which the ledger/register can be viewed cannot be greater than 12 months. ",
		HEAD_GSTR6A_CDN_AMENDMENTS:
			"Amendments to Credit/Debit Notes received during current tax period",
		LBL_SECTION18:
			"Declaration for claim of input tax credit under sub-section (1) of section 18",
		LBL_CLAIM: "Claim made under",
		LBL_CLAIM_DT:
			"Date from which liability to pay tax arises under section 9, except section 9 (3) and section 9 (4)[For claim under section 18 (1)(a)]",
		LBL_CLAIM_VDT:
			"Date of grant of voluntary registration[For claim made under section 18 (1)(b)]",
		LBL_CLAIM_DDT:
			"Date on which goods or services becomes taxable[For claim made under section 18 (1)(d)]",
		LBL_CLAIM_AB:
			"7. Claim under section 18 (1) (a) or section 18 (1)(b) (Details of stock of inputs and inputs contained in semi-finished goods or finished goods on which ITC is claimed)",
		LBL_CLAIM_D:
			"8. Claim under section 18 (1)(c) or 18 (1)(d)(Details of stock of inputs, inputs contained in semi-finished goods or finished goods and capital goods  on which ITC is claimed)",
		LBL_CLAIM_GSTIN: "GSTIN",
		ERR_ITCINV: "Invoice number can be only upto 16 digit",
		ERR_ITC_INVMIN: "Invoice number cannot be 0",
		LBL_ITC_INV: "Invoice Value",
		LBL_ITCVAL: "Value(As adjusted by debit note/credit note)(₹)",
		ERR_ITC_INV: "Invoice Value cannot be 0",
		LBL_ITC_TY: "Goods Type",
		LG9003: " To Date cannot be less than From date",
		LBL_ITC_INVNO: "Invoice Number",
		LBL_ITC_UQC: "Unit Quantity Code (UQC)",
		LBL_ITC_QTY: "Quantity",
		LBL_ITC_SUB: "Submit Status-",
		LBL_ITC_FILE: "Filing Status-",
		LBL_ITC_FILEDWNLD: "Download Attachment",
		LBL_SECD_MSG:
			"If you wish to change the date of notification, please delete the existing invoices first",
		ERR_ITC_QTYLIM:
			"Quantity can be upto 15 digit and two decimal places only",
		ERR_ITC_MEM: "Membership number can be upto 6 digit only",
		ERR_ITC_INVS:
			"This field accepts Alphanumeric and special Characters(/ and -) only",
		ERR_ITC_CS:
			"Invoice value cannot be less than the sum of Central tax and State/UT tax",
		ERR_UPLOADERR: "File not selected for upload",
		ERR_UPLOADFAIL: "File not upload",
		LBL_CLAIMITC: "Amount of ITC claimed",
		LBL_ITC_IG: "Amount of ITC claimed as Integrated Tax(₹)",
		LBL_ITC_CG: "Amount of ITC claimed as Cental Tax(₹)",
		LBL_ITC_SG: "Amount of ITC claimed as SGST/ UTGST(₹)",
		LBL_ITC_SU: "State/UT Tax(₹)",
		ERR_ITC_IG: "IGST amount cannot be greater than Invoice Value",
		ERR_ITC_CG: "CGST amount cannot be greater than Invoice Value",
		ERR_ITC_SG: "SGST/ UTGST amount cannot be greater than Invoice Value",
		HLP_ITC_SG: "Enter SGST/ UTGST Amount",
		HLP_ITC_CG: "Enter Cental Tax Amount",
		HLP_ITC_IGT: "Enter Integrated Amount",
		ERR_ITC_CESS: "CESS amount cannot be greater than Invoice Value",
		LBL_ITC_TBL: "Description of inputs",
		LBL_ITCADD_TBL: "Add to table",
		LBL_ITC_HLP:
			"You can add 20 invoices at a time.Please save before adding the next invoice",
		ERR_CDN_INV_NT_INVC_DT:
			"Credit /Debit Note Date cannot be earlier than invoice date.",
		LBL_TOTAL_ELG_ITC: "Total Eligible ITC",
		LBL_TOTAL_INELG_ITC: "Total Ineligible ITC",
		LBL_VCH_DATE: "Refund voucher date",
		LBL_VCH_NOT_NO: "Refund voucher number",
		LBL_PAY_DATE: "Payment voucher date",
		LBL_PAY_NUM: "Payment voucher number",
		LBL_ORG_REF_DT: "Receipt voucher date",
		LBL_ORG_REF_NUM: "Receipt voucher number",
		HLP_ITCQTY: "Enter Quantity",
		HLP_ITCNM: "Enter Name",
		LBL_ITCNM: "Name of the Firm issuing certificate",
		HLP_ITCMEM: "Enter Membership number",
		HLP_ITCDESC: "Enter Description",
		LBL_ITCMEM: "Membership number",
		LBL_CERT_DT: "Date of issuance of certificate",
		LBL_ATTACH: "Attachment (option for uploading certificate)",
		LBL_CA: "Name of the certifying Chartered Accountant/Cost Accountant",
		BTN_FILE_FORM: "File Return",
		BTN_PROCEED_TO_FILE: "Proceed to File",
		TTL_FORM_NAME: "Return Type - ",
		HEAD_RTN_FIL: "Returns Filing for GST ",
		BTN_FILE_EVC: "File With EVC",
		BTN_FILE_DSC: "File With DSC",
		ERR_DT_BFR_RGSTRTN_DT:
			"Invoice date should not be prior to registration date",
		ERR_DT_BFR_RGSTRTN_DT_ISD:
			"ISD date should not be prior to registration date",
		ERR_DT_AFR_RGSTRTN_DT: "Invoice Date cannot be after the current date.",
		ERR_DT_AFR_RGSTRTN_DT_CDN: "CDN Date cannot be after the current date.",
		ERR_DT_AFT_TD_DT: "Invoice Date cannot exceed the current tax period.",
		LBL_PREV_SUB_GSTR3B: "PREVIEW AND SUBMIT GSTR3B",
		SUB_DECL:
			"I acknowledge that I have reviewed the details of the preview and the information is correct and would like to submit the details. I am aware that no changes can be made after submit.",
		LBL_TOTAXLIABILITY_INFO_GSTR3:
			"Details of Total Tax Liabilty are auto-populated from GSTR-1 & GSTR-2",
		LBL_ITCDSC: "File ITC with DSC",
		LBL_ITCEVC: "File ITC with EVC",
		LBL_AUTH_SIG: "Name of authorized signatory",
		LBL_DESIG: "Designation / Status",
		LBL_ITCA_INSTRUCT:
			"For Section 18(1)(a) – Applicable for taxpayers who have applied for registration within 30 days of becoming liable. Can be filed only once",
		LBL_ITCB_INSTRUCT:
			"For Section 18(1)(b) – Applicable for taxpayers who have obtained voluntary registration. Can be filed only once",
		LBL_ITCC_INSTRUCT:
			"For Section 18(1)(c) – Applicable for taxpayers Opting out of Composition. Can be filed only once in a financial year",
		LBL_ITCD_INSTRUCT:
			"For Section 18(1)(d) – Applicable for taxpayers whose supplies become taxable. Can be filed multiple times",
		HLP_ITC_DESC:
			"Description of inputs held in stock, inputs contained in semi-finished or finished goods held in stock",
		HLP_ITC_INVVAL:
			"Invoice Value(As adjusted by debit note/credit note)(₹)",
		HLP_ITC_DESCH: "This field accepts alphanumeric - and / only",
		HLP_ITC_CESS: "Enter Cess Amount",
		LBL_ITCCESS_TAX: "Cess (₹)",
		LBL_ITC01: "GST ITC-01",
		LBL_ITC02: "GST ITC-02",
		LBL_ITC03: "GST-ITC-03 : ITC reversal/payment of tax under sec 18 (4)",
		LBL_ITC04: "GST ITC-04",
		HEAD_TOTAL_TAX_LIABILITY_GSTR3: "8. Total Tax Liability",
		LBL_TOT_LIAB_TILE: "Total Liability",
		LBL_TOT_INTRST_TILE: "Total Interest",
		LBL_BAL_INTRST_TILE: "Balance Interest",
		LBL_TOT_LTFEE_TILE: "Total Late fee",
		LBL_BAL_LTFEE_TILE: "Balance Late fee",
		ERR_GSTIN_CHECK:
			"ISD Distribution can happen only to ISD units mapped to same PAN",
		BTN_SUBMIT_REFUND: "SUBMIT REFUND",
		LBL_GEN_SUM6: "GENERATE GSTR6 SUMMARY",
		HEAD_DEBIT_ENT_GSTR3:
			"15. Debit entries in  electronic cash/Credit ledger for tax/interest payment",
		LBL_DBT_DATE: "Debit Date",
		LBL_TAXP_CASH: "Tax Paid in Cash (₹)",
		LBL_TAXP_THROUGH_ITC: "Tax Paid through ITC (₹)",
		LBL_PENELG_ITC: "Pending Eligible ITC",
		LBL_PENINELG_ITC: "Pending Ineligible ITC",
		GSTR4: "Quarterly Return for registered person opting for composition levy",
		GSTR11: "Statement of inward supplies by UIN holder",
		GSTR4_4A4B: "Inward supplies received from a registered supplier",
		GSTR4_4C: "Inward supplies received from an unregistered supplier",
		GSTR4_4D: "Import of service",
		GSTR4_5B_R:
			"Debit Notes/Credit Notes for supplies from registered person",
		GSTR4_5B_UR:
			"Debit Notes/Credit Notes for supplies from unregistered person",
		GSTR4_6: "Tax on outward supplies",
		GSTR4_8A: "Advance amount paid for reverse charge supplies",
		GSTR4_8B:
			"Adjustment of advance amount paid earlier for reverse charge supplies",
		GSTR4_10_11: "Payment of taxes",
		GSTR4_INV_DET: "GSTR-4 - Invoice Details",
		GSTR4_TAX_LIAB: "Total Tax Liability",
		GSTR4_TAB_10: "10 & 11 - Tax, Interest, Late fee payable and paid",
		GSTR4_TAB_11: "11. Interest, Late Fee payable and paid",
		GSTR4_TAB_12: "12. Refund claimed from Electronic cash ledger",
		GSTR4_TAB_13:
			"13 - Debit entries in cash ledger for tax /interest payment",
		GSTR4_LBL_TAX_PAYABLE: "Total Tax payable (Other than reverse charge)",
		GSTR4_LBL_PAY_TAX: "Tax/Cess Paid in cash (₹)",
		GSTR4_BAL_TAX: "Balance Tax payable",
		GSTR4_PAID_CASH: "Paid in cash",
		GSTR4_PAY_CASH: "Tax to be paid (₹)",
		GSTR4_INT_ACC: "(I) Interest on account of",
		GSTR4_LATE_FEE: "(I) Late fee",
		GSTR4_LBL_AMT_PAYABLE: "Total amount payable",
		GSTR4_LBL_PAY_AMT: "Amount already paid",
		GSTR4_BAL_AMT: "Balance amount payable",
		GSTR4_DEBT_ENT_NO: "Debit entry no.",
		GSTR4_DEBT_ENT_DATE: "Debit entry date",
		GSTR4_BANK_DROP: "Bank Account Details (Drop Down)",
		GSTR4_INT_PAID: "Interest to be paid (₹)",
		GSTR4_LATE_PAID: "Late fee to be paid (₹)",
		GSTR4_INT_PAYAB: "Interest payable (₹)",
		GSTR4_LATE_PAYAB: "Late fee payable (₹)",
		GSTR4_LBL_PAY_REV: "Total Tax payable (reverse charge)",
		GSTR4_LBL_TAX: "Total Tax paid",
		LBL_CLM_RFND: "CLAIM REFUND",
		GSTR4_TOT_TAX_PAY: "Total Tax payable",
		GSTR4_TOT_LAT_PAY: "Late fee payable",
		GSTR4_TOT_INT_PAY: "Interest payable",
		GSTR4_BAL_LIAB: "Balance liability",
		GSTR4_TOT_TAX_PAID: "Total Tax claim",
		GSTR4_TOT_LAT_PAID: "Late fee claim",
		GSTR4_TOT_INT_PAID: "Interest claim",
		GSTR4_LIAB: "Total Liability",
		GSTR4_PAID: "Paid through Cash",
		GSTR4_LBL_CHK_BAL: "Cash Ledger Balance ",
		MSG_FILE_UPLOAD_INFO_GSTR3B:
			"Upon successful file upload any previous saved GSTR-3B return data would be lost.Tables and Preview would reflect only the last uploaded details",
		MSG_FILE_UPLOAD_INFO_GSTR4:
			"Upon successful file upload any previous saved GSTR-4 return data would be lost.Preview would reflect only as per the last uploaded details",
		ERR_CREDIT_DT_ISD_DT:
			"ISD Credit Note Date should be Greater than or Equal to ISD  Document date",
		GSTR4_REFUND: "12 - Refund claimed from Electronic cash ledger",
		LBL_GSTR6_LATEFEECALC_INFO: "Liabilities paid successfully",
		LBL_GSTR3B_LATEFEECALC_INFO:
			"Late fee for the month includes late fee charged due to delay in filing of GSTR-1, GSTR-4 (Taxpayers who have opted out from Composition and late fee was not paid fully in the GSTR-4 of that tax period) and previous month's late fee charged due to delay in filing of GSTR-3B. The computation is based on the formula: [Date of Filing – Due date of Filing] * ₹25/day (in case of any liability) or ₹10/day (in case of nil liability)]  per Act (CGST/SGST). To view details of late fee click on 'Late Fees'.",
		LBL_GSTR4_LATEFEECALC_INFO:
			"Late fee for the quarter includes late fee charged due to delay in filing of GSTR-1, GSTR-3B for taxpayers who have opted in to Composition Scheme from normal and current quarter's late fee, if any, charged due to delay in filing of GSTR-4. The calculation is [Date of Filing – Due date of Filing] * [25/day (in case of any liability) or 10/day (in case of nil liability)] * per Act (CGST/SGST). To view details of late fee click on hyperlink on 'late fees'.",
		LBL_GSTR3B_LATEFEECALC_INFO_NEW:
			"Late fee for the month includes late fee charged due to delay in filing of GSTR-1, GSTR-2, GSTR-4 (Taxpayers who have opted out from Composition) and previous month’s late fee charged due to delay in filing of GSTR-3B. The calculation is [Date of Filing – (Date of Submission or Due date of Filing, whichever is later)] * 25/day (in case of any liability) or 10/day (in case of nil liability)] * per Act (CGST/SGST).",
		ITC04_FIL: "ITC-04 has already been filed for the provided quarter.",
		ERR_GSTIN_TYPE_CHECK:
			"ISD Distribution can happen only to Normal Taxpayers",
		POS_INFO_GSTR6:
			"Input Tax Credit (ITC) for distribution shall be available only against such inward supplies wherein the Place of Supply (PoS) is same as the state where ISD is registered. Ineligible credit will not become part of the ITC available for distribution in Table 4.",
		GSTR6_INV_DET: "GSTR-6 - Invoice Details",
		GSTR6_ITC_DISTRIBUTION: "GSTR-6 - ITC Distribution",
		GSTR6_OTHER_DET: "GSTR-6 - Other Details",
		LBL_UTLYZ_ITC_CASH: "Make payment/Post credit to ledger",
		LBL_INT_FILING: "Initiate filing",
		LBL_RESET: "RESET",
		LBL_GSTR3B_PREVIEW: "Preview draft GSTR-3B",
		LBL_GSTR3B_PROCEED_TO_FILE: "Proceed to file",
		LBL_GSTR3B_PROCEED_TO_PAYMENT: "Proceed to payment",
		LBL_GSTR3B_DOWNLOAD_FILED: "Download filed GSTR-3B",
		HEAD_GSTR5A:
			"GSTR-5A - Details of supplies of online information and database access or retrieval services",
		HEAD_GSTR5A_NAME:
			"Name of the Authorised signatory in India filing the return –",
		HEAD_GSTR5A_NF: "Not Filed",
		HEAD_GSTR5A_FIL: "Filed",
		HEAD_GSTR5A_SUB: "Submitted",
		HEAD_GSTR5A_RTF: "Ready To File",
		LBL_GST5A_B2C:
			"5 - Taxable outward supplies made to consumers in India",
		LBL_GSTR5A_STA: "Status - ",
		LBL_5A_TOT_TAX_VAL: "Total Tax Liability",
		LBL_5A_6INTDET: "6 - Interest or any other amount",
		LBL_5A_INT_TAX_TOT: "Total Integrated Tax",
		LBL_5A_CESS: "Total Cess",
		LBL_5A_7TOT_PAY_PAID:
			"7 - Tax, interest and any other amount payable and paid",
		LBL_PRE_AND_SUB_5A: "Initiate filing",
		LBL_FILE_DSC_5A: "FILE GSTR-5A WITH DSC",
		LBL_FILE_EVC_5A: "FILE GSTR-5A WITH EVC",
		LBL_TRACK_ARN: "ARN",
		LBL_ENT_ONE_TIM_PASS: "Enter One Time Password",
		LBL_YR_OTP_HS_SENT_5A:
			"Your OTP has been sent to your registered E-mail id and Mobile number. Please enter your OTP here",
		LBL_INV_OTP_5A: "Invalid OTP",
		LBL_CANC_5A: "Cancel",
		LBL_VER_5A: "Verify",
		HEAD_5A_TAX_INT_LAT:
			"7 - Tax, interest and any other amount payable and paid",
		LBL_5A_SRNO: "Sr. No.",
		LBL_5A_DESC: "Description",
		LBL_5A_AMT_PAY: "Amount payable",
		LBL_5A_AMT_PAID: "Amount paid",
		LBL_5A_INT_TAX: "Integrated tax",
		LBL_5A_TX_LIAB_BASON5A: "Tax Liability",
		LBL_5A_INT_BASED6: "Interest",
		LBL_5A_OTH: "Others",
		LBL_5A_OFFSET: "OFFSET LIABILITY",
		LBL_5A_DEB_ENT_NO: "Debit entry no.",
		HEAD_5A_B2C_SUMM:
			"5 - Taxable outward supplies made to consumers in India",
		LBL_5A_POS: "Place of Supply (State/UT)",
		LBL_5A_PLS_ENT_POS: "Please enter Place Of Supply",
		LBL_5A_PLS_ENT_RAT: "Please enter Rate",
		LBL_5A_PLS_ENT_TAX_VAL: "Please enter Taxable Value",
		LBL_5A_PLS_ENT_INT_TAX: "Please enter Integrated Tax",
		LBL_5A_PLS_ENT_CESS: "Please enter CESS Amount",
		LBL_5A_REC_ALR_PRES:
			"Duplicate record is already present. Kindly click on the 'Edit' button, to make changes.",
		LBL_5A_ADD: "Add",
		HEAD_5A_CALC_OF_INT: "6. Interest or any other amount",
		LBL_AMT_OF_TAX_DUE_5A: "Amount of tax due",
		LBL_5A_INT: "Interest",
		LBL_5A_TOT: "Total",
		LBL_ITC02_HEAD:
			"Declaration for transfer of ITC in case of sale, merger, demerger, amalgamation, lease or transfer of a business under sub-section (3) of section 18",
		LBL_TRANSFEREE_GSTIN: "Transferee GSTIN/UIN",
		LBL_TRANSFEREE_LEGAL_NAME: "Transferee Legal Name",
		LBL_TRANSFEREE_TRADE_NAME: "Transferee Trade Name",
		LBL_ITC02_MATITC_AVL: "Amount of matched ITC available (₹)",
		LBL_ITC02_MATITC_TRN: "Amount of matched ITC to be transferred (₹)",
		ERR_INV_CHARITC: "Please enter valid GSTIN.",
		LBL_ITC02_ITC_TRNFRD: "Details of ITC to be transferred",
		LBL_ITC02_PARTICULARS_CA:
			"Particulars of certifying Chartered Accountant or Cost Accountant",
		HLP_FILE_PHOTO_FORM: "Only JPEG/PDF file format is allowed",
		HLP_MAX_FILE_SIZE: "Maximum file size for upload is ",
		LBL_SAVE_CA: "Save CA details",
		ERR_VAL_REG_GSTIN:
			"Kindly enter a valid GSTIN of a registered regular/normal taxpayer.",
		LBL_CLAIM_BDT: "Date of Approval [For claim under section 18 (1)(a)]",
		LBL_CLAIM_CDT:
			"Date of Composition[For claim made under section 18 (1)(c)]",
		ERR_ITC_TXI: "Integrated tax cannot be greater than the Invoice value",
		HLP_ITC_THRESHOLD:
			"If you have more than 1500 invoices, then please use upload functionality to upload the invoices.",
		HLP_ITC_OFFLINE:
			"Please proceed to online submit and filing once your invoices are uploaded.",
		LBL_ITCVER:
			"Particulars of certifying Chartered Accountant or Cost Accountant [where applicable]",
		LBL_UPLOADNEW: "Upload New",
		ERR_ITC_EQL: "Enter equal CGST and SGST amount.",
		LBL_PRT_NON_RET_REL_LIAB:
			"Part-II: Other than return related liabilities ",
		LBL_ITC3_4A_INSTRUCT:
			"For Section 4(a) – Applicable for taxpayer who have opted  for composition scheme. Can be filed multiple times in financial year but for particular ARN only one filing of ITC-03 is allowed.",
		LBL_ITC3_4B_INSTRUCT:
			"For Section 4(b) – Applicable for taxpayers whose goods or services or both supplied by them become exempted. Can be filed multiple times",
		LBL_PREVIEW: "Preview",
		LBL_ITC3_4A:
			"4(a). Details of application filed to opt for composition scheme",
		LBL_ITC3_4B: "4(b). Date from which exemption is effective -",
		LBL_OPTIN: "Date of Opt in :",
		LBL_SEC: "Section",
		LBL_ARN_NO: "ARN NO -",
		LBL_TABLE_BAL:
			"The cash available as on date and ITC available are shown in this table.",
		LBL_ITC3_CREDIT:
			"Credit Ledger balance (including current month’s credit)",
		LBL_TAXX: "Tax",
		LBL_TAX_TOPAY_CASH: "Tax to be paid in Cash(₹)",
		LBL_CSH_BAL: "Cash balance(₹)",
		LBL_UTILIZABLE_CSH_BAL: "Utilizable Cash balance(₹)",
		LBL_ADD_CASH_REQ: "Additional Cash required(₹)",
		LBL_CRT_CHALLAN: "Create Challan",
		LBL_MK_PAYMENT: "Make payment",
		LBL_SUB: "SUBMIT",
		LBL_SUBSTAT:
			"Your Submit request has been received, please check the status in sometime.",
		LBL_RESETSTAT:
			"Your reset request is successful and the details saved have been deleted from all the tables",
		LBL_ITC03_HEADER:
			"5. Details of stock of inputs held in stock, inputs contained in semi-finished or finished goods held in stock, and capital goods on which input tax credit is required to be paid under section 18(4).",
		LBL_ITC03_CA:
			"Whether value declared in Table 5 include inputs estimated at fair market value",
		LBL_ITC03_PAYMENT_INFO:
			"Interest to be paid on tax liabilities for supplies ",
		ITC03_TAB: "Debit entries in Cash/Credit ledger for tax payment",
		LBL_ONE_BLANKSPACE: " ",
		LBL_PYMNT_SUC:
			"The Cash available as on date will increase if the payment has been successful and confirmation has been received from Bank. It takes few minutes to get the confirmation. In case of delay beyond 24 hours from challan creation date, please fill up Form GST PMT-07 to lodge your grievance. Based on this, GST System will call the Bank IT system again seeking conformation.",
		LBL_GSTR7_PYMNT_SUC:
			"The Cash available as on date will increase if the payment has been successful and confirmation has been received from Bank. It takes few minutes to get the confirmation.",
		LBL_GSTR3B_ITC_CACHE:
			"The ITC and Cash utilization information entered will only be available for 2 days. After expiry of 2 days, the suggested utilization shall be reverted to original system suggested utilization.",
		HEAD_PAYMENT_TILE_GSTR7: "5&6. Payment of tax",
		LBL_TOT_AMT_PAID_GSTR7: "Total amount paid",
		LBL_DEBIT_ENT_GSTR7:
			"8. Debit entries in electronic cash ledger for TDS/interest payment",
		LBL_AMEND_TDS: "4. Amendments to TDS Details",
		LBL_GSTR7_TDS: "3. Details of the tax deducted at source",
		LBL_DIFF_PRCNT: "Applicable percentage(%)",
		LBL_WRB: "Supplies covered under section 7 of IGST Act",
		LBL_DEBIT_ENT_GSTR8:
			"9. Debit entries in electronic cash ledger for TCS/interest payment",
		HEAD_PAYMENT_TILE_GSTR8: "6&7. Payment of tax",
		GSTR4_TAB_B2B: "4A,4B. Inward Supplies (Registered)",
		GSTR4_TAB_B2BUR: "4C. Inward supplies (Unregistered)",
		GSTR4_IMPS: "4D. Import of Service",
		GSTR4_AMD_B2B: "5A,5B. Amendment of Inward supplies (Registered)",
		GSTR4_AMD_B2BUR: "5A. Amendment of Inward supplies (Unregistered)",
		GSTR4_AMD_IMPS: "5A. Amendment of Import of services",
		GSTR4_CDNR_NOT: "5B. Debit/Credit Notes (Registered)",
		GSTR4_CDNUR_NOT: "5B. Debit/Credit Notes (Unregistered)",
		GSTR4_TAX_OUT: "6. Tax on Outward Supplies",
		GSTR4_AMD_CDN: "5C. Amendment Debit/Credit Notes (Registered)",
		GSTR4_AMD_CDNUR: "5C. Amendment Debit/Credit Notes (Unregistered)",
		GSTR4_AMD_TAX_OUT: "7. Amendment of Tax on Outward Supplies",
		GSTR4_ADJ_ADV: "8B. Adjustment of Advances paid",
		GSTR4_TAX_LIAB_HEAD: "8A. Advance amount paid",
		GSTR4_AMD_TAX_LIAB: "8A-II. Amendment of Tax Liability",
		GSTR4_AMD_ADJ_ADV: "8B-II. Amendment of Adjustment of advances",
		GSTR4_TIT_TAB_B2B:
			"4A,4B. Inward Supplies received from a registered supplier (with/without reverse charge)",
		GSTR4_TIT_TAB_B2BUR:
			"4C. Inward supplies received from a unregistered supplier",
		GSTR4_TIT_IMPS: "4D. Import of Service",
		GSTR4_TIT_AMD_B2B:
			"5A,5B. Amendment of Inward supplies received from a registered supplier (with/without reverse charge)",
		GSTR4_TIT_AMD_B2BUR:
			"5A. Amendment of Inward supplies received from an unregistered supplier",
		GSTR4_TIT_AMD_IMPS: "5A. Amendment of Import of services",
		GSTR4_TIT_CDNR_NOT: "5B. Debit/Credit Notes (Registered)",
		GSTR4_TIT_CDNUR_NOT: "5B. Debit/Credit Notes (Unregistered)",
		GSTR4_TIT_TAX_OUT:
			"6. Tax on Outward Supplies made (Net of advance and goods returned)",
		GSTR4_TIT_AMD_CDN: "5C. Amendment Debit/Credit Notes (Registered)",
		GSTR4_TIT_AMD_CDNUR: "5C. Amendment Debit/Credit Notes (Unregistered)",
		GSTR4_TIT_AMD_TAX_OUT:
			"7. Amendment Tax on Outward Supplies made (Net of advance and goods returned)",
		GSTR4_TIT_ADJ_ADV:
			"8B. Advance amount on which tax was paid in earlier period but invoice has been received in the current tax period",
		GSTR4_TIT_TAX_LIAB:
			"8A. Advance amount paid for reverse charge supplies in the tax period",
		GSTR4_TIT_AMD_TAX_LIAB:
			"8A-II. Amendment of Advance amount paid for reverse charge supplies in the tax period",
		GSTR4_TIT_AMD_ADJ_ADV:
			"8B-II. Amendment of Advance amount on which tax was paid in earlier period but invoice has been received in the current tax period",
		GSTR4_TXOS_RT: "Rate of Tax",
		GSTR4_TXOS_GT: "Turnover",
		HEAD_B2BUR: "B2B (Unregistered) - Add Invoice",
		HEAD_B2BURE: "B2B (Unregistered) - Edit Invoice",
		HEAD_GSTR4_IMPS: "Import of Service - Add Invoice",
		HEAD_GSTR4_IMPSE: "Import of Service - Edit Invoice",
		LBL_ORG_NT_NO: "Original Note No.",
		LBL_ELG_POS_INV: "Eligible Processed Invoice",
		LBL_ELG_PEN_INV: "Eligible Pending Invoice",
		LBL_INELG_POS_INV: "Ineligible Processed Invoice",
		LBL_INELG_PEN_INV: "Ineligible Pending Invoice",
		GSTR4A: "Auto drafted details for registered persons opting composition levy",
		HEAD_CREDIT_DEBIT_NOTE_SUMMARY_AMNDMNT:
			"Amendment Credit/Debit Notes- Summary",
		LBL_B2B_SUMMARY_AMNDMNT: "Amendment B2B Invoice Summary",
		HLP_NT_NM_1: "Enter Note No",
		LBL_ENTER_DCMNT_NO: "Enter Document No.",
		BTN_AMND_DCMNT_1: "AMEND DOCUMENT",
		LBL_ORGNL_SPPLR_GSTIN: "Original Supplier's GSTIN",
		LBL_GSTR4_COMP_TAMT: " Composition tax amount",
		LBL_GSTR4_TDS: "9. TDS Credit received",
		LBL_GSTR4_TDS_GROSS: "Gross Value",
		LBL_GSTR4_TDS_RTN_PD: "Return period",
		LBL_ACK_STAT: "Action status",
		LBL_ORG_PRD: "Original Period",
		LBL_TDSA_PROS_INV: "Processed TDSA Details",
		LBL_TDSA_PEND_INV:
			"Pending TDSA Details(These will be added after validation)",
		LBL_FORM_NO: "Form No.",
		LBL_FORM_DESC: "Form Description",
		LBL_LNAME_DEDUCTOR: "Legal name of deductor",
		LBL_TNAME_DEDUCTOR: "Trade name of deductor",
		LBL_LNAME_DEDUCTEE: "Legal name of deductee",
		LBL_TNAME_DEDUCTEE: "Trade name of deductee",
		LBL_GST4_CTAX: "Total Central Tax (₹)",
		LBL_GST4_STAX: "Total State/UT Tax (₹)",
		LBL_TCS_PROS_INV: "Processed TCS Details",
		LBL_TCS_PEND_INV:
			"Pending TCS Details (These will be added after validation)",
		LBL_GSTN_SUP: "GSTIN of the supplier",
		LBL_GSTN_COL: "GSTIN of the collector",
		LBL_GSTN_COL_NAME: "Collector Name",
		LBL_NET_TCS: "Net amount liable for TCS (₹)",
		LBL_AMT_SRC: "Amount of tax collected at source",
		LBL_TCS_GROSS: "Gross value of supplies made (₹)",
		LBL_TCS_SUPP: "Value of supplies returned (₹)",
		LBL_SUP_NAM: "Supplier Name",
		LBL_TCSA: "4. Amendments to details of supplies attracting TCS",
		LBL_NET_TCS_WR: "Net amount liable for TCS",
		LBL_DET_INT: "5. Details of interest",
		LBL_FILE_GSTR4: "FILE GSTR-4",
		BTN_FILE_GSTR8: "FILE GSTR-8",
		ORIGINAL_AMOUNT_PAID:
			"Original Amount paid to collector on which tax is deducted",
		ORIGINAL_GSTIN_SUPLIER: "Original GSTIN of Supplier",
		REVISED_GSTIN_SUPLIER: "Revised GSTIN of Supplier",
		REVISED_NETAMOUT_LIABLEFOR_TCS: "Revised Net amount liable for TCS (₹)",
		REVISED_AMOUNT_OF_TAX_COLLECTED_AT_SOURCE:
			"Revised amount of tax collected at source (₹)",
		LBL_TCSA_PROS_RECORDS: "Processed TCSA Details",
		LBL_TCSA_PEND_INV:
			"Pending TCSA Details(These will be added after validation)",
		HEAD_TCSA_EDIT: "Amend TCS Details- Edit",
		HEAD_TCSA_Amend: "Amend TCS Details- Amend",
		LBL_OGL_TAX_PRD: "Original Tax Period",
		LBL_AMTTCSA_PAID_TAX:
			"Amount paid to supplier on which tax is collected (₹)",
		LBL_GSTR8_TAXPAID: "Tax Paid (₹)",
		LBL_ADD_CASH_GSTR8: "Additional Cash required (₹)",
		LBL_GSTR8_INT_PAID: "Interest Paid (₹)",
		LBL_GSTR8_BACK: "BACK TO GSTR-8 DASHBOARD",
		LBL_DECLARATION_GSTR8:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.",
		LBL_GSTR4_IMPS_AMD: "Amendment of Import of services - Summary",
		LBL_GSTR4_IMPS_AMD_ADD: "Amendment of Import of services - ADD",
		LBL_GSTR4_IMPS_AMD_EDIT: "Amendment of Import of services - EDIT",
		GSTR4_TIT_AMD_CDNUR_SUM:
			"5C. Amendment Debit/Credit Notes (Unregistered) - Summary",
		GSTR4_TIT_AMD_B2BRA_SUM:
			"5A,5B. Amendment of B2B (Registered) - Summary",
		GSTR4_TIT_AMD_B2BRA_DET:
			"5A,5B. Amendment of B2B (Registered) - Details",
		GSTR4_LBL_SUB_ERR: "Proceed to File - Error Report",
		GSTR4_HELP_B2B_1:
			"All B2B inward invoices along with invoices attracting reverse charge can be declared in this table related to current return period or earlier return period(s).",
		GSTR4_HELP_B2B_2:
			"Declare GSTIN, Invoice No., Invoice Date, Place of Supply (POS), Invoice value.",
		GSTR4_HELP_B2B_3:
			"Based on POS, Supply type will be auto populated, and it is non-editable.",
		GSTR4_HELP_B2B_4:
			"Invoices attracting reverse charge can be declared by checking the box ‘Supply attract Reverse Charge’",
		GSTR4_HELP_B2B_5:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_B2BUR_1:
			"All inward supplies from Un-registered persons should be declared in this section related to current return period or earlier return period(s), if applicable.",
		GSTR4_HELP_B2BUR_2:
			"Declare Invoice No., Invoice Date, Place of Supply (POS), Invoice value and Supply Type",
		GSTR4_HELP_B2BUR_3:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_IMPS_1:
			"All inward supplies relating to Import of Services should be declared in this table related to current return period or earlier return period(s).",
		GSTR4_HELP_IMPS_2:
			"Declare Invoice No., Invoice Date, Place of Supply (POS), Invoice value",
		GSTR4_HELP_IMPS_3:
			"Supply Type will always be Inter-State and is non-editable.",
		GSTR4_HELP_IMPS_4:
			"Provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_B2BRA_1:
			"Amendment to B2B inwards supplies from registered persons along with invoices attracting reverse charge reported in earlier quarter(s) can be amended in this table.",
		GSTR4_HELP_B2BRA_2:
			"Select the Financial Year and Return filing period and provide the Supplier’s GSTIN and Invoice number which is required to be amended and click on Amend Invoice.",
		GSTR4_HELP_B2BRA_3:
			"Enter the Revised Invoice number, Revised Invoice date, POS and Total Invoice value.",
		GSTR4_HELP_B2BRA_4:
			"Supply type cannot be amended, so it will remain masked with the Original Supply type.",
		GSTR4_HELP_B2BRA_5:
			"Provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_B2BURA_1:
			"Amendment to inward supplies from Unregistered persons reported in earlier return periods shall be declared in this table.",
		GSTR4_HELP_B2BURA_2:
			"Select the Financial Year, Return filing period and Original Invoice Number and click on Amend Invoice.",
		GSTR4_HELP_B2BURA_3:
			"Enter the Revised Invoice number, Revised Invoice date, POS and Total Invoice value.",
		GSTR4_HELP_B2BURA_4:
			"Supply type cannot be amended so it will remain masked with the Original Supply type.",
		GSTR4_HELP_B2BURA_5:
			"Provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_IMPSA_1:
			"Amendment to Import of services reported in earlier return periods shall be declared in this table .",
		GSTR4_HELP_IMPSA_2:
			"Select the Financial Year, Return filing period and Original Invoice Number and click on Amend Invoice.",
		GSTR4_HELP_IMPSA_3:
			"Enter the Revised Invoice number, Revised Invoice date, POS and Total Invoice value.",
		GSTR4_HELP_IMPSA_4:
			"Supply type cannot be amended so it will remain masked with the Original Supply type.",
		GSTR4_HELP_IMPSA_5:
			"Provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_CDNR_1:
			"Debit/Credit notes issued against the invoices issued on B2B supplies in the current return period or earlier return period(s) should be declared in this section.",
		GSTR4_HELP_CDNR_2: "Provide the details in mandatory fields. ",
		GSTR4_HELP_CDNR_3:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_CDNUR_1:
			"Debit/Credit notes issued against the invoices issued on inward supplies from unregistered suppliers in the current return period or earlier return periods should be declared in this table.",
		GSTR4_HELP_CDNUR_2: "Provide the details in mandatory fields. ",
		GSTR4_HELP_CDNUR_3:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_TXOS_1:
			"Declare the outward supplies made during the quarter net of advance and goods returned.",
		GSTR4_HELP_TXOS_2:
			"Supplies attracting Nil rate can be declared in 0% tax rate.",
		GSTR4_HELP_TXOS_3:
			"Provide the details for outward supplies for different rates as applicable.",
		GSTR4_HELP_TXOS_4:
			"Tax amounts will be auto calculated and are non-editable.",
		GSTR4_HELP_CDNRA_1:
			"Amendments to debit/credit Notes received from registered persons, including supplies attracting reverse charge reported in earlier return periods should be declared in this section.",
		GSTR4_HELP_CDNRA_2:
			"Select the Financial Year, Return Filing period from the drop down.",
		GSTR4_HELP_CDNRA_3:
			"Provide the supplier’s GSTIN and Original Note No. and click on ‘Amend Note’.",
		GSTR4_HELP_CDNRA_4:
			"Information must be provided  in mandatory fields.",
		GSTR4_HELP_CDNRA_5:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated.. Cess amount is user input.",
		GSTR4_HELP_CDNURA_1:
			"Amendments to Debit/Credit Notes received from un-registered persons, reported in earlier return periods should be declared in this section.",
		GSTR4_HELP_CDNURA_2:
			"Select the Financial Year, Return Filing period from the drop down.",
		GSTR4_HELP_CDNURA_3:
			"Provide the Original Note No. and click on ‘Amend Note’.",
		GSTR4_HELP_CDNURA_4:
			"Information must be provided in mandatory fields.",
		GSTR4_HELP_CDNURA_5:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount is user input.",
		GSTR4_HELP_TXOSA_1:
			"Amendments related to outward supplies reported in earlier return filing period(s) can be made in this table.",
		GSTR4_HELP_TXOSA_2:
			"Select the Financial Year and Return filing period and click on ‘Amend details’.",
		GSTR4_HELP_TXOSA_3:
			"Provide the details for outward supplies for different rates as applicable.",
		GSTR4_HELP_TXOSA_4:
			"Tax amounts will be auto calculated and are non-editable.",
		GSTR4_HELP_TXOSA_5:
			"If amount becomes negative due to amendment, same may be reported accordingly.",
		GSTR4_HELP_AT_1:
			"Declare tax liability arising on account of advances paid on account of reverse charge supplies for which invoices have not been received during the same tax period.",
		GSTR4_HELP_AT_2:
			"Select the POS and based on it, Supply type will be auto-populated and is not amendable.",
		GSTR4_HELP_AT_3:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_TXPD_1:
			"Declare adjustment of advance tax already paid on reverse charge supplies for which invoices have been received during the current tax period.",
		GSTR4_HELP_TXPD_2:
			"Select the POS and based on it, Supply type will be auto-populated and is not amendable.",
		GSTR4_HELP_TXPD_3:
			"Based on Supply Type, IGST or CGST/SGST column would be displayed to provide rate wise taxable values and tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user",
		GSTR4_HELP_ATA_1:
			"Amendments to tax liability reported in any earlier return period(s) arising on account of advances paid can be made through this table.",
		GSTR4_HELP_ATA_2:
			"Select the Financial year, Return filing period, POS and Supply Type from the dropdown and click on Amend Invoice.",
		GSTR4_HELP_ATA_3:
			"Provide the amended details rate wise for Gross advances paid, tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_TXPDA_1:
			"Amendments to adjustment of advances reported in any earlier tax periods can be done in this table.",
		GSTR4_HELP_TXPDA_2:
			"Select the Financial year, Return filing period, POS and Supply Type from the dropdown and click on Amend Invoice.",
		GSTR4_HELP_TXPDA_3:
			"Provide the amended details rate wise for Gross advances paid, tax amounts would be auto calculated and are non-editable. Cess amount will be filled up by user.",
		GSTR4_HELP_1011_1:
			"Cash Balance available in cash ledger will be shown.",
		GSTR4_HELP_1011_2: "Liabilities can be paid in cash only.",
		GSTR4_HELP_1011_3:
			"‘Create challan’ button will be enabled only if sufficient cash is not available in Cash Ledger.",
		GSTR4_HELP_1011_4:
			"System will auto fill the deficient amounts in challan form created and after deposit of the amount, the system will navigate back to this page.",
		GSTR4_HELP_1011_5:
			"Declaration and Authorized signatory fields will be enabled only if sufficient cash balance is available to offset the liabilities.",
		GSTR4_HELP_1011_6:
			"Check the Declaration box and select the Authorized signatory to file the return with EVC/DSC.",
		GSTR4_HELP_UPOF_1: "Click on ‘Choose file” to upload the json file.",
		GSTR4_HELP_UPOF_2:
			"Upon successful upload of json file, status will be displayed as ‘Processed’.  If upload is not successful for some records, then error report will be generated.",
		GSTR4_HELP_UPOF_3:
			"Download error json file by clicking on hyper link ‘Download error report’.",
		GSTR4_HELP_UPOF_4:
			"Import the error json file into offline tool to make the required changes.",
		GSTR4_HELP_DOWN_FILE_1:
			"Click on ‘Generate Json file to download’ button to download the json file.",
		GSTR4_HELP_DOWN_FILE_2:
			"Downloaded json file shall contain all the details uploaded successfully on GST portal.",
		GSTR4_HELP_DOWN_FILE_3:
			"Import the downloaded json file into offline tool to view/prepare your statement.",
		GSTR4_REV_CHRG: "Reverse charge",
		GSTR4_HELP_TIT_TEXT_B2B: "Inward Supplies (Registered)",
		GSTR4_HELP_TIT_TEXT_B2BUR: "Inward Supplies (Unregistered)",
		GSTR4_HELP_TIT_TEXT_IMPS: "Import of Services",
		GSTR4_HELP_TIT_TEXT_B2BRA: "Amendment of B2B (Registered)",
		GSTR4_HELP_TIT_TEXT_B2BURA:
			"Amendment of Inward Supplies (Unregistered)",
		GSTR4_HELP_TIT_TEXT_IMPSA: "Amendment of Import of services",
		GSTR4_HELP_TIT_TEXT_CDNR: "Debit/Credit Notes (Registered)",
		GSTR4_HELP_TIT_TEXT_CDNUR: "Debit/Credit Notes (Unregistered)",
		GSTR4_HELP_TIT_TEXT_TXOS: "Outward Supplies",
		GSTR4_HELP_TIT_TEXT_CDNRA:
			"Amendment of Debit/Credit Notes (Received from Registered taxpayers)",
		GSTR4_HELP_TIT_TEXT_CDNURA:
			"Amendment to Debit/Credit Notes (Received from Unregistered persons)",
		GSTR4_HELP_TIT_TEXT_AT:
			"Tax Liability due to advances paid on reverse change supplies",
		GSTR4_HELP_TIT_TEXT_TXPD: "Adjustment of Advances",
		GSTR4_HELP_TIT_TEXT_ATA: "Amendment of tax liability",
		GSTR4_HELP_TIT_TEXT_TXPDA: "Amendment of Adjustment of Advances",
		GSTR4_HELP_TIT_TEXT_1011: "Tax, Interest, late fee payable and paid",
		HELP_TIT_UPLOAD: "Upload of Offline Json",
		HELP_TIT_DOWNLOAD: "Download of JSON file",
		LBL_HELP: "Help",
		GSTR4_HELP_TIT_TEXT_TXOSA: "Amendments of Outward Supplies",
		LBL_REVISED_DBT_CRDT_NT_N: "Revised Debit/Credit Note No.",
		LBL_REVISED_DBT_CRDT_NT_DT: "Revised Debit/Credit Note Date",
		LBL_TRD_NAM: "Trade name/ Legal name",
		ERR_SUM_API:
			"Please select atleast one answer as Yes or  nil filing as Yes",
		ERR_PLEAS_PRO_ALINP:
			"Please provide all the inputs before going to next page",
		"RT-3BAS1077":
			"You cannot offset with zero liabilities as you have not selected NIL return. Please go back to questionnaire page and choose appropriate options or enter liabilities if you are not filing a NIL return",
		"RT-3BAS1078":
			"You cannot submit with zero ITC as you have selected ITC on questionnaire page. Please go back to questionnaire page and choose appropriate options or enter ITC in the ITC tile while submitting the form.",
		LBL_ADDSUM_R8_60: "TCS Details – Add",
		AUTH101:
			"Authentication Failed.If error persists quote error number AUTH101 when you contact customer care for quick resolution.",
		AUTH107:
			"The tax payer is invalid. Please rectify and try again. Quote error number AUTH107 when you contact customer care if error persists ",
		AUTH111:
			"Invoices Still under processing for provided inputs. Kindly wait for processing to complete. Quote error number AUTH111 when you contact customer care if error persists ",
		AUTH112:
			"Invoices Already Submitted/ Submission in Progress for provided inputs. Kindly wait for processing to complete. Quote error number AUTH112 when you contact customer care if error persists ",
		AUTH113:
			"Invalid Return Period. If error persists quote error number AUTH113 when you contact customer care for quick resolution",
		AUTH114:
			"Invoices Already Filed / Frozen for the provided inputs. Kindly wait for processing to complete. Quote error number AUTH114 when you contact customer care if error persists ",
		AUTH115:
			"Please submit the invoices before filling. Please try again.  If error persists quote error number AUTH115 when you contact customer care for quick resolution",
		AUTH117:
			"GSTR1 is already filed.  If error persists quote error number AUTH117 when you contact customer care for quick resolution ",
		AUTH119:
			"GSTR3B is not filed for previous period. Please rectify and try again. If error persists quote error number AUTH119 when you contact customer care for quick resolution ",
		AUTH122:
			"Return can not be submitted/filed for future date. Please rectify and try again. If error persists quote error number AUTH122 when you contact customer care for quick resolution ",
		AUTH124:
			"Can't submit/file as return period is before registration approval date. Please rectify and try again.  If error persists quote error number AUTH124 when you contact customer care for quick resolution ",
		AUTH126:
			"Invoices can not be uploaded/action cannot be taken for future date.  Please rectify and try again.  If error persists quote error number AUTH126 when you contact customer care for quick resolution ",
		AUTH128:
			"Return can only be  submitted/filed from FRM_DT to TO_DT of the next month.  Please rectify and try again.  If error persists quote error number AUTH128 when you contact customer care for quick resolution ",
		AUTH136:
			"Invalid State Code.  Please try again.  If error persists quote error number AUTH136 when you contact customer care for quick resolution ",
		AUTH138:
			"Invalid Date.  Please try again.  If error persists quote error number AUTH138 when you contact customer care for quick resolution ",
		AUTH140:
			"GSTR5 is not filed for previous period.  Please try again.  If error persists quote error number AUTH140 when you contact customer care for quick resolution ",
		AUTH142:
			"GSTR3B is not filed for previous period. If error persists quote error number AUTH142 when you contact customer care for quick resolution",
		AUTH143:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number AUTH143 when you contact customer care for quick resolution ",
		AUTH144:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number AUTH144 when you contact customer care for quick resolution ",
		AUTH151:
			"You are not authoried to access GSTR3B for this return period.If error persists quote error number AUTH151 when you contact customer care for quick resolution.",
		AUTH152:
			"You are not authorized to access GSTR3B for this return period. Please rectify and save again. If error persists quote error number AUTH152 when you contact customer care for quick resolution",
		AUTH154:
			"You are not allowed to access Return for selected return period.  Please try again.  If error persists quote error number AUTH154 when you contact customer care for quick resolution ",
		AUTH3B: "GSTR3B Already Submitted/ Submission in Progress for provided inputs. Please check again later. If error persists quote error number AUTH3B when you contact customer care for quick resolution",
		AUTH9002:
			"Something seems to have gone wrong while processing your request. Invalid Token.If error persists quote error number AUTH9002 when you contact customer care for quick resolution.",
		FILED: "GSTR3B is already filed, so you can not reset. If error persists quote error number FILED when you contact customer care for quick resolution",
		GEN04: "Process in Progress. Please try after Sometime. If error persists quote error number GEN04 when you contact customer care for quick resolution",
		GEN09: "GSTR-3B for the tax period is in submitted status. Kindly File GSTR-3B, before proceeding for generation of GSTR-3.If error persists quote error number GEN09 when you contact customer care for quick resolution",
		HAS_OFFSET:
			"You have already offset GTSR3B, so you can not RESET. If error persists quote error number HAS_OFFSET when you contact customer care for quick resolution",
		JSON02: "Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number JSON02 when you contact customer care for quick resolution",
		NOT_SUBMIT:
			"GSTR3B is not yet submitted, so you can reset after SUBMIT. If error persists quote error number NOT_SUBMIT when you contact customer care for quick resolution",
		OFF3: "You cannot offset liability before submission of interest and liability. Kindly Submit Interest and Liability. If error persists quote error number OFF3 when you contact customer care for quick resolution",
		OFF5: "Please Offset your liabilities with Proper Data. If error persists quote error number OFF5 when you contact customer care for quick resolution",
		RET11400:
			"An Error occurred while saving. Please try again. Quote error number RET11400 when you contact customer care if error persists ",
		RET11401:
			"An Error occurred while saving. Please try again. Quote error number RET11401 when you contact customer care if error persists ",
		RET11402:
			"An Error occurred while saving. Please try again. Quote error number RET11402 when you contact customer care if error persists ",
		RET11403:
			"An Error occurred while saving. Please try again. Quote error number RET11403 when you contact customer care if error persists ",
		RET11405:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number RET11405 when you contact customer care for quick resolution",
		RET11407:
			"An Error occurred while saving. Please try again. Quote error number RET11407 when you contact customer care if error persists ",
		RET11410:
			"GSTIN is invalid. Please rectify and try again. Quote error number RET11410 when you contact customer care if error persists ",
		RET11411:
			"Invalid Counter Party Gstin.  Please try again.  If error persists quote error number RET11411 when you contact customer care for quick resolution",
		RET12502:
			"System Failure.  Please try again.  If error persists quote error number RET12502 when you contact customer care for quick resolution ",
		RET12503:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number RET12503 when you contact customer care for quick resolution ",
		RET12505:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number RET12505 when you contact customer care for quick resolution ",
		RET12506:
			"Save Failure. Integrated Tax in 3.1a should be greater than or equal to total Integrated Tax in 3.2  Please rectify and try again.  If error persists quote error number RET12506 when you contact customer care for quick resolution",
		RET12521:
			"GSTR1 is already submitted for current period. Please rectify and try again.  If error persists quote error number RET12521 when you contact customer care for quick resolution",
		RET13501:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number RET13501 when you contact customer care for quick resolution",
		RET13502:
			"System Failure. Please try again.  If error persists quote error number RET13502 when you contact customer care for quick resolution",
		RET13504:
			"Unable to process your request. Please try after sometime. If error persists quote error number RET13504 when you contact customer care for quick resolution",
		RET13505:
			"System Failure. Please try again.  If error persists quote error number RET13505 when you contact customer care for quick resolution",
		RET13506:
			"OTP is either expired or incorrect. Please try again.  If error persists quote error number RET13506 when you contact customer care for quick resolution",
		RET13507:
			"Mismatch of signed data & payload. Please try again.  If error persists quote error number RET13507 when you contact customer care for quick resolution",
		RET13508:
			"PAN does not match with Signature. Please try again.  If error persists quote error number RET13508 when you contact customer care for quick resolution",
		RET13509:
			"No Invoices found for the provided Inputs. Please try again.  If error persists quote error number RET13509 when you contact customer care for quick resolution",
		RET13510:
			"No Record found for the provided Inputs. Please try again.  If error persists quote error number RET13510 when you contact customer care for quick resolution",
		RET13511:
			"Date format entered is Invalid. Please try again.  If error persists quote error number RET13511 when you contact customer care for quick resolution ",
		RET11416:
			"No document found in selected financial year. Either this document exists in a different financial year or the document number is incorrect",
		RET11417:
			"No document found in selected financial year. Either this document exists in a different financial year or the document number might have been amended earlier. Search with latest amended document",
		RET13527:
			"GSTR1A is already filed for current period. If error persists quote error number RET13527 when you contact customer care for quick resolution",
		RET145: "GSTR3B form is not applicable for given return period. If error persists quote error number RET145 when you contact customer care for quick resolution",
		RET147: "GSTR3B can be filed only after end of tax period and also ensure GSTR-3B for last tax period has been filed. If error persists quote error number RET147 when you contact customer care for quick resolution",
		RET148: "You have SUBMITTED TRAN-1 form but have not FILED it. You are requested to FILE the same before submitting this return.. Please try again. If error persists quote error number RET148 when you contact customer care for quick resolution",
		RET3B91404:
			"NET ITC Provided is not equal to ITC Available - ITC Reversed.If error persists quote error number RET3B91404 when you contact customer care for quick resolution.",
		RET_80: "A record can be amended only if it is not Accepted/Modified by the counter-party.Invoice no./Note no.has already been Accepted/Modified by the counter-party.  Please rectify and try again.  If error persists quote error number RET_80 when you contact customer care for quick resolution",
		RET_83513:
			"Gstr8 is not Filed for Previous Return Period Submitted. Kindly file that return period first. If error persists quote error number RET_83513 when you contact customer care for quick resolution",
		RET_OFFSET:
			"Partial Payment is not allowed for GSTR3B while doing Offset Liability. If error persists quote error number RET_OFFSET when you contact customer care for quick resolution",
		RTDSC04:
			"Pan Number or Sign is invalid. Please try again.  If error persists quote error number RTDSC04 when you contact customer care for quick resolution",
		RTDSC05:
			"DSC verification failed. Please try after sometime. If error persists quote error number RTDSC05 when you contact customer care for quick resolution",
		RTN_03: "Invalid Return Type. Please rectify and try again.  If error persists quote error number RTN_03 when you contact customer care for quick resolution",
		RTN_111:
			"Gstr3B Save Still under processing. If error persists quote error number RTN_111 when you contact customer care for quick resolution",
		RTN_112:
			"Some error occured.Please save GSTR3B form again. If error persists quote error number RTN_112 when you contact customer care for quick resolution",
		RTN_13: "The File Number entered is Invalid.  Please rectify and try again.  If error persists quote error number RTN_13 when you contact customer care for quick resolution",
		RTN_15: "Invoices still under processing. If error persists quote error number RTN_15 when you contact customer care for quick resolution",
		RTN_17: "Invoices already submitted. If error persists quote error number RTN_17 when you contact customer care for quick resolution",
		RTN_18: "Invalid Date. Please rectify and try again.  If error persists quote error number RTN_18 when you contact customer care for quick resolution",
		RTN_22: "Please select a valid financial year. If error persists quote error number RTN_22 when you contact customer care for quick resolution",
		RTN_23: "Please select a valid Return Period. If error persists quote error number RTN_23 when you contact customer care for quick resolution",
		RTN_25: " Error In File Generation",
		RTN_26: "You already have Submitted/Filed for Current Return Period. Please try again. If error persists quote error number RTN_26 when you contact customer care for quick resolution",
		RTN_27: "The User is not a Registered Normal Taxpayer. Please try again.  If error persists quote error number RTN_27 when you contact customer care for quick resolution",
		RTN_28: "No latest transaction is available to display. Please try again.  If error persists quote error number RTN_28 when you contact customer care for quick resolution",
		RTN_31: "File is Generated, please click the download button to download the file. If error persists quote error number RTN_31 when you contact customer care for quick resolution",
		RTN_35: "Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number RTN_35 when you contact customer care for quick resolution",
		RTN_3B: "Your Submit Request For Gstr3B is already being processed for Current Return Period. Please check again later. If error persists quote error number RTN_3B when you contact customer care for quick resolution",
		RTN_3B_HASH:
			"Please submit GSTR3B and clear liability to proceed with filing. If error persists quote error number RTN_3B_HASH when you contact customer care for quick resolution",
		RTN_FIL_27:
			"Filing of GSTR3B is not allowed as your registration date is not applicable for the chosen period. If error persists quote error number RTN_FIL_27 when you contact customer care for quick resolution",
		RT_3B_FIL_23:
			"Could not generate ARN. Please try again. If error persists quote error number RT_3B_FIL_23 when you contact customer care for quick resolution",
		RT_FIL_015:
			"GSTR5 submit is already under process. If error persists quote error number RT_FIL_015 when you contact customer care for quick resolution",
		RT_FIL_017:
			"User Is not Registered to any DSC. Please try again.  If error persists quote error number RT_FIL_017 when you contact customer care for quick resolution",
		RT_FIL_020:
			"GSTR6 is not freezed yet. Please try again.  If error persists quote error number RT_FIL_020 when you contact customer care for quick resolution",
		RT_FIL_037:
			"GSTR1 is not filed for July period. Please try again.  If error persists quote error number RT_FIL_037 when you contact customer care for quick resolution",
		RT_FIL_06:
			"GSTR2 is already filed. If error persists quote error number RT_FIL_06 when you contact customer care for quick resolution",
		RT_FIL_08:
			"GSTR2 is not freezed yet. Please try again.  If error persists quote error number RT_FIL_08 when you contact customer care for quick resolution",
		RT_FIL_09:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number RT_FIL_09 when you contact customer care for quick resolution",
		RT_FIL_10:
			"Please submit the invoices before filing. If error persists quote error number RT_FIL_10 when you contact customer care for quick resolution",
		RT_FIL_12:
			"Invalid Return Period as Succeeding Period. Please try again.  If error persists quote error number RT_FIL_12 when you contact customer care for quick resolution",
		RT_FIL_14:
			"Refund Claim is not submitted for current period. Please try again.  If error persists quote error number RT_FIL_14 when you contact customer care for quick resolution",
		RT_FIL_19:
			"Return can not be submitted/filed for current month. Please rectify and try again.  If error persists quote error number RT_FIL_19 when you contact customer care for quick resolution",
		RT_FIL_21:
			"GSTR1 is not filed for current period. Please try again.  If error persists quote error number RT_FIL_21 when you contact customer care for quick resolution",
		RT_FIL_22:
			"GSTR1A is not submitted for current period. Please try again.  If error persists quote error number RT_FIL_22 when you contact customer care for quick resolution",
		RT_FIL_24:
			"Some Error Occured while saving DSC data. Please try again.  If error persists quote error number RT_FIL_24 when you contact customer care for quick resolution",
		RT_FIL_25:
			"Some Error Occured while generating ARN. Please try again.  If error persists quote error number RT_FIL_25 when you contact customer care for quick resolution",
		RT_FIL_28:
			"User is not authorized to File with EVC Option. Please try again.  If error persists quote error number RT_FIL_28 when you contact customer care for quick resolution",
		RT_FIL_34:
			"GSTR1A is already submitted for current period. If error persists quote error number RT_FIL_34 when you contact customer care for quick resolution",
		RT_FIL_3B:
			"GSTR3B is already filed. If error persists quote error number RT_FIL_3B when you contact customer care for quick resolution",
		RT_FIL_55:
			"GSTR5 is not submitted for current period. Please try again.  If error persists quote error number RT_FIL_55 when you contact customer care for quick resolution",
		RT_FIL_56:
			"GSTR2 is already filed for current period. If error persists quote error number RT_FIL_56 when you contact customer care for quick resolution",
		RT_LIAB_3B:
			"Please clear the pending liability first and then proceed for filing. If error persists quote error number RT_LIAB_3B when you contact customer care for quick resolution",
		RT_SUB_3B:
			"GSTR3B is not submitted please submit GSTR3B to proceed. If error persists quote error number RT_SUB_3B when you contact customer care for quick resolution",
		S0000: "Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number S0000 when you contact customer care for quick resolution.",
		S0001: "Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number S0001 when you contact customer care for quick resolution.",
		SUB03: "GSTR5 is not submitted. Submit GSTR5. If error persists quote error number SUB03 when you contact customer care for quick resolution",
		SUB_IP: "Your GSTR3B submit is in progress, please try after successful submit. If error persists quote error number SUB_IP when you contact customer care for quick resolution",
		TRAN2_FIL_04:
			"GSTR3B is not filed for current period. If error persists quote error number TRAN2_FIL_04 when you contact customer care for quick resolution",
		UC_UFAC_ENTITY_NUM_INVALID: "Entity Number is invalid",
		UC_UFAC_ROLE_INVALID: "Please check user role.",
		UC_UFAS_INVALID_GSTN: "Please Enter Valid GSTIN ",
		UC_UFAS_INVALID_SOURCE_ID: "Please Enter Valid Source Id ",
		UC_UFAS_PLEASE_ENTER_VALID_AMOUNT: "Please Enter Valid amount ",
		UC_UFAS_URL_CANNOT_BE_EMPTY: "URL can not be empty ",
		UC_UFAS_INVALID_LIABOFFSETLEDG: "Please Enter Valid LiabOffsetLedg ",
		UC_UFAS_INVALID_STATE_JURISDICTION_CODE:
			"Please Enter Valid state jurisdiction code ",
		UC_UFAS_INVALID_CENTRAL_JURISDICTION_CODE:
			"Please Enter Valid central jurisdiction code ",
		UC_UFAS_INVALID_DEMAND_GOVERNING_LAW:
			"Please Enter Valid demand governing law ",
		UC_UFAS_INVALID_DEMAND_SOURCE_MODULE:
			"Please Enter Valid demand source module ",
		UC_UFAS_INVALID_DEMAND_SOURCE_FORM_NO:
			"Please Enter Valid demand source form no ",
		UC_UFAS_INVALID_LAW: "Please Enter Valid law ",
		UC_UFAS_INVALID_SECTION: "Please Enter Valid section ",
		UC_UFAS_INVALID_TAX_PERIOD: "Please Enter Valid taxperiod ",
		UC_UFAS_INVALID_TAX_SCN: "Please Enter Valid SCN ",
		UC_UFAS_INVALID_STATE_CODE: "Please Enter Valid StateCode ",
		UC_UFAS_INVALID_PAYMENT_TYPE: "Please Enter Valid Payment Type ",
		UC_UFAS_UTILIZEFUNDS_EXCEPTION: "system message ",
		UC_UFAS_UC_UFAS_INVALID_GSTN: "Please Enter Valid GSTIN ",
		UC_UFAC_INVALID_JSON:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number ",
		UC_UFAS_INVALID_LIAB:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number ",
		UC_UFAS_PENDING_RETURN_LIAB:
			"Return related liabilities are outstanding. Please pay off that first. If error persists quote error number ",
		UC_UFAS_AMOUNT_PAID_MORE_THAN_OUTSTANDING_LIAB:
			"Amount intended to be paid cannot be more than outstanding demand. If error persists quote error number ",
		UC_UFAS_TOTAL_AMOUNT_DIFFERS_ITC_CASH_SUM:
			"Sum of Cash/ITC utilization should be equal to amount intended to be paid. If error persists quote error number ",
		UC_UFAS_INVALID_AMOUNT_INTENDED_TO_PAY:
			"Amount intended to be paid cannot be equal to zero. If error persists quote error number ",
		UC_UFAS_LEDGER_EXCEPTION: "",
		UC_UFAS_UC_UFAS_GSTIN_STATE_CODE_NOT_MATCH:
			"State code not matched with GSTIN state code",
		UC_UFAS_GSTIN_STATE_CODE_NOT_MATCH:
			"State code not matched with GSTIN state code",
		UC_UFAS_USER_STATE_CODE_NOT_MATCH:
			"User Login state code not match with GSTIN state code",
		UC_UFGG_INVALID_REQUEST: "Invalid Request",
		UC_UFGG_INVALID_GSTIN:
			"GSTIN/temp ID is either invalid, Null or not present",
		UC_UFGG_INVALID_DEMAND_ID:
			"Demand ID is either invalid, Null or not present",
		UC_UFGG_INVALID_STATE_CODE:
			"State Code is either invalid, Null or not present",
		UC_UFGG_GSTIN_DOES_NOT_BELONG_TO_STATE:
			"GSTIN/Temp id does not belong to the state",
		UC_UFGG_INVALID_DEMAND_GSTIN_COMB:
			"Invalid GSTIN and Demand ID Combination",
		UC_UFGG_NO_OUTSTANDING_AMOUNT:
			"Demand does not have any outstanding amount",
		UC_UFGG_NO_OUTSTANDING_DEMANDS:
			"GSTIN does not have any outstanding demand",
		UC_UFGG_INSUFFICENT_CASH_BALANCE:
			"Cash Ledger does not have sufficient balance",
		UC_UFGG_INSUFFICENT_ITC_BALANCE:
			"ITC Ledger does not have sufficient balance",
		UC_UFGG_CROSS_UTILIZATION_NOT_ALLOWED:
			"Cross utilization of ITC amount across major heads not allowed",
		UC_UFGG_AMOUNT_TO_PAID_EXCEED:
			"Amount being paid exceed outstanding amount",
		UC_UFGG_USER_UNAUTHORIZED: "Unauthorized User",
		UC_UFGG_INVALID_ROLE: "Invalid Role",
		UC_UFGG_INVALID_ACTION:
			"API Action is either invalid, Null or not present",
		UC_UFGG_INVALID_DATA:
			"Input JSON is either invalid, Null or not present",
		UC_UFGG_INVALID_SIGN:
			"Sign value is either invalid, Null or not present",
		UC_UFGG_INVALID_DEMAND_DATE:
			"Demand Date is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_IGST_TX:
			"Amount intended to pay - IGST Tax  is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_IGST_INTR:
			"Amount intended to pay - IGST Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_IGST_PEN:
			"Amount intended to pay - IGST Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_IGST_FEE:
			"Amount intended to pay - IGST Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_IGST_OTH:
			"Amount intended to pay - IGST Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CGST_TX:
			"Amount intended to pay - CGST Tax is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CGST_INTR:
			"Amount intended to pay - CGST Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CGST_PEN:
			"Amount intended to pay - CGST Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CGST_FEE:
			"Amount intended to pay - CGST Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CGST_OTH:
			"Amount intended to pay - CGST Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_SGST_TX:
			"Amount intended to pay - SGST Tax is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_SGST_INTR:
			"Amount intended to pay - SGST Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_SGST_PEN:
			"Amount intended to pay - SGST Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_SGST_FEE:
			"Amount intended to pay - SGST Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_SGST_OTH:
			"Amount intended to pay - SGST Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CESS_TX:
			"Amount intended to pay - CESS Tax is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CESS_INTR:
			"Amount intended to pay - CESS Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CESS_PEN:
			"Amount intended to pay - CESS Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CESS_FEE:
			"Amount intended to pay - CESS Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CESS_OTH:
			"Amount intended to pay - CESS Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_IGST_TX:
			"Amount to be paid by Cash - IGST Tax is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_IGST_PEN:
			"Amount to be paid by Cash - IGST Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_IGST_FEE:
			"Amount to be paid by Cash - IGST Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_IGST_OTH:
			"Amount to be paid by Cash - IGST Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CGST_TX:
			"Amount to be paid by Cash - CGST Tax is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CGST_PEN:
			"Amount to be paid by Cash - CGST Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CGST_FEE:
			"Amount to be paid by Cash - CGST Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CGST_OTH:
			"Amount to be paid by Cash - CGST Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_SGST_TX:
			"Amount to be paid by Cash - SGST Tax is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_SGST_PEN:
			"Amount to be paid by Cash - SGST Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_SGST_FEE:
			"Amount to be paid by Cash - SGST Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_SGST_OTH:
			"Amount to be paid by Cash - SGST Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CESS_TX:
			"Amount to be paid by Cash - CESS Tax is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CESS_PEN:
			"Amount to be paid by Cash - CESS Penalty is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CESS_FEE:
			"Amount to be paid by Cash - CESS Fee is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CESS_OTH:
			"Amount to be paid by Cash - CESS Others is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_IGST_INT:
			"Amount to be paid by Cash - IGST Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CGST_INT:
			"Amount to be paid by Cash - CGST Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_SGST_INT:
			"Amount to be paid by Cash - SGST Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CESS_INT:
			"Amount to be paid by Cash - CESS Interest is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_IGST_IGST_BAL:
			"Amount to be paid by ITC IGST to be Paid - IGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_IGST_CGST_BAL:
			"Amount to be paid by ITC IGST to be Paid - CGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_IGST_SGST_BAL:
			"Amount to be paid by ITC IGST to be Paid - SGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_IGST_CESS_BAL:
			"Amount to be paid by ITC IGST to be Paid - CESS is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CGST_IGST_BAL:
			"Amount to be paid by ITC CGST to be Paid - IGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CGST_CGST_BAL:
			"Amount to be paid by ITC CGST to be Paid - CGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CGST_SGST_BAL:
			"Amount to be paid by ITC CGST to be Paid - SGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CGST_CESS_BAL:
			"Amount to be paid by ITC CGST to be Paid - CESS is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_SGST_IGST_BAL:
			"Amount to be paid by ITC SGST to be Paid - IGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_SGST_CGST_BAL:
			"Amount to be paid by ITC SGST to be Paid - CGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_SGST_SGST_BAL:
			"Amount to be paid by ITC SGST to be Paid - SGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_SGST_CESS_BAL:
			"Amount to be paid by ITC SGST to be Paid - CESS is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CESS_IGST_BAL:
			"Amount to be paid by ITC CESS to be Paid - IGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CESS_CGST_BAL:
			"Amount to be paid by ITC CESS to be Paid - CGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CESS_SGST_BAL:
			"Amount to be paid by ITC CESS to be Paid - SGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_PAID_BY_ITC_CESS_CESS_BAL:
			"Amount to be paid by ITC CESS to be Paid - CESS is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY:
			"Amount intended to pay is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH:
			"Amount to be paid by Cash is either invalid, Null or not present",
		UC_UFGG_UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH:
			"Amount to be paid by ITC is either invalid, Null or not present",
		UC_UFGG_INVALID_TRANSACTION:
			"Transaction is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_IGST:
			"Amount intended to pay IGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CGST:
			"Amount intended to pay CGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_SGST:
			"Amount intended to pay SGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_INTENDED_TO_PAY_CESS:
			"Amount intended to pay CESS is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_IGST:
			"Amount to be paid by Cash IGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CGST:
			"Amount to be paid by Cash CGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_SGST:
			"Amount to be paid by Cash SGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_CASH_CESS:
			"Amount to be paid by Cash CESS is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_ITC_IGST:
			"Amount to be paid by ITC IGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_ITC_CGST:
			"Amount to be paid by ITC CGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_ITC_SGST:
			"Amount to be paid by ITC SGST is either invalid, Null or not present",
		UC_UFGG_INVALID_AMOUNT_TO_BE_PAID_BY_ITC_CESS:
			"Amount to be paid by ITC CESS is either invalid, Null or not present",
		UC_UFGG_TOTAL_AMOUNT_DIFFERS_ITC_CASH_SUM:
			"Sum of Cash/ITC utilization should be equal to amount intended to be paid",
		UC_UFGG_OTHER_BALANCE_CANNOT_BE_UTILIZED_TO_CESS:
			"IGST, CGST or SGST balance can't be utilized towards the payment of CESS",
		UC_UFGG_OTHER_BALANCE_CANNOT_BE_UTILIZED_TO_SGST:
			"CGST or CESS balance can't be utilized towards the payment of SGST",
		UC_UFGG_OTHER_BALANCE_CANNOT_BE_UTILIZED_TO_CGST:
			"SGST or CESS balance can't be utilized towards the payment of CGST",
		UC_UFGG_OTHER_BALANCE_CANNOT_BE_UTILIZED_TO_IGST:
			"CESS balance can't be utilized towards the payment of IGST",
		UC_UFGG_PAY_IGST_BALANCE_FULL:
			"Pay IGST liability completely from IGST balance before utilizing IGST balance for CGST or SGST liability",
		UC_UFGG_PAY_CGST_BALANCE_FULL:
			"Pay CGST liability completely from CGST balance before utilizing CGST balance for IGST liability",
		UC_UFGG_PAY_SGST_BALANCE_FULL:
			"Pay SGST liability completely from SGST balance before utilizing SGST balance for IGST liability",
		UC_UFGG_UTILIZE_IGST_COMPLETELY_FOR_IGST:
			"Utilize IGST balance completely for IGST liability before utilizing from CGST balance",
		UC_UFGG_UTILIZE_CGST_COMPLETELY_FOR_IGST:
			"Utilize CGST balance completely for IGST liability before utilizing from SGST balance",
		UC_UFGG_UTILIZE_CGST_COMPLETELY_FOR_CGST:
			"Utilize CGST balance completely for CGST liability before utilizing from IGST balance",
		UC_UFGG_UTILIZE_SGST_COMPLETELY_FOR_SGST:
			"Utilize SGST balance completely for SGST liability before utilizing from IGST balance",
		UC_UFGG_UTILIZE_IGST_COMPLETELY_BEFORE_SGST:
			"Utilize IGST balance completely for IGST liability before utilizing from SGST balance",
		UC_UFGG_INVALID_SIGN_OR_DATA: "Data / Sign is invalid or Null",
		AUTH9001:
			"UserName is Invalid.If error persists quote error number AUTH9001 when you contact customer care for quick resolution.",
		AUTH9003:
			"User does not belong to given state.If error persists quote error number AUTH9003 when you contact customer care for quick resolution.",
		FIL03: "You cannot file for this period as GSTR3 filing for the previous period is pending.  Please try again.  If error persists quote error number FIL03 when you contact customer care for quick resolution",
		GEN01: "You cannot file for this period as GSTR3 filing for the previous period is pending.  Please try again.  If error persists quote error number GEN01 when you contact customer care for quick resolution",
		GEN07: "Error occured in generating GSTR3 form.  Please try again. If error persists quote error number GEN07 when you contact customer care for quick resolution",
		LB_BFBS_Mandatory_value_missing:
			"One of the input parameters required to create event was found to be invalid or null, requestPayloadEvnt  LB-BFBS1001 with error code ",
		OFF7: "Malformed Request - Improper Data to Offset Liability.  Please try again.  If error persists quote error number OFF7 when you contact customer care for quick resolution",
		RET01201:
			"Tax Consultant is not allowed to take this action. If error persists, please call GST Helpdesk or log your issues on <a href='https://selfservice.gstsystem.in/' title='Self Service Portal' target='_blank' rel='noopener noreferrer'>Grievance Redressal Portal for GST.</a> and quote the errorcode RET01201.",
		RET11404:
			"State code for the request seems to be incorrect. Please rectify. Quote error number RET11404 when you contact customer care if error persists",
		RET11409:
			"The username is invalid. Please rectify and try again. Quote error number RET11409 when you contact customer care if error persists ",
		RET13524:
			"GSTR1A submit is already in progress for current period. Please rectify and try again.  If error persists quote error number RET13524 when you contact customer care for quick resolution",
		RET13525:
			"GSTR3 is already generated. If error persists quote error number RET13525 when you contact customer care for quick resolution",
		DISTCACHE_EXCEPTION_CD:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RET3B91106  when you contact customer care for quick resolution.",
		UPDATE_DB_ERR_CD:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RET3B91107  when you contact customer care for quick resolution.",
		REQUEST_DECODE_ERR_CD:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RET3B91203  when you contact customer care for quick resolution.",
		SCHEMA_VALIDATION_ERR_CD_SAV:
			"Processing of JSON file was not successful. Please generate and upload the JSON file again.If error persists quote error number RET3B91204  when you contact customer care for quick resolution.",
		SCHEMA_VALIDATION_ERR_CD_SUB:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RET3B91205  when you contact customer care for quick resolution.",
		SCHEMA_PROCESSING_ERR_CD:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RET3B91206  when you contact customer care for quick resolution.",
		INVALID_ACTION_IN_REQ:
			"Invalid action provided in request.If error persists quote error number RET3B91301  when you contact customer care for quick resolution.",
		HEADER_PAYLOAD_MISMATCH_ERR_CD:
			"Mismatch between values of requested gstin or return period and the ones present in payload.If error persists quote error number RET3B91302  when you contact customer care for quick resolution.",
		GSTIN_MISSING_IN_REQUEST_CD:
			"Gstin is missing in header.If error persists quote error number RET3B91303  when you contact customer care for quick resolution.",
		RETPRD_MISSING_IN_REQUEST_CD:
			"Return period missing in header .If error persists quote error number RET3B91304  when you contact customer care for quick resolution.",
		RTNTYP_MISSING_IN_REQUEST_CD:
			"Return type attribute is missing in api request.If error persists quote error number RET3B91305  when you contact customer care for quick resolution.",
		ISGSPAPI_MISSING_IN_REQUEST_CD:
			"IsGspApi missing in api request.If error persists quote error number RET3B91306  when you contact customer care for quick resolution.",
		GSTREQUEST_MISSING_IN_REQUEST_CD:
			"GstRequest missing in api request.If error persists quote error number RET3B91307  when you contact customer care for quick resolution.",
		INVALID_ISUP_IGST:
			"Inter supplies IGST amount is more than Outward supplies IGST. Please rectify and save again. RET3B91401 ",
		INVALID_ISUP_POS:
			"POS provided in inter state supplies is invalid.If error persists quote error number RET3B91402  when you contact customer care for quick resolution.",
		ISUP_REPEATED_POS:
			"Same POS is repeated in inter state supplies list.If error persists quote error number RET3B91403  when you contact customer care for quick resolution.",
		RET_REQ_FIL_OR_SUB:
			"GSTR3B has either been filed or submitted, Hence,uploaded request can not be processed.If error persists quote error number RET3B91501  when you contact customer care for quick resolution.",
		RET_SUB_IP:
			"GSTR3B Submission in progress, Hence, uploaded request can not be processed.If error persists quote error number RET3B91502  when you contact customer care for quick resolution.",
		RET_11: "No GSTR3B data found for the provided gstin and ret_period.If error persists quote error number RET_11 when you contact customer care for quick resolution",
		RET_83515:
			"Invalid Return Period as Succeeding Period is Either Submitted or Filed. If error persists quote error number RET_83515 when you contact customer care for quick resolution ",
		RT_1ABC_RETURN_EXC_RAISED:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RT-1ABC1001 when you contact customer care for quick resolution.",
		RT_1ABC_GSTIN_NULL:
			"GSTIN is null or empty.If error persists quote error number RT-1ABC1002 when you contact customer care for quick resolution",
		RT_1ABC_REQUEST_NULL:
			"Request is null or empty.If error persists quote error number RT-1ABC1003 when you contact customer care for quick resolution",
		RT_1ABC_STATUS_NULL_EMPTY:
			"Status is null or empty.If error persists quote error number RT-1ABC1004 when you contact customer care for quick resolution",
		RT_1ABC_RETPRD_NULL:
			"Return Period is null or empty.If error persists quote error number RT-1ABC1005 when you contact customer care for quick resolution",
		RT_1ABC_R1SUMMARY_NULL:
			"R1 Summary object is null or empty.If error persists quote error number RT-1ABC1006 when you contact customer care for quick resolution",
		RT_1ABC_RESPONSE_NULL:
			"Unable to reach the server.If error persists quote error number RT-1ABC1007 when you contact customer care for quick resolution",
		QUERY_IS_EMPTY_BASE_DAO_R1:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		HEADER_EXCEPTION:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		GSTIN_EMPTY_R1:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		GSTIN_INVALID_R1:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		PAYLOAD_EMPTY_R1:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		RT_1AC_RETURN_EXC_RAISED:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RT-1AC1005 when you contact customer care for quick resolution.",
		RT_1AC_REQUEST_INVALID:
			"Can not process your request.If error persists quote error number RT-1AC1006 when you contact customer care for quick resolution",
		RT_1AC_REQUEST_GSTIN_INVALID:
			"GSTIN is null or empty.If error persists quote error number RT-1AC1007 when you contact customer care for quick resolution",
		RT_1AC_USERSESSION_EMPTY: "User session is null or empty",
		RT_1AC_ARN_NUM_NULL:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number RT-1AC1016 when you contact customer care for quick resolution.",
		QUERY_IS_EMPTY_R1:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		RETURN_PROCESSING: "Returns still under processing",
		RT_1AD_INVOICES_ALREADY_SUBMITTED:
			"Invoices already submitted. If error persists quote error number RT-1AD1012 when you contact customer care for quick resolution",
		RET_PERIOD_EMPTY: "Return Period is Empty",
		RT_1AD_RETURN_EXC_RAISED:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RT-1AHD1040 when you contact customer care for quick resolution.",
		RT_1AD_RTPRD_NULL_EMPTY_R1:
			"User Session is Null or Empty.If error persists quote error number RT-1AHD1041 when you contact customer care for quick resolution",
		RT_1AD_GSTIN_NULL_EMPTY_R1:
			"Return period is Null or Empty.If error persists quote error number RT-1AHD1042 when you contact customer care for quick resolution",
		GSTIN_EMPTY_COMMON_R1: "GSTIN is empty",
		GSTIN_INVALID_COMMON_R1: "GSTIN IS INVALID",
		DATE_CONFIG_CODE_GSTR1:
			"GSTR-1 Save/Action on Counterparty Invoices/Submit are not allowed for current date, Please visit https://www.gst.gov.in for details on GSTR-1 timelines.",
		GSTR_DETL_SAVE_ERROR:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1AS1007",
		SUMMARY_GSTR1_R1_NULL:
			"No Invoices found for the provided Inputs.RT-1AS1009",
		GSTR1_ALREADY_FILED_SUBMITTED:
			"GSTR1 is already filed.You already have Submitted/Filed GSTR1 For Current Return Period.",
		FILING_NOT_ALLOWED_DATERANGE:
			"GSTR-1 Save/Action on Counterparty Invoices/Submit are not allowed for current date, Please visit https://www.gst.gov.in for details on GSTR-1 timelines.",
		FAILURE_STATUS:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		GSTR1_ALREADY_FILED: "GSTR1 is already filed for current period",
		GSTR1_ALREADY_SUBMITTED:
			"GSTR1 is already submitted for current period",
		GSTR1_SUBMITTED_IN_PROGRESS:
			"GSTR1 submit is already in progress for current period",
		INVALID_RET_PER_R1: "Invalid Return Period",
		USER_NOT_NORMAL_TP_R1: "The User is not a Registered Normal Taxpayer",
		RT_1AS_RETURN_EXC_RAISED:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RT-1AS1050 when you contact customer care for quick resolution.",
		RT_1AS_FILING_STATUS_INVALID:
			"Filing status is not proper.If error persists quote error number RT-1AS1055 when you contact customer care for quick resolution",
		RT_1AS_ALREADY_SUBMITTED_CURPRD:
			"R1 form is already submitted for current period.If error persists quote error number RT-1AS1056 when you contact customer care for quick resolution",
		RT_1AS_IN_PROGRESS:
			"Form submit is already in process.If error persists quote error number RT-1AS1057 when you contact customer care for quick resolution",
		RT_1AS_INVALID_RETPRD:
			"Approve date is before the current date. If error persists quote error number RT-1AS1058 when you contact customer care for quick resolution",
		RT_1AS_GSTIN_MSTDETAIL:
			"Not able to find your details.If error persists quote error number RT-1AS1059 when you contact customer care for quick resolution",
		RT_1AS_NO_INVOICE_FOUND:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1AS1060",
		RT_1AS_GSTR1_CANNOT_FILE_FOR_RET_PER:
			"No Invoices found for the provided InputsRT-1AS1061",
		RT_1AS_NO_INVOICES_FOUND_FOR_THE_PROVIDED_INPUTS:
			"No Invoices found for the provided Inputs.  If error persists quote error number  when you contact customer care for quick resolution.",
		NO_REC_FOUND_FOR_INPUT_R1:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1ASC1047",
		SUMMARY_SEC_R1_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1AU1008",
		WEBAPI_VALIDATOR_STATE_CODE_MISMATCH_R1:
			"State Code is not valid for the User EnteredRT-1AV1016",
		WEBAPI_VALIDATOR_AUTH_TOKEN_INVALID_R1:
			"AuthToken Invalid for the User EnteredRT-1AV1017",
		WEBAPI_VALIDATOR_USERNAME_INVALID_R1: "Username is not ValidRT-1AV1018",
		WEBAPI_VALIDATOR_INVALID_GSTIN_R1: "Invalid GstinRT-1AV1019",
		WEBAPI_VALIDATOR_MISSING_GSTIN_R1: "Missing GstinRT-1AV1020",
		WEBAPI_VALIDATOR_MISSING_HEADER_VALUE_R1:
			"MISSING HEADER VALUERT-1AV1021",
		WEBAPI_VALIDATOR_UNAUTHORIZED_USER_R1:
			"The User is not authorized to access this URLRT-1AV1022",
		STATECODE_MISMATCH_G2B_R1: "State Code is not validRT-1GV1023",
		AUTH_TOKEN_INVALID_G2B_R1: "AuthToken InvalidRT-1GV1024",
		TRANS_ID_INVALID_G2B_R1: "Invalid Transaction IDRT-1GV1025",
		RET_PRD_NULL_EMPTY_G2B_R1: "Invalid Return PeriodRT-1GV1026",
		USRNME_INVALID_G2B_R1: "Username is not ValidRT-1GV1028",
		GSTIN_INVALID_G2B_R1: "Invalid GSTINRT-1GV1029",
		GSTIN_RET_PER_MISSING_G2B_R1:
			"Mandatory Parameters - Gstin or ReturnPeriod missingRT-1GV1031",
		INVALID_COUNTER_PARTY_GSTIN_G2B_R1:
			"Invalid Counter Party GstinRT-1GV1032",
		INCORRECT_ACTION_G2B_R1: "Incorrect actionRT-1GV1033",
		SUPPLIER_GSTIN_INVALID_MISSING_G2B_R1:
			"Suppliers Gstin is Invalid or MissingRT-1GV1034",
		DATE_FORMAT_INVALID_G2B_R1: "Date format entered is InvalidRT-1GV1035",
		API_HEADER_VALUE_MISSING_R1: "API Header Value MissingRT-1GV1036",
		UNAUTHORIZED_USER_G2B_R1:
			"You are not authorized to access GSTR1 for this return periodRT-1GV1037",
		INVALID_REQUEST_PARAMS_G2B_R1: "Invalid request parametersRT-1GV1038",
		RT_1WC_PAYLOAD_EMPTY:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WC_RETPRD_EMPTY:
			"Return period is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WC_REQUEST_NULL:
			"Request object is not proper.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WC_USERSESSION_NULL:
			"Try to logout and login again.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WC_SECTION_SUMMARY_NULL:
			"Not able to find section summary. If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WC_SECTION_NAME_NULL:
			"Section name is null or empty.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WC_RETURN_EXC_RAISED:
			"Not able to send data to the server.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WC_USERSESSION_EMPTY:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1WC1015",
		INVALID_SUMMARY_R1:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1WC1019",
		RT_1WC_SUBSECTION_NAME_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WC_LIST_UPPER_INUM_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WC_LIST_INVOICES_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WC_LIST_SUCCESS_SAVE_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WC_ERROR_ACTION_ALREADY_TAKEN:
			"Action has already been taken and the invoice is present in pending list please take further actions in pending version until it gets processed.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WC_ARN_NUM_NULL:
			"Something seems to have gone wrong while processing your request. Please try again.  If error persists quote error number  when you contact customer care for quick resolution.",
		SECTION_NAME_INVALID_CODE:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1WGU1003",
		SERVER_CONNECT_ERROR: "Unable to connect to server.RT-1WGU1009",
		ERROR_NO_PENDING_SUMMARY_CODE: "No pending summaryRT-1WGU1010",
		INVOICES_MORE_THAN_THRESHOLD:
			"You cannot view Invoices if they are more than the threshold limitRT-1WGU1013",
		RT_CSU_EMPTY_GSTIN:
			"GSTIN is null or empty.If error persists quote error number  when you contact customer care for quick resolution",
		RT_CSU_EMPTY_RETPERIOD:
			"Return period is null or empty.If error persists quote error number  when you contact customer care for quick resolution",
		RT_CSU_EMPTY_SECTION_NAME:
			"Section name is null or empty.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WU_NULL_INVOICEID:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WU_NULL_COUNTERPARTYID:
			"Counterparty ID is null or empty. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WU_NULL_PENDINGMAPKEY:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WU_RETURN_EXC_RAISED:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		SUMMARY_UNAVAILABLE: "Summary not availableRT-1WS1006",
		SUMMARY_UNAVAILABLE_TO_SUBMIT:
			"You have no summary to submit GSTR1RT-1WS1007",
		ERROR_NO_SUB_PEN_INV_CODE:
			"Please check if any subsection has pending invoices RT-1WS1008",
		MAX_UPLOAD_LIMIT_REACHED:
			"You cannot upload Invoices if they are more than the threshold limitRT-1WS1011",
		ERROR_SECTION_SUMMARY_NOT_AVAILABLE_CODE:
			"Section summary not availableRT-1WS1012",
		RT_1WS_USR_SESSION_NULL_EMPTY:
			"User Session is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution",
		NO_RESULT_AVAILABLE:
			"Something seems to have gone wrong while processing your request. Please try again. RT-1WS1014",
		NO_INVOICES_FOUND_R1: "No Invoices foundRT-1WS1016",
		NO_INVOICES_DETAILS_FOUND_R1: "No Invoice Details FoundRT-1WS1017",
		RT_1WS_RETPRD_NULL_EMPTY:
			"Return period is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WS_RETURN_EXC_RAISED:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_URL_EMPTY:
			"Unable to reach server.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WS_INVOICE_NULL:
			"Not able to get invoice. .If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WS_RETPRD_NULL:
			"Return period is not valid..If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WS_USERSESSION_NULL:
			"Try to logout and login again.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WS_API_RETURN_NULL:
			"Not able to get details from server. If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WS_SECTION_NAME_NULL:
			"Section name is null or empty.If error persists quote error number  when you contact customer care for quick resolution",
		RT_1WS_NO_INVOICES_FOUND:
			"No invoices found. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_SUBSECTION_NAME_NULL:
			"Sub section name is null or empty. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_LIST_OF_NUM_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_REFID_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_NO_INVOICE_CACHE:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_NO_INVOICES_FOUND_R1:
			"No GSTR1 Invoices found.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_NO_INVOICES_DETAILS_FOUND_R1:
			"No Invoice Details found. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_1WS_NO_RESULT_AVAILABLE:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		ERROR_SAVE:
			"Something seems to have gone wrong while saving the details. Please try again. If error persists quote error number  when you contact customer care for quick resolution ",
		RT_3BABD_R3B_SET_OFF_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BABD_ERROR_IN_SAVE_PLZ_SAVE_FORM_AGAIN:
			"Some error occured.Please save GSTR3B form againRT-3BABD1002",
		"RT_3BABD_IMPROPER_USER_DETAILS ":
			"Provided user details are improper. Please provide proper detailsRT-3BABD1003",
		"RT_3BABD_SYSTEM_ERROR ":
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		"RT_3BABD_NO_DATA_FOUND_FOR_GIVEN_INPUT ":
			"No GSTR3B data found for the provided gstin and return periodRT-3BABD1005",
		RT_3BABD_SAVE_REQUEST_UNDER_PROCESSING:
			"Gstr3B Save Still under processingRT-3BABD1006",
		GSTIN_EMPTY_3B_API:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAC1003",
		RETPERIOD_EMPTY_3B_API:
			"Return Period is empty. If error persists, please call GST Helpdesk or log your issues on <a href='https://selfservice.gstsystem.in/' title='Self Service Portal'  target='_blank' rel='noopener noreferrer'>Grievance Redressal Portal for GST.</a> and quote the errorcode RT-3BAC1004",
		STATECODE_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAC1005",
		APIREQUEST_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAC1006",
		QUERY_IS_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAC1007",
		SUBMIT_RESPONSE_EMPTY:
			"Sorry, submission of your GSTR3B got failed.  If error persists quote error number  when you contact customer care for quick resolution",
		STATE_CODE_MISMATCH:
			"The State code of your request does not match the GSTIN. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		AUTH_TOKEN_EMPTY:
			"Auth token is empty.If error persists quote error number  when you contact customer care for quick resolution",
		ROLE_EMPTY_3B_API_C:
			"Something seems to have gone wrong while saving the details. Please try again. If error persists quote error number  when you contact customer care for quick resolution ",
		LEDGER_USER_ROLE_INVALID:
			"Something seems to have gone wrong while saving the details. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		RETTYPE_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		NO_REFID_FOR_GSTIN_3B_API:
			"No reference id found for the provided gstin. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_UTILIZE_CASH_ITC_JSON_EMPTY:
			"Utilizing cache ITC information is found empty. If error persists quote error number  when you contact customer care for quick resolution.",
		REQUEST_SUBMITTED_OR_PROCESSING:
			"GSTR3B Already Submitted/ Submission in Progress for provided inputs.  If error persists quote error number  when you contact customer care for quick resolution",
		SAVE_REQUEST_UNDER_PROCESSING:
			"Gstr3B Save Still under processing. If error persists quote error number  when you contact customer care for quick resolution",
		ERROR_IN_SAVE:
			"Some error occured.Please save GSTR3B form again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BALDC_UTILIZE_CASH_ITC_JSON_EMPTY:
			"Submitted Offset details for payment of tax are empty. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BALDC_MALFORMED_REQUEST:
			"Your request details are malformed or empty. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		PARAMETERS_EXCEPTION_3B_API:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAS1001",
		APITRANSACTION_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAS1002",
		RETURNS_INVOICE_EMPTY_3B_API:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAS1003",
		APITXN_REDIS_EMPTY_3B_API:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAS1004",
		INSERT_TO_DB_FAILURE_3B_API:
			"Something seems to have gone wrong while saving the details. Please try again. RT-3BAS1005",
		KAFKA_PUBLISH_FAILURE:
			"Its not your fault! We ran into an error while saving data. Please try again. RT-3BAS1006",
		STATECODE_MISMATCH:
			"The State code of your request does not match the GSTIN. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		NO_DATA_FOUND: "No data found for GSTIN and Return Period ",
		RET_SUBMIT_STATUS_EMPTY:
			"Your current GSTR3 filing is either Accepted/Generated/Filed. If error persists quote error number  when you contact customer care for quick resolution",
		ALREADY_SUBMITTED_OR_FILED_3B:
			"Your current GSTR3B filing is either Frozen/Filed. If error persists quote error number  when you contact customer care for quick resolution",
		GSTIN_IS_MISSING:
			"Something seems to have gone wrong while saving the details. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		REQUEST_BEING_PROCESSED:
			"Your Submit Request For Gstr3B is already being processed for Current Return Period. If error persists quote error number  when you contact customer care for quick resolution",
		INVALID_FILING:
			"GSTR3B can be filed only after end of tax period and also ensure GSTR-3B for last tax period has been filed. If error persists quote error number  when you contact customer care for quick resolution",
		PREVIOUS_RETURN_NOT_FILED:
			"GSTR3B is not filed for previous period. If error persists quote error number  when you contact customer care for quick resolution",
		NOT_REGISTERED_TAX_PAYER:
			"User is not a Registered Normal Taxpayer. If error persists quote error number  when you contact customer care for quick resolution",
		GST_MSTR_DTLS_EMPTY_IN_DB:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		RETURN_SUBMIT_STATUS:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		GST_REF_ID_EMPTY:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		NO_PENDING_LIAB_BASED_ON_RTN_TYP:
			"There are no pending liabilities for the selected Return Type. If error persists quote error number  when you contact customer care for quick resolution",
		PAYLOAD_EMPTY:
			"Payload is empty.If error persists quote error number  when you contact customer care for quick resolution",
		RETPERIOD_EMPTY_3B_API_S:
			"Given return period is empty. Please rectify and try again. RT-3BAS1022",
		MALFORMED_REQUEST:
			"Malformed Request. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		LIMITED_LEDGER_VIEW_PERIOD:
			"Maximum Period selected for which the ledger can be viewed is for last 3 years.If error persists quote error number  when you contact customer care for quick resolution ",
		COMMUNICATION_FAILURE:
			"Communication failure.If error persists quote error number  when you contact customer care for quick resolution",
		"PARTAHASHVALUE_NULL   ":
			"Please perform offset of GSTR3B and/or clear all pending liabilities in order to proceed to filing .If error persists quote error number  when you contact customer care for quick resolution",
		CHECKSUM_MISMATCH:
			"Checksum mismatch while filing and submit.If error persists quote error number  when you contact customer care for quick resolution",
		DATA_INVALID:
			"Invalid Data provided .If error persists quote error number  when you contact customer care for quick resolution",
		"DATA_AND_PAYLOAD_MISMATCH ":
			"Mismatch of signed data & payload .If error persists quote error number  when you contact customer care for quick resolution",
		"INAVLID_DSC_SIGNATURE ":
			"Invalid DSC Signature .If error persists quote error number  when you contact customer care for quick resolution",
		"EMAS_AUTHENTICATION_FAILURE ":
			"Authentication has failed at emas .If error persists quote error number  when you contact customer care for quick resolution",
		"NOT_REGISTERED_PAN ":
			"Pan is not registered for the given gstin .If error persists quote error number  when you contact customer care for quick resolution",
		"INVALID_DSC_TYPE ":
			"Invalid DSC Type .If error persists quote error number  when you contact customer care for quick resolution",
		"FILE_GENERATION_ERROR ":
			"Error In GSTR3B File Generation.Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		"ARN_GENERATION_ERROR ":
			"Could not generate ARN.Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		"FILING_STATUS_ERROR  ":
			"Some Error Occured while updating Filing status.Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		"INVALID_REG_DATE_FOR_PERIOD ":
			"Filing of GSTR3B is not allowed as your registration date is not applicable for the chosen period.If error persists quote error number  when you contact customer care for quick resolution",
		"GSTR3B_NOT_SAVE_AFTER_PAGE_LOAD ":
			"You need to save your form after page load.If error persists quote error number  when you contact customer care for quick resolution",
		GSTR3B_TAMPERED:
			"You have tampered GSTR3B data please resave the data.If error persists quote error number  when you contact customer care for quick resolution",
		USER_TYPE_EMPTY:
			"User type for given GSTN is null or empty. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		PREV_DUE_DATE_EMPTY:
			"Previous due date is null or empty. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		"INVALID_FILE_REQUEST ":
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number  when you contact customer care for quick resolution.",
		"INVALID_OR_EXPIRED_OTP ":
			"OTP is either expired or incorrect.If error persists quote error number  when you contact customer care for quick resolution.",
		"RTN_FILNG_OBJ_EMPTY  ":
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		EMPTY_BATCH_ENTITY:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		INVALID_RETURN_PERIOD_3B_API:
			"Invalid Return period. If error persists quote error number  when you contact customer care for quick resolution",
		INSUFFICIENT_CASHBALANCE_3B_API:
			"Insufficient cash balance available to discharge the liability. If error persists quote error number  when you contact customer care for quick resolution",
		EXCEEDED_MAX_PERIOD_3B_API:
			"Maximum Period selected for which the ledger can be viewed is for last 3 years.If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_INVALID_FILE_REQUEST:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_NO_DATA_FOUND_FOR_GIVEN_INPUT:
			"No Data found to make it ready for settlement/filling for provided inputs. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_CHEKSUM_INVALID:
			"Checksum validation Failed. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_CANNOT_SAVE_SUBMIT:
			"GSTR-3B for the tax period cannot be saved/submitted as GSTR-3 for this tax period is already generated. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_ALREADY_FILLED:
			"You already have Submitted/Filled For Current Return Period. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_NOT_SUBMITTED:
			"GSTR3B is not submitted please submit GSTR3B to proceed. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_TRAN1_SUBMIT_NOT_FILLED:
			"You have SUBMITTED TRAN-1 form but have not FILLED it. You are requested to FILE the same before submitting this return. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_PENDING_LIAB:
			"Please clear the pending liability first and then proceed for filing. You are requested to FILE the same before submitting this return. If error persists quote error number  when you contact customer care for quick resolution",
		"RT_3BAS_IMPROPER_USER_DETAILS ":
			"Provided user details are improper. Please provide proper details. If error persists quote error number  when you contact customer care for quick resolution",
		"RT_3BAS_INVALID_RTN_DATE ":
			"Invalid Return Date. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		"RT_3BAS_R3B_SET_OFF_NULL ":
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_AUTH_MSG1:
			"You cannot pay less/more than the Integrated tax payable amount. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_AUTH_MSG2:
			" You cannot pay less/more than the Central tax payable amount. If error persists quote error number  when you contact customer care for quick resolution ",
		RT_3BAS_AUTH_MSG3:
			"You cannot pay less/more than the State/UT tax payable amount. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_AUTH_MSG4:
			"You cannot pay less/more than the Cess tax payable amount. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_INVALID_REG_DATE_FOR_SELECTED_PERIOD:
			"Filing of GSTR3B is not allowed as your registration date is not applicable for the chosen return period. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_INVALID_REGISTRATION_TYPE:
			"Invalid registration type. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_NO_PENDING_LIABILITIES:
			"No pending liabilities.&nbsp;If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_PARTIAL_PAYMENT_NOT_ALLOWED:
			"Partial Payment is not allowed for GSTR3B while doing Offset Liability. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BAS_EXCESS_ITC_UTILIZED:
			"You are utilizing excess itc which is not available. Please try again.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BAS_PARTIAL_EXCESS_PAYMENT_NOT_ALLOWED:
			"PARTIAL/EXCESS payment is not allowed.Please try again.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BAS_INVALID_USER_TYPE:
			"User type is invalid. Please try again.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BAS_INVALID_MONTH:
			"Entered month is invalid. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BAS_DSC_INS_FAIL:
			"Some error occured while saving DSC data. Please try again.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BAS_EVC_INS_FAIL:
			"Some error occured while saving EVC data.Please try again.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BAS_R3B_LAST_SAVE_CHECK_SET_OFF:
			"Your last save is still under process, please go back to the previous page and once you get successful save message then proceed with payment. ",
		RT_3BAS_PREVIOUS_RETURN_NOT_FILED_WITH_PARAM:
			"GSTR3B is not filed for previous period 1} .If error persists quote error number ",
		MALFORMED_REQUEST_TRANS:
			"Malformed Request. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		SYSTEM_ERROR:
			"System Error. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		FORM_NOT_APPLICABLE_3B_API_V:
			"GSTR3B form is not applicable for given return period. If error persists quote error number  when you contact customer care for quick resolution",
		INVALID_GSP_3B_API_V:
			"Not a valid GSP user. If error persists quote error number  when you contact customer care for quick resolution",
		UNAUTHORIZED_USR_3B_API_V:
			"Unauthorized User as the GSTIN is invalid. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		WEBAPI_VALIDATOR_HEADER_EXCEPTION:
			"API Header Value Missing. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RTN_PRD_INVALID_3B_API_V:
			"Return period is invalid. If error persists quote error number  when you contact customer care for quick resolution",
		APIHEADER_EXCEPTION_3B_API_V:
			"Something seems to have gone wrong while saving the details. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		USERSESSION_EMPTY_3B_API_V:
			"User session is null or empty. If error persists quote error number  when you contact customer care for quick resolution",
		AUTH_TOKEN_INVALID:
			"Authentication token is invalid. If error persists quote error number  when you contact customer care for quick resolution",
		USERNAME_INVALID:
			"Username is invalid. If error persists quote error number  when you contact customer care for quick resolution",
		GSTIN_INVALID:
			"GSTIN in invalid. If error persists quote error number  when you contact customer care for quick resolution",
		WEBAPI_VALIDATOR_STATE_CODE_MISMATCH:
			"State code is invalid. If error persists quote error number  when you contact customer care for quick resolution",
		WEBAPI_VALIDATOR_RETN_PRD_INVALID:
			"Return period invalid. If error persists quote error number  when you contact customer care for quick resolution",
		STATE_CODE_NULL_EMPTY:
			"State Code is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution.",
		USRNME_NULL_EMPTY:
			"User name is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution.",
		AUTH_TOKEN_NULL_EMPTY:
			"Auth Token is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution.",
		GSTIN_NULL_EMPTY:
			"GSTIN is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution.",
		TRANS_ID_NULL_EMPTY:
			"Transaction ID is Null or Empty. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RET_PRD_NULL_EMPTY:
			"Return Period is Null or Empty.If error persists quote error number  when you contact customer care for quick resolution.",
		RETURN_PERIOD_INVALID_WEBAPI_VALIDATOR:
			"Return period is invalid in API Header.If error persists quote error number  when you contact customer care for quick resolution.",
		MAND_PARAMETER_RETURN_PERIOD_GSTN_MISSING:
			"Mandatory header parameters like return period or GSTN is missing.If error persists quote error number  when you contact customer care for quick resolution.",
		UNAUTHORIZED_FOR_THIS_RETURN_PERIOD:
			"User is unauthorized for this return period.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BAV_UNAUTHORISED_USER_FOR_URL:
			"The User is not authorized to access this URL",
		STATECODE_EMPTY_3B_GSP_C:
			"Something seems to have gone wrong while saving the details. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		ROLE_EMPTY_3B_GSP_C:
			"Something seems to have gone wrong while saving the details. Please try again. If error persists quote error number  when you contact customer care for quick resolution ",
		RT_3BGC_MALFORMED_REQUEST:
			"Your request details are malformed or empty. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BGC_OFFSET_NULL:
			"Your request details are malformed or empty. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BGC_GST_OFFSET_REQUEST_EMPTY:
			"Your request details are malformed or empty. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		FORM_NOT_APPLICABLE_3B_GSP_V:
			"GSTR3B form is not applicable for given return period. If error persists quote error number  when you contact customer care for quick resolution",
		INVALID_GSP_3B_GSP_V:
			"Not a valid GSP user. If error persists quote error number  when you contact customer care for quick resolution",
		UNAUTHORIZED_USR_3B_GSP_V:
			"Unauthorized User as the GSTIN is invalid. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		API_HEADER_VAL_MISSING:
			"API Header Value Missing. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RTN_PRD_INVALID_3B_GSP_V:
			"Return period is invalid. If error persists quote error number  when you contact customer care for quick resolution",
		APIHEADER_EXCEPTION:
			"Something seems to have gone wrong while saving the details. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		STATECODE_MISMATCH_G2B:
			"State Code mismatch.If error persists quote error number  when you contact customer care for quick resolution",
		AUTH_TOKEN_INVALID_G2B:
			"Invalid Auth Token. If error persists quote error number  when you contact customer care for quick resolution",
		TRANS_ID_INVALID_G2B:
			"Transaction ID is Invalid. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RET_PRD_NULL_EMPTY_G2B:
			"Return Period is Null or Empty in API Header. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RET_PRD_INVALID_G2B:
			"Return period is invalid. If error persists quote error number  when you contact customer care for quick resolution",
		USRNME_INVALID_G2B:
			"User name is Invalid. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		GSTIN_INVALID_G2B:
			"GSTIN is invalid. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		USERSESSION_EMPTY_G2B:
			"User session is null or empty.If error persists quote error number  when you contact customer care for quick resolution ",
		GSTIN_RTNPRD_NULL_EMPTY_3B_GSP_V:
			"GSTIN or Return Period is null or empty. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		GSTIN_RTNPRD_NULL_EMPTY:
			"You are not authoried to access GSTR3B for this return period. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		RT_3BGV_TRANS_ID_NULL_EMPTY:
			"Transaction ID is Null or Empty. Please try again. If error persists quote error number  when you   contact customer care for quick resolution.",
		REQUEST_JSON_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution.",
		API_REQUEST_NULL:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number  when you contact customer care for quick resolution.",
		RT_3BSP_FUTURE_RTN_PRD_3B:
			"Return Period is of future date. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BSP_HEADER_PAYLD_MISMATCH_3B:
			"Either Return period or GSTIN from the header and payload are different. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3BSP_INVALID_RETURN_PRD_3B:
			"Return Period is invalid. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		INVALID_ISUP_IGST_3B:
			"Inter supplies IGST amount is more than Outward supplies IGST. If error persists quote error number  when you contact customer care for quick resolution.",
		INVALID_NET_ITC:
			"NET ITC Provided is not equal to ITC Available - ITC Reversed. If error persists quote error number  when you contact customer care for quick resolution.",
		ISUP_REPEATED_POS_3B:
			"Same POS is repeated in inter state supplies list. If error persists quote error number  when you contact customer care for quick resolution.",
		INVALID_ISUP_POS_3B:
			"POS provided in inter state supplies is invalid. If error persists quote error number  when you contact customer care for quick resolution.",
		INCOMING_PAYLOAD_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		USERSESSION_EMPTY_3B_WEB_C:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		GSTIN_EMPTY_3B_WEB:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		RETPERIOD_EMPTY_3B_WEB:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		INVALID_GSTR3B_SUMMARY:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_ERROR_OTP_EXPIRED_MSG:
			"Your OTP is expired please try again. If error persists quote error number  when you contact customer care for quick resolution",
		API_RESULT_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		TRANDS_ID_EMPTY_3B_WEB:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		APITXN_REDIS_EMPTY_3B_WEB_S:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		APITXN_REQUEST_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		RETURNS_INVOICE_EMPTY_3B_WEB:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		NO_SUMMARY_TO_SUBMIT:
			"You have no summary to submit GSTR3B. If error persists quote error number  when you contact customer care for quick resolution",
		DATA_NOT_AVAILABLE_3B_WEB_S:
			"Data is not available presently, Please Refresh after some time. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		SERVER_CONNECTION_ISSUE_3B_WEB_S:
			"unable to connect to server.If error persists quote error number  when you contact customer care for quick resolution ",
		RT_3B_RTN_3B_CODE:
			"Please submit GSTR3B and clear liability to proceed with filing. If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_PAYLOAD_EMPTY:
			"Something seems to have gone wrong while saving the details. Please try again. If error persists quote error number  when you contact customer care for quick resolution",
		CONNECTION_ISSUE:
			"Unable to connect to server. If error persists quote error number  when you contact customer care for quick resolution",
		EVCTOKEN_EMPTY:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_ERROR_NO_EMAIL_MOBILE_CODE:
			"Authorized Signatory has not enabled EVC. Email & Mobile No. details are missing.If error persists quote error number  when you contact customer care for quick resolution",
		RT_4SX_USR_NOT_COMPOSITE:
			"User is not a composite user for the given return period",
		RT_4SX_HDR_BODY_MISMATCH:
			"Header and body Parameter do not match. If error persists quote error number  when you contact customer care for quick resolution.",
		RT_4SX_INVALID_GSTIN: "The taxpayer GSTIN Entered is Invalid",
		RT_4SX_HDR_PYLD_MISMATCH:
			"The gstin or return period from api header does not match the gstin or return period entered in the request payload. Please try again with the correct gstin and return period.",
		RT_4SX_ADVANCE_RETPRD:
			"The Given Return Period is not open for Filing  Yet",
		RT_4SX_PRE_GST_RETURN_PERIOD:
			"The Return Period you are saving is Pre-GST. Please save for a valid Return Period.",
		NO_DATA_FOR_GSTIN_RETPRD:
			"No GSTR3B data found for the provided gstin and ret_period. If error persists quote error number  when you contact customer care for quick resolution",
		"DSC_VERIFICATION_FAILURE ":
			"DSC verification failed. Please Try after sometime .If error persists quote error number  when you contact customer care for quick resolution",
		INVALID_PAN_OR_SIGN:
			"Pan Number or Sign is invalid.If error persists quote error number  when you contact customer care for quick resolution",
		INVALID_GSTIN:
			"Invalid GSTIN. If error persists quote error number  when you contact customer care for quick resolution",
		"NOT_DSC_REGISTERED_USER ":
			"User Is not Registered to any DSC.If error persists quote error number  when you contact customer care for quick resolution",
		RT_3B_SERVER_CONNECTION_ISSUE:
			"unable to connect to server.If error persists quote error number  when you contact customer care for quick resolution ",
		DATA_NOT_AVAILABLE_CMN_WEB_RTN_S:
			"Data is not available presently, Please Refresh after some time. Please try again.If error persists quote error number  when you contact customer care for quick resolution ",
		API_RESULT_EMPTY_NULL:
			"Something seems to have gone wrong while saving the details. Please try again. ",
		SERVER_CONNECTION_ISSUE:
			"unable to connect to server.If error persists quote error number  when you contact customer care for quick resolution.",
		TRANS_ID_UNAVAILABLE:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		FORMNAME_INVALID_CODE:
			"Something seems to have gone wrong while processing your request. Please try again. ",
		REFRESH_NEEDED: "Please refresh the browser again after some time",
		CONNECT_ERROR: "Unable to connect to server.",
		ACTION_ALREADY_TAKEN_R1:
			"Action has already been taken and the invoice is present in pending list please take further actions in pending version until it gets processedRTDSC04",
		RT_1WSU_HAS_BEEN_DELETED:
			"Something seems to have gone wrong while processing your request. Please try again. RTDSC05",
		RT_1WSU_INVALID_SECTION_NAME:
			"Something seems to have gone wrong while processing your request. Please try again. RTN_03",
		RT_SCPR_SUB_FILED_3B:
			"GSTR3B has either been filed or submitted. Hence, uploaded request can not be processed. If error persists quote error number RTN_111 when you contact customer care for quick resolution",
		RT_SCPR_SUBMT_IN_PRGRS_3B:
			"GSTR3B Submission in progress. Hence, uploaded request can not be processed. If error persists quote error number RTN_112 when you contact customer care for quick resolution",
		RT_SCPR_ACCESS_NOT_ALLOWED_3B:
			"You are not authoried to access GSTR3B for this return period. If error persists quote error number RTN_13 when you contact customer care for quick resolution",
		RT_SCPR_SUB_FILED_3B_TOPO:
			"GSTR3B has either been filed or submitted. Hence, uploaded request can not be processed. If error persists quote error number RTN_15 when you contact customer care for quick resolution",
		RT_SCPR_SUBMT_IN_PRGRS_3B_TOPO:
			"GSTR3B Submission in progress. Hence, uploaded request can not be processed. If error persists quote error number RTN_17 when you contact customer care for quick resolution",
		RT_SCPR_ACCESS_NOT_ALLOWED_3B_TOPO:
			"You are not authoried to access GSTR3B for this return period. If error persists quote error number RTN_18 when you contact customer care for quick resolution",
		GSTREQ_NULL:
			"GstRequest is null. If error persists quote error number RTN_22 when you contact customer care for quick resolution.",
		ACTION_NULL:
			"Action in GstRequest is null. If error persists quote error number RTN_23 when you contact customer care for quick resolution.",
		DATA_NULL:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RTN_25 when you contact customer care for quick resolution.",
		DECRYPT_PAYLOAD:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RTN_26 when you contact customer care for quick resolution.",
		RET_REPLAY:
			"Processing Retry timeout, failed to process the request. Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RTN_27 when you contact customer care for quick resolution.",
		RT_SCPU_DECODE_FAILURE_3B:
			"Error while decoding the request payload. Please try again. If error persists quote error number RTN_28 when you contact customer care for quick resolution",
		RT_SCPU_GSTIN_IS_NULL_3B:
			"GSTIN is null in APIHeader. Please try again. If error persists quote error number RTN_31 when you contact customer care for quick resolution",
		RT_SCPU_INVALID_GSTIN_LEN_OR_FORMAT_3B:
			"Either GSTIN format is invalid or length of GSTIN is invalid. Please try again. If error persists quote error number RTN_35 when you contact customer care for quick resolution",
		RT_SCPU_RTN_PRD_IS_NULL_3B:
			"Return Period is null in APIHeader. Please try again. If error persists quote error number RTN_3B when you contact customer care for quick resolution",
		RT_SCPU_STATE_CODE_MISMATCH_3B:
			"State codes from gstin and APIHeader are not same. Please try again. If error persists quote error number RTN_3B_HASH when you contact customer care for quick resolution",
		RT_SCPU_USR_NME_NULL_3B:
			"User name is null in APIHeader. Please try again. If error persists quote error number RTN_FIL_27 when you contact customer care for quick resolution",
		RT_SCPU_EK_NULL_3B:
			"Encryption key is null in APIHeader. Please try again. If error persists quote error number RT_3B_FIL_23 when you contact customer care for quick resolution",
		RET_JSON_ERR:
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RT_FIL_015 when you contact customer care for quick resolution.",
		INVALID_RETURN_DATE:
			"Return period entered is invalid. Please provide a valid data. If error persists quote error number RT_FIL_017 when you contact customer care for quick resolution",
		RT_UTIL_ACTION_NOT_ALLOWED_TXCLNT:
			"Tax Consultant is not allowed to take this action. Please try again. If error persists quote error number RT_FIL_020 when you contact customer care for quick resolution.",
		UC_UFAC_HEADER_UNAUTHORIZED: "Malformed Request UC-UFAC1001",
		UC_UFAC_UTILIZEFUNDS_EXCEPTION:
			"system message UC-UFAC10022 is coming with error code",
		UC_UFAC_INVALID_GSTIN:
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number UC-UFAC1003 when you contact customer care for quick resolution.",
		LBL_TABLE14_GSTR9:
			"14. Differential tax paid on account of declaration in 10 & 11 above",
		LBL_DESCRIPTION_GSTR9: "Description",
		LBL_PAYABLE_GSTR9: "Payable (₹)",
		LBL_PAID_GSTR9: "Paid (₹)",
		LBL_GSTR9_INTEGRATED: "Integrated Tax",
		LBL_GSTR9_CENTRAL: "Central Tax",
		LBL_GSTR9_STATE: "State/UT Tax",
		LBL_GSTR9_CESS: "Cess",
		LBL_GSTR9_INTEREST: "Interest",
		LBL_TABLE15_GSTR9: "15. Particulars of Demands and Refunds",
		LBL_DETAILS_GSTR9: "Details",
		LBL_INTEGRATED_GSTR9: "Integrated tax (₹)",
		LBL_CENTRAL_GSTR9: "Central tax (₹)",
		LBL_STATE_GSTR9: "State/UT tax (₹)",
		LBL_CESS_GSTR9: "Cess (₹)",
		LBL_INEREST_GSTR9: "Interest (₹)",
		LBL_PENALTY_GSTR9: "Penalty (₹)",
		LBL_LATE_GSTR9: "Late fee/others(₹)",
		LBL_GSTR9_TAB15A: "(A) Total Refund claimed",
		LBL_GSTR9_TAB15B: "(B) Total Refund sanctioned",
		LBL_GSTR9_TAB15C: "(C) Total Refund Rejected",
		LBL_GSTR9_TAB15D: "(D) Total Refund Pending",
		LBL_GSTR9_TAB15E: "(E) Total demand of taxes",
		LBL_GSTR9_TAB15F: "(F) Total taxes paid in respect of E above",
		LBL_GSTR9_TAB15G: "(G) Total demands pending out of E above",
		LBL_GSTR9_INOUTWARD_SUPPLIES:
			"4.Details of advances, inward and outward supplies made during the financial year on which tax is payable",
		LBL_GSTR9_OUTWARD_SUPPLIES:
			"5.Details of Outward supplies made during the financial year on which tax is not payable",
		LBL_GSTR9_ITC_RETURNS:
			"6.Details of ITC availed during the financial year.",
		LBL_GSTR9_ITC_REVERSED:
			"7.Details of ITC Reversed and  Ineligible ITC for the financial year",
		LBL_GSTR9_ITC_OTHER: "8.Other ITC information",
		LBL_GSTR9_TAXPAID_DEC:
			"9.Details of tax paid as declared in returns filed during the financial year",
		LBL_GSTR9_PREVFY_TRANS:
			"10,11,12&13 Particulars of the transactions for the financial year declared in returns of the next financial year till the specified period",
		LBL_GSTR9_PREVFY_TRANS1:
			"For FY 2018-19, Particulars of the transactions for the FY 2018-19 declared in returns between April, 2019 till September, 2019.",
		LBL_GSTR9_PREVFY_TRANS_OLD:
			"10,11,12&13 Particulars of the transactions for the financial year declared in returns of the next financial year till the specified period",
		LBL_GSTR9_DIFF_TAXPAID:
			"14. Differential tax paid on account of declaration in table no. 10 & 11",
		LBL_GSTR9_DEMAND_REFUND: "15. Particulars of Demands and Refunds",
		LBL_GSTR9_SUPRCVD_COMPTXP:
			"16. Supplies received from Composition taxpayers, deemed supply by job worker and goods sent on approval basis",
		LBL_GSTR9_HSN_OUTSUP: "17. HSN wise summary of Outward Supplies",
		LBL_GSTR9_HSN_INSUP: "18. HSN wise summary of Inward Supplies",
		LBL_GSTR9_LATE_FEE: "19. Late fee payable and paid",
		LBL_GSTR9_ANNUAL_RETURN: "GSTR-9 Annual return for Normal taxpayers",
		BTN_BACK_TO_QUESTIONNAIRE: "BACK TO QUESTIONNAIRE",
		BTN_GSTR9_PREVIEW_PDF: "PREVIEW DRAFT GSTR-9(PDF)",
		BTN_GSTR9_PREVIEW_EXCEL: "PREVIEW DRAFT GSTR-9 (EXCEL)",
		BTN_GSTR9_FINAL_EXCEL: "DOWNLOAD FILED GSTR-9 (EXCEL)",
		BTN_GSTR9_COMPUTE_LIABILITIES: "COMPUTE LIABILITIES",
		BTN_GSTR9_PROCEED_TO_FILE: "PROCEED TO FILE",
		BTN_GSTR9_COMPUTED_SUM: "DOWNLOAD GSTR-9 SYSTEM COMPUTED SUMMARY (PDF)",
		BTN_GSTR1_SUM_PDF: "DOWNLOAD GSTR-1 SUMMARY (PDF)",
		BTN_GSTR1_IFF_SUM_PDF: "DOWNLOAD GSTR-1/IFF SUMMARY (PDF)",
		BTN_GSTR3B_SUM_PDF: "DOWNLOAD  GSTR-3B SUMMARY (PDF)",
		LBL_GSTR9_LATE_FEE_PAID: "Late fee paid",
		LBL_GSTR9_HEAD_TAB16:
			"16. Information on supplies received from composition taxpayers, deemed supply by job worker and goods sent on approval basis",
		LBL_GSTR9_SUP_COMPTXP:
			"(A) Supplies received from Composition taxpayers",
		LBL_GSTR9_DEEMED_SUPB: "(B) Deemed supply under section 143",
		LBL_GSTR9_GOODSAPRVL_SUPC:
			"(C) Goods sent on approval basis but not returned",
		BTN_GSTR9_BACK_DASHBOARD: "BACK TO GSTR-9 DASHBOARD",
		LBL_OUTWARD_SUP:
			"5. Details of Outward supplies made during the financial year on which tax is not payable",
		LBL_ZERO_RATEDEXP:
			"(A) Zero rated supply (Export) without payment of tax",
		LBL_SEZ_PAYMENT: "(B) Supply to SEZ without payment of tax",
		LBL_SUP_RECP_REV:
			"(C) Supplies on which tax is to be paid by the recipient on reverse charge basis",
		LBL_EXMPTD: "(D) Exempted",
		LBL_NIL_RATED: "(E) Nil Rated",
		LBL_NON_GST_SUP: "(F) Non-GST supply (includes ‘no supply’)",
		LBL_SUB_AFABV: "(G) Sub total (A to F above)",
		LBL_CREDIT_NOTES_TRANS:
			"(H) Credit notes issued in respect of transactions specified in (A to F) above (-)",
		LBL_DEBIT_NOTES_TRANS:
			"(I)Debit Notes issued in respect of transactions specified in (A to F) above (+)",
		LBL_SUP_AMENDMENTS_DEC: "(J) Supplies declared through Amendments (+)",
		LBL_SUP_AMENDMENTS_REDUCED:
			"(K) Supplies reduced through Amendments (-)",
		LBL_SUB_HTOK: "(L) Sub total (H to K)",
		LBL_TRNOVR_GLABV:
			"(M) Turnover on which tax is not to be paid (G + L above)",
		LBL_GSTR9_TOTAL_TURNOVR:
			"(N) Total Turnover (including advances) (4N + 5M - 4G above)",
		LBL_GSTR9_TYPE: "Type",
		LBL_GSTR9_ITC_AVL6:
			"6.Details of ITC availed during the financial year",
		LBL_GSTR9_CREDIT_AVL6:
			"(A) Total amount of input tax credit availed through FORM GSTR-3B (sum total of Table 4A of FORM GSTR-3B)",
		LBL_GSTR9_INWARD_SUP6:
			"(B) Inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs)",
		LBL_GSTR9_INWARD_SUP_UNREG6:
			"(C)Inward supplies received from unregistered persons liable to reverse charge (other than B above) on which tax is paid & ITC availed",
		LBL_GSTR9_INWARD_SUP_REG6:
			"(D) Inward supplies received from registered persons liable to reverse charge (other than B above) on which tax is paid and ITC availed",
		LBL_GSTR9_IMP_GOODS6:
			"(E)Import of goods (including supplies from SEZ)",
		LBL_GSTR9_IMP_SERV6:
			"(F) Import of services (excluding inward supplies from SEZ)",
		LBL_GSTR9_INPTAX_ISD: "(G) Input Tax credit received from ISD",
		LBL_GSTR9_ITC_RECLAIM6:
			"(H)Amount of ITC reclaimed (other than B above) under the provisions of the Act",
		LBL_GSTR9_SUB_BHABV: "(I) Sub-total (B to H above)",
		LBL_GSTR9_DIFF_IAABV: "(J) Difference (I - A above)",
		LBL_GSTR9_TRANS1_CREDIT:
			"(K) Transition Credit through TRAN-I (including revisions if any)",
		LBL_GSTR9_TRANS2_CREDIT: "(L) Transition Credit through TRAN-II",
		LBL_GSTR9_ITC_ABVM: "(M) Any other ITC availed but not specified above",
		LBL_GSTR9_SUB_KMABV: "(N) Sub-total (K to M  above)",
		LBL_GSTR9_TOTAL_ITC_INABV: "(O) Total ITC availed (I + N above)",
		LBL_GSTR9_ITC_INFO: "8. Other ITC related information",
		LBL_GSTR9_ITC_PERGSTR2A: "(A) ITC as per GSTR-2A (Table 3 & 5 thereof)",
		LBL_GSTR9_ITC_6BABV: "(B) ITC as per sum total of 6(B) and 6(H) above",
		LBL_GSTR9_ITC_INSUP:
			"(C) ITC on inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs) received during the financial year but availed in the next financial year upto specified period",
		LBL_GSTR9_DIFF8D: "(D) Difference [A-(B+C)]",
		LBL_GSTR9_ITC_NTAVL: "(E) ITC available but not availed",
		LBL_GSTR9_ITC_INEGBL: "(F) ITC available but ineligible",
		LBL_GSTR9_IGST_IMPGDS:
			"(G) IGST paid on import of goods (including supplies from SEZ)",
		LBL_GSTR9_IGST_CRDTGDS:
			"(H) IGST credit availed on import of goods (as per 6(E) above)",
		LBL_GSTR9_DIFF8I: "(I) Difference (G-H)",
		LBL_GSTR9_ITC_IMGDSJ:
			"(J) ITC available but not availed on import of goods (Equal to I)",
		LBL_GSTR9_ITCK_TOTAL:
			"(K) Total ITC to be lapsed in current financial year (E + F + J)",
		GSTR9_QUES1: "Do you want to file a Nil return?",
		GSTR9_QUES2:
			"Nil return can be filed by you if you have not made any outward supply (commonly known as sale) AND have NOT received (commonly known as purchase) any goods/services AND do not had any tax liability AND no ITC claimed during the year AND there are no demand and refunds during the year",
		LBL_OPTION: "Option",
		GSTR9_QUES3:
			"Please answer the below question to view the relevant parts of the return:-",
		LBL_GSTR9_STEPS: "Steps to prepare GSTR-9 return online",
		LBL_GSTR9_TXPAID_DCLRD:
			"9. Details of tax paid as declared in returns filed during the financial year",
		LBL_GSTR9_TAB10_HEAD:
			"10, 11, 12 & 13 Particulars for the previous FY transactions declared in returns of April to September of next FY or upto date of filing of Annual Return for 2017-18, whichever is earlier",
		LBL_GSTR9_TAB10_AMNDPOS:
			"10. Supplies / tax declared through Amendments (+) (net of debit notes)",
		LBL_GSTR9_TAB10_AMNDNEG:
			"11. Supplies / tax reduced through Amendments (-) (net of credit notes)",
		LBL_GSTR9_TAB10_REVITC:
			"12. Reversal of ITC availed during previous financial year",
		LBL_GSTR9_TAB10_AVLDITC:
			"13. ITC availed for the previous financial year",
		LBL_GSTR9_TAB10_TRNOVR: "Total turnover(5N + 10 - 11)",
		LBL_GSTR9_LATE_FEE18: "Late fee payable and paid",
		LBL_GSTR9_CENTRAL_TAXA: "A. Central Tax",
		LBL_GSTR9_STATE_TAXB: "B. State/UT tax",
		LBL_GSTR9_DECLARATION19:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and behalf and nothing has been concealed therefrom",
		LBL_GSTR9_CREATE_CHALLAN: "CREATE CHALLAN",
		LBL_GSTR9_FILE: "FILE GSTR-9",
		LBL_GSTR9_ITC_REVRS_TAB7:
			"7.Details of ITC Reversed and  Ineligible ITC for the financial year",
		LBL_GSTR9_RULE37_TAB7: "(A) As per Rule 37",
		LBL_GSTR9_RULE39_TAB7: "(B) As per Rule 39",
		LBL_GSTR9_RULE42_TAB7: "(C)As per Rule 42",
		LBL_GSTR9_RULE43_TAB7: "(D)As per Rule 43",
		LBL_GSTR9_SECTION17_TAB7: "(E) As per section 17(5)",
		LBL_GSTR9_REV_TRANS1_CRDT: "(F) Reversal of TRAN-I credit",
		LBL_GSTR9_REV_TRANS2_CRDT: "(G) Reversal of TRAN-II credit",
		LBL_GSTR9_ITC_REV_TAB7I: "(I) Total ITC Reversed (Sum of A to H above)",
		LBL_GSTR9_ITC_UTIL_TAB7J:
			"(J) Net ITC Available for Utilization (6O - 7I)",
		LBL_GSTR9_OTHER_REV_TAB7: "Other reversals (pl. specify)",
		LBL_GSTR9_TABLE17_PROCESSED:
			"There are no Processed Invoices Details at this time.",
		LBL_GSTR9_SUPPLY_APPLICABLE:
			"Is supply applicable for concesstional rate of tax",
		GSTR9A: "Annual Return for Composition Taxpayer",
		ERR_FILE_PREV: "Please File GSTR-4 of the financial year ",
		LBL_PROC_FUR: " to proceed further.",
		LBL_HEAD_R9A: "GSTR-9A Annual Return for Composition Taxpayer",
		LBL_R9A_1:
			"Please answer the below question to view the relevant parts of the return:",
		LBL_R9A_3:
			"Based on your answers,relevant tables of GSTR-9A will be visible on the next page. You may go back to previous screen by clicking on Back to File Returns Button",
		LBL_R9A_4: "Steps to prepare your GSTR-9A return online",
		LBL_R9A_5: "DOWNLOAD GSTR-9A SYSTEM COMPUTED SUMMARY (PDF)",
		LBL_R9A_6: "DOWNLOAD  GSTR-4 SUMMARY (PDF)",
		LBL_R9A_7:
			"Please click here to download the Computed Summary of GSTR-9A for your review",
		LBL_R9A_8:
			"Please click here to download the Summary of GSTR-4 for your review",
		LBL_R9A_9:
			"6. Details of Outward supplies made during the financial year",
		LBL_R9A_10:
			"7. Details of inward supplies on which tax is payable on reverse charge basis (net of debit/credit notes) for the financial year",
		LBL_R9A_11:
			"8. Details of other inward supplies for the financial year",
		LBL_R9A_12:
			"9. Details of tax paid as declared in returns filed during the financial year",
		LBL_R9A_13:
			"10, 11, 12 & 13. Particulars of the transactions for the previous FY declared in returns of April to September of current FY or upto date of filing of annual return of previous FY whichever is earlier",
		LBL_R9A_14:
			"14. Differential tax paid on account of declaration made in 10, 11, 12 & 13 above",
		LBL_R9A_15: "15. Other information -Particulars of Demands and Refunds",
		LBL_R9A_16: "Late fee/Others",
		LBL_R9A_17: "16. Details of credit reversed or availed",
		LBL_R9A_18: "17. Late fee payable and paid",
		LBL_R9A_19: "Steps to file your GSTR-9A return",
		LBL_R9A_20: "PREVIEW DRAFT GSTR-9A (PDF)",
		LBL_R9A_21: "PREVIEW DRAFT GSTR-9A (EXCEL)",
		LBL_R9A_20_FIL: "Download filed GSTR-9A (PDF)",
		LBL_R9A_21_FIL: "Download GSTR-9A (Excel)",
		LBL_R9A_22:
			"Nil return can be filed for the Financial year, if you have:-",
		LBL_R9A_23: "NOT made any outward supply (commonly known as sale); AND",
		LBL_R9A_24:
			"NOT received (commonly known as purchase) any goods/services; AND",
		LBL_R9A_25: "NO other liability to report; AND",
		LBL_R9A_26: "NOT claimed any credit AND",
		LBL_R9A_26_1: "NOT claimed any refund; AND",
		LBL_R9A_26_2: "NOT received any order creating demand.",
		LBL_R9A_27: "5. Aggregate Turnover of Previous Financial Year",
		LBL_R9A_28: "4. Period of composition option during the year",
		LBL_R9A_29: "BACK TO GSTR-9A DASHBOARD",
		LBL_GSTR9_01:
			"Nil return can be filed for the Financial year, if you have: -",
		LBL_GSTR9_Q1:
			"NOT made any outward supply (commonly known as sale); AND",
		LBL_GSTR9_Q2:
			"NOT received any goods/services (commonly known as purchase); AND",
		LBL_GSTR9_Q3: "NO other liability to report; AND",
		LBL_GSTR9_Q4: "NOT claimed any credit; AND",
		LBL_GSTR9_Q5: "NOT claimed any refund; AND",
		LBL_GSTR9_Q6: "NOT received any order creating demand",
		ERR_GT_SAVE:
			"Please save Turnover of Previous Financial Year before proceeding with compute liabilities",
		ERR_GT_REQ: "Do Enter Turnover of Previous Financial Year",
		LBL_SUCCESS_MSG: "Record saved successfully",
		"RT-8AC-10011001": "Either gstin or return period is null",
		"RT-9AS-10011001": "No ledger entry found",
		"RT-9AS-10011002": "No Records found for the provided inputs",
		"RT-9AS-10011003": "Unable to publish data to kafka",
		"RT-9AS-10011004": "Unable to push data to cache",
		"RT-9AS-10011005": "GSTR9 form is already filed",
		"RT-9AV-10011001": "Invalid State Code",
		"RT-9AV-10011002": "Invalid Authentication Token",
		"RT-9AV-10011003": "Invalid User Name",
		"RT-9AV-10011004": "Invalid Gstin",
		"RT-9AV-10011005": "Invalid Return Period",
		"RT-9AV-10011006": "Either Gstin or Return Period are invalid",
		"RT-9AV-10011007": "API header missing",
		"RT-9AV-10011008": "Invalid TransID",
		"RT-9AV-10011009": "Authorisation failed",
		"RT-9AV-10011010": "Invalid API version",
		"RT-9AV-10011011": "User Role is invalid",
		"RT-9AV-10011012": "Invalid return period",
		"RT-9SS-10011001": "Invalid Gstin",
		"RT-9SS-10011002": "Gstin in payload and API request is mismatched",
		"RT-9SS-10011003": "Invalid return period in payload",
		"RT-9SS-10011004": "Save Payload is empty",
		"RT-9SS-10011005": "Invalid Return Period",
		"RT-9SU-10011001": "Invalid state code",
		"RT-9SU-10011002": "Invalid TransID",
		"RT-9SU-10011003": "Invalid Save Request.All sections cannot be empty",
		"RT-9WC-10011001": "Invalid Section Name",
		"RT-9WS-10011001":
			"Records are already under process. Please wait for sometime.",
		"RT-9WS-10011002": "Summary not available",
		"RT-9WU-10011001": "No Records available",
		GSTR9_REFUND_ERROR:
			"Total of Table no 15F and 15G shall be equal to the amount mentioned in Table no 15E.",
		"GSTN-EXEC1003":
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number GSTN-EXEC1003 when you contact customer care for quick resolution.",
		"RT-9WS-1001-9018":
			"Something seems to have gone wrong while processing your request. Please try again. \nIf error persists quote error number RT-9WS-1001-9018 when you contact customer care for quick resolution.",
		RET791111:
			"Sum of Total taxes paid and Total demands pending is not equal to the Total Demand of Taxes",
		ERR_ANN_DAS_R9A:
			"To prepare and file your annual return, filing of all GSTR-4 quarterly returns is mandatory. Please file your pending GSTR-4 quarterly returns and then try again",
		ERR_ANN_DAS_R9: "",
		ERR_GSTR_PEND_MSG: "Save request is in progress.",
		LBL_GSTR9_ISSUP_CHEKBOX:
			"Is supply applicable for concesstional rate of tax",
		LBL_DASH_HEAD_MSME: "Consent form for Taxpayers, who are MSME:",
		ERR_GSTR9_PEND_MSG: "Save request is under process",
		LBL_POP_GSTR9: "Save request is accepted successfully.",
		LBL_ITC01_MSG17: "Prepare Online",
		LBL_ITC01_MSG18: "Prepare Offline",
		LBL_ANNUAL_DASH_HEAD: "File Return",
		BTN_VIEW: "View",
		LBL_HLP_TXT_R9A_1:
			"Annual return in Form GSTR-9A is required to be filed by every registered taxpayer who has availed composition scheme during the relevant financial year. ",
		LBL_HLP_TXT_R9A_2:
			"All returns in Form GSTR-4 for the relevant period shall be filed for the relevant financial year before the user can prepare/file Annual Return in form GSTR-9A.",
		LBL_DASH_TXT_23: "Prepare Online:-",
		LBL_DASH_TXT_25: "Steps to be taken:",
		LBL_SAV_SUCCESS: "Response saved successfully",
		LBL_MSME_CNFRM:
			"I hereby solemnly affirm and declare that the information given herein is true and correct and I have no objection in sharing the same.",
		LBL_MSME_QUEST:
			"Do you want to provide your consent for sending the above information to DFS ?",
		LBL_MSME_QUEST_1:
			"If you are Micro, Small and Medium Enterprises (MSME), then you may be eligible to access credit of Rs.10 lakhs – Rs.1.00 crore under loan scheme <a href='http://www.psbloansin59minutes.com' target='_blank'>www.psbloansin59minutes.com</a> coordinated by the Department of Financial Services (DFS), subject to fulfilment of certain term and conditions of the scheme. If you are willing to be considered for the loan scheme, please provide your consent to the GSTN to share your following information with the DFS:",
		LBL_MSME_QUEST_2: "",
		MSME_YES: "YES",
		MSME_NO: "NO",
		MSME_MB: "WILL DECIDE LATER",
		LBL_MSME_DTL_1:
			"By selecting 'Yes' I consent to share following information with Department of Financial Services and further to Banks or any other authority involved in the purpose of concessional Loan:",
		LBL_MSME_DTL_3: "GSTIN",
		LBL_MSME_DTL_2: "Name of Entity",
		LBL_MSME_DTL_4: "Place Of Business",
		LBL_MSME_DTL_5: "Authorized representative",
		LBL_MSME_DTL_6: "Your Primary Bank IFSC Code",
		LBL_MSME_DTL_7: "Name",
		LBL_MSME_DTL_8: "Mobile No.",
		LBL_MSME_DTL_9: "E-mail",
		LBL_MSME_DTL_10:
			"Thank you very much for giving your consent for sending your details to the Department of Financial Services. The concerned Public Sector Bank will soon contact you for your credit requirement.",
		LBL_HLP_TXT_R9A_3:
			"Select from the questionnaire page, whether you wish to file NIL Annual return;",
		LBL_HLP_TXT_R9A_4:
			"You may download the draft of system computed GSTR-9A and summary of GSTR-4 for your reference;",
		LBL_HLP_TXT_R9A_5:
			"Based on the information available in the System, details have been filled up  in different tables. The same can be edited if you intend to change the values.;",
		LBL_HLP_TXT_R9A_6: "Click on Compute Liability; and",
		LBL_HLP_TXT_R9A_7:
			"Click on ‘Proceed to file’ and ‘File GSTR-9A’ with DSC/EVC.",
		LBL_HLP_TXT_R9A_8:
			"Download the GSTR-9A offline tool from the ‘Downloads’ section in the pre-login page on the portal.",
		LBL_HLP_TXT_R9A_9:
			"Follow instructions in ‘GSTR-9A offline tool’ to add details and generate JSON file for upload;",
		LBL_HLP_TXT_R9A_10:
			"Click on ‘Prepare Offline’ and then click on ‘Download’ tab to download JSON file to import into the offline tool to auto-populate the system computed details of GSTR-9A.",
		LBL_HLP_TXT_R9A_11:
			"Click on ‘Prepare Offline’ and select ‘Upload’ to upload JSON file and file the return with the help of instructions available on GSTR-9A dashboard;",
		LBL_HLP_TXT_R9A_12:
			"The uploaded file can be downloaded again by clicking on ‘Prepare Offline’ and then click on ‘Download’ tab to download JSON file with the details as updated by you.",
		LBL_HLP_TXT_R9A_13:
			"In case of any errors, it will be shown on the GSTR-9A dashboard for corrections.",
		LBL_HLP_TXT_R9A_14:
			"Download the draft system computed GSTR-9A (only for reference) and summary of Form GSTR-4 for the financial year by clicking on relevant buttons. This will facilitate in providing details in actual tables. ",
		LBL_HLP_TXT_R9A_15:
			"Click on tables (Box) selected and fill in the required details;",
		LBL_HLP_TXT_R9A_16:
			"By default, the details will be auto filled in relevant fields of different tables based on filed Form GSTR-4. These fields are editable and once edited, the edited values shall be displayed subsequently.",
		LBL_HLP_TXT_R9A_17:
			"Summary of added details would be available on the relevant box;",
		LBL_HLP_TXT_R9A_18:
			"Click on ‘Preview Draft GSTR-9A (PDF)’ button to view summary in PDF format, and Click on ‘Preview Draft GSTR-9A (EXCEL)’ button to view summary in Excel format; and",
		LBL_HLP_TXT_R9A_19:
			"After adding and confirming the details, follow filing process as indicated at the bottom of this page.",
		LBL_HLP_TXT_R9A_20: "Steps to file your GSTR-9A return",
		LBL_HLP_TXT_R9A_21:
			"Click on ‘Compute Liabilities’; for computation late fee, if any;",
		LBL_HLP_TXT_R9A_22:
			"‘Proceed to File’ button would be enabled once liabilities are computed and reflected in Table 17 box;",
		LBL_HLP_TXT_R9A_23:
			"Click on “Proceed to File” button to pay liabilities and file the return by using DSC/EVC;",
		LBL_HLP_TXT_R9A_24:
			"Additional details can be added even after clicking on ‘Proceed to file’ button, however you would be required to follow steps 1 to 3 again to file the return;",
		LBL_HLP_TXT_R9A_25:
			"Click on ‘Download Filed GSTR-9A (PDF)’ button to view summary in PDF format and ‘Download Filed GSTR-9A (EXCEL)’ button to view summary in Excel format.",
		LBL_HLP_TXT_R9A_26:
			"Click here to enter/view summary of outward supplies declared during the financial year",
		LBL_HLP_TXT_R9A_27:
			"Click here to enter/view summary of inward supplies liable to reverse charge declared during the financial year.",
		LBL_HLP_TXT_R9A_28:
			"Click here to enter/view summary of other inward supplies declared during the financial year.",
		LBL_HLP_TXT_R9A_29:
			"Click here to enter/view the tax (including Interest, late fee, Penalty & others) paid as declared during the financial year.",
		LBL_HLP_TXT_R9A_30:
			"Click here to enter/view the summary of transactions declared in next financial year.",
		LBL_HLP_TXT_R9A_31:
			"Click here to enter/view the total tax paid on transactions reported in next financial year.",
		LBL_HLP_TXT_R9A_32:
			"Click here to enter/view particulars of Demands and Refunds during the financial year.",
		LBL_HLP_TXT_R9A_33:
			"Click here to enter/view summary of credit reversed or credit availed on opting in and/or opting out of composition scheme",
		LBL_HLP_TXT_R9A_34: "Click here to view Late fee charged, if any.",
		LBL_HLP_TXT_R9A_35:
			"Click here to download the system computed GSTR-9A summary in PDF format.",
		LBL_HLP_TXT_R9A_36:
			"Click here to download GSTR-4 summary for all tax periods in PDF format",
		LBL_HLP_TXT_R9A_37:
			"Click here to download the summary of details added, in PDF format. Please ensure correctness of the same before filing return",
		LBL_HLP_TXT_R9A_38:
			"Click here to download the details added/auto filled, in XL sheet for correctness of the same",
		LBL_HLP_TXT_R9A_39: "Click here to compute Late fee, if any.",
		LBL_HLP_TXT_R9A_40:
			"Click here to file your return after computation of liabilities",
		LBL_HLP_TXT_R9A_41: "Outward Supplies:",
		LBL_HLP_TXT_R9A_42:
			"<b>Table 6A:</b> Aggregate value of all outward supplies net of debit notes / credit notes, net of advances and net of goods returned for the entire financial year shall be declared here. Table 6 and Table 7 of FORM GSTR-4 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_43:
			"<b>Table 6B:</b> Aggregate value of exempted, Nil Rated and Non-GST supplies shall be declared here.",
		LBL_HLP_TXT_R9A_44:
			"<b>Table 6C:</b> Auto-calculated by system based on details entered in table 6A & 6B.",
		LBL_HLP_TXT_R9A_45: "Inward Supplies:",
		LBL_HLP_TXT_R9A_46: "Tax Paid:",
		LBL_HLP_TXT_R9A_47: "Transactions reported in current FY:",
		LBL_HLP_TXT_R9A_48: "Differential tax paid:",
		LBL_HLP_TXT_R9A_49: "Demands and Refunds:",
		LBL_HLP_TXT_R9A_50: "Credit reversed or availed",
		LBL_HLP_TXT_R9A_51: "Late fee payable and paid",
		LBL_HLP_TXT_R9A_52:
			"<b>Table 7A:</b> Aggregate value of all inward supplies received from registered persons on which tax is payable on reverse charge basis shall be declared here. Table 4B, Table 5 and Table 8A of FORM GSTR-4 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_53:
			"<b>Table 7B:</b> Aggregate value of all inward supplies received from unregistered persons (other than import of services) on which tax is payable on reverse charge basis shall be declared here. Table 4C, Table 5 and Table 8A of FORM GSTR-4 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_54:
			"<b>Table 7C:</b> Aggregate value of all services imported during the financial year shall be declared here. Table 4D and Table 5 of FORM GSTR-4 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_55:
			"<b>Table 7D:</b> Auto-calculated by system based on details entered in table 7A, 7B & 7C.",
		LBL_HLP_TXT_R9A_56:
			"<b>Table 8A:</b> Aggregate value of all inward supplies received from registered persons on which tax is payable by the supplier shall be declared here. Table 4A and Table 5 of FORM GSTR-4 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_57:
			"<b>Table 8B:</b> Aggregate value of all goods imported during the financial year shall be declared here.",
		LBL_HLP_TXT_R9A_58:
			"Aggregate value of all payments made during the financial year shall be declared here. Table 10 & 11 of FORM GSTR-4 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_59:
			"Details of additions or amendments to any of the supplies already declared in the returns of the previous financial year but such amendments were furnished in Table 5 (relating to inward supplies) or Table 7 (relating to outward supplies) of FORM GSTR- 4 of April to September of the current financial year or upto the date of filing of Annual Return for the previous financial year, whichever is earlier shall be declared here.",
		LBL_HLP_TXT_R9A_60:
			"Turnover for the financial year is system computed for determining the maximum limit of late fee and for updating the previous year’s turnover for filing subsequent year’s Form GSTR-9A.",
		LBL_HLP_TXT_R9A_61:
			"Details of payment made due to additions or amendments to any of the supplies already declared in the returns of the previous financial year but such amendments were furnished in Table 5 (relating to inward supplies) or Table 7 (relating to outward supplies) of FORM GSTR- 4 of April to September of the current financial year or upto the date of filing of Annual Return for the previous financial year, whichever is earlier shall be declared here.",
		LBL_HLP_TXT_R9A_62:
			"<b>Table 15A, 15B, 15C and 15D:</b> Aggregate value of refunds claimed, sanctioned, rejected and pending for processing shall be declared here. ",
		LBL_HLP_TXT_R9A_63:
			"Table 15A: Refund claimed will be the aggregate value of all the refund claims filed in the financial year and will include refunds which have been sanctioned, rejected or are pending for processing.",
		LBL_HLP_TXT_R9A_64:
			"<b>Table 15B:</b> Refund sanctioned means the aggregate value of all refund sanction orders. ",
		LBL_HLP_TXT_R9A_65:
			"<b>Table 15C:</b> Refund rejected means the aggregate value of all refund rejected orders.",
		LBL_HLP_TXT_R9A_66:
			"<b>Table 15D:</b> Refund pending will be the aggregate amount in all refund application for which acknowledgement has been received and will exclude provisional refund received.<p>These will not include details of non-GST refund claims.</p>",
		LBL_HLP_TXT_R9A_68:
			"<b>Table 15E:</b> Aggregate value of demands of taxes for which an order confirming the demand has been issued by the adjudicating authority, has been issued shall be declared here.",
		LBL_HLP_TXT_R9A_69:
			"<b>Table 15F:</b> Total amount paid against the total demand stated in 15E shall be declared here.",
		LBL_HLP_TXT_R9A_70:
			"<b>Table 15G:</b> Total amount of demand pending for recovery out of 15E shall be declared here.",
		LBL_HLP_TXT_R9A_71:
			"<b>Table16A: </b>Aggregate value of all credit reversed when a person opts to pay tax under the composition scheme shall be declared here. The details furnished in FORM ITC-03 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_72:
			"<b>Table16B: </b>Aggregate value of all the credit availed when a registered person opts out of the composition scheme shall be declared here. The details furnished in FORM ITC-01 may be used for filling up these details.",
		LBL_HLP_TXT_R9A_73:
			"Cash Balance available in cash ledger will be shown.",
		LBL_HLP_TXT_R9A_74: "Late fee, if any can be paid in cash only.",
		LBL_HLP_TXT_R9A_75:
			"‘Create challan’ button will be enabled only if sufficient cash is not available in Cash Ledger.",
		LBL_HLP_TXT_R9A_76:
			"System will auto fill the deficient amounts in challan form created and after deposit of the amount, the system will navigate back to this page.",
		LBL_HLP_TXT_R9A_77:
			"Declaration and Authorized signatory fields will be enabled only if sufficient cash balance is available to offset the liabilities.",
		LBL_HLP_TXT_R9A_78:
			"Check the Declaration box and select the Authorized signatory to file the return with EVC/DSC.",
		LBL_HLP_TXT_R9A_79: "Aggregate Turnover:",
		LBL_HLP_TXT_R9A_80:
			"Aggregate turnover for the previous financial year is the turnover of the financial year preceding the year for which the return is being filed. For example, for the annual return for FY 2017-18, the aggregate turnover of FY 2016-17 shall be entered into this table. It is the sum total of turnover of all taxpayers registered on the same PAN. ",
		S_001: "System Failure",
		RET_004: "Cache is not available",
		RT024: "Duplicate Invoice Entry",
		"JSON parsing error": "JSON parsing error",
		RETWEB_001: "Unable to connect to server",
		RET_005: "Invalid Ctin",
		RET_001: "Summary is not proper",
		RET_002: "Summary not availble",
		RET_006: "No Invoice Available",
		RET_003: "Unable to connect to Server",
		RET_007: "Summary Generation is In-Process",
		RT026: "Document Number already exists",
		RT027: "Duplicate Credit Debit Entry",
		RT0241: "Duplicate Item Entry ",
		RT029: "Duplicate Bill Of Entry",
		RT030: "Duplicate Record Entry",
		RT031: "Duplicate Note Entry",
		RT0000001: "Duplicate Deductee Entry",
		"RET_008 ": " Session expired. Kindly Login again.",
		RET_009: "Please select a valid financial year  ",
		" RET_010": "Please select the mandatory fields  ",
		" RTN_11": "No Record found for the provided Inputs",
		RTN_10: "Malformed Request",
		RTN_08: "Please enter the mandatory fields.",
		RTN_06: "Please select a From Date.",
		RTN_05: "Please select a To Date.",
		RTN_02: "From date cannot be a future date",
		RTN_04: "To date cannot be a future date",
		RTN_01: "From Date cannot be greater than To Date",
		RTN_11: "Invalid Date",
		RET_011: "Malformed Request",
		RTN5001_MSG: "Invalid GSTR5A SUMMARY ",
		RETWEB_00: "OOPS ! Some error occured, Please try again.",
		RTN_09: "No Record found for the provided Inputs",
		RTN_09_01:
			"Records are already under process. Please wait for sometime.",
		RETWEB_002: "Invalid Counterparty gstin",
		RETWEB_003: "Registration Date not avialble",
		RETWEB_004: "API response is null",
		RETWEB_01: "Section summary not available",
		RETWEB_02: "Summary not available",
		RETWEB_03: "No pending summary",
		RETWEB_04: "No invoices found!!",
		RETWEB_05: "No processsed invoice found for provided counterparty: ",
		" RETWEB_06": "No processsed invoice found for section: ",
		" RETWEB_07": "No pending invoices found!!",
		RETWEB_08: "No invoice found with invoice ID: ",
		" RETWEB_10": "Invoice is still pending",
		RETWEB_11: "No new changes to save",
		RETWEB_12:
			"You have records still Under processing/Processed with error status  in section :",
		RETWEB_14: "You have no invoice to submit GSTR1",
		RETWEB_15:
			"Action has already been taken and the invoice is present in pending list please take further actions in pending version until it gets processed",
		RETWEB_16: "Your OTP is expired please try again",
		RETWEB_17: "No offline transaction for the given Return Period",
		RETWEB_18: "Unable to fetch data",
		RETWEB_19:
			"Authorized Signatory has not enabled EVC. Email & Mobile No. details are missing",
		RETWEB_20: "Authorized Signatory details do not match",
		RETWEB_21: "GSTIN provided is not valid or registered",
		RETWEB_22: "No Authorized Signatory",
		RETWEB_23: "No offline transaction for the given return period",
		RETWEB_24: "Error in generating error report for :",
		RETWEB_25: "Has been Deleted",
		RETWEB_26: "Error in processing request. Please Upload Again.",
		RETWEB_27: "Invalid Save Request",
		RETWEB_28:
			"Record already present in Database. Please edit the existing record for any modification",
		RETWEB_29:
			"Record present in Pending Record List. Please edit the pending record for any modification",
		RETWEB_30: "No Records are found !",
		RETWEB_31: "Record is under processing",
		RETWEB_32: "No Record found in pending list",
		RETWEB_33: "Invalid Return Type",
		RETWEB_34:
			"Records present in Pending Record List of Goods Details With Invoices section. Please remove records before paying your liabilities.",
		RETWEB_35:
			"Records present in Pending Record List of Goods Details Without Invoices section. Please remove records before paying your liabilities.",
		RETWEB_36: "User session is null",
		RETWEB_37: "Form name is null",
		RETWEB_38: "Return period is null",
		RT0000002: "Duplicate Supplier GSTIN",
		RET745135:
			"The number of Records that can be  shown in a particular section has exceeded threshold, please go to Offline Download to view all records.",
		RETWEB_13: "You have no summary to submit GSTR1",
		RTN_07: "No Record found for the provided Inputs",
		RET_07_1_MSG: "No Record found for the provided Inputs",
		RTN_ITC: "Please submit ITC01  to proceed with filing",
		ITC01_FILE_HASH_ERROR: "No Hash found, Please submit before filing",
		ITC_NO_INVOICES: "No Invoices found for the provided Inputs",
		ITC_THRESHOLD_ERROR:
			"Invoices number is greater than threshold, please use the download feature to see the invoices",
		DUPLICATE_INV_MSG_PART_1: " Invoice number: ",
		DUPLICATE_INV_MSG_PART_2:
			"already exists. Please enter different Invoice/GSTIN number and try again",
		ITC01_GENERAL_EXCEPTION_MSG: " Something went wrong, Please try again",
		DUPLICATE_CHALLAN_MSG_PART_1: "Challan number:",
		DUPLICATE_CHALLAN_MSG_PART_2:
			"already exists in the current period. Please use the edit option to edit the existing challan",
		ITC04_DELETEFAILED_CODE:
			"Challan No has already been added in Table-5 as original challan. Please remove the same first from Table-5 to proceed with deletion",
		" ITC04_001":
			"Challan No has already been added in Table-5 as original challan. Please remove the same first from Table-5 to proceed with deletion",
		RTN2001_MSG: "Invalid Summary",
		"RT-3BAS1013":
			"Your Submit Request For Gstr3B is already being processed for Current Return Period. If error persists quote error number RT-3BAS1013 when you contact customer care for quick resolution",
		"RT-1WS1016": "No Invoices found",
		IMP_MESSAGE: "Important Message",
		LBL_INFO_3B: "Info",
		LBL_ERR_3B: "Error",
		DASHBOARD3B_503: "A.   Do you want to file Nil return?",
		DASHBOARD3B_506: "Yes",
		DASHBOARD3B_508: "No",
		DASHBOARD3B_603: "Close",
		DASHBOARD3B_569: "Next",
		DASHBOARD3B_624: "Reset Successful",
		DASHBOARD3B_630: "OK",
		GSTR4_NOTE: "Note:",
		GSTR4_YES: "Yes",
		GSTR4_NO: "No",
		GSTR4_NEXT: "Next",
		LBL_INWARD_OUTWARD_SUP:
			"4.Details of advances, inward and outward supplies made during the financial year on which tax is payable",
		LBL_GSTR9_UNREG: "(A) Supplies made to unregistered persons (B2C)",
		LBL_GSTR9_REG: "(B) Supplies made to registered person (B2B)",
		LBL_GSTR9_ZERORATED:
			"(C) Zero rated supply (Export) on payment of tax (Except supplies to SEZ)",
		LBL_GSTR9_SEZ: "(D) Supplies to SEZ on payment of tax",
		LBL_GSTR9_DMD_EXP: "(E) Deemed Exports",
		LBL_GSTR9_ADV_TAX:
			"(F) Advances on which tax has been paid but invoice has not been issued (not covered under (A) to (E) above)",
		LBL_GSTR9_INWARD_SUP:
			"(G) Inward supplies on which tax is to be paid on the reverse charge basis",
		LBL_GSTR9_TAB4_SUBTOTAL: "(H) Sub total (A to G above)",
		LBL_GSTR9_CRNOTES:
			"(I) Credit notes issued in respect of transactions specified in (B) to (E) above (-)",
		LBL_GSTR9_DBNOTES:
			"(J) Debit notes issued in respect of transactions specified in (B)  to (E) above (+)",
		LBL_GSTR9_SUP_TAX: "(K) Supplies/tax declared through Amendments",
		LBL_GSTR9_SUB_TOTAL: "(M) Sub total (I to L above)",
		LBL_GSTR9_PAID_SUP:
			"(N) Supplies and advances on which tax is to be paid (H + M) above",
		LBL_GSTR9_BACK: "BACK TO GSTR-9 DASHBOARD",
		LBL_R9A_SUMM_HEADS_1: "Outward Supplies (Net)",
		LBL_R9A_SUMM_HEADS_2: "Tax Amounts (Net)",
		LBL_R9A_SUMM_HEADS_3: "Inward Supplies (Net)",
		LBL_R9A_SUMM_HEADS_4: "Tax Amounts (Net)",
		LBL_R9A_SUMM_HEADS_5: "Refund Claimed",
		LBL_R9A_SUMM_HEADS_6: "Refund Sanctioned",
		LBL_R9A_SUMM_HEADS_7: "Refund Pending",
		LBL_R9A_SUMM_HEADS_8: "Demand of Taxes",
		LBL_R9A_SUMM_HEADS_9: "Taxes Paid",
		LBL_R9A_SUMM_HEADS_10: "Demands Pending",
		LBL_R9A_SUMM_HEADS_11: "Credit Reversed",
		LBL_R9A_SUMM_HEADS_12: "Credit Availed",
		LBL_POP_3B36: "Success",
		LBL_ANNUAL_DASH_HEAD_GSTR9: "File Annual Returns",
		LBL_PAID_ITC: "Paid through ITC(₹)",
		LBL_ITC03_MSG1: "Paid Through Cash(₹)",
		LBL_ITC03_MSG34: "Date of exemption",
		LBL_ITC03_MSG35: "Proceed to File Nil ITC-03",
		LBL_ITC03_MSG36: "Preview Draft ITC-03",
		LBL_ITC03_MSG37: "File Nil GST ITC-03",
		LBL_ITC03_MSG38: "Please Enter mandatory field values",
		LBL_ITC03_MSG39:
			"Something seems to have gone wrong. Please try again later",
		LBL_ITC03_MSG40:
			"You have saved details in Form ITC-03. Please use Close option to delete all saved records",
		LBL_ITC03_MSG41:
			"Nil filing ITC-03 option can not changed upon confirmation. Do you want to continue ?",
		LBL_ITC03_MSG42:
			"After filing of Form GST ITC-03, credit available in credit ledger shall be lapsed",
		LBL_ITC03_JS_8:
			"Invoice date cannot be after the supplier cancellation date.",
		LBL_ITC03_MSG11: "Download filed ITC-03",
		LBL_ITC03_MSG25: "Date of opt in",
		WAR_WAR: "Warning",
		LBL_GSTR9_ERR_MSG_7I:
			"Are you sure that reversal in Table 7 is more than ITC availed in Table 6",
		WAR_OK: "OK",
		WAR_CAN: "Cancel",
		LBL_PDF_R530: "Taxable Value",
		LBL_GSTR9_SUP_TAXK: "(K) Supplies/tax declared through Amendments",
		LBL_GSTR9_SUP_TAXL: "(L) Supplies/tax reduced through Amendments",
		LBL_GSTR9_ITC_itc_2a: "(A) ITC as per GSTR-2A (Table 3 & 5 thereof)",
		LBL_SAVE_ALERT:
			"Note: Kindly click on save button after any modification( add, edit, delete) to save the changes",
		LBL_ADD_EDIT_ALERT: "Added/Edited Invoices to be saved",
		LBL_ADD_EDIT_HSN_GSTR9: "Added/Edited HSN details to be saved",
		ADD_SUMM_R7_32: "CSGT and SGST amount should be equal",
		ERR_HSN_VAL_GSTR9:
			"Invalid HSN Code.It can be minimum of 2 digits and maximum of 8 digits.",
		MANDTE_CENTRAL: "Please enter Central Tax",
		MANDTE_STATE: "Please enter State/UT Tax",
		LBL_ROW_A: "A",
		LBL_ROW_B: "B",
		LBL_ROW_C: "C",
		LBL_ROW_D: "D",
		LBL_ROW_E: "E",
		LBL_ROW_F: "F",
		LBL_ROW_G: "G",
		LBL_ROW_H: "H",
		LBL_ROW_I: "I",
		LBL_ROW_J: "J",
		LBL_ROW_K: "K",
		LBL_ROW_L: "L",
		LBL_ROW_M: "M",
		LBL_ROW_N: "N",
		LBL_ROW_O: "O",
		LBL_GSTR9_UNREG_PDF: "Supplies made to un-registered persons (B2C)",
		LBL_GSTR9_REG_PDF: "Supplies made to registered persons (B2B)",
		LBL_GSTR9_ZERORATED_PDF:
			"Zero rated supply (Export) on payment of tax (Except supplies to SEZs)",
		LBL_GSTR9_SEZ_PDF: "Supplies to SEZs on payment of tax",
		LBL_GSTR9_DMD_EXP_PDF: "Deemed Exports",
		LBL_GSTR9_ADV_TAX_PDF:
			"Advances on which tax has been paid but invoice has not been issued (not covered under (A) to (E) above)",
		LBL_GSTR9_INWARD_SUP_PDF:
			"Inward supplies on which tax is to be paid on the reverse charge basis",
		LBL_GSTR9_TAB4_SUBTOTAL_PDF: "Sub-total (A to G above)",
		LBL_GSTR9_CRNOTES_PDF:
			"Credit notes issued in respect of transactions specified in (B) to (E) above (-)",
		LBL_GSTR9_DBNOTES_PDF:
			"Debit notes issued in respect of transactions specified in (B)  to (E) above (+)",
		LBL_GSTR9_SUP_TAX_PDF: "Supplies/tax declared through Amendments",
		LBL_GSTR9_SUP_TAXK_PDF:
			"Supplies / tax declared through Amendments (+)",
		LBL_GSTR9_SUP_TAXL_PDF: "Supplies / tax reduced through Amendments (-)",
		LBL_GSTR9_SUB_TOTAL_PDF: "Sub total (I to L above)",
		LBL_GSTR9_PAID_SUP_PDF:
			"Supplies and advances on which tax is to be paid (H + M) above",
		LBL_GSTR9_OUTWARD_SUPPLIES_PDF:
			"Details of Outward supplies made during the financial year on which tax is not payable",
		LBL_ZERO_RATEDEXP_PDF:
			"Zero rated supply (Export) without payment of tax",
		LBL_SEZ_PAYMENT_PDF: "Supply to SEZs without payment of tax",
		LBL_SUP_RECP_REV_PDF:
			"Supplies on which tax is to be paid by the recipient on reverse charge",
		LBL_EXMPTD_PDF: "Exempted",
		LBL_NIL_RATED_PDF: "Nil Rated",
		LBL_NON_GST_SUP_PDF: "Non-GST supply (includes ‘no supply’)",
		LBL_SUB_AFABV_PDF: "Sub total (A to F above)",
		LBL_CREDIT_NOTES_TRANS_PDF:
			"Credit Notes issued in respect of transactions specified in A to F above (-)",
		LBL_DEBIT_NOTES_TRANS_PDF:
			"Debit Notes issued in respect of transactions specified in A to F above (+)",
		LBL_SUP_AMENDMENTS_DEC_PDF: "Supplies declared through Amendments (+)",
		LBL_SUP_AMENDMENTS_REDUCED_PDF:
			"Supplies reduced through Amendments (-)",
		LBL_SUB_HTOK_PDF: "Sub-Total (H to K above)",
		LBL_TRNOVR_GLABV_PDF:
			"Turnover on which tax is not to be paid (G + L above)",
		LBL_GSTR9_TOTAL_TURNOVR_PDF:
			"Total Turnover (including advances) (4N + 5M - 4G above)",
		LBL_GSTR9_ITC_AVL6_PDF:
			"Details of ITC availed during the financial year",
		LBL_GSTR9_CREDIT_AVL6_PDF:
			"Total amount of input tax credit availed through FORM GSTR-3B (sum total of Table 4A of FORM GSTR-3B)",
		LBL_GSTR9_INWARD_SUP6_PDF:
			"Inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs)",
		LBL_GSTR9_INWARD_SUP_UNREG6_PDF:
			"Inward supplies received from unregistered persons liable to reverse charge (other than B above) on which tax is paid & ITC availed",
		LBL_GSTR9_INWARD_SUP_REG6_PDF:
			"Inward supplies received from registered persons liable to reverse charge (other than B above) on which tax is paid and ITC availed",
		LBL_GSTR9_IMP_GOODS6_PDF:
			"Import of goods (including supplies from SEZs)",
		LBL_GSTR9_IMP_SERV6_PDF:
			"Import of services (excluding inward supplies from SEZs)",
		LBL_GSTR9_INPTAX_ISD_PDF: "Input Tax credit received from ISD",
		LBL_GSTR9_ITC_RECLAIM6_PDF:
			"Amount of ITC reclaimed (other than B above) under the provisions of the Act",
		LBL_GSTR9_SUB_BHABV_PDF: "Sub-total (B to H above)",
		LBL_GSTR9_DIFF_IAABV_PDF: "Difference (I - A above)",
		LBL_GSTR9_TRANS1_CREDIT_PDF:
			"Transition Credit through TRAN-1 (including revisions if any)",
		LBL_GSTR9_TRANS2_CREDIT_PDF: "Transition Credit through TRAN-2",
		LBL_GSTR9_ITC_ABVM_PDF: "Any other ITC availed but not specified above",
		LBL_GSTR9_SUB_KMABV_PDF: "Sub-total (K to M  above)",
		LBL_GSTR9_TOTAL_ITC_INABV_PDF: "Total ITC availed (I + N above)",
		LBL_GSTR9_ITC_REVERSED_PDF:
			"Details of ITC Reversed and  Ineligible ITC for the financial year",
		LBL_GSTR9_RULE37_TAB7_PDF: "As per Rule 37",
		LBL_GSTR9_RULE39_TAB7_PDF: "As per Rule 39",
		LBL_GSTR9_RULE42_TAB7_PDF: "As per Rule 42",
		LBL_GSTR9_RULE43_TAB7_PDF: "As per Rule 43",
		LBL_GSTR9_SECTION17_TAB7_PDF: "As per section 17(5)",
		LBL_GSTR9_REV_TRANS1_CRDT_PDF: "Reversal of TRAN-1 credit",
		LBL_GSTR9_REV_TRANS2_CRDT_PDF: "Reversal of TRAN-2 credit",
		LBL_GSTR9_ITC_REV_TAB7I_PDF: "Total ITC Reversed (Sum of A to H above)",
		LBL_GSTR9_ITC_UTIL_TAB7J_PDF:
			"Net ITC Available for Utilization (6O - 7I)",
		LBL_GSTR9_OTHER_REV_TAB7_PDF: "Other reversals (pl. specify)",
		LBL_GSTR9_ITC_INFO_PDF: "Other ITC related information",
		LBL_GSTR9_ITC_PERGSTR2A_PDF: "ITC as per GSTR-2A (Table 3 & 5 thereof)",
		LBL_GSTR9_ITC_6BABV_PDF: "ITC as per sum total of 6(B) and 6(H) above",
		LBL_GSTR9_ITC_INSUP_PDF:
			"ITC on inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs) received during the financial year but availed in the next financial year upto specified period",
		LBL_GSTR9_DIFF8D_PDF: "Difference [A-(B+C)]",
		LBL_GSTR9_ITC_NTAVL_PDF: "ITC available but not availed",
		LBL_GSTR9_ITC_INEGBL_PDF: "ITC available but ineligible",
		LBL_GSTR9_IGST_IMPGDS_PDF:
			"IGST paid on import of goods (including supplies from SEZ)",
		LBL_GSTR9_IGST_CRDTGDS_PDF:
			"IGST credit availed on import of goods (as per 6(E) above)",
		LBL_GSTR9_DIFF8I_PDF: "Difference (G-H)",
		LBL_GSTR9_ITC_IMGDSJ_PDF:
			"ITC available but not availed on import of goods (Equal to I)",
		LBL_GSTR9_ITCK_TOTAL_PDF:
			"Total ITC to be lapsed in current financial year (E + F + J)",
		LBL_GSTR9_TAB10_AMNDPOS_PDF:
			"Supplies / tax declared through Amendments (+) (net of debit notes)",
		LBL_GSTR9_TAB10_AMNDNEG_PDF:
			"Supplies / tax reduced through Amendments (-) (net of credit notes)",
		LBL_GSTR9_TAB10_REVITC_PDF:
			"Reversal of ITC availed during previous financial year",
		LBL_GSTR9_TAB10_AVLDITC_PDF:
			"ITC availed for the previous financial year",
		LBL_GSTR9_TAB10_TRNOVR_PDF: "Total turnover(5N + 10 - 11)",
		LBL_GSTR9_TAB15A_PDF: "Total Refund claimed",
		LBL_GSTR9_TAB15B_PDF: "Total Refund sanctioned",
		LBL_GSTR9_TAB15C_PDF: "Total Refund Rejected",
		LBL_GSTR9_TAB15D_PDF: "Total Refund Pending",
		LBL_GSTR9_TAB15E_PDF: "Total demand of taxes",
		LBL_GSTR9_TAB15F_PDF: "Total taxes paid in respect of E above",
		LBL_GSTR9_TAB15G_PDF: "Total demands pending out of E above",
		LBL_GSTR9_SUP_COMPTXP_PDF:
			"Supplies received from Composition taxpayers",
		LBL_GSTR9_DEEMED_SUPB_PDF: "Deemed supply under section 143",
		LBL_GSTR9_GOODSAPRVL_SUPC_PDF:
			"Goods sent on approval basis but not returned",
		LBL_NO_RECORDS: "No Records found for the provided inputs.",
		TITLE_DOWNLOAD_GSTR9:
			"Click here to download the system computed GSTR-9 summary in PDF format.",
		TITLE_DOWNLOAD_GSTR3B:
			"Click here to download GSTR-3B summary for all tax periods in PDF format.",
		TITLE_PREVIEW_DRAFT_GSTR9:
			"Click here to download the summary of details added, in PDF format. Please ensure correctness of the same before filing return.",
		TITLE_PREVIEW_EXCEL_GSTR9:
			"Click here to download the details added/auto filled, in XL sheet for correctness of the same.",
		TITLE_COMPUTE_GSTR9: "Click here to compute Late fee, if any.",
		TITLE_PROCEED_FILING_GSTR9:
			"Click here to file your return after computation of liabilities.",
		HELP_TEXT_4A: "4A. Supplies made to unregistered persons (B2C)-",
		HELP_TEXT_4B: "4B. Supplies made to registered persons (B2B)-",
		HELP_TEXT_4C:
			"4C. Zero rated supply (Export) on payment of tax (except supplies made to SEZs)-",
		HELP_TEXT_4D: "4D. Supply made to SEZs on payment of tax-",
		HELP_TEXT_4E: "4E. Deemed Exports-",
		HELP_TEXT_4F:
			"4F. Advances on which tax has been paid but invoice has not been issued (not covered under (A) to (E) above)-",
		HELP_TEXT_4G:
			"4G. Inward supplies on which tax is to be paid on reverse charge basis-",
		HELP_TEXT_4I:
			"4I. Credit Notes issued in respect of transactions specified in (B) to (E) above (-) –",
		HELP_TEXT_4J:
			"4J. Debit Notes issued in respect of transactions specified in (B) to (E) above (+): -",
		HELP_TEXT_4K:
			"4K & 4L. Supplies / tax declared through Amendments (Upward or Downward): -",
		HELP_TEXT_4A_1:
			"Aggregate value of supplies made to consumers and unregistered persons (B2C supplies) on which tax has been paid shall be declared here. These will include details of supplies made to unregistered persons/consumers through E-Commerce operators, if any.",
		HELP_TEXT_4A_2:
			"Details are to be declared as net of credit notes or debit notes issued during the Financial Year.",
		HELP_TEXT_4A_3:
			"Table 5, Table 7 along with respective amendments in Table 9 and Table 10 of FORM GSTR-1 may be used for filling up these details. This table shall be auto filled based on the outward supplies reported in GSTR-1.",
		HELP_TEXT_4B_1:
			"Aggregate value of supplies made to registered persons  on which tax has been paid shall be declared.",
		HELP_TEXT_4B_2:
			"These will include supplies made through E-Commerce operators but shall not include supplies on which tax is to be paid by the recipient on reverse charge basis. ",
		HELP_TEXT_4B_3:
			"Details of debit and credit notes are to be mentioned separately. Table 4A of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_4C_1:
			"Aggregate value of exports (except supplies to SEZs) on which tax has been paid shall be declared here. Table 6A of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_4D_1:
			"Aggregate value of supplies to SEZs on which tax has been paid shall be declared here. Table 6B of GSTR-1 may be used for filling up these details.",
		HELP_TEXT_4E_1:
			"Aggregate value of supplies which are in the nature of deemed exports on which tax has been paid shall be declared here. Table 6C of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_4F_1:
			"Details of all unadjusted advances i.e. advance has been received and tax has been paid but invoice has not been issued in the current year shall be declared here. Table 11A of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_4G_1:
			"Aggregate value of all inward supplies (including advances and net of credit and debit notes) on which tax is to be paid by the recipient (i.e.by the person filing the annual return) on reverse charge basis.",
		HELP_TEXT_4G_2:
			"This shall include supplies received from registered persons and unregistered persons on which tax is levied on reverse charge basis. This shall also include aggregate value of all import of services. Table 3.1(d) of FORM GSTR-3B may be used for filling up these details. ",
		HELP_TEXT_4I_1:
			"Aggregate value of credit notes issued in respect of B to B supplies (4B), exports (4C), supplies to SEZs (4D) and deemed exports (4E) shall be declared here. Table 9B of FORM GSTR-1 may be used for filling up these details. Taxpayer can report the values in table 4B to 4E as net of credit notes in case of any difficulty in reporting the same separately.",
		HELP_TEXT_4J_1:
			"Aggregate value of debit notes issued in respect of B to B supplies (4B), exports (4C), supplies to SEZs (4D) and deemed exports (4E) shall be declared here. Table 9B of FORM GSTR-1 may be used for filling up these details. Taxpayer can report the values in table 4B to 4E as net of debit notes in case of any difficulty in reporting the same separately.",
		HELP_TEXT_4K_1:
			"Details of amendments made to B to B supplies (4B), exports (4C), supplies to SEZs (4D) and deemed exports (4E), credit notes (4I), debit notes (4J) and refund vouchers shall be declared here. Table 9A and Table 9C of FORM GSTR-1 may be used for filling up these details. Taxpayer can report the values in table 4B to 4E as net of amendments in case of any difficulty in reporting the same separately.",
		HELP_TEXT_END_TAB4:
			"Table no. 4(A) to 4(G) and Table no. 4(I) to 4(L) of GSTR 9 shall be auto filled based on the supplies reported during the relevant financial year in GSTR-1. However, the auto filled details can be edited. If you have Edited/modified any auto filled value, then that value shall be considered as final.",
		LBL_HLP_TXT_R9_ONLY_1: " GSTR-9 RETURN can be filed, if you have ",
		LBL_HLP_TXT_R9_ONLY_2:
			"2.Neither amendment nor revision of GSTR-9 can be made after filing.",
		LBL_HLP_TXT_R9_ONLY_3:
			"2.GSTR-9 can be filed online. It can also be prepared on Offline Tool and then uploaded on the Portal and filed.",
		LBL_HLP_TXT_R9_ONLY_4:
			"3.Annual return in form GSTR-9 is required to be filed by every taxpayer registered as normal taxpayer during the relevant financial year. ",
		LBL_HLP_TXT_R9_ONLY_5:
			"4.All applicable statements in Forms GSTR-1 and returns in Form GSTR 3B of the financial year shall have been filed before filing GSTR-9.",
		LBL_HLP_TXT_R9_ONLY_1_SUB1:
			"Not made any outward supply (commonly known as sale);  AND",
		LBL_HLP_TXT_R9_ONLY_1_SUB2:
			"Not received any inward supplies (commonly known as purchase) of goods/services; AND",
		LBL_HLP_TXT_R9_ONLY_1_SUB3: "No liability of any kind; AND",
		LBL_HLP_TXT_R9_ONLY_1_SUB4:
			"Not claimed any Credit during the Financial Year; AND",
		LBL_HLP_TXT_R9_ONLY_1_SUB5:
			"Not received any  order creating demand; AND",
		LBL_HLP_TXT_R9_ONLY_1_SUB6: "Not claimed any refund.",
		LBL_GSTR9_DASHBOARD_Q1:
			"Download the draft system computed GSTR-9, summary of Form GSTR-1 and GSTR-3B for the financial year by clicking on relevant buttons. This is only for reference for filling the return, and will facilitate in providing details in actual tables. ",
		LBL_GSTR9_DASHBOARD_Q2:
			"Click on tables (Box) selected and fill in the required details;",
		LBL_GSTR9_DASHBOARD_Q3:
			"Summary of added details would be available on the relevant box;",
		LBL_GSTR9_DASHBOARD_Q4:
			" button to view summary in PDF or Excel format; and",
		LBL_GSTR9_DASHBOARD_Q5:
			"After adding and confirming the details, follow filing process as indicated at the bottom of this page.",
		LBL_GSTR9_STEPS_FILE: "Steps to file your GSTR-9 return ",
		LBL_GSTR9_DASHBOARD_F1:
			"Click on 'Compute Liabilities'; for computation of Late fee, if any; ",
		LBL_GSTR9_DASHBOARD_F2:
			"'Proceed to File' button would be enabled once late fee is calculated by system; ",
		LBL_GSTR9_DASHBOARD_F3:
			"Click on “Proceed to File” to pay liabilities and file the return ;",
		LBL_GSTR9_DASHBOARD_F4:
			"Additional details can be added even after clicking on ‘Compute Liabilities’ or ‘Proceed to file’ button. However, in that case, you would be required to follow steps 1 to 3 again to file the return ;",
		LBL_GSTR9_DASHBOARD_F5:
			"button to view summary of filed details in PDF format; and ",
		LBL_GSTR9_DASHBOARD_F6:
			"You can also download all filed details as an excel file by clicking on ",
		TITLE_GSTR9_TILE4:
			"Click here to enter/view summary of outward/inward taxable supplies made during the financial year.",
		TITLE_GSTR9_TILE5:
			"Click here to enter/view summary of Non-taxable outward supplies made during the financial year.",
		TITLE_GSTR9_TILE6:
			"Click here to enter/view summary of ITC availed during the financial year.",
		TITLE_GSTR9_TILE7:
			"Click here to enter/view summary of ITC reversed or ineligible ITC for the financial year.",
		TITLE_GSTR9_TILE8:
			"Click here to enter/view reconcile the ITC availed for the financial year.",
		TITLE_GSTR9_TILE9:
			"Click here to enter/view the tax (including Interest, late fee, Penalty & others) paid during the financial year.",
		TITLE_GSTR9_TILE10:
			"Click here to enter/view the summary of transactions reported in next financial year.",
		TITLE_GSTR9_TILE14:
			"Click here to enter/view the total tax paid on transactions reported in next financial year.",
		TITLE_GSTR9_TILE15:
			"Click here to enter/view particulars of Demands and Refunds during the financial year.",
		TITLE_GSTR9_TILE16:
			"Click here to enter/view summary of supplies received from Composition taxpayers, Deemed supply and Goods and sent on approval.",
		TITLE_GSTR9_TILE17:
			"Click here to enter/view HSN wise summary of outward supplies made during the financial year.",
		TITLE_GSTR9_TILE18:
			"Click here to enter/view HSN wise summary of supplies received during the financial year.",
		TITLE_GSTR9_TILE19: "Click here to view Late fee charged, if any.",
		LBL_GSTR9_PREVIEW_DRAFT: "Preview Draft GSTR-9(PDF)",
		LBL_GSTR9_PREVIEW_FINAL: "Download GSTR-9 details (PDF)",
		LBL_GSTR1_PREVIEW_DRAFT: "Preview Draft GSTR1(PDF)",
		LBL_GSTR1_PREVIEW_FINAL: "Preview Final GSTR1(PDF)",
		LBL_GSTR3B_PREVIEW_DRAFT: "Preview Draft GSTR3B(PDF)",
		LBL_GSTR3B_PREVIEW_FINAL: "Preview Final GSTR3B(PDF)",
		LBL_GSTR1_PDF_SYSTEM: "System generated summary (For reference)",
		LBL_GSTR9_PREVIEW_DRAFT_COMPUTED:
			"Download GSTR-9 System computed summary (PDF)",
		LBL_GSTR9_PTF_CHECK_MSG:
			"Compute Liabilities is In-Progress. Please check after sometime.",
		LBL_GSTR9_ITC_INSUP1:
			"For FY 2018-19, ITC on inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs) received during 2018-19 but availed during April, 2019 to September, 2019.",
		LBL_GSTR9_PTF_RECEIVED:
			"Compute liabilities request has been received, please check the status in sometime",
		LBL_GSTR9_PTF_DATE_MISMATCH:
			"Click on Compute Liabilities to re-compute your liabilities as current date has changed from last Compute Liabilities",
		LBL_GSTR9_REFUND: "Refund claimed",
		LBL_GSTR9_REF_SANC: "Refund sectioned",
		LBL_GSTR9_REF_PEN: "Refund pending",
		LBL_GSTR9_DEMAND: "Demand of taxes",
		LBL_GSTR9_TX_PAID: "Taxes paid",
		LBL_GSTR9_DEMAND_PEN: "Demands pending",
		HELP_TEXT_TAB5_START:
			"5. Details of Outward supplies made during the financial year on which tax is not payable.",
		HELP_TEXT_TAB5A_TITLE:
			"5A. Zero rated supply (Export) without payment of tax:-",
		HELP_TEXT_TAB5A_TITLE1_1:
			"Aggregate value of exports (except supplies to SEZs) on which tax has not been paid shall be declared here.",
		HELP_TEXT_TAB5A_TITLE1_2:
			"Table 6A of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_TAB5B_TITLE: "5B. Supply to SEZs without payment of tax:-",
		HELP_TEXT_TAB5B_TITLE1_1:
			"Aggregate value of supplies to SEZs on which tax has not been paid shall be declared here. ",
		HELP_TEXT_TAB5B_TITLE1_2:
			"Table 6B of GSTR-1 may be used for filling up these details.",
		HELP_TEXT_TAB5C_TITLE:
			"5C. Supplies on which tax is to be paid by recipient on reverse charge:-",
		HELP_TEXT_TAB5C_TITLE1_1:
			"Aggregate value of supplies made to registered persons on which tax is payable by the recipient on reverse charge basis. Details of debit and credit notes are to be mentioned separately.",
		HELP_TEXT_TAB5C_TITLE1_2:
			"Table 4B of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_TAB5D_TITLE:
			"5D, 5E & 5F. Exempted, Nil Rated and Non -GST Supplies (includes ‘no-supply’):-",
		HELP_TEXT_TAB5D_TITLE1_1:
			"Aggregate value of Exempted, Nil Rated and Non-GST supplies shall be declared here.",
		HELP_TEXT_TAB5D_TITLE1_2:
			"Table 8 of FORM GSTR-1 may be used for filling up these details. The value of “no supply” shall also be declared here.",
		HELP_TEXT_TAB5H_TITLE:
			"5H. Credit Notes issued in respect of transactions reported in table 5A to 5F (-):-",
		HELP_TEXT_TAB5H_TITLE1_1:
			"Aggregate value of credit notes issued in respect of supplies declared in 5A, 5B, 5C, 5D, 5E and 5F shall be declared here.",
		HELP_TEXT_TAB5H_TITLE1_2:
			"Table 9B of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_TAB5H_TITLE1_3:
			"Taxpayer can report the values in table 5A to 5F as net of credit notes in case of any difficulty in reporting the same separately.",
		HELP_TEXT_TAB5I_TITLE:
			"5I. Debit Notes issued in respect of transactions specified in 5A to 5F above (+):-",
		HELP_TEXT_TAB5I_TITLE1_1:
			"Aggregate value of debit notes issued in respect of supplies declared in 5A, 5B, 5C, 5D, 5E and 5F shall be declared here.",
		HELP_TEXT_TAB5I_TITLE1_2:
			"Table 9B of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_TAB5I_TITLE1_3:
			"Taxpayer can report the values in table 5A to 5F as net of debit notes in case of any difficulty in reporting the same separately.",
		HELP_TEXT_TAB5JK_TITLE:
			"5J & 5K. Supplies declared through amendments (Upward or Downward):-",
		HELP_TEXT_TAB5JK_TITLE1_1:
			"Details of amendments made to exports (except supplies to SEZs) and supplies to SEZs on which tax has not been paid shall be declared here. Table 9A and Table 9C of FORM GSTR-1 may be used for filling up these details.",
		HELP_TEXT_TAB5JK_TITLE1_2:
			"Taxpayer can report the values in table 5A to 5F as net of amendments in case of any difficulty in reporting the same separately.",
		HELP_TEXT_TAB5_END:
			"Above details shall be auto filled based on the supplies reported GSTR-1s of relevant financial year. However, you may edit the auto filled details. If you have edited/modified any auto filled value, then that value shall be considered as final.",
		HELP_TEXT_TAB6_START:
			"6. Details of ITC availed during the financial year.",
		HELP_TEXT_TAB6A_TITLE:
			"6A. Total amount of input tax credit availed through FORM GSTR-3B (sum total of Table 4A of FORM GSTR-  3B):-",
		HELP_TEXT_TAB6A_TITLE1_1:
			"Total input tax credit availed in Table 4A of FORM GSTR-3B by the taxpayer would be auto-populated here. This field is Non-editable.",
		HELP_TEXT_TAB6B_TITLE:
			"6B. Inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs):-",
		HELP_TEXT_TAB6B_TITLE1_1:
			"Aggregate value of ITC availed on all inward supplies except those on which tax is payable on reverse charge basis but includes supply of services received from SEZs shall be declared here. It may be noted that the total ITC availed may be classified as ITC on inputs, capital goods and input services. ",
		HELP_TEXT_TAB6B_TITLE1_2:
			"Table 4(A)(5) of FORM GSTR-3B may be used for filling up these details. This shall not include ITC which was availed, reversed and then reclaimed in the ITC ledger. This is to be declared separately under 6(H).",
		HELP_TEXT_TAB6C_TITLE:
			"6C. Inward supplies received from unregistered persons liable to reverse charge (other than 6B above) on which tax is paid & ITC availed: -",
		HELP_TEXT_TAB6C_TITLE1_1:
			"Aggregate value of input tax credit availed on all inward supplies received from unregistered persons (other than import of services) on which tax is payable on reverse charge basis shall be declared here. It may be noted that the total ITC availed may be classified as ITC on inputs, capital goods and input services. ",
		HELP_TEXT_TAB6C_TITLE1_2:
			"Table 4(A)(3) of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB6D_TITLE:
			"6D. Inward supplies received from registered persons liable to reverse charge (other than 6B above) on which tax is paid and ITC availed: -",
		HELP_TEXT_TAB6D_TITLE1_1:
			"Aggregate value of input tax credit availed on all inward supplies received from registered persons on which tax is payable on reverse charge basis shall be declared here. It may be noted that the total ITC availed may be classified as ITC on inputs, capital goods and input services. ",
		HELP_TEXT_TAB6D_TITLE1_2:
			"Table 4(A)(3) of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB6E_TITLE:
			"6E. Import of goods (including supplies from SEZ): -",
		HELP_TEXT_TAB6E_TITLE1_1:
			"Details of input tax credit availed on import of goods including supply of goods received from SEZs shall be declared here. It may be noted that the total ITC availed may be classified as ITC on inputs and capital goods.",
		HELP_TEXT_TAB6E_TITLE1_2:
			"Table 4(A)(1) of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB6F_TITLE:
			"6F. Import of services (excluding inward supplies from SEZ): -",
		HELP_TEXT_TAB6F_TITLE1_1:
			"Details of input tax credit availed on import of services (excluding inward supplies from SEZs) shall be declared here.",
		HELP_TEXT_TAB6F_TITLE1_2:
			"Table 4(A)(2) of FORM GSTR3B may be used for filling up these details.",
		HELP_TEXT_TAB6G_TITLE: "6G. Input Tax credit received from ISD: -",
		HELP_TEXT_TAB6G_TITLE1_1:
			"Aggregate value of input tax credit received from input service distributor shall be declared here. ",
		HELP_TEXT_TAB6G_TITLE1_2:
			"Table 4(A)(4) of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB6H_TITLE:
			"6H. Amount of ITC reclaimed (other than 6B above) under the provisions of the Act: -",
		HELP_TEXT_TAB6H_TITLE1_1:
			"Aggregate value of input tax credit availed, reversed and reclaimed under the provisions of the Act shall be declared here.",
		HELP_TEXT_TAB6J_TITLE: "6J. Difference (I - A above): -",
		HELP_TEXT_TAB6J_TITLE1_1:
			"The difference between the total amount of input tax credit availed through FORM GSTR-3B and input tax credit declared in row 6B to 6H shall be declared here. ",
		HELP_TEXT_TAB6K_TITLE:
			"6K. Transition Credit through TRAN-1 (including revisions if any): -",
		HELP_TEXT_TAB6K_TITLE1_1:
			"Details of transition credit received in the electronic credit ledger on filing of FORM GST TRAN-I including revision of thereof (whether upwards or downwards), if any shall be declared here. This field shall be auto filled based on the credit availed through TRAN-1. However, this field is allowed for edit.",
		HELP_TEXT_TAB6L_TITLE: "6L. Transition Credit through TRAN-2: -",
		HELP_TEXT_TAB6L_TITLE1_1:
			"Details of transition credit received in the electronic credit ledger after filing of FORM GST TRAN-2 shall be declared here. This field shall be auto filled based on the credit availed through TRAN-2. However, this field is allowed for edit.",
		HELP_TEXT_TAB6M_TITLE:
			"6M. Any other ITC availed but not specified above: -",
		HELP_TEXT_TAB6M_TITLE1_1:
			"Details of ITC availed but not covered in any of heads specified under 6B to 6L above shall be declared here. Details of ITC availed through FORM ITC-01 and FORM ITC-02 in the financial year shall be declared here.",
		HELP_TEXT_TAB7_START:
			"7. Details of ITC Reversed and  Ineligible ITC for the financial year.",
		HELP_TEXT_TAB7_TITLE1:
			"Details of input tax credit reversed due to ineligibility or reversals required under rule 37, 39, 42 and 43 of the CGST/SGST Rules, 2017 shall be declared here. ",
		HELP_TEXT_TAB7_TITLE2:
			"This column should also contain details of any input tax credit reversed under section 17(5) of the CGST/SGST Act, 2017 and details of ineligible transition credit claimed through FORM GST TRAN-1 or FORM GST TRAN-2 and then subsequently reversed. ",
		HELP_TEXT_TAB7_TITLE3:
			"Table 4(B) of FORM GSTR-3B may be used for filling up these details. Any ITC reversed through FORM GST ITC -03 shall be declared in 7H.",
		HELP_TEXT_TAB8_START: "8. Other ITC related information.",
		HELP_TEXT_TAB8A_TITLE:
			"8A. ITC as per GSTR-2A (Table no. 3 & 5 thereof): -",
		HELP_TEXT_TAB8A_TITLE1_1:
			"The total credit available for inwards supplies (other than imports and inwards supplies liable to reverse charge but includes services received from SEZs) received during the relevant Financial Year and reflected in FORM GSTR-2A (table 3 & 5 only) shall be auto-populated in this table. ",
		HELP_TEXT_TAB8A_TITLE1_2:
			"This would be the aggregate of all the input tax credit that has been declared by the corresponding suppliers in their FORM GSTR-1.",
		HELP_TEXT_TAB8A_TITLE1_3:
			"This field shall be auto-filled based on your GSTR-2A and the same is not allowed for Edit. ",
		HELP_TEXT_TAB8B_TITLE:
			"8B. ITC as per sum total of 6(B) and 6(H) above",
		HELP_TEXT_TAB8B_TITLE1_1:
			"The input tax credit as declared in Table 6B and 6H shall be auto-populated here and the same shall not be allowed to be edited. If you want to make any changes then you need to do it in table no. 6B and 6H.",
		HELP_TEXT_TAB8C_TITLE:
			"8C. ITC on inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs) received during the financial year but availed in the next financial year up to specified period",
		HELP_TEXT_TAB8C_TITLE1:
			"For FY 2018-19, ITC on inward supplies (other than imports and inward supplies liable to reverse charge but includes services received from SEZs) received during 2018-19 but availed during April, 2019 to September, 2019.",
		HELP_TEXT_TAB8C_TITLE1_1:
			"Aggregate value of input tax credit availed on all inward supplies (except those on which tax is payable on reverse charge basis but includes supply of services received from SEZs) received during the relevant financial year but credit on which was availed in the next financial year up to specified period shall be declared here.",
		HELP_TEXT_TAB8C_TITLE1_2:
			"Table 4(A)(5) of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB8EF_TITLE:
			"8E & 8F. ITC available but not availed & ITC available but ineligible : -",
		HELP_TEXT_TAB8EF_TITLE1_1:
			"The credit which was available and not availed in FORM GSTR-3B and the credit was not availed in FORM GSTR-3B as the same was ineligible, shall be declared here. Ideally, if 8D is positive, the sum of 8E and 8F shall be equal to 8D.",
		HELP_TEXT_TAB8G_TITLE:
			"8G. IGST paid on import of goods (including supplies from SEZ): -",
		HELP_TEXT_TAB8G_TITLE1_1:
			"Aggregate value of IGST paid at the time of imports (including imports from SEZs) during the financial year shall be declared here.",
		HELP_TEXT_TAB8H_TITLE:
			"8H. IGST credit availed on import of goods (as per 6(E) above): -",
		HELP_TEXT_TAB8H_TITLE1_1:
			"The input tax credit as declared in Table 6E shall be auto-populated here and the same is not allowed for edit.",
		HELP_TEXT_TAB8K_TITLE:
			"8K. Total ITC to be lapsed in current financial year (E + F + J): -",
		HELP_TEXT_TAB8K_TITLE1_1:
			"The total input tax credit which shall lapse for the current financial year shall be computed (auto filled) in this row.",
		HELP_TEXT_TAB9_START:
			"9. Details of tax paid as declared in returns filed during the financial year.",
		HELP_TEXT_TAB9A_TITLE_1:
			"Actual tax (including Interest, Late fee, Penalty, Others) paid through cash or ITC during the financial year shall be declared year.",
		HELP_TEXT_TAB9A_TITLE1_2:
			"Payment of tax under Table 6.1 of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB10_START:
			"10,11,12 & 13. Particulars of the transactions for the financial year declared in returns of the next financial year till the specified period.",
		HELP_TEXT_TAB10_START1:
			"10,11,12 & 13. Particulars of the transactions for the FY 2018-19 declared in returns between April, 2019 till September, 2019.",
		HELP_TEXT_TAB10A_TITLE:
			"Part V consists of particulars of transactions for the financial year but declared in the FORM GSTR-3B of next financial year till the specified period.",
		HELP_TEXT_TAB10A_TITLE1:
			"10 & 11. Supplies / tax declared through Amendments (+) (net of debit notes) & Supplies / tax reduced through Amendments (-) (net of credit notes): -",
		HELP_TEXT_TAB10A_TITLE1_1:
			"Details of additions or amendments to any of the supplies already declared in the returns of the financial year but such amendments were furnished in Table 9A, Table 9B and Table 9C of FORM GSTR-1 of next financial year till the specified period shall be declared here.",
		HELP_TEXT_TAB10B_TITLE:
			"12. Reversal of ITC availed during previous financial year: -",
		HELP_TEXT_TAB10B_TITLE1_1:
			"Aggregate value of reversal of ITC which was availed in the financial year but reversed in returns filed for the next financial year till the specified period shall be declared here.",
		HELP_TEXT_TAB10B_TITLE1_2:
			"Table 4(B) of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB10C_TITLE: "13. ITC availed for the financial year: -",
		HELP_TEXT_TAB10C_TITLE1_1:
			"Details of ITC for goods or services received in the financial year but ITC for the same was availed in returns filed for the next financial year till the specified period shall be declared here.",
		HELP_TEXT_TAB10C_TITLE1_2:
			"Table 4(A) of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB14_START:
			"14. Particulars for the FY transactions declared in returns of next FY till the specified period.",
		HELP_TEXT_TAB14A_TITLE:
			"Differential tax (including Interest) paid on account of transactions related to the financial year but declared in the returns of next financial year till the specified period, shall be reported in this table.",
		LBL_DECLARATION_GSTR9:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed there from and in case of any reduction in output tax liability the benefit thereof has been/will be passed on to the recipient of supply.",
		HELP_TEXT_TAB15_START: "15. Particulars of Demands and Refunds: -",
		HELP_TEXT_TAB15A_TITLE:
			"15A to 15D. Total Refund Claimed, Sanctioned, Rejected and Pending.",
		HELP_TEXT_TAB15A_TITLE1_1:
			"Aggregate value of refunds claimed, sanctioned, rejected and pending for processing shall be declared here.",
		HELP_TEXT_TAB15A_TITLE1_2:
			"Refund claimed will be the aggregate value of all the refund claims filed in the financial year and will include refunds which have been sanctioned, rejected or are pending for processing",
		HELP_TEXT_TAB15A_TITLE1_3:
			"Refund sanctioned means the aggregate value of all refund sanction orders. ",
		HELP_TEXT_TAB15A_TITLE1_4:
			"Refund pending will be the aggregate amount in all refund application for which acknowledgement has been received and will exclude provisional refunds received. These will not include details of non-GST refund claims.",
		HELP_TEXT_TAB15A_TITLE1_5: "The table is optional.",
		HELP_TEXT_TAB15E_TITLE: "15E. Total demand of taxes.",
		HELP_TEXT_TAB15F_TITLE: "15F. Total taxes paid in respect of E above.",
		HELP_TEXT_TAB15G_TITLE:
			"15G. Total demands pending in respect of E above.",
		HELP_TEXT_TAB15G_TITLE1_1:
			"Aggregate value of demands of taxes for which an order has been issued by the adjudicating authority shall be declared here. ",
		HELP_TEXT_TAB15G_TITLE1_2:
			"Aggregate value of taxes paid out of the total value of demand as declared in 15E above shall be declared here.",
		HELP_TEXT_TAB15G_TITLE1_3:
			"Aggregate value of demands pending recovery out of 15E above shall be declared here.",
		HELP_TEXT_TAB15G_TITLE1_4: "The table is optional.",
		HELP_TEXT_TAB16_START:
			"16. Information on supplies received from composition taxpayers, deemed supply under section 143 and goods sent on approval basis.",
		HELP_TEXT_TAB16A_TITLE:
			"16A. Supplies received from Composition taxpayers: -",
		HELP_TEXT_TAB16A_TITLE1_1:
			"Aggregate value of supplies received from composition taxpayers shall be declared here.  ",
		HELP_TEXT_TAB16A_TITLE1_2:
			"Table 5 of FORM GSTR-3B may be used for filling up these details.",
		HELP_TEXT_TAB16B_TITLE: "16B. Deemed supply under Section 143: - ",
		HELP_TEXT_TAB16B_TITLE1_1:
			"Aggregate value of all deemed supplies from the principal to the job-worker in terms of sub-section (3) and sub-section (4) of Section 143 of the CGST Act shall be declared here.",
		HELP_TEXT_TAB16C_TITLE:
			"16C. Goods sent on approval basis but not returned: -",
		HELP_TEXT_TAB16C_TITLE1_1:
			"Aggregate value of all deemed supplies for goods which were sent on approval basis but were not returned to the principal supplier within one hundred eighty days of such supply shall be declared here.",
		HELP_TEXT_TAB17_START: "17. HSN Wise Summary of outward supplies: -",
		HELP_TEXT_TAB17A_TITLE:
			"Summary of outward supplies made against a particular HSN code to be reported in this table. ",
		HELP_TEXT_TAB17B_TITLE:
			"Table 12 of FORM GSTR-1 may be used for filling up details in Table 17.",
		HELP_TEXT_TAB17C_TITLE: "The table is optional.",
		HELP_TEXT_TAB18_START: "18. HSN Wise Summary of inward supplies: -",
		HELP_TEXT_TAB18A_TITLE:
			"Summary of supplies received against a particular HSN code to be reported only in this table. ",
		HELP_TEXT_TAB18B_TITLE: "The table is optional.",
		HELP_TEXT_TAB19_START: "19. Late fee payable and paid",
		HELP_TEXT_TAB19A_TITLE:
			"Cash Balance available in cash ledger will be shown.",
		HELP_TEXT_TAB19B_TITLE: "Late fee, if any can be paid in cash only.",
		HELP_TEXT_TAB19C_TITLE:
			"‘Create challan’ button will be enabled only if sufficient cash is not available in Cash Ledger.",
		HELP_TEXT_TAB19D_TITLE:
			"System will auto fill the deficient amounts in challan form created and after deposit of the amount, the system will navigate back to this page.",
		HELP_TEXT_TAB19E_TITLE:
			"Declaration and Authorized signatory fields will be enabled only if sufficient cash balance is available to offset the liabilities.",
		HELP_TEXT_TAB19F_TITLE:
			"Check the Declaration box and select the Authorized signatory to file the return with EVC/DSC.",
		LBL_OTHER: "Other",
		LBL_GSTR9_COMPUTE_SEE_ERROR:
			"Click here to see the errors in Compute Liabilities",
		LBL_PDF_R101: "Form GSTR-1",
		LBL_PDF_R9_R1_IFF_PDF: "Form GSTR-1/IFF",
		LBL_PDF_R102: "[See rule (59(1)]",
		LBL_FORM_GSTR6_PDF3: "Year",
		LBL_PDF_R103: "Details of outward supplies of goods or services",
		LBL_FORM_GSTR6_PDF5: "1. GSTIN",
		LBL_FORM_GSTR6_PDF6_NEW: "2(a) Legal name of the registered person",
		LBL_FORM_GSTR6_PDF7_NEW: "2(b) Trade name, if any",
		LBL_FORM_GSTR6_PDF6: "2(a). Legal name of the registered person",
		LBL_PDF_R106_NEW: "2(c) ARN",
		LBL_PDF_R107_NEW: "2(d) ARN date",
		LBL_PDF_R110_NEW: "Total Note Value",
		LBL_FORM_GSTR6_PDF7: "2(b). Trade name, if any",
		LBL_PDF_R108: "4A, 4B, 4C, 6B, 6C - B2B Invoices",
		NO_OF_DOCS: "No. of documents",
		HEAD_TOT_TAXAMT: "Total tax amount (₹)",
		HEAD_TAXVAL: "Taxable value(₹)",
		B2BASUMR6_108: "Total taxable value (₹)",
		B2BASUMR6_109: "Integrated tax (₹)",
		B2BASUMR6_110: "Central tax (₹)",
		B2BASUMR6_111: "State/UT tax (₹)",
		B2BASUMR6_112: "Cess (₹)",
		LBL_PDF_R109: "No. of Records",
		LBL_PDF_R110: "Total Invoice Value",
		LBL_R11_PDF12: "Total Taxable Value",
		AMAB2bINVR6_93: "Status of Invoice",
		AMAB2bINVR6_94: "Action Taken",
		AMAB2bINVR6_96: "Edit",
		AMAB2bINVR6_97: "Delete",
		ISDAMDADDINVPG2R6_318: "As Integrated Tax out of",
		ISDAMDADDINVPG2R6_319: "As Central  Tax out of",
		ISDAMDADDINVPG2R6_320: "As State/UT Tax out of",
		ISDAMDADDINVPG2R6_331: "Total",
		ISDAMDADDINVPG2R6_339: "CESS",
		ISDAMDADDINVPG2R6_446: "Details",
		ISDAMDADDINVPG2R6_454: " Sr. No.",
		ISDAMDADDINVPG2R6_455: "ISD Credit Distribution",
		LBL_FORM_GSTR6_PDF12: "Total Central Tax",
		ISDA_ADD_INV_PGR6_144: "As Central  Tax",
		ISDA_ADD_INV_PGR6_145: "As State/UT Tax",
		ISDAMDADDINVPG2R6_311: "Sr. No.",
		ITC_DETR6_68: "a. Total ITC available for distribution",
		ITC_DETR6_76: "b. Amount of eligible ITC",
		ITC_DETR6_84: "c. Amount of ineligible ITC",
		ITC_DETR6_101: "CALCULATE ITC",
		AMDB2BINVR6_67: "Enter GSTIN",
		LBL_FORM_GSTR6_PDF13: "Total State/UT  Tax",
		SUP_GSTIN_R6: "Supplier GSTIN",
		LBL_PDF_R104: "2(a). Legal name of the registered person",
		LBL_PDF_R105: "2(b). Trade name, if any",
		LBL_PDF_R106:
			"3(a). Aggregate Turnover in the preceding Financial Year",
		LBL_PDF_R107: "3(b). Aggregate Turnover - April to June, 2017 ",
		LBL_PDF_R111: "Total Cess",
		LBL_PDF_R112: "Total Central Tax",
		LBL_PDF_R113: "Total State/UT  Tax",
		LBL_PDF_R114: "Documents Issued",
		LBL_PDF_R115: "Documents Cancelled",
		LBL_PDF_R116: "Net Issued Documents",
		LBL_PDF_R117: "5A, 5B - B2C (Large) Invoices",
		LBL_PDF_R118: "9B - Credit / Debit Notes (Registered)",
		LBL_PDF_R119: "9B - Credit / Debit Notes (Unregistered)",
		LBL_PDF_R120: "6A - Exports Invoices",
		LBL_PDF_R121: "7 - B2C (Others)",
		LBL_PDF_R122: "8 - Nil rated, exempted and non GST outward supplies",
		LBL_PDF_R123: "Total Nil amount",
		LBL_PDF_R124: "Total Exempted amount",
		LBL_PDF_R125: "Total Non-GST Amount",
		LBL_PDF_R126: "11A(1), 11A(2) - Tax Liability (Advances Received)",
		LBL_PDF_R127: "11B(1), 11B(2) - Adjustment of Advances",
		LBL_PDF_R128: "12 - HSN-wise summary of outward supplies",
		LBL_PDF_R129: "13 - Documents Issued",
		LBL_PDF_R130: "9A - Amended B2B Invoices",
		LBL_PDF_R131: "9A - Amended B2C (Large) Invoices",
		LBL_PDF_R132: "9C - Amended Credit/Debit Notes (Registered)",
		LBL_PDF_R133: "9C - Amended Credit/Debit Notes (Unregistered)",
		LBL_PDF_R134: "9A - Amended Exports Invoices",
		LBL_PDF_R135: "10 - Amended B2C(Others)",
		LBL_PDF_R136: "11A - Amended Tax Liability (Advance Received)",
		LBL_PDF_R137: "11B -Amendment of Adjustment of Advances",
		LB_GEN_FIL_EXCEL_GSTR9A: "DOWNLOAD GSTR9A DETAILS (EXCEL)",
		LBL_QUES_CONF_GSTR9A:
			"You do not have any late fee liability to be paid. Please update turnover details in Sl. No. 5, if required and proceed for filing with DSC/EVC. In case, you have some sales or purchases, you may go back to previous screen by clicking on Back button.",
		LBL_PDF_R56: "Total Note Value",
		LBL_POPR8_4: "Do you want to continue?",
		WAR_PROC: "Proceed",
		WAR_DAN: "danger",
		WAR_SUC: "success",
		FILING3B_40: "Cancel",
		POP_MSG_2:
			" Proceed to file request has been received, please check the status in sometime",
		ISD_EDITAMDPG02R6_177: "Total (₹)",
		LBL_DASH_R7_48: "Ready to File reversed due to counter party action.",
		LBL_POPR8_12:
			"You are about to agree to offset your tax, interest and late fee, as indicated. Relevant amounts will be deducted from Electronic Cash ledger and accordingly liability will be reduced. Once these entries are made, these can NOT be reversed. Are you sure you want to continue?",
		LBL_DASH_R7_53: "Ready  to file as on ",
		RET00009:
			"Return already under process. If error persists quote error number RET00009 when you contact customer care for quick resolution",
		LBL_DASH_TXT_26: "Click on 'Prepare Online';",
		LBL_HLP_TXT_R9A_4_NEW:
			"You may download the draft system generated GSTR-9, summary of GSTR-1 and summary of GSTR-3B from GSTR-9 dashboard for your reference;",
		LBL_HLP_TXT_R9A_4_ADD:
			"You may download the draft system generated GSTR-9A,  summary of GSTR-4 from GSTR-9A dashboard for your reference;",
		LBL_HLP_TXT_R9A_5_NEW:
			"If number of records/lines are less than or equal to 500 records per table (Table 17 and Table 18), then you may use this facility;",
		LBL_HLP_TXT_R9A_6_NEW:
			"Fill in the details in different tables and click on ‘Compute Liabilities’; and",
		LBL_HLP_TXT_R9A_6_ADD:
			"Facility to preview draft (PDF or Excel) can be used to check the details filled up in the tables.",
		LBL_HLP_TXT_R9A_7_ADD:
			"Click on ‘Proceed to file’ and ‘File GSTR-9 or File GSTR-9A’ with DSC/EVC;",
		LBL_DASH_TXT_30: "Prepare Offline:-",
		LBL_HLP_TXT_R9A_8_ADD:
			"If number of records/lines are more than 500 records per table in either Table 17 or Table 18,  then you can prepare your return by using the offline utility and subsequently upload on GST Common Portal and then file.",
		LBL_HLP_TXT_R9A_9_ADD:
			"You can download the GSTR-9 or GSTR-9A offline tool from the ‘Downloads’ section in the pre-login page on the Portal and installed it on your computer.",
		LBL_HLP_TXT_R9A_PREPARE_OFFLINE: "Click on ‘Prepare Offline’;",
		LBL_HLP_TXT_R9A_11_ADD:
			"Click on ‘Download’ to download auto-drafted GSTR-9 or GSTR-9A details, if any;",
		LBL_HLP_TXT_R9A_12_ADD:
			"Follow instructions in ‘GSTR-9 offline tool’ or ‘GSTR-9A offline tool’ to add details and generate JSON file for upload; and",
		LBL_HLP_TXT_R9A_13_ADD:
			"Click on ‘Upload’ to upload JSON file and file the return with the help of instructions available on GSTR-9 or GSTR-9A dashboard.",
		LBL_HLP_TXT_R9_DSC:
			"Click on ‘Proceed to file’ and ‘File GSTR-9’ with DSC/EVC.",
		LBL_HLP_TXT_R9A_5_NEW_BOTH:
			"If number of records/lines either in Table-17 or Table-18 are more than 500 records per table, then you can prepare your return by using the offline utility only and the same can be subsequently uploaded on Common Portal. ",
		LBL_HLP_TXT_R9A_OFFLINE:
			"You can download the GSTR-9 offline tool from the ‘Downloads’ section in the pre-login page on the portal and installed it on your computer.",
		LBL_HLP_TXT_R9A_DOWNLOAD:
			"Click on ‘Download’ to download auto-drafted GSTR-9 details, if any;",
		LBL_HLP_TXT_R9A_FOLLOW:
			"Follow instructions in ‘GSTR-9 offline tool’ to add details and generate JSON file for upload; and",
		LBL_HLP_TXT_R9A_UPLOAD:
			"Click on ‘Upload’ to upload JSON file and file the return with help of instruction available on GSTR-9 dashboard.",
		LBL_DECLARATION_GSTR9A:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has concealed there from and in case of any reduction in output tax liability the benefit thereof has been/will be passed on to the recipient of supply. ",
		LBL_HLP_TXT_R9A_1_NEW_1:
			"You may download the draft of system computed GSTR-9A and summary of GSTR-4 for your reference;",
		LBL_HLP_TXT_R9A_2_NEW_2:
			"Based on the information available in the System, details have been filled up  in different tables. The same can be edited if you intend to change the values.;",
		LBL_HLP_TXT_R9A_3_NEW_3: "Click on Compute Liability; and",
		LBL_HLP_TXT_R9A_4_NEW_4:
			"Click on ‘Proceed to file’ and ‘File GSTR-9A’ with DSC/EVC.",
		LBL_HLP_TXT_R9A_5_NEW_5:
			"Follow instructions in ‘GSTR-9A offline tool’ to add details and generate JSON file for upload;",
		LBL_HLP_TXT_R9A_6_NEW_6:
			"Click on ‘Prepare Offline’ and then click on ‘Download’ tab to download JSON file to import into the offline tool to auto-populate the system computed details of GSTR-9A.",
		LBL_HLP_TXT_R9A_7_NEW_7:
			"Click on ‘Prepare Offline’ and select ‘Upload’ to upload JSON file and file the return with the help of instructions available on GSTR-9A dashboard;",
		LBL_HLP_TXT_R9A_8_NEW_8:
			"The uploaded file can be downloaded again by clicking on ‘Prepare Offline’ and then click on ‘Download’ tab to download JSON file with the details as updated by you.",
		LBL_HLP_TXT_R9A_9_NEW_9:
			"Download the GSTR-9A offline tool from the ‘Downloads’ section in the pre-login page on the portal.",
		GSTR4_MSG_3: "Ready to file as on",
		LBL_R9_ERR_QUES:
			"You are not eligible to file ‘Nil’  GSTR-9 return since you have filed returns other than Nil for the relevant financial year.",
		LBL_R9A_ERR_QUES:
			"You are not eligible to file ‘Nil’  GSTR-9A return since you have filed returns other than Nil for the relevant financial year.",
		PRNCT_NOTE:
			"The fields, where the system computed values would be modified by more/less than 20%, shall be highlighted in ‘Red’ for reference and attention.",
		LBL_POP_LIMIT_R9A:
			"You have field(s), highlighted in red, where the value entered is more/less than 20% of the system computed value. Are you sure you want to proceed? ",
		LBL_GSTR9_CONF_MSG_TILE17:
			"You have unsaved HSN details. Please click on ‘Back’ and then click on ‘Save’ button to save the details else click on ‘Proceed’ button to ignore the added HSN details",
		"RT-9AS1001":
			"Annual Summary calculation is in progress, please check after sometime",
		"RT-9AS1002":
			"Atleast one return period of Form GSTR1/GSTR3B/GSTR4 for the given financial year is not filed for this user",
		RET90016:
			"User is not eligible for filing GSTR9 form for the given period",
		RET90017: "GSTR9 is not filed for previous financial year",
		"RT-9AS-1006":
			"User is not eligible for filing GSTR9 form for the given period",
		LBL_HLP_TXT_R9_R9A_1:
			"1.If you have remained under composition for part of the year and normal for remaining part of the year, then both GSTR-9 and GSTR-9A are required to be filed",
		LBL_HLP_TXT_R9_R9A_2:
			"2.Neither amendment nor revision of GSTR 9/GSTR 9A is allowed. ",
		LBL_HLP_TXT_R9_R9A_3:
			"2.GSTR 9/GSTR 9A can be prepared online and filed online. It can also be prepared on Offline Tool and then uploaded on the Portal and filed.",
		LBL_HLP_TXT_R9_R9A_4:
			"3.Annual return in form GSTR-9 is required to be filed by every taxpayer registered as normal taxpayer at any time during the relevant financial year.",
		LBL_HLP_TXT_R9_R9A_5:
			"4.Annual return in form GSTR-9A is required to be filed by every taxpayer if opted composition scheme for any period  during the relevant financial year.",
		LBL_HLP_TXT_R9_R9A_6:
			"5.All applicable statements in Forms GSTR-1 and returns in Form GSTR 3B of the financial year shall have been filed before filing GSTR-9.",
		LBL_HLP_TXT_R9_R9A_7:
			"6.All applicable returns in Form GSTR-4 shall have been filed for the relevant financial year before filing  Annual Return in Form GSTR-9A.",
		LBL_GSTR9_DURING_FIN_YEAR: "during the Financial Year",
		LBL_S_NO_1: "1.",
		LBL_NIL: "“NIL”",
		LBL_CLICK_ON: "Click on ",
		LBL_PREVIEW_QUOTES: "‘Preview’",
		LBL_DOWNLOAD_FILED_GSTR9_PDF: "‘Download Filed GSTR-9 (pdf)’ ",
		LBL_DOWNLOAD_EXCEL_GSTR9_PDF: "‘Download GSTR-9 details (Excel)’.",
		"RT-9AS-9018":
			"Something seems to have gone wrong while processing your request. Please try again. If error persists quote error number RT-9AS-9018 when you contact customer care for quick resolution.",
		LBL_SPACE: "space",
		LBL_POP_LIMIT_R9A_TAB9:
			"Tax payable amount in column 2 of Table 9 is negative, which may be due to excess adjustment out of advance tax paid  or amendment of reverse charge liabilities. Please enter the actual tax payable.",
		WAR_INF: "Information",
		MSG_PREV_FIL_R9:
			"To file your annual return, filing of all GSTR-1 and GSTR-3B returns are mandatory. File your pending GSTR-1/3B return(s) and try again",
		MSG_PREV_FIL_R9A:
			"To file your annual return, filing of all GSTR-4 returns are mandatory. File your pending GSTR-4 return(s) and try again",
		MSG_PREV_FIL_BOTH:
			"To file your annual return, filing of all applicable returns/statements (GSTR-1, GSTR-3B and GSTR-4) are mandatory. Please file your applicable return(s)/statement(s) and try again.",
		MSG_PREV_FIL_GSTR1_3B:
			"To file your annual return, filing of all applicable returns/statements (GSTR-1, GSTR-3B) are mandatory. Please file your applicable return(s)/statement(s) and try again.",
		MSG_SUM_PROG_R9_R9A:
			"System computed summary is in progress. Please check after some time.",
		LBL_DASHBRDR8_350: "Click here to download Excel - File ",
		GSTR9A_LBL_SUB_ERR: "Compute Liablities - Error Report",
		LBL_GSTR1:
			"Currently EWB data for B2B, B2CL and HSN will be available to import and download",
		"RT-9WS-9001":
			"Something seems to have gone wrong while processing your request. Please try again.If error persists quote error number RT-9WS-9001 when you contact customer care for quick resolution.",
		LBL_PLACE: "Place",
		LBL_UPLD_DOCS: "Upload Relevant Documents",
		LBL_RCN_STMT: "Reconciliation Statement",
		LBL_GSTR9C: "GSTR 9C",
		LBL_TAX_LIABILITY_GSTR1_GSTR3B:
			"Tax liability as per GSTR-1 and as per GSTR-3B ",
		LBL_DWNLD_TABLES_FROM_GSTR9:
			"DOWNLOAD GSTR-9C TABLES DERIVED FROM GSTR-9(PDF)",
		LBL_VERIFICATION: "Verification",
		LBL_AFFIRM:
			"I hereby solemnly affirm and declare that I am uploading the reconciliation statement in Form GSTR-9C prepared and duly signed by the Auditor and the nothing has been tampered or altered by me in the statement.I am also uploading other statements, as applicable, including financial statement, profit and loss account and balance sheet etc",
		BTN_PREVIEW_DRAFT_9C: "PREVIEW DRAFT GSTR-9C (PDF)",
		LBL_GSTR1_R: "As per GSTR-1 (₹)",
		LBL_GSTR3B_R: "As per GSTR-3B (₹)",
		LBL_ITC_GSTR3B_R: "ITC Claimed in GSTR-3B (₹)",
		LBL_ITC_GSTR2A_R: "ITC as per GSTR-2A (₹)",
		LBL_LAST_UPDATED: "Report last updated on - ",
		LBL_LIABILITY_EXPORT_OTHER:
			"Liability other than Export/Reverse charge",
		LBL_LIABILITY_GSTR3B_B:
			"Liability declared in GSTR-3B during the month [as per table 3.1(b)]",
		LBL_LIABILITY_GSTR3B_D:
			"Liability declared in GSTR-3B during the month [as per table 3.1(d)]",
		LBL_LIABILITY_GSTR3B_A:
			"Liability declared in GSTR-3B during the month[as per table 3.1(a)]",
		LBL_ITC_CLAIMED_3B:
			"ITC claimed in GSTR-3B during the month [as per table 4A(3)+4A(4)+4A(5)+4D(1)+4D(2)-4B(1)-4B(2)]",
		LBL_ITC_CL3B_ACC2A: "ITC claimed in GSTR-3B and accrued as per GSTR-2A",
		LBL_CREDIT_LIABILITY_STMT: "Credit and Liability Statement",
		LBL_ITC_GSTR2A:
			"ITC auto-populated in GSTR-2A during the month [as per Part-A, PART-B]",
		LBL_AMT_GSTR2A: "Amount auto-populated in GSTR-2A[as per Part-A]",
		LBL_LIABILITY_GSTR1_IFF:
			"Liability declared in GSTR-1/IFF (Zero rated supplies) [as per table 6A, 6B, 9A, 9B, 9C]",
		LBL_LIABILITY_GSTR1:
			"Liability declared in GSTR-1 (Zero rated supplies) [as per table 6A, 6B, 9A, 9B, 9C]",
		LBL_LIABILITY_GSTR1_OTHER_IFF:
			"Liability declared in GSTR-1/IFF (other than reverse charge supply) during the month(as per table 4A, 5, 6C, 7, 9A, 9B, 9C, 10, 11)",
		LBL_LIABILITY_GSTR1_OTHER:
			"Liability declared in GSTR-1 (other than reverse charge supply) during the month(as per table 4A, 5, 6C, 7, 9A, 9B, 9C, 10, 11)",
		LBL_LIABILITY_REVERSE_CHARGE: "Liability due to Reverse charge",
		LBL_LIABILITY_EXPORT_SEZ: "Liability due to Export and SEZ Supplies",
		LBL_SHORTFALL_EXCESS_3BVS1_IFF:
			"Shortfall (-)/ Excess (+) in liability (GSTR3B – GSTR1/IFF)",
		LBL_SHORTFALL_EXCESS_3BVS1:
			"Shortfall (-)/ Excess (+) in liability (GSTR3B – GSTR1)",
		LBL_CUMULATIVE_SHORTFALL_3BVS1_IFF:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR3B – GSTR1/IFF)",
		LBL_CUMULATIVE_SHORTFALL_3BVS1:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR3B – GSTR1)",
		LBL_SHORTFALL_EXCESS_3BVS2A:
			"Shortfall (-)/ Excess (+) in liability (GSTR3B - GSTR2A)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2A:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR3B - GSTR2A)",
		LBL_ITC_CREDIT_CLAIM: "ITC credit claimed and due",
		LBL_LIABILITY_REVERSE_CHARGE_REC:
			"Liability due to receipt of reverse charge supplies",
		LBL_LIABILITY_OTHER:
			"Liability (other than zero rated (Exports and SEZ Supplies) and reverse charge supply)",
		BTN_FILE: "FILE",
		LB_GEN_FIL_EXCEL_GSTR9: "DOWNLOAD GSTR-9 DETAILS (EXCEL)",
		HELP_TEXT_TAB9A_TITLE1_3:
			"Paid through Cash and Paid through ITC columns shall be auto filled based on table no 6.1 of GSTR -3B and the same is non-editable.",
		LBL_HLP_TXT_R9A_6_NEW_R9:
			"Fill in the details in different tables and click on ‘Compute Liabilities’;",
		LBL_R9R9A_HLP_53:
			"Additional liability, if any declared in this return can be paid through Form GST DRC-03 by selecting ‘Annual Return’ from the dropdown in the said form. Such liability can be paid through cash only.",
		LBL_R9R9A_HLP_53_NEW:
			"Additional liability, if any declared in this return can be paid through Form GST DRC-03 by selecting ‘Annual Return’ from the dropdown in the said form. Such liability can be paid only through cash.",
		LBL_R9A_LBL_1: "A. Taxable",
		LBL_R9A_LBL_2: "B. Exempted, Nil-rated",
		LBL_R9A_LBL_3: "C. Total",
		LBL_R9A_LBL_4:
			"A. Inward supplies liable to reverse charge received from registered persons",
		LBL_R9A_LBL_5:
			"B. Inward supplies liable to reverse charge received from unregistered persons",
		LBL_R9A_LBL_6: "C. Import of services",
		LBL_R9A_LBL_7: "D. Net tax payable on (A), (B) and (C) above",
		LBL_R9A_LBL_8:
			"A. Inward supplies from registered persons (other than 7A)",
		LBL_R9A_LBL_9: "B. Import of goods",
		LBL_R9A_LBL_10: "Total Tax Payable (₹)",
		LBL_R9A_LBL_11: "A. Total Refund Claimed",
		LBL_R9A_LBL_12: "B. Total Refund Sanctioned",
		LBL_R9A_LBL_13: "C. Total Refund Rejected",
		LBL_R9A_LBL_14: "D. Total Refund Pending",
		LBL_R9A_LBL_15: "E. Total demand of taxes",
		LBL_R9A_LBL_16: "F. Total taxes paid in respect of E above",
		LBL_R9A_LBL_17: "G. Total demands pending out of E above",
		LBL_R9A_LBL_18:
			"10. Supplies /  tax (outward) declared through Amendments (+) (net of debit notes)",
		LBL_R9A_LBL_19:
			"11. Inward supplies liable to reverse charge declared through Amendments (+) (net of debit notes)",
		LBL_R9A_LBL_20:
			"12. Supplies /  tax (outward) reduced through Amendments (-) (net of credit notes)",
		LBL_R9A_LBL_21:
			"13. Inward supplies liable to reverse charge reduced through Amendments (-) (net of credit notes)",
		LBL_R9A_LBL_22: "Total turnover (6C+10-12)",
		LBL_R9A_LBL_23: "Table no 15E should be greater than or equal to 15F",
		LBL_R9A_LBL_24:
			"A. Credit reversed on opting in the composition scheme (-)",
		LBL_R9A_LBL_25:
			"B. Credit availed on opting out of the composition scheme (+)",
		LBL_R9A_LBL_26: "FILE GSTR-9A",
		LBL_R9A_LBL_27:
			"Click on Compute Liabilities to re-compute your liabilities as current date has changed from last Compute Liabilities",
		LBL_R9A_LBL_28: "Aggregate Turnover save is Progress",
		LBL_R9A_LBL_29:
			"Aggregate Turnover save had some error. Please save Turnover again",
		LBL_R9A_LBL_30: "Aggregate turnover was last updated on ",
		LBL_R9A_LBL_31: "From : : To",
		LBL_HLP_TXT_R9A_DASH_1:
			"Annual return in Form GSTR-9A once filed cannot be revised.",
		LBL_HLP_TXT_R9A_DASH_2:
			"Computation of ITC based on GSTR-2A was auto-populated by the System based on GSTR-1 filed by your corresponding suppliers upto ",
		LBL_HLP_TXT_R9A_DASH_3:
			" Next update of ITC based on GSTR-2A will happen soon. If you have some missing credits in GSTR-2A, you may like to wait till next update. ",
		LBL_HLP_TXT_R9A_DASH_5:
			" If you have some missing credits in GSTR-2A, you may like to wait till next updation.",
		LBL_HLP_TXT_R9A_DASH_4:
			"Annual return in Form GSTR-9 once filed cannot be revised.",
		LBL_R2X_HLP_1:
			"1. You can’t file nil return if there are no auto populated TDS/TCS details from GSTR 7/8 (Filing of nil return is not required).",
		LBL_R2X_HLP_2:
			"2. You can file the “TDS and TCS Credit received’ form for ‘M’ period without filing ‘M-1’ period TDS and TCS credit received i.e You can file ‘M-1’ period return after filing of ‘M’ period return.",
		LBL_R2X_HLP_3:
			"3. There is no due date for filing of this form and hence late fee and interest is not applicable.",
		LBL_R2X_HLP_4:
			"Auto populated details are less than or equal to 500 records per table may make use of this facility.",
		LBL_R2X_HLP_5: "Step to be taken",
		LBL_R2X_HLP_6:
			"Take the action on auto populated details from GSTR 7 and GSTR 8; and",
		LBL_R2X_HLP_7:
			"Click on ‘Proceed to File’ and File ‘TDS and TCS Credit received form’.",
		LBL_R2X_HLP_8:
			"If Auto populated details are more than 500 records per table (TDS credit received, Amendments to TDS Credit received, TCS Credit received, Amendments to TCS credit received) can prepare their return by using the offline utility and subsequently upload on GST Common Portal.",
		LBL_R2X_HLP_9:
			"You can download the ‘TDS and TCS Credit received’ offline tool from the ‘Downloads’ section in the pre-login page on the portal. You should have downloaded the Offline Tool and installed it on your computer.",
		LBL_R2X_HLP_10:
			"Click on ‘Download’ to download auto-drafted details from GSTR 7 and GSTR 8 details, if any;",
		LBL_R2X_HLP_11:
			"Take action (Accept/Reject) on auto populated details in Action field and generate JSON file for upload; and",
		LBL_R2X_HLP_12:
			"Click on ‘Upload’ to upload JSON file and file the return with help of instruction available on TDS and TCS credit received dashboard.",
		LBL_R2X_HLP_13:
			"Offline utility can also be used for filing TDS and TCS Credit received form if number of records are up to 500.",
		LBL_R2X_HLP_14:
			"Steps to prepare your TDS and TCS credit received form online ",
		LBL_R2X_HLP_15:
			"Click on ‘TDS Credit received’ or ‘Amendments to TDS credit received or ‘TCS credit received’ or ‘Amendments to TCS credit received’ box whichever is applicable and take action (Accept/Reject);",
		LBL_R2X_HLP_16:
			"Accepted TDS amount will be added to Cash ledger and rejected entries will be auto populated to counter party’s return after successful filing of return.",
		LBL_R2X_HLP_17:
			"Click on <b>‘Preview Draft TDS and TCS credit received’</b> button to view summary of auto drafted details in PDF format; ",
		LBL_R2X_HLP_18:
			"You can also download all auto drafted details as an excel file by clicking on <b>‘Download TDS and TCS Credit received details (Excel)’</b>; and",
		LBL_R2X_HLP_19:
			"After taking action on all auto populated details, follow filing process as indicated at the bottom of this page.",
		LBL_R2X_HLP_20: "Steps to file your TDS and TCS Credit received form",
		LBL_R2X_HLP_21:
			"Click on “Proceed to file”; for checking of errors, if any; ",
		LBL_R2X_HLP_22:
			"“File TDS/ TCS credit received” button would be enabled once Proceed to file is successful and enabled the declaration check box;  ",
		LBL_R2X_HLP_23:
			"Click on <b>‘Download Filed TDS and TCS Credit received (pdf)’</b> button to view summary of filed details in PDF format; and ",
		LBL_R2X_HLP_24:
			"You can also download all filed details as an excel file by clicking on <b>‘Download TDS and TCS Credit received details (Excel)’</b>",
		LBL_R2X_HLP_25:
			"Summary of total accepted and rejected details would be available on the relevant box;",
		LBL_R2X_HLP_26:
			"Click here to view/take action on auto populated details from GSTR 7",
		LBL_R2X_HLP_27:
			"Click here to view/take action on auto populated details from GSTR 8",
		LBL_R2X_HLP_28: "Click here to check the errors if any",
		LBL_R2X_HLP_29: "Click here to file your return",
		LBL_R2X_HLP_30:
			"Take action on all auto populated details from GSTR 7.",
		LBL_R2X_HLP_31:
			"You can take action on all records by clicking on check box below the ‘Select’ option",
		LBL_R2X_HLP_32:
			"You can revise the action till the filing of this form.",
		LBL_R2X_HLP_33:
			"It’s mandatory to take action on all auto populated details before clicking on ‘Proceed to file’.",
		LBL_R2X_HLP_34:
			"Take action on all auto populated details from GSTR 7.",
		LBL_R2X_HLP_35:
			"You can take on all records by clicking on check box below the ‘Select’ option.",
		LBL_R2X_HLP_36:
			"You can revise the action till the filing of this form.",
		LBL_R2X_HLP_37:
			"It’s mandatory to take action on all auto populated details before clicking on ‘Proceed to file’.",
		LBL_R2X_HLP_38:
			"Take action on all auto populated details from GSTR 8.",
		LBL_R2X_HLP_39:
			"You can take action on all records by clicking on check box below the ‘Select’ option.",
		LBL_R2X_HLP_40:
			"You can revise the action till the filing of this form.",
		LBL_R2X_HLP_41:
			"It’s mandatory to take action on all auto populated details before clicking on ‘Proceed to file’.",
		LBL_R2X_HLP_42:
			"Take action on all auto populated details from GSTR 8.",
		LBL_R2X_HLP_43:
			"You can take action on all records by clicking on check box below the ‘Select’ option.",
		LBL_R2X_HLP_44:
			"You can revise the action till the filing of this form.",
		LBL_R2X_HLP_45:
			"It’s mandatory to take action on all auto populated details before clicking on ‘Proceed to file’.",
		LBL_R2X_HLP_46: "Click on ‘Choose file” to upload the json file.",
		LBL_R2X_HLP_47:
			"Upon successful upload of json file, status will be displayed as ‘Processed’.  If upload is not successful for some records, then error report will be generated.",
		LBL_R2X_HLP_48:
			"Download error json file by clicking on hyper link ‘Download error report’.",
		LBL_R2X_HLP_49:
			"Import the error json file into offline tool to make the required changes.",
		LBL_R2X_HLP_50:
			"Click on ‘Generate Json file’ button to download the json file.",
		LBL_R2X_HLP_51:
			"Downloaded json file shall contain the list of TDS/TCS details uploaded by counter party.",
		LBL_R2X_HLP_52:
			"Import the downloaded json file into offline tool to view/prepare your return",
		LBL_R2X_HLP_53:
			"You may act upon the auto-populated TDS/TCS details, if any, in ‘Form TDS and TCS Credit received’ so that the amount of such TDS/TCS is credited to your cash ledger. To act on auto populated TDS/TCS details. Go to Services -> Returns -> TDS and TCS Credit received. TDS and TCS claim is independent of GSTR-4",
		LBL_R2X_HLP_54:
			"If the deductor / ecommerce operator has amended any record before taking action by you, the same will be disabled for taking any action. Please take action on latest amended record auto-populated in the subsequent tax period.",
		BTN_FILE_9C: "FILE GSTR-9C",
		LBL_POP_3B1: "Summary of GSTR-3B(before submission)",
		LBL_POP_3B2: "GSTIN : ",
		LBL_POP_3B3: "Integrated Tax (₹)",
		LBL_POP_3B4: "Central Tax (₹)",
		LBL_POP_3B5: "State/UT Tax (₹)",
		LBL_POP_3B6: "CESS (₹)",
		LBL_TUR_RUP: "Turnover (₹)",
		LBL_CTX: "Central Tax(₹)",
		HEAD_COMP_TDS: "TDS and TCS credit received",
		LBL_R2X_JS_1: "No records found for provided inputs",
		LBL_R2X_JS_2: "Record Rejected Successfully",
		LBL_R2X_JS_3: "Record Accepted Successfully",
		LBL_R2X_JS_4: "Record could not be saved. Please try after sometime",
		LBL_R2X_JS_5: "Error Occured. Please try again after sometime.",
		LBL_R2X_JS_6:
			"You are about to file. Are you sure you want to continue?",
		LBL_R2X_JS_6_DUP:
			"You are about to file. There are no auto-populated TDS/TCS records from GSTR 7/8, hence you may skip to file NIL TDS/TCS credit table. Are you sure you want to continue?",
		LBL_MARQ_1:
			" To view the filed GST ITC-01/02A/03 forms; please click on 'Search' post selection of 'Financial Year' and 'Return Type'. Please do not select any value in 'Return Filing Period'.",
		LBL_R2X_MSG1: "Action not taken",
		LBL_R2X_MSG2: "GSTIN of Deductor/Collector",
		LBL_R2X_MSG3: "AUTO DRAFTED TDS/TCS DETAILS",
		LBL_R2X_MSG4:
			"Proceed to File is  In-Progress. Please check after sometime.",
		LBL_R2X_MSG5: "Ready to File reversed due to counter party action.",
		LBL_R2X_MSG6: "Ready  to file as on ",
		LBL_R2X_MSG7_CONTD:
			"There are some auto-populated TDS/TCS entries GSTR 7/8 in ",
		LBL_R2X_MSG7: "Click here to see the errors in Proceed to File",
		LBL_R2X_MSG8: "Total Accepted Count",
		LBL_R2X_MSG9: "Total Accepted Taxable Value",
		LBL_R2X_MSG10: "Total Accepted Tax Amount",
		LBL_R2X_MSG11: "Total Rejected Count",
		LBL_R2X_MSG12: "Total Rejected Taxable Value",
		LBL_R2X_MSG13: "Total Rejected Tax Amount",
		LBL_R2X_MSG14: "Number of Records : ",
		LBL_R2X_MSG15: "Amendments to TDS Credit Received",
		LBL_R2X_MSG16: "Amendments to TCS credit received",
		LBL_R2X_MSG17: "FILE TDS TCS CREDIT RECEIVED",
		LBL_R2X_MSG18:
			"Click here to download the summary of details auto populated, in PDF format. Please ensure correctness of the same before filing the form",
		LBL_R2X_MSG19: "Preview Draft TDS and TCS credit received (PDF)",
		LBL_R2X_MSG20: "Download Filed TDS and TCS credit received (PDF)",
		LBL_R2X_MSG21: "BACK",
		LBL_R2X_MSG22: "TCS Credit Received - Summary",
		LBL_R2X_MSG23: "Uploaded by Collector",
		LBL_R2X_MSG24: "GSTIN of Collector",
		LBL_R2X_MSG25: "Tax Period of GSTR-8",
		LBL_R2X_MSG26: "Supplies returned (₹)",
		LBL_R2X_MSG27: "Net Value (₹)",
		LBL_R2X_MSG28: "Amount of tax collected by e-commerce operators",
		LBL_R2X_MSG29: "TCSA Credit Received - Summary",
		LBL_R2X_MSG30: "Tax period of  original GSTR-8",
		LBL_R2X_MSG31: "Tax period of amended GSTR-8",
		LBL_R2X_MSG32: "Revised Amounts",
		LBL_R2X_MSG33: "TDS Credit Received - Summary",
		LBL_R2X_MSG34: "TDSA Credit Received - Summary",
		LBL_R2X_MSG35: "Uploaded by Deductor",
		LBL_R2X_MSG36: "Tax Period of GSTR7",
		LBL_R2X_MSG37: "Tax period of original GSTR-7 ",
		LBL_R2X_MSG38: "Tax period of amended GSTR-7 ",
		LBL_R2X_MSG39: "Amount of tax deducted by deductors",
		LBL_R2X_MSG40: "Revised Taxable value (₹)",
		LBL_R2X_MSG41: "Revised Amount of tax deducted at source",
		LBL_GSTR9C_DOWNLOAD_FILED_PDF: "Download filed GSTR-9C(PDF)",
		LBL_GSTR9C_DOWNLOAD_FILED_EX: "Download filed GSTR-9C(EXCEL)",
		LBL_BACKD_GSTR9C: "Back to file returns",
		LBL_BACKU_GSTR9C: "Back to GSTR-9C Dashboard",
		GSTR9C: "Reconciliation Statement",
		LBL_TAX_LIABILITY_GSTR1_GSTR3B_IFF:
			"Tax liability as per GSTR-1/IFF and as per GSTR-3B ",
		LBL_QTY_PAT_R9:
			"Total Quantity should be numeric and can be maximum of 13 digits and 2 decimal places. Eg:9999999999999.99",
		LBL_SUCC_COL: "Success :",
		PDF_GSTR2XCO: "Download TDS and TCS credit received Details (PDF)",
		EXCEL_GSTR2XCO: "Download TDS and TCS credit received Details (EXCEL)",
		JSON_GSTR2XCO: "Download TDS and TCS credit received JSON File (JSON)",
		R9C_HELP_STEPS: "Steps to file your GSTR-9C Return Online",
		R9C_HLP_1:
			"Neither amendment nor revision of GSTR-9C can be made after filing the same.",
		R9C_HLP_2_five:
			"Reconciliation statement in Form GSTR-9C, duly certified by a chartered accountant or a cost accountant is required to be filed by every registered person whose aggregate turnover during a financial year exceeds five crore rupees.",
		R9C_HLP_2_two:
			"Reconciliation statement in Form GSTR-9C, duly certified by a chartered accountant or a cost accountant is required to be filed by every registered person whose aggregate turnover during a financial year exceeds two crore rupees.",
		R9C_HLP_3:
			"GSTR-9C shall be prepared in Offline Tool and required to be digitally signed by a chartered accountant or a cost accountant. Thereafter, taxpayer shall then upload the signed JSON file of GSTR-9C on the Portal by clicking on",
		R9C_HLP_3A: "‘Prepare Offline’",
		R9C_HLP_4:
			"Supporting documents like audited financial statements and other required documents, if any also needs to be uploaded by clicking on ‘Initiate Filing’ button along with reconciliation statement (JSON file) on the portal.",
		R9C_HLP_5:
			"Click on “DOWNLOAD GSTR-9C TABLES DERIVED FROM GSTR-9 (PDF)” to fill the GSTR-9 related figure in GSTR-9C offline tool. This is only for reference for preparing the Reconciliation statement (GSTR-9C) by Auditor.",
		R9C_HLP_6:
			"Follow instructions in ‘GSTR-9C offline tool’ to add details and generate JSON file for upload;",
		R9C_HLP_7:
			"Click on ‘Prepare Offline’ to initiate upload of Form GSTR-9C (Signed JSON file shared by Auditor) and click on ‘Upload’ tab to upload JSON file with the help of instruction available there.",
		R9C_HLP_8:
			"Verify that documents uploaded are duly signed by chartered accountant/cost accountant and are not tampered.",
		R9C_HLP_9:
			"You may make payment if you have any additional liability through GST DRC-03 link. (This is available in ‘Initiate Filing’ page).",
		R9C_HLP_10:
			"Upload the supporting documents like Balance sheet, Profit and loss account and any other document.",
		R9C_HLP_11:
			"Facility to preview draft (PDF) can be used to check the details filled up in the GSTR-9C.",
		R9C_HLP_12:
			"‘Proceed to File’ button shall be enabled only after successful uploading of Reconciliation statement (JSON file) and audited annual accounts.",
		R9C_HLP_13:
			"Click on ‘Proceed to File’ and Click on ‘File GSTR-9C’ with DSC/EVC.",
		R9C_HLP_FILETYP: "File with PDF or JPEG format is only allowed",
		R9C_HLP_FILESIZE: "Maximum 2 files and 5 MB for each file allowed",
		R9C_LBL_BALANCE: "Balance sheet",
		R9C_LBL_PFT: "Profit & loss statement/income & Expenditure Statement",
		R9C_LBL_OTH1: "Other Document 1, if any",
		R9C_LBL_OTH2: "Other Document 2, if any",
		R9C_HLP_DR3:
			"If there is any additional liability to be paid due to non-reconciliation, same may be paid through GST DRC-03. You can make the payment either before or after filing Form GSTR-9C. GST DRC-03 link will take you to the page of making additional payment where you will select the reason as payment due to reconciliation statement.",
		R9C_HLP_UPLD:
			"Following supporting documents are required to be uploaded before/after uploading reconciliation statement in Form GSTR-9C (maximum size of each PDF/JPEG file up to 5MB each file and maximum 2 files can be uploaded under each section):",
		R9C_HLP_UPLD1: "Balance Sheet (Mandatory)",
		R9C_HLP_UPLD2: "Profit and Loss account (Mandatory)",
		R9C_HLP_UPLD3: "Any other documents 1 (Optional)",
		R9C_HLP_UPLD4: "Any other documents 2 (Optional)",
		R9C_HLP_UPLD5:
			"After successfull upload, save the documents uploaded. Preview facility (PDF) is also available to view the documents uploaded.",
		LBL_GSTR9_WEEK_REF1: "Based on GSTR-1 filed by your suppliers upto ",
		LBL_GSTR9_WEEK_REF2:
			"computation of ITC has been shown in your GSTR-2A. Table 8A of GSTR-9 has been auto-populated accordingly",
		PAYMENT3B_655:
			"Credit available under IGST head shall be utilized for the payment of IGST liability, the remaining IGST credit can be utilised for liability under CGST or SGST/UTGST in any order, before using the CGST or SGST/UTGST credit.",
		PAYMENT3B_660:
			"SGST/UTGST liability: Balance SGST/UTGST liability can be set off with SGST/UTGST credit available after payment of IGST credit, if any.",
		LG9112: "Offset CGST or SGST/UTGST liability first with IGST credit before utilizing CGST credit",
		LG9113: "Offset SGST/UTGST or CGST liability first with IGST credit before utilizing SGST/UTGST credit",
		LG9068: "Offset SGST/UTGST liability with SGST/UTGST credit before utilizing it for IGST liability",
		LG9073: "Offset CGST liability first with IGST credit before utilizing it for SGST/UTGST liability",
		LG9074: "Offset IGST liability with CGST credit before utilizing SGST/UTGST credit",
		LG9114: "Offset CGST liability with CGST credit before utilizing it for IGST liability",
		LBL_POP_3B_ZEROVAL1:
			"There are no values declared in GSTR3B tables/tiles which means you are trying to offset GSTR3B return for ",
		LBL_POP_3B_ZEROVAL2: " with zero values. Do you want to proceed ?",
		LBL_ITC_04_NEW:
			"GST ITC-04 : Details of goods/capital goods sent to job worker and received back",
		LBL_ITC04_INVOICE:
			"Invoice No. in case supplied from premises of job worker issued by the Principal",
		LBL_ITC04_INV_DATE:
			"Invoice date in case supplied from premises of job worker issued by the Principal",
		LBL_ITC04N_MSG27:
			"Details of goods/capital goods sent to job worker and received back",
		LBL_ITC05A_MSG01:
			"5A. Details of inputs/ capital goods received back from job worker to whom such goods were sent for job work; and losses and wastes:",
		LBL_ITC05B_MSG02:
			"5B. Details of inputs / capital goods received back from job worker other than the job worker to whom such goods were originally sent for job work; and losses and wastes:",
		LBL_ITC05C_MSG03:
			"5C. Details of inputs/ Capital goods sent to job worker and subsequently supplied from premises of job worker; and losses and wastes:",
		LBL_ITC01_MSG14: "( View items )",
		HLP_DT_FORMAT: "DD/MM/YYYY",
		LBL_ITC04_CHALLAN:
			"Challan No. issued by job worker under which goods have been received back",
		LBL_ITC04_CHLN_DATE:
			"Date of challan issued by job worker under which goods have been received back",
		LBL_ITC04_JOB_NATURE: "Nature of job work done by job worker",
		LBL_ITC04_LOSSES: "Losses & wastes",
		LBL_ITC04N_MSG35:
			"Either the details of original challan issued by principal or fresh challan issued by job worker under which goods have been received back, are to be reported.",
		LBL_STATE: "State",
		LBL_ITC01_JS_2:
			"Something went wrong. Please try adding the GSTIN again",
		LBL_ITC01_JS_3:
			"Changing GSTIN will remove the added items pertaining to this invoice",
		LBL_ITC01_JS_4: "Invoice is saved.",
		LBL_ITC01_JS_5: "Please add the item first in order to save.",
		LBL_ITC01_JS_6:
			"Claim of ITC under section 18 (1) (a) cannot be made as the registration application has been submitted after 30 days from the day liable to register.",
		LBL_ITC01_JS_7:
			"Due date of filing claim of input tax credit through Form GST ITC-01 under clauses ",
		LBL_RVD_NOT_NO: "Revised note no.",
		LBL_RVD_NOT_DATE: "Revised note date",
		LBL_RVD_CRDR_NOT_NUMB: "Revised Credit/Debit note no.",
		LBL_RVD_CRDR_NOTE_DATE: "Revised Credit/Debit note date",
		LBL_ORG_NOT_NO: "Original note no.",
		LBL_ORG_NOT_DATE: "Original note date",
		LBL_ITC01_JS_8:
			"of sub-section (1) of section 18 is over. The claim cannot be filed now.",
		LBL_ITC01_JS_9:
			"Due date of filing claim of input tax credit through Form GST ITC-01 under clauses (C) of sub-section (1) of section 18 is over. The claim cannot be filed now.",
		LBL_ITC01_JS_10:
			"Due date of filing claim of input tax credit through Form GST ITC-01 under clause (d) of sub-section (1) of section 18, based on the date of notification specified,  is over. Please select ‘Close’ to end the process to enable to file new claim.",
		LBL_ITC01_JS_11:
			"WARNING: You are about to reset your submitted form; details as submitted would be available for update and new addition. Do you wish to continue?",
		LBL_ITC01_JS_12:
			"Once you fill the details in relevant Tables,please be informed that once Submit button is clicked, no modification will be allowed.Are you sure, you want to Submit?",
		LBL_ITC01_JS_13: "CA details uploaded Successfully",
		LBL_ITC01_JS_14:
			"Please save the CA fields or the document if uploaded new",
		LBL_ITC01_JS_15: "You’ve successfully filed the ITC 01 form for",
		LBL_ITC01_JS_16: " The Acknowledgment Reference Number (ARN) is ",
		LBL_ITC01_JS_17: "You are about to file Section",
		LBL_ITC01_JS_18: " of ITC-01 of ",
		LBL_ITC01_JS_19:
			". Would you like to proceed? No changes can be made in this return after filing.",
		LBL_ITC01_JS_20:
			"Please enter all the relevant fields and save them by clicking Save CA Details.",
		LBL_ITC01_JS_21: "Invoice is deleted.",
		LBL_ITC01_JS_22: "Invoice successfully deleted.",
		LBL_ITC01_JS_23: "Date of challan cannot be before 01/07/2017",
		LBL_ITC01_JS_24:
			"Changing GSTIN will remove the added items pertaining to this challan",
		LBL_ITC01_JS_25:
			"Changing state code will remove the added items pertaining to this challan",
		LBL_ITC01_JS_26:
			"Challan date should be on or after registration date  and till the current filing quarter end date(but not before 1st Jul'2017)",
		LBL_ITC01_JS_27:
			"Challan date should be on or after registration date  and till the current quarter end date(but not before 1st Jul'2017)",
		LBL_ITC01_JS_28: "Please enter the original challan date first.",
		LBL_ITC01_JS_29: "Do enter a date on or after original challan date",
		LBL_ITC01_JS_30:
			"Challan date cannot be after the current quarter end date.",
		LBL_ITC01_JS_31: "Challan number cannot be 0",
		LBL_ITC01_JS_32: "Invoice number cannot be 0",
		LBL_ITC01_JS_33:
			"Job worker's GSTIN cannot be same as Principal GSTIN.",
		LBL_ITC01_JS_34: "Both Job Worker can not have same GSTIN",
		LBL_ITC01_JS_35: "Either of GSTIN or State code is mandatory.",
		LBL_ITC01_JS_36: "The GSTIN and state code should be of same state.",
		LBL_ITC01_JS_37: "Do enter a date on or before 30 June 2017.",
		LBL_ITC01_JS_38: "Do enter a date on or after 1 july 2017.",
		LBL_ITC01_JS_39: "Record is under processing",
		LBL_ITC01_JS_40: "Do not enter all three taxes",
		LBL_ITC01_JS_41: "Delete request has been accepted successfully.",
		LBL_ITC01_JS_42: "Upload was successfull.",
		LBL_ITC01_JS_43:
			"There are unsaved changes in the form. Please save the changes prior to filing.",
		LBL_ITC01_JS_44: "You are about to file ITC-02A for the GSTIN ",
		LBL_ITC01_JS_45: ". Are you sure you want to continue?",
		LBL_ITC01_JS_46:
			"Please enter all the relevant fields and save them by clicking Save.",
		LBL_ITC01_JS_47: "You have successfully filed the ITC-02 for GSTIN ",
		LBL_ITC01_JS_48: ". The Acknowledgment Reference Number (ARN) is ",
		LBL_ITC01_JS_49:
			"Invoice date should be on or after registration date  and till the current quarter end date(but not before 1st Jul'2017)",
		LBL_ITC04_MSG1: "4. Details of inputs/capital goods sent for job-work",
		LBL_ITC04_MSG2: "Quarter 1 (Apr-Jun)",
		LBL_ITC04_MSG3: "Quarter 2 (Jul-Sep)",
		LBL_ITC04_MSG4: "Quarter 3 (Oct-Dec)",
		LBL_ITC04_MSG5: "Quarter 4 (Jan-Mar)",
		LBL_ITC04_MSG6: "GSTIN/ State in case of unregistered job-worker",
		LBL_ITC04_MSG7: "Challan number",
		LBL_ITC04_MSG8: "Challan number can be only upto 16 digit",
		LBL_ITC04_MSG9: "Challan number cannot be 0",
		LBL_ITC04_MSG10: "Challan date",
		LBL_ITC04_MSG11: "err",
		LBL_ITC04_MSG12: "Quantity can be only 6 digit",
		LBL_ITC04_MSG13: "Taxable Value cannot be 0",
		LBL_ITC04_MSG14: "Type of Goods",
		LBL_ITC04_MSG15: "Amount of ITC claimed as CESS",
		LBL_ITC04_MSG16: "Amount of ITC claimed as IGST",
		LBL_ITC04_MSG17: "IGST amount cannot be greater than Invoice Value",
		LBL_ITC04_MSG18: "Amount of ITC claimed as CGST",
		LBL_ITC04_MSG19: "CGST amount cannot be greater than Invoice Value",
		LBL_ITC04_MSG20: "Amount of ITC claimed as SGST",
		LBL_ITC04_MSG21: "SGST amount cannot be greater than Invoice Value",
		LBL_ITC04_MSG22:
			"7a. Claim under section 18 (1) (a) or section 18 (1)(b)(Details of stock of inputs and inputs contained in semi-finished goods or finished goods on which ITC is claimed)",
		LBL_ITC04_MSG23: "Type of Goods(Inputs/capital goods)",
		LBL_ITC04_MSG24: "Add Invoice",
		LBL_ITC04_MSG25: "Submission in Progress",
		LBL_ITC04_MSG26: "File with E-Signature",
		LBL_ITC04_MSG27:
			"Details of inputs/capital goods sent for job-work and received back or sent directly to customer",
		LBL_ITC04_MSG28:
			"Please proceed to Prepare Online and filing once your Challans are uploaded.",
		LBL_ITC04_MSG29:
			"Add new challan/edit existing challan saved in system",
		LBL_ITC04_MSG30:
			"4. Details of inputs/capital goods sent for job work (includes inputs/capital goods directly sent to place of business /premises of job worker)",
		LBL_ITC04_MSG31: "No. of Records-",
		LBL_ITC04_MSG32:
			"Add new challan/invoices or edit existing challan/invoices saved in system",
		LBL_ITC04_MSG33:
			"Table 5 - Details of inputs/capital goods received back or sent out from business place of job-work",
		LBL_ITC04_MSG34:
			"You are about to file GST ITC-04 statement; with ‘Nil’ records. Do you want to continue?",
		LBL_ITC04_MSG35:
			"If you have more than 500 challans, then please use upload functionality to upload the challans.",
		LBL_ITC04_MSG36: "Job Worker Type",
		LBL_ITC04_MSG37: "Enter a valid format of GSTIN",
		LBL_ITC04_MSG38: "Job worker's GSTIN cannot be same as Principal GSTIN",
		LBL_ITC04_MSG39: "Enter challan number",
		LBL_ITC04_MSG40:
			"Total Quantity should be numeric and can be maximum of 13 digits and 2 decimal places. Eg:9999999999999.99",
		LBL_ITC04_MSG41:
			"Taxable value should be numeric and can be maximum of 13 digits and 2 decimal places. Eg:9999999999999.99",
		LBL_ITC04_MSG42:
			"Cess value should be numeric and can be maximum of 13 digits and 2 decimal places. Eg:9999999999999.99",
		LBL_ITC04_MSG43: "Enter equal CGST and SGST rate.",
		LBL_ITC04_MSG44: "Processed Challans",
		LBL_ITC04_MSG45: "GSTIN / State in case of unregistered job-worker",
		LBL_ITC04_MSG46: "Pending Challans",
		LBL_ITC04_MSG47: "State Code/ GSTIN",
		LBL_ITC04_MSG48:
			"Details of inputs/capital goods received back from job worker or sent out from business place of job-work",
		LBL_ITC04_MSG49: "Original challan number",
		LBL_ITC04_MSG50: "Enter original challan number",
		LBL_ITC04_MSG51: "Original challan date",
		LBL_ITC04_MSG52: "Nature of Transaction",
		LBL_ITC04_MSG53: "Goods received back from Job worker",
		LBL_ITC04_MSG54: "Goods sent out to another Job worker",
		LBL_ITC04_MSG55: "Goods supplied from Job worker",
		LBL_ITC04_MSG56: "GSTIN / State of job worker if unregistered",
		LBL_ITC04_MSG57: "Original Challan",
		B2BADD_RECR6_116: "This field is mandatory",
		LBL_OFFLINE_SAVE_ERROR:
			"Your last save is still under process, please wait until it gets processed and then try again later",
		CMP08: "Statement for payment of self-assessed tax GST CMP-08",
		LBL_CMP08_TABLE3_OUTWARD:
			"Outward supplies (including exempt supplies)",
		LBL_CMP08_TABLE3_INWARD:
			"Inward supplies attracting reverse charge including import of services",
		LBL_CMP08_TABLE3_TAX: "Tax payable (1 + 2)",
		LBL_CMP08_TABLE3_INTEREST: "Interest payable, if any",
		LBL_CMP08_PDF_3B1: "Form GST CMP - 08",
		LBL_CMP08_PDF_SUB_HEADER: "[See rule 62]",
		LBL_CMP08_PDF_TABLE3_HEADER:
			"Statement for payment of self-assessed tax",
		LBL_CMP08_PDF_TABLE3_LEAGAL: "Legal name",
		LBL_CMP08_PDF_TABLE3_TRADE: "Trade name",
		LBL_CMP08_PDF_TABLE3_SUB_HEADER:
			"(Net of advances, credit and debit notes and any other adjustment due to amendments etc.)",
		LBL_CMP08_PDF_TABLE3_SUB_HEADER1: "(Amount in ₹ in all tables)",
		LBL_CMP08_PDF_VERIFICATION: "4.Verification",
		LBL_CMP08_PDF_TBL5: "Tax & interest paid",
		LBL_CMP08_PDF_INSTRUCTIONS: "Instructions (GST CMP-08)",
		LBL_CMP08_PDF_INSTRUCTION1:
			"1. The taxpayer under the composition scheme for goods or for services, as the case may be, shall make payment of tax on quarterly basis by the due date.",
		LBL_CMP08_PDF_INSTRUCTION2:
			"2. Adjustment on account of advances, credit/debit notes or rectifications shall be reported against the liability.",
		LBL_CMP08_PDF_INSTRUCTION3:
			"3. Negative value may be reported as such if such value comes after adjustment.",
		LBL_CMP08_PDF_INSTRUCTION4:
			"4. If the total tax payable becomes negative, then the same shall be credited to the cash ledger.",
		LBL_CMP08_PDF_INSTRUCTION5:
			"5. Interest shall be leviable if payment is made after the due date.",
		LBL_CMP08_PDF_INSTRUCTION6:
			"6. 'Nil' Statement shall be filed if there is no tax liability due during the quarter.",
		LBL_CMP08_TABLE3_SUMMARY: "3.Summary of self-assessed liability",
		LBL_FILE_CMP08_NIL: "File Nil GST CMP-08",
		LBL_FILE_CMP08_PAYMENT_TAX: "Payment of Tax",
		LBL_CMP08_CREATE_CHALLAN: "CREATE CHALLAN",
		LBL_ADJ_NEG_LIAB:
			"Adjustment of negative liability of previous tax period (₹)",
		LBL_PREVIEW_DRAFT_CMP_PDF: "PREVIEW DRAFT GST CMP-08 (PDF)",
		LBL_CMP08_PREVIEW_FINAL: "DOWNLOAD FILED GST CMP-08",
		LBL_FILE_GST_CMP08: "FILE GST CMP-08",
		LBL_CMP08_TAX: "Tax/cess",
		LBL_DECLARATION_CMP08:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.",
		LBL_CMP08_ERR_SGST_CGST:
			"Please provide equal values for CGST and SGST/UTGST amount.",
		LBL_CMP08_ERR_VAL_TAX:
			"Taxable value should be greater than tax amounts",
		LBL_CMP08_PAY_TABLE_INFO:
			"The liability under reverse charge and other than reverse charge is to  be adjusted with the negative liability, if any, separately for  reverse charge and other than reverse charge. There is no adjustment among themselves. However, in ‘Pay in cash’,  ‘Tax/cess’  (Column 8) displays the net amount of cash to be paid after adjusting both reverse charge and other than reverse charge liability  with negative lability, if any.",
		LBL_TYPE_OF_RETURN: "Type of return",
		LBL_PAID_CASH_CMP08: "Paid in cash (₹)",
		LBL_STATEUT_TAX_1: "State/UT tax (₹)",
		LBL_POP_CMP08: "Save request is accepted successfully",
		LBL_ITC04N_MSG36:
			"Either the details of original challan issued by principal or invoice no. issued by job worker under which goods have been received back, are to be reported.",
		LBL_ITC04N_MSG37:
			"Original challan details may not be filled up where one-to-one correspondence between goods sent for job work and supplied therefrom is not possible, however, invoice details are mandatory.",
		LBL_POP_ITC04_01:
			"The number of Records that can be viewed and entered online for a table /section in Form ITC-04 is restricted to 500 records only which can be comfortably browsed online. Taxpayer having records more than the said limit, may please use the ”Offline tool” available on the portal for viewing/modifying data. Please download the data ( Prepare Offline > Select Financial year and tax period > Download Tab > Click on Generate JSON File to Download) and view it in the Offline Tool. To check further details on modifying the records using Offline Tool, please click on OK to navigate to Download section",
		TITLE_UNREG_TYPE_ITC: "Unregistered",
		DASHBOARD3B_95: "Help",
		DASHBOARD3B_96:
			"Please click on a box (tile) and enter relevant details therein. Save and click on the next box to enter relevant details. Once you have filled up the information relating to a tile, you will see gross (summary) figures on the tiles. You can view the preview by clicking on Preview button. You can click on Back button to go to previous screen anytime. Data saved by you will not be deleted.",
		DASHBOARD3B_105:
			"You may act upon the auto-populated TDS/TCS details, if any, in",
		DASHBOARD3B_107:
			"so that the amount of such TDS/TCS is credited to your cash ledger.TDS and TCS claim is independent of GSTR-3B",
		DASHBOARD3B_106: "‘Form TDS and TCS credit received’",
		DASHBOARD3B_156: "Last GSTR3B Save request is in progress...",
		DASHBOARD3B_162:
			"Total amount of Integrated Tax in section 3.2 should be less than or equal to the section 3.1(a) Integrated Tax which is Rs. ",
		DASHBOARD3B_167: "Help Manual",
		DASHBOARD3B_174:
			"Details of Outward Supplies and inward supplies liable to reverse charge",
		DASHBOARD3B_204:
			"Details of inter-State supplies made to unregistered persons, composition taxable persons and UIN holders",
		DASHBOARD3B_224: "Eligible ITC",
		DASHBOARD3B_254:
			"Values of exempt, nil-rated and non-GST inward supplies",
		DASHBOARD3B_274: "Interest & late fee payable",
		DASHBOARD3B_306: "Payment of Tax",
		DASHBOARD3B_341:
			"Amount of credit received through TDS/TCS need to be declared here and the same is credited to the<br>cash ledger of the taxpayer. Since, the provisions for TDS/TCS have not yet been notified, this<br>particular section has been kept inactive in GSTR-3B.",
		DASHBOARD3B_370: "Important Message",
		DASHBOARD3B_371:
			"Once you have filled the relevant tables, please follow the following steps for filing:-",
		DASHBOARD3B_373: "Please click on 'Save GSTR3B' on the summary page.",
		DASHBOARD3B_374:
			"You may download and preview/save the  draft GSTR-3B.",
		DASHBOARD3B_375:
			"Click on 'Proceed to payment' to offset your liabilities.",
		DASHBOARD3B_376:
			"In case of insufficient cash balance to set off the liabilities, challan creation facility has been provided on the same screen.",
		DASHBOARD3B_377:
			"After setting off liabilities, GSTR-3B can be filed by attaching DSC/EVC.",
		DASHBOARD3B_420:
			"Please click here to download the Summary page of GSTR-3b for your review",
		DASHBOARD3B_436:
			"Please click here to download the Summary page of GSTR-3B for your review",
		DASHBOARD3B_437: "Download Filed GSTR-3B",
		DASHBOARD3B_484:
			"Please answer the following questions to enable us to show relevant sections",
		DASHBOARD3B_505:
			"Nil return can be filed by you if you have not made any outward supply (commonly known as sale) AND have NOT received (commonly known as purchase) any goods/services AND do not have any tax liability.",
		DASHBOARD3B_504: "Note:",
		DASHBOARD3B_514:
			"B.   Have you made any supply of goods/services (including   nil rated, exempt and non-GST supplies) or received any supplies liable to reverse charge during this tax period? (Table 3.1)",
		DASHBOARD3B_521:
			"C.   Have you made any inter-state supplies to unregistered persons, composition taxable persons or UIN holders? (Table 3.2)",
		DASHBOARD3B_529:
			"D.   Do you have any claim/reversal of Input tax credit(ITC) on purchase of goods or receipt of services ? (Table 4)",
		DASHBOARD3B_537:
			"E.   Have you received any nil rated, exempt or non-GST supplies during this tax period? (Table 5)",
		DASHBOARD3B_546:
			"F.   Do you have any interest or late fee (including carry forward late-fee) liability? (Table 5.1)",
		DASHBOARD3B_554:
			"G.   Do you have any tax liability due to GST TRAN-1?(System-populated) (Table 6)",
		DASHBOARD3B_578:
			"Based on your answers, relevant tables of GSTR-3B will be visible on the next page. You may go back to previous screen by clicking on Back button. ",
		DASHBOARD3B_641: "Filing GSTR-3B is now made more User friendly",
		DASHBOARD3B_648:
			"Fill either CGST or SGST/UGST amount, other tax will get auto filled.",
		DASHBOARD3B_649:
			"You can now save the Form on confirming details filled in the Table. You can fill balance details later.",
		DASHBOARD3B_650:
			"Preview Form or download it for cross verifying saved details in any table(s) anytime.",
		DASHBOARD3B_651:
			"No more Submit requirement to freeze details and know the liability.",
		DASHBOARD3B_652:
			"Changes in any table can be made before making payment towards liabilities.",
		DASHBOARD3B_653:
			"Once you proceed to payment, you can also see details of existing balances in cash and credit ledgers (Table 6.1 - Payments Table).",
		DASHBOARD3B_654:
			"Wow! System suggested Tax Credit (ITC) is already filled for discharging liability. Be aware, it is only suggestion. You can edit the same before finalizing the Return.",
		DASHBOARD3B_655:
			"Once you confirm ITC and cash utilization for payment of tax liability in Payments Table, system does automatic calculation for shortfall in cash ledger.",
		DASHBOARD3B_666:
			"Once you are Ok with shortfall, System will generate pre-filled challan for shortfall and navigate to payments option.",
		DASHBOARD3B_667:
			"Once you make online payment, system will navigate back to Payments Table.",
		DASHBOARD3B_668: "Satisfied with the details filled, click ",
		"Proceed to file ":
			"select authorized signatory,Submit with EVC or DSC.",
		DASHBOARD3B_660:
			"You can Track Return status as well as download the Return from through Track Return Status functionality available at your dashboard",
		DASHBOARD3B_662: "Your Return is filed!",
		DASHBOARD3B_664: "Refer",
		DASHBOARD3B_697: "for detailed steps for filing",
		DASHBOARD3B_698: "User Manual",
		INTERSTATESUP3B_138:
			"Total amount of integrated tax declared across <br>all sections of Table 3.2 should not exceed the <br>amount of integrated tax declared in Row (a) <br>of Table 3.1",
		INTERSTATESUP3B_227: "Inter-state Supplies",
		INTERSTATESUP3B_230:
			"Out of supplies shown in earlier Table (3.1), declare the details of inter-State supplies made to unregistered persons, composition taxable persons and UIN holders in the respective sub-sections along with the place of supply.",
		INTERSTATESUP3B_231:
			"The details mentioned in this Table will not be considered in computation of output liability.",
		INTERSTATESUP3B_232:
			"Please ensure the details of inter-State sales declared here is part of the declaration in Table 3.1 above and it doesn't exceed the amount declared over there.",
		INTERSTATESUP3B_235: "Close",
		INWARDSUP3B_86: "Exempt, nil and Non GST inward supplies",
		INWARDSUP3B_89:
			"Declare the values of inward supplies with respect to the following, in this section:",
		INWARDSUP3B_91:
			"From suppliers under composition scheme, Supplies exempt from tax and Nil rated supplies.",
		INWARDSUP3B_92: "Supplies which are not covered under GST Act.",
		INWARDSUP3B_94:
			"The above values have to be declared separately for Intra-State and Inter-State supplies.",
		INWARDSUP3B_97: "Close",
		IOSUP3B_152: "Tax on outward and reverse charge inward supplies",
		IOSUP3B_155:
			"3.1(a) Outward supplies other than zero rated, nil rated and exempted",
		IOSUP3B_156:
			"Include the taxable value of all inter-State and intra-State B2B as well as B2C supplies made during the tax period. Reporting should be net off debit/credit notes and amendments of amounts pertaining to earlier tax periods, if any.",
		IOSUP3B_202:
			"= (Value of invoices) + (Value of Debit Notes) - (Value of Credit Notes) + (Value of advances received for which invoices have not been issued in the same Month) - (Value of advances adjusted against invoices).",
		IOSUP3B_157: "Value of Taxable Supplies",
		IOSUP3B_203:
			": Only Tax amount should be entered against respective head. Please ensure you declare a tax amount IGST and/or CGST and SGST along with Cess applicable, if any.",
		IOSUP3B_158: "Integrated Tax, Central Tax, State/UT Tax and Cess",
		IOSUP3B_159: "3.1(b) Outward taxable supplies (zero rated)",
		IOSUP3B_160:
			"Mention Export Supplies made including supplies to SEZ/SEZ developers. Total taxable value should include supplies on which tax has been charged as well as supplies made against bond or letter of undertaking.",
		IOSUP3B_161:
			"Integrated Tax and Cess should include amount of tax, if paid, on the supplies made.",
		IOSUP3B_162: "3.1(c) Other outward supplies (Nil rated, exempted)",
		IOSUP3B_163:
			"Here include all outward supplies which are not liable to tax either because they are nil rated or exempt through notification. It should not include export supplies or supplies made to SEZ developers or units declared in 3.1(b) above.",
		IOSUP3B_164: "3.1(d) Inward supplies (liable to reverse charge)",
		IOSUP3B_165:
			"Include inward supplies which are subject to reverse charge mechanism. This also includes supplies received from unregistered persons on which tax is liable to be paid by recipient.",
		IOSUP3B_166: "3.1(e) Non-GST Outward Supplies",
		IOSUP3B_167:
			"Amount in Total taxable value should include aggregate of value of all the supplies which are not chargeable under GST Act e.g. petroleum products.",
		IOSUP3B_170: "Close",
		"RT-3BAS1082":
			"This is an invalid save request as due date to claim ITC has already past for the given return period. Please remove ITC available and ineligible details from your save request and try again.",
		"RT-3BAS1081":
			"Saved GSTR3B data for the given return period could not be found.",
		"RT-3BAS1080":
			"You are not allowed to claim ITC for the mentioned tax period as the due date of claiming ITC in GSTR3B for the current tax period is already past. Please go back and remove ITC available and ITC ineligible details from ITC tile, save the details and proceed.",
		B2BASUMR6_106: "Supplier Details",
		B2BASUMR6_107: "No Of Invoices",
		NO_OF_DOC: "No Of Documents",
		B2BASUMR6_113: "Tax paid (₹)",
		B2BAR6_70:
			"Place of Supply(Only if different from location of recipient)",
		LBL_R2X_MSG42: "Preview Draft TDS and TCS credit received (Excel)",
		LBL_R2X_MSG43: "Download Filed TDS and TCS credit received (Excel)",
		LBL_R2X_MSG44: "Preview Draft TDS and TCS credit received (JSON)",
		LBL_R2X_MSG45: "Download Filed TDS and TCS credit received (JSON)",
		LBL_ITC01_MSG26: "Prepare Online",
		LBL_ITC01_MSG27: "Take Action",
		LBL_ITC02A_JS_01: "You are about to file ITC-02A for the GSTIN ",
		LBL_ITC02A_MSG9:
			"Please click here to download the summary page of ITC-02A for your review.",
		LBL_ITC02A_HEAD:
			"Declaration of transfer of ITC in case of obtaining seperate registration within a State or Union territory",
		LBL_ITC02A_HEAD_PENDING:
			"Declaration for transfer of ITC pursuant to registration under sub-section (2) of secion 25",
		LBL_ITC02A_HEAD_GSTIN: "GSTIN of Transferor",
		LBL_ITC02A_PREVIEW: "Preview Draft GST ITC-02A (PDF)",
		LBL_ITC02A_DOWNLOAD: "Download filed GST ITC-02A (PDF)",
		LBL_ITC02A_TRANSFEREE_ACTION: "Transferee Action - ",
		LBL_ITC02A_TRANSFEREE_GSTIN: "GSTIN of Transferee",
		ISDAMDADDINVPG2R6_312: "ISD Credit Distribution",
		ISDAMDADDINVPG2R6_H123: "Distribution of ITC",
		ISDAMDADDINVPG2R6_H1234: "Reversal of ITC",
		LBL_ITC_NEGATIVE_GSTR6:
			"Amount of ITC distributed including negative amounts in table 4A",
		LBL_UTILISATION_GSTR6: "Utilization of ITC for distribution",
		ITC_SAVE: "SAVE",
		ISDAMDADDINVPG2R6_15: "Indicates Mandatory Fields",
		LBL_CESS_GSTR6: "Cess (₹)",
		LBL_CESS_DIST: "Cess",
		ISD_AMD_SUM_08R6_141_GSTR6: "Total Cess Value (₹)",
		LBL_Distributed_Reconcilation:
			"Distributed credit reconciliation table",
		POS_INFO_GSTR6_New:
			"Total ITC available for distribution shall be auto updated based on the inward supplies reported in table no. 3 and 6 except where Place of Supply(PoS) lies in Supplier’s State in case of inter-State supplies. ITC taken back through issue of ISD credit note(s) will also be added to the total credit available for distribution.",
		LBL_LIABILITY_7: "Click here to compute tax and interest, if any.",
		LBL_RCRDS_PR_PGE: "Records to view per page",
		LBL_TRDE_NME_COLCTR: "Trade name/Legal name of Collector",
		LBL_TRDE_NME_SUPPLR: "Trade name/Legal name of Supplier",
		LBL_ORG_TRDE_NME_SUPPLR: "Original Trade name/Legal name of Supplier",
		LBL_RVSD_TRDE_NME_SUPPLR: "Revised Trade name/Legal name of Supplier",
		LBL_TRDE_NME_DEDUCTR: "Trade name/Legal name of Deductor",
		LBL_SRCH_GSTIN_TDNAME_SR:
			"Search by GSTIN/Trade or legal name of supplier",
		LBL_SRCH_GSTIN_TDNAME_DTE:
			"Search by GSTIN/Trade or legal name of deductee",
		LBL_SRCH_GSTIN_TDNAME_CR:
			"Search by GSTIN/Trade or legal name of collector",
		LBL_SRCH_GSTIN_TDNAME_DR:
			"Search by GSTIN/Trade or legal name of deductor",
		LBL_LIABILITY_8: "Click here to compute tax and interest, if any.",
		LBL_POP_R7_18:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.",
		LBL_DG_STATUS: "Designation /Status",
		LBL_TCT_DET_123: "No matching records found.",
		LBL_R2X_MSG46:
			"Click here to download the auto populated details in Excel format. Please ensure correctness of the same before filing the form.",
		LBL_R2X_MSG47: "",
		LBL_ITC02A_ERROR_MSG1:
			"Enter a valid Amount of matched ITC to be transferred.",
		TTL_ITC02A_FILED_DNLD: "Download",
		ITC02A_LBL1: "Transfer ITC",
		ITC02A_LBL2: "Take Action",
		LBL_ITC02A: "GST ITC-02A  ",
		LBL_ITC02_MSG12: " There are no pending actions at this time.",
		LBL_ITC02_MSG3: "Transferee and Transferor GSTIN cannot be the same.",
		LBL_ITC02_MSG4: "Transferee and Transferor should be of same State/UT.",
		LBL_ITC02A_MSG4: "Transferee and Transferor PAN number should be same.",
		LBL_ITC02_MSG5: "ITC amount to be transferred cannot be empty",
		LBL_ITC02A_MSG: "ITC-02A",
		LBL_ITC02A_PDF1: "Form GST ITC-02A",
		LBL_ITC02A_PDF2: "[See rule – 41A]",
		LBL_ITC02A_PDF3:
			"Declaration for transfer of ITC pursuant to registration under sub-section (2) of section 25",
		LBL_ITC02A_PDF4: "8. Action taken by transferee : ",
		LBL_ITC02A_PDF5: "9. Verification",
		LBL_ITC02A_PDF6:
			"hereby solemnly affirm and declare that the information given hereinabove is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.",
		LBL_ITC02A_PDF7: "Signature of authorized signatory : ",
		LBL_ITC02A_PDF8: "Designation / Status",
		LBL_ITC02A_PDF9: "Date",
		LBL_ITC02A_PDF10: "Acceptance/ Rejection of Form GST ITC-02A",
		LBL_ITC02A_PDF11:
			"Acceptance/ Rejection of declaration for transfer of ITC pursuant to registration under sub-section (2) of section 25",
		LBL_ITC02_PDF_4: "GSTIN of transferor",
		LBL_ITC02_PDF_5: "Legal name of transferor",
		LBL_ITC02_PDF_6: "Trade name, if any",
		LBL_ITC02_PDF_7: "GSTIN of transferee",
		LBL_ITC02_PDF_8: "Legal name of transferee",
		LBL_ITC02_PDF_9: "Tax/Cess",
		LBL_ITC02_MSG10: "Transferor GSTIN/UIN",
		LBL_ITC02_MSG11: "Transferor Legal Name",
		LBL_GRS_VAL_RS: "Gross Value (₹)",
		LBL_GSTR2A_ORPD: "Original tax period in which reported",
		LBL_GSTR2A_ASPD: "Tax period in which amended",
		LBL_GSTR2A_ATYP: "Amendment Type",
		LBL_ITC01_MSG7:
			"OTP has been sent to your registered mobile number and e-mail id. Please enter the OTP to Confirm Submission",
		RTN_24: "File generation is in progress and may take upto 20 minutes. Please revisit accordingly.",
		ERR_VAL_REG_GSTIN_ITC02A: "Enter a valid GSTIN of Transferee.",
		LBL_LEGAL_NAME_BUS: "Legal Name of Business",
		LBL_GSTR1A_DWNLD_FIL_PDF: "Download Amended GSTR-1 (PDF)",
		GSTR4X: "Annual Return",
		MSG_PREV_FIL_R4:
			"To file your annual GSTR-4 return, filing of all applicable Form GST CMP-08 are mandatory. Please file your pending form CMP-08 and try again.",
		LBL_HLP_TXT_R4X_1:
			"The system would navigate you to GSTR-4 Dashboard page. Provide the previous year's aggregate turnover and save it;",
		LBL_HLP_TXT_R4X_2:
			"Based on the information available in the system, details would be auto-drafted in few tables, which shall be non-editable. Provide the details in other tables;",
		LBL_HLP_TXT_R4X_3: "Click on ‘Proceed to file’ button;",
		LBL_HLP_TXT_R4X_4:
			"Verify the details in preview page and click on ‘Continue’ button to navigate to payment table; and",
		LBL_HLP_TXT_R4X_5:
			"File the return by clicking on ‘File GSTR-4’ button while paying additional liabilities, if any.",
		LBL_HLP_TXT_R4X_6: "Upload/Download JSON or Prepare Offline",
		LBL_HLP_TXT_R4X_7:
			"Click on ‘Upload/ Download json’ or ‘Prepare Offline’ and then click on ‘Download’ tab to download auto-drafted GSTR-4 details, if any;",
		LBL_HLP_TXT_R4X_8:
			"Follow instructions in ‘GSTR-4 offline tool’ to add details and generate JSON file for upload;",
		LBL_HLP_TXT_R4X_10:
			"Click on ‘Upload’ tab to upload JSON file and file the return with the instructions available on GSTR-4 online.",
		LBL_HLP_TXT_R4X_11:
			"1. GSTR-4 can be filed online. It can also be prepared in Offline tool and then uploaded on the portal and filed.",
		LBL_HLP_TXT_R4X_12:
			"2. Annual return in Form GSTR-4 is required to be filed by every taxpayer who has availed composition scheme during any part of the relevant financial year.",
		LBL_HLP_TXT_R4X_13:
			"3. All the applicable statements i.e. GST CMP-08 should have been filed for all the applicable quarters of the relevant financial year (Y) before filing Annual GSTR-4.",
		LBL_HLP_TXT_R4X_14:
			"4. Once return in Form GSTR-4 is filed, it cannot be revised.",
		LBL_HLP_TXT_R4X_15:
			"1. If you have remained under composition for part of the year and normal for remaining part of the year, then both GSTR-4 and GSTR-9 are required to be filed for the relevant period.",
		LBL_HLP_TXT_R4X_16:
			"2. GSTR-9/4 can be prepared online and filed online. It can also be prepared in Offline tool and then uploaded on the portal and filed.",
		LBL_HLP_TXT_R4X_17:
			"3. Annual return in Form GSTR-9 is required to be filed by every taxpayer registered as normal taxpayer at any time during the relevant financial year.",
		LBL_HLP_TXT_R4X_18:
			"4. Annual return in Form GSTR-4 is required to be filed by every taxpayer who has availed composition scheme during any part of the relevant financial year. ",
		LBL_HLP_TXT_R4X_19:
			"5. All applicable statements in Forms GSTR-1 and returns in Form GSTR-3B of the financial year should have been filed before filing GSTR-9.",
		LBL_HLP_TXT_R4X_20:
			"6. All the applicable statements i.e. GST CMP-08 should have been filed for all the applicable quarters of the relevant financial year (Y) before filing Annual GSTR-4.",
		LBL_HLP_TXT_R4X_21:
			"7. Return in Form GSTR-9 and GSTR-4  cannot be revised after filing.",
		LBL_HLP_TXT_R4X_21_1:
			"8. In case you are required to file GSTR-9C (Reconciliation statement and Certification); shall be enabled on the dashboard post filing of GSTR-9.",
		LBL_HLP_TXT_R4X_21_2:
			"7. In case you are required to file GSTR-9C (Reconciliation statement and Certification); shall be enabled on the dashboard post filing of GSTR-9.",
		LBL_TXT_R9: "GSTR-9",
		LBL_TXT_R4X: "GSTR-4",
		LBL_HLP_TXT_R4X_22: "Click on ‘Prepare Online’;",
		LBL_HLP_TXT_R4X_23:
			"Select from the questionnaire page, whether you wish to file ‘Nil’ GSTR-9.",
		LBL_HLP_TXT_R4X_24:
			"You may download the draft system generated GSTR-9, summary of GSTR-1 and summary of GSTR-3B from GSTR-9 dashboard for your reference.",
		LBL_HLP_TXT_R4X_25:
			"If number of records/lines are less than or equal to 500 records per table (Table 17 and table 18), then you may use this facility.",
		LBL_HLP_TXT_R4X_26:
			"Fill in the details in different tables and click on ‘Compute liabilities’.",
		LBL_HLP_TXT_R4X_27:
			"Facility to preview draft (PDF or Excel) can be used to check the details filled up in the tables.",
		LBL_HLP_TXT_R4X_28:
			"Click on ‘Proceed to file’ and ‘File GSTR-9’ with DSC/EVC.",
		LBL_HLP_TXT_R4X_29:
			"Additional liability, if any declared in this return can be paid through Form GST DRC-03 by selecting ‘Annual return’ from the dropdown in the said form. Such liability can be paid only through cash.",
		LBL_HLP_TXT_R4X_30:
			"Verify the details in preview page and click on ‘Continue’ button to navigate to payment table.",
		LBL_HLP_TXT_R4X_31:
			"File the return by clicking of ‘File GSTR-4 with DSC/EVC’ button while paying additional liabilities, if any.",
		LBL_HLP_TXT_R4X_32:
			"Download the GSTR-4 offline tool from the ‘Downloads’ section in the pre-login page on the portal and install it on your computer.",
		LBL_HLP_TXT_R4X_33:
			"Click on ‘Upload/download json’ or ‘Prepare Offline’ and then click on ‘Download’ tab to download auto-drafted GSTR-9 or GSTR-4 details, if any;",
		LBL_HLP_TXT_R4X_34:
			"Follow instructions in ‘GSTR-9 offline tool’ or ‘GSTR-4 offline tool’ to add details and generate JSON file for upload;",
		LBL_HLP_TXT_R4X_35:
			"Click on ‘Upload’ tab to upload JSON file and file the return with the instructions available on GSTR-9 or GSTR-4 dashboard.",
		LBL_DASH_TXT_53:
			"Download the GSTR-4 offline tool from the ‘Downloads’ section in the pre-login page on the portal.",
		GSTR4X_UP1: "Click on ‘Choose file’ to upload the JSON file.",
		GSTR4X_UP2:
			"Upon successful upload of JSON file, status will be displayed as ‘Processed’. If upload is not successful for some records, then error report will be generated.",
		GSTR4X_UP3:
			"Download error JSON file by clicking on hyper link ‘Download error report’.",
		GSTR4X_UP4:
			"Import the error JSON file into offline tool to make required changes.",
		LB_GEN_FIL_EXCEL_GSTR4X: "Download GSTR-4 Summary (EXCEL)",
		LB_GEN_FIL_PDF_GSTR4X: "Download GSTR-4 Summary (PDF)",
		LB_GEN_FIL_JSON_GSTR4X: "Download GSTR-4 (JSON)",
		LBL_PDF_1: "FORM GSTR-4",
		LBL_PDF_2: "[See rule 62]",
		LBL_PDF_3:
			"Return for financial year of registered person who has opted for Composition levy or availing benefit of notification No. 02/2019- Central Tax (Rate)",
		LBL_PDF_4: "Year",
		LBL_GSTN: "GSTIN",
		LBL_NEG_TAX_1:
			"Note: The amount of tax paid is displayed as ‘Zero’ since no payment has been made. Excess amount paid through Form GST CMP-08 than liability declared in GSTR-4 can be seen in the negative liability statement. Excess amount of ₹",
		LBL_NEG_TAX_2:
			" has been posted in the said statement and can be utilized to discharge future liabilities.",
		SYS_COMP_PDF: "GSTR-3B SYSTEM COMPUTED (PDF)",
		LBL_LG_NAME: "Legal name of the registered person",
		LBL_TRD_NAME: "Trade Name",
		AGT_TURN_OVER: "Aggregate turnover in the preceding Financial Year",
		LBL_ARN: "ARN",
		LBL_DATE_ARN: "Date of ARN",
		LBL_PDF_TABLE_HEAD23:
			"Note: All amounts displayed in the tables are in ₹",
		LBL_PDF_4A_HEAD:
			"4A - Inward supplies received from a registered supplier (other than supplies attracting reverse charge)",
		LBL_PDF_4B_HEAD:
			"4B - Inward supplies received from a registered supplier (supplies attracting reverse charge)",
		LBL_PDF_4C_HEAD:
			"4C - Inward supplies received from an unregistered supplier",
		LBL_PDF_4D_HEAD: "4D - Import of service",
		LBL_PDF_5_HEAD:
			"5. Summary of self-assessed liability as per FORM GST CMP-08",
		LBL_PDF_5_SUB_HEAD:
			"(Net of advances, credit and debit notes and any other adjustment due to amendments etc.)",
		LBL_PDF_6_HEAD:
			"6. Tax rate wise details of outward supplies / inward supplies attracting reverse charge during the year",
		LBL_PDF_6_SUB_HEAD:
			"(Net of advances, credit and debit notes and any other adjustment due to amendments etc.)",
		LBL_PDF_7_HEAD: "7. TDS/TCS Credit received",
		LBL_PDF_8_HEAD: "8. Tax, interest, late fee payable and paid",
		LBL_PDF_TABLE_HEAD1: "No. of records",
		LBL_PDF_TABLE_HEAD2: "Taxable value",
		LBL_PDF_TABLE_HEAD3: "Integrated tax",
		LBL_PDF_TABLE_HEAD4: "Central tax",
		LBL_PDF_TABLE_HEAD5: "State/UT tax",
		LBL_PDF_TABLE_HEAD6: "Cess",
		LBL_PDF_TABLE_HEAD7: "Tax amount",
		LBL_PDF_TABLE_HEAD8: "Outward supplies (including exempt supplies)",
		LBL_PDF_TABLE_HEAD9:
			"Inward supplies attracting reverse charge including import of services",
		LBL_PDF_TABLE_HEAD10: "Tax paid (1+2)",
		LBL_PDF_TABLE_HEAD11: "Interest paid, if any",
		LBL_PDF_TABLE_HEAD12: "Amount",
		LBL_PDF_TABLE_HEAD24: "INR",
		LBL_TAX_TYPE: "Type of tax",
		LBL_PDF_TABLE_HEAD13: "Tax amount payable (As per table 6)",
		LBL_PDF_TABLE_HEAD14:
			"Tax Amount already paid/ payable (Through FORM GST CMP-08 )",
		LBL_PDF_TABLE_HEAD15: "Adjustment of negative liability, if any",
		LBL_PDF_TABLE_HEAD16: "Tax paid",
		LBL_PDF_TABLE_HEAD17: "Interest paid",
		LBL_PDF_TABLE_HEAD18: "Late fee paid",
		LBL_PDF_TABLE_HEAD19: "Total",
		LBL_PDF_TABLE_HEAD20: "Tax payable",
		LBL_PDF_TABLE_HEAD21: "Interest payable",
		LBL_PDF_TABLE_HEAD22: "Late fee payable",
		LBL_TABLE_HEAD_1: "Sr. no.",
		LBL_TABLE6_3: "Value",
		LBL_TABLE6_1: "Type of supply (Outward/Inward)",
		LBL_TABLE6_2: "Rate of tax (%)",
		LBL_TABLE6_4: "Inward",
		LBL_TABLE6_5: "Outward",
		LBL_NILFIL_GSTR4: "File Nil GSTR-4",
		LBL_TABLE7_HEAD_2: "Gross value",
		LBL_GSTR4_DECLARATION:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.",
		LBL_INTR_STAT: "Intra-State Supplies attracting IGST",
		LBL_INV_UPLD_GSTR4X: "Upload GSTR-4 (Annual) JSON File(Offline Tool)",
		LBL_IMPRT_OVERSEA: "Import of goods from overseas on bill of entry",
		LBL_IMPRT_SEZ:
			"Import of goods from SEZ units / developers on bill of entry",
		LBL_OVERSEA: "Import of goods from overseas on bill of entry",
		LBL_SEZ: "Import of goods from SEZ units / developers on bill of entry",
		LBL_PRTD: "PART-D",
		LBL_SEARCH_2A: "Search : ",
		LBL_POS_1: "Place of supply",
		LBL_POS_2: " (Name of State/ UT)",
		LBL_BOE_DETAILS: "Bill of entry details",
		LBL_AMENDED: "Amended",
		LBL_NO_RECS: "No record(s) found for the relevant input.",
		LBL_DWNLD_DETAILS: "Download Documents (CSV)",
		LBL_ADV_SEARCH: "Advanced Search",
		LBL_BOE_NUMBER: "Bill of entry number",
		LBL_TRADE_NAME_2A: "Trade name",
		LBL_NOT_MSG: "Note - ",
		LBL_ADV_SRCH_NOTE:
			"Reference date of the bill of entry should lie within the selected period.",
		LBL_IGATE_REFRNC_DATE: "ICEGATE Reference Date",
		LBL_TAX_VAL_RUP: "Taxable value (₹)",
		LBL_IGST_RUP: "Integrated tax (₹)",
		LBL_CESS_RUP: "Cess (₹)",
		LBL_REC_PER_PAGE: "Records Per Page : ",
		LBL_BOEMAX_LENGTH:
			"BOE should be minimum of 4 digits and maximum of 7 digits",
		LBL_MAINJS_ERR14:
			"Date is Invalid. Date of Bill of Entry number cannot be before the date of registration",
		LBL_MAINJS_ERR15: "Date does not exists in the calendar",
		LBL_MAINJS_ERR9:
			"Date is Invalid. Date of Bill of Entry number cannot exceed the current tax period",
		LBL_AMENDMENT_HISTORY: "Amendment History",
		ERR_LINE_ITEM: "Do enter correct line item",
		LBL_REV_TAX_VALUE: "Revised Taxable Value (₹)",
		HEAD_POS: "Place of supply",
		HEAD_NOTE_SPLY_TYP: "Note supply type",
		LBL_INTEG_TAX_R: "Integrated tax (₹)",
		LBL_CENTR_TAX_R: "Central Tax (₹)",
		LBL_ST_UT_TAX_R: "State/UT Tax (₹)",
		ERR_VAL_REG_GSTIN_ITC02A_CANCELLED:
			"GSTIN of the transferee has been cancelled. Enter a valid GSTIN of the same PAN for transfer of ITC.",
		SUP_GSTIN_LBL: "Supplier GSTIN",
		LBL_GSTR6_CHK_DUP3: "Credit/Debit Note No. cannot be ",
		LBL_GSTR6_CHK_DUP4: "Document No. cannot be ",
		LBL_GSTR6_CHK_DUP5: "Invoice No. cannot be ",
		LBL_GSTR6_CHK_DRCR_DUP3: "Debit/Credit Note No. cannot be ",
		COMP_REPORT_FLAG: "COMP_REPORT_FLAG",
		LBL_RUPEE_SYMBL: "Amounts in (₹)",
		LBL_CREDIT_LIABILITY_STMT_NEW:
			"Tax liability and ITC statement (Summary)",
		LBL_TAX_LIABILITY_GSTR1_GSTR3B_NEW_IFF:
			"Tax liability as per GSTR-1/IFF and as per GSTR-3B [As per report no. 1 & 3]",
		LBL_TAX_LIABILITY_GSTR1_GSTR3B_NEW:
			"Tax liability as per GSTR-1 and as per GSTR-3B [As per report no. 1 & 3]",
		LBL_ITC_CL3B_ACC2A_2B:
			"ITC claimed in GSTR-3B and accrued as per GSTR-2A/2B [As per report no. 4 & 5]",
		LBL_ITC_CL3B_ACC2B:
			"ITC claimed in GSTR-3B and accrued as per GSTR-2B [As per report number 4 & 5]",
		LBL_GSTR1_R_NEW_IFF: "As per GSTR-1/IFF",
		LBL_GSTR1_R_NEW: "As per GSTR-1",
		LBL_GSTR3B_R_NEW: "As per GSTR-3B",
		LBL_ITC_GSTR3B_R_NEW: "As per GSTR-3B",
		LBL_ITC_GSTR2A_R_NEW: "As per GSTR-2A",
		LBL_ITC_GSTR2A_2B_R_NEW: "As per GSTR-2A/2B",
		LBL_ITC_GSTR2B_R_NEW: "As per GSTR-2B",
		TTL_DNLD_CSV: "Download (CSV)",
		LBL_LIABILITY_EXPORT_OTHER_NEW:
			"1. Tax liability other than export / reverse charge",
		LBL_LIABILITY_GSTR3B_A_NEW:
			"Tax liability declared in GSTR-3B during the month [as per table 3.1(a)]",
		LBL_LIABILITY_GSTR1_OTHER_NEW_IFF:
			"Tax liability declared in GSTR-1/IFF (other than reverse charge supply) during the month [as per table 4A, 4C, 5, 6C, 7, 9A, 9B, 9C, 10, 11]",
		LBL_LIABILITY_GSTR1_OTHER_NEW:
			"Tax liability declared in GSTR-1 (other than reverse charge supply) during the month [as per table 4A, 4C, 5, 6C, 7, 9A, 9B, 9C, 10, 11]",
		LBL_SHORTFALL_EXCESS_3BVS1_NEW_IFF:
			"Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-1/IFF)",
		LBL_SHORTFALL_EXCESS_3BVS1_NEW:
			"Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-1)",
		HEAD_IGST_R_NEW: "IGST",
		HEAD_CGST_R_NEW: "CGST",
		HEAD_SGST_UT_R_NEW: "SGST/UTGST",
		HEAD_CESS_RC_NEW: "CESS",
		LBL_LIABILITY_REVERSE_CHARGE_NEW:
			"2. Tax liability due to reverse charge",
		LBL_LIABILITY_GSTR3B_D_NEW:
			"Tax liability declared in GSTR-3B during the month [as per table 3.1(d)]",
		LBL_AMT_GSTR2A_NEW: "Amount auto-drafted in PART-A of GSTR-2A",
		LBL_AMT_GSTR2A_2B_NEW:
			"Amount auto-drafted in PART-A of GSTR-2A/GSTR-2B [As per table B2B, B2BA, CDNR, CDNRA]",
		LBL_AMT_GSTR2B_NEW:
			"Amount auto-drafted in GSTR-2B during the month [As per table B2B, B2BA, CDNR, CDNRA]",
		LBL_SHORTFALL_EXCESS_3BVS2A_NEW:
			"Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-2A)",
		LBL_SHORTFALL_EXCESS_3BVS2A_2B_NEW:
			"Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-2A/2B)",
		LBL_SHORTFALL_EXCESS_3BVS2B_NEW:
			"Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-2B)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2A_NEW:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-2A)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2A_2B_NEW:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-2A/2B)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2B_NEW:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-2B)",
		LBL_LIABILITY_EXPORT_SEZ_NEW:
			"3. Tax liability due to export and SEZ supplies",
		LBL_LIABILITY_GSTR3B_B_NEW:
			"Tax liability declared in GSTR-3B during the month [as per table 3.1(b)]",
		LBL_LIABILITY_GSTR1_NEW_IFF:
			"Tax liability declared in GSTR-1/IFF (Export and SEZ) during the month [as per table 6A, 6B, 9A, 9B, 9C]",
		LBL_LIABILITY_GSTR1_NEW:
			"Tax liability declared in GSTR-1 (Export and SEZ) during the month [as per table 6A, 6B, 9A, 9B, 9C]",
		LBL_CUMULATIVE_SHORTFALL_3BVS1_NEW_IFF:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-1/IFF)",
		LBL_CUMULATIVE_SHORTFALL_3BVS1_NEW:
			"Cumulative Shortfall (-)/ Excess (+) in liability (GSTR-3B - GSTR-1)",
		LBL_ITC_CREDIT_CLAIM_BTN_NEW:
			"4. Input tax credit claimed and due (Other than import of goods)",
		LBL_ITC_CLAIMED_3B_NEW:
			"ITC claimed in GSTR-3B during the month [as per table 4A(4)+4A(5)+4D(1)+4D(2)]",
		LBL_ITC_GSTR2A_NEW:
			"ITC auto-drafted in GSTR-2A during the month [as per PART-A, PART-B](Excluding RCM supplies)",
		LBL_ITC_GSTR2A_2B_NEW:
			"ITC auto-drafted in GSTR-2A during the month [as per PART-A, PART-B] / GSTR-2B [as per table B2B, B2BA, CDNR, CDNRA] (Exlcuding RCM supplies)",
		LBL_ITC_GSTR2B_NEW:
			"ITC auto-drafted in GSTR-2B during the month [as per table B2B, B2BA, CDNR, CDNRA] (Excluding RCM supplies)",
		LBL_SHORTFALL_EXCESS_3BVS2A_ITC_NEW:
			"Shortfall (-) /Excess (+) in ITC (GSTR-3B - GSTR-2A)",
		LBL_SHORTFALL_EXCESS_3BVS2A_2B_ITC_NEW:
			"Shortfall (-) /Excess (+) in ITC (GSTR-3B - GSTR-2A/2B)",
		LBL_SHORTFALL_EXCESS_3BVS2B_ITC_NEW:
			"Shortfall (-) /Excess (+) in ITC (GSTR-3B - GSTR-2B)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2A_ITC_NEW:
			"Cumulative Shortfall (-) /Excess (+) in ITC (GSTR-3B - GSTR-2A)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2A_2B_ITC_NEW:
			"Cumulative Shortfall (-) /Excess (+) in ITC (GSTR-3B - GSTR-2A/2B)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2B_ITC_NEW:
			"Cumulative Shortfall (-) /Excess (+) in ITC (GSTR-3B - GSTR-2B)",
		LBL_LIABILITY_IMPORT_NEW:
			"5. Input tax credit claimed and due (Import of goods)",
		LBL_ITC_CLAIMED_3B_IMP_NEW:
			"ITC claimed in GSTR-3B during the month [as per table 4A(1)]",
		LBL_ITC_GSTR2B_IMP_NEW:
			"ITC auto-drafted in GSTR-2B during the month [As per table IMPG, IMPG (SEZ)]",
		LBL_SHORTFALL_EXCESS_3BVS2A_ITC_IMP_NEW:
			" Shortfall (-)/ Excess (+) in ITC (GSTR-3B - GSTR-2B)",
		LBL_CUMULATIVE_SHORTFALL_3BVS2A_ITC_IMP_NEW:
			"Cumulative Shortfall (-)/ Excess (+) in ITC (GSTR-3B - GSTR-2B)",
		LBL_ITC_CL3B_ACC2A_NEW:
			"ITC claimed in GSTR-3B and accrued as per GSTR-2A [As per report no. 4]",
		GST_RETURN_VER: "GST_RETURN_VER",
		DISCLAIMER:
			"The ‘Download Comparison reports (Excel)’ feature will work on the browsers of Google Chrome 49+, Firefox 45+ and Internet Explorer Edge version. It will not work on browser of Internet Explorer version 11 and below.",
		TTL_DNLD_EXCEL: "Download Comparison reports (Excel)",
		LBL_UPLOAD_RECIPIENT: "Uploaded by Recipient",
		GSTR2A_TITLE_BACK: "Click here to go back to previous page",
		GSTR2A_TITLE_DWNLD_CSV:
			"Click here to download the table data in csv file",
		GSTR2A_TITLE_SORT: "Click here to sort the details by this column",
		GSTR2A_TITLE_AMD_HIST_IMPG:
			"Click here to view complete amendment history (IMPG)",
		GSTR2A_TITLE_AMD_HIST_IMPGSEZ:
			"Click here to view complete amendment history (IMPGSEZ)",
		GSTR2A_TITLE_RECPERPG:
			"Click here to select number of records to be viewed per page",
		GSTR2A_TITLE_SEARCH:
			"Only numbers(0-9), characters(A-Z), space and special characters(/ - .) are allowed",
		GSTR6A_EXCEL_DOWNLOAD_HELP_TEXT:
			"Inward supplies details in GSTR-6A, auto drafted on the basis of GSTR-1/5, can be downloaded as Excel file. If number of records are up to 500, Excel file will be generated instantly. However, if  number of  records are more than 500, the Excel file generation may take up to 20 minutes.",
		MANAGE_PROFILE_HEAD: "Opt-in For Quarterly Return",
		MANAGE_PROFILE_FEATURE:
			"The GST council has recommended a new scheme of Quarterly return with monthly payment for small taxpayers. Based on this scheme, the taxpayers whose Annual aggregate turnover (AATO) is less than 5cr in previous year can opt for this scheme. The scheme features would be made available soon.",
		MANAGE_PROFILE_AATO: "Annual Aggregate Turnover (AATO) for FY ",
		MANAGE_PROFILE_AATO_LOGIC: "AATO logic",
		MANAGE_PROFILE_ADVISORY: "Advisory",
		MANAGE_PROFILE_DUE_DATE: "Due dates of FY",
		MANAGE_PROFILE_FREQ: "Selected Frequency",
		MANAGE_PROFILE_SELECT_DATE: "Selection available from",
		MANAGE_PROFILE_APP_RETURNS: "Applicable return due dates",
		MANAGE_PROFILE_FORM_TYPE: "Form type",
		MANAGE_PROFILE_FORM_GSTR1: "GSTR - 1",
		MANAGE_PROFILE_FORM_GSTR3B: "GSTR - 3B",
		MANAGE_PROFILE_MONTH_M1: "Month 1",
		MANAGE_PROFILE_MONTH_M2: "Month 2",
		MANAGE_PROFILE_MONTH_M3: "Month 3",
		MANAGE_PROFILE_5CR:
			"The Quarterly filing frequency is not available for you as your Annual Aggregate Turnover for Previous Financial Year is more than ",
		MANAGE_PROFILE_MONTHLY: "Monthly",
		MANAGE_PROFILE_QUARTERLY: "Quarterly",
		MANAGE_PROFILE_GSTP:
			"Return filing preference for the selected return period is not yet defaulted. Please ask the taxpayer to select the return filing preference for proceeding further.",
		MANAGE_PROFILE_SAVE: "SAVE",
		MANAGE_PROFILE_GITA: "GITA",
		MANAGE_PROFILE_DASHBOARD: "Continue to Returns Dashboard",
		MANAGE_PROFILE_MODAL1:
			"Are you sure you would like to file your GSTR-1 and GSTR-3B for the",
		MANAGE_PROFILE_MODAL2: "at",
		MANAGE_PROFILE_MODAL3: "frequency ?",
		MANAGE_PROFILE_DASHBOARD1:
			"Filing frequency (Monthly / Quarterly) for the selected quarter is not selected. Please select the preference by clicking",
		MANAGE_PROFILE_DASHBOARD2: "here",
		MANAGE_PROFILE_DASHBOARD3: "to proceed further.",
		MANAGE_PROFILE_FYERROR: "No applicable Financial Year is available.",
		MANAGE_PROFILE_QTRERROR:
			"No applicable Quarters are available for the selected Financial Year.",
		MANAGE_PROFILE_MONTEXT:
			"Monthly: You will have to file your GSTR-1 and GSTR-3B every month. Generally, the date for filing GSTR-1 and GSTR-3B falls before the 11th and 20th of the next month.",
		MANAGE_PROFILE_QTRTEXT:
			"Quarterly: You will have to file your GSTR-1 and GSTR-3B every quarter with one payment challan to be made every month.",
		MANAGE_PROFILE_SUCCESS: "Your profile has been saved successfully.",
		MANAGE_PROFILE_DEFAULT: "Your profile has been defaulted as ",
		MANAGE_PROFILE_ERRPROF:
			"The profile for the selected quarter has already been saved.",
		SYS_GEN_PDF: "SYSTEM GENERATED GSTR-3B",
		ADVISORY_MSG_R1R2B_1:
			"System has generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 filed by you for the current return period. System has generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B generated for the current return period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B.",
		ADVISORY_MSG_R1R2B_2:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 filed by you for the current return period. System has generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B generated for the current return period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1101> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_3:
			"System has generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 filed by you for the current return period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B generated for the current return period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1102> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_4:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 filed by you for the current return period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B generated for the current return period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1103> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_5:
			"System has generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 filed by you for the current return period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B, as the same is not yet generated for the current return period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1104> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_6:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 filed by you for the current return period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B, as it not yet generated for the current return period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1105> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_7:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 as it is not filed by you for the current return period. System has generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B generated for the current return period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1106> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_8:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 as it is not filed by you for the current return period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B generated for the current return period. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1107> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_9:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B based on your GSTR-1 as it is not filed by you for the current return period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B based on your GSTR-2B generated for the current return period. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1108> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_10:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B on the basis of your GSTR-1 filed by you for the current tax period. System has generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B  on the basis of your GSTR-2B generated for the current tax period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1109> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_11:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B on the basis of your GSTR-1 filed by you for the current tax period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B  on the basis of your GSTR-2B generated for the current tax period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1110> when you contact customer care for quick resolution.",
		ADVISORY_MSG_R1R2B_12:
			"System has not generated summary of Table 3.1 (a, b, c, e) and Table 3.2 of FORM GSTR-3B on the basis of your GSTR-1 filed by you for the current tax period. System has not generated summary of Table 3.1(d) and Table 4 of FORM GSTR-3B  on the basis of your GSTR-2B generated for the current tax period. To view the system generated details, you may click on System generated PDF button available in the GSTR-3B dashboard page. You may continue to save or file your FORM GSTR-3B. If error persists, quote error number <RT-R2BR3B-1111> when you contact customer care for quick resolution.",
		GSTR2B_3B_SUMMARY_TBL_LBL: "System generated summary for GSTR-3B:",
		GSTR1_EINV_HELP1:
			"If the records are upto 500, the file with details from e-invoices can be downloaded instantly. If records exceed 500, last five files downloaded by you are shown here. Please click on link to download relevant file. To download file with latest details from e-invoices, please use 'Download details from e-invoices (Excel)' button.",
		GSTR1_EINV_SLNO: "Sl.No.",
		GSTR1_EINV_FILE_AVLBL_DWNLD: "File Available for Download",
		GSTR1_EINV_NOTE: "Note : ",
		GSTR1_EINV_HELP2:
			"Based on e-invoices reported, System has auto-populated details for relevant period of GSTR-1 in relevant Tables: 4A, 4B, 6B, 6C (B2B Invoices), 6A (Export invoices), 9B (Credit/Debit Notes - Registered), 9B (Credit/Debit Notes - Unregistered).",
		GSTR1_EINV_HELP3:
			"You are requested to review the auto-populated details.",
		GSTR1_EINV_HELP4:
			"[Note: In respect of Table 7 (B2C supplies other than under Table 5), no records have been auto-populated. You are required to add these details in GSTR-1 (through offline utility or by entering online).] ",
		GSTR1_EINV_HELP5:
			"This excel file can be imported into GSTR-1 Offline tool as well.",
		GSTR1_EINV_DOWNLOAD_EXCEL: "DOWNLOAD DETAILS FROM E-INVOICES (EXCEL)",
		GSTR1_TOOLTIP_EINV_CSV:
			"Based on e-invoices reported, system has auto-populated details for relevant period of GSTR-1 in relevant Table 4A, 4B, 4C, 6B, 6C. You may like to review them.",
		GSTR1_EINV_REC: "GSTIN/UIN of Recipient",
		ERR_NO_EINV_CSV_B2B:
			"There are no e-invoices reported for this period of GSTR-1 in Table 4A,4B,4C,6B,6C",
		HEAD_B2B: "B2B - Add Invoice",
		HEAD_B2BE: "B2B - Edit Invoice",
		HEAD_CRED_DEB_DET_EDIT: "Credit/Debit Notes- Edit Details",
		TTL_EXPRT_EDIT_DETLS: "Exports - Edit Details",
		TTL_EXPRT_ADD: "Exports - Add Details",
		TTL_EXPRT_DETLS: "Exports - Details",
		LBL_GST3BQ_QUARTERLY_RETURN: "GSTR-3BQ - Quarterly Return",
		LBL_PDF_3B1: "Form GSTR-3B",
		LBL_PDF_3B2: "[See rule 61(5)]",
		LBL_PDF_3B3: "Year",
		LBL_PDF_5A1: "Financial Year",
		LBL_PDF_3B4: "Month",
		LBL_PDF_3B5: "1. GSTIN",
		LBL_PDF_3B6: "2(a). Legal name of the registered person",
		LBL_PDF_3B7: "3.1 Tax on outward and reverse charge inward supplies",
		LBL_PDF_3B8: "Nature of Supplies",
		LBL_PDF_3B9: "Inter- State supplies",
		LBL_PDF_3B10: "Intra- State supplies",
		LBL_PDF_3B11:
			"From a supplier under composition scheme, Exempt and Nil rated supply",
		LBL_PDF_3B12: "Non-GST supply",
		LBL_PDF_3B13: "5.1 Interest and Late fee",
		LBL_PDF_3B14: "Interest",
		LBL_PDF_3B15: "Late fee",
		LBL_PDF_3B16: "6.1 Payment of tax",
		LBL_PDF_3B17: "Description",
		LBL_PDF_3B18: "Total tax payable",
		LBL_PDF_3B19: "Tax paid through ITC",
		LBL_PDF_3B20: "Tax/Cess paid in cash",
		LBL_PDF_3B21: "Interest paid in cash",
		LBL_PDF_3B22: "Late fee paid in cash",
		LBL_PDF_3B23: "(A) Other than reverse charge",
		LBL_PDF_3B24:
			"(a) Outward taxable supplies (other than zero rated, nil rated and exempted)",
		LBL_PDF_3B25: "(b) Outward taxable supplies (zero rated)",
		LBL_PDF_3B26: "(c) Other outward supplies (Nil rated, exempted)",
		LBL_PDF_3B27: "(d) Inward supplies (liable to reverse charge)",
		LBL_PDF_3B28: "(e) Non-GST outward supplies",
		LBL_PDF_3B29: "3.2 Inter-state supplies",
		LBL_PDF_3B30: "Supplies made to Unregistered Persons",
		LBL_PDF_3B31: "Supplies made to Composition Taxable Persons",
		LBL_PDF_3B32: "Supplies made to UIN holders",
		LBL_PDF_3B33: "4.  Eligible ITC",
		LBL_PDF_3B34: "A. ITC Available (whether in full or part)",
		LBL_PDF_3B35: "C. Net ITC available (A-B)",
		LBL_PDF_3B36: "D. Ineligible ITC",
		LBL_PDF_3B37: "5. Exempt, nil and Non GST inward supplies",
		LBL_PDF_3B38: "B. ITC Reversed",
		LBL_PDF_3B39: "6.2. TDS/TCS Credit",
		LBL_PDF_3B40: "(B) Reverse charge",
		LBL_PDF_3B41: "Period",
		LBL_PDF_3B42: "2(b). Trade name, if any",
		LBL_PDF_3B43: "2(c). ARN",
		LBL_PDF_3B44: "2(d). Date of ARN",
		LBL_PDF_3B45: "(1) Import of goods",
		LBL_PDF_3B46: "(2) Import of services",
		LBL_PDF_3B47:
			"(3) Inward supplies liable to reverse charge (other than 1 & 2 above)",
		LBL_PDF_3B48: "(4) Inward supplies from ISD",
		LBL_PDF_3B49: "(5) All other ITC",
		LBL_PDF_3B50: "(1) As per rules 42 & 43 of CGST Rules",
		LBL_PDF_3B51: "(2) Others",
		LBL_PDF_3B52: "(1) As per section 17(5)",
		LBL_PDF_3B53: "Integrated Tax",
		LBL_PDF_3B54: "Central Tax",
		LBL_PDF_3B55: "State/UT Tax",
		LBL_PDF_3B56: "Cess",
		LBL_PDF_3B57: "Verification:",
		LBL_PDF_3B58:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed there from.",
		LBL_PDF_3B59: "Date:",
		LBL_PDF_3B60: "Signature",
		LBL_PDF_3B61: "Name of Authorized Signatory",
		LBL_PDF_3B62: "Designation /Status",
		LBL_PDF_3B63:
			"3.1 Details of Outward supplies and inward supplies liable to reverse charge",
		LBL_PDF_3B64:
			"3.2 Out of supplies made in 3.1 (a) above, details of inter-state supplies made",
		LBL_PDF_3B65:
			"5  Values of exempt, nil-rated and non-GST inward supplies",
		LBL_PDF_3B66: "Total Tax Payable (₹)",
		LBL_PDF_3B67: "Tax paid in cash (₹)",
		LBL_PDF_3B68: "Interest paid in cash (₹)",
		LBL_PDF_3B69: "Late fee paid in cash (₹)",
		LBL_PDF_3B70: " (₹)",
		LBL_PDF_3B71: "Central Tax(₹)",
		LBL_PDF_3B72: "(c ) Other outward supplies (nil rated, exempted)",
		LBL_PDF_3B73:
			"From a supplier under composition scheme, Exempt, Nil rated supply",
		LBL_PDF_3B74: "Non GST supply",
		AMAB2bINVR6_51: "Total Taxable Value (₹)",
		DASHBOARD3B_1: "Facilitation in filing GSTR-3B",
		DASHBOARD3B_2:
			"The taxpayers who have opted to file GSTR-1 on monthly basis, the following new features are made available:",
		DASHBOARD3B_3:
			"The system computed summary of GSTR-3B is available on the basis of filed GSTR-1. It can be downloaded by clicking on ‘SYSTEM COMPUTED GSTR-3B (PDF)’ button.",
		DASHBOARD3B_4:
			"The summary is generated for tables 3.1 (a), (b), (c), (e) and table 3.2.",
		DASHBOARD3B_5:
			"The values so auto-drafted may be used to fill in relevant tables in FORM GSTR-3B.",
		DASHBOARD3B_6:
			"The System computed summary will also be sent to your registered email ID.",
		DASHBOARD3B_7:
			"This summary is generated for information and guidance purposes only. Please enter correct values, after due verification.",
		DASHBOARD3B_8:
			"The following new features are made available to taxpayers:",
		DASHBOARD3B_9:
			"The system computed summary of GSTR-3B is available on the basis of filed GSTR-1",
		DASHBOARD3B_10:
			"The system computed summary of GSTR-3B is available based on filed GSTR-1",
		DASHBOARD3B_11:
			"It can be downloaded by clicking on ‘SYSTEM GENERATED GSTR-3B’ button.",
		DASHBOARD3B_12:
			"The summary is generated for tables 3.1 (a), (b), (c), (e) and table 3.2 from filed GSTR-1",
		DASHBOARD3B_13:
			"Table 3.1(d) and 4(A)(1), (3), (4), (5) and 4(B)(2) is auto-drafted based on GSTR-2B.",
		DASHBOARD3B_14: "Note: ",
		IOSUP3B_HELP1:
			"The summary is generated for tables 3.1 (a), (b), (c), (e) based on filed GSTR-1",
		IOSUP3B_HELP2:
			"/IFF. Table 3.1(d) is not auto-drafted based on GSTR-1/IFF.",
		IOSUP3B_HELP3: ". Table 3.1(d) is auto-drafted based on GSTR-2B.",
		IOSUP3B_HELP4:
			"The values will be auto-drafted in each cells and would be editable.",
		IOSUP3B_HELP5: "/IFF. Table 3.1(d) is auto-drafted based on GSTR-2B.",
		IOSUP3B_HELP6: ". Table 3.1(d) is not auto-drafted based on GSTR-1.",
		INTERSTATESUP3B_HELP1:
			"The summary is generated for table 3.2 based on values declared in GSTR-1.",
		INTERSTATESUP3B_HELP3:
			"The summary is generated for table 3.2 based on values declared in GSTR-1/IFF.",
		INTERSTATESUP3B_HELP2:
			"The same would soon be made available for taxpayers filing GSTR-1 on quarterly basis.",
		ISDAMDADDINVPG2R6_13: "Error!",
		OUTWAR5ASUM_AM_TIT_4:
			"Taxable outward supplies made to consumers in India",
		OUTWAR5ASUM_AM_TIT_5: "Number Of Records",
		OUTWAR5ASUM_AM_TIT_5A:
			"Amendments to taxable outward supplies to non-taxable persons in India",
		HEAD_5A_B2CA_SUMM:
			"5A - Amendments to taxable outward supplies to non-taxable persons in India",
		OUTWAR5ASUM_AM_TIT_3:
			"Tax, interest, late fee and any other amount payable and paid",
		GSTR5ASUMM239: "Important Message",
		GSTR5ASUMM240:
			"Once you fill the details in relevant Tables, please submit the Form. Please be informed that once Submit  button is clicked,",
		GSTR5ASUMM241: "no modification will be allowed",
		GSTR5ASUMM242:
			"Entries with respect to liabilities  will get reflected in the respective ledgers.",
		GSTR5ASUMM243:
			"Please ensure that you have sufficient balance in Cash ledger to offset your tax liability. In case it is not, create challan at GST portal and make payment. Payments so made shall get reflected in cash ledger. After that do the set off of liabilities and file GSTR-5A.",
		GSTR5A_TTIP_BACK: "Click here to navigate to Returns dashboard page",
		GSTR5A_TTIP_DWNLD: "Click here to download Form GSTR-5A in PDF format",
		GSTR5A_TTIP_PROCEED:
			"Click here to compute the liabilities and proceed for filing",
		GSTR5A_TTIP_BACK2: "Click here to go back to previous page",
		GSTR5A_TTIP_EDIT: "Click here to edit the added record",
		GSTR5A_TTIP_DEL: "Click here to delete record",
		GSTR5A_TTIP_SAVE: "Click here to save the document details",
		GSTR5A_TTIP_ADD: "Click here to add details",
		GSTR5A_TTIP_ADDPOS: "Click here to add more POS",
		GSTR5A_TTIP_BACK3: "Click here to navigate to GSTR-5A dashboard page",
		GSTR5A_TTIP_FILEGSTR5A: "Click here to proceed for filing via DSC/EVC",
		GSTR5ASUMM297: "DOWNLOAD GSTR-5A (PDF)",
		LBL_GSTR5A_ERR1:
			"You have unsaved changes, Please click on SAVE before leaving this page.",
		LBL_GSTR5A_ERR2: "Data saved successfully",
		LBL_GSTR5A_ERR3: "Please enter the amount for transaction",
		LBL_GSTR5A_ERR4:
			"You do not have sufficient cash balance in Integrated Tax to utilize the available balance is ",
		LBL_TAB5_PDF1: "Place of supply (State/UT)",
		LBL_TAB5_PDF2: "Rate of tax",
		LBL_TAB5_PDF3: "Taxable value",
		LBL_TAB5_PDF4: "Integrated tax",
		LBL_TAB5_PDF5: "Cess",
		LBL_GSTR5A_PDF17: "Month",
		LBL_GSTR5A_PDF7: "2(a). Legal name of the registered person",
		LBL_GSTR5A_PDF8: "2(b). Trade name, if any",
		LBL_GSTR5A_PDF9:
			"3. Name of the Authorised representative in India filing the return",
		LBL_GSTR5A_PDF10: "4. Period ",
		LBL_GSTR5A_PDF10A: "4 (a). ARN",
		LBL_GSTR5A_PDF10B: "4 (b). Date of ARN ",
		LBL_GSTR5A_PDF11:
			"5.  Taxable outward supplies made to consumer in India",
		LBL_GSTR5A_PDF11A: "(Amounts in ₹ in all tables)",
		LBL_GSTR5A_PDF12:
			"5A. Amendments to taxable outward supplies to non-taxable persons in India",
		LBL_GSTR5A_PDF4: "Form GSTR-5A",
		LBL_GSTR5A_PDF5: "[See rule 64]",
		LBL_GSTR5A_PDF6:
			"Details of supplies of online information and database access or retrieval services by a person located outside India made to non-taxable persons in India",
		LBL_GSTR5A_PDF16: "6. Interest or any other amount",
		LBL_GSTR5A_PDF13:
			"7. Tax, Interest and any other amount payable and paid",
		LBL_GSTR5A_PDF1: "Amount payable",
		LBL_GSTR5A_PDF2: "Debit entry no.",
		LBL_GSTR5A_PDF3: "Amount paid",
		LBL_GSTR5A_PDF18: "Tax liability (based on table 5 & 5A)",
		LBL_GSTR5A_PDF19: "Interest (based on table 6)",
		LBL_GSTR5A_PDF20: "Others (based on table 6)",
		LBL_GSTR5A_PDF21: "Verification:",
		LBL_GSTR5A_PDF22:
			"I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed there from.",
		AMAB2bINVR6_52: "Integrated Tax",
		LBL_SRCH_BOE: "Search BoE Records",
		LBL_QRY_ICEGATE_HIST: "History of Query ICEGATE",
		LBL_RECRD_TYP: "Record Type",
		LBL_BOE_DTL: "BoE Details",
		LBL_PORT_CDE: "Port Code",
		LBL_BOE_NUM: "Bill of Entry Number",
		LBL_REF_DT: "Reference Date",
		LBL_REF_NUM: "Reference Number",
		ERR_MSG_REQ: "This field is mandatory.",
		LBL_QRY_ICEGTE:
			"Please click on 'Query ICEGATE' button to fetch updated details, if any from ICEGATE for this BoE record.",
		LBL_QRY_ICEGTE_BTN: "Query ICEGATE",
		LBL_HISTRY_OF_ICEGTE_BTN: "History of ICEGATE",
		LBL_NO_RCD_QRY_ICEGTE:
			"No record has been found in GST system for inputs provided. To query and fetch record from ICEGATE click on Query ICEGATE.",
		LBL_QRY_ICEGTE_REQ_MSG:
			"Your request for querying and retrieving data from ICEGATE has been acknowledged. To view the records use search option again or visit GSTR-2A after 10 min.",
		LBL_IMPG_HEAD: "IMPG result",
		LBL_IMPGSEZ_HEAD: "IMPGSEZ result",
		LBL_GSTR2A_PERIOD: "GSTR-2A Period",
		LBL_BOE_TIMESTAMP_MSG:
			"Time stamp, if present, with reference date is as per 24 Hrs format",
		LBL_BOE_DATA_FETCH_MSG:
			"In case on-demand fetching of data was used the result would show the latest BoE record as on that date. And complete amendment history may not available",
		LBL_BOE_TRADE_LEGAL_NAME: "Trade/Legal Name",
		LBL_BOE_PORT_CODE: "The Port Code accepts 6 alphanumeric characters.",
		LBL_SEARCH_BOE_NOTE:
			"Note :  Data is normally received from ICEGATE to GST system within two days from the reference date. You are requested to use this facility only in case data is not available after such period",
		ERR_HAV_ADDNL_LIAB_AND_LT_FEE:
			"You have tax liability and additional late fee arising due to short paid late fee and outstanding liability.",
		ERR_HAV_ADDNL_LT_FEE:
			"You need to pay additional late fee due to short paid late fees in previous return periods",
		GSTR6A_EXCEL_DOWNLOAD_HELP_TEXT_IFF:
			"Inward supplies details in GSTR-6A, auto drafted on the basis of GSTR-1/IFF/GSTR-5, can be downloaded as Excel file. If number of records are up to 500, Excel file will be generated instantly. However, if  number of  records are more than 500, the Excel file generation may take up to 20 minutes.",
		IFF_GSTR2A: "GSTR-1/IFF/5/6/7/8",
		NOT_IFF_GSTR2A: "GSTR-1/5/6/7/8",
		RESET_FOR_IFF:
			"All the details saved in different tables shall be deleted after reset. Are you sure, you want to reset the already saved data?",
		LBL_QTR: "Quarter",
		LBL_PRD: "Period",
		LBL_QTR_FRQ_MSG1:
			"You have selected to file the return on quarterly frequency, you are required to file GSTR-1 and GSTR-3B for the last month of the quarter.",
		LBL_QTR_FRQ_MSG2:
			"If you intend to furnish invoices for the current month, it can be done by using the Invoice Furnishing Facility (IFF).",
		LBL_MON_FRQ_MSG:
			"You have selected to file the return on monthly frequency, GSTR-1 and GSTR-3B shall be required to be filed for each month of the quarter.",
		LBL_QTR_FRQ_MSG:
			"You have selected to file the return on quarterly frequency and are required to file GSTR-1 and GSTR-3B for this period.",
		RET291125: "Date is invalid. Please enter a valid date.",
		GSTR6_AFTER_CAN_ISD_COMMON:
			"Document date should be before the effective date of cancellation of registration.",
		GSTR6_BEFORE_REG_ISD_COMMON:
			"Document date should be on or after the date of grant of registration.",
		ERR_REG_CTIN_COMMON:
			"GSTIN entered is invalid. Please enter a valid GSTIN.",
		ERR_REG_CTIN_COMMON_SUP:
			"GSTIN of supplier is not valid. Enter valid GSTIN of supplier.",
		ERR_REG_CTIN_COMMON_ISD:
			"GSTIN of unit should be based on the same PAN for distribution of credit by ISD. Enter valid GSTIN of the unit.",
		LBL_FILING_STATUS_R1R5: "GSTR-1/GSTR-5 Filing Status",
		LBL_FILING_PERIOD_R1R5: "GSTR-1/GSTR-5 Filing Period",
		LBL_FILING_STATUS_R1R5_IFF: "GSTR-1/IFF/GSTR-5 Filing Status",
		LBL_FILING_PERIOD_R1R5_IFF: "GSTR-1/IFF/GSTR-5 Filing Period",
		LBL_COUNT_PARTY_PERIOD_R6: "Counter Party Filing Period",
		LBL_QUAR: "Payment made in quarter",
		LBL_CHLN_QTR_RTN: "Challan payment towards quarterly return",
		LBL_TYP_CHLN: "Type of Challan",
		LBL_CHLN_NO: "Challan Number (CPIN)",
		LBL_TAX_AMT_RS: "Tax Amount (Rs.)",
		LBL_DAT_DEP: "Date of Deposit",
		LBL_TME_DEP: "Time of Deposit",
		LBL_TOT_AMT_PAID: "Total amount paid (Rs.)",
		LBL_ITAX_RS: "Integrated Tax (Rs.)",
		LBL_CTAX_RS: "Central Tax (Rs.)",
		LBL_STAX_RS: "State/UT Tax (Rs.)",
		LBL_CETAX_RS: "CESS (Rs.)",
		LG9029: "No Data Found",
		LBL_NOT_GENERATED: "Not Generated",
		LBL_ERROR_CODE: "Error Code",
		GSTR11_EXCEL_DOWNLOAD:
			"Download Auto Drafted details for GSTR-11 (Excel)",
		GSTR11_INITIMATE: "Initiate Pre-fill of GSTR-11",
		GSTR11_PREVIEW_PDF: "Preview Draft GSTR-11(PDF)",
		GSTR11_DOWNLOAD_PDF: "DOWNLOAD FILED GSTR-11(PDF)",
		GSTR11_EXCEL_DOWNLOAD_FIL: "Download FILED GSTR-11(EXCEL)",
		LBL_R11_PDF1: "Form GSTR-11",
		LBL_R11_PDF2: "[See rule (82)]",
		LBL_R11_PDF3:
			"Statement of inward supplies by persons having Unique Identification Number (UIN)",
		LBL_R11_PDF4: "1. UIN",
		LBL_R11_PDF5: "2(a). Name of the person having UIN",
		LBL_R11_PDF5B: "2(b). ARN",
		LBL_R11_PDF5C: "2(c). Date of ARN",
		LBL_R11_PDF6: "3. Summary of Inward Supplies Received",
		LBL_R11_PDF7: "3A -Summary of Invoices Received",
		LBL_R11_PDF8: "No. of Suppliers",
		LBL_R11_PDF9: "No. of Notes/Vouchers",
		LBL_R11_PDF10: "No. of invoices",
		LBL_R11_PDF11: "Total Notes/Vouchers/Invoice value",
		LBL_R11_PDF13: "Total Integrated Tax Paid",
		LBL_R11_PDF14: "Total Central Tax Paid",
		LBL_R11_PDF15: "Total State/UT  Tax Paid",
		LBL_R11_PDF16: "Total Cess Paid",
		LBL_R11_PDF17: "3B-Summary of Credit Notes Received",
		LBL_R11_PDF18: "3C-Summary of Debit Notes Received",
		LBL_R11_PDF1718: "3B-Summary of Credit/Debit Notes Received",
		LBL_R11_PDF19: "4 - Refund Summary",
		LBL_R11_PDF20: "Signature of authorized signatory",
		LBL_R11_SGUG: "SGST/UTGST",
		LBL_PREV_R11:
			"Preview is not available as no records have been added to GSTR-11 using Offline Tool",
		LBL_PREV_R11_1:
			"Tax  amount as declared here would be posted as refund amount in RFD-10 State wise and same is non-editable on higher side. Select Yes to proceed to File. No changes can be made in GSTR-11 after filing",
		LBL_PREV_R11_2:
			"The number of Invoices/Records that can be viewed and entered online for a table /section in Form GSTR-1 e.g. B2B, CDN is restricted to 500 invoice/record items only which can be comfortably browsed online. Taxpayer having invoices/records more than the said limit, may please use the  ”Offline Utility tool” available on the portal for viewing/modifying invoice data. Please download the data ( Prepare Offline &gt; Download Tab &gt; Generate File) and view it in the Offline Tool. This download feature will be made available shortly. To check further details on modifying the invoice using Offline Tool, please click on OK to learn more",
		LBL_PREV_R11_3:
			"The number of Invoices/Records that can be viewed and entered online for a table /section in Form GSTR-1 e.g. B2B, B2CL etc.  is restricted to 500 invoice/record items only which can be comfortably browsed online. Taxpayer having invoices/records more than the said limit, may please use the  ”Offline Utility tool” available on the portal for viewing/modifying invoice data. Please download the data ( Prepare Offline &gt; Download Tab &gt; Generate File) and view it in the Offline Tool. This download feature will be made available shortly. To check further details on modifying the invoice using Offline Tool, please click on OK to learn more",
		LBL_PREV_R11_4:
			"Gstin of supplier/receiver and Ecommerce cannot be same",
		DATE_ERR_MSG: "Date is Invalid.Please enter valid date.",
		GSTR3B_Q_INFO_MSG:
			"Table 3.1(a), (b), (c) and (e) are auto-drafted based on values provided in GSTR-1/IFF. Table 3.1(d) is not auto-drafted based on GSTR-1/IFF.",
		GSTR3B_Q_ERR_MSG:
			"The information entered by you in cells highlighted in red is in variance with the auto-populated data. The liability has been computed based on the information declared by you in your FORM GSTR-1/IFF. ",
		GSTR3B_Q_REL2: "Kindly recheck and proceed. ",
		GSTR3B_Q_REL3:
			"Please recheck and enter the correct values to enable ‘Proceed to Payment’ button. ",
		GSTR3B_Q_DASHBOARD_ERR_MSG:
			"For table 3.1 & 3.2 - The information entered by you in tiles which are highlighted in red are in variance with the auto-populated data. The liability has been computed based on the information declared by you in your FORM GSTR-1/IFF. ",
		ERR_INVALID_CTIN:
			"The GSTIN/UIN is invalid. Please enter a valid GSTIN/UIN.",
		ERR_INVALID_INV_NUM:
			"Document number should contain no special characters except '/'  and '-'. Document number cannot start with '-' and '/'",
		LBL_R11_HLP_HEADING: "Steps  to prepare GSTR-11 return Online",
		LBL_HLP_TXT_R11_2:
			"If number of records/lines are less than or equal to 500 records, then instant file download will happen else will take upto 20 mins to download.",
		LBL_HLP_TXT_R11_3:
			"The auto drafted excel cannot be imported in Offline tool.",
		LBL_HLP_TXT_R11_6:
			"The tax amounts shall not be considered as declared by supplier but shall be computed by system based on rate and taxable value.",
		LBL_HLP_TXT_R11_7:
			"The successfully auto-populated records in GSTR-11 can be viewed/edited /deleted in GSTR-11 (Online) in respective tables.",
		LBL_HLP_TXT_R11_9: "Steps to file your GSTR-11",
		LBL_HLP_TXT_R11_10: "Select the Declaration checkbox.",
		GSTR5A001: "Invalid offset data provided for filing.",
		GSTR2B3B_Q_DASHBOARD_ERR_MSG_1:
			"For table 3.1 & 3.2 - The information entered by you in tiles which are highlighted in red are in variance with the auto-populated data. The liability has been computed based on the information auto-populated from FORM GSTR-2B. ",
		GSTR2B3B_Q_DASHBOARD_ERR_MSG_2:
			"For table 3.1 & 3.2 - The information entered by you in tiles which are highlighted in red are in variance with the auto-populated data. The liability has been computed based on the information declared by you in your FORM GSTR-1/IFF and auto-populated from FORM GSTR-2B. ",
		GSTR2B3B_Q_DASHBOARD_ERR_MSG_3:
			"For table 4 - The information entered by you in tiles which are highlighted in red is in variance with the auto-populated data in table 4A and 4B. The input tax credit has been auto-populated based on the GSTR-2B generated for you. Also, please note that any variance above 5% of the input tax credit is in contravention to Rule 36(4) of the CGST Rules, 2017. ",
		GSTR2B3B_Q_DASHBOARD_ERR_MSG_4:
			"For table 4 - The information entered by you in tiles which are highlighted in red is in variance with the auto-populated data in table 4A. The input tax credit has been auto-populated based on the GSTR-2B generated for you. Also, please note that any variance above 5% of the input tax credit is in contravention to Rule 36(4) of the CGST Rules, 2017. ",
		GSTR2B3B_Q_DASHBOARD_ERR_MSG_5:
			"For table 4 - The information entered by you in tiles which are highlighted in red is in variance with the auto-populated data in table 4B. The input tax credit has been auto-populated based on the GSTR-2B generated for you. ",
		GSTR2B3B_Q_INFO_MSG_TABLE_3:
			"Table 3.1(a), (b), (c) and (e) are auto-drafted based on values provided in GSTR-1/IFF. Whereas Table 3.1(d) is auto-drafted based on GSTR-2B. ",
		GSTR2B3B_Q_ERR_MSG_1:
			"The information entered by you in cells highlighted in red is in variance with the auto-populated data. The liability has been computed based on the information auto-populated from FORM GSTR-2B. ",
		GSTR2B3B_Q_ERR_MSG_2:
			"The information entered by you in cells highlighted in red is in variance with the auto-populated data. The liability has been computed based on the information declared by you in your FORM GSTR-1/IFF and auto-populated from FORM GSTR-2B. ",
		GSTR2B3B_Q_ERR_MSG_3:
			"The information entered by you in cells highlighted in red is in variance with the auto-populated data in table 4A and 4B. The input tax credit has been auto-populated based on the GSTR-2B generated for you. Also, please note that any variance above 5% of the input tax credit is in contravention to Rule 36(4) of the CGST Rules, 2017. ",
		GSTR2B3B_Q_ERR_MSG_4:
			"The information entered by you in cells highlighted in red is in variance with the auto-populated data in table 4A. The input tax credit has been auto-populated based on the GSTR-2B generated for you. Also, please note that any variance above 5% of the input tax credit is in contravention to Rule 36(4) of the CGST Rules, 2017. ",
		GSTR2B3B_Q_ERR_MSG_5:
			"The information entered by you in cells highlighted in red is in variance with the auto-populated data in table 4B. The input tax credit has been auto-populated based on the GSTR-2B generated for you. ",
		MAINPAGE_1R6_334:
			"Distribution of input tax credit (ISD Invoices & ISD Credit notes)",
		LBL_REC_FOUND: "Number of records",
		LBL_POP_R7_17: "View balance available in cash ledger",
		MAINPAGE_1R6_133: "3 - Input tax credit received for distribution",
		MAINPAGE_1R6_168: "6B - Credit/debit notes received",
		MAINPAGE_1R6_202:
			"6A - Amendment of information furnished in earlier returns in Table 3",
		MAINPAGE_1R6_234: "6C - Amendment of credit/debit notes received",
		MAINPAGE_1R6_309:
			" 4 - Total ITC available and Eligible ITC/Ineligible ITC distributed",
		MAINPAGE_1R6_336:
			"5, 8 - Distribution of input tax credit (ISD Invoices & ISD Credit notes)",
		GSTR6_PTF_SUCCESS:
			"Proceed to File is In-Progress. Please check after sometime.",
		GSTR6_OFFSET:
			"Kind attention: Relevant amounts will be deducted from Electronic Cash Ledger against the late fee. Once the entries are made, these can not be reversed. Are you sure you want to continue?",
		GSTR_CHALLAN_MSG:
			"You do not have sufficient cash balance to pay off your liabilities. Kindly add  balance by clicking ‘Create Challan’ button and then file the return.",
		GSTR6_CONSOLIDATED_SUM: "Consolidated Summary",
		CON_LABEL1: "Eligibility",
		CON_LABEL2: "Tax amount (₹)",
		CON_LABEL3_REG:
			"5, 8 - Distribution of input tax credit (ISD Invoices & ISD Credit notes)-Registered",
		CON_LABEL3_UNREG:
			"5, 8 - Distribution of input tax credit (ISD Invoices & ISD Credit notes)-UnRegistered",
		CON_LABEL4_REG:
			"9 - Redistribution of ITC distributed in earlier returns-Registered",
		CON_LABEL4_UNREG:
			"9 - Redistribution of ITC distributed in earlier returns-UnRegistered",
		PREVIEW_GSTR6: "PREVIEW DRAFT GSTR-6",
		GSTR6_FILE_RETURN: "FILE RETURN",
		R6_FEE_PAID: "Late fee paid (₹)",
		R6_CASH_REQ: "Additional cash required(₹)",
		R6_CASH_BAL: "Cash balance",
		R6_PAYMENT: "Payment of fee",
		R6_DASH_BACK: "Back to GSTR-6 dashboard",
		R6_FIL_PDF: "Download Filed GSTR-6 (PDF)",
		ELGITC3B_183: "Close",
		ERR_IAMT_REQ: "Total IGST tax amount should be greater than zero",
		MOVE_MODAL:
			"<p>You have saved records in IFF for the selected quarter. Please click:<ul><li>'Yes', if you want to move the records and</li><li>'No', if you want to reset your IFF.</li></ul></p>",
		MOVE_YES:
			"Your request to move records from selected period is acknowledged. Post successful move to current period and summary generation, all the records would be removed from the selected period and be made available in this period.",
		MOVE_NO:
			"Your request to Reset the records Saved in IFF for the selected quarter is acknowledged.",
		MOV_YES: "YES",
		MOV_NO: "NO",
		REQ_ACC_MSG: "Request accepted successfully.",
		HSN_PLACEHOLDER: "To Add Details, Enter HSN Code/Description",
		HSN_HOVER_TITLE: "Enter HSN Code/Description",
		ERR_MANDATORY_TAX: "IGST or CGST + SGST Or Both is/are required",
		MIN_HSN_LENGTH: "Enter 3 or more characters to search",
		DEL_ALL_RECORDS:
			"All records entered in the table will be deleted, do you want to continue?",
		DEL_ALL_FIELDS:
			"All details entered in the fields will be deleted, do you want to continue?",
		ERR_REC_WITH_SAME_HSN_UQC_RATE:
			"Record with same HSN, UQC and Rate already exists.",
		LBL_ERR_DESC: "Error Description",
		LBL_DEL_RECORD: "Are you sure you want to delete the record?",
		BACK_WARNING_MSG:
			"Are you sure you want to continue? Any unsaved data will be lost.",
		LBL_PRO_ERR_RCD: "Processed Error Records",
		SAVE_ADD_TABLE_500_RECORDS:
			"You can add maximum of 500 records in this table. Please click on save or delete some records to proceed further.",
		LBL_SAVE_ALERT_HSN:
			"Note: Kindly click on save button after any modification( add, edit) to save the changes",
		SAVE_WARNING_HSN:
			"All records in Processed with error table will be removed. Please correct/delete records in Processed with error table before saving records in Add/Edit table.",
		DEL_SELECTED_RECORDS:
			"Selected records entered in the table will be deleted, do you want to continue?",
		PENDING_REC_MSG:
			"Your previous save request is in progress. Click on Proceed for updated status, you may continue to ‘Add records’. Try to save again once all pending document have been processed. To check updated status use ‘Refresh’ icon on top right.",
		NO_RECORDS_SELECTED:
			"Please select atleast one record in processed table to enable delete",
		LBL_POP_3B63:
			"You are proceeding for filing of form GSTR-3B. In case the tax liability declared in the current month, includes liability of previous months, then provide the breakup of such tax liability.",
		LBL_TAX_LIAB_BREAKUP: "TAX LIABILITY BREAKUP (VOLUNTARY)",
		HEAD_BKUP_TAX_LBLTY: "Breakup of tax liability",
		LBL_BRKUPPERIOD: "Period",
		BREAKUP_ERR_NEG:
			"The breakup of tax liability into different periods is not equal to the total tax liability declared in GSTR-3B for current return period. Please recheck and provide correct details.",
		BREAKUP_INFO:
			" In case the tax liability declared in the current month, includes liability of previous months, then provide the breakup of such tax liability.",
		BREAKUP_ER_PE1:
			"The breakup of tax liability could not be saved due to technical error. Please retry again. If error persists, quote error number <RT-3BBERR> when you contact customer care for quick resolution.",
		BREAKUP_ER_PE2: " when you contact customer care for quick resolution.",
		BREAKUP_SAVE:
			"Last breakup of tax liability save request has been processed successfully.",
		BREAKUP_IP:
			"The breakup of tax liability save request is under progress.",
		LIAB_IP: "Please try breakup of tax liability save after some time.",
		BREAKUP_ERR:
			"Your last SAVE request was unsuccessful. Kindly SAVE the details again.",
		BREAKUP_NIL_ERR:
			"The return period or the tax amount(s) cannot be blank or zero. Please select the return period and provide non-nil values under any tax head.",
		LBL_LTFEE_LINK: "Late Fee",
		LBL_LTFEE_DTLS: "Details of late fee levied",
		RET191222:
			"GSTR-1 for the period in which the document was originally reported has not been filed. Please file the same before amendment",
		LBL_FILING_DATE_R1R5_IFF: "GSTR-1/IFF/GSTR-5 filing date",
	},
	timestamp: 1626607797825,
	ttl: 10800000,
};
