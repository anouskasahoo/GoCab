// import { StatusBar } from 'expo-status-bar'
// import {
//   Alert,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
//   Modal,
// } from 'react-native'
// import { useState } from 'react'

// export default function DriverRideDetails({ navigation }) {
//   const [rideDetails, setRideDetails] = useState({})
//   const [Driver_Id, setDriver_Id] = useState('')
//   const [loaded, setLoaded] = useState(false)
//   const [ratingModalVisible, setRatingModalVisible] = useState(false)
//   const [givenRating, setGivenRating] = useState('')

//   const handleFetchRide = () => {
//     if (!Driver_Id) return alert('Please enter Driver ID')
//     fetchRideDetails({ Driver_Id }).then((data) => {
//       if (data.length === 0) {
//         alert('No rides found')
//         navigation.navigate('DHome')
//       } else {
//         setRideDetails(data[0])
//         setLoaded(true)
//       }
//     })
//   }

//   const handleCompleteRide = async () => {
//     if (!givenRating || isNaN(givenRating) || givenRating < 1 || givenRating > 5) {
//       alert('Please provide a rating between 1 and 5')
//       return
//     }

//     const res = await completeRide({
//       Ride_id: rideDetails.Ride_id,
//       Customer_id: rideDetails.Customer_Id,
//       Driver_id: rideDetails.Driver_Id,
//       Rating: parseFloat(givenRating),
//     })

//     if (res.success) {
//       const { prevTrips, prevRating, updatedTrips, updatedRating } = res

//       Alert.alert(
//         'Ride Completed',
//         `Customer Previous Trips: ${prevTrips}\nPrevious Rating: ${prevRating}\n\nUpdated Trips: ${updatedTrips}\nUpdated Rating: ${updatedRating.toFixed(
//           2
//         )}`,
//         [{ text: 'OK', onPress: () => navigation.navigate('DHome') }]
//       )
//     } else {
//       alert('Error completing ride')
//     }

//     setRatingModalVisible(false)
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Ride Details</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Driver ID"
//         value={Driver_Id}
//         onChangeText={setDriver_Id}
//         keyboardType="numeric"
//       />

//       <TouchableOpacity style={styles.button} onPress={handleFetchRide}>
//         <Text style={styles.buttonText}>Fetch Ride</Text>
//       </TouchableOpacity>

//       {loaded && (
//         <View style={styles.card}>
//           {Object.entries(rideDetails).map(([key, value]) => (
//             <View style={styles.row} key={key}>
//               <Text style={styles.label}>{key.replace('_', ' ')}:</Text>
//               <Text style={styles.value}>{value}</Text>
//             </View>
//           ))}

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: '#4CAF50' }]}
//             onPress={() => setRatingModalVisible(true)}
//           >
//             <Text style={styles.buttonText}>Complete Ride</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: '#f44336' }]}
//             onPress={() => {
//               cancelRide({ Ride_id: rideDetails.Ride_id }).then(() => {
//                 alert('Ride Cancelled')
//                 navigation.navigate('DHome')
//               })
//             }}
//           >
//             <Text style={styles.buttonText}>Cancel Ride</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Rating Modal */}
//       <Modal visible={ratingModalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalBox}>
//             <Text style={{ fontSize: 18, marginBottom: 10 }}>Rate the Customer (1-5):</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Rating"
//               keyboardType="decimal-pad"
//               value={givenRating}
//               onChangeText={setGivenRating}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleCompleteRide}>
//               <Text style={styles.buttonText}>Submit Rating</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
//   },
//   heading: { fontSize: 30, margin: 10 },
//   input: {
//     width: '70%', height: 40, borderWidth: 1, borderColor: '#ccc',
//     paddingHorizontal: 10, marginVertical: 10, borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#007bff', padding: 10, borderRadius: 10,
//     marginVertical: 10, width: '70%', alignItems: 'center',
//   },
//   buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
//   card: {
//     width: '80%', padding: 15, borderWidth: 1, borderRadius: 10,
//     marginTop: 20, backgroundColor: '#f9f9f9', elevation: 4,
//   },
//   row: { flexDirection: 'row', marginVertical: 5 },
//   label: { fontWeight: 'bold', width: '40%' },
//   value: { flex: 1 },
//   modalContainer: {
//     flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalBox: {
//     backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%',
//   },
// })

// async function fetchRideDetails({ Driver_Id }) {
//   const res = await fetch('http://192.168.49.169:3000/DriverCurrentRide', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ Driver_Id }),
//   })
//   return await res.json()
// }

// async function cancelRide({ Ride_id }) {
//   return await fetch('http://192.168.49.169:3000/CancelRideTransaction', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ Ride_id }),
//   })
// }

// async function completeRide({ Customer_id, Ride_id, Driver_id, Rating }) {
//   const res = await fetch('http://192.168.49.169:3000/RideCompletionTransaction', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ Customer_id, Ride_id, Driver_id, Rating }),
//   })
//   return await res.json()
// }
import { StatusBar } from 'expo-status-bar'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native'
import { useState } from 'react'

export default function DriverRideDetails({ navigation }) {
  const [rideDetails, setRideDetails] = useState({})
  const [Driver_Id, setDriver_Id] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [ratingModalVisible, setRatingModalVisible] = useState(false)
  const [givenRating, setGivenRating] = useState('')

  const handleFetchRide = () => {
    if (!Driver_Id) return alert('Please enter Driver ID')
    fetchRideDetails({ Driver_Id }).then((data) => {
      if (data.length === 0) {
        alert('No rides found')
        navigation.navigate('DHome')
      } else {
        setRideDetails(data[0])
        setLoaded(true)
      }
    })
  }

  const handleCompleteRide = async () => {
    if (!givenRating || isNaN(givenRating) || givenRating < 1 || givenRating > 5) {
      alert('Please provide a rating between 1 and 5')
      return
    }

    const res = await completeRide({
      Ride_id: rideDetails.Ride_id,
      Customer_id: rideDetails.Customer_Id,
      Driver_id: rideDetails.Driver_Id,
      Rating: parseFloat(givenRating),
    })

    if (res.success) {
      const { prevTrips, prevRating, updatedTrips, updatedRating } = res

      Alert.alert(
        'Ride Completed',
        `Customer Previous Trips: ${prevTrips}\nPrevious Rating: ${prevRating}\n\nUpdated Trips: ${updatedTrips}\nUpdated Rating: ${updatedRating.toFixed(
          2
        )}`,
        [{ text: 'OK', onPress: () => navigation.navigate('DHome') }]
      )
    } else {
      alert('Error completing ride')
    }

    setRatingModalVisible(false)
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Ride Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Driver ID"
          value={Driver_Id}
          onChangeText={setDriver_Id}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleFetchRide}>
          <Text style={styles.buttonText}>Fetch Ride</Text>
        </TouchableOpacity>

        {loaded && (
          <View style={styles.card}>
            {Object.entries(rideDetails).map(([key, value]) => (
              <View style={styles.row} key={key}>
                <Text style={styles.label}>{key.replace('_', ' ')}:</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4CAF50' }]}
              onPress={() => setRatingModalVisible(true)}
            >
              <Text style={styles.buttonText}>Complete Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#f44336' }]}
              onPress={() => {
                cancelRide({ Ride_id: rideDetails.Ride_id }).then(() => {
                  alert('Ride Cancelled')
                  navigation.navigate('DHome')
                })
              }}
            >
              <Text style={styles.buttonText}>Cancel Ride</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Rating Modal */}
      <Modal visible={ratingModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Rate the Customer (1-5):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Rating"
              keyboardType="decimal-pad"
              value={givenRating}
              onChangeText={setGivenRating}
            />
            <TouchableOpacity style={styles.button} onPress={handleCompleteRide}>
              <Text style={styles.buttonText}>Submit Rating</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    margin: 10,
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
})

async function fetchRideDetails({ Driver_Id }) {
  const res = await fetch('http://192.168.49.169:3000/DriverCurrentRide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Driver_Id }),
  })
  return await res.json()
}

async function cancelRide({ Ride_id }) {
  return await fetch('http://192.168.49.169:3000/CancelRideTransaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Ride_id }),
  })
}

async function completeRide({ Customer_id, Ride_id, Driver_id, Rating }) {
  const res = await fetch('http://192.168.49.169:3000/RideCompletionTransaction', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Customer_id, Ride_id, Driver_id, Rating }),
  })
  return await res.json()
}
