//index.js
import { createStore } from "vuex";
import { useApi, useApiPrivate } from "../utils/useApi";

export default createStore({
  state: () => ({
    user: {
      deposit: 0,
    },
    gameInProgress: false,
    sessionChecked: false,
    accessToken: localStorage.getItem("accessToken") || "",
    selectedCurrency: localStorage.getItem("selectedCurrency") || "balanceusdt",
    avatar: localStorage.getItem("userAvatar") || "",
    incomingMessage: null,
    getBalanceTimer: null,
    snackbarBonus: null,

    usdtaddress: '',
    btcaddress: '',
    isUserMessagesRequestInProgress: false,
  }), 

  getters: {
    accessToken: (state) => state.accessToken,
    userDetail: (state) => state.user,
    sessionChecked: (state) => state.sessionChecked,
    isAuthenticated: (state) => !!state.accessToken,
    selectedCurrency: (state) => state.selectedCurrency,
  },

  mutations: {
    setSnackbarBonusData(state, data) {
      state.snackbarBonus = data;
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },

    setUser(state, user) {
      state.user = user; 
      localStorage.setItem("user", JSON.stringify(user));
    },


    setSessionChecked(state, sessionChecked) {
      state.sessionChecked = sessionChecked;
    },

    clearAuthData(state) {
      state.accessToken = "";
      state.user = {balancebtc: 0, balanceusdt: 0, balanceeth: 0, balancebnb: 0,
         balanceeuroc: 0, 
        balanceltc: 0,  balancedoge: 0, balanceusdc: 0, balancebch: 0,
         balanceada: 0, balancematic: 0, balancetrx: 0 };
         localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },

    setUserAvatar(state, avatarUrl) {
      state.avatar = avatarUrl;
      localStorage.setItem("userAvatar", avatarUrl); 
    },

    setSelectedCurrency(state, newSelectedCurrency) {
      state.selectedCurrency = newSelectedCurrency;
      localStorage.setItem("selectedCurrency", newSelectedCurrency);
    },

    setUserBalance(state, { currency, amount }) {
      state.user[`balance${currency}`] = amount;
    },
    setGameInProgress(state, value) {
      state.gameInProgress = value;
    },
    setIncomingMessage(state, messageData) {
      state.incomingMessage = messageData;
    },
    setDeposit(state, deposit) {
      state.user.deposit = deposit;
    },
  

    setUsdtAddress(state, usdtaddress) {
      state.usdtaddress = usdtaddress;
    },
 
    setBtcAddress(state, btcaddress) {
      state.btcaddress = btcaddress;
    }
  },

  actions: {
    async updateBalance({ commit }, { currency, amount }) {
      commit("setUserBalance", { currency, amount });
    },

    async attempt({ commit, dispatch }) {
      setTimeout(() => {
        dispatch("refresh")
          .then(() => {
            dispatch("getUser")
              .then(() => commit("setSessionChecked", true))
              .catch(() => commit("setSessionChecked", true));
          })
          .catch(() => {
            commit("setSessionChecked", true);
            commit("setAccessToken", null);
          });
      }, 0);
    },

    async login({ commit, dispatch }, payload) {
      try {
        const { data } = await useApi().post(`/api/auth/login`, payload);
        commit("setAccessToken", data.access_token);
        await dispatch("getUser");
        return data;
      } catch (error) {
        console.error(error);
        throw error.response?.data?.message || "An error occurred during login.";
      }
    },

    async register({ commit, dispatch }, payload) {
      try {
        const { data } = await useApi().post(`/api/auth/register`, payload);
        commit("setAccessToken", data.access_token);
        await dispatch("getUser");
        return data;
      } catch (error) {
        console.error(error);
        throw error.response?.data?.message || "An error occurred during registration.";
      }
    },

  
    

    async logout({ commit }) {
      try {
        await useApiPrivate(this).post(`/api/auth/logout`);
        commit("setAccessToken", "");
        commit("setUser", {});
        commit("clearAuthData");
      } catch (error) {
        console.error(error);
        throw error.message;
      }
    },

    async refresh({ commit }) {
      console.log("refresh");
      try {
        const { data } = await useApi().post(`/api/auth/refresh`);
        commit("setAccessToken", data.access_token);
        return data;
      } catch (error) {
        console.error(error);
        throw error.response?.data?.message || "An error occurred during token refresh.";
      }
    },
    async getUser({ commit, dispatch, state }) {
      try {
        const { data } = await useApiPrivate(this).get(`/api/auth/user`);
        commit("setUser", data);
  
        // Clear the existing timer if it exists
        if (state.getBalanceTimer) {
          clearInterval(state.getBalanceTimer);
        }
  
        // Set up a new timer to call 'getBalanceAndDeposit' and 'getUserMessages' every 10 seconds
        state.getBalanceTimer = setInterval(async () => {
          // Only dispatch 'getUserMessages' and 'getBalanceAndDeposit' if the previous request has completed
          if (!state.isUserMessagesRequestInProgress) {
            state.isUserMessagesRequestInProgress = true;
            try {
              await dispatch('getUserMessages');
              dispatch('getBalanceAndDeposit');
            } catch (error) {
              console.error(error);
            } finally {
              state.isUserMessagesRequestInProgress = false;
            }
          }
        }, 20000);
    
        commit("setUserAvatar", data.avatar);
        // Add this line to set usdtaddress
        commit('setUsdtAddress', data.ethERC20BSC20MATIC.address);
        commit('setBtcAddress', data.btc.address);
  
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async getBalanceAndDeposit({ commit, state }) {

      try {
  
        if (!state.gameInProgress) {
          const response = await useApiPrivate(this).get(`/api/user/getBalances`);
          commit('setUserBalance', { currency: 'btc', amount: response.data.balancebtc });
          commit('setUserBalance', { currency: 'usdt', amount: response.data.balanceusdt });
           
          commit('setUserBalance', { currency: 'eth', amount: response.data.balanceeth });
          commit('setUserBalance', { currency: 'bnb', amount: response.data.balancebnb });
          commit('setUserBalance', { currency: 'euroc', amount: response.data.balanceeuroc });
    
       
          commit('setUserBalance', { currency: 'ltc', amount: response.data.balanceltc });
    
          commit('setUserBalance', { currency: 'doge', amount: response.data.balancedoge });
          commit('setUserBalance', { currency: 'usdc', amount: response.data.balanceusdc });
          commit('setUserBalance', { currency: 'bch', amount: response.data.balancebch });
          commit('setUserBalance', { currency: 'ada', amount: response.data.balanceada });
          commit('setUserBalance', { currency: 'matic', amount: response.data.balancematic });
          commit('setUserBalance', { currency: 'trx', amount: response.data.balancetrx });

          // Add this line to update the deposit
          if (typeof response.data.deposit === 'number') {
            commit('setDeposit', response.data.deposit);
          }
          console.log('getBalanceAndDeposit FIN 3');
        
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getUserMessages({ commit, state }) {
  
      try {

        console.log("getUserMessages START 1");
        if (!state.gameInProgress) {
          const response = await useApiPrivate(this).get(`/api/user/getUserMessages`);
  
          if (Array.isArray(response.data.userMessages)) {
            const depositAddedMessages = response.data.userMessages.filter(
              (message) => message.type === "DEPOSIT-ADDED-TO-BALANCE"
            );
  
            const tipAddedMessages = response.data.userMessages.filter(
              (message) => message.type === "TIP-ADDED-TO-BALANCE"
            );
  
            if (depositAddedMessages.length > 0) {
              commit('setIncomingMessage', depositAddedMessages[0]);
            }
  
            if (tipAddedMessages.length > 0) {
              commit('setIncomingMessage', tipAddedMessages[0]);
            }
          }
        
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("getUserMessages FIN 2");
        // Set the flag to false at the end of the request, regardless of whether it succeeded or failed
  
      }
    },
    async dispatchSnackbarBonusData({ commit }, data) {
      commit('setSnackbarBonusData', data);
    },
    
   
   

  },

  modules: {},
});
