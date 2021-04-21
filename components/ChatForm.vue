<template>
  <div class="input-container">
  <img v-if="isAuthenticated" :src="user.photoURL" class="avatar">
   <textarea v-model="text" v-if="isAuthenticated" v-on:keydown.enter="addMessage"></textarea>
   <textarea v-model="text" v-else v-on:click="openLoginModal"></textarea>
   <table class="box2">
     <tr>
       <td><button class="box2" v-on:click="addSmile">😁</button></td>
       <td><button class="box2" v-on:click="addUmmm">🤨</button></td>
      </tr>
  </table>
       <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="30%">
        <div class="image-container">
          <img src="~/assets/google_sign_in.png" v-on:click="login"/>
        </div>
        <div class="image-container">
          <img src="~/assets/facebook_sign_in.png" v-on:click="FacebookLogin"/>
        </div>
        </el-dialog>
  </div>
</template>
<script>
import { db, firebase } from '~/plugins/firebase'
import Vue from 'vue'
import { mapActions } from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
export default {
  data () {
    return {
      dialogVisible: false,
      text: null,
      channels: []
    }
  },
  computed: {
    user() {
     return this.$store.state.user
   },
   isAuthenticated() {
     return this.$store.getters.isAuthenticated
   }
  },
  mounted() {
    console.log(this.$store.state.user)
  },
  methods: {
    ...mapActions(['setUser']),
    openLoginModal () {
      this.dialogVisible = true
    },
    addMessage(event) {
      if (this.keyDownedForJPConversion(event)) { return }
      const channelId = this.$route.params.id
      if (this.text === null){
        window.alert('Your TEXT is Null')
      } else {
        db.collection('channels').doc(channelId).collection('messages').add({ 
        text: this.text,
        createdAt: new Date().getTime(),
        user: {
          name: this.user.displayName,
          thumbnail: this.user.photoURL
        }
      }).then(() => {
       this.text = null
     })
      }
    },
    
    addSmile(event) {
      if (this.keyDownedForJPConversion(event)) { return }
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('messages').add({ 
        text: '😁',
        createdAt: new Date().getTime(),
        user: {
          name: this.user.displayName,
          thumbnail: this.user.photoURL
        }})
    },

    addUmmm(event) {
      if (this.keyDownedForJPConversion(event)) { return }
      const channelId = this.$route.params.id
      db.collection('channels').doc(channelId).collection('messages').add({ 
        text: '🤨',
        createdAt: new Date().getTime(),
        user: {
          name: this.user.displayName,
          thumbnail: this.user.photoURL
        }})
    },

    deleteChannel(event) {
      if (this.keyDownedForJPConversion(event)) { return }
      const channelId = this.$route.params.id
      this.$router.go({path: this.$router.currentRoute.path, force: true})
      db.collection('channels').doc(channelId).delete()
    },
    keyDownedForJPConversion (event) {
      const codeForConversion = 229
      return event.keyCode === codeForConversion
    },
    login() {
     const provider = new firebase.auth.GoogleAuthProvider()
     firebase.auth().signInWithPopup(provider)
     .then((result) => {
        const user = result.user
        window.alert('Login OK')
        this.setUser(user)
        console.log(this.$store.state.user)
        this.dialogVisible = false
       }).catch((error) => {
         window.alert('Failed, please try again')
       })
    },

    FacebookLogin() {
     const provider = new firebase.auth.FacebookAuthProvider()
     firebase.auth().signInWithPopup(provider)
     .then((result) => {
        const user = result.user
        window.alert('Login OK')
         console.log(user)
       }).catch((error) => {
         window.alert(error)
         window.alert('Failed, please try again')
       })
   },
   
  }
}
export const mutations = {
 getData (state, payload) {
  state.user.uid = payload.uid
  state.user.email = payload.email
 },
 switchLogin (state) {
  state.user.login = true
 },
}
</script>
<style scoped>
.input-container {
  padding: 10px;
  height: 100%;
  display: flex;
}
.avatar {
 height: 100%;
 width: auto;
}

textarea {
  width: 100%;
  height: 100%;
}
.image-container {
 display: flex;
 justify-content: center;
}
img {
 width: 70%;
 cursor: pointer;
}

.box2{
  float: right;
  font-size: 30px;
  color: black;
}

.rect-wrap {
  width: 50% ;
}
.rect {
  width : 100% ;
  padding-top : 100% ;
  background-color: #29d632;
}
li{
  list-style:none;
  background-color:#73BDFA;
  padding: 8px;
  margin:4px
}
.flex-container{
		display:flex;
}

.my-parts {
	display: inline-block;
	font-size: 16px;
	padding: .8em 1.6em .4em .8em;
	position: relative;
	color: #fff;
	z-index: 1;
}
.my-parts::before {
	content: "";
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
	background: #01579B;
	transform: scaleY(1.3) perspective(.6em) rotateX(5deg);
	transform-origin: bottom left;
	border-radius: 8px 8px 0 0;
}

table{
margin:auto;
}
</style>