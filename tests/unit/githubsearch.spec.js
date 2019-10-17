import GithubSearch from "@/components/GithubSearch.vue";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("GithubSearch component tests", () => {
  let actions;
  let store;
  let state;
  let mutations;
  let getters;
  beforeEach(() => {
    state = {
      githubUser: "",
      errorMessage: "",
      userRepositories: [],
      paginationLinks: {},
      isLoading: false
    };
    mutations = {
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
    };
    getters = {
      githubUser: state => {
        return state.githubUser;
      }
    };
    actions = {
      getRepositories: ({ commit }, { githubUser }) => {
        commit("githubUser", githubUser);
      },
      githubUser: ({ commit }, { githubUser }) => {
        commit("githubUser", githubUser);
      }
    };
    store = new Vuex.Store({
      state,
      actions,
      mutations,
      getters
    });
  });
  it("should render properly", () => {
    const shallowed = shallowMount(GithubSearch);
    expect(shallowed).toMatchSnapshot();
    expect(shallowed.name()).toBe("GithubSearch");
  });
  it("should render properly child components", () => {
    const shallowed = shallowMount(GithubSearch);
    const customInput = shallowed.find("custom-input-stub");
    const customButton = shallowed.find("custom-button-stub");
    expect(customInput.name()).toBe("CustomInput");
    expect(customButton.name()).toBe("CustomButton");
  });
  it("should enable button when fill input", () => {
    const mounted = mount(GithubSearch);
    const customInput = mounted.find("input");
    const customButton = mounted.find("button");
    expect(customButton.attributes().disabled).toBe("disabled");
    customInput.setValue("githubUser");
    expect(customButton.attributes().disabled).toBe(undefined);
  });

  it("should fill up username data with input value", async () => {
    const expectedValue = "githubuser";
    const mounted = mount(GithubSearch, { store, localVue });
    const customInput = mounted.find("input");
    customInput.setValue(expectedValue);
    expect(mounted.vm.$data.username).toBe(expectedValue);
  });

  it("should call getRepositories method", async () => {
    const mounted = mount(GithubSearch, { store, localVue });
    const customInput = mounted.find("input");
    const customButton = mounted.find("button");
    mounted.vm.getRepositories = jest.fn();
    customInput.setValue("githubUser");
    customButton.trigger("submit");
    expect(mounted.vm.getRepositories).toBeCalled();
  });

  it("should call getRepositories action from store", async () => {
    const mounted = mount(GithubSearch, {
      store,
      localVue
    });
    const expectedValue = "githubUser";

    const customInput = mounted.find("input");
    const customButton = mounted.find("button");
    customInput.setValue(expectedValue);
    customButton.trigger("submit");
    expect(mounted.vm.$store.getters.githubUser).toBe(expectedValue);
  });
});
