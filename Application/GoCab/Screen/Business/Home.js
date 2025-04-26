import { StatusBar } from 'expo-status-bar'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useEffect, useState } from 'react'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            margin: 15,
            marginHorizontal: 25,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              textAlign: 'center',
              color: 'white',
              padding: 10,
            }}
          >
            Business Performance Dashboard
          </Text>
        </View>

        <Button
          title="Go to Analysis"
          onPress={() => navigation.navigate('Analysis')}
        />
        <Button
          title="Go to Vehicle and Driver Revenue"
          onPress={() => navigation.navigate('VehicleAndDriverRevenue')}
        />
        <Button
          title="Go to Yearly Revenue"
          onPress={() => navigation.navigate('YearlyRevenue')}
        />
        {/* <Button
          title="Update customer and driver ratings "
          onPress={() => navigation.navigate('AgeWiseRevenue')}
        /> */}
        {/* <Button
          title="Check Proposed Booking"
          onPress={() => navigation.navigate('CheckProposedBooking')}
        /> */}
        <Button
          title="View Trips Per Driver"
          onPress={() => navigation.navigate('TripsPerDriver')}
        />
              <Button
        title="View Reward Categories"
        onPress={() => navigation.navigate('RewardCategory')}
      />
      <Button 
  title="Drivers With No Rides" 
  onPress={() => navigation.navigate('DriversWithNoRides')} 
/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
})
