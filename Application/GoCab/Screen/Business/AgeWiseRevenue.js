import { StatusBar } from 'expo-status-bar'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native'
import { useEffect, useState } from 'react'

export default function Home({ navigation }) {
  const [analysis, setAnalysis] = useState([
    {
        Age_Group: 'Age Group',
        customer_count: 'Customer Count',
        avg_trips: 'Avg Trips'
    },
  ])
  useEffect(() => {
    getAnalysis().then((data) => {
      setAnalysis([...analysis, ...data])
    })
  }, [])
  console.log(analysis)
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Analysis</Text>
        {/* <Button title="Go to Business" onPress={() => navigation.navigate('Business')} /> */}
        <FlatList
          data={analysis}
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
              <Text>{item.Age_Group}</Text>
              <Text>{item.customer_count}</Text>
              <Text>{item.avg_trips}</Text>
            </ScrollView>
          )}
            keyExtractor={(item) => item.Age_Group+item.customer_count}
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

async function getAnalysis() {
  let response = await fetch(
    'http://192.168.49.169:3000/AgeWiseRevenueOLAP',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  let json = await response.json()
  // console.log(json)
  return json
}
