import {View, Text, StyleSheet, Image} from 'react-native';
import React, {Component} from 'react';
import CesarDate from '../helpers/CesarDate';
import CesarUserInfo from '../helpers/CesarUserInfo';

export default class UserHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cUser = CesarUserInfo.getInstance();
    return (
      <View style={landingstyles.pageHeader}>
        <View style={landingstyles.leftContainer}>
          <Image
            style={{width: 80, height: 80}}
            source={{
              uri: cUser.getPhoto(),
            }}
          />
        </View>
        <View style={landingstyles.rightContainer}>
          <Text style={landingstyles.messageText}>Hello {cUser.getName()}</Text>
          <Text style={landingstyles.messageText}>
            Today's date is {new CesarDate().getDisplayDate()}
          </Text>
        </View>
      </View>
    );
  }
}

const landingstyles = StyleSheet.create({
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
