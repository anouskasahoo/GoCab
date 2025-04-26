import { StatusBar } from 'expo-status-bar'
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useState } from 'react'

export default function DriverDetails() {
  const [driverId, setDriverId] = useState('')
  const [driverDetails, setDriverDetails] = useState(null)

  const fetchDriverDetails = async () => {
    try {
      const response = await fetch(`http://192.168.49.169:3000/DriverDetails/${driverId}`)
      const data = await response.json()

      if (data.message === 'Driver not found') {
        Alert.alert('Driver not found')
        setDriverDetails(null)
      } else {
        setDriverDetails(data)
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error fetching driver details')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Driver Details</Text>

      <TextInput
        placeholder="Enter Driver ID"
        value={driverId}
        onChangeText={setDriverId}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Get Details" onPress={fetchDriverDetails} />

      {driverDetails && (
        <View style={styles.detailsBox}>
          <Text style={styles.detailItem}>Name: {driverDetails.Name}</Text>
          <Text style={styles.detailItem}>Age: {driverDetails.Age}</Text>
          <Text style={styles.detailItem}>Phone: {driverDetails.Phone_Number}</Text>
          <Text style={styles.detailItem}>Email: {driverDetails.Email || 'N/A'}</Text>
          <Text style={styles.detailItem}>Rating: {driverDetails.Rating}</Text>
          <Text style={styles.detailItem}>No. of Trips: {driverDetails.No_of_Trips}</Text>
          <Text style={styles.detailItem}>Earnings: ₹{driverDetails.Earnings}</Text>
          <Text style={styles.detailItem}>Current Location: {driverDetails.Current_Location}</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailsBox: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 8,
  },
})
