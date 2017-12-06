import React from 'react';
// import Post from './Post'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  View,
  TouchableHighlight,
  ListView,
  Modal,
  StyleSheet,
  Text
} from 'react-native';

import { PlaceListItem, Spinner, Button } from '../Components/Common';

const allPlacesQuery = gql`
  query ($limit: Int, $offset: Int) {
    allPlaces (
      first: $limit
      skip: $offset
    ) {
      id
      address
      additionalInfo
      imageUrl
      latitude
      longitude
    }
  }`


class PlaceListScreen extends React.Component {

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      limit: 5,
      offset: 0
    }
    props.allPlacesQuery.refetch();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.allPlacesQuery, 'sadasdasd');
    if (!nextProps.allPlacesQuery.loading && !nextProps.allPlacesQuery.error) {
      debugger;
      console.log(nextProps.allPlacesQuery.allPlaces);
      const { dataSource } = this.state;
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allPlacesQuery.allPlaces),
      })
    }
  }

  render() {
    if (this.props.allPlacesQuery.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(place) => (
            <PlaceListItem
              place={place}
              key={place.id}
              onPress={() => {
                this.props.navigation.navigate('PlaceDetail', { place: place });
              }}
            />
          )}
        />
        <Button
          onPress={() => {
            this._fetchPlaces(7, 0);
          }}
        >
          Next
        </Button>
      </View>
    )
  }

  _fetchPlaces = async (limit, offset) => {
    await this.props.allPlacesQuery({
      variables: { limit: limit, offset: offset }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0
  },
  createPostButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostButton: {
    backgroundColor: 'rgba(39,174,96,1)',
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
    height: 60,
    width: 480,
    paddingTop: 18,
  }
})

export default graphql(allPlacesQuery, { name: 'allPlacesQuery' })(PlaceListScreen)

