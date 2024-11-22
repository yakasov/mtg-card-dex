<template>
  <div class="sidebar">
    <ul>
      <li v-for="(user, index) in items" :key="index">
        <div @click="toggleExpand(index)" class="sidebar-item">
          {{ user.name }}
        </div>
        <ul v-if="user.expanded" class="sub-list">
          <li
            v-for="(set, setIndex) in user.sets"
            :key="setIndex"
            @click="selectSet(user.id, set.code)"
            class="sub-item"
          >
            <p style="color: #ffffff">{{ set.name }}</p>
            ({{ set.code }}, {{ getCountString(user.id, set.code) }})
          </li>
        </ul>
      </li>
    </ul>
    <div class="sidebar-item import-button" @click="openImport">
      Import Cards
    </div>

    <ImportBox 
      :visible="isImportVisible" 
      title="Import Cards" 
      @confirm="handleImport" 
      @close="closeImport" 
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ImportBox from "./ImportBox.vue";
import Toaster from "./Toaster.vue";
import { allSets, userNames } from "../data";

export default {
  name: "Sidebar",
  components: {
    ImportBox,
    Toaster
  },
  computed: {
    ...mapState(["users"]),
  },
  data() {
    return {
      items: [],
      isImportVisible: false
    };
  },
  methods: {
    getCountString(id, set) {
      const left = this.$store.getters.getCards[id][set].length;
      const right = Object.keys(this.$store.getters.getCache[set]).length;
      return `${left}/${right}`;
    },
    openImport() {
      this.isImportVisible = true;
    },
    closeImport() {
      this.isImportVisible = false;
    },
    handleImport(text) {
      console.log(text);
      this.isImportVisible = false;
    },
    toggleExpand(index) {
      this.items[index].expanded = !this.items[index].expanded;
    },
    selectSet(user, set) {
      this.$emit("user-selected", { user, set });
    },
  },
  watch: {
    users: {
      immediate: true,
      handler(newUsers) {
        if (!newUsers || !newUsers.length) return;
        this.items = newUsers.map((u) => {
          return {
            id: u,
            name: userNames[u],
            sets: Object.keys(this.$store.getters.getCards[u] || {})
              .filter((k) => k !== "netWorth")
              .map((sc) => {
                return { code: sc, name: allSets[sc].name };
              }),
            expanded: false,
          };
        });
      },
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: relative;
  width: 250px;
  background-color: #36393e;
  color: #ecf0f1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  padding: 10px;
  cursor: pointer;
  background-color: #424549;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s;
}

.sidebar-item:hover {
  background-color: #7289da;
}

.sub-list {
  padding-left: 20px;
}

.sub-item {
  padding: 5px 10px;
  cursor: pointer;
  color: #bdc3c7;
  transition: color 0.3s;
}

.sub-item:hover {
  color: #ecf0f1;
}

.import-button {
  position: absolute;
  box-sizing: border-box;
  bottom: 10px;
  width: 90%;
}
</style>
