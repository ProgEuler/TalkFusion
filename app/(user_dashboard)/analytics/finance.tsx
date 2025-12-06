import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '@/constants/colors'
import { Camera, FileText, TrendingUp } from 'lucide-react-native'
import { useGetFinanceDataQuery } from '@/api/user-api/analytics.api'

export default function Finance() {
   const { data, isLoading } = useGetFinanceDataQuery({});
   console.log("Finance Data:", data);
  return (
         <View style={styles.financialRow}>
             <View style={styles.financialCard}>
               <View style={styles.financialHeader}>
                 <View
                   style={[
                     styles.financialIconContainer,
                     { backgroundColor: colors.dark.primary + "20" },
                   ]}
                 >
                   <Camera color={colors.dark.primary} size={20} />
                 </View>
                 <Text style={styles.financialLabel}>Total Payments</Text>
               </View>
               <Text style={styles.financialValue}>$24,580</Text>
               <View style={styles.financialChange}>
                 <TrendingUp color={colors.dark.success} size={14} />
                 <Text
                   style={[
                     styles.financialChangeText,
                     { color: colors.dark.success },
                   ]}
                 >
                   +15% from last month
                 </Text>
               </View>
             </View>

             <View style={styles.financialCard}>
               <View style={styles.financialHeader}>
                 <View
                   style={[
                     styles.financialIconContainer,
                     { backgroundColor: colors.dark.warning + "20" },
                   ]}
                 >
                   <FileText color={colors.dark.warning} size={20} />
                 </View>
                 <Text style={styles.financialLabel}>Average Order Value</Text>
               </View>
               <Text style={styles.financialValue}>$142</Text>
               <View style={styles.financialChange}>
                 <TrendingUp color={colors.dark.success} size={14} />
                 <Text
                   style={[
                     styles.financialChangeText,
                     { color: colors.dark.success },
                   ]}
                 >
                   +8.2% from last month
                 </Text>
               </View>
             </View>

           <View style={styles.financialCard}>
             <View style={styles.financialHeader}>
               <View
                   style={[
                     styles.financialIconContainer,
                     { backgroundColor: colors.dark.warning + "20" },
                   ]}
                 >
                   <FileText color={colors.dark.warning} size={20} />
                 </View>
                 <Text style={styles.financialLabel}>Average Order Value</Text>
               </View>
               <Text style={styles.financialValue}>$142</Text>
               <View style={styles.financialChange}>
                 <TrendingUp color={colors.dark.success} size={14} />
                 <Text
                   style={[
                     styles.financialChangeText,
                     { color: colors.dark.success },
                   ]}
                 >
                   +8.2% from last month
                 </Text>
               </View>
             </View>

           <View style={styles.financialCard}>
             <View style={styles.financialHeader}>
               <View
                   style={[
                     styles.financialIconContainer,
                     { backgroundColor: colors.dark.warning + "20" },
                   ]}
                 >
                   <FileText color={colors.dark.warning} size={20} />
                 </View>
                 <Text style={styles.financialLabel}>Average Order Value</Text>
               </View>
               <Text style={styles.financialValue}>$142</Text>
               <View style={styles.financialChange}>
                 <TrendingUp color={colors.dark.success} size={14} />
                 <Text
                   style={[
                     styles.financialChangeText,
                     { color: colors.dark.success },
                   ]}
                 >
                   +8.2% from last month
                 </Text>
               </View>
             </View>
           </View>
  )
}

const styles = StyleSheet.create({
   financialRow: {
       flexWrap: "wrap",
       width: "48%",
       gap: 12,
       marginBottom: 24,
     },
     financialCard: {
       backgroundColor: colors.dark.cardBackground,
       borderRadius: 12,
       padding: 16,
       borderWidth: 1,
       borderColor: colors.dark.border,
     },
     financialHeader: {
       flexDirection: "row",
       alignItems: "center",
       gap: 8,
       marginBottom: 12,
     },
     financialIconContainer: {
       width: 32,
       height: 32,
       borderRadius: 8,
       alignItems: "center",
       justifyContent: "center",
     },
     financialLabel: {
       fontSize: 14,
       color: colors.dark.textSecondary,
       fontWeight: "500",
     },
     financialValue: {
       fontSize: 24,
       fontWeight: "700",
       color: colors.dark.text,
       marginBottom: 8,
     },
     financialChange: {
       flexDirection: "row",
       alignItems: "center",
       gap: 4,
     },
     financialChangeText: {
       fontSize: 12,
       fontWeight: "500",
     },
})
