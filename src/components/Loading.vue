<template>
  <div
    v-bind:class="
      `${classes.loadingHolder} ${isLoading ? classes.showloading : null}`
    "
  >
    <div v-bind:class="classes.spinner">
      <div v-bind:class="classes.dot1"></div>
      <div v-bind:class="classes.dot2"></div>
    </div>
  </div>
</template>
<script>
import classes from "@/utils/cssTranspilation";
// Beautiful loading thanks to tobiasahlin https://tobiasahlin.com/spinkit/
import loadingStyle from "@/assets/jss/loadingStyle";

export default {
  name: "Loading",
  data() {
    return {
      classes: classes(loadingStyle)
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>
