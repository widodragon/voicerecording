import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {hp} from '../utils/Responsive';
import * as Animatable from 'react-native-animatable';
import Setting from '../utils/Colors';
import {CommonActions} from '@react-navigation/native';

const Splash = props => {
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setTimeout(() => {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'record'}],
        });
        props.navigation.dispatch(resetAction);
      }, 2000);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);

  return (
    <View style={style.container}>
      <Animatable.View animation="jello" iterationCount={2}>
        <Image
          source={require('../assets/img/logo.png')}
          style={{width: hp(50), height: hp(50)}}
          resizeMode="center"
        />
      </Animatable.View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Setting.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
