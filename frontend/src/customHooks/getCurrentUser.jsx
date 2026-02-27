import { useEffect } from "react"
import { serverUrl } from "../App"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"
const getCurrentUser = ()=>{
    let dispatch = useDispatch()
   
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                let result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
                dispatch(setUserData(result.data))

            } catch (error) {
                // Only log if it's not a 401 (no token) error
                if(error.response?.status !== 401) {
                    console.log(error)
                }
                dispatch(setUserData(null))
            }
        }
        fetchUser()
    },[])
}

export default getCurrentUser