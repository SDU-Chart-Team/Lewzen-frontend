/**
 * @description elem to html
 */

import { SlateElement } from '@wangeditor/editor'
import { FormulaElement } from './custom-types'
import {parseMath} from "../../scripts/LaTeXParser"

// 生成 html 的函数
/**
 *
 * @param elem
 * @param childrenHtml
 * @returns latex公式的MathML
 */
function formulaToHtml(elemNode: SlateElement, childrenHtml: string): string {
  // const { value = '' } = elemNode as FormulaElement
  let mathml = parseMath(childrenHtml)
  mathml.setAttribute('data-value',childrenHtml)
  return `${mathml.outerHTML}`
}

// 配置
const conf = {
  type: 'block-formula', // 节点 type ，重要！！！
  elemToHtml: formulaToHtml,
}

export default conf
