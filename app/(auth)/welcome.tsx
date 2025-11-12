import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

const plans = [
  {
    title: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Perfect for small teams and startups',
    features: [
      'Up to 10 users',
      '50GB storage',
      'Basic analytics',
      'Email support',
      'API access',
      'Custom branding',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    title: 'Pro',
    price: '$79',
    period: '/month',
    description: 'Best for growing businesses',
    features: [
      'Up to 50 users',
      '500GB storage',
      'Advanced analytics',
      'Priority email & chat support',
      'API access + Webhooks',
      'Custom branding',
      'Workflow automation',
      'Team collaboration tools',
    ],
    buttonText: 'Get Started',
    popular: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large-scale operations',
    features: [
      'Unlimited users',
      'Unlimited storage',
      'Real-time analytics & AI insights',
      '24/7 phone & dedicated support',
      'Custom API & integrations',
      'White-label branding',
      'Advanced security & compliance',
      'On-premise deployment option',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

const PricingCard = ({ item, onGetStarted }: { item: any, onGetStarted: () => void }) => {
  return (
    <View style={[styles.card, item.popular && styles.popularCard]}>
      {item.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        {item.period ? <Text style={styles.period}>{item.period}</Text> : null}
      </View>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.featuresContainer}>
        {item.features.map((feature: string, index: number) => (
          <Text key={index} style={styles.feature}>
            • {feature}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>{item.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

function WelcomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/(dashboard)/home');
  };

  const renderItem = ({ item }: { item: any }) => {
    return <PricingCard item={item} onGetStarted={handleGetStarted} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Welcome to the Future of AI Automation!</Text>
        <Text style={styles.subtitle}>
          Empower your business with intelligent tools designed to streamline operations and boost productivity. Pick your plan and start innovating today.
        </Text>
      </View>

      <Carousel
        ref={carouselRef}
        data={plans}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.85}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={false}
        layout="default"
        style={{ overflow: 'visible' }}
      />

      <Pagination
        dotsLength={plans.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.paginationContainer}
      />
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 10,
    height: 580,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#333',
  },
  popularCard: {
    borderColor: '#00d4ff',
    borderWidth: 2,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: '#00d4ff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  popularText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  period: {
    fontSize: 18,
    color: '#aaa',
    marginLeft: 4,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresContainer: {
    flex: 1,
    marginBottom: 24,
  },
  feature: {
    fontSize: 15,
    color: '#ddd',
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#00d4ff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paginationContainer: {
    paddingVertical: 20,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00d4ff',
  },
  inactiveDotStyle: {
    backgroundColor: '#444',
  },
});
