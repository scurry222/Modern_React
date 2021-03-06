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



# Understanding "this" in Javascript


## Why is 'this' needed???

*"this" keyword allows you to decide which object should be focal when invoking a function or a method.*

The most important question to ask yourself when using **this** is *"Where is this function being invoked?"*


Example:

```
function greet (name) {
  alert(`Hello, my name is ${name}`)
}
```

In order to know what *name* is, you have to look at the function invocation:

```
greet('Scout')
```

This gives a good idea what **this** is referencing, but theres a lot more to it. There are 5 guidelines to follow:

- Implicit Binding
- Explicit Binding
- New Binding
- Lexical Binding
- Window Binding


## Implicit Binding

*Look to the left of the dot when the function is invoked.* It's simple!

```
user.greet()
```

This would make the **user** object what is referenced as **this** if called. If you have two objects that your extracting, this still applies - such as in the case:

```
user.father.greet()
```

**this** will reference *father* instead of *user*.


## Explicit Binding

Lets say the *greet* function was a standalone function, not a method on the *user* object, such as in this example:

```
function greet () {
  alert(`Hello, my name is ${this.name}`)
}

const user = {
  name: 'Scout',
  age: 21,
}
```

Now we can't look to the left of the dot... because it's not in the form *user.greet()* anymore. So instead we can use the **call** method from JavaScript.


*'call' is a method on every function that allows you to invoke the function specifying in what context the function will be invoked.*


So instead of *user.greet()* we would use *greet.call(user)*.

The first argument to *call* would be the **this** context, and subsequent arguments to *call* will be passed to the function as arguments.

```
greet.call(user, languages[0], languages[1], languages[2])
```


Mostly, you wouldn't want to pass all the elements of a list individually, which is what **apply** is good for.

```
// greet.call(user, languages[0], languages[1], languages[2])
greet.apply(user, languages)
```


If you want to use *call* but don't want your function to be immediately invoked, use **bind**.

```
const newFn = greet.bind(user, languages[0], languages[1], languages[2])
newFn() // alerts "Hello, my name is Scout and I know JavaScript, Python, and C"
```


## new Binding

When making a new object, the **this** keyword will be applied to the new object.

```
function User (name, age) {
  /*
    Under the hood, JavaScript creates a new object called `this`
    which delegates to the User's prototype on failed lookups. If a
    function is called with the new keyword, then it's this new object that interpreter created that the this keyword is referencing.
  */

  this.name = name
  this.age = age
}

const me = new User('Scout', 21)
```


## Lexical Binding

Let's have *languages* and *greet* in the same object:

```
const user = {
  name: 'Scout',
  age: 21,
  languages: ['JavaScript', 'C', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce(function (str, lang, i) {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }

      return `${str} ${lang},`
    }.bind(this), "")

    alert(hello + langs)
  }
}
```


We're using *reduce* so that we can remove the hard-coding of three direct arguments going into the function, better for expandability.

If the *.bind(this), "")* line wasn't there, *this.languages* would be undefined. this is because it is not referencing *user* properly, and since the function is being passed to *.reduce*, we dont know where the function is being invoked. Since its difficult to find **this** in anonymous functions (e.g this implementation of *reduce*), we will need to specify the context of *user* at the end of the function. Using *.bind*, we can do just that, and when the next step of the execution context begins(the inside of the anonymous function), it will have the proper **this**.


Or... We can just use arrow functions...


Since arrows don't have their own **this**, **this** is determined by normal variable lookup rules.


```
const user = {
  name: 'Scout',
  age: 21,
  languages: ['JavaScript', 'C', 'Python'],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`

    const langs = this.languages.reduce((str, lang, i) => {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`
      }

      return `${str} ${lang},`
    }, "")

    alert(hello + langs)
  }
}
```

Arrows determine their **this** **lexically**, meaning it just looks at whatever it's parent specified as **this** and uses that.


## window Binding

We have this bit of code:


```
function sayAge () {
  console.log(`My age is ${this.age}`)
}

const user = {
  name: 'Scout',
  age: 21
}
```

When you don't add the above examples of either *.call*, *.bind*, *.apply*, or *new*, JavaScript will default to referencing the *window* object as it's context. So in order for this to work, you would have to add an attribute to the window:

```
window.age = 21
```

This is very gnarly however and should be avoided at all costs.


There is a "strict mode" you can enable in ES5, which turns off the ability to do this. probably for the best in most cases.


Here's the order of finding **this**:


1. Look to where the function was invoked.

2. Is there an object to the left of the dot? If so, that’s what the “this” keyword is referencing. If not, continue to #3.

3. Was the function invoked with “call”, “apply”, or “bind”? If so, it’ll explicitly state what the “this” keyword is referencing. If not, continue to #4.

4. Was the function invoked using the “new” keyword? If so, the “this” keyword is referencing the newly created object that was made by the JavaScript interpreter. If not, continue to #5.

5. Is “this” inside of an arrow function? If so, its reference may be found lexically in the enclosing (parent) scope. If not, continue to #6.

6. Are you in “strict mode”? If yes, the “this” keyword is undefined. If not, continue to #7.

7. JavaScript is weird. “this” is referencing the “window” object.
