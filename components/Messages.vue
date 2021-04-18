<template>
<div>
  <div class="box17">
    <message v-for="message in messages" :message="message"/>
    <h1></h1>
  </div>
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

.box7{
    padding: 0.5em 1em;
    margin: 2em 0;
    color: #474747;
    background: whitesmoke;/*背景色*/
    border-left: double 7px #4ec4d3;/*左線*/
    border-right: double 7px #4ec4d3;/*右線*/
}
.box7 p {
    margin: 0; 
    padding: 0;
}

.box17{
    margin:2em 0;
    position: relative;
    padding: 0.5em 1.5em;
    border-top: solid 2px black;
    border-bottom: solid 2px black;
}
.box17:before, .box17:after{
    content: '';
    position: absolute;
    top: -10px;
    width: 2px;
    height: -webkit-calc(100% + 20px);
    height: calc(100% + 20px);
    background-color: black;
}
.box17:before {left: 10px;}
.box17:after {right: 10px;}
.box17 p {
    margin: 0; 
    padding: 0;
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
