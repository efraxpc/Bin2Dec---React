import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: undefined,
      decimalNumber: undefined,
      errorMsg: undefined
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleConvertBinary2Decimal = this.handleConvertBinary2Decimal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  isArrayBool = (array) => {
    for (var i of array) {
      if (i !== "0" && i != "1") return false;
    }
    return true;
  }

  handleInputChange = async (event) => {
    this.setState({errorMsg: ""})
    event.preventDefault()
    const target = event.target;
    let value = target.value;
    const name = target.name;
    let inputArray = value.split('');
    const isArrayBool = this.isArrayBool(inputArray)

    if(value.length <= 8){
      await this.setState({
        [name]: value
      });
    }
    if(isArrayBool === false){
      this.setState({errorMsg: "ERROR, PLEASE INSERT A VALID BINARY NUMBER",number:'', decimalNumber:''})
    }
  }
  handleConvertBinary2Decimal = () => {
    const { number } = this.state
    let decimalNumber = 0;
    let bin = number
    for (var i = 0; i < bin.length; i++) {
      decimalNumber = decimalNumber + parseInt(bin[i]) * Math.pow(2, bin.length - 1 - i);
    }
    this.setState({ decimalNumber })
  }
  onSubmit = (e) =>{
    e.preventDefault()
    const { number, errorMsg, decimalNumber } = this.state
    this.setState({
      errorMsg: ''
    });
    if(number && errorMsg === ""){
      this.handleConvertBinary2Decimal()
    }
  }
  render() {
    const { number, decimalNumber, errorMsg } = this.state
    return <form onSubmit={this.onSubmit}>
      <label>
        Please insert a binary number: 
        <input
          name="number"
          type="number"
          value={number}
          onChange={this.handleInputChange} />
      </label>
      <p>
        {decimalNumber && `YOUR DECIMAL NUMBER IS: ${decimalNumber}`}
        {errorMsg}
      </p>
      <input type="submit" value="Submit" />
    </form>;
  }
}
export default Main