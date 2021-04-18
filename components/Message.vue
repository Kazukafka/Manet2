<template>
  <div v-if="isAuthenticated" class="chat-container">
   <div class="thumbnail-container">
      <img v-bind:src="message.user.thumbnail" />
   </div>
    <div class="message-container">
     <div class="user-name">{{ displayName }}</div>
     <div class="boxContainer">
       <div class="box1">{{ message.text }}</div>
       <p></p>
     </div>
    </div>
  </div>
</template>

<script>

var speed = 100; // スクロールのスピード（1に近いほど速く）
var move = 5; // スクロールのなめらかさ（1に近いほどなめらかに）

var x = 0;
var y = 0;
var nx = 0;
var ny = 0;
export default {
  props: ['message'],
  data() {
    return {
      message: {
        text: "ABCD",
        user: {
          thumbnail: '~/assets/test.png',
          name: 'note'
        }
      }
    }
  },
  computed: {
    displayName() {
      return `@${this.message.user.name}`
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
   },
   methods: {
     addMessage(event) {
      if (this.keyDownedForJPConversion(event)) { return }
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('messages').add({ 
        text: this.text,
        createdAt: new Date().getTime(),
        user: {
          name: this.user.displayName,
          thumbnail: this.user.photoURL
        }
      })
        .then(() => {
          this.text = null
        })
    },
   }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  padding: 8px;
}
.thumbnail-container {
  margin-right: 16px;
}
.thumbnail-container img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.user-name {
  font-weight: bold;
}
.edit {
  font-weight: bold;
}
.boxContainer{
  overflow: hidden;
}
.box{
  float: right;
  font-size: 10px;
  color: grey;
}
.box1{
  float: left;
  font-size: 18px;
}
.box2{
  float: right;
  font-size: 10px;
  color: orange;
}


</style>