import { View, Text } from 'react-native'
import React from 'react'
import { useCreateCustomeSubscriptionMutation } from '@/api/admin-api/subscription.api'

export default function CustomSubscription() {
   const [customSubs, {isLoading}] = useCreateCustomeSubscriptionMutation()
   
  return (
    <View>
      <Text>CustomSubscription</Text>
    </View>
  )
}
