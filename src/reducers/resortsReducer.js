const initialState = {
    data:[],
    totalRecords:0,
    pageNo:1,
    totalPages:1
}

export default function ResortReducer(state = initialState, action){
    switch (action.type){
        case 'SET_RESORT_DATA':{
            return {...state, data:[...action.payload.data], totalRecords: action.payload.total, pageNo:action.payload.page, totalPages:action.payload.totalPages}
        }
        case 'CLEAR_RESORT_DATA':{
            return {...state, data : [], totalRecords:0, pageNo:1, totalPages:1}
        }
        default:{
            return state
        }
    }
}