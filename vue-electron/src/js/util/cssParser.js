
export class cssParser{
    constructor() {
        this.styleList={};
    }
    parseStyle(string){
        // console.log(string);
        if(string===null||string===undefined)return;
        let attrs={}
        let attrs_tmp=string.split(';')
        // console.log(attrs_tmp);
        for (var i=0;i<attrs_tmp.length;i++){
            let tmp=attrs_tmp[i].split(':');
            // console.log(tmp);
            tmp[0]=Trim(tmp[0])
            if(tmp[1]===undefined)continue;
            attrs[tmp[0]]=tmp[1];
        }
        // console.log(attrs);
        this.styleList=attrs;
        // console.log(this.styleList);
    }
    deleteStyle(style){
        let tmp=Trim(style);
        delete this.styleList[tmp];
    }
    returnStyle(style){
        // console.log(this.styleList);
        // console.log(this.styleList[Trim(style)])

        return this.styleList[Trim(style)];
    }
    updateStyle(attrs){
        for(var key in attrs){
            let tmp=Trim(key)
            if(attrs[tmp]===undefined)continue;
            this.styleList[tmp]=attrs[tmp];
        }
    }
    clear(){
        this.styleList={};
    }
    get(){
        let string="";
        // console.log(this.styleList.styleList);
        for(var key in this.styleList){
            // console.log(key);
            if(this.styleList[key]==="")continue;
            string+=key+" : "+this.styleList[key]+";";
        }
        // console.log(string);
        return string;
    }
}

function Trim(str)
{
    if(str===undefined)return;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}