import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from './index';

class PlaceListItem extends React.Component {

  state = {
    width: 0,
    height: 0,
  }

  // componentDidMount() {
  //   Image.getSize(this.props.imageUrl, (width, height) => {
  //     const imageHeight =  250
  //     const scaleFactor = height / imageHeight
  //     const imageWidth = width / scaleFactor
  //     this.setState({width: imageWidth, height: imageHeight})
  //   })
  // }

  render() {
    const { width, height } = this.state
    return (
      <View style={styles.listContainer}>
        <Text style={styles.title}>
          {this.props.place.address}
        </Text>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#f50',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            height: 30
          }}
          onPress={this.props.onPress}
        >
          <Text
            style={{
              color: "#fff"
            }}
          >
            Navigate
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: 'rgba(0,0,0,.8)',
    fontWeight: '300',
    fontSize: 16,
    flex: 3,
  },
  listContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export { PlaceListItem };