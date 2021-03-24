<template>
  <div class="container">
    <button v-on:click="login">Login</button>
    <button v-on:click="loginFB">FBFB</button>
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
         console.log(user)
       }).catch((error) => {
         window.alert(error)
       })
   },
   loginFB ({ dispatch }) {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function (result) {
    dispatch('checkLogin')
  }).catch(function (error) {
    console.log(error)
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

