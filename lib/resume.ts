import { Platform } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

// resume.pdf ships in /assets and is bundled into the app — swap the require
// below if you want to point it at a different file.
const resumeModule = require("@/assets/resume.pdf");

/**
 * Copies the bundled resume out to a readable cache path and opens the
 * native share/preview sheet, since mobile OSes don't have an in-place
 * "download" concept the way a browser does.
 */
export async function openResume() {
  const asset = Asset.fromModule(resumeModule);
  await asset.downloadAsync();

  if (Platform.OS === "web") {
    // On web, expo-file-system/expo-sharing aren't available — just open the asset URI.
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
