let csrf = $('input[name="csrfToken"]').attr("name");
let json;
let color = true;
let fill;

setTimeout(function () {
    $('.loaded_after_5sec').show();
}, 5000);

setTimeout(function () {
    $('.loading').hide();
}, 5000);


$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': csrf,
        'Content-Type': 'application/json',
        //'Accept': 'application/json'
    }
});

function updateGrid() {
    window.location.href = '/game'
}

function place(i) {
    const field = $(`#field${i + 1}`);
    if (field !== undefined) {
        field.click(function () {
            $.ajax({
                method: "GET",
                url: '/game/' + i,
                dataType: "json",
            });
        })
    } else {
        throw Error('Selected Field is unavailable');
    }
}

function move(i,j) {
    const start = $(`#field${i + 1}`);
    const destination = $(`#field${j + 1}`);
    if ((start && destination) !== undefined && (start && destination) === true ) {
        $(start).click(function () {
            $(destination).click(function () {
                $.ajax({
                    method: "GET",
                    url: '/move/' + i + '/' + j,
                    dataType: "json",
                });
            });
        })
    }
}

function remove(i) {
    const field = $(`#field${i + 1}`);
    if (field.value !== '0') {
        field.click(function () {
            $.ajax({
                method: "GET",
                url: '/remove/' + i,
                dataType: "json",
            });
        })
    } else {
        throw Error('Field does not contain removable stone');
    }
}

function init_Buttons() {
    $(`#start_game`).click(function () {
        $.ajax({
            method: "GET",
            url: '/new',
            dataType: "json",
        });
    });

    $(`#undo`).click(function () {
        $.ajax({
            method: "GET",
            url: '/undo',
            dataType: "json",
        });
    });

    $(`#redo`).click(function () {
        $.ajax({
            method: "GET",
            url: '/redo',
            dataType: "json",
        });
    });

    $(`#save`).click(function () {
        $.ajax({
            method: "GET",
            url: '/save',
            dataType: "json",
        });
    });

    $(`#load`).click(function () {
        $.ajax({
            method: "GET",
            url: '/load',
            dataType: "json",
        });
    })
}

//TODO: check JSON structure
function loadJson() {
    $.ajax({
        method: "GET",
        url: "/json",
        dataType: "json",

        success: function () {
            for (let i = 1; i <= 24; i++) {
                $(`field${i}`).clickEvent = place(i-1);
            }
            init_Buttons()
        }
    })
}

//example without using Ajax
function init_Game() {
    $('#start_game').click(function () {
        const Http = new XMLHttpRequest();
        const url = '/new';
        Http.open("GET", url);
        Http.send();
        window.location.href = '/game';
    })
}

function connectWebSocket() {
    const websocket = new WebSocket("ws://localhost:9000/websocket");
    websocket.setTimeout;

    websocket.onopen = function(event) {
        console.log('Connected to Websocket');
    };

    websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket occurred: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            json = JSON.parse(e.data);
            updateGrid();
            for (let i = 1; i <= 24; i++) {
                $(`field${i}`).clickEvent = place(i-1);
            }
            init_Buttons()
        }
    };
}

    // -------------------------------------------------------------


let myGame
let player1Name
let player2Name

$(function() {
  addAnimationListeners()
  $('button[name="new-game"]').on('click', createNewGame)
  addPlacePieceListener()
  $('#cancel').on('click', function (event) {
    myGame.cancelMovePiece()
  })
  $('#cancel').hide()
  addPlayAgainListener()
})

function addAnimationListeners() {
  $(`.node`).on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(e) {
    $(this).removeClass("selected-mill")
  })
  $(`.messages`).on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function(e) {
    $(this).removeClass("blink-messages")
  })
  $(`.messages`).on("webkitAnimationEnd oanimationend msAnimationEnd animationend", '.message-content', function(e) {
    e.stopPropagation()
  })
}

function createNewGame() {
  player1Name = $('input[name="player-1-name"]').val()
  player2Name = $('input[name="player-2-name"]').val()
  if (player1Name == "" || player2Name == "") {
    alert('Player names cannot be blank!')
    return
  } else if (player1Name == player2Name) {
    alert('Player names must be different!')
    return
  }
  startNewGame()
}

