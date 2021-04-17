<template>
<div class="chats-container" v-on:keydown.enter="scrollToEnd" style="max-height:690px; overflow-y: auto;">
  <message v-for="message in messages" :message="message"/>
</div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Message from '~/components/Message'
import { db, firebase } from '~/plugins/firebase'
Vue.use(ElementUI)
export default {
  data () {
    return {
      channels: []
    }
  },
  method: {
    scrollToEnd: function() {    	
      var container = this.$el.querySelector("#chats-container");
      container.scrollTop = container.scrollHeight;
    },
  },
  props: ['messages'],
  components: {
    Message
  },
  mounted () {
    db.collection('channels').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {          
          this.channels.push({id: doc.id, ...doc.data()})
        })
      })
    console.log(this.messages)
  }
}
</script>

<style>
.chats-container {
  padding: 16px;
}
</style>
