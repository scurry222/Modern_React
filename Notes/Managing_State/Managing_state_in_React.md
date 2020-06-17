# Managing State in React

One awesome thing about React is the ability for components to manage their own state. You don't have to keep track of the entire application's state in your head. Instead, you can just worry about individual components.


## Adding State

To add state, use the `constructor` ES6 method.

```
class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Tyler'
    }
  }
  render() {
    return (
      <h1>Hello, {this.state.name}</h1>
    )
  }
}
```

Yay, simple JavaScript! For brush up, `super` refers to the `constructor` method of the class you're extending, in this case `React.Component`. `this` will not work until `super` is called. Sometimes, it is needed to pass `props` to `super`.


Add state to the class component by using the `state` property. Use `this` to access the component's instance. Now, you can access `state` anywhere in the class!


## Updating State

First thought might be `this.state.name = 'California'`, but this is dangerous. Since React handles updating the DOM whenever state changes, if you change it directly like this, React won't catch it and won't be able to update the UI.


`setState` is React's helper method to register changes. It is accessed by `this`, meaning it works on the component's instance. The most popular example is when you pass an object in as argument and it merges with the current state:

```
updateName(newName) {
  this.setState({ 
    name: newName 
  })
}
```


React will first update the name property on the component's state. Then, It will re-invoke the `render` method and change the UI accordingly. Finally, React will update the DOM.

```
class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Tyler'
    }

    this.updateName = this.updateName.bind(this)
  }
  updateName() {
    this.setState({
      name: 'Mikenzi'
    })
  }
  render() {
    return (
      <React.Fragment>
        <h1>Hello, {this.state.name}</h1>
        <button onClick={this.updateName}>Change Name</button>
      </React.Fragment>
    )
  }
}
```

Again, we run into the odd `.bind` method. From back in the `this` notes, we use this to update the context in which the function is invoked. In this example, `updateName` is being invoked as a prop from `onClick`, which is not a typical object, so who knows what the original `this` is. So, we need to bring the context back to the current component.


An important reminder with the `setState` method, when you pass an object to it, the object will be merged to the current state instead of replacing it. This way you can have multiple properties be uneffected.


## Updating State II

The less popular way to use `setState` is to throw a function as it's first argument. The function will be passed to the current state and the returned object will be merged to the new state.

```
addFriend(newFriend) {
  this.setState((state) => {
    return {
      friends: state.friends.concat(newFriend)
    }
  })
}
```

In here, `addFriend` will take in `newFriend` and add it to `state.friends`.

You want to use this function `setState` when you want to update state based on previous state. In any other case, use the object `setState` way.

React keeps it this way so that updates can be asynchronous, and doesn't need another component's instance of state to update.
