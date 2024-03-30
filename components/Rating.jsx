import { patchRating } from '@/api'
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

  const onRatingChange = (newRating) => {
    patchRating(currentUserId, { new_rating: newRating })
      .then((userFromAPI) => {
        setNewRating(userFromAPI.rating)
        setNotActive(true)
      })
      .catch((err) => console.error('Error updating rating: ', err))
  }
  return (
    <AirbnbRating
      showRating={false}
      count={5}
      defaultRating={rating}
      size={20}
      isDisabled={notActive}
      onFinishRating={onRatingChange}
    />
  )
}
