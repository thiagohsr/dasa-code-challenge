import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import actions from "@/store/actions";
import mockAxios from "axios";
import parseLinkHeader from "@/utils/githubPaginationParser";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Actions test", () => {
  let userRepositoriesData;
  let commit;
  let dispatch;
  let pageUrl;
  let githubUser;
  beforeEach(() => {
    userRepositoriesData = [
      {
        html_url: "www",
        name: "name of repository",
        stargazers_count: 123
      },
      {
        html_url: "www2",
        name: "name of repository2",
        stargazers_count: 123
      }
    ];
    commit = jest.fn();
    dispatch = jest.fn();
  });

  it(`should call handleErrors and commit errorMessage with not found user message`, () => {
    let expectedMessage = "O usuário informado não existe";
    let response = {
      message: "github user not found ir request failed for some reason"
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("errorMessage", expectedMessage);
  });

  it(`should call handleErrors and commit errorMessage with no repos for given
      user message`, () => {
    let expectedMessage =
      "Não foram encontrados repositórios para o usuário informado.";
    let response = {
      data: []
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("errorMessage", expectedMessage);
  });

  it(`should call handleErrors and commit userRepositories with empty
      array`, () => {
    let expectedValue = [];
    let response = {
      data: []
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("userRepositories", expectedValue);
  });

  it(`should call handleErrors and commit paginationLinks with empty
      object`, () => {
    let expectedValue = {};
    let response = {
      data: []
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("paginationLinks", expectedValue);
  });

  it(`should call handleErrors and commit errorMessage as empty string`, () => {
    let expectedMessage = "";
    let response = {
      data: userRepositoriesData
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("errorMessage", expectedMessage);
  });

  it(`should call getRepositories and commit isLoading with true`, () => {
    let expectedValue = true;

    actions.getRepositories({ commit, dispatch }, { pageUrl, githubUser });

    expect(commit).toHaveBeenCalledWith("isLoading", expectedValue);
  });

  it(`should getRepositories action call getRepositories api with given user in url`, async () => {
    let githubUser = "githubUser";
    let expectedApiUrlValue = "https://api.github.com/users/githubUser/repos";
    let apiCall = await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: userRepositoriesData
      })
    );
    await actions.getRepositories(
      { commit, dispatch },
      { pageUrl, githubUser }
    );
    expect(apiCall).toHaveBeenCalledWith(expectedApiUrlValue);
  });

  it(`should getRepositories action call getRepositories api with pagination url`, async () => {
    let expectedApiUrlValue = "https://api.github.com/user/339286/repos?page=2";
    pageUrl = expectedApiUrlValue;
    let apiCall = await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: []
      })
    );
    await actions.getRepositories(
      { commit, dispatch },
      { pageUrl, githubUser }
    );
    expect(apiCall).toHaveBeenCalledWith(expectedApiUrlValue);
  });

  it(`should getRepositories action dispatch reposCount`, async () => {
    let githubUser = "githubUser";
    let expectedValue = githubUser;
    let pageUrl = "";

    await actions.getRepositories(
      { commit, dispatch },
      { pageUrl, githubUser }
    );

    expect(dispatch).toHaveBeenCalledWith("reposCount", expectedValue);
  });

  it(`should getRepositories action commit userRepositories with repos data`, async () => {
    let githubUser = "githubUser";
    let expectedValue = userRepositoriesData;
    await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: userRepositoriesData
      })
    );
    await actions.getRepositories(
      { commit, dispatch },
      { pageUrl, githubUser }
    );
    expect(commit).toHaveBeenCalledWith("userRepositories", expectedValue);
  });

  it(`should paginationLinks action called with headers link`, () => {
    let links = `<https://api.github.com/user/339286/repos?page=1>; rel="prev", <https://api.github.com/user/339286/repos?page=3>; rel="next", <https://api.github.com/user/339286/repos?page=6>; rel="last", <https://api.github.com/user/339286/repos?page=1>; rel="first"`;
    let expectedValue = parseLinkHeader(links);
    let response = {
      headers: {
        link: links
      }
    };
    actions.paginationLinks({ commit }, response);

    expect(commit).toHaveBeenCalledWith("paginationLinks", expectedValue);
  });

  it(`should paginationLinks action called without headers link`, () => {
    let expectedValue = {};
    let response = {
      headers: {}
    };
    actions.paginationLinks({ commit }, response);

    expect(commit).toHaveBeenCalledWith("paginationLinks", expectedValue);
  });

  it(`should reposCount action call getRepositories api with given user
      and pagination limit in url`, async () => {
    let githubUser = "githubUser";
    let expectedApiUrlValue =
      "https://api.github.com/users/githubUser/repos?per_page=1";
    let apiCall = await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: []
      })
    );
    actions.reposCount({ commit }, githubUser);
    expect(apiCall).toHaveBeenCalledWith(expectedApiUrlValue);
  });

  it(`should reposCount action commit reposCount with value of last page
      param returned on request headers`, async () => {
    let githubUser = "githubUser";
    let links = `<https://api.github.com/user/339286/repos?per_page=1&page=2>;
    rel="next", <https://api.github.com/user/339286/repos?per_page=1&page=174>;
    rel="last"`;

    let expectedApiUrlValue =
      "https://api.github.com/users/githubUser/repos?per_page=1";
    let apiCall = await mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        headers: { link: links }
      })
    );
    await actions.reposCount({ commit }, githubUser);

    expect(apiCall).toHaveBeenCalledWith(expectedApiUrlValue);
    expect(commit).toBeCalledWith("reposCount", "174");
  });
});
