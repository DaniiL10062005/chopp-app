import { StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { ChoppThemedText } from "@/shared/components/chopp-themed-text";
import { ChoppThemedView } from "@/shared/components/chopp-themed-view";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ChoppThemedView style={styles.container}>
        <ChoppThemedText type="title">
          This screen doesn&apos;t exist.!
        </ChoppThemedText>
        <Link href="/" style={styles.link}>
          <ChoppThemedText type="link">Go to home screen!</ChoppThemedText>
        </Link>
      </ChoppThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
