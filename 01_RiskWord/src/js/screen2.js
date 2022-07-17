
// screen2.js

// localStorage with data provide of the file index.html
var data_local = JSON.parse(localStorage.getItem("data_player"));

if (!data_local) {
    location.href = "index.html";
}

// console.log(localStorage.getItem("data_player")); // object JSON
// console.log(data_local); // object JS

const { player1, player2, text_guess: textEnemy, win } = data_local;

// TIMER COUNTER
var counter_time = 60; // 59 seconds / 60 sec better... 
var timer_bar_dimension = 96;
var result_counter_width = timer_bar_dimension / counter_time;
var fix_width_decrement = result_counter_width.toFixed(9); // til 9 decimal 
// console.log(fix_width_decrement); // Timer bar width 

/* DATA TEST
var data_test= "Matteo".toUpperCase(); // Max 6 chars
*/

// INPUT & GAME
var risk_word = "";

var your_score = 0;
var counter_try = 0;

var word_stored = [];
var word_stored_exists = [];
var placed_words = [];
var add_class = [];

var is_are_you_ready = false;
var is_finish_game = false;
var game_completed = false;
var interval_time_seconds = null;

// Start open modal = hidden sidebar, (then change when clicked start game)
get_id("app").style.overflow = "hidden";


// Timer counter "Primordial"
function timerCounter() {
    // console.log("Decrementing...");

    // Initialize other functions and show some data
    initWordBox();
    wordsEntered();

    // player1 = 0 | player2 = 1
    get_id("player_win").innerHTML = win === 1 ? "<span style='color:#89ffbe'>(P1) <b>" + player1 + "</b> PLAY!</span>" : "<span style='color:#89ffbe'>(P2) <b>" + player2 + "</b> PLAY!</span>";

    // PLAYER 1 WIN & LOSE    
    get_id("info_player1").innerHTML = player1;
    get_id("info_player1").style.color = win === 0 ? "#ff708b" : "#89ffbe";

    get_id("ico_player1").innerHTML = win === 0 ? "<i class='fa-solid fa-user' style='color:#ff708b'></i> " : "<i class='fa-solid fa-user-check' style='color:#89ffbe'></i>";
    get_id("selected1").style.backgroundColor = win === 0 ? "#800017" : "#004e23";
   
    get_id("selected1").style.border = win === 0 ? "1px solid #d80027" : "1px solid #00d861";
    get_id("selected1").style.borderBottom = win === 0 ? "5px solid #d80027" : "5px solid #00d861";

    // PLAYER 2 WIN & LOSE
    get_id("info_player2").innerHTML = player2;
    get_id("info_player2").style.color = win === 1 ? "#ff708b" : "#89ffbe";

    get_id("ico_player2").innerHTML = win === 1 ? "<i class='fa-solid fa-user' style='color:#ff708b'></i> " : "<i class='fa-solid fa-user-check' style='color:#89ffbe'></i>";
    get_id("selected2").style.backgroundColor = win === 1 ? "#800017" : "#004e23";
   
    get_id("selected2").style.border = win === 1 ? "1px solid #d80027" : "1px solid #00d861";
    get_id("selected2").style.borderBottom = win === 1 ? "5px solid #d80027" : "5px solid #00d861";

    /*
    get_id("ico_player1").innerHTML = win === 0 ? "<i class='fa-solid fa-user-check'></i>" : "<i class='fa-solid fa-user'></i>";
    get_id("selected1").style.backgroundColor = win === 0 ? "#0c0b1a" : "#160e23";
    get_id("ico_player2").innerHTML = win === 1 ? "<i class='fa-solid fa-user-check'></i>" : "<i class='fa-solid fa-user'></i>";
    get_id("selected2").style.backgroundColor = win === 1 ? "#0c0b1a" : "#160e23";
    get_id("player_win").innerHTML = win === 1 ? player1 : player2;
*/

    // Timer start
    interval_time_seconds = setInterval(() => {
        // console.log("Seconds: " + counter_time);

        // Change appearance of our timer
        if (counter_time < 10) {
            get_id("timer_counter").innerHTML = "0" + counter_time;
        } else {
            get_id("timer_counter").innerHTML = counter_time;
        }

        // Change background our timer bar depending of the time
        if (counter_time < 33) {
            get_id("bg_decrement").style.backgroundColor = "#fa9224";
            get_id("bg_decrement").style.border = "1px solid #b96a16";
        }

        if (counter_time < 13) {
            get_id("bg_decrement").style.backgroundColor = "#d80027";
            get_id("bg_decrement").style.border = "1px solid #800017";
        }

        get_id("bg_decrement").style.width = timer_bar_dimension + "%";
        //get_id("timer_counter").style.backgroundColor = "green";


        // Finish & Cleaning our timer
        if (counter_time <= 0) {
            console.log("Stop! time over.");

            playSoundScreen2.stop();
            activeModeSoundGame("lose_or_time_over");

            get_id("app").style.overflow = "hidden";
            get_id("phrase_oponent2").innerHTML = '"' + textEnemy + '"';
            get_id("my_modal_timeOver").style.display = "block";
            get_id("statics_time3").innerHTML = counter_time + "0s";
            get_id("statics_score3").innerHTML = your_score + "pts";
            get_id("statics_tries3").innerHTML = counter_try + "times";

            clearInterval(interval_time_seconds);

            return;
        }

        // Is are you ready (then open modal)
        // Decrementing our seconds
        if (is_are_you_ready) {
            counter_time -= 1;
            timer_bar_dimension -= fix_width_decrement;
        }

    }, 1000);
}

