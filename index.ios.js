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
  FlatList
} from 'react-native';

var MOCKED_MOVIES_DATA = [
  {
    title: "标题",
    year: "2015",
    posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
  }
];
var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class SampleAppMovies extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
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
    if(!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <FlatList 
        data={this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
      />
    );
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
  }
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
