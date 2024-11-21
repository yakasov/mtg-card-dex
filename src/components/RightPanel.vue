<template>
  <div class="right-panel" :class="{ open: isOpen }">
    <button class="close-btn" @click="closePanel">✖</button>
    <div v-if="card">
      <h2>{{ card.title }}</h2>
      <img :src="card.image" :alt="card.title" />
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightPanel",
  props: {
    card: {
      type: Object,
      required: false,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closePanel() {
      this.$emit("close-panel");
    },
  },
};
</script>

<style scoped>
.right-panel {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  background-color: #424549;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transition: right 0.3s ease;
}

.right-panel.open {
  right: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  transition: color 0.3s ease;
}

.right-panel h2 {
  margin: 0 0 20px;
  font-size: 1.5rem;
  color: #ffffff;
}

.right-panel img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
}

.right-panel p {
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.5;
}
</style>
