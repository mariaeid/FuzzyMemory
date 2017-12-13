'use strict';

let memoryArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H']; //Array of values to be used on the cards
let cardsFlipped = []; //Empty array to push clicked cards into
let matches = 0; //Counter for the matched cards

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

//Creation of card-divs and their properties
memoryArray.forEach(function(memoryArrayItem, index) {
  let card = document.createElement('div');
  card.className = 'cards';
  card.innerText = memoryArrayItem;
  boardDiv.appendChild(card);
  console.log(memoryArrayItem + ' ' + index);
});

//Selecting all divs with the card class
let cardArray = document.querySelectorAll('.cards');

//If a card is clicked it get a new class and is pushed to the at start empty array
cardArray.forEach(function(card) {
  card.addEventListener('click', function() {
    card.classList.add('cardFlipped');
    cardsFlipped.push(card);

    //If there are 2 cards in the cardsFlipped array a class is added. The user can't click on other cards while this class exists
    if (cardsFlipped.length === 2) {
      boardDiv.classList.add('noEvents');

      //Checks if the first card in the array has the same inner text as the second card
      if (cardsFlipped[0].innerText === cardsFlipped[1].innerText) {
        matches++;
        cardsFlipped = [];
        boardDiv.classList.remove('noEvents');
      }
      else {
        setTimeout(function () { //Timeout function so the user has some time to look at both cards flipped before they are turned back
          cardsFlipped[0].classList.remove('cardFlipped');
          cardsFlipped[1].classList.remove('cardFlipped');
          cardsFlipped = [];
          boardDiv.classList.remove('noEvents');
        }, 1000);
      }
      //Winning of the game - 8 matches
      if (matches === 8) {
        boardDiv.classList.add('hidden');
        main.classList.add('won');
      }
    }
  });
});

const button =  document.querySelector('button');

//Reset function that executes when clicking on the replay button. Setting matches to 0, shuffles the array, removes the winning image and the classes added when cards are flipped
button.addEventListener('click', function() {
  matches = 0;
  memoryArray = shuffle(memoryArray);
  boardDiv.classList.remove('hidden');
  main.classList.remove('won');

  cardArray.forEach(function(cardArrayItem, index) {
    cardArrayItem.classList.remove('cardFlipped');
    cardArrayItem.innerText = memoryArray[index];
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
