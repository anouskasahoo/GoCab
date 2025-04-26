import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native'

// Fetch Nearby Bookings
async function getNearbyBookings(driverId) {
  const response = await fetch(
    `http://192.168.49.169:3000/NearbyBookings?driverId=${driverId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch nearby bookings')
  }

  const data = await response.json()
  
  return data
}
// Accept Ride Transaction
async function acceptRideTransaction({ Ride_id, Driver_Id }) {
  // Ensure both Ride_id and Driver_Id are properly formatted for the API
  // The API expects them as numbers, not strings
  const ride_id = parseInt(Ride_id);
  const driver_id = parseInt(Driver_Id);

  const response = await fetch(
    'http://192.168.49.169:3000/AcceptRideTransaction',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        Ride_id: ride_id,
        Driver_Id: driver_id 
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to accept ride')
  }

  return await response.json()
}
export default function NearbyRidesPage({ navigation }) {
  const [driverId, setDriverId] = useState('')
  const [rides, setRides] = useState([])
  const [loading, setLoading] = useState(false)
  const [acceptingRideId, setAcceptingRideId] = useState(null)

  const handleFetchRides = async () => {
    if (!driverId.trim()) {
      Alert.alert('Driver ID is required')
      return
    }

    setLoading(true)
    try {
      const data = await getNearbyBookings(driverId)
      if (data.length === 0) {
        Alert.alert('No nearby rides found')
      }
      setRides(data)
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptRide = async (rideId) => {
    setAcceptingRideId(rideId)
    try {
      await acceptRideTransaction({ Ride_id: rideId, Driver_Id: driverId })
      Alert.alert('Success', `Ride ${rideId} has been accepted`)
      setRides((prevRides) =>
        prevRides.filter((ride) => ride.Ride_id !== rideId),
      )
    } catch (error) {
      Alert.alert('Error accepting ride', error.message)
    } finally {
      setAcceptingRideId(null)
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>Ride ID: {item.Ride_id}</Text>
      <Text style={styles.text}>
        Distance: {item.Distance?.toFixed(2)} km
      </Text>
      <Text style={styles.text}>From: {item.SourceName}</Text>
      <Text style={styles.text}>TO: {item.DestinationName}</Text>
      <Text style={styles.text}>Date: {item.Date}</Text>
      <Text style={styles.text}>Vehicle Type: {item.Vehicle_Type}</Text>

      <TouchableOpacity
        style={[
          styles.acceptButton,
          acceptingRideId === item.Ride_id && { backgroundColor: '#aaa' },
        ]}
        onPress={() => handleAcceptRide(item.Ride_id)}
        disabled={acceptingRideId === item.Ride_id}
      >
        {acceptingRideId === item.Ride_id ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.acceptText}>Accept Ride</Text>
        )}
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Ride Requests</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Driver ID"
        keyboardType="numeric"
        value={driverId}
        onChangeText={setDriverId}
      />

      <Button title="Check Nearby Rides" onPress={handleFetchRides} />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) =>
            item.Ride_id?.toString() || item.Ride_id.toString()
          }
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ marginTop: 20 }}>No rides found.</Text>
          }
          style={{ marginTop: 20, width: '100%' }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  acceptButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
