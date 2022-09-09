import ACTIONS from './index';
import axios from 'axios';


export const dispatchLogged = () => {
    return {
        type: ACTIONS.LOGGED
    }
}
export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}
export const fetchUser = async(token) => {
    const result =  await axios.post('/user/api/getuser', {token})
    return result
}
export const dispatchGet_User = (result) => {
        return {
            type: ACTIONS.GET_USER,
            payload:{
                user: result.data
            }
        }
}
export const dispatchDelete_User = () => {
        return {
            type: ACTIONS.DELETE_USER
        }
}
export const dispatchDelete_Token = () => {
        return {
            type: ACTIONS.DELETE_TOKEN
        }
}

export const dispatchEdit = () => {
    return {
        type: ACTIONS.EDIT
    }
}
export const dispatchUnEdit = () => {
    return {
        type: ACTIONS.UNEDIT
    }
}
export const dispatchNotLogin = () => {
    return {
        type: ACTIONS.NOTLOGIN
    }
}
export const dispatchWatch = () => {
    return {
        type: ACTIONS.WATCHED
    }
}
export const dispatchNot_Watch = () => {
    return {
        type: ACTIONS.NOT_WATCHED
    }
}
export const dispatchAccess = () => {
    return {
        type: ACTIONS.ACCESS
    }
}