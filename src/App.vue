<template>
  <div id="app">
    <div @click="showNofity">测试</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {},
  data() {
    return {
      
    }
  },
  methods: {
    showNofity() {
      this.$notice({
        title: "测试",
        content: "尘世内容",
        cancelTxt: "结束",
        confirmTxt: "继续测试"
      }).then(result => {
        if (result == 'confirm') {
          setTimeout(() => {
            this.$notice({
              icon: true,
              content: "测试通过",
              confirm: false
            })
          }, 1000)
        }
      })
    }
  },
}
</script>

<style scoped>
div {
  font-size: 0.24rem;
}
</style>
