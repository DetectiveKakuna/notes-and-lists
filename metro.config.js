const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
  input: "./src/global.css",
  // 16 makes each spacing step 4dp, matching Material 3's grid and Tailwind on the web.
  inlineRem: 16,
});
