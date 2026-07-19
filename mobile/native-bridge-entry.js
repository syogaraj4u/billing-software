import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Keyboard } from "@capacitor/keyboard";
import { Network } from "@capacitor/network";
import { Share } from "@capacitor/share";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();

function dispatchNetworkStatus(status) {
  window.dispatchEvent(new CustomEvent("billing-native-network", { detail: status }));
  window.dispatchEvent(new Event(status.connected ? "online" : "offline"));
}

async function blobToBase64(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const blockSize = 0x8000;
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += blockSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + blockSize));
  }
  return btoa(binary);
}

function safeFileName(fileName = "billing-file") {
  return String(fileName).replace(/[^A-Za-z0-9._-]+/g, "-");
}

async function writeTemporaryFile(blob, fileName) {
  const path = `shares/${Date.now()}-${safeFileName(fileName)}`;
  const result = await Filesystem.writeFile({
    path,
    data: await blobToBase64(blob),
    directory: Directory.Cache,
    recursive: true
  });
  return { path, uri: result.uri };
}

async function shareBlob(blob, fileName, options = {}) {
  if (!isNative) throw new Error("Native sharing is unavailable");
  const temporaryFile = await writeTemporaryFile(blob, fileName);
  try {
    await Share.share({
      title: options.title || fileName,
      text: options.text || "",
      url: temporaryFile.uri,
      dialogTitle: options.dialogTitle || "Save or share file"
    });
  } finally {
    Filesystem.deleteFile({ path: temporaryFile.path, directory: Directory.Cache }).catch(() => {});
  }
}

async function configureNativeShell() {
  if (!isNative) return;
  document.documentElement.classList.add("native-app", `native-${platform}`);
  try {
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setStyle({ style: Style.Dark });
    if (platform === "android") await StatusBar.setBackgroundColor({ color: "#f5f7f8" });
  } catch {
    // Status bar behavior varies by OS version.
  }
  if (platform === "ios") Keyboard.setAccessoryBarVisible({ isVisible: true }).catch(() => {});
  dispatchNetworkStatus(await Network.getStatus());
  Network.addListener("networkStatusChange", dispatchNetworkStatus);
  App.addListener("appStateChange", ({ isActive }) => {
    if (isActive) Network.getStatus().then(dispatchNetworkStatus).catch(() => {});
  });
  SplashScreen.hide().catch(() => {});
}

window.NativeBilling = {
  isNative,
  platform,
  shareBlob,
  saveOrShareBlob(blob, fileName, options = {}) {
    return shareBlob(blob, fileName, {
      dialogTitle: "Save or share file",
      ...options
    });
  }
};

configureNativeShell().catch(error => console.warn("Native shell setup failed", error));

