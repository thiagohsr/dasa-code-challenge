import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "@/views/Home.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Home.vue", () => {
  let store;
  let state;
  beforeEach(() => {
    state = {
      githubUser: "",
      errorMessage: "",
      userRepositories: [],
      paginationLinks: {},
      isLoading: false
    };
    store = new Vuex.Store({
      state
    });
  });

  it("should render properly Home view", () => {
    const wrapper = shallowMount(Home, { store, localVue });
    const html = wrapper.vm.$el;
    expect(wrapper.name()).toBe("Home");
    expect(html).toMatchSnapshot();
  });

  it("should Home view render properly child components", () => {
    const wrapper = shallowMount(Home, { store, localVue });
    const searchName = wrapper.find("github-search-stub").name();
    const paginationName = wrapper.find("list-pagination-stub").name();
    const repositoriesName = wrapper.find("list-repositories-stub").name();
    expect(searchName).toBe("GithubSearch");
    expect(paginationName).toBe("ListPagination");
    expect(repositoriesName).toBe("ListRepositories");
  });

  it("should computed githubUser properly render", () => {
    const expectedValue = "thiagohsr";
    const wrapper = mount(Home, {
      store,
      localVue,
      computed: {
        githubUser() {
          return expectedValue;
        },
        errorMessage() {
          return "";
        }
      }
    });
    const userElement = wrapper.find(".githubUser");
    expect(userElement.text()).toContain(expectedValue);
  });

  it("should computed errorMessage properly render", () => {
    const expectedValue = "Mensagem de erro";
    const wrapper = mount(Home, {
      store,
      localVue,
      computed: {
        errorMessage() {
          return expectedValue;
        }
      }
    });
    const errorElement = wrapper.find(".errorMessage");
    expect(errorElement.text()).toContain(expectedValue);
  });
});
