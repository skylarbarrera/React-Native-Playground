import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, TouchableHighlight, Slider, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/Entypo';




const Screen = Dimensions.get('window');


export default class RowActions1 extends Component {
    constructor(props) {
        super(props);
        this.username = "Unavailable";
        this.tweet = "tweety bird ya bish";
        this.state = {
            damping: 1-0.6,
            tension: 300
        };
    }
    render() {
        return (
            <View style={styles.container}>

    <Row damping={this.state.damping} tension={this.state.tension}>
    <View style={styles.rowContent}>
    <View style={styles.rowIcon} />
        <View>
        <Text style={styles.rowTitle}>{this.username}</Text>
        <Text style={styles.rowSubtitle}>{this.tweet}</Text>
        </View>
        </View>
        </Row>




        <View style={styles.playground}>
    <Text style={styles.playgroundLabel}>Change spring damping:</Text>
        <Slider
        key='damping'
        style={styles.slider}
        value={this.state.damping}
        minimumValue={0.1}
        maximumValue={0.6}
        minimumTrackTintColor={'#007AFF'}
        maximumTrackTintColor={'white'}
        thumbTintColor={'white'}
        onSlidingComplete={(value) => this.setState({damping: value})}
        />
        <Text style={styles.playgroundLabel}>Change spring tension:</Text>
        <Slider
        key='tension'
        style={styles.slider}
        value={this.state.tension}
        minimumValue={0.0}
        maximumValue={1000.0}
        minimumTrackTintColor={'#007AFF'}
        maximumTrackTintColor={'white'}
        thumbTintColor={'white'}
        onSlidingComplete={(value) => this.setState({tension: value})}
        />
        </View>

        </View>
    );
    }
}

class Row extends Component {
    constructor(props) {
        super(props);
        this._deltaX = new Animated.Value(0);
        this.state = {isMoving: false, position: 1};
    }
    render() {
        const activeOpacity = this.state.position !== 1 ? 0.5 : 1;
        return (
            <View style={{backgroundColor: '#262626'}}>

    <View style={{position: 'absolute', right: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>

        <TouchableOpacity style={[styles.button]} onPress={this.onButtonPress.bind(this, 'snooze')}>
    <Animated.View style={
            [styles.buttonImage, {
            opacity: this._deltaX.interpolate({
                inputRange: [-75, -50],
                outputRange: [1, 0],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
            }),
                transform: [{
                scale: this._deltaX.interpolate({
                    inputRange: [-75, -50],
                    outputRange: [1, 0.7],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                })
            }]
        }
    ]} >
    <Icon name="dots-three-horizontal" size={30} color="white" />
            </Animated.View>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', left: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
    <TouchableOpacity style={[styles.button]} onPress={this.onButtonPress.bind(this, 'done')}>
    <Animated.Image source={require('/Users/skylarbarrera/Dev/clean/Images/icon-clock.png')} style={
            [styles.buttonImage, {
            opacity: this._deltaX.interpolate({
                inputRange: [50, 75],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp'
            }),
                transform: [{
                scale: this._deltaX.interpolate({
                    inputRange: [50, 75],
                    outputRange: [0.7, 1],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                })
            }]
        }
    ]} />


            </TouchableOpacity>
            </View>

            <Interactable.View
        ref={el => this.interactableElem = el}
        horizontalOnly={true}
        snapPoints={[
                {x: 150, damping: 1-this.props.damping, tension: this.props.tension},
        {x: 0, damping: 1-this.props.damping, tension: this.props.tension},
        {x: -75, damping: 1-this.props.damping, tension: this.props.tension}
    ]}
        onSnap={this.onSnap.bind(this)}
        onDrag={this.onDrag.bind(this)}
        onStop={this.onStopMoving.bind(this)}
        dragToss={0.01}
        animatedValueX={this._deltaX}>
    <TouchableHighlight onPress={this.onRowPress.bind(this)} activeOpacity={activeOpacity} underlayColor={'#333333'}>
            <View style={{left: 0, right: 0, height: 75, backgroundColor: '#333333'}}>
        {this.props.children}
    </View>
        </TouchableHighlight>
        </Interactable.View>

        </View>
    );
    }
    onSnap({nativeEvent}) {
        const { index } = nativeEvent;
        this.setState({position: index});
    }
    onRowPress() {
        const { isMoving, position } = this.state;
        if (!isMoving && position !== 1) {
            this.interactableElem.snapTo({index: 1});
        }
    }
    onDrag({nativeEvent}) {
        const { state } = nativeEvent;
        if (state === 'start') {
            this.setState({isMoving: true});
        }
    }
    onStopMoving() {
        this.setState({isMoving: false});
    }
    onButtonPress(name) {
        alert(`Button ${name} pressed`);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#3E3E3E'
    },
    rowIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#73d4e3',
        margin: 20
    },
    rowTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    rowSubtitle: {
        fontSize: 18,
        color: 'gray'
    },
    button: {
        width: 75,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#333333"
    },
    buttonImage: {
        width: 40,
        height: 40
    },
    playground: {
        marginTop: Screen.height <= 500 ? 0 : 80,
        padding: 20,
        width: Screen.width - 40,
        backgroundColor: '#5894f3',
        alignItems: 'stretch',
        alignSelf: 'center'
    },
    playgroundLabel: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15
    },
    slider: {
        height: 40
    }
});
