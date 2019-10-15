<template>
  <ul>
    <li v-for="item in repositories" :key="item.id">
      <p>{{ item.name }} stars:{{ item.stargazers_count }}</p>
      <p>{{ item.descrition }}</p>
    </li>
  </ul>
</template>
<script>
export default {
  name: "ListRepositories",
  props: {
    repositories: {
      type: Array,
      default: () => []
    }
  }
};
</script>
