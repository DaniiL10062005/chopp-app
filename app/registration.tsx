import { useTranslation } from "react-i18next";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LogoDark from "@/assets/logo-dark.png";
import LogoLight from "@/assets/logo-light.png";
import { RegistrationForm } from "@/pages/registration";
import { ChoppThemedText } from "@/shared";
import { useChoppTheme } from "@/theme";

export default function RegistrationPage() {
  const theme = useChoppTheme();
  const { t } = useTranslation();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={theme.dark ? LogoDark : LogoLight} />
        <View style={styles.content}>
          <ChoppThemedText type="subtitleBold">
            {t("registration")}
          </ChoppThemedText>
          <RegistrationForm />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 64,
  },
  logo: {
    width: 128,
    height: 128,
  },
  content: {
    width: "80%",
  },
});
