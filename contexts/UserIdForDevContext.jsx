import { createContext, useState } from 'react'

export const UserIdForDevContext = createContext()

export const UserIdForDevProvider = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState(2)

  return (
    <UserIdForDevContext.Provider value={{ loggedInUserId }}>
      {children}
    </UserIdForDevContext.Provider>
  )
}
