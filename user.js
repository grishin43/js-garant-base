class User {

    constructor() {
        this.server = new Server();
        this.url = {
            GET_ME: "api/user/getMe",
            GET_LIST: "api/user/getList",
            REGISTRATION: "api/user/registration",
            LOGIN: "api/user/login",
            UPDATE: "api/user/update",
            LOGOUT: "api/user/logout",
            RESET_PASSWORD: "api/user/resetPassword",
            DELETE: "api/user/delete",
            GET_BY_ID: "api/user/getById",
            QUESTION: "api/user/question"
        };
    }

    registration({name, email, password, phoneNumber}, cb) {

        this.server.sendRequest(this.server.requestType.POST, this.url.REGISTRATION, {
            name,
            email,
            password,
            phoneNumber
        }, cb);
    }

    getList({page}, cb) {
        this.server.sendRequest(this.server.requestType.GET, `${this.url.GET_LIST}?page=${page}`, null, cb);
    }

    getMe(cb) {
        this.server.sendRequest(this.server.requestType.GET, this.url.GET_ME, null, cb);
    }

    login({email, password}, cb) {
        const customcb = (err, data, xs) => {
            if (!err) {
                localStorage.setItem("sessionId", xs);
                // wsService.init(xs);
            }
            cb(err, data);
        };

        this.server.sendRequest(this.server.requestType.POST, this.url.LOGIN, {
            email,
            password
        }, customcb);
    }

    logout(cb) {
        const customcb = (err, data) => {
            if (!err) {
                localStorage.removeItem("sessionId");
            }
            cb(err, data);
        };
        this.server.sendRequest(this.server.requestType.POST, this.url.LOGOUT, null, customcb);
    }

    resetPassword({email}, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.RESET_PASSWORD, {
            email
        }, cb);
    }

    update(params, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.UPDATE, params, cb);
    }

    delete({id}, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.DELETE, {
            id
        }, cb);
    }

    getById({id}, cb) {
        this.server.sendRequest(this.server.requestType.POST, `${this.url.GET_BY_ID}/${id}`, null, cb);
    }

    question({name, email, question}, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.QUESTION, {
            name,
            email,
            question
        }, cb);
    }

}

const userController = new User();