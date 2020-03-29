import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const Module = {
  state: {
    loaded: false,
    people: [],
  },
  getters: {
    LOADED: (state) => {
      return state.loaded;
    },
    PEOPLE: (state) => {
      return state.people;
    },
  },
  mutations: {
    SET_PEOPLE(state, data) {
      state.people = [...data];
    },
    ADD_NEW_ITEM(state, item) {
      state.people = [...state.people, item];
    },
    SET_LOADED(state, value) {
      state.loaded = value;
    },
  },
  actions: {
    GET_DATA({ commit }) {
      const pageNumbers = Array(9).fill(0);

      let requests = pageNumbers.map((el, page) =>
        fetch(`https://swapi.co/api/people/?page=${page + 1}`)
      );
      return Promise.all(requests)
        .then((responses) => responses)
        .then((responses) => Promise.all(responses.map((r) => r.json())))
        .then((result) => Promise.all(result.map((r) => r.results)))
        .then((people) => {
          let peopleData = [];
          people.map((data) => peopleData.push(...data.map((item) => item)));
          commit("SET_PEOPLE", peopleData);
          return peopleData;
        })
        .then((peopleData) => {
          commit("SET_LOADED", true);
          return peopleData;
        });
    },
  },
};

const store = new Vuex.Store(Module);

export default store;
