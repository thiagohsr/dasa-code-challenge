const mutations = {
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
};

export default mutations;
