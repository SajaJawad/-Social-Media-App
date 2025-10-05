import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()

    const checkAuthUser = async () => {
        try {
            setIsLoading(true)
            const currentAccount = await getCurrentUser();

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })
                setIsAuthenticated(true)
                return true
            }
            return false
        } catch (error) {
            console.log(error);
            return false
        } finally {
            setIsLoading(false)
        }
    }


//     useEffect(() => {

//         if (
//             localStorage.getItem('cookieFallback') === null ||
//             localStorage.getItem('cookieFallback') === '[]'
//         )
//     checkAuthUser()
//     navigate('/sign-in')


// }, []);



useEffect(() => {
    const initAuth = async () => {
        const cookieFallback = localStorage.getItem('cookieFallback');

        if (cookieFallback === null || cookieFallback === '[]') {
            const isAuth = await checkAuthUser();

            if (!isAuth) {
                navigate('/sign-in');
            }
        } else {
            const isAuth = await checkAuthUser();

            if (!isAuth) {
                navigate('/sign-in');
            }
        }
    }

    initAuth();
}, []);



//     //تعديل جديد
//     useEffect(() => {
//     const path = window.location.pathname;

//     if (path !== '/sign-up') {
//         if (localStorage.getItem('cookieFallback') === '[]') {
//             navigate('/sign-in');
//         } else {
//             checkAuthUser();
//         }
//     } else {
//         checkAuthUser();
//     }
// }, []);


const value = {
    user, setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser, isLoading,
}


return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

)
}

export default AuthProvider


export const useUserContext = () => useContext(AuthContext)