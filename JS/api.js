class apiInterface {
    constructor(basename) {
        this.url = `https://cats.petiteweb.dev/api/single/${basename}`
    }
    async getAll() {
        const responce = await fetch(`${this.url}/show`);
        const data = await responce.json();
        return data;
    }
    async getIdTea(id) {
        const responce = await fetch(`${this.url}/show/${id}`)
        const data = await responce.json()
        return data;
    }
    addTea(data) {
        return fetch(`${this.url}/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    deleteTea(id) {
        return fetch(`${this.url}/delete/${id}`, {
            method: "DELETE",
        })
    }
}
const DBname = "Clockwerk"
const teaApi = new apiInterface(DBname)
