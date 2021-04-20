<template>
<div>
  <div class="flex_test-box">
    <div class="flex_test-item">
       Step1 Go to the Group
       <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets3.lottiefiles.com/packages/lf20_7ih0mucp.json"  background="transparent"  speed="1"  style="width: 150px; height: 180px;"  loop controls autoplay></lottie-player>
    </div>
    <div class="flex_test-item">
        Step2 Click Chatform
        <script class="des1" src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
       <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_euceIr/group_chat_05.json"  background="transparent"  speed="1"  style="width: 150px; height: 180px;"  loop controls autoplay></lottie-player>
    </div>
    <div class="flex_test-item">
        Step3 Login
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_q5pk6p1k.json"  background="transparent"  speed="1"  style="width: 150px; height: 180px;"  loop controls autoplay></lottie-player>
    </div>
    <div class="flex_test-item">
        Step4 Enjoy the group chat with Ads
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_7S3E2I.json"  background="transparent"  speed="1"  style="width: 150px; height: 180px;"  loop controls autoplay></lottie-player>
    </div>
</div>
<button class="content2G" v-on:click="login">Login with Google</button>
    <button class="content2F" v-on:click="loginFB3">Login with Facebook</button>
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
}.flex_test-box {
    background-color: #eee;     /* 背景色指定 */
    padding:  10px;             /* 余白指定 */
    display: flex;              /* フレックスボックスにする */
    flex-direction:row;         /* 要素の並び順 */
}

.flex_test-item {
    padding: 10px;
    color:  #fff;               /* 文字色 */
    margin:  10px;              /* 外側の余白 */
    border-radius:  5px;        /* 角丸指定 */
    width: 25%;                 /* 幅指定 */
}

.flex_test-item:nth-child(1) {
    background-color:  #2196F3; /* 背景色指定 */
}

.flex_test-item:nth-child(2) {
    background-color:  #4CAF50; /* 背景色指定 */
}

.flex_test-item:nth-child(3) {
    background-color: #3F51B5; /* 背景色指定 */
}

.flex_test-item:nth-child(4) {
    background-color:  #00BCD4; /* 背景色指定 */
}
.flex_test-box {
    background-color: #eee;     /* 背景色指定 */
    padding:  10px;             /* 余白指定 */
}

.flex_test-item {
    padding: 10px;
    color:  #fff;               /* 文字色 */
    margin:  10px;              /* 外側の余白 */
    border-radius:  5px;        /* 角丸指定 */
}

.flex_test-item:nth-child(1) {
    background-color:  #2196F3; /* 背景色指定 */
}

.flex_test-item:nth-child(2) {
    background-color:  #4CAF50; /* 背景色指定 */
}

.flex_test-item:nth-child(3) {
    background-color: #3F51B5; /* 背景色指定 */
}

.flex_test-item:nth-child(4) {
    background-color:  #00BCD4; /* 背景色指定 */
}

.content2G {
  font-size: 15px;
  display: inline-block;
  border-radius: 30px;
  border: 1px solid #3b8070;
  color: black;
  text-decoration: none;
  padding: 3px 9px;
  background-color:orange;
}

.content2F {
  background-color: blue;
  font-size: 15px;
  display: inline-block;
  border-radius: 30px;
  border: 1px solid #3b8070;
  color: white;
  text-decoration: none;
  padding: 3px 9px;
}
</style>