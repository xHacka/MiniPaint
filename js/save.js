import { canvas } from "./mainTools.js";

const randName = () => [...Array(10)].map(() => Math.floor(Math.random()*16).toString(16)).join('') + ".png"

export function useCopy() {
  canvas.toBlob((blob) => {
    navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
    ]);
  });
}

export function useSave() {
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const a = document.createElement('a')
    a.href = image
    a.download = randName()
    a.click()
}
