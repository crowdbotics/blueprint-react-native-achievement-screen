import { createStackNavigator } from "react-navigation-stack";

import Achievement from "./screens/achievement";


import Home from "./screens";

export const AchievementBlueprintNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Achievement: { screen: Achievement },


  },
  {
    initialRouteName: "Home"
  }
);
