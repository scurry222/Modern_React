# PropTypes


Javascript has seven datatypes:

- Boolean
- Null
- Undefined
- Number
- String
- Symbol
- Object



`PropTypes` are used to type check props to make sure you're only passing in the correct type into your react function.

PropTypes will display an error to the console if it detects an incorrect type.


Example:

```
import React from 'react'
import PropTypes from 'prop-types'

export default function Hello ({ name }) {
  return <h1>Hello, {name}</h1>
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
}
```


`PropTypes` with a capital `P` is an object from the prop-types package, while `propTypes` with a lowercase `p` is the static property. In the line `name: PropTypes.string.isRequired`, we pretty much say whenever we use the `Hello` component, you have to pass a `name` prop that is of type `string`. The syntax is the same for class components, just add `propTypes` as a static property on the class.


```
<Hello name='Scout' /> // 👍

<Hello /> 
// Warning: Failed prop type: The prop `name` is marked as required in `Hello`, but its value is `undefined`.

<Hello name={true}/> 
// Warning: Failed prop type: Invalid prop `name` of type `boolean` supplied to `Hello`, expected `string`.
```


### PropTypes API

  - `PropTypes.isRequired`: By default, proptypes is optional. To raise errors if not passed, use this.

  - `PropTypes.any`: Passed in prop can be of any type.

  - `PropTypes.array`: Passed in prop must be an array.

  - `PropTypes.arrayOf`: Passed in prop must be an array of a certain type (Example: `PropTypes.arrayOf(PropTypes.string)`).

  - `PropTypes.bool`: Passed in prop must be a boolean.

  - `PropTypes.element`: Passed in prop must be a React Element. Example:

  ```
    ...

    Dashboard.propTypes = {
      header: PropTypes.element
    }

    <Dashboard header={<Navbar />} />
  ```

  - `PropTypes.exact`: Passed in prop must be an object with a specific 'shape'. Such as:
  
  ```
    ...

    Header.propTypes = {
      user: PropTypes.exact({
        name: PropTypes.string,
        age: PropTypes.number,
        submit: PropTypes.func,
      })
    }

    <Header
      user={{
        name: 'Scout',
        age: 21,
        submit: () => ({})
      }}
    />
  ```

  - `PropTypes.func`: Passed in prop must be a function.

  - `PropTypes.instanceOf`: Passed in prop must be an instance of a certain class.

  - `PropTypes.number`: Passed in prop must be a number.

  - `PropTypes.object`: Passed in prop must be an object.

  - `PropTypes.objectOf`: Passed in prop must be an object whose values are all of one type.

  - `PropTypes.oneOf`: Passed in prop must be one of a certain value, such as:

  ```
    ...

    List.propTypes = {
      order: PropTypes.oneOf(['ascending', 'descending'])
      items: PropTypes.array,
    }

    <List items={users} order='ascending' />
  ```

  - `PropTypes.oneOfType`: Passed in prop must be of one of the types specified, such as:

  ```
    ...

    Post.propTypes = {
      date: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.instanceOf(Date)
      ])
    }

    <Post date={new Date()} />
  ```

  - `PropTypes.shape`: Same as `exact`, except allows you to pass in extra properties.

  - `PropTypes.string`: Passed in prop must be a string.

  - `PropTypes.symbol`: Passed in prop must be a symbol.
