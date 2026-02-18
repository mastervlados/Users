export default class AppService {
    base = 'https://dummyjson.com/'

    async loadUserData() {
        const response = await fetch(`${this.base}users?select=id,firstName,lastName,maidenName,age,gender,phone,email,address`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })

        const result = (await response.json())

        return result
    }

    async getUserData(currentPageIndex, currentPageLimit) {
        const response = await fetch(`${this.base}users?limit=${currentPageLimit}&skip=${currentPageIndex * currentPageLimit}&select=id,firstName,lastName,maidenName,age,gender,phone,email,address`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })

        const result = (await response.json())

        return result
    }
}

