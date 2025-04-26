import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'

export default function DriversWithNoRides({ navigation }) {
  const [drivers, setDrivers] = useState([
    {
      Driver_id: '',
      Name: '',
    },
  ])

  useEffect(() => {
    getDriversWithNoRides().then((data) => {
      setDrivers([...drivers, ...data])
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Drivers With No Completed Rides</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Driver ID</Text>
          <Text style={styles.headerCell}>Driver Name</Text>
        </View>
        <FlatList
          data={drivers.slice(1)} // Skip the initial placeholder item
          renderItem={({ item }) => (
            <ScrollView
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.row}
            >
              <View style={styles.cell}>
                <Text>{item.Driver_id}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item.Name}</Text>
              </View>
            </ScrollView>
          )}
          keyExtractor={(item) => item.Driver_id.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    padding: 10,
  },
})

async function getDriversWithNoRides() {
  try {
    let response = await fetch(
      'http://192.168.49.169:3000/DriversWithNoRides',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    let json = await response.json()
    return json
  } catch (error) {
    console.error('Error fetching drivers with no rides:', error)
    return []
  }
}