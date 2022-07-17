
// index.js


// console.log(JSON.parse(localStorage.getItem("data_player"))); 

var data_local = JSON.parse(localStorage.getItem("data_player"));


// Btn face heads or tails
function btnSideClicked(btn_value = "") {

    // console.log(btn_value);

    switch (btn_value) {

        case "heads1":
            side_face1 = btn_value;
            get_id("btn_clicked1").style.border = "1px solid #d80027";
            get_id("btn_clicked1").style.backgroundColor = "#800017";
            get_id("btn_clicked1").style.color = "#ff708b";
            get_id("btn_clicked2").style.border = "1px solid transparent";
            get_id("btn_clicked2").style.backgroundColor = "#00d861";
            get_id("btn_clicked2").style.color = "black";
            activeModeSoundGame("btn_click");

            break;

        case "tails1":
            side_face1 = btn_value;
            get_id("btn_clicked2").style.border = "1px solid #00d861";
            get_id("btn_clicked2").style.backgroundColor = "#004e23";
            get_id("btn_clicked2").style.color = "#89ffbe";
            get_id("btn_clicked1").style.border = "1px solid transparent";
            get_id("btn_clicked1").style.backgroundColor = "#d80027";
            get_id("btn_clicked1").style.color = "black";
            activeModeSoundGame("btn_click");

            break;

        case "heads2":
            side_face2 = btn_value;
            get_id("btn_clicked3").style.border = "1px solid #d80027";
            get_id("btn_clicked3").style.backgroundColor = "#800017";
            get_id("btn_clicked3").style.color = "#ff708b";
            get_id("btn_clicked4").style.border = "1px solid transparent";
            get_id("btn_clicked4").style.backgroundColor = "#00d861";
            get_id("btn_clicked4").style.color = "black";
            activeModeSoundGame("btn_click");

            break;

        case "tails2":
            side_face2 = btn_value;
            get_id("btn_clicked4").style.border = "1px solid #00d861";
            get_id("btn_clicked4").style.backgroundColor = "#004e23";
            get_id("btn_clicked4").style.color = "#89ffbe";
            get_id("btn_clicked3").style.border = "1px solid transparent";
            get_id("btn_clicked3").style.backgroundColor = "#d80027";
            get_id("btn_clicked3").style.color = "black";
            activeModeSoundGame("btn_click");

            break;

        default:
            console.log("No existing value.");
            break;
    }

    if (side_face1 === "heads1" && side_face2 === "heads2") {
        // console.log("Your opponent has already selected this face.");
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "Your opponent has already selected this face.";
        side_isEqual = true;
        activeModeSoundGame("error");

        return;

    } else if (side_face1 === "tails1" && side_face2 === "tails2") {
        // console.log("Your opponent has already selected this face.");
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "Your opponent has already selected this face.";
        side_isEqual = true;
        activeModeSoundGame("error");

        return;
    }

    side_isEqual = false;

    // console.log({side_face1, side_face2});
    get_id("info_error").style.display = "none";
    get_id("msj_alert_error").innerHTML = "";

}


// Btn Next step (with opening modal...)
function onNextStep() {
    // console.log("Next step...");

    nickname1 = get_id("player1").value;
    nickname2 = get_id("player2").value;
    // console.log(nickname1, nickname2);

    // Validate
    if (nickname1.trim() === "" || nickname2.trim() === "" ||
        side_face1 === "" || side_face2 === "") {
        //console.log("All fields are required.");
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "All fields are required.";
        activeModeSoundGame("error");

        return;
    }


    if (nickname1.length > 6 || nickname2.length > 6) {
        // console.log("As limit 6 chars.");
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "As limit 6 chars.";
        activeModeSoundGame("error");

        return;
    }


    if (nickname1 === nickname2) {
        nickname1 += "_X";
        nickname2 += "_Y";
    }

    // console.log({nickname1, nickname2});

    if (side_isEqual && side_face1 && side_face2) {
        //console.log("Your opponent has already selected this face.");
        get_id("info_error").style.display = "block";
        get_id("msj_alert_error").innerHTML = "Your opponent has already selected this face.";
        activeModeSoundGame("error");

        return;
    }

    ///activeSoundGame('./src/audio/btn_click.ogg');

    var side_random = Math.floor((Math.random() * 1) + 0.5); // Range [0..1]
    //console.log(side_random);

    if (side_random < 0.5) {
        // console.log("Win Player 1");
        data_player.player = "Player 1";
        data_player.msjTurn = `(P1) ${charCapital(nickname1)} it's your turn...`;
        data_player.nickname = nickname1;
        data_player.side_face = side_face1;

    } else {
        // console.log("Win Player 2");
        data_player.player = "Player 2";
        data_player.msjTurn = `(P2) ${charCapital(nickname2)} it's your turn...`;
        data_player.nickname = nickname2;
        data_player.side_face = side_face2;

    }

    win_player = side_random; // 0 = player1 - 1= player2

    get_id("info_error").style.display = "none";
    get_id("msj_alert_error").innerHTML = "";

    // console.log(data_player);
    // alert(data_player.msjTurn);

    // Open modal
    var modal = get_id("my_modal");
    modal.style.display = "block";
    get_id("app").style.overflow = "hidden";
    get_id("inner_title").innerHTML = data_player.msjTurn;
    get_id("label_player").innerHTML = "Write a phrase to guess";

}


// Ready for play
function onModalReady() {
    activeModeSoundGame("btn_click");

    text_guess = get_id("text_guess").value.toUpperCase();
    // console.log(text_guess);

    if (text_guess.trim() === "") {
        // console.log("Field is required.");
        get_id("info_error1").style.display = "block";
        get_id("msj_alert_error1").innerHTML = "Field is required.";
        activeModeSoundGame("error");

        return;
    }

    if (text_guess.length > 6) {
        // console.log("As limit 6 chars.");
        get_id("info_error1").style.display = "block";
        get_id("msj_alert_error1").innerHTML = "As limit 6 chars.";
        activeModeSoundGame("error");
        return;
    }

    // Evaluating if contain chars specials
    if (!expValidate(text_guess)) {
        console.log("Are not allowed special character.")
        get_id("info_error1").style.display = "block";
        get_id("msj_alert_error1").innerHTML = "Are not allowed special character.";

        activeModeSoundGame("error");

        return;
    }

    
    get_id("info_error1").style.display = "none";
    get_id("msj_alert_error1").innerHTML = "";

    // LocalStorage
    localStorage.setItem("data_player", JSON.stringify({
        "player1": charCapital(nickname1),
        "player2": charCapital(nickname2),
        "text_guess": text_guess.toUpperCase(),
        "win": win_player
    }));


    setTimeout(() => {
        location.href = "screen2.html";
        // window.open("screen2.html", "_self"); // open screen at same window
    }, 1000);

}


