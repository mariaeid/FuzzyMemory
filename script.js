'use strict';

let memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
let cardsFlipped = [];
let prevCardFlipped;
let cardFlipped;
let counterMatch = 0;

// shuffle function
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//Shuffle of the card array
memory_array = shuffle(memory_array);

const boardDiv = document.querySelector('.board');

memory_array.forEach(function(memory_array_item, index) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'cards';
  cardDiv.dataset.id = "0";
  cardDiv.innerText = memory_array_item;
  cardDiv.addEventListener('click', function() {
    cardDiv.classList.add('cardFlipped');
    if (cardDiv.dataset.id === "0"){
      cardDiv.dataset.id="1";
    }
    let counter = 0;
    cardsFlipped.forEach(function(cardFlipped, index) {
      const id = cardFlipped.dataset.id;
      if (id === "1") {
        cardFlipped.classList.add('cardFlipped');
        setTimeout(function(){
          if (counter === 0) {
            prevCardFlipped = cardsFlipped[index];
            counter++;
          }
          else {
            if (prevCardFlipped.innerText === cardFlipped.innerText) {
              counter = 0;
              prevCardFlipped.dataset.id = "2";
              cardFlipped.dataset.id = "2";
              counterMatch ++;
            }
            else {
              counter = 0;
              if (cardDiv.dataset.id !== "2"){
                prevCardFlipped.classList.remove('cardFlipped');
                cardFlipped.classList.remove('cardFlipped');
                prevCardFlipped.dataset.id = "0";
                cardFlipped.dataset.id = "0";
              }
            }
          }
        }, 700);
      }
    });
  });
  cardsFlipped[index] = cardDiv;
  boardDiv.appendChild(cardDiv);
  console.log(memory_array_item + ' ' + index);
});


//Reset of game
const button = document.querySelector('button');
button.addEventListener('click', function() {
  location.reload();
});
