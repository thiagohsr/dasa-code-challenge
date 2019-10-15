<template>
  <div v-bind:class="classes.home">
    <h1>Busca de repositórios por usuário</h1>
    <p>
      Informe o nome do usuário que deseja visualizar os repositórios abaixo:
    </p>
    <github-search />

    <list-pagination />
    <h3>Exibindo repositórios para o usuário: {{ githubUser }}</h3>
    <list-repositories />

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <list-pagination />
  </div>
</template>

<script>
import store from "@/store";
import classes from "@/utils/cssTranspilation";
import ListPagination from "@/components/ListPagination.vue";
import ListRepositories from "@/components/ListRepositories.vue";
import GithubSearch from "@/components/GithubSearch.vue";

const styles = {
  home: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15
  },
  searchBox: {
    display: "inline-flex",
    justifyContent: "center"
  }
};

export default {
  name: "home",
  computed: {
    githubUser: () => store.state.githubUser,
    errorMessage: () => store.state.errorMessage
  },
  data() {
    return {
      classes: classes(styles)
    };
  },
  components: {
    "github-search": GithubSearch,
    "list-pagination": ListPagination,
    "list-repositories": ListRepositories
  }
};
</script>
