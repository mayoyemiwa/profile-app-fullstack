import ACTIONS from '../actions/index';


const initialState = {
    token : ""
}

const tokenReducer = (state = initialState, action ) => {
    if(action.type === ACTIONS.GET_TOKEN){
        return action.payload
    }
    if(action.type === ACTIONS.DELETE_TOKEN){
        return ''
    }
    else{
        return state
    }
}


export default tokenReducer