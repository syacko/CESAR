import React, {Component, Fragment} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as firebase from 'react-native-firebase';
import CesarUserInfo from './helpers/CesarUserInfo';
import PageHeader from './components/PageHeader';
import CesarFirestore from './helpers/CesarFirestore';
import UserInfo from './pages/UserInfo';
import Loader from './components/Loader';

export default class LoginController extends Component {
  cUser = CesarUserInfo.getInstance();

  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
      loading: false,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '431970760733-qmgmkieshit1tqamgidb8652n1gp591v.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
    this.getCurrentUserInfo();
  }

  _signIn = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.user.email.includes('@cal-esar.org')) {
        this.setState({
          loading: true,
        });
        // Set the Google User information
        this.setUserInfo(userInfo);
        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          userInfo.idToken,
          userInfo.accessToken,
        );
        // login with credential
        const firebaseUserCredential = await firebase
          .auth()
          .signInWithCredential(credential);
        // Connect to the Firebase Firestore and store the connection
        CesarFirestore.setFirestore(firebase.firestore());
        let cFS = CesarFirestore.getInstance();
        cFS.saveLoginDetails(this.cUser);
        await cFS.readAvailability(this.cUser);
        this.setState({loggedIn: true});
      } else {
        Alert.alert('You must enter a valid email for CESAR.');
        this.cUser.clearUserInfo();
        this.signOut();
      }
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('You sign in to CESAR has been cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('CESAR is not available. Try back in 10 minutes.');
      } else {
        Alert.alert(
          'An unexpected error has occurred.  Please contact the Cal-esar email account. ERROR: ' +
            error.message,
        );
      }
    }
  };

  signOut = async () => {
    try {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      this.cUser.clearUserInfo();
      this.setState({loggedIn: false});
    } catch (error) {
      console.error(error);
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({loggedIn: false});
      } else {
        // some other error
        this.setState({loggedIn: false});
      }
    }
  };

  setUserInfo(userInfo) {
    this.cUser.setUserInfo(
      userInfo.user.id,
      userInfo.user.name,
      userInfo.user.givenName,
      userInfo.user.familyName,
      userInfo.user.email,
      userInfo.user.photo,
    );
  }

  render() {
    if (this.state.loggedIn) {
      return <UserInfo />;
    }

    if (!this.state.loggedIn) {
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
                <PageHeader />
                <View style={styles.body}>
                  <View style={styles.sectionContainer}>
                    <GoogleSigninButton
                      style={{width: 192, height: 48}}
                      size={GoogleSigninButton.Size.Wide}
                      color={GoogleSigninButton.Color.Dark}
                      onPress={this._signIn}
                      disabled={this.state.isSigninInProgress}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    {!this.state.loggedIn && (
                      <Text>You are currently logged out</Text>
                    )}
                    {this.state.loggedIn && (
                      <Button
                        onPress={this.signOut}
                        title="Signout"
                        color="#841584"
                      />
                    )}
                  </View>
                  <View>
                    <Loader loading={this.state.loading} />
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Fragment>
      );
    }
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
    marginTop: 32,
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
