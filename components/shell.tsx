import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export function Shell({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.shell, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  shell: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 24,
  },
});