timerCounter(); // Init timer 


// INPUT & GAME
// BTN RISK
var only_one_risk = 0;
function onSubmitAndRisk() {

    console.log("Risking...");

    // console.log(only_one_risk);

    if (only_one_risk >= 1) {
        console.log("Only permit one ejecution for event.");

        return;
    }

    activeModeSoundGame("btn_click");

    risk_word = get_id("risk_word").value.toUpperCase();
    // console.log(risk_word);


    // Evaluating if not time over
    if (counter_time <= 0) {
        // console.log("Sorry. Time over.");

        return;
    }

    // Evaluating if field is empty
    if (risk_word.trim() === "") {
        console.log("The field is empty.");
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "The field is empty.";
        activeModeSoundGame("error");

        return;
    }

    // Evaluating if contain chars specials
    if (!expValidate(risk_word)) {
        console.log("Are not allowed special character.")
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "Are not allowed special character.";
        activeModeSoundGame("error");

        return;
    }

    // Evaluating if length is greater  than that the word entered by opponent
    if (risk_word.length > textEnemy.length) {
        // console.log("Limit superated. Adapt to limit of the boxes.");

        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "Limit superated. Adapt to limit of the boxes.";
        activeModeSoundGame("error");

        return;
    }

    // Evaluating if user to risk the word and then lose.
    if (risk_word !== textEnemy) {

        console.log("Opps. You lose. The words entered doesn´t equals.");
        get_id("risk_word").value = ""; // Reset input 
        get_id("info_error").style.display = "none";
        get_id("msj_alert_error").innerHTML = "";

        get_id("app").style.overflow = "hidden";
        get_id("my_modal_lose").style.display = "block";
        get_id("phrase_oponent1").innerHTML = '"' + textEnemy + '"';
        get_id("statics_time2").innerHTML = counter_time + "s";
        get_id("statics_score2").innerHTML = "No there score.";
        get_id("statics_tries2").innerHTML = "You have risked.";


        playSoundScreen2.stop();
        activeModeSoundGame("lose_or_time_over");

        clearInterval(interval_time_seconds);
        only_one_risk += 1;

        return;

    }

    // Then all validated...
    // console.log("Congrats. You won.");
    game_completed = true;

    // Resetting...
    get_id("risk_word").value = "";
    get_id("info_error").style.display = "none";
    get_id("msj_alert_error").innerHTML = "";

    get_id("app").style.overflow = "hidden";
    get_id("my_modal_win").style.display = "block";
    get_id("statics_time1").innerHTML = counter_time + "s";
    get_id("statics_score1").innerHTML = your_score + 3500 + "pts";
    get_id("statics_tries1").innerHTML = counter_try + "times";


    playSoundScreen2.stop();
    activeModeSoundGame("won");

    clearInterval(interval_time_seconds);
    only_one_risk += 1;

}


