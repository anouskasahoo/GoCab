import { NavigationContainer } from '@react-navigation/native'
import CustomerStack from './StackNavigator/CustomerStack'
import DriverStack from './StackNavigator/DriverStack'
import BusinessStack from './StackNavigator/BusinessStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Driver"
          component={DriverStack}
          options={{
            tabBarLabel: 'Driver',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="car" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Customer"
          component={CustomerStack}
          options={{
            tabBarLabel: 'Customer',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Business"
          component={BusinessStack}
          options={{
            tabBarLabel: 'Business',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="store" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
