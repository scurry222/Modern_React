## Variables in JSX

JSX expressions are wrapped in curly braces

```
render() {
  const name = 'Scout'

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Today is {new Date().toLocaleDateString()}</p>
      <p>What is 2 + 2? {2 + 2}</p>
    </div>
  )
}
```

## Rendering Nothing

To render nothing, return null

```
render() {
  if (isLoading() === true) {
    return null
  }

  return (
    ...
  )
}
```

## Conditional Rendering

render UI conditionally based on state is pretty important. Most frameworks have builtins to accomplish this, but React uses JavaScript whenever possible.

```
// Angular
<h1 *ngIf="authed; else elseBlock">Welcome back!</h1>
<ng-template #elseBlock><h1>Login to see your dashboard</h1></ng-template>

// Vue
<h1 v-if="authed">Welcome back!</h1>
<h1 v-else>Login to see your dashboard</h1>

// React
render() {
  const authed = isAuthed()

  if (authed === true) {
    return <h1>Welcome back!</h1>
  } else {
    return <h1>Login to see your dashboard</h1>
  }
}
```

With this being the case, we can add **else if**'s, use ternary operators, etc.

```
render() {
  return (
    <div>
      <Logo />
      {isAuthed() && user
        ? <h1>Welcome back!</h1>
        : <h1>Login to see your dashboard</h1>}
    </div>
  )
}
```

Adjacent JSX elements must be wrapped in a closing tag. You can only return one top level element from a component.

```
render() {
  const name = 'Scout'

  return (
    <h1>Hello, {name}</h1>
    <p>Today is {getDay()}</p>
    <p>What is 2 + 2? {2 + 2}</p>
  )
}

^-- Will not work --^

render() {
  const name = 'Scout'

  return (
    <React.Fragment>
      <h1>Hello, {name}</h1>
      <p>Today is {getDay()}</p>
      <p>What is 2 + 2? {2 + 2}</p>
    </React.Fragment>
  )
}

^-- This will --^
```

Use *React.Fragment* when you dont want to change the markup and add an extra *div* to make JSX happy.

The shorthand unreadable version of *React.Fragment* is just *<>*


## Capitalization

Always capitalize React components, it's the way react knows it's not just an HTML element.