class Server {

    constructor() {
        this.host = "http://www.moneysave.pro";
        this.requestType = {
            GET: "GET",
            POST: "POST"
        };
    }

    sendRequest(requestType, url, body, cb) {
        let xhr = new XMLHttpRequest();
        const payload = body || {};
        const userId = localStorage.getItem("sessionId");

        xhr.open(requestType, `${this.host}/${url}`, true);
        xhr.setRequestHeader("x-user-key", userId);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status === 200) {
                const xSession = xhr.getResponseHeader('X-Session-Id');
                cb(null, JSON.parse(xhr.responseText), xSession);
            } else {
                cb(JSON.parse(xhr.responseText));
            }
        }
    }

}