import { AirbnbRating } from "react-native-ratings";

export default function Rating ({isDisabled, rating}) {
    return (
        <AirbnbRating
        showRating={false}
        count={5}
        defaultRating={rating}
        size={20}
        isDisabled={isDisabled}
      /> 
    )
}