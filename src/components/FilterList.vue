<template>
  <div class="container">
    <nav>
      <p>
        <router-link class="menu history" to="/history">History</router-link>
        <router-link class="menu historyAdd" to="/history/add"
          >History of adding</router-link
        >
        <router-link class="menu historyRemove" to="/history/remove"
          >History of removing</router-link
        >
      </p>
    </nav>
    <div>
      <input type="text" class="input" v-model="value" @input="searcher" />
    </div>
    <div class="peopleContainer">
      <ul class="people" v-if="LOADED">
        <li v-for="(p, i) in filteredPeople" :id="p.name" :key="i">
          {{ JSON.stringify(p) }}
          <button @click="addNote">&rarr;</button>
        </li>
      </ul>
      <div v-else>Loading...</div>
      <ul class="choosenPeople">
        <li v-for="(fp, i) in choosenPeople" :id="fp.name" :key="i">
          <button @click="removeNote">&larr;</button>
          {{ JSON.stringify(fp) }}
        </li>
      </ul>
    </div>
    <div class="up" @click="setPageInTop"><button>UP &uarr;</button></div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      value: "",
      filteredPeople: [],
      choosenPeople: [],
    };
  },
  computed: {
    ...mapGetters(["LOADED", "PEOPLE", "CHOOSEN_PEOPLE"]),
  },
  created() {
    if (!this.PEOPLE.length) {
      this.$store.dispatch("GET_DATA").then((people) => {
        this.filteredPeople = [...people];
      });
    }
  },
  mounted() {
    this.filteredPeople = [...this.PEOPLE];
    this.choosenPeople = [...this.CHOOSEN_PEOPLE];
  },
  methods: {
    ...mapMutations([
      "SET_PEOPLE",
      "ADD_NEW_ITEM",
      "SET_CHOOSEN_PEOPLE",
      "SET_HISTORY_TYPE",
    ]),
    searcher() {
      const searchedName = new RegExp(this.value, "ig");
      let sortedArray = []
      this.PEOPLE.forEach((person) => {
        let count = person.name.match(searchedName)
        if (count) {
          sortedArray.push({count: count.length, person})
        }
      })
      this.filteredPeople = [
        ...sortedArray
          .sort((a, b) => a.count < b.count ? 1 : -1)
          .map(p => {
            return p.person
          })
      ];
    },
    addNote: function (e) {
      const searchedId = e.target.parentNode.id;
      this.SET_PEOPLE(
        this.PEOPLE.filter((p) => {
          if (p.name != searchedId) {
            return p;
          } else {
            this.choosenPeople.push(p);
            this.SET_HISTORY_TYPE({
              name: p.name,
              type: "ADD",
              date: new Date(),
            });
          }
        })
      );
      this.filteredPeople = [...this.PEOPLE];
      this.searcher();
      this.SET_CHOOSEN_PEOPLE(this.choosenPeople);
    },
    removeNote: function (e) {
      const searchedId = e.target.parentNode.id;
      this.choosenPeople = [...this.choosenPeople.filter((fp) => {
        if (fp.name != searchedId) return fp;
        else {
          this.ADD_NEW_ITEM(fp);
          this.filteredPeople.push(fp);
          this.SET_HISTORY_TYPE({
            name: fp.name,
            type: "REMOVE",
            date: new Date(),
          });
        }
      })];
      this.SET_CHOOSEN_PEOPLE(this.choosenPeople);
    },
    setPageInTop: function () {
      window.scrollTo(0, 0);
    },
  },
};

addEventListener("scroll", function () {
  const button = document.getElementsByClassName("up")[0];
  if (window.scrollY > 350) button.style.display = "block";
  else button.style.display = "none";
});
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.menu {
  margin-right: 10px;
}
.input {
  width: 400px;
  margin-bottom: 10px;
  padding: 8px 10px;
  border: 1px solid $vue-blue;
}

.peopleContainer {
  display: flex;
}

.people {
  width: 420px;
  margin: 0;
  padding: 0 20px;
  border-right: 1px dashed grey;
  box-sizing: border-box;
  word-break: break-all;
}

.people li {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed grey;
}

.choosenPeople {
  width: 400px;
  margin: 0;
  margin-left: 10px;
  padding: 0 20px;
  box-sizing: border-box;
  word-break: break-all;
}

.choosenPeople li {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed grey;
}
.up {
  position: fixed;
  right: 50px;
  bottom: 50px;
  display: none;
}
</style>
