/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 2014-11-29
 *
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

import {getMySvg, getShapeMapId} from "./getCanvasIdOperation";
import {P} from "../action/actionQueue";
import {canvas_update} from "../canvas/base_canvas";

var saveAs = saveAs
    // IE 10+ (native saveAs)
    || (typeof navigator !== "undefined" &&
        navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator))
    // Everyone else
    || (function(view) {
        "use strict";
        // IE <10 is explicitly unsupported
        if (typeof navigator !== "undefined" &&
            /MSIE [1-9]\./.test(navigator.userAgent)) {
            return;
        }
        var
            doc = view.document
            // only get URL when necessary in case Blob.js hasn't overridden it yet
            , get_URL = function() {
                return view.URL || view.webkitURL || view;
            }
            , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
            , can_use_save_link = "download" in save_link
            , click = function(node) {
                var event = doc.createEvent("MouseEvents");
                event.initMouseEvent(
                    "click", true, false, view, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
                );
                node.dispatchEvent(event);
            }
            , webkit_req_fs = view.webkitRequestFileSystem
            , req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
            , throw_outside = function(ex) {
                (view.setImmediate || view.setTimeout)(function() {
                    throw ex;
                }, 0);
            }
            , force_saveable_type = "application/octet-stream"
            , fs_min_size = 0
            // See https://code.google.com/p/chromium/issues/detail?id=375297#c7 and
            // https://github.com/eligrey/FileSaver.js/commit/485930a#commitcomment-8768047
            // for the reasoning behind the timeout and revocation flow
            , arbitrary_revoke_timeout = 500 // in ms
            , revoke = function(file) {
                var revoker = function() {
                    if (typeof file === "string") { // file is an object URL
                        get_URL().revokeObjectURL(file);
                    } else { // file is a File
                        file.remove();
                    }
                };
                if (view.chrome) {
                    revoker();
                } else {
                    setTimeout(revoker, arbitrary_revoke_timeout);
                }
            }
            , dispatch = function(filesaver, event_types, event) {
                event_types = [].concat(event_types);
                var i = event_types.length;
                while (i--) {
                    var listener = filesaver["on" + event_types[i]];
                    if (typeof listener === "function") {
                        try {
                            listener.call(filesaver, event || filesaver);
                        } catch (ex) {
                            throw_outside(ex);
                        }
                    }
                }
            }
            , FileSaver = function(blob, name) {
                // First try a.download, then web filesystem, then object URLs
                var
                    filesaver = this
                    , type = blob.type
                    , blob_changed = false
                    , object_url
                    , target_view
                    , dispatch_all = function() {
                        dispatch(filesaver, "writestart progress write writeend".split(" "));
                    }
                    // on any filesys errors revert to saving with object URLs
                    , fs_error = function() {
                        // don't create more object URLs than needed
                        if (blob_changed || !object_url) {
                            object_url = get_URL().createObjectURL(blob);
                        }
                        if (target_view) {
                            target_view.location.href = object_url;
                        } else {
                            var new_tab = view.open(object_url, "_blank");
                            if (new_tab == undefined && typeof safari !== "undefined") {
                                //Apple do not allow window.open, see http://bit.ly/1kZffRI
                                view.location.href = object_url
                            }
                        }
                        filesaver.readyState = filesaver.DONE;
                        dispatch_all();
                        revoke(object_url);
                    }
                    , abortable = function(func) {
                        return function() {
                            if (filesaver.readyState !== filesaver.DONE) {
                                return func.apply(this, arguments);
                            }
                        };
                    }
                    , create_if_not_found = {create: true, exclusive: false}
                    , slice
                ;
                filesaver.readyState = filesaver.INIT;
                if (!name) {
                    name = "download";
                }
                if (can_use_save_link) {
                    object_url = get_URL().createObjectURL(blob);
                    save_link.href = object_url;
                    save_link.download = name;
                    click(save_link);
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    revoke(object_url);
                    return;
                }
                // Object and web filesystem URLs have a problem saving in Google Chrome when
                // viewed in a tab, so I force save with application/octet-stream
                // http://code.google.com/p/chromium/issues/detail?id=91158
                // Update: Google errantly closed 91158, I submitted it again:
                // https://code.google.com/p/chromium/issues/detail?id=389642
                if (view.chrome && type && type !== force_saveable_type) {
                    slice = blob.slice || blob.webkitSlice;
                    blob = slice.call(blob, 0, blob.size, force_saveable_type);
                    blob_changed = true;
                }
                // Since I can't be sure that the guessed media type will trigger a download
                // in WebKit, I append .download to the filename.
                // https://bugs.webkit.org/show_bug.cgi?id=65440
                if (webkit_req_fs && name !== "download") {
                    name += ".download";
                }
                if (type === force_saveable_type || webkit_req_fs) {
                    target_view = view;
                }
                if (!req_fs) {
                    fs_error();
                    return;
                }
                fs_min_size += blob.size;
                req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
                    fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
                        var save = function() {
                            dir.getFile(name, create_if_not_found, abortable(function(file) {
                                file.createWriter(abortable(function(writer) {
                                    writer.onwriteend = function(event) {
                                        target_view.location.href = file.toURL();
                                        filesaver.readyState = filesaver.DONE;
                                        dispatch(filesaver, "writeend", event);
                                        revoke(file);
                                    };
                                    writer.onerror = function() {
                                        var error = writer.error;
                                        if (error.code !== error.ABORT_ERR) {
                                            fs_error();
                                        }
                                    };
                                    "writestart progress write abort".split(" ").forEach(function(event) {
                                        writer["on" + event] = filesaver["on" + event];
                                    });
                                    writer.write(blob);
                                    filesaver.abort = function() {
                                        writer.abort();
                                        filesaver.readyState = filesaver.DONE;
                                    };
                                    filesaver.readyState = filesaver.WRITING;
                                }), fs_error);
                            }), fs_error);
                        };
                        dir.getFile(name, {create: false}, abortable(function(file) {
                            // delete file if it already exists
                            file.remove();
                            save();
                        }), abortable(function(ex) {
                            if (ex.code === ex.NOT_FOUND_ERR) {
                                save();
                            } else {
                                fs_error();
                            }
                        }));
                    }), fs_error);
                }), fs_error);
            }
            , FS_proto = FileSaver.prototype
            , saveAs = function(blob, name) {
                return new FileSaver(blob, name);
            }
        ;
        FS_proto.abort = function() {
            var filesaver = this;
            filesaver.readyState = filesaver.DONE;
            dispatch(filesaver, "abort");
        };
        FS_proto.readyState = FS_proto.INIT = 0;
        FS_proto.WRITING = 1;
        FS_proto.DONE = 2;

        FS_proto.error =
            FS_proto.onwritestart =
                FS_proto.onprogress =
                    FS_proto.onwrite =
                        FS_proto.onabort =
                            FS_proto.onerror =
                                FS_proto.onwriteend =
                                    null;

        return saveAs;
    }(
        typeof self !== "undefined" && self
        || typeof window !== "undefined" && window
        || this.content
    ));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window




