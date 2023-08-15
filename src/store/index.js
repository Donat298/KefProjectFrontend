//here is my store
import { createStore } from "vuex";
import { useApi, useApiPrivate } from "../utils/useApi"



export default createStore({
    state: () => {
        return {
            user: /*JSON.parse(localStorage.getItem('user')) || */ {}, 
            accessToken: localStorage.getItem('accessToken') || "", 
            sessionChecked: false,
            selectedCurrency: localStorage.getItem('selectedCurrency') || 'balance',
            
        }
    },
    getters: {
        accessToken: (state) => state.accessToken,
        userDetail: (state) => state.user,
        sessionChecked: (state) => state.sessionChecked,
        isAuthenticated: (state) => state.accessToken ? true : false,
        selectedCurrency: (state) => state.selectedCurrency,
    },
    mutations: {
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken); 
        },
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user)); 
        },
        setSessionChecked(state, sessionChecked) {
            state.sessionChecked = sessionChecked;
        },
        clearAuthData(state) {
            state.accessToken = '';
            state.user = {
                balance: 0,
                balanceeur: 0,
                balancebtc: 0,
                balanceeth: 0,
            };
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        },
        setUserBalance(state, newBalance) {
            state.user.balance = newBalance;

          },
          setUserBalanceeur(state, newBalanceeur) {
            state.user.balanceeur = newBalanceeur;

          },
          setUserBalancebtc(state, newBalancebtc) {
            state.user.balancebtc = newBalancebtc;

          },
          setUserBalanceeth(state, newBalanceeth) {
            state.user.balanceeth = newBalanceeth;

          },
          setSelectedCurrency(state, newSelectedCurrency) {
            state.selectedCurrency = newSelectedCurrency;
            localStorage.setItem('selectedCurrency', newSelectedCurrency);
          },   
    },
   
    actions: {
        async updateBalance({ commit }, {currency, amount}) {
            if (currency === 'eur'){
                commit("setUserBalanceeur", amount);
            }
            else if (currency === 'btc'){
                commit("setUserBalancebtc", amount);
            }
            else if (currency === 'eth'){
                commit("setUserBalanceeth", amount);
            }
            else if (currency === 'trc'){
                commit("setUserBalance", amount);
            }
        },


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
                , 0);


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
                commit('clearAuthData'); 
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

