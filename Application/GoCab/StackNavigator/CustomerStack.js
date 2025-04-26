import { createStackNavigator } from '@react-navigation/stack'
import SignUp from '../Screen/Customer/SignUp'
import Home from '../Screen/Customer/Home'
import Book from '../Screen/Customer/Book'
import PastRides from '../Screen/Customer/PastRides'
import CurrentRide from '../Screen/Customer/CurrentRide'
import NearbyDriver from '../Screen/Customer/NearbyDriver'
import Details from '../Screen/Customer/Details'
const Stack = createStackNavigator()

export default function CustomerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CHome"
    >
      <Stack.Screen name="CHome" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="PastRides" component={PastRides} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="CurrentRide" component={CurrentRide} />
      <Stack.Screen name="NearbyDriver" component={NearbyDriver} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}