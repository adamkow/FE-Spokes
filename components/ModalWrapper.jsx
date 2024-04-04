import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function ModalWrapper({
  modalVisible,
  setModalVisible,
  children,
}) {
  const hideModal = () => {
    setModalVisible(!modalVisible)
  }
  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View className="bg-gray-200" style={styles.modalView}>
          {children}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={hideModal}
          >

            <Text style={styles.textStyle}>Hide</Text>


          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'start',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: '#0553',
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    width: 400,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#101be8',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    padding: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
