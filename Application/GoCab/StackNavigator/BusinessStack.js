import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screen/Business/Home'
import Analysis from '../Screen/Business/Analysis'
import VehicleAndDriverRevenue from '../Screen/Business/VehicleAndDriverRevenue'
import YearlyRevenue from '../Screen/Business/YearlyRevenue'
import AgeWiseRevenue from '../Screen/Business/AgeWiseRevenue'
import CheckProposedBooking from '../Screen/Business/CheckProposedBooking'
import RewardCategory from '../Screen/Business/RewardCategory'
import DriversWithNoRides from '../Screen/Business/DriversWithNoRides'



import TripsPerDriver from '../Screen/Business/TripsPerDriver'

const Stack = createStackNavigator()

export default function BusinessStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName='Home'
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Analysis" component={Analysis} />
      <Stack.Screen name="VehicleAndDriverRevenue" component={VehicleAndDriverRevenue} />
      <Stack.Screen name="YearlyRevenue" component={YearlyRevenue} />
      <Stack.Screen name="AgeWiseRevenue" component={AgeWiseRevenue} />
      <Stack.Screen name="CheckProposedBooking" component={CheckProposedBooking} />
      <Stack.Screen name="TripsPerDriver" component={TripsPerDriver} />
      <Stack.Screen name="RewardCategory" component={RewardCategory} />
      <Stack.Screen name="DriversWithNoRides" component={DriversWithNoRides} />
    </Stack.Navigator>
  )
}