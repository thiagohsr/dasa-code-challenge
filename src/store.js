import Vue from "vue";
import Vuex from "vuex";
import { getRepositories } from "@/services/github";
import { GITHUB_USER_REPOS } from "@/constants/urls";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    githubUser: "",
    errorMessage: "",
    userRepositories: [],
    paginationLinks: {},
    isLoading: false
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
    },
    isLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  getters: {
    errorMessage: ({ errorMessage }) => errorMessage,
    githubUser: ({ githubUser }) => githubUser,
    userRepositories: ({ userRepositories }) => userRepositories,
    paginationLinks: ({ paginationLinks }) => paginationLinks,
    isLoading: ({ isLoading }) => isLoading
  },
  actions: {
    async getRepositories({ commit }) {
      const response = await getRepositories;
      console.log("Instance: ", Vue.axios);
    }
  }
});
