import Board from './kanban/Board';

/* eslint-disable */
console.log("it works!");
const board = new Board(document.querySelector(".trello-container"));
board.bindToDOM();