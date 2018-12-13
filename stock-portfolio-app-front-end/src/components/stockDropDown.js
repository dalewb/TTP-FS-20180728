import React, { Component } from 'react';
import '../styles/dropdown.css';

class StockDropDown extends Component {

  render() {
    let stockData = this.props.stockData
    let stockOptions = Object.keys(stockData).map((stockName) => {
      return (
        <option key={stockName} className="dropdown__option">{stockName}: {stockData[stockName].split(".")[0]}</option>
      )
    })
    return (
      <form
        className="dropdown"
      >
        <select
          className="dropdown__select"
          onChange={this.props.onChange}
        >
          {stockOptions}
        </select>
      </form>
    )
  }

}

export default StockDropDown;
