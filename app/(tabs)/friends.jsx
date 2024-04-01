import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getRequestsData } from '@/api'
import RequestsView from '@/components/RequestsView'
import FriendsView from '@/components/FriendsView'
import { UserIdForDevContext } from '@/contexts/UserIdForDevContext'

export default function Friends() {
  const [requestsData, setRequestsData] = useState([])
  const [requestsType, setRequestsType] = useState('all')
  const [showFriends, setShowFriends] = useState(true)
  const [showRequests, setShowRequests] = useState(false)
  const { loggedInUserId } = useContext(UserIdForDevContext)

  useEffect(() => {
    let status = null
    if (showFriends) {
      status = 'accepted'
    }

    getRequestsData(loggedInUserId, requestsType, status)
      .then((requestsDataFromAPI) => {
        setRequestsData(requestsDataFromAPI)
      })
      .catch((err) => {
        console.error('Error fetching reauestsData: ', err)
      })
  }, [requestsType, showFriends])

  return (
    <View className="flex-1 items-center m-5">
      <View className="flex-row gap-20 m-5 items-center">
        <Pressable
          onPress={() => {
            setShowFriends(true)
            setShowRequests(false)
          }}
        >
          <Text
            className={`${
              showFriends ? 'bg-slate-500 p-2 rounded-sm text-white' : null
            }`}
          >
            Friends
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setShowFriends(false)
            setShowRequests(true)
          }}
        >
          <Text
            className={`${
              showRequests ? 'bg-slate-500 p-2 rounded-sm text-white' : null
            }`}
          >
            Requests
          </Text>
        </Pressable>
      </View>
      {showFriends && <FriendsView requestsData={requestsData} />}
      {showRequests && (
        <RequestsView
          requestsData={requestsData}
          requestsType={requestsType}
          setRequestsType={setRequestsType}
          setRequestsData={setRequestsData}
        />
      )}
    </View>
  )
}
