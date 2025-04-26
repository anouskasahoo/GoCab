import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screen/Driver/Home'
import Nearby from '../Screen/Driver/Nearby'
import DriverRideDetails from '../Screen/Driver/CurrentDriverRide'
import Details from '../Screen/Driver/Details'
const Stack = createStackNavigator()

export default function DriverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='DHome'
    >
      <Stack.Screen name="DHome" component={Home} />
      <Stack.Screen name="Nearby" component={Nearby} />
      <Stack.Screen name="CurrentDriverRide" component={DriverRideDetails} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}