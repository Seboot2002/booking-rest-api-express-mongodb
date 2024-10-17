class RequestModel {

    constructor({ text, viewed = false, emisor, receptor, created_at }) {

        this.text = text;
        this.viewed = viewed;
        this.emisor = emisor;
        this.receptor = receptor;
        this.created_at = created_at;
    }
}

module.exports = RequestModel;