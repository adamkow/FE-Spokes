import { patchRating } from '@/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AirbnbRating } from 'react-native-ratings'

export default function Rating({
  currentUserId,
  ratingCount,
  isDisabled,
  rating,
}) {
  const [notActive, setNotActive] = useState(isDisabled)
  const [newRating, setNewRating] = useState(rating)
  const [displayedRating, setDisplayedRating] = useState(rating)
  

  const onRatingChange = (newRating) => {

    axios.patch(`https://spokes-yrzx.onrender.com/api/users/${currentUserId}/rating`, {new_rating: newRating})
      .then((userFromAPI) => {
        setNewRating(userFromAPI.rating)
        setNotActive(true)
      })
      .catch((err) => console.error('Error updating rating: ', err))
  }

  useEffect(() => {
    setDisplayedRating(newRating)
  }, [newRating]);

  return (
    <AirbnbRating
      showRating={false}
      count={5}
      defaultRating={displayedRating}
      size={20}
      isDisabled={notActive}
      onFinishRating={onRatingChange}
    />
  )
}
