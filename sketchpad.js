

const sketchpad = document.querySelector('#sketchpad');
let numCells = 30;
let ratio = (1/numCells*100);

sketchpad.setAttribute('style', `grid-template-rows: repeat(${numCells},${ratio}%); grid-template-columns: repeat(${numCells},${ratio}%);`)

for (let i = 0; i < numCells; i++) {
    for (let j = 0; j < numCells; j++) {  
        const cell = document.createElement('div');
        cell.classList.add('cell');
        sketchpad.appendChild(cell);
    }
    
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('mouseover',colorCell))

let mouseDown = false;

const webpage= document.querySelector('body');
webpage.addEventListener('mousedown',toggleMouseDown);
webpage.addEventListener('mouseup',toggleMouseDown);
webpage.addEventListener('mouseleave',toggleMouseDown);



function toggleMouseDown(e) {
    if (mouseDown == false && e.type == "mousedown") {
        mouseDown = true;
    } else  {
        mouseDown = false;
    }
}


function colorCell(e) {
    if (mouseDown)
    e.target.classList.add("filled-cell");
}


  
  