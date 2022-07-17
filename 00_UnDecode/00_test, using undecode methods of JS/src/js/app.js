
var value_entry= "";

var copy_hash;


// getElementById
const get_id= (name_id)=>{

      var doc= document.getElementById(name_id);

      return doc; // "true" if exists "id with that name" otherwise "false"
}


// Encrypt with window.btoa(value_text)
const encrypt_value= (name_id, value)=>{

    var result;

    
    // true --> copy clip board
    if(name_id === ""){

        result= window.btoa(value.select());
        result= window.btoa(value.select());
        result= window.btoa(value.setSelectionRange(0, 99999));
        result= navigator.clipboard.writeText(window.btoa(value.value));

        copy_hash= window.btoa(value.value);

        console.log(copy_hash);
    
        
    }else{
        result= get_id(name_id).innerHTML= window.btoa(value);
    }

    return result;
}

// Desencrypt with window.atob(value_hash)
const desencrypt_hash= (name_id, hash)=>{

    var decode= document.getElementById(name_id).value= window.atob(hash);

    return decode;
}




function encryptEntry(){

    get_id("header_title").innerHTML= "Encrypt";

    value_entry= get_id("textarea").value;

    // console.log(value_entry);

    if(value_entry.trim() === ""){
        // console.log("The field is empty.");

        get_id("result_encrypt").innerHTML= "";
        get_id("result_content").style.display= "none";
        get_id("result_error").style.display= "block";
        get_id("result_error").innerHTML= "The field is empty.";
        get_id("btn_copy").style.display= "none";
        get_id("result_copy").style.display= "none";
        get_id("btn_desencrypt").style.display= "none";

        return;
    }

    if(value_entry.length > 20){
        // console.log("Limit superated. Max 20 characters.");

        get_id("result_encrypt").innerHTML= "";
        get_id("result_content").style.display= "none";
        get_id("result_error").style.display= "block";
        get_id("result_error").innerHTML= "Limit superated. Max 20 characters.";
        get_id("btn_copy").style.display= "none";
        get_id("result_copy").style.display= "none";
        get_id("btn_desencrypt").style.display= "none";

        return;
    }

    get_id("result_content").style.display= "block";
    encrypt_value("result_encrypt", value_entry);
    get_id("result_error").style.display= "none";
    get_id("result_copy").style.display= "none";
    get_id("btn_copy").style.display= "block";
    get_id("btn_desencrypt").style.display= "none";
    get_id("textarea").removeAttribute("disabled");
    get_id("btn_desencrypt").removeAttribute("disabled");
    get_id("btn_desencrypt").style.pointerEvents= "";
    get_id("btn_desencrypt").innerHTML= "<i style='color:white; font-size: 1.3em;' class='fa-solid fa-lock-open'></i>";
    get_id("btn_desencrypt").style.backgroundColor= "rgb(223, 148, 105)";
    get_id("btn_desencrypt").style.color= "black";
    get_id("clear_btn").style.display= "";
    
}


function copyClipBoard(){

    var element= get_id("textarea");

    encrypt_value("", element);

    if(copy_hash === ""){
        console.log("Nothing to copy.");
        return;
    }

    get_id("result_copy").style.display= "block";
    get_id("result_copy").innerHTML= "Has been copied: " + copy_hash;
    get_id("result_content").style.display= "none";
    get_id("btn_copy").style.display= "none";
    get_id("btn_desencrypt").style.display= "block";
    get_id("textarea").value= "";
    get_id("textarea").removeAttribute("disabled");
    get_id("btn_desencrypt").removeAttribute("disabled");
    get_id("clear_btn").style.display= "none";

}


function desencrypt(){

    get_id("header_title").innerHTML= "Desencrypted";
    desencrypt_hash("textarea", copy_hash);
    get_id("clear_btn").style.display= "none";

    get_id("textarea").setAttribute("disabled", "true");
    get_id("textarea").style.fontSize= "3em";
    get_id("btn_desencrypt").setAttribute("disabled", "true");
    get_id("btn_desencrypt").style.pointerEvents= "none";
    get_id("btn_desencrypt").innerHTML= "<i class='fa-solid fa-ban'></i>";
    get_id("btn_desencrypt").style.backgroundColor= "rgb(207, 207, 207)";
    get_id("btn_desencrypt").style.color= "rgb(182, 26, 26)";

}






