const { run } = require('runjs')

function runDev(){
   run('rm -rf ./wds')
   run('./node_modules/.bin/webpack --progress --profile --mode production')
   run('webpack-dev-server --mode development')
}

//build production
function buildProd1(){
    run('rm -rf ./build')
    run('webpack --config webpack/webpack.prod.js --progress --profile --mode production')
    run('rm -rf ./dist')
    run('mkdir dist')
    run('mkdir ./dist/logs')
    run('cp -r ./public ./dist')
    run('cp -r ./build/compiled ./dist/public')
    run('cp -r ./build/assets/index.html ./dist/')
    run('cp -r ./server ./dist')
}

function buildProd1(){
    //clear build
    run('rm -rf ./build')
    //compile prod
    run('webpack --config webpack.prod.config.server.js --progress --profile --mode production')
    //clear target folder
    run('rm -rf ../dist-geranium-serverside-render/*')
    //copy package.json and essential files
    run('cp -r ./prepared_files/. ../dist-geranium-serverside-render/')
    //copy build folder to target folder
    run('cp -r ./build/* ../dist-geranium-serverside-render/')
    //copy public folder
    run('cp -rf ./public ../dist-geranium-serverside-render')

}

function buildProd(){
    //run('rm -f ./index.html')
    //compile prod client
    run('webpack --config webpack.prod.config.client.js --mode production')
    run('webpack --config webpack.prod.config.server.js --mode production')
    run('mkdir dist')
    run('cp -rf ./public dist')
   run('cp -f ./build/index.html dist')
    run('cp -f ./build/server.js dist')
    run('cp -rf ./build/compiled dist/public')
   
}
module.exports={
   runDev,
   buildProd
  
}

