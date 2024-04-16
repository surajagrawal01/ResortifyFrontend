export function addBooking(searchData) {
    return {
        type: 'ADD_BOOKING',
        payload: searchData
    }
}

export function clearBooking(){
    return {
        type:'CLEAR_BOOKING'
    }
}


export function addRoom(roomInfo) {
    return {
        type: 'ADD_ROOM',
        payload: { ...roomInfo, value: 1 }
    }
}

export function decreaseRoomData(roomId) {
    return {
        type: 'DEC_ROOM',
        payload: roomId
    }
}

export function increaseRoomData(roomId) {
    return {
        type: 'INC_ROOM',
        payload: roomId
    }
}

export function removeRoomData() {
    return {
        type: 'REMOVE_ROOMS'
    }
}

export function removeRoom(id) {
    return {
        type: 'REMOVE_ONE_ROOM',
        payload: id
    }
}

export function addPackages(packages) {
    return {
        type: 'ADD_PACKAGES',
        payload: packages
    }
}

export function handlePackage(id) {
    return {
        type: 'HANDLE_PACKAGE',
        payload:id
    }
}