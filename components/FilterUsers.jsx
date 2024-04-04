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
  }

  const handleSearch = () => {
    onUpdateFilters(selectedFilters)
    onClose()
  }

  const handleResetFilters = () => {
    setSelectedFilters({
      age: '',
      type: '',
      distance: '',
      difficulty: '',
    })
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

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleResetFilters}
        >
          <Text style={[styles.buttonText, styles.resetButtonText]}>
            Reset Filters
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
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  activeButton: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  closeButton: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
  searchButton: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D23FF',
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: 'white',
  },
  resetButton: {
    width: 140,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eb1313',
    borderRadius: 5,
    marginLeft: 10,
  },
  resetButtonText: {
    color: 'white',
  },
})

export default FilterUsers
