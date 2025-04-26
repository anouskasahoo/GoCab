import { StatusBar } from 'expo-status-bar'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useEffect, useState } from 'react'

export default function RideDetails({ navigation }) {
  const [rideDetails, setRideDetails] = useState({
    Ride_id: 'No rides found',
    Distance: 'No rides found',
    Status: 'No rides found',
    Customer_Id: 'No rides found',
    Driver_Id: 'No rides found',
    Start_time: 'No rides found',
    End_time: 'No rides found',
    OTP: 'No rides found',
    Coupon_code: 'No coupon found',
    Cost: 'No cost found',
  })

  const [Customer_Id, setCustomer_Id] = useState('')
  const [otp, setOtp] = useState('')

  const fetchData = async () => {
    if (!Customer_Id.trim()) {
      alert('Please enter a Customer ID')
      return
    }

    const data = await fetchRideDetails({ Customer_Id })
    if (data.length === 0) {
      setRideDetails({
        Ride_id: 'No rides found',
        Distance: 'No rides found',
        Status: 'No rides found',
        Customer_Id: 'No rides found',
        Driver_Id: 'No rides found',
        Start_time: 'No rides found',
        End_time: 'No rides found',
        OTP: 'No rides found',
        Coupon_code: 'No coupon found',
        Cost: 'No cost found',
      })
      alert('No rides found')
      navigation.navigate('CHome')
    } else {
      setRideDetails(data[0])
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 30, margin: 10 }}>Ride Details</Text>

      <TextInput
        placeholder="Enter Customer ID"
        value={Customer_Id}
        onChangeText={setCustomer_Id}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.buttonDesign, { backgroundColor: '#4444ff' }]}
        onPress={fetchData}
      >
        <Text style={styles.buttonText}>Fetch Ride Details</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        {Object.entries(rideDetails).map(([label, value]) => (
          <View style={styles.row} key={label}>
            <Text style={styles.label}>{label.replace('_', ' ')}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.buttonDesign, { backgroundColor: '#2d80f7' }]}
        onPress={async () => {
          if (!otp.trim()) {
            alert('Please enter OTP')
            return
          }
          const res = await verifyOtpTransaction({
            Ride_id: rideDetails.Ride_id,
            OTP: otp,
          })
          alert(res.message || 'OTP verification attempted')
        }}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonDesign, { backgroundColor: '#63ea05' }]}
        onPress={async () => {
          alert('Coupon Applied')
          await applyCouponTransaction({
            Ride_id: rideDetails.Ride_id,
            Customer_id: rideDetails.Customer_Id,
          })
          fetchData()
        }}
      >
        <Text style={styles.buttonText}>Apply Coupon</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonDesign, { backgroundColor: '#f6161c' }]}
        onPress={() => {
          cancelRide({ Ride_id: rideDetails.Ride_id }).then(() => {
            alert('Ride Cancelled')
            navigation.navigate('CHome')
          })
        }}
      >
        <Text style={styles.buttonText}>Cancel Ride</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 10,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    paddingRight: 10,
    width: 120,
  },
  value: {
    flex: 1,
  },
  buttonDesign: {
    width: '80%',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
})

// API Calls

async function fetchRideDetails({ Customer_Id }) {
  const response = await fetch('http://192.168.49.169:3000/CurrentRide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Customer_Id }),
  })
  // console.log(response.json());
  return await response.json()
}

async function cancelRide({ Ride_id }) {
  await fetch('http://192.168.49.169:3000/CancelRideTransaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Ride_id }),
  })
}

async function applyCouponTransaction({ Ride_id, Customer_id }) {
  await fetch('http://192.168.49.169:3000/ApplyCouponTransaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Ride_id, Customer_id }),
  })
}

async function verifyOtpTransaction({ Ride_id, OTP }) {
  const response = await fetch('http://192.168.49.169:3000/VerifyOTPTransaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Ride_id, OTP }),
  })
  return await response.json()
}
