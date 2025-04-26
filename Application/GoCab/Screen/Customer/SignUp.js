import { StatusBar } from 'expo-status-bar'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useEffect, useState } from 'react'

export default function SignUp({ navigation }) {
  let [Name, setName] = useState('')
  let [Phone_Number, setPhone_Number] = useState('')
  let [Age, setAge] = useState('')
  let [Email_Address, setEmail_Address] = useState('')
  let [Home_Location, setHome_Location] = useState('')

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
      }}
    >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Comfort Cruise</Text>
      </View>

      <View
        style={{
          flex: 1,
          // width: '100%',
          borderWidth: 1,
          padding: 20,
          flexDirection: 'column',
          margin: 10,
          gap: 20,
        }}
      >
        <View
          style={{
            gap: 5,
          }}
        >
          <TextInput
            placeholder="Name"
            style={styles.input}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={(text) => setPhone_Number(text)}
            keyboardType="numeric"
          />
        </View>
        <View
          style={{
            gap: 5,
          }}
        >
          <TextInput
            placeholder="Age"
            style={styles.input}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(text) => setEmail_Address(text)}
          />
          <TextInput
            placeholder="Home Location"
            style={styles.input}
            onChangeText={(text) => setHome_Location(text)}
          />
        </View>
        <Button
          title="Sign Up"
          onPress={async () => {
            let res = await signUp({
              Name,
              Phone_Number,
              Age,
              Email_Address,
              Home_Location,
            })
            navigation.navigate('Home')
          }}
        />
      </View>
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
})

async function signUp({
  Name,
  Phone_Number,
  Age,
  Email_Address,
  Home_Location,
}) {
  let Wallet = 0
  let Rating = 0
  let No_of_Trips = 0
  //post request to backend
  const response = await fetch('http://192.168.49.169:3000/CustomerSignUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      hello: 11,
    },
    body: JSON.stringify({
      Age,
      Name,
      Wallet,
      Phone_Number,
      Email_Address,
      Rating,
      No_of_Trips,
      Home_Location,
    }),
  })
  const data = await response.json()
  return data
}
