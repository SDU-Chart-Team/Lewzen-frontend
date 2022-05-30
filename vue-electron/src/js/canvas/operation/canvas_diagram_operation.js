import {setCanvasState} from "@/js/canvas/base_canvas";

export function OnGuides(){
    // console.log("On Guides!!!")
    setCanvasState("guide",true)
}

export function OffGuides(){
    // console.log("Off Guides!!!")
    setCanvasState("guide",false)
}

export function OnGrid(){
    // console.log("On Grid!!!")
    setCanvasState("grid",true)
}

export function OffGrid(){
    // console.log("Off Grid!!!")
    setCanvasState("grid",false)
}

export function OffConnectionPoint(){
    // console.log("Off Connect Point")
    setCanvasState("connect",false)
}

export function OnConnectionPoint(){
    // console.log("On Connect Point")
    setCanvasState("connect",true)
}