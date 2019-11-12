class Feedback {

	constructor() {
		this.server = new Server();
		this.url = {
			CREATE: "api/feedback/create",
			UPDATE: "api/feedback/update",
			DELETE: "api/feedback/delete",
			GET_LIST: "api/feedback/getList",
			TOGGLE_PUBLISH: "api/feedback/togglePublish",
			GET_BY_ID: "api/feedback/getById"
		};
	}

	create({ userName, body }, cb) {
		this.server.sendRequest(this.server.requestType.POST, this.url.CREATE, {
			userName,
			body
		}, cb);
	}

	// Тут обязательное поле: "feedbackId", остальные опционально "userName, createdAt, body, isPublish"
	update(params, cb) {
		this.server.sendRequest(this.server.requestType.POST, this.url.UPDATE, params, cb);
	}

	delete({ id }, cb) {
		this.server.sendRequest(this.server.requestType.POST, this.url.DELETE, {
			id
		}, cb);
	}

    getList({page}, cb) {
        this.server.sendRequest(this.server.requestType.GET, `${this.url.GET_LIST}?page=${page}`, null, cb);
    }

	togglePublish({ id }, cb) {
		this.server.sendRequest(this.server.requestType.POST, this.url.TOGGLE_PUBLISH, { id }, cb);
	}

	getById({ id }, cb) {
		this.server.sendRequest(this.server.requestType.GET, `${this.url.GET_BY_ID}/${id}`, {
			id
		}, cb);
	}

}

const feedbackController = new Feedback();
