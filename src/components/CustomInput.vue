<template>
  <input
    type="text"
    v-bind:placeholder="placeholder"
    v-bind:class="classes.input"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>
<script>
import classes from "@/utils/cssTranspilation";
import searchIcon from "@/assets/svg/search.svg";

const styles = {
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "none",
    fontSize: 25,
    paddingLeft: 45,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    background: {
      color: "#FAFAFA",
      image: `url(${searchIcon})`,
      repeat: "no-repeat",
      position: "15px center"
    },
    boxShadow:
      "0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)",
    borderRadius: 2,
    "&::placeholder": {
      opacity: 0.2
    }
  }
};

export default {
  name: "CustomInput",
  data: function() {
    return {
      classes: classes(styles)
    };
  },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: "Campo para finalidade"
    }
  }
};
</script>
