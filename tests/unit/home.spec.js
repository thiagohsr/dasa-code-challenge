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
    const wrapper = mount(Home, {
      store,
      localVue,
      computed: {
        githubUser() {
          return "thiagohsr";
        },
        errorMessage() {
          return "";
        }
      }
    });
    const h3 = wrapper.find("h3").text();
    expect(h3).toContain("thiagohsr");
  });
});
