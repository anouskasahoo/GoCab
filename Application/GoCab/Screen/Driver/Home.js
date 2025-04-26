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
      <View style={styles.containerinner}>
        <View
          style={{
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            margin: 15,
            marginHorizontal: 25,
          }}
        >
          <Text style={{ fontSize: 26, textAlign: 'center' }}>
            Welcome to {`\n`} Go Cab
          </Text>
          <Text style={{ fontSize: 17, textAlign: 'center' }}>
            Find nearby rides and start your next trip
          </Text>
        </View>
        <Button
          title="Nearby Rides"
          onPress={() => navigation.navigate('Nearby')}
        />
        <Button
          title="Current Ride"
          onPress={() => navigation.navigate('CurrentDriverRide')}
        />
        <Button
          title="Details"
          onPress={() => navigation.navigate('Details')}
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
  containerinner: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    elevation: 10,
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    margin: 15,
    elevation: 10,
  },
})
