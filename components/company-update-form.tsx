import { useUpdateCompanyMutation } from '@/api/user-api/company.api';
import colors from '@/constants/colors';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActivityIndicator,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Toast } from 'toastify-react-native';
import OpeningHoursManager from './openning-hour';
import { RNPicker } from './ui/picker';

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Education',
  'Manufacturing',
  'Real Estate',
  'Hospitality',
  'Other',
];

export interface CompanyFormData {
  name: string;
  industry: string | null;
  description: string;
  open: string | null;
  close: string | null;
  is_24_hours_open: boolean;
  address: string | null;
  city: string | null;
  country: string | null;
  training_files: string | null;
  website: string | null;
}

interface CompanyUpdateFormProps {
  defaultValues?: Partial<CompanyFormData>;
  onSuccess?: () => void;
}

export default function CompanyUpdateForm({ defaultValues, onSuccess }: CompanyUpdateFormProps) {
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CompanyFormData>({
    defaultValues: {
      name: defaultValues?.name || '',
      industry: defaultValues?.industry || null,
      description: defaultValues?.description || '',
      open: defaultValues?.open || null,
      close: defaultValues?.close || null,
      is_24_hours_open: defaultValues?.is_24_hours_open || false,
      address: defaultValues?.address || null,
      city: defaultValues?.city || null,
      country: defaultValues?.country || null,
      training_files: defaultValues?.training_files || null,
      website: defaultValues?.website || null,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || '',
        industry: defaultValues.industry || null,
        description: defaultValues.description || '',
        open: defaultValues.open || null,
        close: defaultValues.close || null,
        is_24_hours_open: defaultValues.is_24_hours_open || false,
        address: defaultValues.address || null,
        city: defaultValues.city || null,
        country: defaultValues.country || null,
        training_files: defaultValues.training_files || null,
        website: defaultValues.website || null,
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      await updateCompany(data).unwrap();
      Toast.success('Company information updated successfully');
      onSuccess?.();
    } catch (error) {
      // console.log('Error updating company:', error);
      Toast.error('Failed to update company information');
    }
  };

  return (
    <View style={styles.container}>
      {/* Company Name */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Company name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Company name here"
              placeholderTextColor={colors.dark.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
      </View>

      {/* Industry/Sector */}
      <View style={styles.section}>
        <Controller
          control={control}
          name="industry"
          render={({ field: { onChange, value } }) => (
            <RNPicker
              items={INDUSTRIES.map(ind => ({ value: ind, label: ind }))}
              label="Industry/Sector"
              value={value || ''}
              onSelectItem={(item) => onChange(item)}
              key={value}
            />
          )}
        />
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea, errors.description && styles.inputError]}
              placeholder="What does your company do?"
              placeholderTextColor={colors.dark.textSecondary}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
      </View>

      {/* Opening Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opening Hours</Text>

        <Controller
          control={control}
          name="is_24_hours_open"
          render={({ field: { onChange, value } }) => (
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Open 24 Hours</Text>
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: '#374151', true: colors.dark.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          )}
        />

        {!watch('is_24_hours_open') && (
           <OpeningHoursManager
              onSuccess={() => Toast.success("Opening hours added")}
           />
        )}
      </View>

      {/* Location */}
      <View style={styles.section}>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Address</Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Street address"
                placeholderTextColor={colors.dark.textSecondary}
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>City</Text>
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor={colors.dark.textSecondary}
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>

        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Country</Text>
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Country"
                placeholderTextColor={colors.dark.textSecondary}
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
      </View>

      {/* Website */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Website</Text>
        <Controller
          control={control}
          name="website"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="https://example.com"
              placeholderTextColor={colors.dark.textSecondary}
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="url"
              autoCapitalize="none"
            />
          )}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Update Company</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark.text,
    marginBottom: 12,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: colors.dark.text,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  inputError: {
    borderColor: colors.dark.danger,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  errorText: {
    color: colors.dark.danger,
    fontSize: 13,
    marginTop: 4,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  dropdownText: {
    fontSize: 15,
    color: colors.dark.text,
  },
  placeholderText: {
    color: colors.dark.textSecondary,
  },
  pickerContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#1F2937',
    maxHeight: 200,
  },
  pickerItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  pickerItemText: {
    fontSize: 15,
    color: colors.dark.textSecondary,
  },
  pickerItemTextSelected: {
    color: colors.dark.primary,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
  },
  toggleLabel: {
    fontSize: 15,
    color: colors.dark.text,
    fontWeight: '500',
  },
  toText: {
    fontSize: 15,
    color: colors.dark.textSecondary,
  },
  submitButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
