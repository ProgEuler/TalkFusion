import colors from '@/constants/colors';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SupportPage = () => {
  const [message, setMessage] = useState('');

  const handleInvite = () => {
    console.log('Invite button pressed');
    // Add your invite logic here
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message:', message);
      // Add your message sending logic here
      setMessage('');
    }
  };

  return (
      <View style={styles.container}>
        {/* Content */}
        <View style={styles.supportCard}>
          {/* <Text style={styles.subtitle}>Support</Text> */}
          <Text style={styles.description}>Start a chat or create a ticket</Text>

          <View style={styles.messageBox}>
            <TextInput
              style={styles.input}
              placeholder="Describe the issue..."
              placeholderTextColor={colors.dark.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.inviteButton}
            onPress={handleInvite}
          >
            <Text style={styles.inviteButtonText}>Invite</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  supportCard: {
    borderRadius: 12,
    padding: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  messageBox: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 120,
  },
  input: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  inviteButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SupportPage;
