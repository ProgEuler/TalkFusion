import { useDeleteTopicMutation } from '@/api/user-api/topoics.api'
import { TopicItem } from '@/app/(user_dashboard)/business-topics'
import colors from '@/constants/colors'
import { timeAgo } from '@/utils/helpers'
import { Calendar, Edit3, Trash2 } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { toast } from 'sonner-native'
import { Toast } from 'toastify-react-native'

export default function TopicCard({ item, onEdit }: { item: TopicItem; onEdit: (topic: TopicItem) => void }) {
   const [deleteTopic] = useDeleteTopicMutation()

   const handleDelete = async () => {
      try {
         await deleteTopic(item.id)
         toast.error("Topic deleted successfully")
         // Toast.success("Topic deleted successfully")
      } catch (error) {
         toast.error("Failed to delete topic")
         // console.log(error)
      }
   }

  return (
        <View style={styles.card}>
          <View style={styles.cardIndicator} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
                  <Edit3 size={16} color={colors.dark.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
                  <Trash2 size={16} color={colors.dark.danger} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dateRow}>
              <Calendar size={14} color={colors.dark.textSecondary} />
              <Text style={styles.dateText}>Added: {timeAgo(item.created_at)}</Text>
            </View>

            <Text style={styles.descriptionText}>{item.details}</Text>

            {/* <TouchableOpacity style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>See full details</Text>
              <ArrowRight size={14} color={colors.dark.primary} />
            </TouchableOpacity> */}
          </View>
        </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.dark.border,
    marginBottom: 12,
  },
  cardIndicator: {
    width: 6,
    height: "100%",
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
   width: "80%",
    fontSize: 18,
    fontWeight: "700",
    color: colors.dark.text,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 13,
    color: colors.dark.textSecondary,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: colors.dark.primary,
    fontWeight: "600",
  },
});
