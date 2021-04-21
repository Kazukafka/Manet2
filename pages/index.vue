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
<div class="centre">
<button class="content2G" v-on:click="login">Login with Google</button>
    <button class="content2F" v-on:click="FacebookLogin">Login with Facebook</button>
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
    background-color: #eee;
    padding:  10px;
    display: flex;
    flex-direction:row;
}

.flex_test-item {
    padding: 10px;
    color:  #fff;
    margin:  10px;
    border-radius:  5px;
    width: 25%;
}

.flex_test-item:nth-child(1) {
    background-color:  #2196F3;
}

.flex_test-item:nth-child(2) {
    background-color:  #4CAF50;
}

.flex_test-item:nth-child(3) {
    background-color: #3F51B5;
}

.flex_test-item:nth-child(4) {
    background-color:  #00BCD4;
}
.flex_test-box {
    background-color: #eee;
    padding:  10px;
}

.flex_test-item {
    padding: 10px;
    color:  #fff; 
    margin:  10px;
    border-radius:  5px;
}

.flex_test-item:nth-child(1) {
    background-color:  #2196F3;
}

.flex_test-item:nth-child(2) {
    background-color:  #4CAF50;
}

.flex_test-item:nth-child(3) {
    background-color: #3F51B5;
}

.flex_test-item:nth-child(4) {
    background-color:  #00BCD4;
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

.centre {
  height: 10rem;
  text-align: center;
}
</style>