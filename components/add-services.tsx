import { useAddServiceMutation } from '@/api/user-api/company.api';
import colors from '@/constants/colors';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { Toast } from 'toastify-react-native';
import { Button } from './ui/Button';
import { RNDatePicker } from './ui/date-picker';

interface AddServiceFormData {
  name: string;
  description: string;
  price: string;
  start_time: string | null;
  end_time: string | null;
}

export default function AddServices() {
  const [addService, { isLoading }] = useAddServiceMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddServiceFormData>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      start_time: null,
      end_time: null,
    },
  });

  const onSubmit = async (data: AddServiceFormData) => {
    try {
      await addService(data).unwrap();
      Toast.success('Service added successfully');
      reset();
    } catch (error) {
      console.log('Error adding service:', error);
      Toast.error('Failed to add service');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Service</Text>

      {/* Service Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Service Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Service name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="e.g. Haircut & Styling"
              placeholderTextColor={colors.dark.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea, errors.description && styles.inputError]}
              placeholder="Describe the service..."
              placeholderTextColor={colors.dark.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          )}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
      </View>

      {/* Price */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price</Text>
        <Controller
          control={control}
          name="price"
          rules={{ required: 'Price is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.price && styles.inputError]}
              placeholder="0.00"
              placeholderTextColor={colors.dark.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
            />
          )}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
      </View>

      {/* Time Range */}
      <View style={styles.timeRow}>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="start_time"
            rules={{ required: 'Start time is required' }}
            render={({ field: { onChange, value } }) => (
              <RNDatePicker
                label="Start Time"
                mode="time"
                error={!!errors.start_time}
                value={value ? new Date(`2000-01-01T${value}`) : undefined}
                onChangeDate={(date) => {
                  const timeString = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  onChange(timeString);
                }}
              />
            )}
          />
          {errors.start_time && <Text style={styles.errorText}>{errors.start_time.message}</Text>}
        </View>

        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="end_time"
            rules={{ required: 'End time is required' }}
            render={({ field: { onChange, value } }) => (
              <RNDatePicker
                label="End Time"
                mode="time"
                error={!!errors.end_time}
                value={value ? new Date(`2000-01-01T${value}`) : undefined}
                onChangeDate={(date) => {
                   const timeString = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  onChange(timeString);
                }}
              />
            )}
          />
          {errors.end_time && <Text style={styles.errorText}>{errors.end_time.message}</Text>}
        </View>
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
        variant='outline'
        style={{ marginTop: 8, borderWidth: 2, borderColor: colors.dark.textSecondary, borderStyle: "dashed" }}
      >
        Add Service
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark.text,
    marginBottom: 8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 12,
    color: colors.dark.text,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: colors.dark.danger,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  errorText: {
    color: colors.dark.danger,
    fontSize: 12,
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
