<template>
  <form @submit.prevent="getRepositories" v-bind:class="classes.searchBox">
    <custom-input placeholder="Usuário do github" v-model="username" />
    <custom-button v-bind:disabled="!username">buscar</custom-button>
  </form>
</template>
<script>
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import classes from "@/utils/cssTranspilation";

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
    async getRepositories() {
      this.$store.dispatch({
        type: "getRepositories",
        githubUser: this.username
      });
    }
  },
  components: {
    "custom-button": CustomButton,
    "custom-input": CustomInput
  }
};
</script>
