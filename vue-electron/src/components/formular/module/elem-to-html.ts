/**
 * @description elem to html
 */

import {SlateElement} from '@wangeditor/editor'
import {FormulaElement} from './custom-types'
import {parseMath} from "../../../scripts/LaTeXParser"

// 生成 html 的函数
/**
 *
 * @param elem
 * @param childrenHtml
 * @returns latex公式的MathML
 */
function formulaToHtml(elemNode: SlateElement, childrenHtml: string): string {
    const {value = ''} = elemNode as FormulaElement
    // return `<span data-value=${value}>${parseMath(value).outerHTML}</span>`
    let node = parseMath(value)
    node.setAttribute('data-value', value)
    let math2 = document.createElement('math2')
    math2.appendChild(node)
    math2.setAttribute('data-value', value)
    return `${math2.outerHTML}`
}

// 配置
const conf = {
    type: 'formula', // 节点 type ，重要！！！
    elemToHtml: formulaToHtml,
}

export default conf
