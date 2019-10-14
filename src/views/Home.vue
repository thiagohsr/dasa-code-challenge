<template>
  <div v-bind:class="classes.home">
    <form @submit.prevent="getRepositories" v-bind:class="classes.searchBox">
      <custom-input placeholder="Usuário do github" v-model="username" />
      <custom-button>buscar</custom-button>
    </form>
    <ul v-if="data.length">
      <li v-for="item in data" :key="item.id">
        <p>{{ item.name }} stars:{{ item.stargazers_count }}</p>
        <p>
          {{ item.descrition }}
        </p>
      </li>
    </ul>
    <p v-else>
      Não foram encontrados repositórios para o usuário informado.
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import classes from "@/utils/cssTranspilation";
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";

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
      data: [],
      errorMessage: ""
    };
  },
  methods: {
    getRepositories() {
      this.data = [];
      const api = `https://api.github.com/users/${this.username}/repos?per_page=100`;
      // console.log(api, "username", this.username);
      Vue.axios
        .get(api)
        .then(result => {
          console.log("success", result.data);
          this.data = result.data;
        })
        .catch(error => {
          console.log("Error: ", error);
          this.errorMessage = "O usuário informado não existe";
        });
    }
  },
  components: {
    "custom-button": CustomButton,
    "custom-input": CustomInput
  }
};
</script>
