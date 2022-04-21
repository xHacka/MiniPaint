import * as mt from "./mainTools.js";
import { useCopy, useSave } from "./save.js";
import { useRedo, useUndo } from "./timeline.js";

// Variables
const slider = document.querySelector(".size-slider");
const bucket = document.querySelector(".tools-item i[data-hover=Bucket]");
const clear = document.querySelector(".tools-item i[data-hover=Clear]");
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
const copy = document.querySelector(".copy");
const save = document.querySelector(".save");

// Event Handlers
slider.addEventListener("input", () => mt.changeSize());

mt.canvas.addEventListener("mousedown", mt.drawStart);
mt.canvas.addEventListener("mouseup", mt.drawFinish);
mt.canvas.addEventListener("mousemove", (e) => {
  mt.draw(e);
  mt.displayToolBorder(e);
});

bucket.addEventListener("click", mt.useBucket);
clear.addEventListener("click", mt.useClear);

undo.addEventListener("click", useUndo);
redo.addEventListener("click", useRedo);

copy.addEventListener("click", useCopy);
save.addEventListener("click", useSave);