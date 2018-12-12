import React, { Component } from 'react';
import '../styles/dropdown.css';

class StockDropDown extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let stockData = this.props.stockData
    let stockOptions = Object.keys(stockData).map((stockName) => {
      return (
        <option key={stockName}>{stockName}: {stockData[stockName]}</option>
      )
    })
    return (
      <div className="dropdown">
        <select>
          {stockOptions}
        </select>
      </div>
    )
  }

}

export default StockDropDown;
