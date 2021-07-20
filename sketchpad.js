let mouseDown = false;
let eraserActive = false;
let cells;
let activeColor = "#000";
let activeBackgroundColor = "#fff"

let rainbowTipActive = false;
let activeRainbowTipColor = "red"
let canvasSize = 16;

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
        
        if(rainbowTipActive == true) {
            toggleRainbowColor();
        }
    
    } else if (e.target.textContent == "Rainbow Tip") {
        buttons.forEach(button => button.classList.remove("active"));
        e.target.classList.add("active");
        toggleRainbowColor()
        
        if(eraserActive == true) {
            toggleEraser();
        }
    
    } else if (e.target.textContent == "Pencil")  {
        buttons.forEach(button => button.classList.remove("active"));
        e.target.classList.add("active");
        
        if(eraserActive == true) {
            toggleEraser();
        }
        
        if(rainbowTipActive == true) {
            toggleRainbowColor();
        }

    }   else if (e.target.textContent == "Reset")  {
        buttons.forEach(button => button.classList.remove("active"));
        e.target.classList.add("active");
        
        if(eraserActive == true) {
            toggleEraser();
        }
        
        if(rainbowTipActive == true) {
            toggleRainbowColor();
        }

    } else if (e.target.type == "range") {
        canvasSize = e.target.value;
        setCanavasSize(canvasSize);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function setRainbowColor() {
    let dominantPrimary = getRandomInt(3)
    let dominantSecondary = getRandomInt(2) 
    let r;
    let g;
    let b;

    if (dominantPrimary == 0) {
        r = 255;
        if (dominantSecondary == 0) {
            g = 0
            b = getRandomInt(255);
        } else {
            b = 0
            g = getRandomInt(255);
        }
    } else if (dominantPrimary == 1) {
        b = 255;
        if (dominantSecondary == 0) {
            r = 0
            g = getRandomInt(255);
        } else {
            g = 0
            r = getRandomInt(255);
        }
    } else {
        g = 255;
        if (dominantSecondary == 0) {
            r = 0
            b = getRandomInt(255);
        } else {
            b = 0
            r = getRandomInt(255);
        }
    }

    activeRainbowTipColor = `rgb(${r}, ${g}, ${b})`;
}

function setColor(e) {
    activeColor = e.target.value;
}

function setCanavasSize(numCells) {
    resetSketchpad();
    sliderOutput.textContent = `${canvasSize} x ${canvasSize}`;

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

function resetSketchpad() {
    cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.remove());
}

function highlight(e) {
    if(e.target.className != "active" && e.target.className != "slider"  && e.type == "mouseover") {
        e.target.classList.add("hover");
    } else {
        e.target.classList.remove("hover");
    }
}

function resetCanvas() {
    cells.forEach(cell => cell.style.backgroundColor = activeBackgroundColor);
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

function toggleRainbowColor() {
    if (rainbowTipActive == false) {
        rainbowTipActive = true;
    } else {
        rainbowTipActive = false;
    }
}

function colorCell(e) {
    if (mouseDown && eraserActive == false && rainbowTipActive == false) {
        e.target.classList.add("filled-cell");
        e.target.style.backgroundColor = activeColor;
    } else if (mouseDown && eraserActive) {
        e.target.classList.remove("filled-cell");
        e.target.style.backgroundColor = activeBackgroundColor;
    } else if (mouseDown && rainbowTipActive) {
        setRainbowColor();
        e.target.style.backgroundColor = activeRainbowTipColor;
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

const colorWell = document.querySelector("#colorWell");
colorWell.value = activeColor;
colorWell.addEventListener("input", setColor, false);

let sliderInput = document.querySelector("input");
let sliderOutput = document.querySelector("#slider-output")

sliderInput.addEventListener('input',useButton);

sliderOutput.textContent = `${canvasSize} x ${canvasSize}`;


setCanavasSize(canvasSize);


  
  