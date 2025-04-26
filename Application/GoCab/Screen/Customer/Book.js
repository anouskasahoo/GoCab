import { StatusBar } from 'expo-status-bar'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useState, useEffect } from 'react'

export default function Book({ navigation }) {
  const [Customer_Id, setCustomer_Id] = useState('')
  const [SourceName, setSourceName] = useState('')
  const [DestinationName, setDestinationName] = useState('')
  const [Vehicle_Type, setVehicle_Type] = useState('')
  const [Start_time, setStart_time] = useState('10:30:00')
  const [End_Time, setEnd_Time] = useState('11:30:00')
  const [Date, setDate] = useState('2023-04-21')
  const [Payment_method, setPayment_method] = useState('Cash')
  const [selectedCost, setSelectedCost] = useState(null)
  const [priceDetails, setPriceDetails] = useState([])  // Now an array to store price details of all vehicle types

  // Fetch prices based on source and destination
  const fetchPrices = async () => {
    if (SourceName && DestinationName) {
      let response = await fetch('http://192.168.49.169:3000/getPrices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SourceName,
          DestinationName,
        }),
      })
      let data = await response.json()
      setPriceDetails(data)  // Store price details for all vehicle types
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [SourceName, DestinationName])  // Re-run when source or destination changes

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        padding: 20,
      }}
    >
      <StatusBar style="auto" />

      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Book Ride Now!</Text>
      </View>
      <View style={{ gap: 10 }}>
            <TextInput
        placeholder="Customer Id"
        style={styles.input}
        value={Customer_Id}
        onChangeText={(text) => setCustomer_Id(text)}
      />

        <TextInput
          placeholder="Source"
          style={styles.input}
          onChangeText={(text) => setSourceName(text)}
        />
        <TextInput
          placeholder="Destination"
          style={styles.input}
          onChangeText={(text) => setDestinationName(text)}
        />
        <TextInput placeholder="Date" style={styles.input} value={Date} />
        <TextInput
          placeholder="Time Start"
          style={styles.input}
          value="10:30:00"
        />
        <TextInput
          placeholder="Time End"
          style={styles.input}
          value="11:30:00"
        />
          <TextInput
      placeholder="Vehicle Type"
      style={styles.input}
      onChangeText={(text) => {
        setVehicle_Type(text)

        // Try to find and set cost of this vehicle type
        const match = priceDetails.find((item) => item.Type.toLowerCase() === text.toLowerCase())
        if (match) {
          setSelectedCost(match.Cost)
        } else {
          setSelectedCost(null)
        }
      }}
    />

        <Button
          title="Book"
          onPress={async () =>
            requestRide({
              Customer_Id,
              SourceName,
              DestinationName,
              Vehicle_Type,
              Start_time,
              End_Time,
              Date,
              Payment_method,
              Cost: selectedCost,
            })
          }
        />
      </View>

      {/* Display prices for all vehicle types */}
      {priceDetails.length > 0 && (
        <View style={styles.priceContainer}>
          <Text>Prices for your selected ride:</Text>
          {priceDetails.map((item, index) => (
            <Text key={index}>
              {item.Type}: ${item.Cost.toFixed(2)} for {item.Distance.toFixed(2)} km
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  priceContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
})

async function requestRide({
  Customer_Id,
  Start_time,
  End_Time,
  Date,
  Payment_method,
  SourceName,
  DestinationName,
  Vehicle_Type,
  Cost,
}) {
  console.log('requestRide')
  let response = await fetch('http://192.168.49.169:3000/RequestRide', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Customer_Id,
      Start_time,
      End_Time,
      Date,
      Payment_method,
      SourceName,
      DestinationName,
      Vehicle_Type,
      Cost,
    }),
  })
  let json = await response.json()
  let d = json[0]['Distance']
  alert('Ride Requested Successfully! Total Distance: ' + d + ' km')

  return json
}
