<template>
  <div class="sidebar">
    <ul>
      <li v-for="(user, index) in items" :key="index">
        <div @click="toggleExpand(index)" class="sidebar-item">
          {{ user.title }}
        </div>
        <ul v-if="user.expanded" class="sub-list">
          <li
            v-for="(set, setIndex) in user.sets"
            :key="setIndex"
            @click="selectSet(set)"
            class="sub-item"
          >
            {{ set }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapState(["users"]),
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    toggleExpand(index) {
      this.items[index].expanded = !this.items[index].expanded;
    },
    selectSet(set) {
      this.$emit("user-selected", set);
    },
  },
  watch: {
    users: {
      immediate: true,
      handler(newUsers) {
        if (!newUsers || !newUsers.length) return;
        this.items = newUsers.map((u) => {
          return {
            title: u,
            sets: Object.keys(this.$store.getters.getCards[u] || {}).filter(
              (k) => k !== "netWorth"
            ),
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
</style>
