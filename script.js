'use strict';

let memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
let memory_values = [];
let memory_tile_id = [];
let cardsFlipped = [];
let tiles_flipped = 0;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

memory_array = shuffle(memory_array);

const boardDiv = document.querySelector('.board');


memory_array.forEach(function(memory_array_item, index) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'cards';
  cardDiv.dataset.id="0";
  cardDiv.innerText = memory_array_item;
  cardDiv.addEventListener('click', function() {
    cardDiv.classList.add('cardFlipped');
    if (cardDiv.dataset.id !== "2"){
      cardDiv.dataset.id="1";
    }
    let counter = 0;
    let card;
    cardsFlipped.forEach(function(cardFlipped, index) {
      const id = cardFlipped.dataset.id;
      if (id === "1") {
        cardFlipped.classList.add('cardFlipped');
        setTimeout(function(){
          if (counter < 1) {
            card = cardsFlipped[index];
            counter++;
          }
          else {
            if (card.innerText === cardFlipped.innerText) {
              counter = 0;
              card.dataset.id = "2";
              cardFlipped.dataset.id = "2";
            }
            else {
              counter = 0;
              card.classList.remove('cardFlipped');
              cardFlipped.classList.remove('cardFlipped');
              if (cardDiv.dataset.id !== "2"){ //Ta bort if-satsen??
                card.dataset.id = "0";
                cardFlipped.dataset.id = "0";
              }
            }
          }
        }, 1000);
      }
    });
  });

  cardsFlipped[index] = cardDiv;
  boardDiv.appendChild(cardDiv);
  console.log(memory_array_item + ' ' + index);

});
