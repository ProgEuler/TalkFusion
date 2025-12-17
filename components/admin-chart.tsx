import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function AdminChart({ chartData }) {
  const { width } = useWindowDimensions();

  const lineData1 = chartData.map((item) => ({
    value: item.users,
    label: item.month.slice(0, 3),
  }));

  const lineData2 = chartData.map((item) => ({
    value: item.revenue,
  }));

  const lineData3 = chartData.map((item) => ({
    value: item.cost,
  }));

  const maxYValue = Math.max(
    ...chartData.map((i) => Math.max(i.users, i.revenue))
  );

  return (
    <View style={styles.chartCard}>
      <LineChart
        /* Axis text */
        yAxisTextStyle={{ color: "#FFFFFF", fontSize: 12 }}
        xAxisLabelTextStyle={{ color: "#FFFFFF", fontSize: 12 }}
        /* Axis & grid */
        xAxisColor="#FFFFFF"
        yAxisColor="#FFFFFF"
        rulesColor="rgba(255,255,255,0.2)"
        rulesType="solid"
        isAnimated
        animationDuration={800}
        animateOnDataChange
        data={lineData1}
        data2={lineData2}
        data3={lineData3}
        height={220}
        width={width - 80}
        initialSpacing={20}
        color1="#F59E0B"
        color2="#06B6D4"
        color3="#06B624"
        dataPointsColor1="#F59E0B"
        dataPointsColor2="#06B6D4"
        dataPointsColor3="#06B624"
        startOpacity={0.1}
        endOpacity={0.1}
        noOfSections={5}
        maxValue={maxYValue + 5}
        curved
        hideDataPoints={false}
        dataPointsRadius={4}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: colors.dark.cardBackground,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: "center",
    overflow: "hidden",
  },
});
