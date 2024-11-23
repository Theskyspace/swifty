import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.headline}>Akash Joshi</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  logo: { width: 100, height: 100, marginBottom: 24 },
  headline: { fontSize: 18, textAlign: 'center', marginBottom: 32 },
  buttonContainer: { width: '100%', paddingHorizontal: 16 },
});

export default LoginScreen;
