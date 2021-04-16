<template>
  <div class="app-layout"> 
     
    <div class="sidebar">
      <router-link to="/">Home</router-link>
      <p class="allChannels">All Channels</p>
      <ul>
      <p v-for="channel in channels">
        <nuxt-link class="allChannels2" no-prefetch="" :to="`/channels/${channel.id}`">
        {{ channel.name }}
        
        
        
        </nuxt-link>
        <a href="/" class="link"><button class="box2" v-if="isAuthenticated" v-on:click="deleteChannel">Delete</button></a>
      </p>
      
      </ul>
      <p></p><p></p><p></p><p></p>
      
      <div class="wrap">
        <input class="content1" v-model="textInput" v-if="isAuthenticated" placeholder="Input team name">
        <a href="/channels" class="link"><button class="content2" v-if="isAuthenticated" v-on:click="addChannel">Create New Channel</button></a>  
      </div>
      <p v-if="isAuthenticated" class="logout" v-on:click="logout">Logout</p> 
      
    </div>
    <div class="main-content">  
      <nuxt />
    </div>
    <div class="sidebar-right">
      <div class="slide" id="makeImg">
        <img src="@/assets/ad1.png"   alt="くま">
        <img src="@/assets/ad2.png"    alt="ねこ">
        <img src="@/assets/ad3.png"    alt="うし">
        <img src="@/assets/ad4.png"    alt="いぬ">
        <img src="@/assets/ad5.png"  alt="ねずみ">
      </div>
      <div class="slide" id="makeImg">
        <img src="@/assets/ad6.png"   alt="くま">
        <img src="@/assets/ad7.png"    alt="ねこ">
        <img src="@/assets/ad8.png"    alt="うし">
        <img src="@/assets/ad9.png"    alt="いぬ">
        <img src="@/assets/ad10.png"  alt="ねずみ">
      </div>
    </div>
    
  </div>
</template>

<script>
import { db, firebase } from '~/plugins/firebase'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      channels: []
    }
  },
  computed: {
   isAuthenticated() {
     return this.$store.getters.isAuthenticated
   }
  },
  methods: {
    ...mapActions(['setUser']),
    openClick () {
      this.dialogVisible = false
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
        window.alert('Logout DONE')
        })
        .catch((e) => {
          window.alert('Logout Fail')
          console.log(e)
        })
    },
    addChannel(event) {
      if (this.keyDownedForJPConversion(event)) { return }
      const channelId = this.$route.params.id
      db.collection('channels').add({ 
        name: this.textInput
      }).then(() => {
       this.text = null
     })
      //this.$router.go({path: this.$router.currentRoute.path, force: true})
    },
    deleteChannel(event) {
      if (this.keyDownedForJPConversion(event)) { return }
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).delete()
      //this.$router.go({path: this.$router.currentRoute.path, force: false})
    },
    keyDownedForJPConversion (event) {
      const codeForConversion = 229
      return event.keyCode === codeForConversion
    },
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user)
　       db.collection('profiles').doc(user.uid).set({
　         uid: user.uid,
　　        displayName: user.displayName,
　         photoURL: user.photoURL
　       })
      }
    })
    db.collection('channels').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {          
          this.channels.push({id: doc.id, ...doc.data()})
        })
      })
   
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.app-layout {
  display: flex;
}
.sidebar {
  width: 400px;
  background: #228b22;
  height: 100vh;
  padding: 20px;
}
.sidebar p {
  color: #DDDDDD;
  padding-top: 8px;
}
.sidebar a {
  color: #DDDDDD;
}

.sidebar-right {
  width: 500px;
  background: #696969;
  height: 100vh;
  padding: 20px;
}
.sidebar-right p {
  color: #DDDDDD;
  padding-top: 4px;
}
.sidebar-right a {
  color: #DDDDDD;
}
.main-content {
  width: 100%;
  background: #F1F1F1;
  height: 100vh;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.logout {
  font-size: 35px;
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}
.create {
  font-size: 20px;
  position: absolute;
  bottom: 100px;
  display: inline-block;
  border-radius: 30px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 3px 9px;
}
.sample img {
    width: 300px;
    height: auto;
    position: relative;
    overflow: hidden;
}

.wrap {
  position: absolute;
  bottom: 100px;
  display:flex;
  flex-flow: column;
}
.content1 {
  font-size: 15px;
  display: inline-block;
  border-radius: 30px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 3px 9px;
}
.content2 {
  font-size: 15px;
  display: inline-block;
  border-radius: 30px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 3px 9px;
}

.content3 {
  font-size: 20px;
  position: absolute;
  bottom: 100px;
  display: inline-block;
  border-radius: 30px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 3px 9px;
}

.slide {
  position   : relative;
  overflow   : hidden;
  width      : 300px;
  height     : 300px;
  margin     : auto;
}
 
.slide img {
  display    : block;
  position   : absolute;
  width      : inherit;
  height     : inherit;
  opacity    : 0;
  animation  : slideAnime 20s ease infinite;
}
.slide img:nth-of-type(1) { animation-delay: 0s }
.slide img:nth-of-type(2) { animation-delay: 6s }
.slide img:nth-of-type(3) { animation-delay: 12s }
.slide img:nth-of-type(4) { animation-delay: 18s }
.slide img:nth-of-type(5) { animation-delay: 24s }
@keyframes slideAnime{
   0% { opacity: 0; transform: scale(.1, .1)}
   2% { opacity: 1; transform: scale(1, 1)  }
  18% { opacity: 1; transform: scale(1, 1)  }
  20% { opacity: 0; transform: scale(2, 2)  }
 100% { opacity: 0; transform: scale(2, 2)  }
}
.box2{
  float: right;
  font-size: 10px;
  color: black;
}
.allChannels{
  font-size: 25px;
}
.allChannels2{
  font-size: 20px;
}
.manet2 {  
    font-size: 25px;
    font-family: cursive; 
}
</style>