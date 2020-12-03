let csrf = $('input[name="csrfToken"]').attr("name");
let json;

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

    //websocket.send(data);
    //websocket.close();
}

$(document).ready(function () {
    loadJson();
    connectWebSocket();
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