/**
 * @description parse elem html
 */

import {Descendant, Text} from 'slate'
import {DOMElement} from '../formular/utils/dom'
import {IDomEditor, SlateDescendant, SlateElement} from '@wangeditor/editor'
import {FormulaElement} from './custom-types'
import {h} from "snabbdom";

function parseHtml(
    elem: DOMElement,
    children: SlateDescendant[],
    editor: IDomEditor
): SlateElement {
    const value = elem.getAttribute('data-value') || ''
    const vnode = h('span',{style:{}},value)
    return {
        type: 'block-formula',
        children: [vnode], // void node 必须有一个空白 text
    } as FormulaElement
}

const parseHtmlConf = {
    selector: 'math',
    parseElemHtml: parseHtml,
}

export default parseHtmlConf
