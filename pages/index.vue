<template>
  <div class="container">
    <button class="glog" v-on:click="login">Google Login</button>
    <button class="flog" v-on:click="loginFB3">Facebook Login</button>
    <div class="box">
    <div class="inner">
        <div class="content">
          <h1>Sample</h1>
<ul class="box-list">
  <li>
    <script class="des1" src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_euceIr/group_chat_05.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player>
  </li>
  <li>
  </li>
  <li>
  </li>
  
  <li>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_7S3E2I.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player>
  </li>
</ul>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { firebase } from '~/plugins/firebase'
export default {

  
 methods: {
   login() {
     const provider = new firebase.auth.GoogleAuthProvider()
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
   loginFB3() {
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
   loginFB2() {
     const provider = new firebase.auth.FacebookAuthProvider()
     firebase.auth().signInWithPopup(provider)
     .then((result) => {
        const user = result.user
        window.alert('Login OK')
        this.setUser(user)
        console.log(this.$store.state.user)
        this.dialogVisible = false
       }).catch((error) => {
         window.alert('FAIL')
       })
    },
   loginFB ({ dispatch }) {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function (result) {
    dispatch('checkLogin')
    window.alert('Login OK')
  }).catch(function (error) {
    console.log(error)
    window.alert('FAIL')
  })
},
 checkLogin ({ commit }) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      commit('getData', { uid: user.uid, email: user.email })
      commit('switchLogin')
    }
  })
},
 }
}
</script>

<style>
.image-container {
 display: flex;
 justify-content: center;
}

.glog {
  background-color: orange;
}

.flog{
  background-color: skyblue;
}

*{
    box-sizing: border-box;
}
.box-list{
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.box-list li{
  float: left;
  width: 19%;
  margin-bottom: 1%;
  margin-right: 1.25%;
}
ul li:last-child{
  margin-right:0;
}
img{
  width: 100%
}

.box{
    background: #ed4343;
    display: table;
    height: 400px;
    text-align: center;
    width: 100%;
}
.inner{
    display: table-cell;
    vertical-align: middle;
}
.content{
    display: inline-block;
    padding: 20px;
}

.des1{
  width:100%;
    background:#EEE;
    padding:15px;
    box-sizing:border-box;
    box-sizing:border-box;
}



</style>