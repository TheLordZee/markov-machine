/** Command-line tool to generate Markov text. */
const fs = require('fs')
const axios = require('axios')
const {MarkovMachine} = require('./markov')
const {cat, webCat, isValidUrl} = require('./cat')

async function makeText(){
    if(process.argv.length !== 3){
        console.log('Error: missing arguments');
        process.exit(1)
    }
    let path = process.argv[2]
    let text;
    
    if(isValidUrl(path)){
        text = await webCat(path)
    }else{
        text = cat(path)
    }
    
    const machine = new MarkovMachine(text)
    console.log(machine.makeText())
}

makeText()