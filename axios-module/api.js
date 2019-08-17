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