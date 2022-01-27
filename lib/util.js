const colors = require('colors')
const theme = require('@shopify/themekit').command
const config = require('./configure')

const sendToShopify = async (action, src, cb) => {
  if (~config.get('ignore').indexOf(
    src.replace(/\/?dist\//, '')
  )) {
    console.log(`Ignoring: ${src}`.blue)
    return cb()
  }

  switch(action){
    case "upload":
      action = "deploy";
  }

  theme(action, {
      env: process.env.ENV,
      allowLive: true,
      files: [src]
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
