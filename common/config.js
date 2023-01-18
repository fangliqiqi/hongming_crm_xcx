const Config ={
	'development':{
		authUrl:'http://192.168.1.252',
		baseUrl:'http://192.168.1.252/crmwx-applet',
		elseUrl:'http://192.168.1.252/hmkj-message',
		changeUrl:'http://192.168.1.252/guns-cloud-system',
		contractUrl:'http://192.168.1.252/hmkj-crm'
	},
	'production':{
		authUrl:'https://www.hmtcrm.com',
		baseUrl:'https://www.hmtcrm.com/crmwx-applet',
		elseUrl:'https://www.hmtcrm.com/hmkj-message',
		changeUrl:'https://www.hmtcrm.com/guns-cloud-system',
		contractUrl:'https://www.hmtcrm.com/hmkj-crm'
	}
}

export default Config[process.env.NODE_ENV];