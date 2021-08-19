/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chains = {}
    for(let i = 0; i < this.words.length; i++){
      if(this.words[i] in chains){
        let word = this.words[i+1];
        chains[this.words[i]].push(word)
      }else{
        chains[this.words[i]] = [this.words[i+1]]
      }
    }
    return chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const keys = Object.keys(this.chains)
    let text = ''
    let prevWord;
    for(let i = 0; i <= numWords; i++){
      if(prevWord === undefined){
        let ranKey = keys[Math.floor(Math.random() * keys.length)]
        let ranWord = this.chains[ranKey][Math.floor(Math.random() * this.chains[ranKey].length)]
        if(ranWord !== undefined){
          text = text+ranWord+' '
          prevWord = ranWord
        }
      }else{
        let ranWord = this.chains[prevWord][Math.floor(Math.random() * this.chains[prevWord].length)]
        if(ranWord !== undefined){
          text = text+ranWord+' '
          prevWord = ranWord;
        }else{
          break
        }
      }
    }
    return text.trim();
  }
}

module.exports = {
  MarkovMachine
}