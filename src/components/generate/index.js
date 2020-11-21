import { endOfLine } from '@/utils'
import genTemplate from './template'
import genScript from './script'
import genStyle from './style'
export const genTemplateViaVue = templateStr => `<template>${endOfLine}<div class="display__block">${endOfLine + templateStr + endOfLine}</div>${endOfLine}</template>${endOfLine}`
export const genScriptViaVue = scriptStr => `<script>${endOfLine + scriptStr + endOfLine}</script>${endOfLine}`
export const genStyleViaVue = styleStr => `<style>${endOfLine + styleStr + endOfLine}</style>${endOfLine}`
const genCodeStr = function (fields, formConf) {
  const template = genTemplate(fields, formConf)
  const script = genScript(fields, formConf)
  const style = genStyle(fields, formConf)
  return {
    template,
    script,
    style,
    vueTemplate: genTemplateViaVue(template),
    vueScript: genScriptViaVue(script),
    vueStyle: genStyleViaVue(style)
  }
}

export default genCodeStr
