export const strict = false

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}


export const actions = {
    setUser(context, user) {
        context.commit('setUser', user)
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
   