import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {Component, Fragment} from 'react';
import {TextInput} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import UserHeader from '../components/UserHeader';
import CesarDate from '../helpers/CesarDate';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CesarFirestore from '../helpers/CesarFirestore';
import CesarUserInfo from '../helpers/CesarUserInfo';
import UserActions from '../components/UserActions';
import LoginController from '../LoginController';

export default class UserInfo extends Component {
  cUser = CesarUserInfo.getInstance();

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      selectedIndex: 2,
      availStatus: 'unreported',
    };
    this.updateIndex = this.updateIndex.bind(this);
    this.state.availStatus = this.cUser.getTuesdayAvailability();
  }

  updateStatus(availOOSStatus) {
    switch (availOOSStatus) {
      case 'AVAILABLE':
        this.state.availStatus = 'OUT_OF_SERVICE';
        this.setAvailability();
        break;
      case 'OUT_OF_SERVICE':
        this.state.availStatus = 'AVAILABLE';
        this.setAvailability();
        break;
      default:
    }
    // this.forceUpdate();
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
    switch (selectedIndex) {
      case 0:
        this.state.availStatus = 'AVAILABLE';
        this.setAvailability();
        break;
      case 1:
        this.state.availStatus = 'OUT_OF_SERVICE';
        this.setAvailability();
        break;
    }
    // this.forceUpdate();
  }

  setAvailability() {
    let cFS = CesarFirestore.getInstance();
    console.log('Change to ' + this.state.availStatus);
    cFS.saveAvailability(this.cUser, this.state.availStatus);
  }

  render() {
    const {selectedIndex} = this.state;
    if (!this.state.loggedIn) {
      return <LoginController />;
    }

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View>
              <UserHeader />
              <Text style={styles.sectionTitle}>
                Call Out Status
                <Text style={styles.sectionSubTitle}>(Tuesday - Monday):</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Reported status for
                {' ' + new CesarDate().getDisplayTuesday()}:
              </Text>
              <TextInput style={styles.sectionDescription}>
                Your status is {this.state.availStatus}:
              </TextInput>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={['Available', 'Out of Service']}
                containerStyle={{height: 50}}
              />
            </View>
            {this.state.availStatus == 'not_been_reported' ? (
              <View>
                <Text style={styles.messageText}>
                  You must enter your status for this week.
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Sign Out"
                    onPress={() => this.setState({loggedIn: false})}
                  />
                </View>
              </View>
            ) : (
              <UserActions />
            )}
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  messageText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '300',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
