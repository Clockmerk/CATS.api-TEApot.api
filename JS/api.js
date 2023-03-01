class apiInterface {
    constructor(basename) {
        this.url = `https://cats.petiteweb.dev/api/single/${basename}`
    }
    async getAll() {
        const responce = await fetch(`${this.url}/show`);
        const data = await responce.json();
        return data;
    }
    async getIdSubject(id) {
        const responce = await fetch(`${this.url}/show/${id}`)
        const data = await responce.json()
        return data;
    }
    async addSubject(body) {
        const responce = await fetch(`${this.url}/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await responce.json()
        return data;
    }
    async updateSubject(id) {
        const responce = await fetch(`${this.url}/update/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const data = await responce.json()
        return data;
    }
    async deleteSubject(id) {
        const responce = await fetch(`${this.url}/delete/${id}`, {
            method: "DELETE",
        })
        const data = await responce.json()
        return data;
    }
}