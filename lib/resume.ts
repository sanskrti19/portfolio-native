import { Platform } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const resumeModule = require("@/assets/resume.pdf");


export async function openResume() {
  const asset = Asset.fromModule(resumeModule);
  await asset.downloadAsync();

  if (Platform.OS === "web") {
   
    const { Linking } = require("react-native");
    if (asset.localUri || asset.uri) {
      Linking.openURL(asset.localUri ?? asset.uri);
    }
    return;
  }

  const destination = `${FileSystem.cacheDirectory}resume.pdf`;
  if (asset.localUri) {
    await FileSystem.copyAsync({ from: asset.localUri, to: destination });
  }

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(destination, {
      mimeType: "application/pdf",
      dialogTitle: "Resume",
      UTI: "com.adobe.pdf",
    });
  }
}
