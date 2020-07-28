<template>
  <div class="mantle" :class="mantleStatus">
    <div class="notification" :class="showStatus">
    <div class="title" v-if="!icon">{{ title }}</div>
    <img v-if="icon" :src="iconUrl" alt="success" class="successIcon" />
    <div class="content">{{ content }}</div>
    <div class="btnGroup" v-if="confirm">
      <div class="cancel" @click="cancelFn">{{ cancelTxt }}</div>
      <div class="confirm" @click="confirmFn">{{ confirmTxt }}</div>
    </div>
    <img
      v-if="!confirm"
      @click="cancelFn"
      :src="cancelImg"
      alt="cancel"
      class="cancelIcon"
    />
  </div>
  </div>
</template>

<script>
import confirmImg from './confirm.png'
import cancelImg from './cancel.png'

export default {
  name: "Notification",
  created() {},
  
  data() {
    return {
      cancelImg,
      showStatus: "showIn",
      mantleStatus: {
        "allOver": this.isOver
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('hashchange', this.clear);
    });
  },

  props: {
    title: {
      type: String,
      default: '标题',
    },
    content: {
      type: String,
      default: '这里是弹窗内容',
    },
    confirm: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    iconUrl: {
      default: confirmImg
    },
    cancelTxt: {
      type: String,
      default: '取消',
    },
    confirmTxt: {
      type: String,
      default: '确认',
    },
    isOver: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancelFn() {
      this.$emit('hasClear')
    },
    confirmFn() {
      this.$emit('hasConfirm')
    },
    clear() {
      this.$destroy(true)
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('hashchange', this.clear);
  },
}
</script>

<style scoped>
.mantle {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  overflow: hidden;
  transition: background 0.3s;
}
.allOver { background: rgba(0,0,0,0.5); }
.notification {
  position: absolute;
  left: 0.37rem;
  right: 0.37rem;
  bottom: 2.92rem;
  background-color: #ffffff;
  box-shadow: 0 0.03rem 0.1rem 0 rgba(0, 0, 0, 0.13);
  border-radius: 0.1rem;
  padding: 0.24rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.notification .title {
  font-size: 0.17rem;
  line-height: 0.24rem;
  margin-bottom: 0.14rem;
}
.notification .successIcon {
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.13rem;
  margin-bottom: 0.24rem;
}
.notification .content {
  font-size: 0.15rem;
  line-height: 0.21rem;
  opacity: 0.87;
}
.notification .btnGroup {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.15rem;
  line-height: 0.21rem;
  margin-top: 0.18rem;
}
.notification .cancelIcon {
  position: absolute;
  right: 0.1rem;
  top: 0.08rem;
  width: 0.3rem;
  height: 0.3rem;
}

.showOut {
  opacity: 0;
  transform: scale(0);
  transition: 0.3s;
}
.showIn {
  opacity: 1;
  transform: scale(1);
  transition: 0.3s;
}
</style>
