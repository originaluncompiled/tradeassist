const isDevBuild = process.env && process.env.APP_VARIANT === 'development';

module.exports = {
  expo: {
    name: isDevBuild ? "TradeAssist Development" : "TradeAssist",
    slug: "tradeassist",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "tradeassist",
    userInterfaceStyle: "dark",
    icon: isDevBuild ? "./assets/app/icon-dev.png" : "./assets/app/icon.png",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: isDevBuild ? "./assets/app/adaptive-icon-dev.png" : "./assets/app/adaptive-icon.png",
        backgroundColor: "#1c1c1c"
      },
      package: isDevBuild ? "tradeassist.dev" : "tradeassist"
    },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-splash-screen",
        {
          image: isDevBuild ? "./assets/app/splash-icon-dark-dev.png" : "./assets/app/splash-icon-dark.png",
          backgroundColor: "#1c1c1c",
          imageWidth: 200
        }
      ],
      "expo-sqlite",
      "expo-localization"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "dcafe8f6-89b8-4b02-894c-7e95a1278b56"
      }
    }
  }
}
