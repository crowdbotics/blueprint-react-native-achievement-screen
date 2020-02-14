import { createStackNavigator } from "react-navigation-stack";

import Achievement from "./screens/achievement";


import Home from "./screens";

export default AchievementBlueprintNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Achievement: { screen: Achievement },


  },
  {
    initialRouteName: "Home"
  }
);
