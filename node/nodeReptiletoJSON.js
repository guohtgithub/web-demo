var request = require('request')
var cheerio = require('cheerio')
// var http = require('http')
// var path = require('path')
// var url = require('url')
var fs = require('fs')

// var superagent = require('superagent')

// superagent
//   .get('http://www.1905.com/vod/list/n_1_t_1/o1p2.html')
//   .end((err,res) =>{
//     var content = res.text;
//     var $ = cheerio.load(content)
//     var result = []
//     $('.search-list>div').each(function(index){
//       console.log(index,'----')
//       var newsTitle = $(this).find('p').text();
//       var news1Title = $(this).find('h3').text();
//       var code = $(this).find('i').text(); 
//       var newsUrl= $(this).find('a').attr('href');
//       var id = index*24+1
//       result.push({
//         title:newsTitle,
//         subtitle:news1Title,
//         code:code || 6,
//         imgurl:newsUrl,
//         id
//       })
//     })

//     result = JSON.stringify(result)
//     fs.writeFile('movie.json',result,'utf-8',err =>{
//       if(err == null)
//         console.log('保存成功！')
//     })
//   })

function show(item){
  request('http://www.1905.com/vod/list/n_1_t_1/o1p'+item+'.html',function(err,res){  
      if(err){  
          console.log('请求出错');  
      }else{  
          var $ = cheerio.load(res.body, {decodeEntities: false});
          var result = []
          $('.search-list>div').each(function(index){
            var subtitle = $(this).find('p').text();
            var title = $(this).find('h3').text();
            var code = $(this).find('i').text(); 
            var imgurl= $(this).find('img').attr('src');
            var id = index*24+1
            result.push({
              title,
              subtitle,
              code:code || 6,
              imgurl,
              id
            }) 
          });
          result = JSON.stringify(result)
          
          if(result != '[]'){
            fs.appendFile('movie.json',result,'utf-8',err =>{
              if(err == null){
                console.log('保存成功！')
                item++
                show(item)
              }
            })
          }
      }  
  });
}
show(1)
