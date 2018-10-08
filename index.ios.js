/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class SampleAppMovies extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      selectedTab: 'home'
    };
    // this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    // this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded: true
        });
      });
  }
  render() {
    return (
      <TabNavigator>  
        <TabNavigator.Item  
          selected={this.state.selectedTab === 'home'}  
          title="Home"  
          renderIcon={() => <Image style={styles.icon} source={require("./res/images/ic_polular.png")} />}  
          renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]} source={require("./res/images/ic_polular.png")} />}  
          badgeText='1'
          onPress={() => this.setState({ selectedTab: 'home' })}>  
            <View style={styles.page1}></View>
        </TabNavigator.Item>  
        <TabNavigator.Item  
          selected={this.state.selectedTab === 'profile'}  
          title="Profile"  
          renderIcon={() => <Image style={styles.icon} source={require("./res/images/ic_trending.png")} />}  
          renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]} source={require("./res/images/ic_trending.png")} />}  
          // badgeText='1'
          onPress={() => this.setState({ selectedTab: 'profile' })}>  
            <View style={styles.page2}></View>
        </TabNavigator.Item>  
        <TabNavigator.Item  
          selected={this.state.selectedTab === 'computer'}  
          title="Computer"  
          renderIcon={() => <Image style={styles.icon} source={require("./res/images/ic_computer.png")} />}  
          renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]} source={require("./res/images/ic_computer.png")} />}  
          // badgeText='1'
          onPress={() => this.setState({ selectedTab: 'computer' })}>  
            <View style={styles.page3}></View>
        </TabNavigator.Item>  
        <TabNavigator.Item  
          selected={this.state.selectedTab === 'my'}  
          title="My"  
          renderIcon={() => <Image style={styles.icon} source={require("./res/images/ic_my.png")} />}  
          renderSelectedIcon={() => <Image style={[styles.icon, {tintColor: 'red'}]} source={require("./res/images/ic_my.png")} />}  
          // badgeText='1'
          onPress={() => this.setState({ selectedTab: 'my' })}>  
            <View style={styles.page4}></View>
        </TabNavigator.Item> 
      </TabNavigator>
    )
  }
  renderLoadingView() {
    return(
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    )
  }
  renderMovie({ item }) {
    // console.log(item);
    return(
      <View style={styles.container}>
        <Image 
          source={{ uri: item.posters.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  },
  icon: {
    height: 22,
    width: 22
  },
  page1: {
    flex: 1,
    backgroundColor: 'red'
  },
  page2: {
    flex: 1,
    backgroundColor: 'blue'
  },
  page3: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  page4: {
    flex: 1,
    backgroundColor: 'green'
  },
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
