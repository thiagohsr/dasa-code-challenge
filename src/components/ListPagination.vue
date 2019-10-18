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
import classes from "@/utils/cssTranspilation";

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
      return this.$store.getters.paginationLinks;
    }
  },
  data() {
    return {
      classes: classes(styles)
    };
  },
  methods: {
    async getRepositories(url) {
      this.$store.dispatch({
        type: "getRepositories",
        githubUser: this.$store.getters.githubUser,
        pageUrl: url
      });
    }
  }
};
</script>
