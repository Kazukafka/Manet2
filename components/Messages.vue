<template>
<div>
  <div class="chats-container">
    <message v-for="message in messages" :message="message"/>
  </div>
  <h1></h1>
</div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Message from '~/components/Message'
import { db, firebase } from '~/plugins/firebase'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
Vue.use(ElementUI)
export default {
  data () {
    return {
      channels: []
    }
  },
  props: ['messages'],
  components: {
    Message
  },
  mounted () {
    window.addEventListener('scroll', this.scrollWindow),
    db.collection('channels').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {          
          this.channels.push({id: doc.id, ...doc.data()})
        })
      })
    console.log(this.messages)
  },
  methods: {
    returnTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    scrollWindow() {
      const top = 100 // ボタンを表示させたい位置
      this.scroll = chats-container.scrollY
      if (top <= this.scroll) {
        this.buttonActive = true
      } else {
        this.buttonActive = false
      }
    },
    myClick() {
      alert("click")
    },
  }
}
</script>

<style>
.chats-container {
  padding: 16px;
}
h1 {
  border-bottom: solid 3px skyblue;
  position: relative;
}

h1:after {
  position: absolute;
  content: " ";
  display: block;
  border-bottom: solid 3px crimson;
  bottom: -3px;
  width: 30%;
}

</style>
