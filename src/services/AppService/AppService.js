export default class AppService {
    base = 'https://dummyjson.com/'

    async _fetchWithTimeout(url, options = {}) {
        try {
            const controller = new AbortController()
            const timeoutID = setTimeout(() => controller.abort(), 10000)
    
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            })
    
            clearTimeout(timeoutID)
    
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error('Bad request')
                    case 401:
                        throw new Error('Unauthorized')
                    case 403:
                        throw new Error('Forbidden')
                    case 404:
                        throw new Error('Resource not found')
                    case 500:
                        throw new Error('Server error')
                    default:
                        throw new Error(`Request failed with status ${response.status}`)
                }
            }
    
            const contentType = response.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid response format')
            }
    
            return await response.json()

        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('Request timeout')
                return { error: 'Request timeout' }
            }

            if (error instanceof TypeError) {
                console.error('Netwokr error:', error)
                return { error: 'Network error' }
            }

            console.error('Fetch error:', error)
            return { error: error.message }
        }
    }

    async loadUserData() {
        let input = `${this.base}users`
        input += `?select=id,firstName,lastName,maidenName,age,gender,phone,email,address`

        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }

        return await this._fetchWithTimeout(input, options);
    }

    async getUserData(currentPageIndex, currentPageLimit, sortConfig) {
        let input = `${this.base}users`
        input += `?limit=${currentPageLimit}`
        input += `&skip=${currentPageIndex * currentPageLimit}`
        input += `&select=id,firstName,lastName,maidenName,age,gender,phone,email,address`
        if (sortConfig.key !== null && sortConfig.direction !== null) {
            input += `&sortBy=${sortConfig.key}&order=${sortConfig.direction}`
        }
        
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }

        return await this._fetchWithTimeout(input, options);
    }

    async getSingleUserData(userID) {
        let input = `${this.base}users/${userID}`
        input += `?select=id,firstName,lastName,maidenName,age,address,height,weight,phone,email,image`
        
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }

        return await this._fetchWithTimeout(input, options);
    }
}

