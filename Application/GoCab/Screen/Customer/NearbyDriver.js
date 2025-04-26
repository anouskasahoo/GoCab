import { StatusBar } from 'expo-status-bar'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native'
import { useState } from 'react'

export default function AvailableDrivers() {
  const [location, setLocation] = useState('Jasola')
  const [drivers, setDrivers] = useState([])

  const fetchDrivers = async () => {
    const data = await getAvailableDrivers({ location })
    if (data.length === 0) {
      alert('No drivers available')
      setDrivers([])
    } else {
      setDrivers(data)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Available Drivers</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />

      <TouchableOpacity style={styles.button} onPress={fetchDrivers}>
        <Text style={styles.buttonText}>Find Drivers</Text>
      </TouchableOpacity>

      <FlatList
        data={drivers}
        keyExtractor={(item, index) => `${item.Driver_id}-${index}`}
        style={{ width: '100%', marginTop: 10 }}
        ListEmptyComponent={<Text>No available drivers</Text>}
        renderItem={({ item }) => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.driverCard}
          >
            <Text>{item.Driver_id}</Text>
            <Text>{item.Driver_name}</Text>
            <Text>{item.Driver_rating}</Text>
            <Text>{item.Vehicle_type}</Text>
            <Text>{item.Vehicle_model}</Text>
            <Text>{item.Seats}</Text>
          </ScrollView>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  driverCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    gap: 10,
    marginBottom: 5,
    width: '100%',
  },
})

async function getAvailableDrivers({ location }) {
  let response = await fetch('http://192.168.49.169:3000/AvailableDrivers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location,
    }),
  })

  let json = await response.json()
  return json
}
