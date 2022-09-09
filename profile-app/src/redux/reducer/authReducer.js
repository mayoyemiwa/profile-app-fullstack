import ACTIONS from '../actions/index';

let initialState = {
    user:[],
    access:false,
    logged :false,
    login:false, 
    edit:false,
    watch:false
}

const authReducer = (state = initialState, action) => {
    if(action.type === ACTIONS.LOGGED){
        return {
            ...state,
            logged:true
        }
   }
    if(action.type === ACTIONS.GET_USER){
        return {
            ...state,
            user:action.payload.user
        }
   }
    if(action.type === ACTIONS.DELETE_USER){
        return {
            ...state,
            user:'',
            access:false,
            logged:false
        }
   }
    if(action.type === ACTIONS.LOGIN){
         return{
             ...state,
             login:true
            }
    }
    if(action.type === ACTIONS.WATCHED){
         return{
             ...state,
             watch:true
            }
    }
    if(action.type === ACTIONS.NOT_WATCHED){
         return{
             ...state,
             watch:false
            }
    }
    if(action.type === ACTIONS.NOTLOGIN){
         return{ 
             ...state,
             login:false
            }
    }
    if(action.type === ACTIONS.EDIT){
         return {
             ...state,
             edit:true
            }
    }
    if(action.type === ACTIONS.UNEDIT){
         return {
             ...state,
             edit:false
            }
    }
    if(action.type === ACTIONS.ACCESS){
         return {
             ...state,
             access:true
            }
    }
    else{
        return state
    }
}

export default authReducer