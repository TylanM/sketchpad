function createDiv(density) {

}

const sketchpad = document.querySelector('#sketchpad');
let cells = 2;
let ratio = (1/cells*100);

// your javascript file
sketchpad.setAttribute('style', `grid-template-rows: repeat(${cells},${ratio}%); grid-template-columns: repeat(${cells},${ratio}%);`)

for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {  
        const cell = document.createElement('div');
        cell.classList.add('cell');
        sketchpad.appendChild(cell);
    }
    
}



//contentdiv.setAttribute('style', 'border: 2px solid black; background: pink'); 