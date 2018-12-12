import React, { Component } from 'react';
import '../styles/dropdown.css';

class StockDropDown extends Component {

  render() {
    let stockData = this.props.stockData
    let stockOptions = Object.keys(stockData).map((stockName) => {
      return (
        <option key={stockName} className="dropdown__option">{stockName}: {stockData[stockName]}</option>
      )
    })
    return (
      <div className="dropdown">
        <select className="dropdown__select">
          {stockOptions}
        </select>
      </div>
    )
  }

}

export default StockDropDown;
