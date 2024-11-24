import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { Button } from '@/components/Button';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';

export default function HomeScreen() {
  const params = useLocalSearchParams();
  
  const handleLogout = () => {
    router.replace('/');
  };

  const renderField = (label: string, value: string | undefined) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || 'Not provided'}</Text>
    </View>
  );

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <SafeAreaView style={styles.safeArea}>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.card}>
          {renderField('Name', params.name?.toString())}
          {renderField('Date of Birth', params.dateOfBirth?.toString())}
          {renderField('Gender', params.gender?.toString())}
          {renderField('Education', params.graduatedFrom?.toString())}
          {renderField('Work', params.currentlyWorking?.toString())}
          <View style={styles.verificationStatus}>
            <Text style={styles.verificationLabel}>Verification Status:</Text>
            <View style={[
              styles.verificationBadge,
              params.verified ? styles.verifiedBadge : styles.unverifiedBadge
            ]}>
              <Text style={styles.verificationText}>
                {params.verified ? 'Verified' : 'Unverified'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button 
          title="Logout" 
          onPress={handleLogout}
          variant="secondary"
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000000',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  verificationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  verificationLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  verificationBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedBadge: {
    backgroundColor: '#E8F5E9',
  },
  unverifiedBadge: {
    backgroundColor: '#FFEBEE',
  },
  verificationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
}); 