import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import { useAuth } from '@/contexts/authContext'

const { width } = Dimensions.get('window')
const MAX_BUTTON_CONTAINER_WIDTH = 300

export default function CreateUserScreen() {
  const { user, setIsAuthenticated } = useAuth()
  const [name, setName] = useState('test') //leave empty after
  const [bio, setBio] = useState('test') //leave empty after
  const [imageUrl, setImageUrl] = useState('https://shorturl.at/altP4')
  const [showImageUrlInput, setShowImageUrlInput] = useState(false)
  const [activeAgeIndex, setActiveAgeIndex] = useState(null)
  const [activeTypeIndex, setActiveTypeIndex] = useState(null)
  const [activeDistanceIndex, setActiveDistanceIndex] = useState(null)
  const [activeDifficultyIndex, setActiveDifficultyIndex] = useState(null)
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(0)
  const [filters, setFilters] = useState({
    age: [],
    type: [],
    distance: [],
    difficulty: [],
  })
  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [towns, setTowns] = useState([])
  const [selectedTown, setSelectedTown] = useState('')

  useEffect(() => {
    axios
      .get('https://spokes-yrzx.onrender.com/api/filters')
      .then((response) => {
        setFilters(response.data.filters)
      })
      .catch((error) => {
        console.error('Error fetching filters:', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get('https://towns.online-tech.co.uk/api/v1/regions')
      .then((response) => {
        const regionNames = response.data.data.map((region) => region.name)
        setRegions(regionNames)
        if (regionNames.length > 0) {
          setSelectedRegion(regionNames[0])
        }
      })
      .catch((error) => {
        console.error('Error fetching regions:', error)
      })
  }, [])

  useEffect(() => {
    if (selectedRegion) {
      axios
        .get(
          `https://towns.online-tech.co.uk/api/v1/types/populatedPlace/City/region/${selectedRegion}`
        )
        .then((response) => {
          const townNames = response.data.data.map((town) => town.name_1)
          setTowns(townNames)
          if (townNames.length > 0) {
            setSelectedTown(townNames[0])
          } else {
            setSelectedTown('')
          }
        })
        .catch((error) => {
          console.error(
            `Error fetching towns for region ${selectedRegion}:`,
            error
          )
        })
    }
  }, [selectedRegion])
  useEffect(() => {
    logCurrentSelections()
  }, [
    name,
    email,
    bio,
    selectedRegion,
    selectedTown,
    activeTypeIndex,
    activeDifficultyIndex,
    activeDistanceIndex,
    activeAgeIndex,
    imageUrl,
    rating,
  ])

  const logCurrentSelections = () => {
    const currentUserData = {
      username: name,
      email: email,
      bio: bio,
      region: selectedRegion,
      city: selectedTown,
      type_of_biking: filters.type[activeTypeIndex] || '',
      difficulty: filters.difficulty[activeDifficultyIndex] || '',
      distance: filters.distance[activeDistanceIndex] || '',
      age: filters.age[activeAgeIndex] || '',
      avatar_url: imageUrl,
      rating: rating,
    }
    console.log('Current user data selections:', currentUserData)
  }
  const postUserData = () => {
    axios
      .post('https://spokes-yrzx.onrender.com/api/users/', {
        username: name,
        email: user.email,
        bio: bio,
        region: selectedRegion,
        city: selectedTown,
        type_of_biking: filters.type[activeTypeIndex],
        difficulty: filters.difficulty[activeDifficultyIndex],
        distance: filters.distance[activeDistanceIndex],
        age: filters.age[activeAgeIndex],
        avatar_url: imageUrl,
        rating: rating,
      })
      .then((response) => {
        console.log('User created:', response.data)
        setIsAuthenticated(true)
      })
      .catch((error) => {
        console.error('Error creating user:', error)
      })
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageUploadButton}
          onPress={() => setShowImageUrlInput(!showImageUrlInput)}
        >
          <Image source={{ uri: imageUrl }} style={styles.buttonImage} />
          <Text style={styles.plusSymbol}>+</Text>
        </TouchableOpacity>

        {showImageUrlInput && (
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="Enter image URL"
          />
        )}
        <Text style={styles.heading}>Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <Text style={styles.heading}>Bio</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          placeholder="Enter your bio"
        />
        <Text style={styles.heading}>Age Range</Text>
        <View style={styles.buttonContainer}>
          {filters.age.map((ageRange, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                activeAgeIndex === index ? styles.activeButton : null,
              ]}
              onPress={() => setActiveAgeIndex(index)}
            >
              <Text style={styles.buttonText}>{ageRange}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.heading}>Type of Biking</Text>
        <View style={styles.buttonContainer}>
          {filters.type.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                activeTypeIndex === index ? styles.activeButton : null,
              ]}
              onPress={() => setActiveTypeIndex(index)}
            >
              <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.heading}>Distance</Text>
        <View style={styles.buttonContainer}>
          {filters.distance.map((distance, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                activeDistanceIndex === index ? styles.activeButton : null,
              ]}
              onPress={() => setActiveDistanceIndex(index)}
            >
              <Text style={styles.buttonText}>{distance}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.heading}>Difficulty</Text>
        <View style={styles.buttonContainer}>
          {filters.difficulty.map((difficulty, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                activeDifficultyIndex === index ? styles.activeButton : null,
              ]}
              onPress={() => setActiveDifficultyIndex(index)}
            >
              <Text style={styles.buttonText}>{difficulty}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.heading}>Location</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedRegion}
            style={styles.dropdown}
            onValueChange={(itemValue) => {
              setSelectedRegion(itemValue)
              setTowns([])
              setSelectedTown('')
            }}
          >
            {regions.map((region, index) => (
              <Picker.Item key={index} label={region} value={region} />
            ))}
          </Picker>
        </View>

        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedTown}
            style={styles.dropdown}
            onValueChange={(itemValue) => setSelectedTown(itemValue)}
            enabled={towns.length > 0}
          >
            {towns.map((town, index) => (
              <Picker.Item key={index} label={town} value={town} />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={postUserData}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  imageUploadButton: {
    position: 'relative',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: width < MAX_BUTTON_CONTAINER_WIDTH ? 'column' : 'row',
    flexWrap: width < MAX_BUTTON_CONTAINER_WIDTH ? 'wrap' : 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    maxWidth: MAX_BUTTON_CONTAINER_WIDTH,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeButton: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  buttonImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  plusSymbol: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 20,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  createAccountButton: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
})
