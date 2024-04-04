import React, { useEffect, useState } from 'react'
import { View, Button, Pressable, Text } from 'react-native'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'

const LocationFilter = ({ onSearch }) => {
  const [regions, setRegions] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('')
  const [towns, setTowns] = useState([])
  const [selectedTown, setSelectedTown] = useState('')
  const [showDropdowns, setShowDropdowns] = useState(false)

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

  const handleSearch = () => {
    const lowerCaseTown = selectedTown.toLowerCase()
    onSearch(lowerCaseTown)
  }

  const toggleDropdowns = () => {
    setShowDropdowns(!showDropdowns)
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggleDropdowns}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: '#2D23FF',
          width: 200,
          marginTop: 20,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text className="text-white">
          {showDropdowns ? 'Hide Location' : 'Show Location'}
        </Text>
      </Pressable>
      {showDropdowns && (
        <>
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
          </View>
          <Button title="Search" onPress={handleSearch} color="#2D23FF" />
        </>
      )}
    </View>
  )
}

const styles = {
  container: {
    alignItems: 'center',
  },
  dropdownContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    borderRadius: 5,
  },
}

export default LocationFilter
