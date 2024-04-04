import { deleteRequest, sendRequest } from '@/api'
import { useAuth } from '@/contexts/authContext'
import { useRoute } from '@react-navigation/native'
import { Pressable, Text } from 'react-native'
import showAlert from './alerts'


export default function SendRequest({
  receiverId,
  setRequestSent,
  requestSent,
  setUserList,
  requestId,
}) {
  const { user } = useAuth()
  const route = useRoute()

  const handleSendRequest = () => {
    showAlert('Request sent', '')
    sendRequest(user.user_id, receiverId).then((requestFromApi) => {
      setUserList((currList) => {
        let updatedList = []
        if (route.name === 'UserList') {
          updatedList = currList.filter((user) => user.user_id !== receiverId)
        } else {
          updatedList = currList.map((user) => {
            if (user.user_id === receiverId) {
              return { ...user, ...requestFromApi }
            } else {
              return user
            }
          })
        }
        return updatedList
      })
      setRequestSent(true)
    })
  }

  const handleDeleteRequest = () => {
    deleteRequest(requestId)
      .then(() => {
        if (route.name === 'friends') {
          setUserList((currList) => {
            const updatedList = currList.filter(
              (user) => user.user_id !== receiverId
            )
            return updatedList
          })
        }
        setRequestSent(false)
      })
      .catch((err) => console.error('Error deleting request: ', err))
  }

  return (
    <>
      {!requestSent && (
        <Pressable
          className="m-1 mt-7 p-2 flex items-center rounded-xl bg-green-300"
          onPress={handleSendRequest}
        >
          <Text className="text-grey font-medium">Send request</Text>
        </Pressable>
      )}

      {requestSent && (
        <Pressable
          style={{ backgroundColor: '#eb1313' }}
          className=" m-1 p-2 flex items-center rounded-xl"
          onPress={handleDeleteRequest}
        >
          <Text className="text-white font-medium">Unsend request</Text>
        </Pressable>
      )}
    </>
  )
}
