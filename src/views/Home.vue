<template>
  <div v-bind:class="classes.home">
    <h1>Busca de repositórios por usuário</h1>
    <p>
      Informe o nome do usuário que deseja visualizar os repositórios abaixo:
    </p>
    <github-search />

    <list-pagination />
    <h3 class="githubUser" v-if="githubUser && !errorMessage">
      Exibindo {{ reposCount }} repositório{{ reposCount > 1 ? "s" : "" }} para
      o usuário: {{ githubUser }}
    </h3>
    <list-repositories />

    <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>

    <list-pagination />
  </div>
</template>

<script>
import classes from "@/utils/cssTranspilation";
import ListPagination from "@/components/ListPagination.vue";
import ListRepositories from "@/components/ListRepositories.vue";
import GithubSearch from "@/components/GithubSearch.vue";

const styles = {
  home: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 560,
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    position: "relative",
    zIndex: 1
  }
};

export default {
  name: "Home",
  computed: {
    githubUser() {
      return this.$store.state.githubUser;
    },
    reposCount() {
      return this.$store.state.reposCount;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    }
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
