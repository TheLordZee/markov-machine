const fs = require('fs')
const axios = require('axios')

let path = process.argv[2]

function isValidUrl(str){
    let url;
    try{
        url = new URL(str);
    } catch(_){
        return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
}

function cat(path){
    try{
        let data = fs.readFileSync(path, 'utf8')
        return data
    }catch(err){
        console.log(`Error reading ${path}`)
        console.log(`Error: ${err}`);
        process.exit(1)
    }
}

async function webCat(url){
    try{
        let res =await axios.get(url)
        return res.data
    }catch(err){    
        console.log(`Error fectching ${url}`); 
        console.log(`Error: Request failed with status code ${err.response.status}`)
        process.exit(1)
    }
}

if(isValidUrl(path)){
    webCat(path)
}else{
    cat(path)
}

module.exports = {
    cat,
    webCat,
    isValidUrl
};