import { TabNavigator } from 'react-navigation'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Tinder from "./Tinder";
import Tweetbot from "./Tweetbot";
import TweetbotProfile from "./TweetbotProfile";

import {Colors} from "./Themes";
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'transparent',
        position: 'absolute'



    }
})

const PrimaryNav = TabNavigator({

    TinderScreen: { screen: Tinder,
        icon: () => {return( <Icon name="rocket" size={ 30}/>

)}
    },
    TweetbotScreen: { screen: Tweetbot },
    TweetbotProfile: {screen: TweetbotProfile}



}, {
    // Default config for all screens
    initialRouteName: 'TweetbotProfile',
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
        tinColor: '#fff',
        activeTintColor: '#eee',
        inactiveTintColor: '#fff',
        showIcon: true,
        showLabel: true,
        lazyLoad: true,
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
        style: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',

            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0
        }
    }
});

export default PrimaryNav
