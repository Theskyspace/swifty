import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
  } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
  
  
  
  
  const { width } = Dimensions.get('window');
  
  
  export default function WelcomeScreen() {
    const router = useRouter();
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            {/* Logo Container */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logo.png')} // Update path to your logo
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.subText}>
                Join a trusted community of 1B tikinters.
              </Text>
            </View>
    
            {/* Button */}
              <Button
                title="Join Now"
                onPress={()=>{router.push('/signup')}}
                variant="primary"
                size="large"
              />
            
  
            <TouchableOpacity
              style = {styles.buttonTransparent}
              onPress={()=>{}}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButton}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    };
    
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
      },
      logo: {
        width: width * 0.6,
        height: width * 0.2,
        marginBottom: 20,
      },
  
      subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        maxWidth: '90%',
        lineHeight: 22,
      },
      button: {
        backgroundColor: '#000000',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: width * 0.9, 
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
      },
      buttonTransparent:{
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: width * 0.9, 
        alignItems: 'center'
      },
      secondaryButton:{
        color : '#000000',
        fontSize: 18,
        fontWeight: '600',
      }
    });
    
      
  