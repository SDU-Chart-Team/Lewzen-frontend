import {socketPush} from "@/js/socket/socketQueue";
import {updateCMD} from "@/js/action/actionQueue";
const ServerModule = import('@/js/socket/wasm');

async function waitwasm() {
    const wasmmodule = await ServerModule;
    wasmmodule.default.onRuntimeInitialized = () => {
        window.$server_run = wasmmodule.default.server_run;
        window.$server_init = wasmmodule.default.server_init;
        window.$server_init();
        console.log('server inited.')
    }
}

(async () => { waitwasm() })()


export function sendSocket(val){
    // console.log(val['cmd']);
    updateCMD(val['cmd'])
    console.log(val['cmd'])
    var ret=JSON.parse(window.$server_run(val['cmd']))
    // var ret=Module.server_run(val['cmd'])
    // console.log(ret);
    socketPush(ret);
    // socketPush(JSON.parse(''+ret));
    // socket.send("message",val);
}
