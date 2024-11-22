<template>
  <div v-if="visible" class="import-overlay" @click.self="close">
    <div class="import-box">
      <h2 class="import-title">{{ title }}</h2>
      <textarea 
        v-model="inputValue" 
        type="text" 
        class="import-input" 
        placeholder="Paste your card export from Moxfield here" 
      />
      <button class="confirm-button" @click="confirm">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import eventBus from "../eventBus";

export default {
  name: "ImportBox",
  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    confirm() {
      eventBus.emit("begin-import", this.inputValue);
      eventBus.emit("show-toast", { msg: "Beginning card import..." });
      this.inputValue = ""; 
      this.close();
    },
    close() {
      this.$emit("close");
    }
  },
};
</script>

<style scoped>
.import-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.import-box {
  width: 50%;
  height: 50%;
  background-color: #282b30;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.import-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.import-input {
  background-color: #36393e;
  color: #ffffff;
  flex-grow: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  outline: none;
  border: 0;
}

.confirm-button {
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #0056b3;
}
</style>