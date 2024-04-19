const initialState = {
    booking: {},
    Rooms: [],
    packages: []
}

export default function bookingReducers(state = initialState, action) {
    switch (action.type) {
        case 'ADD_BOOKING': {
            return { ...state, booking: action.payload }
        }
        case 'CLEAR_BOOKING': {
            return { ...state, booking: {} }
        }
        case 'ADD_ROOM': {
            return { ...state, Rooms: [...state.Rooms, { ...action.payload }] }
        }
        case 'DEC_ROOM': {
            return {
                ...state, Rooms: state.Rooms.map((ele) => {
                    if (ele._id === action.payload) {
                        return { ...ele, value: ele.value - 1 }
                    } else {
                        return ele
                    }
                })
            }
        }
        case 'INC_ROOM': {
            return {
                ...state, Rooms: state.Rooms.map((ele) => {
                    if (ele._id === action.payload) {
                        return { ...ele, value: ele.value + 1 }
                    } else {
                        return ele
                    }
                })
            }
        }
        case 'REMOVE_ROOMS': {
            return { ...state, Rooms: [] }
        }
        case 'REMOVE_ONE_ROOM': {
            return { ...state, Rooms: state.Rooms.filter((ele) => ele._id !== action.payload) }
        }
        case 'UPDATE_BOOKING': {
            return { ...state, booking: { ...action.payload } }
        }
        case 'ADD_PACKAGES': {
            return { ...state, packages: [...action.payload] }
        }
        case 'HANDLE_PACKAGE': {
            return {
                ...state, packages: state.packages.map((ele) => {
                    if (ele._id === action.payload) {
                        ele.isChecked = !ele.isChecked
                        return ele
                    } else {
                        return ele
                    }
                })
            }
        }
        default: {
            return state
        }
    }
}   
