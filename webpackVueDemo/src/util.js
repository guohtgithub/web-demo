export function say(name){
  console.log('hello'+name)
}

export function getData(){
  return new Promise((resolve,reject) => {
    resolve('ok');
  })
}