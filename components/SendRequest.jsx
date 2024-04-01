import { deleteRequest, sendRequest } from '@/api'
import { UserIdForDevContext } from '@/contexts/UserIdForDevContext'
import { useRoute } from '@react-navigation/native'
import { useContext } from 'react'
import { Pressable, Text } from 'react-native'

export default function SendRequest({
  receiverId,
  setRequestSent,
  requestSent,
  setUserList,
  requestId,
}) {
  const { loggedInUserId } = useContext(UserIdForDevContext)
  const route = useRoute()

  const handleSendRequest = () => {
    sendRequest(loggedInUserId, receiverId).then((requestFromApi) => {
      setUserList((currList) => {
        const updatedList = currList.map((user) => {
          if (user.user_id === receiverId) {
            return { ...user, ...requestFromApi }
          } else {
            return user
          }
        })
        return updatedList
      })
    })
    setRequestSent(true)
  }

  const handleDeleteRequest = () => {
    deleteRequest(requestId).catch((err) =>
      console.error('Error deleting request: ', err)
    )
    setRequestSent(false)
    if (route.name === 'friends') {
      setUserList((currList) => {
        const updatedList = currList.filter(
          (user) => user.user_id !== receiverId
        )
        return updatedList
      })
    }
  }

  return (
    <>
      {!requestSent && (
        <Pressable
          className="border m-1 p-1 flex items-center rounded-xl bg-green-200"
          onPress={handleSendRequest}
        >
          <Text>Send request</Text>
        </Pressable>
      )}

      {requestSent && (
        <Pressable
          className="border m-1 p-1 flex items-center rounded-xl  bg-red-300"
          onPress={handleDeleteRequest}
        >
          <Text>Unsend request</Text>
        </Pressable>
      )}
    </>
  )
}
