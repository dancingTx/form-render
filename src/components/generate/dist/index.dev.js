"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.genStyleViaVue = exports.genScriptViaVue = exports.genTemplateViaVue = void 0;

var _utils = require("@/utils");

var _template = _interopRequireDefault(require("./template"));

var _script = _interopRequireDefault(require("./script"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var genTemplateViaVue = function genTemplateViaVue(templateStr) {
  return "<template>".concat(_utils.endOfLine, "<div class=\"display__block\">").concat(_utils.endOfLine + templateStr + _utils.endOfLine, "</div>").concat(_utils.endOfLine, "</template>").concat(_utils.endOfLine);
};

exports.genTemplateViaVue = genTemplateViaVue;

var genScriptViaVue = function genScriptViaVue(scriptStr) {
  return "<script>".concat(_utils.endOfLine + scriptStr + _utils.endOfLine, "</script>").concat(_utils.endOfLine);
};

exports.genScriptViaVue = genScriptViaVue;

var genStyleViaVue = function genStyleViaVue(styleStr) {
  return "<style>".concat(_utils.endOfLine + styleStr + _utils.endOfLine, "</style>").concat(_utils.endOfLine);
};

exports.genStyleViaVue = genStyleViaVue;

var genCodeStr = function genCodeStr(fields, formConf) {
  var template = (0, _template["default"])(fields, formConf);
  var script = (0, _script["default"])(fields, formConf);
  var style = (0, _style["default"])(fields, formConf);
  return {
    template: template,
    script: script,
    style: style,
    vueTemplate: genTemplateViaVue(template),
    vueScript: genScriptViaVue(script),
    vueStyle: genStyleViaVue(style)
  };
};

var _default = genCodeStr;
exports["default"] = _default;