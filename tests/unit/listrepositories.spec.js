import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ListRepositories from "@/components/ListRepositories.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("ListRepositories", () => {
  let store;
  let state;
  let getters;
  beforeEach(() => {
    state = {
      githubUser: "",
      errorMessage: "",
      userRepositories: [
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
      ],
      paginationLinks: {},
      isLoading: false
    };
    getters = {
      githubUser: state => state.githubUser,
      paginationLinks: state => state.paginationLinks,
      userRepositories: state => state.userRepositories,
      reposCount: state => state.paginationLinks
    };
    store = new Vuex.Store({
      state,
      getters
    });
  });

  it("should render properly ListRepositories view", () => {
    const wrapper = shallowMount(ListRepositories, {
      store,
      localVue,
      computed: {
        userRepositories() {
          return [];
        }
      }
    });
    const html = wrapper.vm.$el;
    expect(wrapper.name()).toBe("ListRepositories");
    expect(html).toMatchSnapshot();
  });

  it("should render properly ListRepositories view with items", () => {
    const wrapper = mount(ListRepositories, {
      store,
      localVue,
      computed: {
        userRepositories() {
          return store.getters.userRepositories;
        }
      }
    });
    const renderedItems = wrapper.findAll("li");
    expect(renderedItems.length).toBe(2);
  });
});
