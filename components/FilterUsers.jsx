import React, { useEffect, useState } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'

function FilterUsers({ visible, onClose, onUpdateFilters }) {
  const [filters, setFilters] = useState({
    age: [],
    type: [],
    distance: [],
    difficulty: [],
  })

  const [selectedFilters, setSelectedFilters] = useState({
    age: '',
    type: '',
    distance: '',
    difficulty: '',
  })

  useEffect(() => {
    axios
      .get('https://spokes-yrzx.onrender.com/api/filters')
      .then((response) => {
        setFilters(response.data.filters)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleSelectFilter = (category, item) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category] === item ? '' : item,
    }))
    console.log(selectedFilters)
  }

  const handleSearch = () => {
    console.log('Searching with filters:', selectedFilters)
    onUpdateFilters(selectedFilters)
    onClose()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        {Object.keys(filters).map((category) => (
          <View key={category}>
            <Text style={styles.heading}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
            <View style={styles.buttonContainer}>
              {filters[category].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.button,
                    selectedFilters[category] === item
                      ? styles.activeButton
                      : null,
                  ]}
                  onPress={() => handleSelectFilter(category, item)}
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={[styles.button, styles.searchButton]}
          onPress={handleSearch}
        >
          <Text style={[styles.buttonText, styles.searchButtonText]}>
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 20,
  },
  heading: {
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  button: {
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#transparent',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1, // Border width for all buttons
  },
  activeButton: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#2D23FF',
    borderRadius: 5,
    marginTop: 10,
  },
  searchButtonText: {
    color: 'white',
    textAlign: 'center',
  },
})

export default FilterUsers
