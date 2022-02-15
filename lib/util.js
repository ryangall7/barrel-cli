const colors = require('colors')
const theme = require('@shopify/themekit').command
const config = require('./configure')

const sendToShopify = async (action, src, cb) => {

  let files = [];
  if(Array.isArray(src)){
    files = [...src]
  }else{
    files = [src]
  }

  files = files.filter((src) => {
    if (~config.get('ignore_files').indexOf(
      src.replace(/\/?dist\//, '')
    )) {
      console.log(`Ignoring: ${src}`.blue)
      return false;
    }else{
      return true;
    }
  });

  switch(action){
    case "upload":
      action = "deploy";
  }

  theme(action, {
      env: process.env.ENV,
      allowLive: true,
      files: files
    },{
      logLevel: 'error',
      cwd: "dist/"
    }).then(()=>{
      console.log(`[${action}] ${src}`.white);
      cb();
    }).catch((e)=>{
      console.log(`${e}`.red);
      cb(e);
    });
}

module.exports = {
  sendToShopify
}
