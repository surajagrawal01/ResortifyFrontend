import axiosInstance from "../axiosInstance"
export const startSetUser = ()=>{
    return (async(dispatch)=>{
        try{
            const response = await axiosInstance.get('http://localhost:3060/api/users/account')
            dispatch(setUSer(response.data))
        }catch(err){
            console.log(err)
        }
    })
}

const setUSer = (data)=>{
    return {
        type:'SET_USER',
        payload:data
    }
}

export const clearUserData = ()=>{
    return{
        type:'CLEAR_USER'
    }
}