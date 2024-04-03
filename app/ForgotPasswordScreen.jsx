import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      showAlert('Error', 'Please provide an email address.');
      return;
    }
  };

  const handleCancel = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          color="#841584"
        />
      </View>
      <View style={styles.buttonSpacer}>
        <Pressable onPress={handleCancel}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const isDarkTheme = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: isDarkTheme ? 'black' : 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: isDarkTheme ? 'white' : 'black',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: isDarkTheme ? 'white' : 'gray',
    borderRadius: 5,
    color: isDarkTheme ? 'white' : 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  buttonSpacer: {
    marginVertical: 2,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});