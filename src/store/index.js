import {createStore} from 'vuex'
import router from '../router'
import {auth} from '../firebase'
import { createUserWithEmailAndPassword,  signInWithEmailAndPassword, signOut} from 'firebase/auth'

export default createStore({
    state: {
        user: null
    },mutations : {
        SET_USER (state, user) {
            state.user = user

        }, 
        CLEAR_USER (){
            state.user = null
        },
        actions: {
            async login ({commit}, details){
                const {email, password} = details
                try {
                    await signInWithEmailAndPassword(auth, email, password)
                } catch (error) {
                    if(error.code == 'auth/user-not-found'){
                        alert("User not found");
                    }
                    else if(error.code == 'auth/wrong-password'){
                        alert('Wrong Password');
                    } 
                    else{
                        alert("Somthing went wrong");
                    }

                    return
                }

                commit('SET_USER', auth.currentUser)

                router.push('/')
            },
            async register ({commit}, details){
                const {email, password} = details
                try {
                    await createUserWithEmailAndPassword(auth, email, password)
                } catch (error) {
                    switch(error.code){
                        case 'auth/email-already-in-use':
                            alert("Email already in use")
                            break;
                        case 'auth/invalid-email':
                            alert('Invalid email');
                            break;
                        case 'auth/operation-not-allowed':
                            alert("Operation not alowed");
                            break;
                        case 'auth/weak-passord': 
                            alert("Weak passsword");
                            break;
                        default:
                            alert("Something went wrong");
                    }

                    // if(error.code == 'auth/email-already-in-use'){
                    //     alert("Email already in use");
                    // }
                    // else if(error.code == 'auth/invalid-email'){
                    //     alert('Invalid email');
                    // } 
                    // else if(error.code == 'auth/operation-not-allowed'){
                    //    alert("Operation not alowed")
                    // }
                    // else if(error.code == 'auth/weak-passord'){
                    //     alert("Weak password")
                    // }
                    // else{
                    //     alert("Something went wrong")
                    // }

                    return
                }

                commit('SET_USER', auth.currentUser)

                router.push('/')
            },
            async logout ({commit}){
                await signOut(auth)

                commit('CLEAR_USER')

                router.push('/login')
            },

            fetchUser ({commit}){
                auth.onAuthStateChanged(async user => {
                    if(user === null) {
                        commit('CLEAR_USER')
                    }else {
                        commit('SET_USER', user)

                        if(router.isReady() && router.currentRoute.value.path === '/login'){
                            router.push('/')
                        }
                    }
                })
            }
        }
    }
})