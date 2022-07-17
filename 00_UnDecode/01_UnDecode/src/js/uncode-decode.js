// Button encrypt - uncode 
function btnEncrypt() {
    // console.log("Encrypted.");

    value_entry = get_id("textarea").value;

    // console.log(value_entry);

    // console.log(input_value);

    if (value_entry.trim() === "") {
        click_btn1 = true;
        click_btn2 = false;
        click_btn3 = false;

        // console.log("The field is empty.");

        get_id("result_content1").style.display = "none";
        get_id("result_encrypt1").innerHTML = "";
        get_id("btn_copy").style.display = "none";
        get_id("result_copy").style.display = "none";
        get_id("btn_desencrypt").style.display = "none";
        get_id("result_header1").style.display = "none";
        get_id("nothing_visible1").style.display = "none";

        // console.log(is_matchMatches)

        // Only when our screen this in a max-width: 768px
        if (is_matchMatches) {
            console.log("Mobile screen.");

            get_id("result_error2").style.display = "none";
            get_id("result_error2").innerHTML = "";
            get_id("result_error1").style.display = "block";
            get_id("result_error1").innerHTML = msj_input_empty;

        } else {
            console.log("Other screen.");

            get_id("result_error1").style.display = "none";
            get_id("result_error1").innerHTML = "";
            get_id("result_error2").style.display = "block";
            get_id("result_error2").innerHTML = msj_input_empty;

        }

        return;
    }

    if (!expValidate(value_entry)) {

        click_btn1 = false;
        click_btn2 = true;
        click_btn3 = false;

        // console.log("Contain chars specials.");

        get_id("result_encrypt1").innerHTML = "";
        get_id("result_content1").style.display = "none";
        get_id("btn_copy").style.display = "none";
        get_id("result_copy").style.display = "none";
        get_id("btn_desencrypt").style.display = "none";
        get_id("result_header1").style.display = "none";
        get_id("nothing_visible1").style.display = "none";

        // console.log(is_matchMatches)

        // Only when our screen this in a max-width: 768px
        if (is_matchMatches) {
            console.log("Mobile screen.");

            get_id("result_error2").style.display = "none";
            get_id("result_error2").innerHTML = "";
            get_id("result_error1").style.display = "block";
            get_id("result_error1").innerHTML = msj_input_charSpecials;

        } else {
            console.log("Other screen.");

            get_id("result_error1").style.display = "none";
            get_id("result_error1").innerHTML = "";
            get_id("result_error2").style.display = "block";
            get_id("result_error2").innerHTML = msj_input_charSpecials;

        }

        return;
    }

    if (value_entry.length > 20) {

        click_btn1 = false;
        click_btn2 = false;
        click_btn3 = true;

        // console.log("Limit superated. Max 20 characters.");

        get_id("result_encrypt1").innerHTML = "";
        get_id("result_content1").style.display = "none";
        get_id("btn_copy").style.display = "none";
        get_id("result_copy").style.display = "none";
        get_id("btn_desencrypt").style.display = "none";
        get_id("result_header1").style.display = "none";
        get_id("nothing_visible1").style.display = "none";

        // console.log(is_matchMatches)

        // Only when our screen this in a max-width: 768px
        if (is_matchMatches) {
            console.log("Mobile screen.");

            get_id("result_error2").style.display = "none";
            get_id("result_error2").innerHTML = "";
            get_id("result_error1").style.display = "block";
            get_id("result_error1").innerHTML = msj_input_limit;

        } else {
            console.log("Other screen.");

            get_id("result_error1").style.display = "none";
            get_id("result_error1").innerHTML = "";
            get_id("result_error2").style.display = "block";
            get_id("result_error2").innerHTML = msj_input_limit;

        }

        return;
    }

    switchHash(value_entry);

    get_id("result_content1").style.display = "block";
    get_id("nothing_visible1").style.display = "none";

    get_id("result_error1").style.display = "none";
    get_id("result_error2").style.display = "none";

    get_id("result_error1").style.innerHTML = "";
    get_id("result_error2").style.innerHTML = "";

    get_id("result_copy").style.display = "none";
    get_id("btn_copy").style.display = "block";
    get_id("btn_desencrypt").style.display = "none";

    get_id("textarea").removeAttribute("disabled");
    get_id("btn_desencrypt").removeAttribute("disabled");

    get_id("btn_desencrypt").style.pointerEvents = "";
    get_id("btn_desencrypt").innerHTML = "<i style='color:black; font-size: 1.3em;' class='fa-solid fa-lock-open'></i>";
    get_id("btn_desencrypt").style.backgroundColor = "rgb(226, 211, 0)";
    get_id("btn_desencrypt").style.color = "black";

    get_id("clear_btn").style.display = "";
    get_id("result_header1").style.display = "block";
    get_id("nothing_visible1").style.display = "none";

    get_id("area1").scrollIntoView({ behavior: 'smooth' });

    click_btn1 = false;
    click_btn2 = false;
    click_btn3 = false;
}

