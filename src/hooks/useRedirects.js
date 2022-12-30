import axios from "axios"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

/*
    Hook to handle redirecting users to the home page from
    pages/urls they shouldn't be able to view 
*/

export const useRedirect = (userAuthStatus) => {
    const history = useHistory()

    useEffect(() => {
        const handleMount = async () => {

            try {
                await axios.post('dj-rest-auth/token/refresh/')
                if (userAuthStatus === "loggedIn"){
                    history.push('/');
                }
            } catch(err){
                if (userAuthStatus === "loggedOut"){
                    history.push("/")
                }
            }

        }

        handleMount();
    }, [history, userAuthStatus])
}