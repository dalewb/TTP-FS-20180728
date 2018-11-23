import React, { Component } from 'react';

class Transactions extends Component {
  constructor() {
    super()
    this.state = {
      stocks: {},
      searchSymbol: '',
    }
  }

  // This is going to be a fetch to the backend for user's stocks info
  componentDidMount() {
    fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl&types=quote')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          stocks: data
        })
      })
  }

  getStocks = () => {
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.searchSymbol}&types=quote`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          stocks: data
        })
      })
  }

  renderStocks = () => {
    console.log(this.state)
    return Object.entries(this.state.stocks).map(stock => {
      return (
        <div key={stock[1].quote.symbol}>
          <p>Symbol: {stock[1].quote.symbol}</p>
          <p>Open Price: ${stock[1].quote.open}</p>
          <p>Current Price: ${stock[1].quote.latestPrice}</p>
          <p>Price Difference: ${Math.round((stock[1].quote.latestPrice - stock[1].quote.open) * 100) / 100}</p>
        </div>
      )
    })
  }

  handleChange = (e) => {
    this.setState({
      searchSymbol: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.getStocks()
  }

  render() {
    return (
      <div>
        <p>Transactions Page</p>
        {this.renderStocks()}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchSymbol}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Transactions;
