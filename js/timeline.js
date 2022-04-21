import {canvas, ctx, useClear} from "./mainTools.js";

let objTree = []
let objIndex = -1

export function saveObj() {
    objIndex++

    // Guard Block
    // Get The Correct Item When Doing Undo/Redo
    if (objTree.length > objIndex) { objTree.length = objIndex; }

    objTree.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
}
 

export function useUndo() {
    // Guard Block
    // If List Empty, Clear The Canvas
    if (objIndex < 1) { useClear(); return }

    objIndex--

    ctx.putImageData(objTree[objIndex], 0, 0) 
}

export function useRedo() {
    // Guard Block
    // If Index Out Of List Range Stop
    if (objIndex >= objTree.length - 1) { return }
    if (objIndex < 1) { objIndex = 0 }

    // Get The Last Image

    objIndex++

    ctx.putImageData(objTree[objIndex], 0, 0) 
    
} 