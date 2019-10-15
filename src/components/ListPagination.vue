<template>
  <div v-bind:class="classes.paginationHolder">
    <button
      v-bind:class="pagination.first ? classes.pageItem : classes.disabledPage"
      v-bind:disabled="!pagination.first"
      v-on:click="getRepositories('', pagination.first)"
    >
      primeira
    </button>
    <button
      v-bind:class="pagination.prev ? classes.pageItem : classes.disabledPage"
      v-bind:disabled="!pagination.prev"
      v-on:click="getRepositories('', pagination.prev)"
    >
      anterior
    </button>
    <button
      v-bind:class="pagination.next ? classes.pageItem : classes.disabledPage"
      v-bind:disabled="!pagination.next"
      v-on:click="getRepositories('', pagination.next)"
    >
      próxima
    </button>
    <button
      v-bind:class="pagination.last ? classes.pageItem : classes.disabledPage"
      v-bind:disabled="!pagination.last"
      v-on:click="getRepositories('', pagination.last)"
    >
      última
    </button>
  </div>
</template>
<script>
import classes from "@/utils/cssTranspilation";
import paginationButtonStyle from "@/assets/jss/paginationButtonStyle";

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
  data() {
    return {
      classes: classes(styles)
    };
  },
  props: {
    getRepositories: {
      type: Function
    },
    pagination: {
      type: Object
    }
  }
};
</script>
