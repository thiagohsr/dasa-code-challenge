const getters = {
  errorMessage: ({ errorMessage }) => errorMessage,
  githubUser: ({ githubUser }) => githubUser,
  userRepositories: ({ userRepositories }) => userRepositories,
  paginationLinks: ({ paginationLinks }) => paginationLinks,
  isLoading: ({ isLoading }) => isLoading,
  reposCount: ({ reposCount }) => reposCount
};

export default getters;
