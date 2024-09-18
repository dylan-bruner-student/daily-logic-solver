var QUESTIONS = document.getElementsByClassName("geS5n");
var OP = 'mul';

var NUM_MAP = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function trySolve(prompt) {
    prompt = prompt.replace(',','').trim().toLowerCase();
    
    for (var i=0; i < NUM_MAP.length; i++) {
        prompt = prompt.replace(NUM_MAP[i], ""+(i+1))
    }

    prompt = prompt.replace(/\D/g, " ")


    var extracted_nums = Array.from([])

    const split_prompt = Array.from(prompt.split(' '))
    split_prompt.forEach((e) => {
        try {
            let n = Number.parseFloat(e);
            if (!isNaN(n))
                extracted_nums.push(n)
        } catch (e) {}
    })
    
    extracted_nums.reverse()
    var guess = extracted_nums.pop()
    extracted_nums.reverse()
    
    extracted_nums.forEach((e) => {
        if (OP === 'mul')
            guess *= e;
    })

    console.log(`Extracted ${extracted_nums} from ${prompt} (guess=${guess})`)

    return guess;
}

Array.from(QUESTIONS).forEach((e) => {
    const QUESTION_TEXT = e.getElementsByTagName('span')[0].textContent
    if (QUESTION_TEXT === 'Email')
        return;

    console.log(QUESTION_TEXT)
    var guess = trySolve(QUESTION_TEXT)
    if (QUESTION_TEXT.indexOf('$') !== -1)
        guess = '$' + guess;

    e.getElementsByTagName('input')[0].value = guess;
})
