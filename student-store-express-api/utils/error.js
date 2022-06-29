class ExpressError extends Error{
    constructor(message, status){
        super()
        this.message = message;
        this.status = status;
    }
}

class BadRequestError extends ExpressError{
    constructor(message){
        super(message || "bad request", 400);
    }
}

class NotFoundError extends ExpressError{
    constructor(message){
        super(message || "not found", 404);
    }
}

//export all errors from the file
module.exports = {
    ExpressError,
    BadRequestError,
    NotFoundError
}