import { StatusBar } from 'expo-status-bar';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';

export default function PastRides({ navigation }) {
  const [Customer_Id, setCustomer_Id] = useState('');
  const [analysis, setAnalysis] = useState([]);
  const [rating, setRating] = useState('');
  const [currentRide, setCurrentRide] = useState(null);

  // Fetch past rides data from API
  const fetchData = async () => {
    if (Customer_Id.trim() === '') {
      alert('Please enter a Customer ID');
      return;
    }

    const data = await getPastRides({ Customer_Id });
    if (data.length === 0) {
      alert('No past rides found');
      setAnalysis([]);
    } else {
      setAnalysis(data);
    }
  };

  // Handle Rating a Ride
  const handleRateRide = (rideId) => {
    setCurrentRide(rideId);
  };

  // Submit Rating to Backend and Show Detailed Response
  const submitRating = async (rideId) => {
    if (rating < 1 || rating > 5) {
      alert('Please enter a rating between 1 and 5');
      return;
    }

    try {
      const response = await fetch('http://192.168.49.169:3000/RateRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Ride_id: rideId,
          Rating: parseFloat(rating),
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          'Rating Submitted!',
          `✅ Driver ID: ${data.Driver_Id}\n⭐ Previous Rating: ${data.previousRating}\n🚗 Trips : ${data.previousTrips}\n🌟 New Rating: ${data.newRating}`
        );
        setRating('');
        setCurrentRide(null);
        fetchData();
      } else {
        alert('Failed to submit rating. Please try again.');
      }
    } catch (error) {
      alert('Error connecting to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 30, marginBottom: 10 }}>Past Rides</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Customer ID"
        value={Customer_Id}
        onChangeText={(text) => setCustomer_Id(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Fetch Past Rides</Text>
      </TouchableOpacity>

      <FlatList
        data={analysis}
        style={{ marginTop: 10, width: '100%' }}
        ListEmptyComponent={<Text>No data available</Text>}
        renderItem={({ item }) => (
          <View style={styles.rideCard}>
            <Text style={styles.rideDetail}>Source: {item.SourceName}</Text>
            <Text style={styles.rideDetail}>Destination: {item.DestinationName}</Text>
            <Text style={styles.rideDetail}>Cost: ${item.Cost}</Text>
            <Text style={styles.rideDetail}>Distance: {item.Distance} km</Text>
            <Text style={styles.rideDetail}>Status: {item.Status}</Text>

            {/* Rate Ride Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleRateRide(item.Ride_id)}
            >
              <Text style={styles.buttonText}>Rate Ride</Text>
            </TouchableOpacity>

            {/* Show rating input if this ride is selected */}
            {currentRide === item.Ride_id && (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Rating (1-5)"
                  value={rating}
                  onChangeText={(text) => setRating(text)}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => submitRating(item.Ride_id)}
                >
                  <Text style={styles.buttonText}>Submit Rating</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) =>
          `${item.Driver_Id || index}-${item.Ride_id || index}`
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  rideCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  rideDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

async function getPastRides({ Customer_Id }) {
  let response = await fetch('http://192.168.49.169:3000/ViewPastRides', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Customer_Id }),
  });

  let json = await response.json();
  return json;
}
