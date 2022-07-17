/*
######################################################################################
----------------------- APP.JS ----------------------- 
######################################################################################
*/

//  VARS
const msj_input_empty = "The field is empty.";
const msj_input_charSpecials = "Contain chars specials or your text entered contain capital letter.";
const msj_input_limit= "Limit superated. Max 20 chars.";
const msj_no_uncode= "Can´t Encrypt with that letters.";

var modal_satus;
const msj_uncode = "If you entered text with vowels this to be change to: <b>e=> enter</b>, <b>i=> imes</b>, <b>a=> ai</b>, <b>o=> ober</b> and <b>u=> ufat</b>";
const msj_decode = "Simply will change the text to: <b>enter=> e</b>, <b>imes=> i</b>, <b>ai=> a</b>, <b>ober=> o</b> and <b>ufat=> u</b>";

var value_entry_only = "";
var hash_msg_only = "";

var value_entry = "";
var hash_msg = "";
var hash_msg_copy = "";
var hash_input = "";
var copy_hash = "";

var width_screen = "";
var is_matchMatches = window.matchMedia("(max-width: 768px)").matches;
var click_btn1 = null;
var click_btn2 = null;
var click_btn3 = null;

var click_btn4 = null;
var click_btn5 = null;


// Prop: matches - true or false
//console.log(window.matchMedia("(max-width: 600px)"));
// var is_matchMedia= "";


// Get element by id (func)
const get_id = (name_id) => {
    var doc = document.getElementById(name_id);
    return doc; // "true" if exists "id with that name" otherwise "false"
}



/* 
 Resize screen changes realtime (func) 
 Reactive Resize at Body (try scale screen your Browser. use  for to media query at JS)
*/
function changeResizeScreen() {

    width_screen = window.outerWidth;

    // is_matchMedia= window.matchMedia(`(max-width: ${width_screen + "px"})`).media;
    is_matchMatches = window.matchMedia("(max-width: 768px)").matches;



    // 1) Only when our screen this in a max-width: 768px
    if (is_matchMatches && value_entry.trim() === "" && click_btn1) {

        console.log("Mobile screen.");

        get_id("result_error2").style.display = "none";
        get_id("result_error2").innerHTML = "";
        get_id("result_error1").style.display = "block";
        get_id("result_error1").innerHTML = msj_input_empty;

    } else {
        console.log("Other screen.");

        if (click_btn1) {

            console.log("Other screen Active.");

            get_id("result_error1").style.display = "none";
            get_id("result_error1").innerHTML = "";
            get_id("result_error2").style.display = "block";
            get_id("result_error2").innerHTML = msj_input_empty;

        }
    }

    // 2) Only when our screen this in a max-width: 768px
    if (is_matchMatches && !expValidate(value_entry) && click_btn2) {

        console.log("Mobile screen.");

        get_id("result_error2").style.display = "none";
        get_id("result_error2").innerHTML = "";
        get_id("result_error1").style.display = "block";
        get_id("result_error1").innerHTML = msj_input_charSpecials;

    } else {
        console.log("Other screen.");

        if (click_btn2) {

            console.log("Other screen Active.");

            get_id("result_error1").style.display = "none";
            get_id("result_error1").innerHTML = "";
            get_id("result_error2").style.display = "block";
            get_id("result_error2").innerHTML = msj_input_charSpecials;

        }
    }


    // 3) Only when our screen this in a max-width: 768px
    if (is_matchMatches && value_entry.length > 20 && click_btn3) {

        console.log("Mobile screen.");

        get_id("result_error2").style.display = "none";
        get_id("result_error2").innerHTML = "";
        get_id("result_error1").style.display = "block";
        get_id("result_error1").innerHTML = msj_input_limit;

    } else {
        console.log("Other screen.");

        if (click_btn3) {

            console.log("Other screen Active.");

            get_id("result_error1").style.display = "none";
            get_id("result_error1").innerHTML = "";
            get_id("result_error2").style.display = "block";
            get_id("result_error2").innerHTML = msj_input_limit;

        }
    }

    // 4) Only when our screen this in a max-width: 768px
    if (is_matchMatches && value_entry_only.trim() === "" && click_btn4) {

        console.log("Mobile screen.");

        get_id("result_error4").style.display = "none";
        get_id("result_error4").innerHTML = "";
        get_id("result_error3").style.display = "block";
        get_id("result_error3").innerHTML = msj_input_empty;

    } else {
        console.log("Other screen.");

        if (click_btn4) {

            console.log("Other screen Active.");

            get_id("result_error3").style.display = "none";
            get_id("result_error3").innerHTML = "";
            get_id("result_error4").style.display = "block";
            get_id("result_error4").innerHTML = msj_input_empty;

        }
    }

    // 5) Only when our screen this in a max-width: 768px
    if (is_matchMatches && click_btn5) {

        console.log("Mobile screen.");

        get_id("result_error4").style.display = "none";
        get_id("result_error4").innerHTML = "";
        get_id("result_error3").style.display = "block";
        get_id("result_error3").innerHTML = msj_no_uncode;

    } else {
        console.log("Other screen.");

        if (click_btn5) {

            console.log("Other screen Active.");

            get_id("result_error3").style.display = "none";
            get_id("result_error3").innerHTML = "";
            get_id("result_error4").style.display = "block";
            get_id("result_error4").innerHTML = msj_no_uncode;

        }
    }

    // matches contain boolean. media: contain string. 
    // console.log(is_matchMedia);

    // console.log("Width: " + width_screen);
    //console.log("Logic: " + is_matchMedia);
    // console.log("Logic: " + is_matchMedia + is_matchMatches);
}


