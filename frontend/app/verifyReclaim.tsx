import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Button } from '@/components/Button';
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function VerifyReclaimScreen() {
  const params = useLocalSearchParams();
  const handleLinkedInVerify = () => {
    // Handle LinkedIn verification
    console.log('LinkedIn verification');
  };

  const handleXVerify = () => {
    // Handle X verification  
    console.log('X verification');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/reclaimlogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>
              Verify Your Account
            </Text>
            <Text style={styles.subText}>
              Please verify your account to continue.
            </Text>
          </View>

          
            <Button
              title="Verify with LinkedIn"
              onPress={handleLinkedInVerify}
              variant="primary"
              size="large"
              style={styles.linkedinButton}
            />
            
            
            <Button
              title="Verify with X"
              onPress={handleXVerify} 
              variant="primary"
              size="large"
            />
            
        </View>
      </SafeAreaView>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.2,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: '90%',
    lineHeight: 22,
  },
  
  
  linkedinButton: {
    backgroundColor: '#0077B5',
    marginBottom: 2,
  }
});
