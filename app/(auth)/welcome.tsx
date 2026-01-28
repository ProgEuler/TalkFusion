import { SubscriptionPlan } from "@/api/admin-api/subscription.api";
import { Layout } from "@/components/layout/Layout";
import PricingCard from "@/components/user-components/pricing-card";
import { useSignIn } from "@/hooks/use-google-signin";
import { logOut } from "@/store/authSlice";
import { clearAuthData } from "@/utils/storage";
import { useRouter } from "expo-router";
import { Dimensions, Linking, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch } from "react-redux";

const { height: viewportHeight, width: viewportWidth } =
  Dimensions.get("window");

const PRICING_DATA: SubscriptionPlan[] = [
  {
      "id": 1,
      "name": "essential",
      "duration": "months",
      "price": "99.00",
      "msg_limit": 8000,
      "user_limit": 3,
      "token_limit": 25000000,
      "custom": false
  },
  {
      "id": 2,
      "name": "growth",
      "duration": "months",
      "price": "149.00",
      "msg_limit": 100,
      "user_limit": 5,
      "token_limit": 500000,
      "custom": false
  }
];

function WelcomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signIn } = useSignIn();

  const handleGetStarted = (planId: number) => async () => {
    signIn("signout");
    dispatch(logOut());
    await clearAuthData();
    router.replace("/(auth)/login");

    Linking.openURL(
      `https://ape-in-eft.ngrok-free.app/api/finance/create-checkout/${planId}/1/`,
    );
  };

  return (
    <Layout edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>
          Welcome to the Future of AI Automation!
        </Text>
        <Text style={styles.subtitle}>
          Empower your business with intelligent tools designed to streamline
          operations and boost productivity. Pick your plan and start innovating
          today.
        </Text>
      </View>

      <View style={styles.carouselContainer}>
        <Carousel
          onConfigurePanGesture={(panGesture) =>
            panGesture.activeOffsetX([-5, 5]).failOffsetY([-5, 5])
          }
          width={viewportWidth}
          height={viewportHeight * 0.65}
          vertical={false}
          data={PRICING_DATA}
          scrollAnimationDuration={800}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          renderItem={({ item }) => (
            <PricingCard
                item={item}
                onGetStarted={handleGetStarted(item.id)}
            />
          )}
        />
      </View>
    </Layout>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 22,
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  }
});
