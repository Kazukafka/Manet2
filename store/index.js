export const strict = false

export const state = () => ({
    user: {
      email: 'test@example.com'
    }
   })

export const getters = {
    isAuthenticated (state) {
        return !!state.user
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    getData (state, payload) {
        state.user.uid = payload.uid
        state.user.email = payload.email
       },
    switchLogin (state) {
        state.user.login = true
    },
}

export const actions = {
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
   