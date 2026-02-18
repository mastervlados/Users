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

    async getUserData(currentPageIndex, currentPageLimit, sortConfig) {
        let input = `${this.base}users`
        input += `?limit=${currentPageLimit}`
        input += `&skip=${currentPageIndex * currentPageLimit}`
        input += `&select=id,firstName,lastName,maidenName,age,gender,phone,email,address`
        if (sortConfig.key !== null && sortConfig.direction !== null) {
            input += `&sortBy=${sortConfig.key}&order=${sortConfig.direction}`
        }
        
        const response = await fetch(input, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })

        const result = (await response.json())

        return result
    }
}

