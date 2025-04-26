import { StatusBar } from 'expo-status-bar'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'
import { useEffect, useState } from 'react'

export default function RewardCategory({ navigation }) {
  const [rewards, setRewards] = useState([
    {
      Driver_id: 'Driver ID',
      Name: 'Name',
      Rating: 'Rating',
      Reward_Category: 'Reward Category',
    },
  ])

  useEffect(() => {
    fetchRewards().then((data) => {
      setRewards([...rewards, ...data])
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 26, marginVertical: 10 }}>Reward Categories</Text>
      <FlatList
        data={rewards}
        renderItem={({ item }) => (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              borderWidth: 1,
              padding: 10,
              marginVertical: 5,
              gap: 10,
            }}
          >
            <Text>{item.Driver_id}</Text>
            <Text>{item.Name}</Text>
            <Text>{item.Rating}</Text>
            <Text>{item.Reward_Category}</Text>
          </ScrollView>
        )}
        keyExtractor={(item) =>
          item.Driver_id + item.Name + item.Reward_Category
        }
      />
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
    padding: 10,
  },
})

async function fetchRewards() {
  try {
    let response = await fetch('http://192.168.49.169:3000/RewardCategory', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    let json = await response.json()
    return json
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}
