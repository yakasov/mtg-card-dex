import eventBus from "./eventBus";
import store from "./store";

export default function register() {
  eventBus.on("begin-import", beginImport);
}

async function beginImport(input) {
  const cardDict = {};
  const missingSets = [];
  input.split("\n").forEach((l) => {
    const set = l.match(/\((.*?)\)/u)[1];
    const id = l.match(/\)\s*(\d+)/u)[1];

    if (!cardDict[set]) {
      cardDict[set] = [];
    }

    cardDict[set].push(id);
  })

  Object.keys(cardDict).forEach((k) => {
    if (!store.getters.getCache[k]) {
      missingSets.push(k);
    }
  });

  if (missingSets.length) {
    await fetch("https://jmcd.uk/mtg/createCardCache", {
      method: "POST",
      body: {
        sets: JSON.stringify(missingSets)
      }
    })
  }
}