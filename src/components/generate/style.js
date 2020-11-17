const genStyle = function (fields, formConf) {
  const initStyle = function (field) {
    // const config = field.__config__
    // if (!field.style && !) return
  }
  return (function () {
    const style = (fields || []).map(initStyle)
    console.log(style)
  }())
}

export default genStyle
