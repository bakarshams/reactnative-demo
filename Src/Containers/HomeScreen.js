import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';

import PlaceCreateActions from '../Actions/PlaceCreateActions';
import { Button } from '../Components/Common';

const createPlaceMutation = gql`
mutation ($address: String!, $additionalInfo: String!, $imageUrl: String, $latitude: Float, $longitude: Float){
  createPlace(additionalInfo: $additionalInfo, imageUrl: $imageUrl, address: $address, latitude: $latitude, longitude: $longitude) {
    id
  }
}
`

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: null,
      placeDetails: null,
      region: {
        latitude: 31.5103737,
        longitude: 74.3523553,
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0092
      },
    };
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff' }} keyboardShouldPersistTaps='always'>
        <GooglePlacesAutocomplete
          placeholder='Search Place'
          minLength={2}
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed='auto'
          fetchDetails={true}
          renderDescription={row => row.description}
          onPress={(data, details = null) => {
            console.log(data, details);
            this.setState({
              placeName: data.description,
              placeDetails: details,
              region: {
                latitude: parseFloat(JSON.stringify(details.geometry.location.lat)),
                longitude: parseFloat(JSON.stringify(details.geometry.location.lng)),
                latitudeDelta: 0.0092,
                longitudeDelta: 0.0092
              }
            });
          }}
          getDefaultValue={() => ''}
          query={{
            key: 'AIzaSyCNOlrZLAsAkaXxXcdrJ1QZNAUUtFd8y3M',
            language: 'en'
          }}
          styles={{
            container: {
              backgroundColor: '#fff'
            },
            textInputContainer: {
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              paddingHorizontal: 10,
              paddingBottom: 5
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              minHeight: 36,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 1,
              borderColor: '#ccc',
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          GooglePlacesSearchQuery={{
            rankby: 'distance'
          }}
          debounce={200}
        />
        <View style={{ padding: 10 }}>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              region={this.state.region}
            >
              {
                this.state.placeName && this.state.placeDetails ?
                  <MapView.Marker
                    coordinate={{
                      latitude: this.state.placeDetails.geometry.location.lat,
                      longitude: this.state.placeDetails.geometry.location.lng
                    }}
                  />
                  : null
              }
            </MapView>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ color: '#f50' }}>{this.state.placeName}</Text>
          </View>
          {
            this.state.placeName && this.state.placeDetails ?
              <PlaceCreateActions
                onSubmit={(values) => {
                  this.props.createPlaceLoading(true);
                  this._createPlaceGQL(values.info);
                }}
              />
              : null
          }
          <Button
            onPress={() => {
              this.props.navigation.navigate('PlacesList');
            }}
          >
            Places List
      </Button>
        </View>
      </ScrollView>
    );
  }

  _createPlaceGQL = async (additionalInfo) => {
    const { placeName, placeDetails } = this.state;
    let url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=';
    if (placeDetails.photos && placeDetails.photos.length > 0) {
      let reference = placeDetails.photos["0"].photo_reference;
      url = url + reference + '&key=AIzaSyCNOlrZLAsAkaXxXcdrJ1QZNAUUtFd8y3M';
    } else {
      url = 'No image for this place';
    }
    await this.props.createPlaceMutation({
      variables: { address: placeName, additionalInfo, imageUrl: url, latitude: placeDetails.geometry.location.lat, longitude: placeDetails.geometry.location.lng }
    })
    this.props.createPlaceLoading(false);
    this.setState({ placeName: null, placeDetails: null });
    this.props.navigation.navigate('PlacesList');
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default graphql(createPlaceMutation, { name: 'createPlaceMutation' })(HomeScreen)