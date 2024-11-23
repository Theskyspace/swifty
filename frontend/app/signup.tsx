import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  Modal,
} from 'react-native';
import { Button } from '../components/Button';

type FormData = {
  name: string;
  dateOfBirth: string;
  gender: string;
  graduatedFrom: string;
  currentlyWorking: string;
};

type GenderOption = {
  label: string;
  value: string;
};

const isValidDate = (dateString: string): boolean => {
  if (!/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return false;

  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date instanceof Date && 
          !isNaN(date.getTime()) && 
          date <= new Date() &&
          date.getDate() === day &&
          date.getMonth() === month - 1 &&
          date.getFullYear() === year;
};

const SignupScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dateOfBirth: '',
    gender: '',
    graduatedFrom: '',
    currentlyWorking: '',
  });

  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [dateError, setDateError] = useState<string>('');

  const genderOptions: GenderOption[] = [
    { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer_not_to_say' },
  ];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add submission logic here
  };

  const handleDateChange = (text: string) => {
    let formatted = text.replace(/\D/g, '');
    if (formatted.length > 8) formatted = formatted.slice(0, 8);
    
    if (formatted.length >= 2) formatted = formatted.slice(0, 2) + '-' + formatted.slice(2);
    if (formatted.length >= 5) formatted = formatted.slice(0, 5) + '-' + formatted.slice(5);
    
    setFormData(prev => ({ ...prev, dateOfBirth: formatted }));
    
    if (formatted.length === 10) {
      if (!isValidDate(formatted)) {
        setDateError('Please enter a valid date in DD-MM-YYYY format');
      } else {
        setDateError('');
      }
    }
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#808080"
      />
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.contentContainer}>
            <ScrollView 
              contentContainerStyle={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <Text style={styles.title}>Create Account</Text>

              {/* Name Input */}
              {renderInput(
                'Full Name',
                formData.name,
                (text) => setFormData((prev) => ({ ...prev, name: text })),
                'Enter your full name'
              )}

              {/* Date of Birth */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput
                  style={[
                    styles.input,
                    dateError ? styles.inputError : null
                  ]}
                  value={formData.dateOfBirth}
                  onChangeText={handleDateChange}
                  placeholder="DD-MM-YYYY"
                  placeholderTextColor="#808080"
                  keyboardType="numeric"
                  maxLength={10}
                />
                {dateError ? (
                  <Text style={styles.errorText}>{dateError}</Text>
                ) : null}
              </View>

              {/* Gender Selection */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity 
                  style={styles.input} 
                  onPress={() => setShowGenderPicker(true)}
                >
                  <Text style={[
                    styles.inputText,
                    !formData.gender && { color: '#808080' }
                  ]}>
                    {formData.gender ? 
                      genderOptions.find(option => option.value === formData.gender)?.label : 
                      'Select Gender'
                    }
                  </Text>
                </TouchableOpacity>

                <Modal
                  visible={showGenderPicker}
                  transparent
                  animationType="slide"
                  onRequestClose={() => setShowGenderPicker(false)}
                >
                  <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowGenderPicker(false)}
                  >
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Gender</Text>
                        <TouchableOpacity onPress={() => setShowGenderPicker(false)}>
                          <Text style={styles.modalClose}>✕</Text>
                        </TouchableOpacity>
                      </View>
                      {genderOptions.map((option) => (
                        <TouchableOpacity
                          key={option.value}
                          style={[
                            styles.optionItem,
                            formData.gender === option.value && styles.selectedOption
                          ]}
                          onPress={() => {
                            setFormData(prev => ({ ...prev, gender: option.value }));
                            setShowGenderPicker(false);
                          }}
                        >
                          <Text style={[
                            styles.optionText,
                            formData.gender === option.value && styles.selectedOptionText
                          ]}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </TouchableOpacity>
                </Modal>
              </View>

              {/* Education Input */}
              {renderInput(
                'Graduated From',
                formData.graduatedFrom,
                (text) => setFormData((prev) => ({ ...prev, graduatedFrom: text })),
                'Enter your educational institution'
              )}

              {/* Employment Input */}
              {renderInput(
                'Currently Working',
                formData.currentlyWorking,
                (text) => setFormData((prev) => ({ ...prev, currentlyWorking: text })),
                'Enter your current role or company'
              )}
            </ScrollView>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Sign Up"
                onPress={handleSubmit}
                variant="primary"
                size="large"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    fontSize: 16,
    color: '#000000',
  },
  androidPicker: {
    marginTop: -16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 100,
    height: 32,
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  modalClose: {
    fontSize: 20,
    color: '#666666',
    padding: 4,
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedOption: {
    backgroundColor: '#F5F5F5',
  },
  optionText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});

export default SignupScreen;
