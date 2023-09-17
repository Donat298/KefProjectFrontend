import { createStore } from "vuex";
import { useApi, useApiPrivate } from "../utils/useApi";

export default createStore({
  state: () => ({
    user: {},
    
    sessionChecked: false,
    accessToken: localStorage.getItem("accessToken") || "",
    selectedCurrency: localStorage.getItem("selectedCurrency") || "balanceeur",
    avatar: localStorage.getItem("userAvatar") || "",
    selectedCurrencyAddress: '',
  }),

  getters: {
    accessToken: (state) => state.accessToken,
    userDetail: (state) => state.user,
    sessionChecked: (state) => state.sessionChecked,
    isAuthenticated: (state) => !!state.accessToken,
    selectedCurrency: (state) => state.selectedCurrency,
  },

  mutations: {
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
      state.user = { balanceusdt: 0, balanceeur: 0, balancebtc: 0, balanceeth: 0 };
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
    setSelectedCurrencyAddress(state, address) {
    state.selectedCurrencyAddress = address;
  },
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

    async getUser({ commit }) {
      try {
        const { data } = await useApiPrivate(this).get(`/api/auth/user`);
        commit("setUser", data);
        commit("setUserAvatar", data.avatar);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
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
  },

  modules: {},
});
