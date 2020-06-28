# The Component Lifecycle


Components in React have a ton of different responsibilities. This includes [managing state](../Managing_State/README.md), recieving data via [props](../Props/README.md), and most importantly, descibe UI. However, you will need to ask your components to handle ajax requests, set/remove listeners, and react to new props to make a truly dynamic application.


The component lifecycle can be broken down into three steps:

- `mounting`: When the component is added to the DOM.

- `updating`: When the component updates its state or recieves new data through props.

- `unmounting`: When the component gets removed from the DOM.



## 1. Mounting


In order, here's the most common responsibilities of components in a typical application:

- Setting initial state

- Rendering a DOM node

- Making an Ajax request

- Setting up listeners (i.e. via websockets or Firebase)


Let's use this list to look at lifecycle methods that will accomplish each one.


### Set the component's initial state


The `constructor` method should be the first method invoked. Constructors are an ES6 class spec that's not React specific.


```
class Hello extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Scout'
    }
  }
  render() {
    return (
      <h1>Hello, {this.state.name}</h1>
    )
  }
}
```


### Rendering a DOM node


`Render` is the next method that describes the DOM node using JSX.

`Render` is a pure function - it shouldnt do anything either than examine the component's state and props to return a description of the UI.

```
    class Badge extends React.Component {
    render() {
        return (
        <React.Fragment>
            <h1>{this.props.name}</h1>
            <p>{this.props.profile}</h1>
        </React.Fragment>
        )
    }
    }
```


### Making an Ajax request


To use Ajax with React, use the lifecycle method `componentDidMount`. This method is only invoked once when the component is mounted to the DOM, so it's a great place for Ajax requests.

```
    class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        user: null
        }
    }
    componentDidMount() {
        fetchUser(this.props.username)
        .then((user) => {
            this.setState({ user })
        })
    }
    render() {
        if (user === null) {
        return <Loading />
        }

        return <Dashboard data={this.state.user} />
    }
    }
```


### Setting up listeners


`componentDidMount` is also a good place to put set up listeners for the same reason, since we only want the listener after the component is mounted.



## 2. Updating


Same with mounting, there are a list of common examples of when to hook into a component for updating state or recieving new data via props.


- Re-render the UI with the updated state or props
- Re-fetching data
- Re-setting a listener


### Re-rendering


It's important to know that the `render` method is invoked when the component's state changes or it recieves new/updated props, not just when the it is first added to the DOM. *Your view is a function of your State,* So you don't have to worry about updating manually - only *how* your state and props are updating.


### Re-fetching Data


With `ComponentDidMount`, it is invoked once right after the component is mounted. If you want to re-fetch data without re-mounting the component, use `componentDidUpdate`.

`componentDidUpdate` is invoked after the component's local state changes or it recieves new props, but not invoked in the initial render. The two arguments passed to it are the previous props and state of the component for comparisons with the new.


Here's the example from [Github Battle](../../github-battle) - We use the Github API to fetch the popular repositories for the passed in language (at `props.language`). We make the initial request inside `componentDidMount`, then anytime `props.language` changes we want to re-fetch the popular repos. This would be a perfect case for `componentDidUpdate`.


```
    class Repos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        repos: null
        }
    }
    componentDidMount() {
        fetchRepos(this.props.language)
        .then((repos) => {
            this.setState({ repos })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
        this.setState({repos: null})

        fetchRepos(this.props.language)
            .then((repos) => {
            this.setState({ repos })
            })
        }
    }
    render() {
        if (this.state.repos === null) {
        return <Loading />
        }

        return <Grid data={this.state.repos} />
    }
    }
```

### Re-setting a Listener


Same as re-fetching, re-set a listener within the `componentDidUpdate` lifecycle method.



## Unmounting


`Unmounting` is important when you set up listeners or ajax requests, to prevent memory leaks. React has the `componentWillUnmount` method to invoke your wrapping up code when the component is about to be removed from the DOM.



## Overview


```
    class App extends React.Component {
        constructor(props) {
            // Good for establishing the initial state of a component
            super(props)
            this.state = {}
        }
        componentDidMount(){
            // Invoked once the component is mounted to the DOM.
            // Good for making AJAX requests.
        }
        componentDidUpdate(){
            // Invoked immediately after updating occurs.
            // Good for AJAX requests based on changing props or DOM operations.
        }
        componentWillUnmount(){
            // Called right before a component is unmounted.
            // Good for cleaning up listeners.
        }
        render() {
            return ...
        }
    }
```


## Advanced lifecycle methods


There's a small list of other lifecycle methods that can be used, that are rare:

- `getDerivedStateFromProps`

- `shouldComponentUpdate`

- `getSnapshotBeforeUpdate`



# React Icons


React has it's own icons to use, in the NPM package `react-icons`. This include all icons available in Font Awesome, Ionicons, Material Design, Github Octicons and more!


## Importing 


```
// Font Awesome
import { FaIconName } from 'react-icons/fa'

// Material Design
import { MdIconName } from 'react-icons/md'

// Ionicons
import { IoIconName } from 'react-icons/io'

// Github Octicons
import { GoIconName } from 'react-icons/go'
```


The main 3 props you’ll use to customize each icon are `size`, `color`, and `className`.

`size` is an integer and allows you to change the size of the icon. `color` is a string and allows you to set the color of the icon. `className` is a string and allows you to apply a CSS class to the `svg` element that is rendered.