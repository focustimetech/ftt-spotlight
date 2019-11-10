import axios from 'axios'

export const setJsonHeaders = () => {
    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
}
