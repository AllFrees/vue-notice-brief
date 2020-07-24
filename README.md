# vue-notice-brief

`
npm i vue-notify-brief
`

`
import vueNotifySimple from 'vue-notify-brief'
`

`
Vue.use(vueNotifySimple)
`

#使用参数

```
this.$notice({
  title: "标题",
  content: "消息内容",
  cancelTxt: "取消按钮文本",
  confirmTxt: "确认按钮文本",
  confirm: true,    // 是否显示 取消/确认 按钮 默认：false
  icon: false,      // 是否显示 标题/icon 默认：false(显示标题不显示icon)
  isOver: true,     // 是否显示蒙层 默认：false
}).then(result => {
  if (result == 'confirm') {       // 点击确认回调
    // do something
  } else if (result == 'cancel') { // 点击取消回调
    // do something
  }
})
```
