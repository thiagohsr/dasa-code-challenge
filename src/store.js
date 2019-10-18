import Vue from "vue";
import Vuex from "vuex";
import { getRepositories } from "@/services/github";
import parseLinkHeader from "@/utils/githubPaginationParser";
import { USER_REPOS_URL } from "@/constants/urls";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    githubUser: "",
    errorMessage: "",
    userRepositories: [],
    paginationLinks: {},
    isLoading: false,
    reposCount: ""
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
    },
    reposCount(state, count) {
      state.reposCount = count;
    }
  },
  getters: {
    errorMessage: ({ errorMessage }) => errorMessage,
    githubUser: ({ githubUser }) => githubUser,
    userRepositories: ({ userRepositories }) => userRepositories,
    paginationLinks: ({ paginationLinks }) => paginationLinks,
    isLoading: ({ isLoading }) => isLoading,
    reposCount: ({ reposCount }) => {
      return reposCount;
    }
  },
  actions: {
    handleErrors({ commit }, response) {
      if (response.message) {
        commit("errorMessage", "O usuário informado não existe");
        return;
      }
      if (!response.data.length) {
        commit(
          "errorMessage",
          "Não foram encontrados repositórios para o usuário informado."
        );
        commit("userRepositories", []);
        commit("paginationLinks", {});
        return;
      } else {
        commit("errorMessage", "");
      }
    },
    async getRepositories({ commit, dispatch }, { pageUrl, githubUser }) {
      commit("isLoading", true);
      const url = pageUrl
        ? pageUrl
        : USER_REPOS_URL.replace("{{username}}", githubUser);

      const response = await getRepositories(url);
      dispatch("handleErrors", response);
      dispatch("paginationLinks", response);
      commit("githubUser", githubUser);
      commit("userRepositories", response.data);
      if (!pageUrl) {
        dispatch("reposCount", githubUser);
      }
      commit("isLoading", false);
    },
    paginationLinks({ commit }, { headers }) {
      if (headers && headers.link) {
        commit("paginationLinks", parseLinkHeader(headers.link));
      } else {
        commit("paginationLinks", {});
      }
    },
    async reposCount({ commit }, githubUser) {
      let url = USER_REPOS_URL.replace("{{username}}", githubUser);
      const response = await getRepositories(`${url}?per_page=1`);

      if (response.headers && response.headers.link) {
        let reposCount = parseLinkHeader(response.headers.link).last.split(
          "="
        )[2];
        commit("reposCount", reposCount);
      }
    }
  }
});
