# Functional Components


React works best when you're creating a ton of individual components. Without functional components as an option, you would need to create all of these components with ES6 classes and using the `this` keyword, like so:

```
class HelloWorld extends React.Component {
  render () {
    return (
      <div>Hello {this.props.name}</div>
    )
  }
}
```


But if all you need is a simple component that may/ may not take in props to render some UI, you can use `functional components` instead.


`functional components` are pretty much components as functions, instead of classes.

```
function HelloWorld (props) {
  return (
    <div>Hello {props.name}</div>
  )
}
```


## IN THE FUTURE....


Functional components take a bigger role when understanding `Hooks`. `Hooks` allow you to create functional components that create and manage their own state. This section will be updated when im ready to tackle on that concept.