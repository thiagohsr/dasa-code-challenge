import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    githubUser: "",
    errorMessage: "",
    userRepositories: [],
    paginationLinks: {}
  },
  mutations: {
    errorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    githubUser(state, githubUser) {
      state.githubUser = githubUser;
    },
    userRepositories(state, userRepositories) {
      state.userRepositories = userRepositories;
    },
    paginationLinks(state, links) {
      state.paginationLinks = links;
    }
  },
  actions: {}
});
