import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class Todo extends React.Component {
  state = {
    isEditing: false,
    isCompleted: false
  };

  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };

  render() {
    const { _toggleComplete } = this;
    const { isCompleted } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={_toggleComplete}>
          <View style={styles.circle}>
            <View
              style={[
                styles.insideCircle,
                isCompleted ? styles.completedCircle : styles.uncompletedCirecle
              ]}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Todo</Text>
      </View>
    );
  }
}

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
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#f23657",
    borderWidth: 3,
    // backgroundColor: "red",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  completedCircle: {
    backgroundColor: "#fff"
  },
  uncompletedCirecle: {
    backgroundColor: "#f23657"
  },
  insideCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#f23657"
  }
});
