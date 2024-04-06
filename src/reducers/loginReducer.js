const initialState = {
    isLoggedIn: false
}

export default function loginReducer(state= initialState, action){
    switch(action.type){
        case 'setLoginTrue':{
            return {...state, isLoggedIn:true}
        }
        case 'setLoginFalse':{
            return {...state, isLoggedIn: false}
        }
        default:{
            return state
        }
    }
}   