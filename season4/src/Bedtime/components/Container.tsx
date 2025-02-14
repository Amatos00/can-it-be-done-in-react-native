import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { PADDING, TAU, formatDuration2, radToMinutes } from "../Constants";

import Label from "./Label";

interface ContainerProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C2B2D",
    borderRadius: 16,
    padding: PADDING,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  duration: {
    fontFamily: "SFProRounded-Medium",
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    color: "white",
  },
});

const Container = ({ start, end, children }: ContainerProps) => {
  const duration = useDerivedValue(() => {
    const d =
      start.value > end.value
        ? end.value + (TAU - start.value)
        : end.value - start.value;
    return formatDuration2(radToMinutes(d));
  });
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Label theta={start} label="BEDTIME" icon="bed" />
        <Label theta={end} label="WAKE UP" icon="bell" />
      </View>
      {children}
      <ReText style={styles.duration} text={duration} />
    </View>
  );
};

export default Container;
