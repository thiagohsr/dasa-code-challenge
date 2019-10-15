<template>
  <div
    v-if="Object.keys(paginationLinks).length"
    v-bind:class="classes.paginationHolder"
  >
    <button
      v-bind:class="
        paginationLinks.first ? classes.pageItem : classes.disabledPage
      "
      v-bind:disabled="!paginationLinks.first"
      v-on:click="getRepositories(paginationLinks.first)"
    >
      primeira
    </button>
    <button
      v-bind:class="
        paginationLinks.prev ? classes.pageItem : classes.disabledPage
      "
      v-bind:disabled="!paginationLinks.prev"
      v-on:click="getRepositories(paginationLinks.prev)"
    >
      anterior
    </button>
    <button
      v-bind:class="
        paginationLinks.next ? classes.pageItem : classes.disabledPage
      "
      v-bind:disabled="!paginationLinks.next"
      v-on:click="getRepositories(paginationLinks.next)"
    >
      próxima
    </button>
    <button
      v-bind:class="
        paginationLinks.last ? classes.pageItem : classes.disabledPage
      "
      v-bind:disabled="!paginationLinks.last"
      v-on:click="getRepositories(paginationLinks.last)"
    >
      última
    </button>
  </div>
</template>
<script>
import paginationButtonStyle from "@/assets/jss/paginationButtonStyle";
import { getRepositoriesFromPagination } from "@/services/github";
import classes from "@/utils/cssTranspilation";
import parseLinkHeader from "@/utils/githubPaginationParser";

const styles = {
  paginationHolder: {
    marginTop: 20
  },
  pageItem: {
    ...paginationButtonStyle
  },
  disabledPage: {
    ...paginationButtonStyle,
    background: "#ececec"
  }
};

export default {
  name: "ListPagination",
  computed: {
    paginationLinks() {
      return this.$store.state.paginationLinks;
    }
  },
  data() {
    return {
      classes: classes(styles)
    };
  },
  methods: {
    async getRepositories(url) {
      const response = await getRepositoriesFromPagination(url);
      if (response.message) {
        this.$store.commit(
          "errorMessage",
          `Erro na comunicação com a api. Erro: ${response.message}`
        );
      }
      this.$store.commit("userRepositories", response.data);
      if (response.headers.link) {
        this.$store.commit(
          "paginationLinks",
          parseLinkHeader(response.headers.link)
        );
      }
    }
  }
};
</script>
