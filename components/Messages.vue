<template>
 <div class="chats-container">
   <p v-for="channel in filteredUsers" :key="channel.id">
     
        {{ channel.name }}{{ channel.id }}
      </p>
   <message v-for="message in messages" :message="message"/>
 </div>
</template>

<script>
import Message from '~/components/Message'
import { db, firebase } from '~/plugins/firebase'
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
