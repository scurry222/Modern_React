# PropTypes


Javascript has `seven` datatypes:

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