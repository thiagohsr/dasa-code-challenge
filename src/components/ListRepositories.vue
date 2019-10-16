<template>
  <ul v-bind:class="classes.list">
    <li
      v-bind:class="classes.listItem"
      v-for="item in userRepositories"
      :key="item.id"
    >
      <p>
        <span>{{ item.name }}</span>
        <span v-bind:class="classes.stars">{{ item.stargazers_count }}</span>
      </p>
      <!-- <p>{{ item.description }}</p> -->
    </li>
  </ul>
</template>
<script>
import classes from "@/utils/cssTranspilation";
import bookmarkIcon from "@/assets/svg/bookmark-24px.svg";
import starIcon from "@/assets/svg/stars-24px.svg";

const style = {
  list: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    boxShadow:
      "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 6px 5px rgba(0, 0, 0, 0.24)",
    display: "flex",
    flexDirection: "column",
    listStyle: "none",
    paddingLeft: 0
  },
  listItem: {
    background: {
      image: `url(${bookmarkIcon})`,
      repeat: "no-repeat",
      position: "10px center"
    },
    borderBottomColor: "#f3f3f3",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    boxSizing: "border-box",
    "& p": {
      width: "100%",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    paddingRight: 15,
    paddingLeft: 45
  },
  stars: {
    background: {
      image: `url(${starIcon})`,
      repeat: "no-repeat",
      position: "right center"
    },
    color: "#9E9E9E",
    paddingTop: 8,
    paddingLeft: 15,
    paddingRight: 30,
    paddingBottom: 8
  }
};

export default {
  name: "ListRepositories",
  computed: {
    userRepositories() {
      return this.$store.state.userRepositories;
    }
  },
  data() {
    return {
      classes: classes(style)
    };
  },
  props: {}
};
</script>
