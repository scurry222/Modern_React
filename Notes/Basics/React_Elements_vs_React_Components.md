# React Elements vs React Components


**Element**: 
- Describes what you see on the screen.
- An object representation of a DOM node.


In the bigger picture, React isn't the actual thing on the screen, but the object representation of it. This is so it can let JavaScript do what it does best, creating and destroying objects quickly. It also allows state to be changed quickly, with one comparison needed to see how the object changed since it was previously.

```
const element = React.createElement(
  'div',
  {id: 'login-btn'},
  'Login'
)
```

**createElement** takes tag name, attributes, and contents as arguments. The return of this object above looks like:

```
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```

And when rendered to the DOM, looks like:

```
<div id='login-btn'>Login</div>
```


**Components**:
- A function or class which optionally accepts input and returns a React element.

```
function Button ({ onLogin }) {
  return React.createElement(
    'div',
    {id: 'login-btn', onClick: onLogin},
    'Login'
  )
}
```

The method *onLogin* is called passed into the **button** component as a *prop*. It is then passed to *createElement* in the second argument, so that it can be accessed by the DOM.


You can also pass React components into the first argument of *createElement*. You can do this almost recursively - React will keep checking component after component until it reaches the baseline invocation. For example:

```
function Button ({ addFriend }) {
  return React.createElement(
    "button",
    { onClick: addFriend },
    "Add Friend"
  )
}

function User({ name, addFriend }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      null,
      name
    ),
    React.createElement(Button, { addFriend })
  )
}
```

Above will display a **User**'s object representation of the DOM , being a **div** with two children, a **p** tag that wraps the user's **name** and **Button** component. When React sees an element with a function or class type, it evaluates that component first to know what it returns (recursion FTW). The result is a full object representation of the DOM tree:

```
{
  type: 'div',
  props: {
    children: [
      {
        type: 'p',
        props: {
          children: 'Tyler McGinnis'
        }
      },
      {
        type: 'button',
        props: {
          onClick: addFriend,
          children: 'Add Friend'
        }
      }
    ]
  }
}
```

Important thing to note is even though most people use JSX rather than *createElement*, *JSX is always going to get compiled to React.createElement invocations via Babel.* Knowing this,

```
function Button ({ addFriend }) {
  return React.createElement(
    "button",
    { onClick: addFriend },
    "Add Friend"
  )
}

function User({ name, addFriend }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      null,
      name
    ),
    React.createElement(Button, { addFriend })
  )
}
```

Is the result of this JSX being compiled.

```
function Button ({ addFriend }) {
  return (
    <button onClick={addFriend}>Add Friend</button>
  )
}

function User ({ name, addFriend }) {
  return (
    <div>
      <p>{name}</p>
      <Button addFriend={addFriend}/>
    </div>
  )
}
```
