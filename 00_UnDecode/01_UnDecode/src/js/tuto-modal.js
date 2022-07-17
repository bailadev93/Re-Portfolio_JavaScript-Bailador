
function openModalTuto(modal_active) {

    // console.log(modal_active);

    modal_satus = get_id("my_modal");
    modal_satus.style.display = "block";

    // window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolling top automatically

    get_id("app").style.overflow = "hidden";

    if (click_btn1 || click_btn2 || click_btn3 || click_btn4 || click_btn5) {
        get_id("nothing_visible1").style.display = "block";
        get_id("nothing_visible2").style.display = "block";
        get_id("result_error1").style.display = "none";
        get_id("result_error2").style.display = "none";
        get_id("result_error3").style.display = "none";
        get_id("result_error4").style.display = "none";
        document.getElementsByClassName("input_textarea")[0].value = "";
        document.getElementsByClassName("input_textarea")[1].value = "";

    }

    if (modal_active === "uncode") {
        // console.log("uncode");<i class="fa-solid fa-microchip"></i>
        get_id("inner_title").innerHTML = "<i style='color:white;' class='fa-solid fa-microchip'></i> Uncode Tutorial";
        get_id("inner_content").innerHTML = msj_uncode;
        get_id('uncode').scrollIntoView({ behavior: 'smooth' }); // Scrolling top with id uncode

    } else if (modal_active === "decode") {
        // console.log("decode");
        get_id("inner_title").innerHTML = "<i style='color:white;' class='fa-solid fa-microchip'></i> Decode Tutorial";
        get_id("inner_content").innerHTML = msj_decode;
        get_id('decode').scrollIntoView({ behavior: 'smooth' }); // Scrolling top with id decode

    }
}

function closeModalTuto() {

    modal_satus.style.display = "none"
    get_id("app").style.overflow = "visible";

}

// When clicked anywhere outside of the modal, close it...
window.onclick = function (event) {

    // console.log(event); // Show properties belonging of the object event
    // console.log(event.target); // Show btn current of the trigger event
    // console.log(modal_satus); // Show elements belonging of the modal

    if (event.target === modal_satus) {
        modal_satus.style.display = "none";
        get_id("app").style.overflow = "visible";
    }
}



