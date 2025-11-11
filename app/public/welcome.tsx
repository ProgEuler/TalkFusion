import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_MARGIN = 15;

const pricingPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 29,
    description: 'Perfect for small teams and startups',
    features: [
      'Up to 10 users',
      '50GB storage',
      'Basic analytics',
      'Email support',
      'API access',
      'Custom branding',
    ],
    color: '#3B82F6',
  },
  {
    id: 2,
    name: 'Pro',
    price: 79,
    description: 'Ideal for growing businesses',
    features: [
      'Up to 50 users',
      '500GB storage',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom branding',
      'Advanced automation',
      'Team collaboration',
    ],
    color: '#8B5CF6',
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 199,
    description: 'For large organizations',
    features: [
      'Unlimited users',
      'Unlimited storage',
      'Enterprise analytics',
      '24/7 phone support',
      'Full API access',
      'White-label solution',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    color: '#EC4899',
  },
];

export default function PricingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN * 2));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Welcome to the Future of AI Automation!
        </Text>
        <Text style={styles.subtitle}>
          Empower your business with intelligent tools designed to streamline
          operations and boost productivity. Pick your plan and start innovating
          today.
        </Text>

        {/* Carousel */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContent}
          style={styles.carousel}>
          {pricingPlans.map((plan) => (
            <View key={plan.id} style={styles.cardWrapper}>
              <View style={[styles.card, { borderTopColor: plan.color }]}>
                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: plan.color }]}>
                      ${plan.price}
                    </Text>
                    <Text style={styles.period}>/month</Text>
                  </View>
                </View>

                <Text style={styles.description}>{plan.description}</Text>

                {/* Features */}
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureRow}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                {/* Button */}
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: plan.color }]}
                  activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {pricingPlans.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  time: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#b3b3b3',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 20,
    marginBottom: 30,
  },
  carousel: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: (width - CARD_WIDTH) / 2,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 25,
    borderTopWidth: 4,
    minHeight: 480,
  },
  cardHeader: {
    marginBottom: 15,
  },
  planName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 18,
    color: '#b3b3b3',
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: '#b3b3b3',
    marginBottom: 25,
  },
  featuresContainer: {
    flex: 1,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    lineHeight: 20,
  },
  featureText: {
    color: '#e0e0e0',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4a4a4a',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3B82F6',
    width: 24,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
