'use strict';

let memoryArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
let cardsFlipped = [];
let matches = 0;

// shuffle function
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

//shuffling of the card array
memoryArray = shuffle(memoryArray);

const boardDiv = document.querySelector('.board');
const main = document.querySelector('.main');

memoryArray.forEach(function(memoryArrayItem, index) {
  let card = memoryArray[index];
  card = document.createElement('div');
  card.className = 'cards';
  card.dataset.id = memoryArrayItem;
  card.innerText = memoryArrayItem;
  boardDiv.appendChild(card);
  console.log(memoryArrayItem+' '+index);
});

let cardArray = document.querySelectorAll('.cards');

cardArray.forEach(function(card) {
  card.addEventListener('click', function() {
    card.classList.add('cardFlipped');
    cardsFlipped.push(card);

    if (cardsFlipped.length === 2) {
      boardDiv.classList.add('noEvents'); //The user can't click on other cards while this class exists

      if (cardsFlipped[0].dataset.id === cardsFlipped[1].dataset.id) {
        matches++;
        cardsFlipped = [];
        boardDiv.classList.remove('noEvents');
        console.log(matches);
      }
      else {
        setTimeout(function () {
          cardsFlipped[0].classList.remove('cardFlipped');
          cardsFlipped[1].classList.remove('cardFlipped');
          cardsFlipped = [];
          boardDiv.classList.remove('noEvents');
        }, 1000);
      }
      if (matches === 2) {
        console.log("Victory!");
        matches = 0;
        boardDiv.classList.add('hidden');
        main.classList.add('won');
      }
    }
  });
});

const button =  document.querySelector('button');
button.addEventListener('click', function() {
  matches = 0;
  memoryArray = shuffle(memoryArray);
  boardDiv.classList.remove('hidden');
  main.classList.remove('won');

  cardArray.forEach(function(memoryArrayItem, index) {
    memoryArrayItem.classList.remove('cardFlipped');
    memoryArrayItem.dataset.id = memoryArray[index];
    memoryArrayItem.innerText = memoryArray[index];
  });
});

//Nedan är en alternativ lösning som jag gjorde först. Dock buggar den om man
//klickar för snabbt på korten och jag fick inte till pointer-events none på denna.
//Har också bara gjort reset-funktionen med hjälp av en reload-funktion.

// 'use strict';

// let memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
// let cardsFlipped = [];
// let prevCardFlipped;
// let cardFlipped;

// shuffle function
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }

//Shuffle of the card array
// memory_array = shuffle(memory_array);
//
// const boardDiv = document.querySelector('.board');
//
// memory_array.forEach(function(memory_array_item, index) {
//   const cardDiv = document.createElement('div');
//   cardDiv.className = 'cards';
//   cardDiv.dataset.id = "0";
//   cardDiv.innerText = memory_array_item;
//   cardDiv.addEventListener('click', function() {
//     cardDiv.classList.add('cardFlipped');
//     if (cardDiv.dataset.id === "0"){
//       cardDiv.dataset.id="1";
//     }
//     let counter = 0;
//     cardsFlipped.forEach(function(cardFlipped, index) {
//       const id = cardFlipped.dataset.id;
//       if (id === "1") {
//         cardFlipped.classList.add('cardFlipped');
//         setTimeout(function(){
//           if (counter === 0) {
//             prevCardFlipped = cardsFlipped[index];
//             counter++;
//           }
//           else {
//             if (prevCardFlipped.innerText === cardFlipped.innerText) {
//               counter = 0;
//               prevCardFlipped.dataset.id = "2";
//               cardFlipped.dataset.id = "2";
//             }
//             else {
//               counter = 0;
//               if (cardDiv.dataset.id !== "2"){
//                 prevCardFlipped.classList.remove('cardFlipped');
//                 cardFlipped.classList.remove('cardFlipped');
//                 prevCardFlipped.dataset.id = "0";
//                 cardFlipped.dataset.id = "0";
//               }
//             }
//           }
//         }, 500);
//       }
//     });
//   });
//   cardsFlipped[index] = cardDiv;
//   boardDiv.appendChild(cardDiv);
//   console.log(memory_array_item + ' ' + index);
// });


//Reset of game
// const button = document.querySelector('button');
// button.addEventListener('click', function() {
//   location.reload();
// });
