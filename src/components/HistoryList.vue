<template>
  <div>
    <header>History {{ param }}</header>
    <ul class="history" v-if="!param">
      <li v-for="(list, i) in HISTORY_LIST" :id="list.name" :key="i">
        {{ JSON.stringify(list) }}
      </li>
    </ul>
    <ul class="history" v-else-if="param=='add'">
      <li v-show="list.type=='ADD'" v-for="(list, i) in HISTORY_LIST" :id="list.name" :key="i">
        {{ JSON.stringify(list) }}
      </li>
    </ul>
    <ul class="history" v-else-if="param=='remove'">
      <li v-show="list.type=='REMOVE'" v-for="(list, i) in HISTORY_LIST" :id="list.name" :key="i">
        {{ JSON.stringify(list) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";



export default {
  props: {
    param: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(["HISTORY_LIST"]),
  },
  created() {
    console.log(this.param) // undefined
    console.log(this.HISTORY_LIST)
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";
</style>
