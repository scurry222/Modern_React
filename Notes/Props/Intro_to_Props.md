# Introduction to Props

Whenever you have components that require variables to be evaluated, such as in functions like:

```
function getProfilePic (username) {
  return 'https://photo.fb.com/' + username
}

function getProfileLink (username) {
  return 'https://www.fb.com/' + username
}

function getAvatarInfo (username) {
  return {
    pic: getProfilePic(username),
    link: getProfileLink(username)
  }
}

getAvatarInfo('scurry')
```

It is important to have *username* composed outside of this function, just as it's important to have arguments to functions.


*Props are to components what arguments are to functions.*


## Passing data to a component


Is as easy as:

```
<img src='' />

<Hello name='Scout' />
```

## Accessing props

Class components in React have a **props** key that can be accessed within the class with *this*.

```
class Hello extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )
  }
}
```

Remember that you have to actually *pass* a prop to the component... or it'll just be an empty object :p


You can pass anything you want to components as props: strings, functions, HTML tags, boolean values, etc.


If you pass a prop without a value, it will evaluate to *true*. These are equivelent:

```
<Profile authed={true} />

<Profile authed />
```