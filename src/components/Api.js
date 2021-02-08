class Api {
    constructor({
        baseUrl,
        headers
    }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }



    // GET https://around.nomoreparties.co/v1/group-8/cards
    getCardList() {
        return fetch(this._baseUrl + '/cards', {
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            })
    }





    // GET https://around.nomoreparties.co/v1/group-8/users/me
    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            })
    }

    // getAppInfo() 
    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getCardList()])
    }

    // POST https://around.nomoreparties.co/v1/group-8/cards

    addCard({
        title,
        url
    }) {
        return fetch(this._baseUrl + '/cards', {
                headers: this._headers,
                method: "POST",
                body: JSON.stringify({
                    name: title,
                    link: url
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            })
    }

    // DELETE https://around.nomoreparties.co/v1/group-8/cards/cardId

    deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
                method: "DELETE",
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            })
    }

    // PUT https://around.nomoreparties.co/v1/group-8/cards/likes/cardId
    addLike(cardId, liked) {
        return fetch(this._baseUrl + "/cards/likes/" + cardId, {
                method: "PUT",
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            })
    }


    // DELETE https://around.nomoreparties.co/v1/group-8/cards/likes/cardId
    removeLike(cardId, liked) {
        return fetch(this._baseUrl + "/cards/likes/" + cardId, {
                method: "DELETE",
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            })
    }

    // PATCH https://around.nomoreparties.co/v1/group-8/users/me
    setUserInfo(data) {
        return fetch(this._baseUrl + '/users/me', {
                headers: this._headers,
                method: "PATCH",
                body: JSON.stringify({
                    name: data.nameInput,
                    about: data.aboutInput
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            })
    }

    // PATCH https://around.nomoreparties.co/v1/group-8/users/me/avatar
    setUserAvatar(data) {
        return fetch(this._baseUrl + '/users/me/avatar', {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.inputAvatar
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject('Error!' + res.statusText)
                }
            });
    }
}


export default Api;