import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
  TextInput
} from "react-native";
import Swipeable from "react-native-swipeable";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "./constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: PRIMARY_COLOR,
    borderWidth: 3,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  completedCircle: {
    backgroundColor: PRIMARY_COLOR
  },
  uncompletedCirecle: {
    backgroundColor: "#fff"
  },
  insideCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR
  },
  swipeButtons: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR
  },
  deleteButton: {
    color: "white",
    fontWeight: "400",
    paddingLeft: 20
  },
  input: {
    marginVertical: 20,
    width: width / 2
  }
});

const rightButtons = [
  <TouchableOpacity style={styles.swipeButtons}>
    {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
    <MaterialIcons
      style={styles.deleteButton}
      name="delete"
      size={32}
      color="white"
    />
    {/* <Text style={styles.deleteButton}>Delete</Text> */}
  </TouchableOpacity>
];

export default class Todo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false,
    todoValue: ""
  };

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };

  _startEditing = () => {
    const { text } = this.props;
    this.setState({ isEditing: true, todoValue: text });
  };

  _finishEditing = () => {
    this.setState({ isEditing: false });
  };

  _controllInput = text => {
    this.setState({ todoValue: text });
  };

  render() {
    const {
      _toggleComplete,
      _controllInput,
      _startEditing,
      _finishEditing
    } = this;
    const { isEditing, isCompleted, todoValue } = this.state;
    const { text } = this.props;

    return (
      <Swipeable rightButtons={rightButtons}>
        <View style={styles.container}>
          <TouchableOpacity onPress={_toggleComplete}>
            <View style={styles.circle}>
              <View
                style={[
                  styles.insideCircle,
                  isCompleted
                    ? styles.completedCircle
                    : styles.uncompletedCirecle
                ]}
              />
            </View>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.input,
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              value={todoValue}
              onChangeText={_controllInput}
              multiline={true}
              returnKeyType={"done"}
              onBlur={_finishEditing}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText
              ]}
              onPress={_startEditing}
            >
              {text}
            </Text>
          )}
        </View>
      </Swipeable>
    );
  }
}
