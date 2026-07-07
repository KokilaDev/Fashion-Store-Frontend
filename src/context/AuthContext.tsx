import { createContext, useEffect, useState } from "react";
import { getMyDetails } from "../services/auth";
import type { User } from "../types/types";

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("accessToken")

            if (!token) {
                setUser(null)
                setLoading(false)
                return
            }

            try {
                const res = await getMyDetails()

                if (res.data?.data) {
                    setUser({
                        ...res.data.data,
                        isLoggedIn: true
                    })
                    console.log("User fetched successfully:", res.data.data)
                    console.log("isLoggedIn:", true)
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