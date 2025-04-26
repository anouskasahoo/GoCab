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

export default function CheckProposedBooking({ navigation }) {
  const [analysis, setAnalysis] = useState([
    {
        Driver_Id: 'Driver ID',
        Ride_id: 'Ride ID',
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
              <Text>{item.Driver_Id}</Text>
              <Text>{item.Ride_id}</Text>
            </ScrollView>
          )}
          keyExtractor={(item) => item.Driver_Id+" "+item.Ride_id}
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
    let response = await fetch('http://192.168.49.169:3000/CheckPropsedBooking', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let json = await response.json()
    return json
}