// BTN TRY
var only_one_try = 0;
function onSubmitTry() {

    console.log("Trying...");

    // console.log(only_one_try);

    if (only_one_try >= 1) {
        console.log("Only permit one ejecution for event.");
        return;
    }

    activeModeSoundGame("btn_click");

    risk_word = get_id("risk_word").value.toUpperCase();
    // console.log(risk_word);

    // Evaluating if not time over
    if (counter_time <= 0) {
        // console.log("Sorry. Time over.");
        return;
    }

    // Evaluating if field is empty
    if (risk_word.trim() === "") {
        console.log("The field is empty.");
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "The field is empty.";
        activeModeSoundGame("error");

        return;
    }

    // Evaluating if contain chars specials
    if (!expValidate(risk_word)) {
        console.log("Are not allowed special character.")
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "Are not allowed special character.";

        activeModeSoundGame("error");

        return;
    }

    // Evaluating if length is greater  than 1 (only permit 1 char)
    if (risk_word.length > 1) {

        // console.log("Limit superated. Only permit 1 char.");

        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "Limit superated. Only permit 1 char.";
        activeModeSoundGame("error");

        return;
    }

    // console.log(risk_word); // Only we obtain 1 char
    // console.log(word_stored.join("").includes(risk_word)); // Transform to string and search

    // Evaluating if exists char already entered. 
    if (word_stored.join("").includes(risk_word)) {

        // console.log("You have already entered that char.");

        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "You have already entered that char.";
        your_score -= 15;
        get_id("info_score").innerHTML = your_score;
        get_id("risk_word").value = ""; // Reset input 
        activeModeSoundGame("error");

        return;
    }

    // console.log(counter_try);
    // console.log(data_test.includes(risk_word));


    // Evaluating if there a word bad (subtract a heart). Else right word.
    if (!textEnemy.includes(risk_word)) {

        var catch_heart;

        counter_try += 1;

        add_class.push("word_wrong");
        your_score -= 25; // subtract 25 in case of that word be bad
        get_id("info_score").innerHTML = your_score;

        // Resetting...
        get_id("risk_word").value = "";
        get_id("info_error").style.display = "none";
        get_id("msj_alert_error").innerHTML = "";

        activeModeSoundGame("bad_word");

        if (counter_try < 5) {
            is_finish_game = false;
            catch_heart = get_id(`heart${counter_try}`);
            // console.log(catch_heart);

            catch_heart.parentNode.removeChild(catch_heart); // Removing ico heart

        } else {
            console.log("You lose. You have no more hearts");
            is_finish_game = true;
        }

        get_id("info_try").innerHTML = counter_try;

    } else {
        add_class.push("right_word");
    }

    // console.log(your_score, counter_try);

    // Evaluating if the game is finish (LOSE)
    if (is_finish_game) {
        // Resetting...
        get_id("risk_word").value = "";
        get_id("info_error").style.display = "none";
        get_id("msj_alert_error").innerHTML = "";

        get_id("app").style.overflow = "hidden";
        get_id("my_modal_lose").style.display = "block";
        get_id("phrase_oponent1").innerHTML = '"' + textEnemy + '"';
        get_id("statics_time2").innerHTML = counter_time + "s";
        get_id("statics_score2").innerHTML = your_score + "pts";
        get_id("statics_tries2").innerHTML = counter_try + "times";
        playSoundScreen2.stop();
        activeModeSoundGame("lose_or_time_over");

        clearInterval(interval_time_seconds);

        return;
    }

    // We store the characters entered
    word_stored.push(risk_word);
    get_id("word_entered").style.display = "block"; // Show chars entered (container)

    // console.log(word_stored);
    // console.log(add_class);

    // Showing char entered
    var body_box = get_id("word_entered");
    var element = "";
    element += "<div class='wordsEntered_container'>";

    // Words
    for (let i = 0; i < word_stored.length; i++) {

        // console.log(add_class[i]);

        if (add_class[i] === "right_word") {
            element += "<span id='word" + i.toString() + "' class='box_word_entered " + add_class[i] + "'>";
        } else {
            element += "<span id='word" + i.toString() + "' class='box_word_entered " + add_class[i] + "'>";
        }

        element += `${word_stored[i]}`;
        element += "</span>";
    }

    element += "</div>";
    element += "</div>";
    body_box.innerHTML = element;

    // In search the char existent
    Array.from(textEnemy).forEach((e, i) => {

        // console.log(e, i);
        // console.log(risk_word[i])

        if (e === risk_word[0]) {
            // console.log("item: ", e);
            get_id(`insert${i}`).innerHTML = e;
            your_score += 50;
            get_id("info_score").innerHTML = your_score;
            get_id("risk_word").value = "";
            get_id("info_error").style.display = "none";
            get_id("msj_alert_error").innerHTML = "";

            activeModeSoundGame("good_word");
        }
    });

    // Array to form the sentence based on the entered word
    var array_final = []

    // Insert char at the box
    Array.from(textEnemy).forEach((e, i) => {
        // console.log(get_id(`insert${i}`).innerText);

        if (get_id(`insert${i}`).innerText !== "-") {
            array_final.push(get_id(`insert${i}`).innerText);
        }
    });

    // console.log(array_final)

    // Then all validated...

    // Evaluating if have same length (You won)
    if (array_final.length === textEnemy.length) {

        // Resetting...
        get_id("risk_word").value = "";
        get_id("info_error").style.display = "none";
        get_id("msj_alert_error").innerHTML = "";

        // console.log("You won");
        get_id("app").style.overflow = "hidden";
        get_id("my_modal_win").style.display = "block";
        get_id("statics_time1").innerHTML = counter_time + "s";
        get_id("statics_score1").innerHTML = your_score + "pts";
        get_id("statics_tries1").innerHTML = counter_try + "times";

        playSoundScreen2.stop();
        activeModeSoundGame("won");

          // player1 = 0 | player2 = 1
        get_id("you_wonp1").innerHTML = win === 1 ? player1 : player2;

        get_id("you_wonp2").innerHTML = win === 0 ?  player1 :   player2;


        clearInterval(interval_time_seconds);
        only_one_try += 1;
    }
}


// ----------------------------------- BTN RETRY & EXIT / YOU ARE READY
function onRetryGame() {
    activeModeSoundGame("btn_click");

    localStorage.removeItem("data_player");

    setTimeout(() => {
        location.href = "index.html";
    }, 1000);
}

function onExitGame() {
    activeModeSoundGame("btn_click");

    localStorage.removeItem("data_player");
    // window.close();
    setTimeout(() => {
        location.href = "https://github.com/bailadev93/ONE_Alura-challenges";
    }, 1000);
}


function onYouAreReady() {
    is_are_you_ready = true;

    get_id('app_container').scrollIntoView({ behavior: 'smooth' }); // Scrolling top with id uncode

    activeModeSoundGame("btn_click");

    setTimeout(() => {
        playSoundScreen2.play();

        get_id("app").style.overflow = "visible";
        get_id("my_modal_you_are_ready").style.display = "none";
    }, 1000);

}

/* 
Testing with regex 
var cadena_original= "MATTEOooo".toUpperCase();
var cadena_respuesta= "o".toUpperCase();
//console.log(cadena_original);
var registro= new RegExp(cadena_respuesta, "g");
var resultado= cadena_original.match(registro);
console.log(resultado);
*/

