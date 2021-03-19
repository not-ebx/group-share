export function verifyEmail(email: string) : boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email);
}

export function verifyUsername(username : string) : boolean {
    const re = /^[A-Za-z0-9]+([_]?[A-Za-z0-9]+)*$/;
    return re.test(username);
}