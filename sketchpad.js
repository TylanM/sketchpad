let mouseDown = false;
let eraserActive = false;
let cells;

function useButton(e) {    
    if (e.target.textContent == "Reset") {
        resetCanvas();   
        e.target.classList.add("active-temp");
        setTimeout(function(){
            e.target.classList.remove("active-temp");
        }, 200);

    } else if (e.target.type == "color") {
        displayColorPicker();
        e.target.classList.add("active-temp");
        setTimeout(function(){
            e.target.classList.remove("active-temp");
        }, 200); 

    } else if (e.target.textContent == "Eraser") {
        toggleEraser();
        buttons.forEach(button => button.classList.remove("active"));
        e.target.classList.add("active");
    
    } else {
        buttons.forEach(button => button.classList.remove("active"));
        e.target.classList.add("active");
        if(eraserActive == true) {
            toggleEraser();
        }
    }   
}

function setColor() {

}

function setCanavasSize(numCells) {
    let ratio = (1/numCells*100);
    const sketchpad = document.querySelector('#sketchpad');
    sketchpad.setAttribute('style', `grid-template-rows: repeat(${numCells},${ratio}%); grid-template-columns: repeat(${numCells},${ratio}%);`)

    for (let i = 0; i < numCells; i++) {
        for (let j = 0; j < numCells; j++) {  
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('mouseover',colorCell)
            sketchpad.appendChild(cell);
        }   
    }
    cells = document.querySelectorAll('.cell');
}

function highlight(e) {
    if(e.target.className != "active" && e.type == "mouseover") {
        e.target.classList.add("hover");
    } else {
        e.target.classList.remove("hover");
    }
}

function resetCanvas() {
    cells.forEach(cell => cell.classList.remove("filled-cell"));
}

function toggleMouseDown(e) {
    if (mouseDown == false && e.type == "mousedown") {
        mouseDown = true;
    } else  {
        mouseDown = false;
    }
}

function toggleEraser() {
    if (eraserActive == false) {
        eraserActive = true;
    } else {
        eraserActive = false;
    }
}

function colorCell(e) {
    if (mouseDown && eraserActive == false) {
        e.target.classList.add("filled-cell");
    } else if (mouseDown && eraserActive) {
        e.target.classList.remove("filled-cell");
    }
    
}

const webpage= document.querySelector('body');
webpage.addEventListener('mousedown',toggleMouseDown);
webpage.addEventListener('mouseup',toggleMouseDown);
webpage.addEventListener('mouseleave',toggleMouseDown);

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click',useButton));
buttons.forEach(button => button.addEventListener('mouseover',highlight));
buttons.forEach(button => button.addEventListener('mouseleave',highlight));

setCanavasSize(16);

  
  