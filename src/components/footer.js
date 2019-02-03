import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    textStyle: {
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold'
    },
    viewStyle: {
        backgroundColor: '#f8f8f8',
        height:70,
        justifyContent:'center',
        textAlign:'center',
        marginTop:100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,

        elevation: 7,
    }
});

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{this.props.text}</Text>
      </View>
    );
  }
}

// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => LotsOfStyles);