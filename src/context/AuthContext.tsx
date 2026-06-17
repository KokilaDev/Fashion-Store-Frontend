import { createContext, useEffect, useState } from "react";
import { getMyDetails } from "../services/auth";

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken")

            if (!token) {
                setLoading(false)
                return
            }

            try {
                const res = await getMyDetails()

                if (res.data) {
                    setUser(res.data)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error(error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext