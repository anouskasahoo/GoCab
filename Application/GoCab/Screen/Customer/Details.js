import { StatusBar } from 'expo-status-bar'
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from 'react-native'
import { useState } from 'react'

export default function CustomerDetails() {
  const [customerId, setCustomerId] = useState('')
  const [details, setDetails] = useState(null)
  const [addAmount, setAddAmount] = useState('')

  const fetchCustomer = async () => {
    try {
      let response = await fetch(`http://192.168.49.169:3000/CustomerDetails/${customerId}`)
      let json = await response.json()
      if (json.message === 'Customer not found') {
        Alert.alert('No such customer found.')
        setDetails(null)
      } else {
        setDetails(json)
      }
    } catch (e) {
      Alert.alert('Error fetching customer')
      console.error(e)
    }
  }

  const addMoney = async () => {
    try {
      let response = await fetch('http://192.168.49.169:3000/AddMoneyToWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Customer_id: customerId,
          Amount: parseFloat(addAmount),
        }),
      })
      let json = await response.json()
      Alert.alert('Success', 'Money added to wallet')
      fetchCustomer() // refresh wallet
    } catch (e) {
      Alert.alert('Error adding money')
      console.error(e)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.heading}>Customer Details</Text>
      <TextInput
        placeholder="Enter Customer ID"
        value={customerId}
        onChangeText={setCustomerId}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Get Details" onPress={fetchCustomer} />

      {details && (
        <View style={styles.detailsBox}>
          <Text style={styles.detail}>Name: {details.Name}</Text>
          <Text style={styles.detail}>Age: {details.Age}</Text>
          <Text style={styles.detail}>Email: {details.Email_Address}</Text>
          <Text style={styles.detail}>Phone: {details.Phone_Number}</Text>
          <Text style={styles.detail}>Home Location: {details.Home_Location}</Text>
          <Text style={styles.detail}>Rating: {details.Rating}</Text>
          <Text style={styles.detail}>No. of Trips: {details.No_of_Trips}</Text>
          <Text style={styles.detail}>Wallet: ₹{details.Wallet}</Text>

          <TextInput
            placeholder="Enter amount to add"
            value={addAmount}
            onChangeText={setAddAmount}
            style={styles.input}
            keyboardType="numeric"
          />
          <Button title="Add Money" onPress={addMoney} />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  detailsBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
})
