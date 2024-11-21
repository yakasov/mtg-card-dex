import { createStore } from "vuex";

export default createStore({
  state: {
    cards: {},
    users: [],
    cache: {},
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CACHE(state, cache) {
      state.cache = cache;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const cardsFetch = await fetch("https://jmcd.uk/mtg/getCards").then(
          (r) => r.json()
        );
        const cards = cardsFetch.data;
        const users = Object.keys(cards);

        const cacheFetch = await fetch("https://jmcd.uk/mtg/getCache").then(
          (r) => r.json()
        );
        const cache = cacheFetch.data;

        commit("SET_CARDS", cards);
        commit("SET_USERS", users);
        commit("SET_CACHE", cache);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  getters: {
    getCards: (state) => state.cards,
    getUsers: (state) => state.users,
    getCache: (state) => state.cache,
  },
});
