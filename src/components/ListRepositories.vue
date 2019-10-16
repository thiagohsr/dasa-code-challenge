<template>
  <ul v-bind:class="classes.list">
    <li
      v-bind:class="classes.listItem"
      v-for="item in userRepositories"
      :key="item.id"
    >
      <p>
        <span
          ><a v-bind:href="item.html_url" target="_blank">{{
            item.name
          }}</a></span
        >
        <span v-bind:class="classes.stars">{{ item.stargazers_count }}</span>
      </p>
      <!-- <p>{{ item.description }}</p> -->
    </li>
  </ul>
</template>
<script>
import classes from "@/utils/cssTranspilation";
import listRepositoriesStyle from "@/assets/jss/listRepositoriesStyle";

export default {
  name: "ListRepositories",
  computed: {
    userRepositories() {
      return this.$store.state.userRepositories;
    }
  },
  data() {
    return {
      classes: classes(listRepositoriesStyle)
    };
  },
  props: {}
};
</script>
