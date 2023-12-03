const BASE_URL = "http://localhost:3001"

export const request = async (url, method, headers = {}, body = {}, isNotStringified = false) => {
    let res
    let data
    switch (method) {
        case 'GET':
            res = await fetch(BASE_URL + url, { headers })
            data = await res.json()
            return data

        case 'POST':
            if (isNotStringified) {
                res = await fetch(BASE_URL + url, { headers, method, body })
                data = await res.json()
            } else {
                res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify({ ...body }) })
                data = await res.json()
            }
            return data

        case 'PUT':
            res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify(body) })
            // console.log("🚀 ~ file: Request.js:24 ~ request ~ res:", res)
            data = await res.json()
            // console.log("🚀 ~ file: Request.js:26 ~ request ~ data:", data)
            return data

        case 'DELETE':
            res = await fetch(BASE_URL + url, { headers, method })
            data = await res.json()
            // console.log("🚀 ~ file: Request.js:30 ~ request ~ data:", data)
            return data
        default:
            return
    }
}