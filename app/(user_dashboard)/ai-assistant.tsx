import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronDown, Clock, MapPin, Plus, X, Upload } from 'lucide-react-native';
import colors from '@/constants/colors';
import { Layout } from '@/components/layout/Layout';

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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

export default function AIAssistantScreen() {
  const insets = useSafeAreaInsets();

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('9:00');
  const [endTime, setEndTime] = useState('9:00');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [isOpen, setIsOpen] = useState(true);
  const [address, setAddress] = useState('Netherlands');
  const [city, setCity] = useState('California');
  const [country, setCountry] = useState('Netherlands');

  const [services, setServices] = useState<Array<{id: string; name: string; price: string}>>([{id: '1', name: 'Basic Consultation', price: ''}, {id: '2', name: 'Standard Website', price: ''}]);
  const [formality, setFormality] = useState(5);
  const [websiteUrl, setWebsiteUrl] = useState('');

  const [showIndustryPicker, setShowIndustryPicker] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);

  const handleUpdate = () => {
    console.log('Updating AI Assistant settings:', {
      companyName,
      industry,
      description,
      openingHours: { startTime, endTime, selectedDay, isOpen },
      location: { address, city, country },
      services,
      formality,
      websiteUrl,
    });
  };

  const addService = () => {
    setServices([...services, { id: Date.now().toString(), name: '', price: '' }]);
  };

  const removeService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: 'name' | 'price', value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handlePreviewSample = () => {
    console.log('Preview sample with formality:', formality);
  };

  const handleSaveTone = () => {
    console.log('Saving tone with formality:', formality);
  };

  const handleFileUpload = () => {
    console.log('Upload file clicked');
  };

  return (
   <>
   <Layout>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Company name here"
            placeholderTextColor={colors.dark.textSecondary}
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Industry/Sector</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowIndustryPicker(!showIndustryPicker)}
          >
            <Text style={styles.dropdownText}>{industry}</Text>
            <ChevronDown color={colors.dark.textSecondary} size={20} />
          </TouchableOpacity>
          {showIndustryPicker && (
            <View style={styles.pickerContainer}>
              {INDUSTRIES.map((ind) => (
                <TouchableOpacity
                  key={ind}
                  style={styles.pickerItem}
                  onPress={() => {
                    setIndustry(ind);
                    setShowIndustryPicker(false);
                  }}
                >
                  <Text style={[
                    styles.pickerItemText,
                    industry === ind && styles.pickerItemTextSelected
                  ]}>
                    {ind}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="What does your company do?"
            placeholderTextColor={colors.dark.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opening Hours</Text>
          <View style={styles.timeRow}>
            <View style={styles.timePickerContainer}>
              <Clock color={colors.dark.textSecondary} size={16} />
              <TextInput
                style={styles.timePicker}
                value={startTime}
                onChangeText={setStartTime}
                placeholder="9:00"
                placeholderTextColor={colors.dark.textSecondary}
              />
            </View>
            <Text style={styles.toText}>to</Text>
            <View style={styles.timePickerContainer}>
              <Clock color={colors.dark.textSecondary} size={16} />
              <TextInput
                style={styles.timePicker}
                value={endTime}
                onChangeText={setEndTime}
                placeholder="9:00"
                placeholderTextColor={colors.dark.textSecondary}
              />
            </View>
          </View>

          <View style={styles.dayRow}>
            <TouchableOpacity
              style={styles.dayDropdown}
              onPress={() => setShowDayPicker(!showDayPicker)}
            >
              <Text style={styles.dropdownText}>{selectedDay}</Text>
              <ChevronDown color={colors.dark.textSecondary} size={16} />
            </TouchableOpacity>

            <View style={styles.openToggle}>
              <Text style={[styles.openText, isOpen && styles.openTextActive]}>Open</Text>
              <Switch
                value={isOpen}
                onValueChange={setIsOpen}
                trackColor={{ false: '#374151', true: colors.dark.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {showDayPicker && (
            <View style={styles.pickerContainer}>
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={styles.pickerItem}
                  onPress={() => {
                    setSelectedDay(day);
                    setShowDayPicker(false);
                  }}
                >
                  <Text style={[
                    styles.pickerItemText,
                    selectedDay === day && styles.pickerItemTextSelected
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Netherlands"
              placeholderTextColor={colors.dark.textSecondary}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="California"
              placeholderTextColor={colors.dark.textSecondary}
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Netherlands"
              placeholderTextColor={colors.dark.textSecondary}
              value={country}
              onChangeText={setCountry}
            />
          </View>
        </View>

        <View style={styles.mapPreview}>
          <MapPin color={colors.dark.textSecondary} size={20} />
          <Text style={styles.mapPreviewText}>Interactive Map Preview</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prices & Services (Optional)</Text>
          </View>
          <Text style={styles.serviceLabel}>Service Name</Text>
          {services.map((service, index) => (
            <View key={service.id} style={styles.serviceRow}>
              <TextInput
                style={[styles.input, styles.serviceInput]}
                placeholder="Service Name"
                placeholderTextColor={colors.dark.textSecondary}
                value={service.name}
                onChangeText={(text) => updateService(service.id, 'name', text)}
              />
              <TextInput
                style={[styles.input, styles.priceInput]}
                placeholder="Price"
                placeholderTextColor={colors.dark.textSecondary}
                value={service.price}
                onChangeText={(text) => updateService(service.id, 'price', text)}
                keyboardType="numeric"
              />
              {services.length > 1 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeService(service.id)}
                >
                  <X color={colors.dark.textSecondary} size={18} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.addServiceButton} onPress={addService}>
            <Plus color={colors.dark.primary} size={20} />
            <Text style={styles.addServiceText}>Add Service</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tone & Personality</Text>
          <Text style={styles.sectionSubtitle}>Adjust how the AI speaks for your brand.</Text>

          <Text style={styles.subsectionTitle}>Formality</Text>
          <View style={styles.sliderContainer}>
            <TouchableOpacity
              style={styles.sliderTrack}
              activeOpacity={1}
              onPress={(e) => {
                const { locationX } = e.nativeEvent;
                const width = 280;
                const newValue = Math.round((locationX / width) * 10);
                setFormality(Math.max(0, Math.min(10, newValue)));
              }}
            >
              <View style={[styles.sliderFill, { width: `${(formality / 10) * 100}%` }]} />
              <View style={[styles.sliderThumb, { left: `${(formality / 10) * 100}%` }]} />
            </TouchableOpacity>
          </View>
          <Text style={styles.currentTone}>Current tone: {formality}/10</Text>

          <View style={styles.toneButtons}>
            <TouchableOpacity style={styles.previewButton} onPress={handlePreviewSample}>
              <Text style={styles.previewButtonText}>Preview Sample</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveToneButton} onPress={handleSaveTone}>
              <Text style={styles.saveToneButtonText}>Save Tone</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Train AI</Text>
          <Text style={styles.sectionSubtitle}>Upload documents or a CSV of FAQs to teach the AI</Text>

          <TouchableOpacity style={styles.uploadArea} onPress={handleFileUpload}>
            <Upload color={colors.dark.textSecondary} size={24} />
            <Text style={styles.uploadText}>Drag files here, or click to browse</Text>
            <Text style={styles.uploadSubtext}>Supports PDF, DOCX, CSV - max 10MB each</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginBottom: 120}]}>
          <Text style={styles.sectionTitle}>Add Your Website</Text>
          <Text style={styles.sectionSubtitle}>Add Your Website — Scan Automatically</Text>

          <TextInput
            style={styles.input}
            placeholder="Input your website link..."
            placeholderTextColor={colors.dark.textSecondary}
            value={websiteUrl}
            onChangeText={setWebsiteUrl}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>
         </Layout>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 12,
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
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
  textArea: {
    minHeight: 100,
    paddingTop: 14,
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
    fontWeight: '600' as const,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  timePickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  timePicker: {
    flex: 1,
    fontSize: 15,
    color: colors.dark.text,
    padding: 0,
  },
  toText: {
    fontSize: 15,
    color: colors.dark.textSecondary,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  openToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    fontWeight: '500' as const,
  },
  openTextActive: {
    color: colors.dark.text,
  },
  mapPreview: {
    height: 200,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  mapPreviewText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  footer: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  updateButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 16,
    marginTop: -8,
  },
  serviceLabel: {
    fontSize: 12,
    color: colors.dark.primary,
    marginBottom: 8,
    fontWeight: '500' as const,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  serviceInput: {
    flex: 1,
    marginBottom: 0,
  },
  priceInput: {
    width: 100,
    marginBottom: 0,
  },
  removeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  addServiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark.primary,
    borderStyle: 'dashed' as const,
    marginTop: 4,
  },
  addServiceText: {
    fontSize: 15,
    color: colors.dark.primary,
    fontWeight: '500' as const,
  },
  sliderContainer: {
    paddingVertical: 16,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    position: 'relative' as const,
    width: '100%',
  },
  sliderFill: {
    height: 8,
    backgroundColor: colors.dark.primary,
    borderRadius: 4,
    position: 'absolute' as const,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    position: 'absolute' as const,
    top: -6,
    marginLeft: -10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
      },
    }),
  },
  currentTone: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginBottom: 16,
  },
  toneButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  previewButton: {
    flex: 1,
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  previewButtonText: {
    fontSize: 15,
    color: colors.dark.text,
    fontWeight: '500' as const,
  },
  saveToneButton: {
    flex: 1,
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveToneButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  uploadArea: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1F2937',
    borderStyle: 'dashed' as const,
    padding: 40,
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 15,
    color: colors.dark.text,
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 13,
    color: colors.dark.textSecondary,
  },
});
