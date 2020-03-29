<template>
  <div>History {{ param }}</div>
</template>

<script>
export default {
  props: {
    param: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";
</style>