function startNewGame(gameData) {
  myGame = new Game(gameData)
  let player1 = new Player(player1Name)
  let player2 = new Player(player2Name)
  myGame.players.push(player1, player2)
  myGame.currentPlayer = player1
  $('.start-page').hide()
  $('.game-page').show()
  myGame.showPlayerPieces()
  myGame.promptPlayer("turn")
  myGame.renderGame()
}

function addPlacePieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.placePiece(this.id)
    })
}

function addSelectPieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.selectPiece(this.id)
    })
}

function addMovePieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.movePiece(this.id)
    })
}

function addCapturePieceListener() {
    removeListeners()
    $('.node').on('click', function (event) {
      myGame.capturePiece(this.id)
    })
}

function removeListeners() {
  $('.node').off("click")
}

function addPlayAgainListener() {
  $('.winner-page').on("click", ".play-again", function (event) {
    myGame.playAgain()
  })
}


$(document).ready(function () {
    loadJson();
    connectWebSocket();
    addAnimationListeners()
    createNewGame()
    startNewGame(gameData)
    addPlacePieceListener()
    addSelectPieceListener()
    addMovePieceListener()
    addCapturePieceListener()
    addPlayAgainListener()
    $(".loading").show();
    $(".loaded_after_5sec").hide();
}) ;

$(document).ready(function () {

  $('.first-button').on('click', function () {

    $('.animated-icon1').toggleClass('open');
  });
  $('.second-button').on('click', function () {

    $('.animated-icon2').toggleClass('open');
  });
  $('.third-button').on('click', function () {

    $('.animated-icon3').toggleClass('open');
  });
});

class Game {
  constructor(gameData) {
    this.players = []
    this.totalPiecesPlaced = 0
    this.selectedPiece
    this.currentPlayer
    this.currentStatus = {
      "node-1": null,
      "node-2": null,
      "node-3": null,
      "node-4": null,
      "node-5": null,
      "node-6": null,
      "node-7": null,
      "node-8": null,
      "node-9": null,
      "node-10": null,
      "node-11": null,
      "node-12": null,
      "node-13": null,
      "node-14": null,
      "node-15": null,
      "node-16": null,
      "node-17": null,
      "node-18": null,
      "node-19": null,
      "node-20": null,
      "node-21": null,
      "node-22": null,
      "node-23": null,
      "node-24": null,
    }
  }

  promptPlayer(type) {
      $(".messages").empty()
    switch(type) {
      case "turn":
        $(".messages").append(`<div class="message-content typewriter">${this.currentPlayer.name}, it is your turn</div>`)
        break
      case "not empty":
        $(".messages").append("<div class='message-content typewriter'>Chose an empty field</div>")
        break
      case "not adjacent":
        $(".messages").append("<div class='message-content typewriter'>Chose an adjacent field</div>")
        break
      case "mill error":
        $(".messages").append("<div class='message-content typewriter'>You can't take a piece from a mill!</div>")
        break
      case "mill success":
        $(".messages").append("<div class='message-content typewriter'>You may take one of your opponent's pieces!</div>")
        break
      case "own piece":
        $(".messages").append("<div class='message-content typewriter'>Please select one of your pieces</div>")
        break
      case "opponent piece":
        $(".messages").append("<div class='message-content typewriter'>Please select an opponent's piece</div>")
        break
      default:
        break
      }

    }

  placePiece(nodeId) {
    // Check if field is empty

    if (this.currentStatus[nodeId] === null) {
      let piece = new Piece(this.currentPlayer, nodeId)
      this.currentStatus[nodeId] = this.currentPlayer.name
      this.totalPiecesPlaced++
      this.currentPlayer.piecesLeftToPlace--

      this.showPlayerPieces()

      if (this.isMill(nodeId)) {
        this.renderGame()
        this.promptPlayer("mill success")
        console.log('Entering capturePiece mode');
        addCapturePieceListener()
        return
      }

      this.switchPlayer()

      console.log("Current Player is: " + this.currentPlayer.name)

      if (this.totalPiecesPlaced >= 18) {
        console.log("18 pieces are placed! Switching listeners");
        addSelectPieceListener()
      }
    } else {
      this.promptPlayer("not empty")
    }
    this.renderGame()
  }

  findPlayerClass(player) {
    if (this.players[0] === player) {
      return "player-1"
    } else {
      return "player-2"
    }
  }

