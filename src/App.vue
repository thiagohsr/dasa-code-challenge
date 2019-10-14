<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import classes from "@/utils/cssTranspilation";

const styles = {
  "@global": {
    body: {
      display: "flex",
      fontFamily: "'Avenir', Helvetica, Arial, sans-serif",
      justifyContent: "center",
      margin: 0,
      padding: 0,
      width: "100%"
    },
    "*,  *::before, *::after": {
      boxSizing: "border-box"
    },
    "*:focus": {
      outline: 0
    }
  }
};

export default {
  data: function() {
    return {
      classes: classes(styles)
    };
  },
  components: {}
};
</script>
