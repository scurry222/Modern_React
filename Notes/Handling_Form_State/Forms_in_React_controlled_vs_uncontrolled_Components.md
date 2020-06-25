# Forms in React: Controlled vs Uncontrolled Components

## Controlled Components

**Controlled components** are when you do things the "React way"... keeping state in react components. **Uncontrolled components** are when you hold the state in the DOM, or the "historic stone-age way".


### Conceptual Example

Usually, when dealing with form state of the *input* field, you would just get it from the DOM. But if you do it through **controlled components**, the form state **is** the component's state, so the *input field* value is the component state's value.


### Actual Example


```
class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  handleSubmit() {
    alert('The email is ' + this.state.email)
  }
  render() {
    return (
      <div>
        <pre>The email is {this.state.email}</pre>
        <br />
        <input
          type='text'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}
```

The line `this.state.email` is how we grab the state in a controlled component. Since we're setting it to the `value` field in the `input`, we're basically letting React control what the value is.



## Uncontrolled Components


What we can do instead of having React control the value, is have it live inside the DOM. React has a method called `createRef` that can make a DOM node for the `input` that is accessable.
