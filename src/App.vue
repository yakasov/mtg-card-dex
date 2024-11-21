<template>
  <div id="app">
    <Sidebar @user-selected="handleSetSelected" />
    <Body :set="{set: selectedSet, user: selectedUser}" @card-selected="handleCardSelected" />
    <RightPanel
      :card="selectedCard"
      :isOpen="isPanelOpen"
      @close-panel="handleClosePanel"
    />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Body from "./components/Body.vue";
import RightPanel from "./components/RightPanel.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Body,
    RightPanel,
  },
  created() {
    console.log("Go fetch!");
    this.$store.dispatch("fetchData");
  },
  data() {
    return {
      selectedCard: null,
      selectedSet: null,
      selectedUser: null,
      isPanelOpen: false,
    };
  },
  methods: {
    handleSetSelected(obj) {
      this.selectedSet = obj.set;
      this.selectedUser = obj.user;
    },
    handleCardSelected(card) {
      this.selectedCard = card;
      this.isPanelOpen = true;
    },
    handleClosePanel() {
      this.isPanelOpen = false;
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  height: 100vh;
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.sidebar {
  z-index: 1;
}

.body-content {
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
}
</style>
