<template>
  <div
    id="app"
    v-bind:class="`${classes.app} ${isLoading ? classes.noScroll : null}`"
  >
    <router-view />
    <loading />
  </div>
</template>
<script>
import classes from "@/utils/cssTranspilation";
import Loading from "@/components/Loading.vue";
const styles = {
  "@global": {
    html: {
      width: "100%",
      height: "100%"
    },
    body: {
      display: "flex",
      fontFamily: "'Avenir', Helvetica, Arial, sans-serif",
      justifyContent: "center",
      margin: 0,
      padding: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#E5E5E5"
    },
    "*,  *::before, *::after": {
      boxSizing: "border-box"
    },
    "*:focus": {
      outline: 0
    }
  },
  app: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  noScroll: {
    overflow: "hidden"
  }
};

export default {
  data: function() {
    return {
      classes: classes(styles)
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  components: {
    loading: Loading
  }
};
</script>
