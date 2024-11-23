import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Dimensions } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const { width } = Dimensions.get('window');
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        size === 'large' && styles.largeButton,
        size === 'small' && styles.smallButton,
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' ? styles.primaryText : styles.secondaryText,
          size === 'large' && styles.largeText,
          size === 'small' && styles.smallText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 15,
    borderRadius: 25,
    width: width * 0.9, 
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.primary,
  },
  largeButton: {
    padding: theme.spacing.l,
  },
  smallButton: {
    padding: theme.spacing.s,
  },
  largeText: {
    fontSize: 18,
  },
  smallText: {
    fontSize: 14,
  },
}); 