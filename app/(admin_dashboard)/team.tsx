import { useGetTeamMemberQuery } from "@/api/admin-api/team-member.api";
import MemberCard from "@/components/admin-components/member-card";
import ErrorScreen from "@/components/ErrorScreen";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Text } from "react-native";

export default function TeamPage() {
   const {data, isLoading, isError, refetch} = useGetTeamMemberQuery(undefined)

   if(isLoading) return <LoadingSpinner />
   if(isError) return <ErrorScreen onRetry={refetch} />
   if(!data) return null

    return (
        <Layout>
            <Text style={{ color: "#fff", fontSize: 18, marginBottom: 8 }}>
               Team Members
            </Text>

            <FlashList
              data={data.results}
              renderItem={({ item }) => <MemberCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
        </Layout>
    );
}
