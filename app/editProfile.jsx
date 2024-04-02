import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  Text,
} from 'react-native'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import { useAuth } from '@/contexts/authContext'

const { width } = Dimensions.get('window')
const MAX_BUTTON_CONTAINER_WIDTH = 300

export default function EditProfile() {
  const { user, setUser } = useAuth()
  const [userData, setUserData] = useState(null)
  const [filters, setFilters] = useState({
    age: [],
    type: [],
    distance: [],
    difficulty: [],
  })
  const [activeAgeIndex, setActiveAgeIndex] = useState(null)
  const [activeTypeIndex, setActiveTypeIndex] = useState(null)
  const [activeDistanceIndex, setActiveDistanceIndex] = useState(null)
  const [activeDifficultyIndex, setActiveDifficultyIndex] = useState(null)
  const [imageUrl, setImageUrl] = useState(user.avatar_url)
  const [showImageUrlInput, setShowImageUrlInput] = useState(false)
  const [regions, setRegions] = useState([])
  const [towns, setTowns] = useState([])
  const [selectedRegion, setSelectedRegion] = useState(user.region)
  const [selectedTown, setSelectedTown] = useState(user.city)

  useEffect(() => {
        setUserData(user)
  }, [])

  useEffect(() => {
    axios
      .get('https://spokes-yrzx.onrender.com/api/filters')
      .then((response) => {
        setFilters(response.data.filters)
        if (userData) {
          setActiveAgeIndex(
            response.data.filters.age.findIndex((age) => age === userData.age)
          )
          setActiveTypeIndex(
            response.data.filters.type.findIndex(
              (type) => type === userData.type_of_biking
            )
          )
          setActiveDistanceIndex(
            response.data.filters.distance.findIndex(
              (distance) => distance === userData.distance
            )
          )
          setActiveDifficultyIndex(
            response.data.filters.difficulty.findIndex(
              (difficulty) => difficulty === userData.difficulty
            )
          )
        }
      })
      .catch((error) => {
        console.error('Error fetching filters:', error)
      })
  }, [userData])

  useEffect(() => {
    axios
      .get('https://towns.online-tech.co.uk/api/v1/regions')
      .then((response) => {
        const regionNames = response.data.data.map((region) => region.name)
        setRegions(regionNames)
        if (!selectedRegion && regionNames.length > 0) {
          setSelectedRegion(regionNames[0])
        }
      })
      .catch((error) => {
        console.error('Error fetching regions:', error)
      })
  }, [selectedRegion])

  useEffect(() => {
    if (selectedRegion) {
      axios
        .get(
          `https://towns.online-tech.co.uk/api/v1/types/populatedPlace/City/region/${selectedRegion}`
        )
        .then((response) => {
          const townNames = response.data.data.map((town) => town.name_1)
          setTowns(townNames)
          if (!selectedTown && townNames.length > 0) {
            setSelectedTown(townNames[0])
          }
        })
        .catch((error) => {
          console.error(
            `Error fetching towns for region ${selectedRegion}:`,
            error
          )
        })
    }
  }, [selectedRegion, selectedTown])

  const handleSaveChanges = () => {
    const updatedUserData = {
      user_id: user.user_id,
      username: userData ? userData.username : '',
      email: userData ? userData.email : '',
      bio: userData ? userData.bio : '',
      region: selectedRegion,
      city: selectedTown,
      type_of_biking: filters.type[activeTypeIndex] || '',
      difficulty: filters.difficulty[activeDifficultyIndex] || '',
      distance: filters.distance[activeDistanceIndex] || '',
      age: filters.age[activeAgeIndex] || '',
      avatar_url: imageUrl,
    }

    axios
      .patch(`https://spokes-yrzx.onrender.com/api/users/${user.user_id}`, updatedUserData)
      .then((response) => {
        console.log('User updated successfully:', response.data)
        setUser(updatedUserData)
      })
      .catch((error) => {
        console.error('Error updating user:', error)
      })
  }
  const logCurrentSelections = () => {
    const currentUserData = {
      username: userData ? userData.username : '',
      email: userData ? userData.email : '',
      bio: userData ? userData.bio : '',
      region: selectedRegion,
      city: selectedTown,
      type_of_biking: filters.type[activeTypeIndex] || '',
      difficulty: filters.difficulty[activeDifficultyIndex] || '',
      distance: filters.distance[activeDistanceIndex] || '',
      age: filters.age[activeAgeIndex] || '',
      avatar_url: imageUrl,
    }
    console.log('Current user data selections:', currentUserData)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

        <TextInput
          style={styles.input}
          value={userData ? userData.username : ''}
          onChangeText={(text) => setUserData({ ...userData, username: text })}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={userData ? userData.email : ''}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          placeholder="Email"
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

        <Text style={styles.heading}>Region</Text>
        <Picker
          selectedValue={selectedRegion}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            console.log('Selected Region:', itemValue)
            setSelectedRegion(itemValue)
          }}
        >
          {regions.map((region, index) => (
            <Picker.Item key={index} label={region} value={region} />
          ))}
        </Picker>

        <Text style={styles.heading}>Town/City</Text>
        <Picker
          selectedValue={selectedTown}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => {
            console.log('Selected Town/City:', itemValue)
            setSelectedTown(itemValue)
          }}
        >
          {towns.map((town, index) => (
            <Picker.Item key={index} label={town} value={town} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={logCurrentSelections} style={styles.button}>
        <Text style={styles.buttonText}>console log profile button</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
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
  buttonText: {
    textAlign: 'center',
  },
  imageUploadButton: {
    position: 'relative',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
})
