import { Options } from "../index";
import MacOSPlatform from "./darwin";
import LinuxPlatform from "./linux";
import WindowsPlatform from "./win32";

export interface Platform {
  addToTrustStores(certificatePath: string, options?: Options): Promise<void>;
  removeFromTrustStores(certificatePath: string): void;
  addDomainToHostFileIfMissing(domain: string): Promise<void>;
  deleteProtectedFiles(filepath: string): void;
  readProtectedFile(filepath: string): Promise<string>;
  writeProtectedFile(filepath: string, contents: string): Promise<void>;
}

const platformName = process.platform;
let platform: Platform;
if (platformName == "win32") {
  platform = new WindowsPlatform();
} else if (platformName === "linux") {
  platform = new LinuxPlatform();
} else if (platformName === "darwin") {
  platform = new MacOSPlatform();
} else {
  // fallback to linux
  platform = new LinuxPlatform();
}

export default platform;