export function saveFile(json){
    // alert(1);
    var content = JSON.stringify(json);
    let name=get_file_name();
    var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, name+".json");
}


export function saveAsHTML(){
    let node=document.getElementById(getMySvg());
    P("uncursor",{})
    canvas_update("connect","",{type:"delete"})

    let div=document.createElement("div");
    div.append(node);
    var string=div.innerHTML;
    div.removeChild(node);
    document.getElementById("myCanvas").append(node);
    let name=get_file_name();
    var blob = new Blob([string], {type: "text/plain;charset=utf-8"});
    saveAs(blob, name+".html");
    // image/svg+xml
    // div.setAttribute("style","background-image:url('data:image/svg+xml,"+string+"');")
}
export function saveAsImage(){
    let node=document.getElementById(getMySvg());
    P("uncursor",{})

    var svg = node.cloneNode(true)
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    var string = (new XMLSerializer()).serializeToString(svg);
    string='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(string);

    // let name=get_file_name();
    // var blob = new Blob([string], {type: "image/svg+xml"});
    // saveAs(blob, name+".png");

    var image=new Image();
    image.src=string;
    var img = document.createElement('img');
    img.src = string;
    document.body.append(img);
    image.onload = () => {
        var canvas=document.createElement('canvas');
        canvas.width=parseInt(image.width)
        canvas.height=parseInt(image.height)
        var context=canvas.getContext('2d');
        context.drawImage(image,0,0);
        var box=getBoundingBox(context, 0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width=parseInt(box.width);
        canvas.height=parseInt(box.height);
        context.drawImage(image, box.left, box.top, box.width, box.height, 0, 0, box.width, box.height);
        var a=document.createElement('a');
        a.href=canvas.toDataURL('image/png');
        a.download=get_file_name();
        a.click();
    }

    // div.setAttribute("style","background-image:url('data:image/svg+xml,"+string+"');")
}

function getBoundingBox(ctx, left, top, width, height) {
    var ret = {};

    // Get the pixel data from the canvas
    var data = ctx.getImageData(left, top, width, height).data;
    console.log(data);
    var first = false;
    var last = false;
    var right = false;
    var left = false;
    var r = height;
    var w = 0;
    var c = 0;
    var d = 0;

    // 1. get bottom
    while(!last && r) {
        r--;
        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                console.log('last', r);
                last = r+1;
                ret.bottom = r+1;
                break;
            }
        }
    }

    // 2. get top
    r = 0;
    var checks = [];
    while(!first && r < last) {

        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                console.log('first', r);
                first = r-1;
                ret.top = r-1;
                ret.height = last - first - 1;
                break;
            }
        }
        r++;
    }

    // 3. get right
    c = width;
    while(!right && c) {
        c--;
        for(r = 0; r < height; r++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                console.log('last', r);
                right = c+1;
                ret.right = c+1;
                break;
            }
        }
    }

    // 4. get left
    c = 0;
    while(!left && c < right) {

        for(r = 0; r < height; r++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                console.log('left', c-1);
                left = c;
                ret.left = c;
                ret.width = right - left - 1;
                break;
            }
        }
        c++;

        // If we've got it then return the height
        if(left) {
            return ret;
        }
    }
    return {left:0,width:0,top:0,height:0};
}
