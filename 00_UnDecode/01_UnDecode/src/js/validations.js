

// Validation REGEX
const expValidate = (text) => {

    // console.log(text);

    //return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");

    // Solo aceptamos lo básico
    // const regex= new RegExp(/^[A-Za-z0-9\s]+$/g); // No caracteres epeciales, tal como la acentuación, etc.

    const regex = new RegExp(/^[a-z\s]+$/g);

    // console.log(regex.test(text))

    var validation = regex.test(text); // true= con caracteres especiales / false= sin caracteres especiales

    // console.log(validation);

    if (validation) {
        return true;

    } else {
        return false;
    }
}
