import { deleteRequest, sendRequest } from '@/api'
import { Pressable, Text } from 'react-native'

export default function SendRequest({
  receiverId,
  setRequestSent,
  requestSent,
}) {
  const handleSendRequest = () => {
    sendRequest(1, receiverId).then((requestFromApi) => {
      const currRequestsStorage = JSON.parse(
        localStorage.getItem('sentRequests')
      )

      const newEntry = {
        receiverId: receiverId,
        requestId: requestFromApi.request_id,
      }
      if (currRequestsStorage) {
        currRequestsStorage.push(newEntry)
        localStorage.setItem(
          'sentRequests',
          JSON.stringify(currRequestsStorage)
        )
      } else {
        localStorage.setItem('sentRequests', JSON.stringify([newEntry]))
      }
    })
    setRequestSent(true)
  }

  const handleDeleteRequest = () => {
    const currRequestsStorage = JSON.parse(localStorage.getItem('sentRequests'))
    for (request of currRequestsStorage) {
      if (request.receiverId === receiverId) {
        deleteRequest(request.requestId)

        const filteredRequest = currRequestsStorage.filter((currReq) => {
          return currReq.receiverId !== receiverId
        })
        localStorage.setItem('sentRequests', JSON.stringify(filteredRequest))
      }
    }
    setRequestSent(false)
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
