import Vue from 'vue'
import Notice from './notification.vue'

// 自适应
const autoRem = () => {
  let rem;
  let width = document.body.clientWidth
  if (width >= 750) {
    width = 750;
  }
  if (width <= 320) {
    width = 320;
  }
  rem = (width / 375) * 100 + 'px'
  document.documentElement.style.fontSize = rem
  window.rem = rem

  window.addEventListener('resize', () => {
    autoRem()
  })
}

const NoticeConstructor = Vue.extend(Notice)

let needId = 0, noticeQueue = []

// 移除弹窗
const removeNotice = (notice) => {
  noticeQueue.splice(0, 1)
  document.body.removeChild(notice.vm.$el)
  notice.vm.$destroy()
}

const deletVm = (vmse) => {
  setTimeout(() => {
    if (vmse.$el.parentNode) {
      vmse.$el.parentNode.removeChild(vmse.$el) // 从DOM里将这个组件移除
    }
    vmse.$destroy(true)
    noticeQueue.splice(0, 1)
  }, 500)
}

// 创建实例
const render = (config) => {
  let id = `notice_${needId++}`

  const instance = new NoticeConstructor({
    propsData: config
  })

  noticeQueue.push(instance)
  if (noticeQueue.length > 1) {
    removeNotice(noticeQueue[0])
  }

  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.showStatus = "showIn"

  return instance.vm
}

// 绑定回调方法
const notify = (config) => {
  autoRem()
  const vmse = render(config)
  return new Promise((resolve, reject) => {
    // 确认
    vmse.$on('hasConfirm', () => {
      vmse.showStatus = "showOut"
      deletVm(vmse)
      resolve('confirm')
    })

    // 取消
    vmse.$on('hasClear', () => {
      vmse.showStatus = "showOut"
      deletVm(vmse)
      resolve('cancel')
    })
  })
}

export default notify