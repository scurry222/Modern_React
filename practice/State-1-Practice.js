class Container extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        mode: 'light' 
      }
      this.handleLightMode = this.handleLightMode.bind(this)
      this.handleDarkMode = this.handleDarkMode.bind(this)

    }
    handleLightMode() {
      // Change 'mode' on the component's state to 'light'
      this.setState({
          mode: 'light'
      })
    }
    handleDarkMode() {
      // Change 'mode' on the component's state to 'dark'
      this.setState({
          mode: 'dark'
      })
    }
    render() {
      const { mode } = this.state
      
      return (
        <div style={{
          height: '100%',
          background: mode === 'light' ? '#fff' : '#000'
        }}>
          {mode === 'light'
            ? <button onClick={this.handleDarkMode}>Dark Mode</button>
            : <button onClick={this.handleLightMode}>Light Mode</button>}
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <Container />,
    document.getElementById('app')
  );