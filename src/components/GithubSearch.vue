<template>
  <form @submit.prevent="getRepositories" v-bind:class="classes.searchBox">
    <custom-input placeholder="Usuário do github" v-model="username" />
    <custom-button v-bind:disabled="!username">buscar</custom-button>
  </form>
</template>
<script>
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import { getRepositories } from "@/services/github";
import { GITHUB_USER_REPOS } from "@/constants/urls";
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
      username: ""
    };
  },
  methods: {
    closeLoadingAnimation() {
      let animation = setInterval(() => {
        this.$store.commit("isLoading", false);
        clearInterval(animation);
      }, 900);
    },
    async getRepositories() {
      const url = GITHUB_USER_REPOS.replace("{{username}}", this.username);
      this.$store.commit("isLoading", true);
      this.$store.dispatch("getRepositories");
      const response = await getRepositories(url);

      if (response.message) {
        this.$store.commit("errorMessage", "O usuário informado não existe");
        this.closeLoadingAnimation();
        return;
      }
      if (!response.data.length) {
        this.$store.commit(
          "errorMessage",
          "Não foram encontrados repositórios para o usuário informado."
        );
        this.$store.commit("userRepositories", []);
        this.$store.commit("paginationLinks", {});
        this.closeLoadingAnimation();
        return;
      } else {
        this.$store.commit("errorMessage", "");
      }
      this.$store.commit("githubUser", this.username);
      this.$store.commit("userRepositories", response.data);

      if (response.headers.link) {
        this.$store.commit(
          "paginationLinks",
          parseLinkHeader(response.headers.link)
        );
      } else {
        this.$store.commit("paginationLinks", {});
      }
      this.closeLoadingAnimation();
    }
  },
  components: {
    "custom-button": CustomButton,
    "custom-input": CustomInput
  }
};
</script>
