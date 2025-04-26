import { StatusBar } from 'expo-status-bar'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'
import { useEffect, useState } from 'react'

export default function SourceAnalysis() {
  const [analysis, setAnalysis] = useState([
    {
      SourceName: 'Source Location',
      TotalTrips: 'Trips',
    },
  ])

  useEffect(() => {
    getAnalysis().then((data) => {
      setAnalysis((prev) => [...prev, ...data])
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>Trips by Source Location</Text>
      <FlatList
        data={analysis}
        keyExtractor={(item) => item.SourceName}
        style={styles.list}
        renderItem={({ item }) => (
          <ScrollView
            horizontal
            contentContainerStyle={styles.rowContainer}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={styles.cell}>{item.SourceName}</Text>
            <Text style={styles.cell}>{item.TotalTrips}</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  cell: {
    width: 150,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
})

async function getAnalysis() {
  try {
    let response = await fetch('http://192.168.49.169:3000/AnalysisOLAP', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let json = await response.json()
    return json
  } catch (error) {
    console.error('Error fetching analysis:', error)
    return []
  }
}
