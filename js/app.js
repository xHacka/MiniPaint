import * as mt from "./mainTools.js";
import { useCopy, useSave } from "./save.js";
import { useRedo, useUndo } from "./timeline.js";

// Variables
const tools = Array.from(document.querySelectorAll(".tools-item"));
const toolsIcons = Array.from(document.querySelectorAll('.tools-item i'))
const slider = document.querySelector(".size-slider");
const bucket = document.querySelector(".tools-item i[data-hover=Bucket]");
const clear = document.querySelector(".tools-item i[data-hover=Clear]");
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
const copy = document.querySelector(".copy");
const save = document.querySelector(".save");

// Event Handlers

for (const [i, tool] of tools.entries()) {
  tool.addEventListener("click", () => {

    tool.classList.add("tools-item--active");
    toolsIcons[i].classList.add("tools-item--active-color")
    
    tools.filter((i) => i !== tool).map((r) => r.classList.remove("tools-item--active"));
    toolsIcons.filter((icon) => icon !== toolsIcons[i]).map((r) => r.classList.remove("tools-item--active-color")); 

  });
}

slider.addEventListener("input", () => mt.changeSize());

mt.canvas.addEventListener("mousedown", mt.drawStart);
mt.canvas.addEventListener("mouseup", mt.drawFinish);
mt.canvas.addEventListener("mousemove", (e) => { mt.draw(e); mt.displayToolBorder(e); });

bucket.addEventListener("click", mt.useBucket);
clear.addEventListener("click", mt.useClear);

undo.addEventListener("click", useUndo);
redo.addEventListener("click", useRedo);

copy.addEventListener("click", useCopy);
save.addEventListener("click", useSave);
