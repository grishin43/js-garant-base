class Order {

    constructor() {
        this.server = new Server();
        this.url = {
            CREATE: "api/order/create",
            UPDATE: "api/order/update",
            DELETE: "api/order/delete",
            GET_LIST: "api/order/getList",
            GET_MY: "api/order/getMy",
            GET_BY_ID: "api/order/getById",
            UPDATE_STATUS: "api/order/updateStatus"
        };
    }

    create({name, operationType, price, currency, commissionPayer, description, photos}, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.CREATE, {
            name,
            operationType,
            price,
            currency,
            commissionPayer,
            description,
            photos
        }, cb);
    }

    update(params, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.UPDATE, params, cb);
    }

    updateStatus({orderId, status}, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.UPDATE_STATUS, {orderId, status}, cb);
    }

    delete({id}, cb) {
        this.server.sendRequest(this.server.requestType.POST, this.url.DELETE, {
            id
        }, cb);
    }

    getList({page}, cb) {
        this.server.sendRequest(this.server.requestType.GET, `${this.url.GET_LIST}?page=${page}`, null, cb);
    }

    getMy({page}, cb) {
        this.server.sendRequest(this.server.requestType.GET, `${this.url.GET_MY}?page=${page}`, null, cb);
    }

    getById({id}, cb) {
        this.server.sendRequest(this.server.requestType.GET, `${this.url.GET_BY_ID}/${id}`, {
            id
        }, cb);
    }

}

const orderController = new Order();

function getOrderById() {
    orderController.getById({id: "5c6dee0f1e1dd00017b658f7"}, (err, data) => {
        console.log(data);
    });
}