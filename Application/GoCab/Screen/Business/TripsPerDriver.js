import { StatusBar } from 'expo-status-bar'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'
import { useEffect, useState } from 'react'

export default function TripsPerDriver({ navigation }) {
  const [tripData, setTripData] = useState([
    {
      Driver_id: 'Driver ID',
      Name: 'Name',
      Total_Trips: 'Total Trips',
    },
  ])

  useEffect(() => {
    fetchTrips().then((data) => {
      setTripData([...tripData, ...data])
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Trips Per Driver</Text>
        <FlatList
          data={tripData}
          style={{ margin: 10 }}
          renderItem={({ item }) => (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
                borderWidth: 1,
                padding: 10,
                gap: 10,
              }}
            >
              <Text>{item.Driver_id}</Text>
              <Text>{item.Name}</Text>
              <Text>{item.Total_Trips}</Text>
            </ScrollView>
          )}
          keyExtractor={(item, index) => item.Driver_id + '-' + index}
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
async function fetchTrips() {
    try {
      let response = await fetch('http://192.168.49.169:3000/TripsPerDriver', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      let text = await response.text()
      console.log('🚨 RAW RESPONSE:', text)
  
      // Try parsing if it's valid JSON
      return JSON.parse(text)
    } catch (err) {
      console.error('Fetch error:', err)
      return []
    }
  }
  