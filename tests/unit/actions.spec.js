import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import actions from "@/store/actions";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Actions test", () => {
  it(`should call handleErrors and commit errorMessage with not found user message`, () => {
    let commit = jest.fn();
    let expectedMessage = "O usuário informado não existe";
    let response = {
      message: "github user not found ir request failed for some reason"
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("errorMessage", expectedMessage);
  });

  it(`should call handleErrors and commit errorMessage with no repos for given
      user message`, () => {
    let commit = jest.fn();
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
    let commit = jest.fn();
    let expectedValue = [];
    let response = {
      data: []
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("userRepositories", expectedValue);
  });

  it(`should call handleErrors and commit paginationLinks with empty
           object`, () => {
    let commit = jest.fn();
    let expectedValue = {};
    let response = {
      data: []
    };
    actions.handleErrors({ commit }, response);

    expect(commit).toHaveBeenCalledWith("paginationLinks", expectedValue);
  });
});
