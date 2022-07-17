
/*SOME LINKS: 
 https://howlerjs.com/
 https://freesound.org/
 https://convertio.co/
*/

// Get element By Id
const get_id = (name_id) => {
    var doc = document.getElementById(name_id);

    return doc; // "true" if exists "id with that name" otherwise "false"
}

// Transform char to Capital text
const charCapital = (phrase) => {

    return phrase[0].toUpperCase() + phrase.slice(1);
}

// index.js
var nickname1 = "";
var side_face1 = "";
var nickname2 = "";
var side_face2 = "";
var win_player = null;

var side_isEqual = false;
var data_player = {};
var text_guess = "";

// Validation REGEX
const expValidate = (text) => {

    const regex = new RegExp(/^[A-Z\s]+$/g);
    // console.log(regex.test(text))

    var validation = regex.test(text); // true= con caracteres especiales / false= sin caracteres especiales
    // console.log(validation);

    if (validation) {
        return true;
    } else {
        return false;
    }
}

// console.log(expValidate("HOLA")); // true
// console.log(expValidate("hola")); // false


// FUNCTION
function initWordBox() {

    // console.log("Initializing words entered...");

    var body_box = get_id("container_letters_box");

    var element = "";

    element += "<div class='number_letters_content' id='letter_content_items'>";

    // Cells
    for (let i = 0; i < textEnemy.length; i++) {

        element += "<div id='boxItems' class='box_letter'>";
        element += "<div  class='box_content_letter'>";
        element += "<span id='insert" + i.toString() + "'>";
        element += `${"-"}`;
        element += "</span>";
        element += "</div>";
        element += "</div>";
    }

    element += "</div>";

    body_box.innerHTML = element;
}

function wordsEntered(arr = [], CSSclass = "") {

    // console.log("Put words entered...");
    // console.log(arr.sort(), CSSclass);
    // console.log(arr)

    var sort_arr = arr.sort();
    var body_box = get_id("word_entered");
    var element = "";
    element += "<div class='wordsEntered_container'>";

    if (arr.length > 0) {

        // Words
        for (let i = 0; i < arr.length; i++) {
            element += "<span id='word" + i.toString() + "' class='box_word_entered + " + CSSclass + "'>";
            element += `${sort_arr[i]}`;
            element += "</span>";
            element += "<span id='word" + i.toString() + "' class='box_word_entered + " + CSSclass + "'>";
            element += `${sort_arr[i]}`;
            element += "</span>";
        }

        element += "</div>";
    }

    element += "</div>";

    body_box.innerHTML = element;
}


















// Sound screen index.html
var cont = 0;
function playSoundScreen1() {
    cont += 1;

    if (cont <= 1) {
        var sound = new Howl({
            src: ['./src/audio/screen1_music.ogg'],
            html5: true,
            loop: true,
            volume: 0.2,
        });

        sound.play();
    }
}

// Sound screen screen2.html
var playSoundScreen2 = new Howl({
    src: ["./src/audio/screen2_music.ogg"],
    volume: 0.2,
    html5: true
});

// Sound several
function onTypingInput() {

    var sound = new Howl({
        src: ["./src/audio/typing_input.ogg"],
        volume: 0.5,
        html5: true
    });

    sound.play();
}

function activeModeSoundGame(type_msg = "", vol_sound = 0.5) {

    var path_sound = "";

    switch (type_msg) {

        case "btn_click":
            path_sound = "./src/audio/btn_click.ogg";
            break;

        case "error":
            path_sound = "./src/audio/alert_active.ogg";
            break;

        case "lose_or_time_over":
            path_sound = "./src/audio/you_lose.ogg";
            break;

        case "bad_word":
            path_sound = "./src/audio/bad_word.ogg";
            break;

        case "good_word":
            path_sound = "./src/audio/good_word.ogg";
            break;

        case "won":
            path_sound = "./src/audio/you_won.ogg";
            break;
    }

    var sound = new Howl({
        src: [path_sound],
        volume: vol_sound,
        html5: true
    });

    sound.play();

}



