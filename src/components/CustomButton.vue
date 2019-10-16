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
    color: "#808080"
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
