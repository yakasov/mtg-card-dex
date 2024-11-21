<template>
  <div class="body-content">
    <div
      class="card"
      v-for="(card, index) in cards"
      :key="index"
      @click="selectCard(card)"
    >
      <div class="card-title">{{ card.title }}</div>
      <div class="card-image">
        <img :src="card.image" :alt="card.title" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    };
  },
  watch: {
    set(obj) {
      this.loadCards(obj);
    },
  },
  methods: {
    loadCards(obj) {
      const cacheDict = this.$store.getters.getCache[obj.set];
      const userCards = this.$store.getters.getCards[obj.user][obj.set];
      const cacheCards = [];

      Object.entries(cacheDict).forEach(([k, v]) => {
        cacheCards.push({ 
          image: userCards.includes(v.id) ? v.image : "src/assets/unknown.png",
          title: v.name,
         })
      })

      this.cards = cacheCards
    },
    selectCard(card) {
      this.$emit("card-selected", card);
    },
  },
};
</script>

<style scoped>
.body-content {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(12, minmax(150px, 10fr));
  gap: 10px 10px;
  padding: 20px;
  background-color: #282b30;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
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
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #ffffff;
}

.card-image img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
