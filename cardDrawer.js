let baseURL = "https://deckofcardsapi.com/api/deck";

async function drawCard() {
  let data = await $.getJSON(`${baseURL}/new/draw`);
  let { suit, value } = data.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

drawCard();

async function pullFromDeck() {
  let firstDraw = await $.getJSON(`${baseURL}/new/draw`);
  let deckId = firstDraw.deck_id;
  let secondDraw = await $.getJSON(`${baseURL}/${deckId}/draw/`);
  [firstDraw, secondDraw].forEach((card) => {
    let { suit, value } = card.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });
}
pullFromDeck();

async function oneDeckPull() {
  let btn = document.getElementById("btn");
  let cardArea = document.getElementById("cardArea");
  let baseURL = "https://deckofcardsapi.com/api/deck";

  let deck = await $.getJSON(`${baseURL}/new/shuffle`);
  async function pullCard() {
    let cardData = await $.getJSON(`${baseURL}/${deck.deck_id}/draw/?count=1`);
    if (cardData.cards.length > 0) {
      let cardSrc = cardData.cards[0].image;
      let randomX = Math.floor(Math.random() * 100);
      let randomY = Math.floor(Math.random() * 100);
      let angle = Math.floor(Math.random() * 180) - 90;
      $(cardArea).append(
        $("<img>", {
          src: cardSrc,
          css: {
            position: "absolute",
            left: `${randomX}px`,
            top: `${randomY}px`,
            transform: `rotate(${angle}deg)`,
          },
        })
      );
    }
    if (cardData.remaining === 0) btn.remove();
  }
  btn.addEventListener("click", pullCard);
}

oneDeckPull();
