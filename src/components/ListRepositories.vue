<template>
  <ul>
    <li v-for="item in userRepositories" :key="item.id">
      <p>{{ item.name }} stars:{{ item.stargazers_count }}</p>
      <!-- <p>{{ item.description }}</p> -->
    </li>
  </ul>
</template>
<script>
import store from "@/store";

export default {
  name: "ListRepositories",
  computed: {
    userRepositories() {
      return store.state.userRepositories;
    }
  },
  props: {}
};
</script>
