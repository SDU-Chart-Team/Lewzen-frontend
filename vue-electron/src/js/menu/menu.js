// import {P} from "@/js/action/actionQueue";
const {Menu,BrowserWindow,dialog,app}=require('electron')
const fs=require("fs")


var template = [
    // {
    //     label:'File',
    //     submenu:[
    //         {
    //             label: 'new',
    //         },
    //         {
    //             label:'open',
    //             click:()=>{
    //                 const res = dialog.showOpenDialogSync({
    //                     title: '对话框窗口的标题',
    //                     // 默认打开的路径，比如这里默认打开下载文件夹
    //                     defaultPath: app.getPath('downloads'),
    //                     buttonLabel: 'select',
    //                     // 限制能够选择的文件类型
    //                     filters: [
    //                         // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    //                         // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    //                         // { name: 'Custom File Type', extensions: ['as'] },
    //                         // { name: 'All Files', extensions: ['*'] },
    //                     ],
    //                     properties: [ 'openFile'],
    //                     message: '文件选择器'
    //                 })
    //                 fs.readFile(res[0], {encoding: 'utf-8'},(err,data)=>{
    //                     if(err){
    //                         console.log(err);
    //                         return
    //                     }
    //                     // loadFile(data)
    //                     // console.log(data)
    //                 })
    //                 P("load",{json:data})
    //                 console.log('res', res)
    //             }
    //         },
    //         {label:'save'},
    //         {label:'save as image'},
    //         // {label:'save as pdf'}
    //     ]
    // },
    // {
    //     label:'Edit',
    //     submenu:[
    //         {label:'copy'},
    //         {label:'paste'},
    //         {label:'copy style'},
    //         {label:'paste style'},
    //         {label:'redo'},
    //         {label:'undo'},
    //         {label:'select all'},
    //     ]
    // },
    // {
    //     label:'View',
    //     submenu:[
    //         {label:'grid'},
    //         {label:'shadow'},
    //         {label:'connect point'},
    //         {label:'guides'},
    //     ]
    // },
    // {
    //     label:'Arrange',
    //     submenu:[
    //         {label:'front'},
    //         {label:'back'},
    //         {label:'forward'},
    //         {label:'backward'},
    //         {label:'group'},
    //     ]
    // },
    // {
    //     label:'Extras',
    //     submenu:[
    //         {label:'theme'},
    //     ]
    // },
    // {
    //     label:'Help',
    //     submenu:[
    //         {label:'fork me'},
    //     ]
    // },
];

var m = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(m);