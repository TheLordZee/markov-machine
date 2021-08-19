const {MarkovMachine} = require('./markov')

describe('test MarkovMachine', () => {
    let machine;
    
    beforeEach(function(){
        machine = new MarkovMachine("the cat in the hat")
    })

    test('words should be properly parsed', () => {
        expect(machine.words).toEqual(["the", "cat", "in", "the", "hat"])
    })
    
    test('.makeChains should make chains of possible next words', () => {
        const chains = machine.makeChains()
        expect(chains).toEqual({
            "the": ["cat", "hat"], 
            "cat": ["in"], 
            "in": ["the"], 
            "hat": [undefined]
        })
    })
    
    test('text should be shorter than inputted number', () => {
        let text = machine.makeText()
        let words = text.split(/[ \r\n]+/);
        words = words.filter(c => c !== "");
        expect(words.length).toBeLessThanOrEqual(100)
        text = machine.makeText(50)
        words = text.split(/[ \r\n]+/);
        words = words.filter(c => c !== "");
        expect(words.length).toBeLessThanOrEqual(50)
    })
    
})