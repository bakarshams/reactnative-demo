import { StackNavigator } from 'react-navigation';

import HomeActions from './Actions/HomeActions';
import PlaceListScreen from './Containers/PlaceListScreen';
import PlaceDetailScreen from './Containers/PlaceDetailScreen';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeActions,
    navigationOptions: {
      headerTitle: 'Home Page',
      headerBackTitle: null,
      headerTintColor: '#333'
    },
  },
  PlacesList: {
    screen: PlaceListScreen,
    navigationOptions: {
      headerTitle: 'Place Listing',
      headerBackTitle: null,
      headerTintColor: '#333'
    },
  },
  PlaceDetail: {
    screen: PlaceDetailScreen,
    navigationOptions: {
      headerTitle: 'Place Detail',
      headerBackTitle: null,
      headerTintColor: '#333'
    },
  }
}, {
    initialRouteName: 'Home'
  }
);

export default RootNavigator;