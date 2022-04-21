import {ctx} from "./mainTools.js";

const customColor = document.querySelector('.custom-color input')
const colorsElement = document.querySelector(".colors")
export let currentColor = 'black'

const colors = {
    Black: "#000000",
    Gray: "#7f7f7f",
    Dark_Red: "#880105",
    Red: "#ed1c24",
    Dark_Orange: "#ff7f27",
    Yellow: "#fff200",
    Green: "#22b14c",
    Blue: "#0a2e08",
    Dark_Blue: "#3f48cc",
    Purple: "#a349a4",
    White: "#ffffff",
    Light_Gray: "#c3c3c3",
    Brown: "#b97a57",
    Pink: "#ffaec9",
    Orange: "#ffc90e",
    Light_Yellow: "#efe4b0",
    Lime: "#b5e61d",
    Cyan: "#99d9ea",
    Light_Blue: "#7092be",
    Light_Purple: "#c8bfe7"
}

function createColors() {
    for (let [name, color] of Object.entries(colors)) {
        const colorItem = document.createElement('i')
        colorItem.classList.add("color-item")
        colorItem.classList.add("color-name")
        colorItem.style.backgroundColor = color
        colorItem.setAttribute("data-color-name", name.replace("_", " "))
        colorsElement.append(colorItem)
    }
    return colorsElement.querySelectorAll('.color-item')
}


let colorElements = createColors();
colorElements.forEach(colorItem => {
    colorItem.addEventListener('click', () => {
        currentColor = colors[colorItem.dataset.colorName.replace(" ", "_")]
        customColor.value = currentColor; 
    })
})

customColor.addEventListener('change', () => { currentColor = customColor.value })

export function useEyedropper(event) {
    const [r, g, b] = ctx.getImageData(event.x - canvas.offsetLeft, event.y - canvas.offsetTop, 1, 1).data
    const toHex = (c) => parseInt(c).toString(16);
    const hexColor = "#" + [r, g, b].map(c => toHex(c).padStart(2, '0')).join("")
    currentColor = hexColor
    customColor.value = hexColor
}

