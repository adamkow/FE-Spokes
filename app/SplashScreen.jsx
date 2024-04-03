import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showSplashScreen ? (
        <View style={styles.splashScreen}>
          <Image source={require('../assets/images/splashscreen.png')} />
        </View>
      ) : (
        <View style={styles.mainContent}>
          <Text>Main App Content</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;