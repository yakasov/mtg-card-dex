<template>
  <div class="body-wrapper">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search cards..."
        v-model="searchQuery"
        @input="filterCards"
      />
    </div>
    <div class="body-content">
      <div
        class="card"
        v-for="(card, index) in filteredCards"
        :key="index"
        @click="selectCard(card)"
      >
        <div class="card-title">{{ card.name }}</div>
        <div class="card-image">
          <img :src="card.image" :alt="card.name" />
        </div>
        <div class="card-number">{{ card.number }}</div>
      </div>
    </div>
    <Toaster ref="toast" />
  </div>
</template>

<script>
import unknownImage from "@/assets/unknown.png";
import Toaster from "./Toaster.vue";

export default {
  components: {
    Toaster
  },
  name: "Body",
  props: {
    set: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      cards: [],
      filteredCards: [],
      searchQuery: "",
    };
  },
  watch: {
    set(obj) {
      this.loadCards(obj);
    },
  },
  methods: {
    loadCards(obj) {
      if (!obj.user) {
        return;
      }
      const cacheDict = this.$store.getters.getCache.filter((o) => o.set === obj.set);
      const userCards = this.$store.getters.getCards[obj.user].filter((o) => o.set === obj.set);
      const cacheCards = [];

      Object.entries(cacheDict).forEach(([k, v]) => {
        const imageUrl = userCards.includes(v.id) ? v.image : unknownImage;
        cacheCards.push({
          bigImage: imageUrl,
          flavour_text: v.flavour_text,
          image: imageUrl.replace("normal", "small"),
          oracle_text: v.oracle_text,
          name: v.name,
          number: k,
        });
      });

      this.cards = cacheCards;
      this.filteredCards = cacheCards;
    },
    selectCard(card) {
      this.$emit("card-selected", card);
    },
    filterCards() {
      const query = this.searchQuery.toLowerCase();
      this.filteredCards = this.cards.filter((card) =>
        card.name.toLowerCase().includes(query)
      );
    },
  },
};
</script>

<style scoped>
.body-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.body-content {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%/12, max(120px, 100%/12)), 1fr)
  );
  gap: 10px 10px;
  padding: 20px;
  background-color: #282b30;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.body-content:before {
  grid-column: span 12;
}

.card {
  background-color: #36393e;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 3 / 4;
  max-width: 360px;
  max-height: 480px;
  position: relative;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-number {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
}

.card-image img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.search-bar {
  width: 100%;
  display: flex;
}

.search-bar input {
  width: 100%;
  padding: 20px;
  font-size: 1rem;
  outline: none;
  background-color: #36393e;
  border: 0;
  color: #ffffff;
}
</style>
