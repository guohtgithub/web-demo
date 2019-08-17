var request = require('request')
var cheerio = require('cheerio')
var mysql = require('mysql')

var con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'mytest'
})

con.connect()

// function getRegexp(url,dom){
// 	request(url,function(err,res,body){
// 		if(!err && res.statusCode == 200){
// 			$ = cheerio.load(body)
// 			var content = $(dom)
// 			var length = content.length
// 			console.log(length,'length')
// 		}
// 	})
// }

// getRegexp('https://any86.github.io/any-rule/','.list li.row')
// getRegexp('https://movie.douban.com/','.ui-slide-content li.ui-slide-item')

function show(item){
  request('http://www.1905.com/vod/list/n_1_t_1/o1p'+item+'.html',function(err,res){  
      if(err){  
          console.log('请求出错');  
      }else{  
          var $ = cheerio.load(res.body, {decodeEntities: false});
          $('.search-list>div').each(function(){
              var newsTitle = $(this).find('p').text();
              var news1Title = $(this).find('h3').text();
              var code = $(this).find('i').text(); 
              var newsUrl= $(this).find('a').attr('href');

              var addSql = "insert into movie(title,href,subtitle,code) values (?,?,?,?)"; 
              var addParmas = [newsTitle, newsUrl,news1Title,code];
              con.query(addSql,addParmas,function(err,data){  
              	console.log(err,'err')
                if(err){  
                    console.log("数据库连接错误");  
                }else{
                  item++; 
                  show(item)
                }
              })  
          }); 
      }  
  });
}

show(1)