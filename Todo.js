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
import PropTypes from "prop-types";
import { PRIMARY_COLOR, GREY_COLOR } from "./constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: GREY_COLOR,
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
    color: GREY_COLOR,
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
    borderColor: GREY_COLOR
  },
  uncompletedCircle: {
    borderColor: PRIMARY_COLOR
  },
  completedInsideCircle: {
    backgroundColor: GREY_COLOR
  },
  uncompletedInsideCircle: {
    backgroundColor: "#fff"
  },
  insideCircle: {
    width: 20,
    height: 20,
    borderRadius: 10
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
    // marginVertical: 20,
    width: width / 2
  }
});

export default class Todo extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    toggleCompleteTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
  };

  state = {
    isEditing: false,
    todoValue: ""
  };

  _toggleComplete = () => {
    const { id, isCompleted, toggleCompleteTodo } = this.props;

    toggleCompleteTodo(!isCompleted)(id);
  };

  _startEditing = () => {
    const { text } = this.props;
    this.setState({ isEditing: true, todoValue: text });
  };

  _finishEditing = () => {
    const { id, updateTodo } = this.props;
    const { todoValue } = this.state;

    updateTodo(id, todoValue);
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
    const { isEditing, todoValue } = this.state;
    const { text, id, deleteTodo, isCompleted } = this.props;
    const rightButtons = [
      <TouchableOpacity
        style={styles.swipeButtons}
        onPressOut={() => deleteTodo(id)}
      >
        <MaterialIcons
          style={styles.deleteButton}
          name="delete"
          size={32}
          color="white"
        />
      </TouchableOpacity>
    ];

    return (
      <Swipeable rightButtons={rightButtons}>
        <View style={styles.container}>
          <TouchableOpacity onPress={_toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            >
              <View
                style={[
                  styles.insideCircle,
                  isCompleted
                    ? styles.completedInsideCircle
                    : styles.uncompletedInsideCircle
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
