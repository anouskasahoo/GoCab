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
        Y: 'Year',
        M: 'Month',
        Date: 'Date',
        C: 'Cost',
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
              <Text>{item.Y}</Text>
              <Text>{item.M}</Text>
              <Text>{item.Date}</Text>
              <Text>{item.C}</Text>
            </ScrollView>
          )}
            keyExtractor={(item) => item.Y+item.M+item.Date+item.C}
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
    'http://192.168.49.169:3000/YearlyRevenueOLAP',
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
