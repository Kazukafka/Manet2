<template>
  <div class="app-layout"> 
     
    <div class="sidebar">
      <p>All Channels</p>
      <p v-for="channel in channels">
        <nuxt-link :to="`/channels/${channel.id}`">{{ channel.name }}</nuxt-link>
      </p>
      <div class="wrap">
        <input class="content1" v-model="textInput" v-if="isAuthenticated" placeholder="Input team name">
        <button class="content2" v-if="isAuthenticated" v-on:click="addChannel">Create New Channel</button>
        
      </div>
      
      <p v-if="isAuthenticated" class="logout" v-on:click="logout">Logout</p>
      
      
    </div>
    <div class="main-content">  
      <nuxt />
    </div>
    <div class="sidebar-right">
      <p class="sample">
        <div class="slide">
          <img src="~/assets/SampleAd1.png" width="370" height="370">
          <img src="~/assets/SampleAd2.png" width="370" height="370">
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
      this.$router.go({path: this.$router.currentRoute.path, force: true})
      db.collection('channels').add({ 
        name: this.textInput
      })
        .then(() => {
          this.text = "TEST"
        })
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

</style>