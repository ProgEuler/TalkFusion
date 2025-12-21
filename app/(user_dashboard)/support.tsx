import { useCreateSupportMutation } from '@/api/user-api/support.api';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import colors from '@/constants/colors';
import React, { useState } from 'react';
import {
   StyleSheet,
   Text,
   TextInput,
   View
} from 'react-native';
import { toast } from 'sonner-native';
import { Toast } from 'toastify-react-native';

const SupportPage = () => {
  const [message, setMessage] = useState('');
  const [createSupport, { isLoading, error }] = useCreateSupportMutation();

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.warning("Please enter a message");
      return;
    }

    try {
      const res = await createSupport({
         subject: "Support",
         description: message,
       }).unwrap();
      toast.success("Message sent successfully");
      setMessage('');
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
   <Layout>
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

         <Button onPress={handleSendMessage} variant="primary" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
         </Button>
        </Layout>
  );
};

const styles = StyleSheet.create({
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
});

export default SupportPage;
