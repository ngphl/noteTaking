import React from "react";
import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";
import licenses from "../../licenses.json";
import { GlobalStyles } from "../components/style";
import { GlobalLayout } from "../components/Layout";

//About screen display general application information and licenses
const AboutScreen = () => {
  const globalStyles = GlobalStyles();

  const handleLicensePress = (licenseUrl) => {
    Linking.openURL(licenseUrl);
  };

  return (
    <GlobalLayout>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, styles.backgroundColor]}
      >
        {/*Display the information */}
        <Text style={[styles.title, globalStyles.title]}>About</Text>
        <Text style={[styles.description, globalStyles.content]}>
          This application is a note-taking app built with React Native and
          Expo. It uses various open-source libraries, each with its own
          license. Here is a list of the licenses for the libraries used:
        </Text>
        {/*Display the licenses */}
        {Object.entries(licenses).map(([packageName, packageInfo]) => (
          <View key={packageName} style={styles.packageContainer}>
            <Text style={[styles.packageName, globalStyles.label]}>
              {packageName}
            </Text>
            <Text
              style={[styles.license, globalStyles.content]}
              onPress={() => handleLicensePress(packageInfo.licenseUrl)}
            >
              License: {packageInfo.licenses}
            </Text>
          </View>
        ))}
      </ScrollView>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    marginBottom: 16,
    textAlign: "center",
  },
  packageContainer: {
    marginBottom: 16,
  },
  packageName: {
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  license: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default AboutScreen;
