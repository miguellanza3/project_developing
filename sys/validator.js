class Validator {
    isValidEmail(email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isValidDate(dateString){
        var regEx = /^\d{4}-\d{2}-\d{2}$/;

        if(!dateString.match(regEx))
            return false; 
        var d = new Date(dateString);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) 
            return false; 
        return d.toISOString().slice(0,10) === dateString;
    }

    isTexto(string){
        const re = /^[ñA-zÀ-ú]+$/;
        return re.test(String(string).toLowerCase());
    }

    isNumber(input){
        return Number.isInteger(input);
    }
    isPassword(){
        return true;
    }
}

module.exports = new Validator();