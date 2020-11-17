import { endOfLine } from '@/utils'
import genTemplate from './template'
import genScript from './script'
import genStyle from './style'
const genCodeStr = function (fields, formConf) {
  const genTemplateViaVue = `<template><div>${endOfLine + genTemplate(fields, formConf) + endOfLine}</div>${endOfLine}</template>${endOfLine}`
  const genScriptViaVue = `<script>${endOfLine + genScript(fields, formConf) + endOfLine}</script>${endOfLine}`
  const genStyleViaVue = `<style>${endOfLine + genStyle(fields, formConf) + endOfLine}</style>${endOfLine}`
  return {
    template: genTemplateViaVue,
    script: genScriptViaVue,
    style: genStyleViaVue
  }
}

export default genCodeStr
