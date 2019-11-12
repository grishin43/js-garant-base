class WsService {

    constructor() {
        this.host = "ws://www.moneysave.pro/api/";
        this.recCount = 0;
        this.handlers = {
            [WsService.Events.Success]: [],
            [WsService.Events.Custom]: [],
            [WsService.Events.PaymentGatewayError]: [],
            [WsService.Events.CardExpired]: [],
            [WsService.Events.CardDeclined]: [],
            [WsService.Events.Failed]: []
        };
    }

    init(sessionId) {
        this.recCount++;
        if (sessionId) {
            this.socket = new WebSocket(`${this.host}?sk=${sessionId}`);

            this.socket.onopen = () => {
                console.log(`Connection success...`);
                const prl = $('.payment-preloader');
                const wsError = (data) => {
                    if (prl.length) {
                        prl.fadeOut(function () {
                            swal({
                                title: data.message,
                                icon: "error",
                                button: {className: "d_button d_button-yellow"}
                            });
                        })
                    }
                    else {
                        swal({
                            title: data.message,
                            icon: "error",
                            button: {className: "d_button d_button-yellow"}
                        });
                    }
                };
                const wsSuccess = (data) => {
                    if (prl.length) {
                        prl.fadeOut(function () {
                            swal({
                                title: data.message,
                                icon: "success",
                                button: {className: "d_button d_button-yellow"}
                            }).then(() => {
                                localStorage.removeItem('og');
                                window.location.href = '/personal-area.html';
                            });
                        });
                    }
                    else {
                        swal({
                            title: data.message,
                            icon: "success",
                            button: {className: "d_button d_button-yellow"}
                        }).then(() => {
                            localStorage.removeItem('og');
                            window.location.href = '/personal-area.html';
                        });
                    }
                };
                wsService.subscribe(WsService.Events.Success, wsSuccess);
                wsService.subscribe(WsService.Events.CardDeclined, wsError);
                wsService.subscribe(WsService.Events.CardExpired, wsError);
                wsService.subscribe(WsService.Events.Custom, wsError);
                wsService.subscribe(WsService.Events.Failed, wsError);
                wsService.subscribe(WsService.Events.PaymentGatewayError, wsError);
            };

            this.socket.onclose = (event) => {
                if (event.wasClean) {
                    console.log(`Connection closed...`);
                } else {
                    console.log(`Connection refused...`);
                }
                console.log(`Code: ${event.code}, reason: ${event.reason}`);
                if (this.recCount < 10) {
                    setTimeout(() => {
                        this.init();
                    }, 3000);
                }
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (this.handlers[data.type] && this.handlers[data.type].length) {
                    this.handlers[data.type].forEach(cb => cb(data.payload));
                }
            };

            this.socket.onerror = function (error) {
                console.log("Ошибка " + error.message);
            };
        }
    }

    subscribe(event, cb) {
        if (this.handlers[event]) {
            this.handlers[event].push(cb);
        }
    }

    send(data) {
        this.socket.send(JSON.stringify(data));
    }

}

WsService.Events = {
    Success: "/success",
    Custom: "/custom",
    PaymentGatewayError: "/epayment",
    CardExpired: "/ecardex",
    CardDeclined: "/ecarddec",
    Failed: "/efailed"
};

const sessionId = localStorage.getItem('sessionId');
const wsService = new WsService();
if (sessionId) {
    wsService.init(sessionId);
}