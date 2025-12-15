import { useAddOpenningHourMutation } from "@/api/user-api/company.api"
import colors from "@/constants/colors"
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Toast } from "toastify-react-native"
import { RNDatePicker } from "./ui/date-picker"
import { Button } from "./ui/Button"

const OpeningHoursManager = ({ onSuccess }: { onSuccess: () => void }) => {
   const [selectedDays, setSelectedDays] = useState<string[]>([])
   const [startTime, setStartTime] = useState<Date | undefined>(new Date("2000-01-01T09:00:00"))
   const [endTime, setEndTime] = useState<Date | undefined>(new Date("2000-01-01T17:00:00"))
   const [addOpeningHour, { isLoading }] = useAddOpenningHourMutation()

   const days = [
      { label: "Mon", value: "mon" },
      { label: "Tue", value: "tue" },
      { label: "Wed", value: "wed" },
      { label: "Thu", value: "thu" },
      { label: "Fri", value: "fri" },
      { label: "Sat", value: "sat" },
      { label: "Sun", value: "sun" },
   ]

   const toggleDay = (day: string) => {
      setSelectedDays(prev =>
         prev.includes(day)
            ? prev.filter(d => d !== day)
            : [...prev, day]
      )
   }

   const handleAdd = async () => {
      if(selectedDays.length === 0) {
         Toast.error("Please select at least one day")
         return
      }

      if(!startTime || !endTime) {
         Toast.error("Please select start and end time")
         return
      }

      const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })

      try {
         await addOpeningHour({
            days: selectedDays,
            start: formatTime(startTime),
            end: formatTime(endTime)
         }).unwrap()

         // console.log("adding.. ", {
         //    days: selectedDays,
         //    start: formatTime(startTime),
         //    end: formatTime(endTime)
         // })

         setSelectedDays([])
         onSuccess()
      } catch (error) {
         // console.log(error)
         Toast.error("Failed to add opening hours")
      }
   }

   return (
      <View style={{ gap: 16, marginTop: 12 }}>
         <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {days.map(day => (
               <TouchableOpacity
                  key={day.value}
                  onPress={() => toggleDay(day.value)}
                  style={{
                     paddingHorizontal: 12,
                     paddingVertical: 8,
                     borderRadius: 20,
                     backgroundColor: selectedDays.includes(day.value)
                        ? colors.dark.primary
                        : colors.dark.cardBackground,
                     borderWidth: 1,
                     borderColor: '#1F2937'
                  }}
               >
                  <Text style={{
                     color: selectedDays.includes(day.value) ? '#FFFFFF' : colors.dark.textSecondary,
                     fontSize: 13,
                     fontWeight: '500'
                  }}>
                     {day.label}
                  </Text>
               </TouchableOpacity>
            ))}
         </View>

         <View style={styles.timeRow}>
            <View style={{ flex: 1 }}>
               <RNDatePicker
                  label="Opening Time"
                  mode="time"
                  value={startTime}
                  onChangeDate={setStartTime}
               />
            </View>
            <View style={{ flex: 1 }}>
               <RNDatePicker
                  label="Closing Time"
                  mode="time"
                  value={endTime}
                  onChangeDate={setEndTime}
               />
            </View>
         </View>

         <Button
            onPress={handleAdd}
            isLoading={isLoading}
            variant="outline"
            style={{ marginTop: 8, borderWidth: 2, borderColor: colors.dark.textSecondary, borderStyle: "dashed" }}
         >
            Add Opening Hour
         </Button>
      </View>
   )
}

export default OpeningHoursManager;

const styles = StyleSheet.create({
     timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
})
