import { db } from '@/firebaseConfig'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'

export const getRoomId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort()
  const roomId = sortedIds.join('-')
  return roomId
}

export const createRoomIfNotExists = async (chatRoomId, participants) => {
  try {
    await setDoc(doc(db, 'rooms', chatRoomId), {
      chatRoomId,
      participants: participants,
      createdAt: Timestamp.fromDate(new Date()),
    })
  } catch (error) {
    console.error('Error adding chat room to rooms:', error)
  }
}

export const addRoomToChatRooms = async (chatRoomId, loggedUserId) => {
  const roomsByUserRef = doc(db, 'roomsByUser', String(loggedUserId))

  try {
    await setDoc(roomsByUserRef, { [chatRoomId]: true }, { merge: true })
  } catch (error) {
    console.error('Error adding chat room to roomsByUser:', error)
  }
}

export const fetchChatRoomsForUser = async (loggedUserId) => {
  const roomsByUserRef = doc(db, 'roomsByUser', String(loggedUserId))
  const chatRoomData = []

  try {
    const roomsByUserDoc = await getDoc(roomsByUserRef)
    if (roomsByUserDoc.exists()) {
      const roomIds = Object.keys(roomsByUserDoc.data())
      for (const roomId of roomIds) {
        const roomData = await getChatRoomById(roomId)
        chatRoomData.push(roomData)
      }
    }
    chatRoomData.sort((a, b) => a.createdAt < b.createdAt)
    return chatRoomData
  } catch (error) {
    console.error('Error fetching chat rooms for user:', error)
    return []
  }
}

export const getChatRoomById = async (chatRoomId) => {
  const roomDocRef = doc(db, 'rooms', chatRoomId)
  const roomDocSnap = await getDoc(roomDocRef)

  if (roomDocSnap.exists()) {
    const roomData = roomDocSnap.data()
    return roomData
  } else {
    console.log('Chat room document not found for id:', chatRoomId)
  }
}

export const getNotLoggedInUserData = (item, loggedInUserId) => {
  for (let user in item.participants) {
    if (Number(user) !== loggedInUserId) {
      return item.participants[user]
    }
  }
}
export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
