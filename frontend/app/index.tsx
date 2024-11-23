import { useEffect } from 'react';
import { router } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './WelcomeScreen';

export default function Index() {
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            // const userToken = await AsyncStorage.getItem('userToken');
            const userToken = null; 
            if (userToken) {
                // If token exists, redirect to home screen
                router.replace('/home');
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        }
    };

    // Show welcome screen if no token is found
    return <WelcomeScreen />;
} 