class Subscriber {

    constructor() {
        this.server = new Server();
        this.url = {
            ACTIVATE: "api/subscriber/activate",
            DELETE: "api/subscriber/delete",
            GET_LIST: "api/subscriber/getList",
        };
    }

    activate({ id }, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.ACTIVATE, {
            id
        }, cb);
    }

    delete({ id }, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.DELETE, {
            id
        }, cb);
    }

    getList({page}, cb) {
        this.server.sendRequest(this.server.requestType.GET, `${this.url.GET_LIST}?page=${page}`, null, cb);
    }

}

const subscriberController = new Subscriber();
