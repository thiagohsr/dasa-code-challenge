<template>
  <button
    v-bind:disabled="disabled"
    v-bind:class="
      `${!disabled ? classes.customButton : classes.customButtonDisabled}`
    "
  >
    <slot />
  </button>
</template>
<script>
import classes from "@/utils/cssTranspilation";
import button from "@/assets/jss/buttonStyle";

const styles = {
  customButton: {
    ...button
  },
  customButtonDisabled: {
    ...button,
    background: "#dddddd",
    color: "#808080",
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
    },
    disabled: {
      type: Boolean
    }
  }
};
</script>
