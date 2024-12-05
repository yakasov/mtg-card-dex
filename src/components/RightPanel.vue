<template>
  <div class="right-panel" :class="{ open: isOpen }">
    <button class="close-btn" @click="closePanel">✖</button>
    <div v-if="card">
      <h2>{{ card.name }}</h2>
      <img :src="card.bigImage" :alt="card.name" />
      <p v-if="card.oracle_text" class="header">Oracle Text</p>
      <div v-html="formatOracleText(card.oracle_text)"></div>
      <br v-if="card.oracle_text" />
      <p v-if="card.flavour_text" class="header">Flavour Text</p>
      <p class="flavour">{{ card.flavour_text }}</p>
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
    formatOracleText(text) {
      const replacements = {
        "{1}": "1️⃣",
        "{2}": "2️⃣",
        "{3}": "3️⃣",
        "{4}": "4️⃣",
        "{5}": "5️⃣",
        "{6}": "6️⃣",
        "{7}": "7️⃣",
        "{8}": "8️⃣",
        "{9}": "9️⃣",
        "{B}": "🥶",
        "{C}": "🤓",
        "{G}": "🤓",
        "{R}": "😡",
        "{T}": "↪️",
        "{U}": "🌚",
        "{W}": "👽",
        "{X}": "✖️",
      };

      let returnText = "";
      if (text && text.includes("\n") && text.includes("{")) {
        const t = text.split("\n");
        returnText = `<p class="subheader">${t[0]}</p><p>${t
          .slice(1)
          .join()}</p>`;
      } else {
        returnText = `<p>${text || "Nothing to see here..."}</p>`;
      }

      // For replacing all {X} with actual icons
      Object.entries(replacements).forEach(([k, v]) => {
        returnText = returnText.replaceAll(k, v);
      });

      // Replace any commas with no spaces surrounding with the br-custom tag
      // Some cards don't break lines with \n, so this is a fix for that
      return returnText
        .replace(/(\S),(?!")(\S)/gu, "$1<br-custom />$2")
        .replace("\n", "<br-custom />");
    },
  },
};
</script>

<style scoped>
:deep(br-custom) {
  display: block;
  content: "";
  margin-top: 6px;
}

.right-panel {
  position: fixed;
  top: 0;
  right: -18%;
  width: 18%;
  height: 100%;
  background-color: rgb(66, 69, 73, 0.95);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transition: right 0.3s ease;
  color: #dddddd;
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
  line-height: 1.5;
}

.header {
  color: #ffffff;
  font-weight: bold;
}

:deep(.subheader) {
  color: #ffffff;
}

.flavour {
  font-style: italic;
}
</style>
