import {View, Text, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';
import CesarDate from '../helpers/CesarDate';

export default class PageHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={pageHeader.pageHeader}>
        <View style={pageHeader.leftContainer}>
          <Image source={require('../assets/icon/calesar-white-80x80.png')} />
        </View>
        <View style={pageHeader.rightContainer}>
          <Text style={pageHeader.messageText}>Welcome to CESAR</Text>
          <Text style={pageHeader.messageText}>
            Today's date is {new CesarDate().getDisplayDate()}
          </Text>
        </View>
      </View>
    );
  }
}

const pageHeader = StyleSheet.create({
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 2,
    flexDirection: 'column',
    paddingTop: 10,
  },
  pageHeader: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  messageText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    paddingBottom: 10,
    paddingLeft: 5,
  },
  messageTextSmall: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black',
    paddingBottom: 10,
    alignItems: 'center',
  },
});
