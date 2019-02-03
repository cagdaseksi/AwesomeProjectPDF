import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Text,
    Linking
} from 'react-native';

import Pdf from 'react-native-pdf';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            scale: 1,
            numberOfPages: 0,
            horizontal: false,
            width: WIN_WIDTH,
            link: '',
            video: 0
        };
        this.pdf = null;
    }

    prePage = () => {
        let prePage = this.state.page > 1 ? this.state.page - 1 : 1;
        this.setState({page: prePage});
        this.findLink(prePage)
        console.log(`prePage: ${prePage}`);
    };

    nextPage = () => {
        let nextPage = this.state.page + 1 > this.state.numberOfPages ? this.state.numberOfPages : this.state.page + 1;
        this.setState({page: nextPage});
        this.findLink(nextPage)
        console.log(`nextPage: ${nextPage}`);
    };

    zoomOut = () => {
        let scale = this.state.scale > 1 ? this.state.scale / 1.2 : 1;
        this.setState({scale: scale});
        console.log(`zoomOut scale: ${scale}`);
    };

    zoomIn = () => {
        let scale = this.state.scale * 1.2;
        scale = scale > 3 ? 3 : scale;
        this.setState({scale: scale});
        console.log(`zoomIn scale: ${scale}`);
    };

    findLink = (index) => {
        var numbers = [
            { page: 0, link : 'http://samples.leanpub.com' },
            { page: 1, link : 'https://google.com' },
            { page: 2, link : 'http://samples.leanpub.com' },
            { page: 3, link : 'https://google.com' },
            { page: 4, link : 'http://samples.leanpub.com' }
        ];
        console.log(`findLink: ${index}`);
        console.log(`text: ${numbers[index]}`);
        var text = `${numbers[index]}` != 'undefined' ? `${numbers[index].link}` : ''
        console.log(`text: ${text}`);
        this.setState({link: text});

    };

    switchHorizontal = () => {
        this.setState({horizontal: !this.state.horizontal, page: this.state.page});
    };

    render() {
        let source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
        //let source = require('./test.pdf');  // ios only
        //let source = {uri:'bundle-assets://test.pdf'};

        //let source = {uri:'file:///sdcard/test.pdf'};
        //let source = {uri:"data:application/pdf;base64,"};

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', height:30, marginTop: 21}}>
                    <TouchableHighlight disabled={this.state.page === 1}
                                        style={this.state.page === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.prePage()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>Page {this.state.page}</Text></View>
                    <TouchableHighlight disabled={this.state.page === this.state.numberOfPages}
                                        style={this.state.page === this.state.numberOfPages ? styles.btnDisable : styles.btn}
                                        onPress={() => this.nextPage()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.scale === 1}
                                        style={this.state.scale === 1 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomOut()}>
                        <Text style={styles.btnText}>{'-'}</Text>
                    </TouchableHighlight>
                    <View style={styles.btnText}><Text style={styles.btnText}>Scale</Text></View>
                    <TouchableHighlight disabled={this.state.scale >= 3}
                                        style={this.state.scale >= 3 ? styles.btnDisable : styles.btn}
                                        onPress={() => this.zoomIn()}>
                        <Text style={styles.btnText}>{'+'}</Text>
                    </TouchableHighlight>
                    {/* <View style={styles.btnText}><Text style={styles.btnText}>{!this.state.horizontal ? (<Text style={styles.btnText}>{'Yatay'}</Text>) : (
                            <Text style={styles.btnText}>{'Dikey'}</Text>)}</Text></View> */}
                    <TouchableHighlight style={styles.btn} onPress={() => this.switchHorizontal()}>
                        {!this.state.horizontal ? (<Text style={styles.btnText}>{'Yatay'}</Text>) : (
                            <Text style={styles.btnText}>{'Dikey'}</Text>)}
                    </TouchableHighlight>
                    <TouchableHighlight disabled={this.state.link == ''} style={ this.state.link == '' ? styles.btnDisable : styles.btn} onPress={ ()=>{ 
                        Linking.openURL(this.state.link)}} >
                        <Text style={styles.btnText}>{'Video'}</Text>
                    </TouchableHighlight>
                </View>
                <View style={{flex:1,width: this.state.width}}>
                    <Pdf ref={(pdf) => {
                        this.pdf = pdf;
                    }}
                         source={source}
                         page={this.state.page}
                         scale={this.state.scale}
                         horizontal={this.state.horizontal}
                         onLoadComplete={(numberOfPages, filePath,{width,height},tableContents) => {
                             this.state.numberOfPages = numberOfPages; //do not use setState, it will cause re-render
                             console.log(`total page count: ${numberOfPages}`);
                             console.log(tableContents);

                         }}
                         onPageChanged={(page, numberOfPages) => {
                             this.state.page = page; //do not use setState, it will cause re-render
                             console.log(`current page: ${page}`);
                             //this.setState({page: page});
                         }}
                         onError={(error) => {
                             console.log(error);
                         }}
                         style={{flex:1}}
                         />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: '#f8f8f8'
    },
    btn: {
        margin: 2,
        padding: 2,
        backgroundColor: "aqua",
    },
    btnDisable: {
        margin: 2,
        padding: 2,
        backgroundColor: "gray",
    },
    btnText: {
        margin: 2,
        padding: 2,
    }
});