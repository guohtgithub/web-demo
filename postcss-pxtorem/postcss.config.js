module.exports = {
	plugins:{
		'autoprefixer':{
			browsers:['Android >= 4.0','IOS >= 7']
		},
		'postcss-pxtorem':{
			rootValue:16,
			propList:['*']
		}
	}
}