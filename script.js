
let memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
let memory_values = [];
let memory_tile_id = [];
let tiles_flipped = 0;

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

memory_array = shuffle(memory_array);

// var boardDiv = document.createElement('div');
// boardDiv.className = 'board';
// document.getElementsByTagName('body')[0].appendChild(boardDiv);
var boardDiv = document.querySelector('.board');

memory_array.forEach(function(value) {
  let memory_array_value = value;

  var cardsDiv = document.createElement('div');
  cardsDiv.className = 'cards';

  boardDiv.appendChild(cardsDiv);
  console.log(memory_array_value);
});

function newGame() {
  tiles_flipped = 0;
  memory_array = shuffle(memory_array);
  let output = '';

}
