class Question{

    constructor() {
        this.server = new Server();
        this.url = {
            CREATE: "api/user/question",
        };
    }

    sendQuestion(params, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.CREATE, params, cb);
    }

}

const questionController = new Question();