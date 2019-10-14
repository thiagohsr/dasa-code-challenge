<template>
  <button v-bind:class="classes.customButton"><slot /></button>
</template>
<script>
import classes from "@/utils/cssTranspilation";
import button from "@/assets/jss/buttonStyle";

const styles = {
  customButton: {
    ...button,
    marginLeft: 15,
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
    letterSpacing: "0.0357143em",
    textTransform: "uppercase",
    background: "#009688",
    boxShadow:
      "0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)"
  }
};

export default {
  name: "CustomButton",
  data: function() {
    return { classes: classes(styles) };
  },
  props: {
    label: {
      type: String,
      default: "Botão"
    }
  }
};
</script>
