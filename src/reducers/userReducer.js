const initialState = {
    user: {}
}

export default function userReducer(state= initialState, action){
    switch(action.type){
        case 'SET_USER':{
            return {...state, user: {...action.payload}}
        }
        case 'CLEAR_USER':{
            return {...state, user: {}}
        }
        default:{
            return state
        }
    }
}   