  selectPiece(nodeId) {
    // check if selected Piece belongs to current player
    if (this.currentStatus[nodeId] === this.currentPlayer.name) {
      // set game.selectedPiece to event target nodeId
      this.selectedPiece = nodeId
      // add highlight to selected piece
      $(`#${nodeId}`).addClass('selected')
      // remove current selectPieceListeners, add movePieceListeners

      addMovePieceListener()
      $('#cancel').show()
    } else {
      this.promptPlayer("own piece")
    }
  }

  movePiece(nodeId) {
    // check if node is adjacent and empty
    if (ADJACENT_COMBINATIONS[this.selectedPiece].includes(nodeId) && this.currentStatus[nodeId] === null) {
      // remove color from selected field and update current status
      console.log("Correct adjacent piece selected!");
      this.currentStatus[this.selectedPiece] = null
      // update currentStatus
      this.currentStatus[nodeId] = this.currentPlayer.name
      if (this.isMill(nodeId)) {
        $('#cancel').hide()
        this.promptPlayer("mill success")
        console.log('Entering capturePiece mode');
        this.renderGame()
        addCapturePieceListener()
        return
      }

      this.switchPlayer()

      addSelectPieceListener()
      $('#cancel').hide()
      this.renderGame()
    } else {
      this.promptPlayer("not adjacent")
    }
  }

  cancelMovePiece() {
    $('#cancel').hide()
    //remove movePieceListener and add selectPieceListeners
    $(`#${this.selectedPiece}`).removeClass('selected')
    this.selectedPiece = null

    addSelectPieceListener()
  }

  capturePiece(nodeId) {
    if (this.currentStatus[nodeId] != this.currentPlayer.name && !this.isMill(nodeId) && this.currentStatus[nodeId] != null) {
      this.currentStatus[nodeId] = null
      this.currentPlayer.capturedPieces++

      this.showPlayerPieces()

      if (this.totalPiecesPlaced < 18) {
        addPlacePieceListener()
      } else {
        addSelectPieceListener()
      }

      this.switchPlayer()

    } else if (this.isMill(nodeId) && this.currentStatus[nodeId] != this.currentPlayer.name) {
      this.promptPlayer("mill error")
    } else {
      this.promptPlayer("opponent piece")
    }
  }

  switchPlayer() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1]
    } else {
      this.currentPlayer = this.players[0]
    }

    if (this.isWinner()) {
      this.gameOver()
      return
    }

    this.renderGame()
    this.promptPlayer("turn")
  }

  isMill(nodeId) {
    const nodeToCheck = this.currentStatus[nodeId]
    return MILL_COMBINATIONS.some(combination => {
      if (combination.includes(nodeId)) {
        let millExists = combination.every(node => {
          return this.currentStatus[node] === nodeToCheck && nodeToCheck != null
        })
        if (millExists) {
          this.blinkMill(combination)
        }
        return millExists
      }
    })
  }

  blinkMill(combination) {
    combination.forEach( nodeId => {
      $(`#${nodeId}`).addClass('selected-mill')
    })
    $('.messages').addClass('blink-messages')
  }

  isWinner() {

    let twoPiecesLeft = this.currentPlayer.capturedPieces >= 7

    let currentPlayersPieces = []
    for (let node in this.currentStatus) {
      if (this.currentStatus[node] === this.currentPlayer.name) {
        currentPlayersPieces.push(node)
      }
    }

    let noMoves = !currentPlayersPieces.some(piece => {
      return ADJACENT_COMBINATIONS[piece].some(adjacentNode => {
        return this.currentStatus[adjacentNode] === null
      })
    })

    if ((twoPiecesLeft) && myGame.totalPiecesPlaced >= 18) {
      return true
    } else if (noMoves && myGame.totalPiecesPlaced >= 18) {
      if (this.currentPlayer === this.players[0]) {
        this.currentPlayer = this.players[1]
      } else {
        this.currentPlayer = this.players[0]
      }
      return true
    } else {
      return false
    }
  }

  gameOver() {
    $('.game-page').hide()
    $('.winner-page .winner-message').html(`<div class='winner'>${this.currentPlayer.name} wins!</div>`)
    $('.winner-page').show()
    console.log(`${this.currentPlayer.name} wins!`)
  }

  playAgain() {
    $('#cancel').hide()
    removeListeners()
    addPlacePieceListener()
    $('.winner-page').hide()
    createNewGame()
  }

  showPlayerPieces() {
    $(".own-pieces").empty()
    $(".captured-pieces").empty()

    this.players.forEach( (player, index) => {
      // show own pieces
      for (let i = 0; i < player.piecesLeftToPlace; i++) {
        if (index === 0) {
          $(".player-stats-1 .own-pieces").append("<div class='player-1-piece'></div>")
        } else if (index === 1) {
          $(".player-stats-2 .own-pieces").append("<div class='player-2-piece'></div>")
        }
      }

      // show captured pieces
      for (let i = 0; i < player.capturedPieces; i++) {
        if (index === 0) {
          $(".player-stats-1 .captured-pieces").append("<div class='player-2-piece'></div>")
        } else if (index === 1) {
          $(".player-stats-2 .captured-pieces").append("<div class='player-1-piece'></div>")
        }
      }
    })
  }

  renderGame() {
    this.renderNodes()
    this.renderPlayerStats()
  }

  renderNodes() {
    for (let nodeId in this.currentStatus) {
      if (this.currentStatus[nodeId] === this.players[0].name) {
        $(`#${nodeId}`).addClass('player-1')
      } else if (this.currentStatus[nodeId] === this.players[1].name) {
        $(`#${nodeId}`).addClass('player-2')
      } else {
        $(`#${nodeId}`).removeClass('player-1 player-2')
      }
      $('.node').removeClass('selected')
    }
  }

  renderPlayerStats() {
    this.showPlayerPieces()
    if (this.currentPlayer === this.players[0]) {
      $('.player-stats-1').css('opacity', 1.0)
      $('.player-stats-2').css('opacity', 0.25)
    } else {
      $('.player-stats-1').css('opacity', 0.25)
      $('.player-stats-2').css('opacity', 1.0)
    }
  }
}

