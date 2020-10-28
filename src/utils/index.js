import { typeOf } from './validate'
export * from './validate'
export const mergeOptions = function (customOpts, baseOpts) {
  const options = {}
  const keys = [...Object.keys(customOpts), ...Object.keys(baseOpts)]
  keys.forEach(item => {
    if (item in customOpts && item in baseOpts) {
      if (typeOf(customOpts[item], 'object')) {
        // recursive
        options[item] = mergeOptions(customOpts[item], baseOpts[item])
      } else {
        options[item] = customOpts[item]
      }
    } else if (item in customOpts) {
      options[item] = customOpts[item]
    } else if (item in baseOpts) {
      options[item] = baseOpts[item]
    }
  })
  return options
}
