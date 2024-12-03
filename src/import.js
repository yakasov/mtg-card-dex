import eventBus from "./eventBus";

export default function register() {
  eventBus.on("begin-import", beginImport);
}

async function beginImport(params) {
  const input = params.input;
  const cardDict = [];
  input.split("\n").forEach((l) => {
    const set = l.match(/\((.*?)\)/u);
    const id = l.match(/\)\s*(\d+)/u);

    if(set && id) {
      cardDict.push({ id: id[1], set: set[1] })
    }
  })

  await fetch("https://jmcd.uk/mtg/saveCards", {
    method: "POST",
    body: JSON.stringify({
      cards: cardDict,
      user: params.user
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((r) => {
    if (r.status === 200) {
      eventBus.emit("show-toast", { msg: "Cards successfully imported!" });
    } else {
      eventBus.emit("show-toast", { msg: `Error importing cards, code ${r.status}` });
    }
  })
}