const ADJACENT_COMBINATIONS = {
    "node-1": ["node-2", "node-10"],
    "node-2": ["node-1", "node-3", "node-5"],
    "node-3": ["node-2", "node-15"],
    "node-4": ["node-11", "node-5"],
    "node-5": ["node-2", "node-4", "node-6", "node-8"],
    "node-6": ["node-5", "node-14"],
    "node-7": ["node-8", "node-12"],
    "node-8": ["node-5", "node-7", "node-9"],
    "node-9": ["node-8", "node-13"],
    "node-10": ["node-1", "node-11", "node-22"],
    "node-11": ["node-10", "node-4", "node-19", "node-12"],
    "node-12": ["node-11", "node-7", "node-16"],
    "node-13": ["node-9", "node-18", "node-14"],
    "node-14": ["node-13", "node-6", "node-21", "node-15"],
    "node-15": ["node-14", "node-3", "node-24"],
    "node-16": ["node-12", "node-17"],
    "node-17": ["node-16", "node-18", "node-20"],
    "node-18": ["node-17", "node-13"],
    "node-19": ["node-11", "node-20"],
    "node-20": ["node-19", "node-17", "node-21", "node-23"],
    "node-21": ["node-20", "node-14"],
    "node-22": ["node-10", "node-23"],
    "node-23": ["node-22", "node-20", "node-24"],
    "node-24": ["node-23", "node-15"]
  }

const MILL_COMBINATIONS = [
    // across
    ["node-1", "node-2", "node-3"],
    ["node-4", "node-5", "node-6"],
    ["node-7", "node-8", "node-9"],
    ["node-10", "node-11", "node-12"],
    ["node-13", "node-14", "node-15"],
    ["node-16", "node-17", "node-18"],
    ["node-19", "node-20", "node-21"],
    ["node-22", "node-23", "node-24"],
    //down
    ["node-1", "node-10", "node-22"],
    ["node-4", "node-11", "node-19"],
    ["node-7", "node-12", "node-16"],
    ["node-2", "node-5", "node-8"],
    ["node-17", "node-20", "node-23"],
    ["node-9", "node-13", "node-18"],
    ["node-6", "node-14", "node-21"],
    ["node-3", "node-15", "node-24"],
  ]

class Piece {
  constructor(player, node) {
    this.player = player
    this.node = node
  }
}

class Player {
  constructor(name) {
    this.name = name
    this.capturedPieces = 0
    this.piecesLeftToPlace = 9


  }



}