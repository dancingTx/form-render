## 开发守则

### 整体结构
    本项目采用packages分包，核心内容放入packages/core中
    其中包含
    页面布局内容，放入 packages/core/layout中
    其他相关模块以插件的形式，分为不同包，分别放入packages下的其他目录中。
    
### 书写规范
    文件夹均以小写英文开头，如有多段单词，以小驼峰命名，eg：xxXxx
    单个文件以小驼峰命名，如 xxXxx.vue
    vue文件，sfc中name，与route文件中name，保持一致，多个单词以小驼峰命名，path中多个单词以中划线连接
    