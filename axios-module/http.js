import axios from 'axios'
import QS from 'qs'
import {Toast} from 'vant'

// 使用vuex
import store from '@/store/index'

// 设置接口地址前缀
if(process.evn.NODE_ENV == 'development'){
	axios.defaults.baseURL = 'www.online.com'
}else if(process.env.NODE_ENV == 'debug'){
	axios.defaults.baseURL = 'www.debug.com'
}else if(process.env.NODE_ENV == 'production'){
	axios.defaults.baseURL = 'www.offline.com'
}

// 设置接口请求超时
axios.defaults.timeout = 10000

// post 请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
axios.interceptors.request.use( 
	config => {
		const token = store.state.token
		token && (config.headers.Authorization = token)
		return config
	},
	error => {
		return Promise.error(error)
	}
)

// 响应拦截
axios.interceptors.response.use(
	res =>{
		// 成功状态码 200
		if(res.status == 200){
			return Promise.resolve(res)
		}else{
			return Promise.resolve(res)
		}
	},
	error =>{
		if(error.response.status){
			switch (error.response.status){
				case 401: // 未登录
					router.replace({
						path:'login',
						query:{
							redirect:router.currentRoute.fullPath
						}
					})
					break;
				case 403: // token 过期
					Toast({
						message:'登录过期，请重新登录',
						duration:1000,
						forbidClik:false
					})
					// 清除token
					localStrage.removeItem('token');
					store.commit('loginSuccess',null)
					// 跳转登录页面，并将要浏览的页面的fullPath传过去，
					// 登录成功后跳转了、需要访问的页面
					setTimeout(() => {
						router.replace({
							path:'login',
							query:{
								redirect:router.currentRoute.fullPath
							}
						})
					},1000)
					break
				case 404: // 404请求不存在
					Toast({
						message:'网络请求不存在',
						duration:1500,
						forbidClik:true
					})
					break
				default:
					Toast({
						message:error.response.data.message,
						duration:1500,
						forbidClik:true
					})
			}
			return Promise.reject(error.response)
		}
	}
)

export function get(url,param){
	return new Promise((resolve,reject) =>{
		axios.get(url,{
			param
		}).then(res => {
			resolve(res.data)
		}).catch(err => {
			reject(err.data)
		})
	})
}

export function post(url,param){
	return new Promise((resolve,reject) => {
		axios.post(url,QS.stringify(param)
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err.data)
			})
	})
}