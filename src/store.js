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
        const cards = cardsFetch.cards;
        const users = Object.keys(cards);

        const cacheFetch = await fetch("https://jmcd.uk/mtg/getCache").then(
          (r) => r.json()
        );
        const cache = cacheFetch.results;

        commit("SET_CARDS", cards);
        commit("SET_USERS", users);
        commit("SET_CACHE", cache);

        document.getElementById("app").classList.remove("none");
        document.getElementById("app").classList.add("fade-in");
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
