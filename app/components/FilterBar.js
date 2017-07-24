import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.active !== r2.active});

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

class FilterBar extends Component {
  constructor(props) {
    super(props);
  }
  renderFilter(filter) {
    var filterBar = (
        <TouchableOpacity onPress={this.handleFilterClick.bind(this, filter)}>
            <Text style={{fontSize: 24, backgroundColor:(filter.active)?'blue':'grey', margin:5}}>{filter.tag}</Text>
      </TouchableOpacity>
    );
    return filterBar;
  }
  handleFilterClick(filter) {
    const newFilters = this.props.filters.map(f => {
      let copyF = {...f};
      if (copyF.tag === filter.tag) {
        copyF.active = !filter.active;
      }
      return copyF;
    });
    this.props.setFilters(newFilters)
    this.props.setFields(this.filteredFields(newFilters))
  }
  filteredFields(filters) {

    //Get filtered tags
    var selectedTags = [];

    filters.forEach((filter) => {
      if (filter.active) {
        selectedTags.push(filter.tag);
      }
    });

    const resultFields = this.props.fields.map(f => {
      var copyF = {...f};

      //Filter
      let intersectTags = f.tags.filter(t => selectedTags.contains(t))
      if(selectedTags.length!=0 && intersectTags.length!=0) {
        copyF.active = true
        return copyF
      } else {
        copyF.active = false
        return copyF
      }
    });

    return resultFields;
  }
  render() {
    return (
      <View style={styles.containerCenter}>
        <View style={styles.containerCenter}>
          <Text>Display Data For</Text>
          <View style={{height: 40, backgroundColor: 'steelblue'}}>
            <ListView
              style={{flexDirection:'row', flex:1, flexWrap:'wrap'}}
              horizontal={true}
              removeClippedSubviews={false}
              dataSource={ds2.cloneWithRows(this.props.filters)}
              renderRow={this.renderFilter.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  },
  container: {
    backgroundColor: '#e8edf3',
    padding: 8,
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8edf3',
    padding: 8,
  },
  textLarge: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 18
  },
  textNormal: {
    color: '#22264b',
    fontSize: 16
  },
  textSmall: {
    color: '#22264b',
    fontSize: 12
  },
})

module.exports = FilterBar;