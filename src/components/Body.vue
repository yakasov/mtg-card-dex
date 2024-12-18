<template>
  <div class="body-wrapper">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search cards..."
        v-model="searchQuery"
        @input="filterBySearch"
      />
    </div>
    <div class="filters">
      <span>
        <input
          class="filter-checkbox"
          type="checkbox"
          v-model="ownedFilter"
          @change="filterByOwned"
        />
        Filter by cards owned
      </span>
      <h3 id="filter-set-title"></h3>
      <div style="width: 181px" />
    </div>
    <div class="body-content">
      <div
        class="card"
        v-for="card in filteredCards"
        :key="card.number"
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
import { allSets } from "../data";

export default {
  components: {
    Toaster,
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
      currentSet: "",
      filteredCards: [],
      ownedCards: [],
      ownedFilter: false,
      searchQuery: "",
    };
  },
  watch: {
    set(obj) {
      this.loadCards(obj);
    },
  },
  methods: {
    alphanumericSort(arr) {
      const f = (ar) => ar.sort((a, b) => parseInt(a.number) - parseInt(b.number));
      const g = (ar) => ar.sort((a, b) => a.number - b.number);

      const arr1 = f(arr.filter((e) => e.number.toString().match(/^[0-9a-z]+$/gu)));
      const arr2 = g(arr.filter((e) => !e.number.toString().match(/^[0-9a-z]+$/gu)));

      return arr1.concat(arr2);
    },
    loadCards(obj) {
      if (!obj.user || (obj.set && obj.set === this.currentSet)) {
        return;
      }

      const cacheDict = this.$store.getters.getCache.filter(
        (o) => o.set === obj.set
      );
      const userCards = this.$store.getters.getCards[obj.user].filter(
        (o) => o.set === obj.set
      );
      let cacheCards = [];
      let ownedCards = [];

      Object.values(cacheDict).forEach((v) => {
        const imageUrl = userCards.some((c) => c.id === v.id)
          ? v.image
          : unknownImage;

        const card = {
          bigImage: imageUrl,
          flavour_text: v.flavour_text,
          image: imageUrl.replace("normal", "small"),
          oracle_text: v.oracle_text,
          name: v.name,
          number: v.number,
        };

        cacheCards.push(card);
        if (imageUrl !== unknownImage) {
          ownedCards.push(card);
        }
      });

      cacheCards = this.alphanumericSort(cacheCards);
      ownedCards = this.alphanumericSort(ownedCards);

      this.cards = cacheCards;
      this.filteredCards = this.ownedFilter ? ownedCards : cacheCards;
      this.ownedCards = ownedCards;
      this.currentSet = obj.set;

      document.getElementById("filter-set-title").innerText =
        allSets[obj.set].name;
    },
    selectCard(card) {
      this.$emit("card-selected", card);
    },
    filterByOwned() {
      if (this.ownedFilter) {
        this.filteredCards = this.ownedCards;
      } else {
        this.filteredCards = this.cards;
      }
    },
    filterBySearch() {
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
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.body-content:before {
  grid-column: span 12;
}

.filters {
  display: flex;
  justify-content: space-between;
  background-color: #282b30;
}

.filter-checkbox {
  margin-left: 24px;
  margin-top: 16px;
  margin-bottom: 16px;
}

#filter-set-title {
  margin-right: 24px;
  margin-top: 9px;
  margin-bottom: 9px;
  color: #ffffff;
  font-weight: bold;
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
