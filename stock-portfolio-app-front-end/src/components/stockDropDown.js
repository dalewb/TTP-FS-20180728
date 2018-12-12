import React, { Component } from 'react';

class StockDropDown extends Component {
  constructor() {
    super()
  }

  render() {
    let stockNames = this.props.stockNames
    let stockOptions = stocks.map((stock) => {
      return (
        <option key=stock.name>{stock.name}</option>
      )
    })
    return (
      <div>
        <select>
          {stockOptions}
        </select>
      </div>
    )
  }

}

export default StockDropDown
