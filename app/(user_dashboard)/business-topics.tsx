import { useGetTopicsQuery } from "@/api/user-api/topoics.api";
import ErrorScreen from "@/components/Error";
import { Layout } from "@/components/layout/Layout";
import NewTopicModal from "@/components/new-topic-modal";
import TopicCard from "@/components/topics";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import colors from "@/constants/colors";
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";

export interface TopicItem {
  id: string;
  name: string;
  created_at: string;
  details: string;
//   file?: FILE;
}

export default function BusinessTopicsScreen() {
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [editingTopic, setEditingTopic] = useState<TopicItem | null>(null);
   const { data, isLoading, error, refetch } = useGetTopicsQuery(undefined, {
      skip: false,
   });

   const handleEditTopic = (topic: TopicItem) => {
      setEditingTopic(topic);
      setIsModalVisible(true);
   };

   const handleCloseModal = () => {
      setIsModalVisible(false);
      setEditingTopic(null);
   };

   if(isLoading){
    return <LoadingSpinner />
   }
   if (error) return <ErrorScreen onRetry={refetch} />;
   // console.log("topics", data);
  return (
    <Layout refreshControl={ <RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
            <View>
                <Text style={styles.headerSubtitle}>CURRENT CONTEXT</Text>
                <Text style={styles.headerTitle}>Business Topics</Text>
            </View>
            <Button size="sm" onPress={() => setIsModalVisible(true)}>
            {/* <Plus size={16} color="#FFFFFF" /> */}
            New Topic
            </Button>
        </View>
      </View>

      {(error || !data?.length) &&
         <Layout>
         <View style={styles.card}>
           <View style={styles.divider} />
           <Text style={styles.emptyText}>
             {error ? "Failed to load topics" : "No topics"}
           </Text>
         </View>
         </Layout>
       }

      <View style={styles.listContainer}>
        <FlashList
          data={data}
          renderItem={({ item }) =>
            <TopicCard
               item={item}
               onEdit={handleEditTopic}
            />}
          keyExtractor={(item) => item.id}
        />
      </View>

      <NewTopicModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        editTopic={editingTopic}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
     card: {
       backgroundColor: colors.dark.cardBackground,
       borderRadius: 12,
       marginBottom: 12,
       borderWidth: 1,
       padding: 16,
       borderColor: "#2c2c2e",
     },
     divider: {
       height: 1,
       backgroundColor: "#2c2c2e",
       marginTop: 12,
     },
     emptyText: {
       textAlign: "center",
       color: "#8e8e93",
       fontSize: 14,
       paddingVertical: 20,
     },
  headerContainer: {
    backgroundColor: colors.dark.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  newTopicButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  newTopicText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    gap: 16,
  },
});
