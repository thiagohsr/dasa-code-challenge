<template>
  <div v-bind:class="classes.home">
    <form @submit.prevent="getRepositories" v-bind:class="classes.searchBox">
      <custom-input placeholder="Usuário do github" v-model="username" />
      <custom-button>buscar</custom-button>
    </form>
    <list-pagination
      v-if="data.paginationLinks"
      v-bind:pagination="data.paginationLinks || {}"
      v-bind:getRepositories="getRepositories"
    />
    <list-repositories v-bind:repositories="data.repositories" />

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <list-pagination
      v-if="data.paginationLinks"
      v-bind:pagination="data.paginationLinks || {}"
      v-bind:getRepositories="getRepositories"
    />
  </div>
</template>

<script>
import Vue from "vue";
import classes from "@/utils/cssTranspilation";
import parseLinkHeader from "@/utils/githubPaginationParser";

import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import ListPagination from "@/components/ListPagination.vue";
import ListRepositories from "@/components/ListRepositories.vue";

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
  data() {
    return {
      classes: classes(styles),
      username: "",
      data: { repositories: [], paginationLinks: "" },
      errorMessage: ""
    };
  },
  methods: {
    async getRepositories(event, apiUrl) {
      this.data.repositories = [];
      const api = apiUrl
        ? apiUrl
        : `https://api.github.com/users/${this.username}/repos`;

      await Vue.axios
        .get(api)
        .then(result => {
          this.data.paginationLinks = result.headers.hasOwnProperty("link")
            ? parseLinkHeader(result.headers.link)
            : "";
          this.errorMessage = result.data.length
            ? ""
            : "Não foram encontrados repositórios para o usuário informado.";
          this.data.repositories = result.data;
        })
        .catch(() => {
          this.errorMessage = "O usuário informado não existe";
        });
    }
  },
  components: {
    "custom-button": CustomButton,
    "custom-input": CustomInput,
    "list-pagination": ListPagination,
    "list-repositories": ListRepositories
  }
};
</script>
