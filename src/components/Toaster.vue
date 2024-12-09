<template>
  <div
    v-if="visible"
    class="toast-message"
  >
    {{ message }}
  </div>
</template>

<script>
import eventBus from "../eventBus";

export default {
  name: "Toaster",
  data() {
    return {
      message: "",
      visible: false,
    };
  },
  mounted() {
    eventBus.on("show-toast", this.displayToast);
  },
  methods: {
    displayToast(toast) {
      this.message = toast.msg;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.toast-message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 1.4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
