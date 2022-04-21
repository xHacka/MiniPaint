import {currentColor, useEyedropper} from "./palette.js";
import {saveObj} from "./timeline.js";

// Canvas
export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight + canvas.offsetTop

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Script Variables
export let drawing = false;

export let tool = 'Brush'
let shape = 'Brush'

const toolDisplay = document.querySelector(".tool-hover-display")

let mouseX = (event) => { return event.clientX }
let mouseY = (event) => { return event.clientY - canvas.offsetTop }

// Tool Size
const sizeDisplay = document.querySelector("label[for=size-input]")
const sizeValue = document.querySelector("#size-input");
let toolSize = 5

// Drawing Functions
export function drawStart(e) {
    drawing = true;
    draw(e)
}

export function drawFinish(e) {
    draw(e)
    drawing = false;
    ctx.beginPath()
    saveObj()
}

const tools = ["Brush", "Eraser", "Eyedropper", "Bucket", "Clear"]
const use = (tool, event) => eval(`use${tool}(event)`)

export function draw(event) {
    // Guard Block
    if (!drawing) return;

    // Draw
    if (tools.includes(tool)) { use(tool, event); } 
}

// Display Border Around Tool 
export function displayToolBorder(e) {
    const left = mouseX(e) - (toolSize / 2)
    const top = mouseY(e) + canvas.offsetTop - (toolSize / 2)
    toolDisplay.style.left = left + "px"
    toolDisplay.style.top = top + "px"
    toolDisplay.style.width = toolSize + "px"
    toolDisplay.style.height = toolSize + "px"
}

// Main Tools
const toolsMain = document.querySelector(".tools[data-tools=main]").querySelectorAll('.tools-item')
toolsMain.forEach(toolItem => {
    toolItem.addEventListener('click', () => {
        tool = toolItem.firstChild.dataset.hover
        if (tool === 'Brush') { toolDisplay.style.backgroundColor = currentColor }
        else if (tool === 'Eraser') { toolDisplay.style.backgroundColor = 'white' }
        else if (['Bucket', 'Clear'].includes(tool) ) { tool = 'Brush'; ctx.beginPath() }
        else if (tool === "Eyedropper") { changeSize(5) }
    })
})

export function changeSize(n) {
    const size = (n === undefined) ? sizeValue.value : n
    sizeDisplay.innerHTML = size
    toolSize = size
}

// TODO: Shape Functionality
// 
// Shapes
// const shapes = document.querySelector('.tools[data-tools=shapes]').querySelectorAll('.tools-item')
// shapes.forEach(shapeItem => { shape = shapeItem.firstChild.dataset.shape })

function useStroke(event) {
    ctx.lineTo(mouseX(event), mouseY(event))
    ctx.lineWidth = toolSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
}

function useBrush(event) {
    toolDisplay.style.backgroundColor = currentColor
    ctx.strokeStyle = currentColor
    useStroke(event)
}

function useEraser(event) {
    ctx.strokeStyle = 'white'
    useStroke(event)
}

export function useBucket(event) {
    ctx.fillStyle = currentColor
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveObj()
    tool = 'Brush'
}

export function useClear() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveObj()
    tool = 'Brush'
}
