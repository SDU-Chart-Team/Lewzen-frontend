import {Arrow} from "@/js/element/state/Arrow";
import {Flippable} from "@/js/element/state/Flippable";
import {Basic} from "@/js/element/state/Basic";
import {Groupable} from "@/js/element/state/Groupable";
import {Linear} from "@/js/element/state/Linear";
import {Resizable} from "@/js/element/state/Resizable";
import {Rotatable} from "@/js/element/state/Rotatable";
import {Shapable} from "@/js/element/state/Shapable";
import {Stylizable} from "@/js/element/state/Stylizable";

class Module_state {
    constructor(g_id,svg_id) {
        this.g_id=g_id;
        this.svg_id=svg_id;
        this.arrow=new Arrow();
        this.basic=new Basic();
        this.flip=new Flippable();
        this.group=new Groupable();
        this.linear=new Linear();
        this.resize=new Resizable();
        this.rotate=new Rotatable();
        this.shape=new Shapable();
        this.style=new Stylizable();

    }

    setAttribute(type,msg){
        if(type==="arrow"){
            this.arrow.setAttribute(msg);
        }else if(type==="basic"){
            this.basic.setAttribute(msg);
        }else if(type==="flip"){
            this.flip.setAttribute(msg);
        }else if(type==="group"){
            this.group.setAttribute(msg);
        }
    }


    get_register(){//获取所有注册名
        let msg={cursor:this.g_id}
        this.basic.get_register(msg);
    }


    get_p(){//获取所有关键点
        let msg={type:"get_p",msg:{cursor:this.g_id}};
        this.basic.get_p(msg);
    }
}