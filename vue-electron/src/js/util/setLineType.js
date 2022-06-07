
let line_type="straight_line";

let dotted_line_type="solid";

let arrow_start="start_arrow";

let arrow_end="end_arrow";

export function set_line_type_Before(type){
    line_type=type;
}

export function get_line_type_Before(){
    return line_type;
}

export function set_dotted_line_type_Before(type){
    dotted_line_type=type;
}

export function get_dotted_line_type_Before(){
    return dotted_line_type;
}

export function set_arrow_start_Before(type){
    arrow_start=type;
}

export function set_arrow_end_Before(type){
    arrow_end=type;
}

export function get_arrow_end_Before(){
    return arrow_end;
}
export function get_arrow_start_Before(){
    return arrow_start;
}