// Get text from input to encrypt
// "Switch" value  encrypted from input
const switchHash = (string_value = "") => {

    // console.log(string_value);

    if (string_value === "") {
        return;
    }

    for (let i = 0; i < string_value.length; i++) {

        // console.log("Value: " + string_value[i]);

        switch (string_value[i]) {

            case "e":
                hash_msg += "enter";
                break;
            case "i":
                hash_msg += "imes";
                break;
            case "a":
                hash_msg += "ai";
                break;
            case "o":
                hash_msg += "ober";
                break;
            case "u":
                hash_msg += "ufat";
                break;
            default:
                hash_msg += string_value[i];
                break;
        }
    }

    // console.log(hash_msg); 

    hash_msg_copy = hash_msg;

    // console.log(hash_msg_copy)

    // Encrypting...   
    textAndHash("result_encrypt1", hash_msg_copy);

    hash_msg = ""; // Reset 

}

// Get text for hash 
const textAndHash = (name_id, element_value) => {

    // console.log(element_value);

    var result;

    // true --> copy clip board
    if (name_id === "") {

        result = element_value.select();
        result = element_value.setSelectionRange(0, 99999);
        result = navigator.clipboard.writeText(element_value.value);

        // only encrypt
    } else {

        result = get_id(name_id).innerHTML = element_value;

        copy_hash = result;
    }

    // console.log(result);

    return result;
}

// Decrypt text copied 
function desencrypt() {

    get_id("header_title1").innerHTML = "Desencrypted";
    get_id("textarea").value = value_entry;
    //textAndHash("textarea", copy_hash);
    get_id("textarea", copy_hash);
    //console.log(copy_hash)

    if (is_matchMatches) {
        get_id("uncode").scrollIntoView({ behavior: 'smooth' });
    }

    get_id("clear_btn").style.display = "none";
    get_id("textarea").setAttribute("disabled", "true");
    get_id("textarea").style.fontSize = "3em";
    get_id("btn_desencrypt").setAttribute("disabled", "true");
    get_id("btn_desencrypt").style.pointerEvents = "none";
    get_id("btn_desencrypt").innerHTML = "<i class='fa-solid fa-ban'></i>";
    get_id("btn_desencrypt").style.backgroundColor = "gray";
    get_id("btn_desencrypt").style.color = "black";
}

// Copy data result at clipboard 
function copyClipBoard() {

    // console.log("Value" + value_entry);
    // console.log("Value" + hash_msg_copy);

    hash_input = get_id("hash_input").value = hash_msg_copy;
    //console.log(hash_input);
    var element = get_id("hash_input");

    textAndHash("", element);

    if (copy_hash === "") {
        console.log("Nothing to copy.");
        return;
    }
    // console.log(copy_hash);
    get_id("result_copy").style.display = "block";
    get_id("result_copy").innerHTML = "Has been copied: " + copy_hash;
    get_id("result_content1").style.display = "none";
    get_id("btn_copy").style.display = "none";
    get_id("btn_desencrypt").style.display = "block";
    get_id("textarea").value = "";
    get_id("textarea").removeAttribute("disabled");
    get_id("btn_desencrypt").removeAttribute("disabled");
    get_id("clear_btn").style.display = "none";
    get_id("result_header1").style.display = "none";

}