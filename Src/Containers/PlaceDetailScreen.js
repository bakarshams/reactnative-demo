import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

class PlaceDetailScreen extends Component {
  render() {
    const {
      place
    } = this.props.navigation.state.params;
    return (
      <ScrollView style={{ backgroundColor: '#fff', padding: 10 }}>
        <Text style={{ fontSize: 22, marginVertical: 10, color: '#f50' }}>{place.address}</Text>
        {
          place.imageUrl != 'No image for this place' ?
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: place.imageUrl }}
                style={{ flex: 1, height: 300, width: 500 }}
                resizeMode='contain'
              />
            </View>
            : null
        }
        <Text style={{ fontSize: 16 }}>{place.additionalInfo}</Text>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: place.latitude,
              longitude: place.longitude,
              latitudeDelta: 0.0092,
              longitudeDelta: 0.0092
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude
              }}
            />
          </MapView>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.07)',
    overflow: 'hidden',
    marginVertical: 10
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    marginBottom: 20
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
};

export default PlaceDetailScreen;
