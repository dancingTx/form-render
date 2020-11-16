import genTemplate from './template'
import genScript from './script'
import genStyle from './style'
export const exportDefault = 'export default'
const genCodeStr = function (fields, formConf) {
  const genTemplateViaVue = `<template><div>${genTemplate(fields, formConf)}</div></template>`
  const genScriptViaVue = `<script>${genScript(fields, formConf)}</script>`
  const genStyleViaVue = `<style>${genStyle(fields, formConf)}</style>`
  return {
    template: genTemplateViaVue,
    script: genScriptViaVue,
    style: genStyleViaVue
  }
}

export default genCodeStr
