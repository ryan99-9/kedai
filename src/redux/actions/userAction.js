import Axios from 'axios'

const url = 'https://jajan-database.herokuapp.com'

export const login = (username, password) => {
    return (dispatch) => {
        Axios.get(`${url}/users?username=${username}&password=${password}`)
            .then(res => {
                if (res.data.length === 0) {
                    // jika tidak ada muncul error
                    return dispatch({
                        type: 'ERROR_LOGIN'
                    })
                } else {
                    //simpan data id user ke local storage
                    localStorage.setItem('idUser', res.data[0].id)
                    // jika login berhasil maka data user akan dikirim ke userReducer
                    return dispatch({
                        type: 'LOGIN',
                        payload: res.data[0]
                    })
                }
            })
    }
}

export const errLoginFalse = () => {
    return (dispatch) => {
        return dispatch({
            type: 'ERR_LOGIN_FALSE'
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        //menghapus data idUser di local storage
        localStorage.removeItem('idUser')

        return dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const keepLogin = (id) => {
    return (dispatch) => {
        Axios.get(`${url}/users/${id}`)
            .then(res => {
                return dispatch({
                    type: 'LOGIN',
                    payload: res.data
                })
            })
    }
}

export const register = (username, email, data) => {
    return (dispatch) => {
        // cek kesamaan username di database
        Axios.get(`${url}/users?username=${username}`)
            .then(res => {
                if (res.data.length !== 0) {
                    return dispatch({
                        type: 'USERNAME_EMAIL_EXIST'
                    })
                }
                //cek kesamaan email di database
                Axios.get(`${url}/users?email=${email}`)
                    .then(res => {
                        if (res.data.length !== 0) {
                            return dispatch({
                                type: 'USERNAME_EMAIL_EXIST'
                            })
                        }
                        //post data user baru
                        Axios.post(`${url}/users`, data)
                            .then(res => {
                                return dispatch({
                                    type: 'SUCCESS_REGISTER'
                                })
                            })
                    })
            })
    }
}

export const resetRegErr = () => {
    return (dispatch) => {
        return dispatch({
            type: 'RESET_REG_ERR'
        })
    }
}