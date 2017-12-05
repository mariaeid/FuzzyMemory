'use strict';

let memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
let memory_values = [];
let memory_tile_id = [];
let cardsFront = [];
let tiles_flipped = 0;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

memory_array = shuffle(memory_array);

var boardDiv = document.querySelector('.board');

memory_array.forEach(function(memory_array_item, index) {
  var cardDiv = document.createElement('div');
  cardDiv.className = 'cards';
  cardDiv.dataset.id="0";
  cardDiv.innerText = memory_array_item;
  cardDiv.addEventListener('click', function() {
    cardDiv.style.color = '#fff';
    if (cardDiv.dataset.id !== "2"){
      cardDiv.dataset.id="1";
    }
    let counter = 0;
    let text;
    cardsFront.forEach(function(cardsFront_item, index) {
      var id = cardsFront_item.dataset.id;
      if (id === "1") {
        cardsFront_item.style.color = '#fff';
        setTimeout(function(){
          if (counter < 1) {
            text = cardsFront[index];
            counter++;
          }
          else {
            if (text.innerText === cardsFront_item.innerText) {
              console.log("hello");
              counter = 0;
              text.dataset.id = "2";
              cardsFront_item.dataset.id = "2";
            }
            else {
              counter = 0;
              text.style.color = '#f6546a';
              cardsFront_item.style.color = '#f6546a';
              if (cardDiv.dataset.id !== "2"){
                text.dataset.id = "0";
                cardsFront_item.dataset.id = "0";
              }
            }
          }
        }, 1000);
      }

    });
  });

  cardsFront[index] = cardDiv;

  var boardDiv = document.querySelector('.board');
  boardDiv.appendChild(cardDiv);
  console.log(memory_array_item + ' ' + index);

});


// console.log(cardsFront[3].innerText);
