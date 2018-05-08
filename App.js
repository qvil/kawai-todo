import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";
import Todo from "./Todo";
import { PRIMARY_COLOR, GREY_COLOR } from "./constants";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedTodos: false,
    todos: {}
  };

  componentDidMount() {
    this._loadTodos();
  }

  _handleNewTodo = text => {
    this.setState({ newTodo: text });
  };

  _loadTodos = () => {
    this.setState({ loadedTodos: true });
  };

  _addTodo = () => {
    const { newTodo } = this.state;

    if (newTodo !== "") {
      this.setState(prevState => {
        const id = uuidv1();
        const newTodoObj = {
          [id]: {
            id,
            isCompleted: false,
            text: newTodo
          }
        };
        const newState = {
          ...prevState,
          todos: {
            ...prevState.todos,
            ...newTodoObj
          },
          newTodo: ""
        };
        return { ...newState };
      });
    } else {
    }
  };

  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos
      };
      return { ...newState };
    });
  };

  _toggleCompleteTodo = complete => id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: complete
          }
        }
      };
      return { ...newState };
    });
  };

  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            text
          }
        }
      };
      return { ...newState };
    });
  };

  render() {
    const {
      _handleNewTodo,
      _addTodo,
      _deleteTodo,
      _toggleCompleteTodo,
      _updateTodo
    } = this;
    const { newTodo, loadedTodos, todos } = this.state;

    console.log(todos);
    if (!loadedTodos) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai Todo</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newTodo}
            onChangeText={_handleNewTodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={_addTodo}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            {Object.values(todos).map(todo => (
              <Todo
                key={todo.id}
                {...todo}
                deleteTodo={_deleteTodo}
                toggleCompleteTodo={_toggleCompleteTodo}
                updateTodo={_updateTodo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
    // justifyContent: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 40,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 3
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: GREY_COLOR,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 1,
    fontSize: 25
  },
  todos: {
    alignItems: "center"
  }
});
