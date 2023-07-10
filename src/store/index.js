import { createStore } from "vuex";
import { useApi, useApiPrivate } from "../utils/useApi"



export default createStore({
    state: () => {
        return {
            user: {},
            accessToken: "",           
            sessionChecked: false
        }
    },
    getters: {
        accessToken: (state) => state.accessToken,
        userDetail: (state) => state.user,
        sessionChecked: (state) => state.sessionChecked,
        isAuthenticated: (state) => state.accessToken ? true : false
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        setUser(state, user) {
            state.user = user;
        },
        setSessionChecked(state, sessionChecked) {
            state.sessionChecked = sessionChecked;
        }
    },
    actions: {
        async attempt({ commit, dispatch }) {

            setTimeout(
                () => {
                    dispatch("refresh")
                    .then(() => {
                        dispatch("getUser")
                            .then(() => {
                                commit("setSessionChecked", true);
                            })
                            .catch(() => {
                                commit("setSessionChecked", true);
                            });
                        
                    }).catch(() => { 
                        commit("setSessionChecked", true);
                    });
                }
                , 500);


        },


        async login({ commit, dispatch }, payload) {

            return new Promise((resolve, reject) => {

                const { data } = useApi().post(`/api/auth/login`, payload)
                    .then((response) => {
                        commit('setAccessToken', response.data.access_token);
                        dispatch("getUser");
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log("error " + error);
                        console.log("errors " + error.response.data.message);
                        reject(error.response.data.message);
                    }

                    );

            });
        },

        async register({ commit, dispatch }, payload) {

            return new Promise((resolve, reject) => {

                const { data } = useApi().post(`/api/auth/register`, payload)
                    .then((response) => {
                        commit('setAccessToken', response.data.access_token);
                        dispatch("getUser");
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log("error " + error);
                        console.log("errors " + error.response.data.message);
                        reject(error.response.data.message);
                    }

                    );

            });
        },

        async getUser({ commit }) {
            return new Promise((resolve, reject) => {

                useApiPrivate(this).get(`/api/auth/user`)
                    .then((response) => {
                        commit("setUser", response.data);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        
                    }

                    );

            });

        },

        async logout({ commit }) {
            try {
                const { data } = await useApiPrivate(this).post(`/api/auth/logout`);
                commit('setAccessToken', "");
                commit("setUser", {});
                return data;
            } catch (error) {
                throw error.message;
            }
        },

        async refresh({ commit }) {
            console.log("refresh");

            return new Promise((resolve, reject) => {

                const { data } = useApi().post(`/api/auth/refresh`)
                    .then((response) => {
                        commit('setAccessToken', response.data.access_token);
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error.response.data.message);
                    }

                    );

            });


        }
    },
    modules: {

    }

})