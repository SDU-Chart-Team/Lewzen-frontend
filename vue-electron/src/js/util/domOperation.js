//setAttrById:根据id对

export class DomOperator {

    setAttrById(id,attrs){
        let item=document.getElementById(id);
        // console.log(attrs);
        for(var key in attrs){
            item.setAttribute(key,attrs[key])
            // console.log(key,attrs[key])
        }
    }

    //直接传递dom对象进行赋值
    setAttrByDom(item,attrs){
        for(var key in attrs){
            item.setAttribute(key,attrs[key])
            // console.log(key,attrs[key])
        }
    }
    //根据id获取id
    getAttrById(id,attrs){
        let item=document.getElementById(id);
        let answer={};
        for(var i=0;i<attrs.length;i++){
            answer[attrs[i]]=item.getAttribute(attrs[i]);
        }
        return answer;
    }
    //通过dom和append方式添加元素:便于控制和debug
    appendChildByDom(father,child){
        father.append(child);
    }

    //通过id和append方式添加元素
    appendChildById(father,child){
        let fnode=document.getElementById(father);
        fnode.append(child);
    }

    //通过father和son的id remove元素
    removeChildById(father,child){
        let fnode=document.getElementById(father);
        let snode=document.getElementById(child);
        fnode.removeChild(snode);
    }

    //得到键值对数组进行修改
    changeAttrs(attrs){
        for (var key in attrs){
            let item=document.getElementById(key);
            if(item===null)continue;
            // console.log(item);
            for (var value in attrs[key]){
                item.setAttribute(value,attrs[key][value]);
            }
        }
    }
}
