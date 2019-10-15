<template>
  <form @submit.prevent="getRepositories" v-bind:class="classes.searchBox">
    <custom-input placeholder="Usuário do github" v-model="username" />
    <custom-button>buscar</custom-button>
  </form>
</template>
<script>
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import { getUserRepositories } from "@/services/github";
import classes from "@/utils/cssTranspilation";
import parseLinkHeader from "@/utils/githubPaginationParser";

const styles = {
  searchBox: {
    display: "inline-flex",
    justifyContent: "center"
  }
};
export default {
  name: "GithubSearch",
  data() {
    return {
      classes: classes(styles),
      username: "",
      data: { repositories: [], paginationLinks: "" },
      errorMessage: ""
    };
  },
  methods: {
    async getRepositories() {
      const response = await getUserRepositories(this.username);
      this.$store.commit("githubUser", this.username);
      if (response.message) {
        this.$store.commit("errorMessage", "O usuário informado não existe");
        return;
      }
      if (!response.data.length) {
        this.$store.commit(
          "errorMessage",
          "Não foram encontrados repositórios para o usuário informado."
        );
        return;
      }
      this.$store.commit("userRepositories", response.data);
      if (response.headers.link) {
        this.$store.commit(
          "paginationLinks",
          parseLinkHeader(response.headers.link)
        );
      } else {
        this.$store.commit("paginationLinks", {});
      }
    }
  },
  components: {
    "custom-button": CustomButton,
    "custom-input": CustomInput
  }
};
</script>
