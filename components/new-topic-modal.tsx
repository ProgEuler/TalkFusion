import { useCreateTopicMutation, useUpdateTopicMutation } from '@/api/user-api/topoics.api';
import { TopicItem } from '@/app/(user_dashboard)/business-topics';
import colors from '@/constants/colors';
import { Sparkles } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { Button } from './ui/Button';

interface NewTopicModalProps {
  visible: boolean;
  onClose: () => void;
  editTopic?: TopicItem | null;
}

const NewTopicModal = ({ visible, onClose, editTopic }: NewTopicModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createTopic, { isLoading: isCreating }] = useCreateTopicMutation();
  const [updateTopic, { isLoading: isUpdating }] = useUpdateTopicMutation();

  const isEditMode = !!editTopic;
  const isLoading = isCreating || isUpdating;

  // Pre-fill form when editing
  useEffect(() => {
    if (editTopic) {
      setTitle(editTopic.name);
      setContent(editTopic.details);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editTopic, visible]);

  const handleAddTopic = async () => {
    if (!title.trim()) {
      Toast.error('Please enter a topic title');
      return;
    }
    if (!content.trim()) {
      Toast.error('Please enter knowledge content');
      return;
    }

    const payload = {
      name: title,
      details: content,
      ...(isEditMode && { id: editTopic.id }),
    };

    try {
      if (isEditMode) {
        await updateTopic(payload).unwrap();
        Toast.success('Topic updated successfully');
      } else {
        await createTopic(payload).unwrap();
        Toast.success('Topic added successfully');
      }
      setTitle('');
      setContent('');
      onClose();
    } catch (error) {
      console.log(`Error ${isEditMode ? 'updating' : 'creating'} topic:`, error);
      Toast.error(`Failed to ${isEditMode ? 'update' : 'add'} topic`);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modalContent}>
            {/* Handle Bar */}
            <View style={styles.handleBar} />

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{isEditMode ? 'Edit Topic' : 'New Topic'}</Text>
              <View style={{ width: 60 }} />
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Topic Title Input */}
              <View style={styles.inputSection}>
                <Text style={styles.label}>Topic Title</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Refund Guidelines"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
              </View>

              {/* Knowledge Content Input */}
              <View style={styles.inputSection}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Knowledge Content</Text>
                </View>
                <TextInput
                  style={styles.textArea}
                  placeholder="Paste text, guidelines, or write detailed instructions for the AI assistant here..."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  value={content}
                  onChangeText={setContent}
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                />
              </View>

              {/* Add Topic Button */}
              <View style={styles.buttonContainer}>
                <Button
                  onPress={handleAddTopic}
                  isLoading={isLoading}
                  style={styles.addButton}
                >
                  {isLoading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Topic' : 'Add Topic')}
                </Button>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   //  justifyContent: 'flex-end',
  },
  keyboardView: {
    width: '100%',
  },
  modalContent: {
    backgroundColor: colors.dark.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
   //  paddingBottom: 20,
    minHeight: '65%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cancelText: {
    fontSize: 16,
    color: colors.dark.primary,
    fontWeight: '400',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inputSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 14,
  },
  textArea: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    fontSize: 15,
    padding: 16,
    minHeight: 180,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
  },
  aiButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.dark.primary,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  addButton: {
    width: '100%',
  },
});

export default NewTopicModal;
