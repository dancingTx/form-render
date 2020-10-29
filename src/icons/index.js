import Vue from 'vue'
import { SvgIcon } from '../components'
Vue.component(SvgIcon.name, SvgIcon)

const requireSvg = require.context('./svg', false, /\.svg$/)

const requireAllSvg = context => context.keys().map(context)
requireAllSvg(requireSvg)
