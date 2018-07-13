import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Animated, TouchableHighlight} from 'react-native';
import Interactable from 'react-native-interactable';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Screen = Dimensions.get('window');

export default class TinderCard extends Component {
    constructor(props) {
        super(props);
        this._deltaX = new Animated.Value(0);
    }
    render() {
        return (
           <View style={{flex:1}}>
            <Header
        outerContainerStyles = {styles.header}
        leftComponent = {<Icon style={{paddingTop: 25}} name="md-person" size={30} color='#DADFE6'/>}

        centerComponent = {<Image style={{width: 30, height:30}} source={require('/Users/skylarbarrera/Dev/clean/Images/TinderIcon.png')}/>}
        rightComponent = {<Icon  style={{paddingTop: 25}} name="ios-chatbubbles" size={30} color='#DADFE6'/>}

        />

            <LinearGradient
        colors = {['#F4F5F8','#F4F5F8']}
        style = {styles.container}
    >
    <View style={styles.container}>

    <Interactable.View style={styles.container}
        horizontalOnly={true}
        snapPoints={[
                {x: 390},
        {x: 0, damping: 0.8},
        {x: -390}
    ]}
        animatedValueX={this._deltaX}>
    <Animated.View style={[styles.card, {
            transform: [{
                rotate: this._deltaX.interpolate({
                    inputRange: [-250, 0, 250],
                    outputRange: ['-10deg', '0deg', '10deg']
                })
            }]
        }]}>

    <Image style={styles.image} source={require('/Users/skylarbarrera/Dev/clean/Images/profile.jpg')} />

        <View style={styles.nameOverlay}>
        <Text style={styles.nameTextOverlay}> Skylar, 21 </Text>
        </View>

        <Animated.View style={[styles.overlay, {backgroundColor: '#de6d77'}, {
            opacity: this._deltaX.interpolate({
                inputRange: [-120, 0],
                outputRange: [0.8, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
            })
        }]}>
    <Icon  style= {{paddingTop: 5}}name="md-close" size={80} color='white'/>
        </Animated.View>

        <Animated.View style={[styles.overlay, {backgroundColor: '#2f9a5d'}, {
            opacity: this._deltaX.interpolate({
                inputRange: [0, 120],
                outputRange: [0, 0.8],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
            })
        }]}>
    <Icon  style= {{paddingTop: 5}}name="md-heart" size={80} color='white'/>
        </Animated.View>

        </Animated.View>
        </Interactable.View>

        <View style={{width: Screen.width-60, marginBottom: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableHighlight style={styles.interactButtonSmall}>
        <EntypoIcon  style= {{paddingTop: 5}}name="ccw" size={30} color='#FBB640'/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.interactButtonBig}>
    <Icon  style= {{paddingTop: 5}}name="md-close" size={40} color='#F8546D'/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.interactButtonSmall}>
    <Icon  style= {{paddingTop: 5}}name="md-star" size={40} color='#31AEE7'/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.interactButtonBig}>
    <Icon  style= {{paddingTop: 5}}name="md-heart" size={30} color='#46E3B0'/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.interactButtonSmall}>
    <Icon  style= {{paddingTop: 5}}name="md-close" size={40} color='#F8546D'/>
            </TouchableHighlight>
        </View>

        </View>
        </LinearGradient>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: Screen.width + 80,
        alignSelf: 'center',



    },
    header: {
        //alignItems: 'center',
        justifyContent: 'space-between',
        //flex:1,
        borderBottomWidth: 0,
        borderBottomColor: "#3E3E3E",
        backgroundColor: '#F4F5F8',
        paddingBottom: 10,
        paddingTop: 0,
        height: 60

    },
    card: {
        width: Screen.width - 40,
        marginHorizontal: 20,
        borderColor: 'white',
        borderWidth: 0,
        shadowRadius: 10,
        shadowOpacity: .5,

    },
    image: {
        width: Screen.width - 40 - 6,
        height: (Screen.width - 40 - 6)* 1.4,
        borderRadius:10
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 5,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    overlayText: {
        fontSize: 60,
        color: 'white'
    },
    text: {
        textAlign: 'center',
        marginTop: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#aaaaaa'
    },
    nameTextOverlay:{
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'

    },
    nameOverlay: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    interactButtonSmall:{
    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: "#FFFFFF",
    alignItems:  'center',
    justifyContent: 'center'

    },
    interactButtonBig:{
        width: 60,
        height: 60,
        borderRadius: 60/2,
        backgroundColor: "#FFFFFF",
        alignItems:  'center',
        justifyContent: 'center'

    }



});