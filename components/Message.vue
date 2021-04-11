<template>
  <div class="chat-container">
   <div class="thumbnail-container">
      <img v-bind:src="message.user.thumbnail" />
   </div>
    <div class="message-container">
     <div class="user-name">{{ displayName }}</div>
     <div class="boxContainer">
       <div class="box">{{ message.text }}</div>
       <button class="box" v-if="isAuthenticated">Edit</button>
     </div>
    </div>
  </div>
</template>

<script>
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
  float: left;
}

</style>