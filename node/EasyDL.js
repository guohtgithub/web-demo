var https = require('https')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')
var fs = require('fs')

var port = 9999
app.use(bodyParser.json({
	'limit':'100mb'
}))
app.use(bodyParser.urlencoded({
	limit:'50mb',
	extended:true
}))

app.all('*',function(req,res,next){
	res.header("Access-Control-Allow-Origin",'*')
	res.header('Access-Control-Allow-Headers','X-Requested-With')
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
	res.header('X-Powered-BY','3.2.1')
	res.header('Content-Type','application/json;charset=utf-8')
	next()
})

var qs = require('querystring')
const param = qs.stringify({
	'grant_type':'client_credentials',
	'client_id':'xxxxx',
	'client_secret':'xxxxxxx'
})

function log(data){
	fs.writeFile('imgdata.txt',data,{
		'flag':'a'
	},function(err){
		if(err) throw err

		console.log('Hello.')
	})
}

app.post('/xxxdetectV1',function(req,res){
	var imgdata = req.body.imgdata
	imgdata = imgdata.replace('data:image/png;base64,','')
	log(imgdata)
	https.get({
		hostname:'aip.baidubce.com',
		path:'/oauth/2.0/token?'+param,
		agent:false
	},function(res2){
		res2.on('data',(d) => {
			console.log('djdjdjdj')
			let b = JSON.parse('' + d)
			var access_token = b["access_token"]
			console.log(access_token)
			data = {
				'image':imgdata
			}
			request_url = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/detection/XXXXDetectV1" + "?access_token=' + access_token

			request({
				url:request_url,
				method:"POST",
				json:true,
				headers:{
					"content-type":"application/json"
				},
				body:data,
			},function(err,res,body){
				console.log(err)
				if(!err && res.statusCode == 200){
					console.log(body)
					res.end(JSON.stringify(body))
				}
			});			
		});
	});
})

var server = app.listen(port,function(){
	var host = server.address().address
	var port = server.address().port
	console.log('djjddjdjdj, http://%s:%s',host,port)
})