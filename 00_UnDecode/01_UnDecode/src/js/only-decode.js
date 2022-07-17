
// var cadena= "fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!";


// Button submit Data
function btnDesencrypt() {

    //console.log("Encrypted.");

    value_entry_only = get_id("textarea1").value.toLowerCase();

    // console.log(value_entry_only);


    if (value_entry_only.trim() === "") {

        click_btn1 = false;
        click_btn2 = false;
        click_btn3 = false;
        click_btn4 = true;

        // console.log("The field is empty.");

        get_id("result_content2").style.display = "none";
        get_id("result_encrypt2").innerHTML = "";
        get_id("result_header2").style.display = "none";
        get_id("nothing_visible2").style.display = "none";

        // console.log(is_matchMatches)

        // Only when our screen this in a max-width: 768px
        if (is_matchMatches) {
            console.log("Mobile screen.");

            get_id("result_error4").style.display = "none";
            get_id("result_error4").innerHTML = "";
            get_id("result_error3").style.display = "block";
            get_id("result_error3").innerHTML = msj_input_empty;

        } else {
            console.log("Other screen.");

            get_id("result_error3").style.display = "none";
            get_id("result_error3").innerHTML = "";
            get_id("result_error4").style.display = "block";
            get_id("result_error4").innerHTML = msj_input_empty;

        }

        return;
    }

    switchDesencrypt(value_entry_only);

}

const switchDesencrypt = (string_value = "") => {

    var e = string_value.match(/enter/g);
    var i = string_value.match(/imes/g);
    var a = string_value.match(/ai/g);
    var o = string_value.match(/ober/g);
    var u = string_value.match(/ufat/g);

    //var rdo_logic = e || i || a || o || u;

    // console.log({e,i,a,o,u});
    //console.log(rdo_logic);

    if (e || i || a || o || u) {
        
        hash_msg_only = string_value
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");

        // console.log(hash_msg_only);

        get_id("result_header2").style.display = "block";
        get_id("result_content2").style.display = "block";
        get_id("result_encrypt2").innerHTML = hash_msg_only;
        get_id("nothing_visible2").style.display = "none";
    
        get_id("result_error3").style.display = "none";
        get_id("result_error4").style.display = "none";
    
        get_id("result_error3").style.innerHTML = "";
        get_id("result_error4").style.innerHTML = "";

        get_id("area2").scrollIntoView({ behavior: 'smooth' });

        get_id("textarea1").value = "";

    } else {
        
        click_btn1 = false;
        click_btn2 = false;
        click_btn3 = false;
        click_btn4 = false;
        click_btn5 = true;

        // console.log("Can´t Encrypt with that letters.");

        get_id("result_content2").style.display = "none";
        get_id("result_encrypt2").innerHTML = "";
        get_id("result_header2").style.display = "none";
        get_id("nothing_visible2").style.display = "none";

        // console.log(is_matchMatches)

        // Only when our screen this in a max-width: 768px
        if (is_matchMatches) {
            console.log("Mobile screen.");

            get_id("result_error4").style.display = "none";
            get_id("result_error4").innerHTML = "";
            get_id("result_error3").style.display = "block";
            get_id("result_error3").innerHTML = msj_no_uncode;

        } else {
            console.log("Other screen.");

            get_id("result_error3").style.display = "none";
            get_id("result_error3").innerHTML = "";
            get_id("result_error4").style.display = "block";
            get_id("result_error4").innerHTML = msj_no_uncode;

        }

        return;
    }

}
