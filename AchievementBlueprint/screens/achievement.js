import React, {Component} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import {ACHIEVEMENTS} from '../data';
import {Modal, Text, Button, withStyles, Avatar} from 'react-native-ui-kitten';
import moment from 'moment';
import propsConfig from './props.json'
let dm = Dimensions.get('screen');

class _Achievement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleAchievement: false,
      currentAchievement: '',
      count: 0,
      list: ACHIEVEMENTS,
      achievements: [
        {
          aId: 1,
          date: moment().subtract(5, 'days'),
        },
        {
          aId: 5,
          date: moment().subtract(5, 'days'),
        },
      ],
    };
  }

  static navigationOptions = {
    title: 'Achievements'.toUpperCase(),
  };

  renderAchievement = () => {
    const {icon, title, name, date} = this.state.currentAchievement;
    return (
      <View style={this.props.themedStyle.modalContainer}>
        <Avatar
          source={this.getImage(icon)}
          size="giant"
          style={{width: 100, height: 100}}
        />

        <Text style={{marginTop: 20}}>{name}</Text>

        <Text style={{marginVertical: 20}}>{title}</Text>

        <Button
          style={this.props.themedStyle.button}
          onPress={this.okHandler}
          status="danger">
          OK
        </Button>

        {this.state.achieved ? (
          <Text style={{marginVertical: 20}}>
            Achieved on {moment(this.state.achieved).format('MM/DD/YYYY')}
          </Text>
        ) : (
          <React.Fragment />
        )}
      </View>
    );
  };

  okHandler = () => {
    this.setState({
      visibleAchievement: false,
    });
  };

  clickAchievement = (item, exist) => {
    this.setState(
      {
        currentAchievement: item,
        achieved: exist && exist.date,
      },
      this.openAchievement,
    );
  };

  openAchievement = (item, exist) => {
    this.setState({
      visibleAchievement: true,
    });
  };

  getImage = id => {
    switch (id) {
      case 1:
        return require('../assets/001.png');
      case 2:
        return require('../assets/002.png');
      case 3:
        return require('../assets/003.png');
      case 4:
        return require('../assets/004.png');
      case 5:
        return require('../assets/005.png');
      case 6:
        return require('../assets/006.png');
      case 7:
        return require('../assets/007.png');
      case 8:
        return require('../assets/008.png');
      case 9:
        return require('../assets/009.png');
      case 10:
        return require('../assets/010.png');
      case 11:
        return require('../assets/011.png');
      case 12:
        return require('../assets/012.png');
      default:
        return require('../assets/012.png');
    }
  };

  render() {
    const {list} = this.state;
    let count = 0

    return (
      <ScrollView style={this.props.themedStyle.root}>
        <Modal
          visible={this.state.visibleAchievement}
          allowBackdrop={true}
          backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
          onBackdropPress={this.okHandler}>
          {this.renderAchievement()}
        </Modal>

        <View>
          <View>
            {list.map((row, i) => {
              if(count >= propsConfig.maxCount) return <React.Fragment />
              return (
                <View key={i} style={this.props.themedStyle.row}>
                  {row.map((item, j) => {
                    const exist = this.state.achievements.find(
                      a => a.aId === item.id,
                    );
                    if(count >= propsConfig.maxCount) return <React.Fragment />

                    count++
                    return (
                      <View key={j}>
                        <TouchableOpacity
                          style={
                            !exist
                              ? this.props.themedStyle.iconWrapper
                              : this.props.themedStyle.iconWrapperActive
                          }
                          onPress={this.clickAchievement.bind(
                            this,
                            item,
                            exist,
                          )}>
                          <Avatar
                            source={this.getImage(item.icon)}
                            size="giant"
                            style={{width: 60, height: 60}}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{textAlign: 'center', color: 'black'}}
                          note>
                          {item.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Achievement = withStyles(_Achievement, theme => ({
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },
  iconWrapperActive: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#99ccff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },
  icon: {
    color: '#007AFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#333c66',
    borderRadius: 8,
    padding: 10,
    width: dm.width * 0.8,
    margin: 10,
  },
  root:{
    backgroundColor: propsConfig.background,
  }
}));
