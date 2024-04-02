import { createContext, useState } from 'react'

export const LoggedUserInfoForDevContext = createContext()

export const LoggedUserInfoForDevProvider = ({ children }) => {
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({
    user_id: 1,
    username: 'jonnyDough92',
    avatar_url:
      'https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })

  return (
    <LoggedUserInfoForDevContext.Provider value={{ loggedInUserInfo }}>
      {children}
    </LoggedUserInfoForDevContext.Provider>
  )
}
