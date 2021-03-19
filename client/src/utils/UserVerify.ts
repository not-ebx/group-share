export function verifyEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email);
}

export function verifyUsername(username : string) {
    const re = /^[A-Za-z0-9]+([_]?[A-Za-z0-9]+)*$/;
    return re.test(username);
}

export function verifyPassword(password: string) {
    return password !== undefined && password.length > 5;
}

// Returns as error string
export function checkEmail(email : string) {
    if(!verifyEmail(email) || email.length < 3){
        return "Invalid E-Mail address";
    }
    return null;
}

export function checkUsername(username : string) {
    if(!verifyUsername(username) || username.length < 4){
        return "Username must be over 3 characters and can only contain letters, numbers and underscores at the middle"
    }
    return null;
}

export function checkPassword(password : string) {
    if(!verifyPassword(password))
        return "Password must be over 5 characters";
}