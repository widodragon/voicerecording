import React, {Component} from 'react';
import {DeviceEventEmitter, ScrollView, StyleSheet, View} from 'react-native';
import voiceChanger from 'react-native-voice-changer';
import {AudioUtils} from 'react-native-audio';
import Ads from '../utils/Data';
import effects from '../assets/effects';
import EffectItem from '../components/ListItem';
import {hp} from '../utils/Responsive';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob';
import Setting from '../utils/Colors';
import {connect} from 'react-redux';
import {addClickToGlobal} from '../redux/actions/rootAction';

class Effects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingIndex: null,
      adsData: null,
    };
  }

  componentDidMount() {
    this.initMedia();
    this._checkEnableAdmob();
    this.mediaPlayerListner = DeviceEventEmitter.addListener(
      'onMediaCompletion',
      () => this.setState({playingIndex: null}),
    );
  }

  componentWillUnmount() {
    this.mediaPlayerListner.remove();
    if (this.state.adsData && this.state.adsData.isEnable) {
      if (this.props.numClick === 1) {
        AdMobInterstitial.setAdUnitID(this.state.adsData.interestitial);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
      } else if (this.props.numClick === 3) {
        addClickToGlobal({
          ...this.props,
          body: 1,
        });
        AdMobInterstitial.setAdUnitID(this.state.adsData.interestitial);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
      }
    }
  }

  _checkEnableAdmob = async () => {
    try {
      let data = await fetch(Ads.url);
      if (data) {
        let result = await data.json();
        if (result) {
          this.setState({adsData: result});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  initMedia = () => {
    voiceChanger.setPath(AudioUtils.DocumentDirectoryPath + '/record.wav');
    voiceChanger.createDBMedia();
    effects.forEach(e => voiceChanger.insertEffect(JSON.stringify(e)));
  };

  render() {
    const {playingIndex} = this.state;

    return (
      <View style={styles.container}>
        {this.state.adsData && this.state.adsData.isEnable ? (
          <View
            style={{
              bottom: 0,
              left: 0,
              right: 0,
              height: 'auto',
              zIndex: 1000,
            }}>
            <AdMobBanner
              adSize="smartBannerLandscape"
              adUnitID={this.state.adsData.banner}
              onAdFailedToLoad={error => console.error(error)}
            />
          </View>
        ) : null}
        <ScrollView style={styles.scrollContainer}>
          {effects.map((effect, idx) => {
            return (
              <EffectItem
                key={idx}
                onPlay={() => {
                  voiceChanger.playEffect(idx);
                  this.setState({playingIndex: idx});
                }}
                onSave={() => {
                  voiceChanger.saveEffect(idx).then(path => {
                    console.log('Saved to: ', path);
                    /* Do something with your saved file */
                  });
                }}
                playingIndex={playingIndex}
                idx={idx}
                effect={effect}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Setting.primary,
  },
  scrollContainer: {
    marginTop: hp(1),
    height: '80%',
    width: '95%',
  },
});

const mapStateToProps = state => {
  let {rootReducer} = state;
  return {
    ...rootReducer,
  };
};
export default connect(mapStateToProps)(Effects);
