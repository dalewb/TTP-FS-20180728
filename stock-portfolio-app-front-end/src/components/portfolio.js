import React, { Component } from 'react';

class Portfolio extends Component {

  constructor() {
    super()
    this.state = {
      stocks: {},
      searchSymbol: '',
      numberOfShares: 0,
      currentPrice: 0,
      stockSymbol: '',
    }
  }

  // This is going to be a fetch to the backend for user's stocks info
  // componentDidMount() {
  //   fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl&types=quote')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //       this.setState({
  //         stocks: data,
  //       })
  //     })
  // }

  getStocks = () => {
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.searchSymbol}&types=quote`)
      .then(res => res.json())
      .then(data => {
        console.log('Data in fetch is ', data)
        this.setState({
          stocks: data,
          stockSymbol: Object.keys(data)[0]
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

  makePurchase = () => {
    const bodyData = JSON.stringify({
      symbol: this.state.stockSymbol,
      current_price: this.state.currentPrice
    })
    console.log("bodyData is ", bodyData);
    fetch("http://localhost:3000/api/v1/stocks/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        symbol: this.state.stockSymbol,
        current_price: this.state.currentPrice
      })
    })
      .then(res => res.json())
      .then(data => console.log("makePurchase data is ",data))
  }

  handleSearchChange = (e) => {
    this.setState({
      searchSymbol: e.target.value
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault()
    this.getStocks()
  }

  handleBuyChange = (e) => {
    this.setState({
      numberOfShares: e.target.value
    })
  }

  handleBuySubmit = (e) => {
    e.preventDefault()
    this.makePurchase()
  }

  render() {
    return (
      <div>
        <h3>Transactions Page</h3>
        {this.renderStocks()}
        <p>Search for a company</p>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            value={this.state.searchSymbol}
            onChange={this.handleSearchChange}
          />
          <input type="submit" value="Submit"/>
        </form>
        <p>Make a purchase</p>
        <form onSubmit={this.handleBuySubmit}>
          <input
            type="number"
            min={0}
            value={this.state.numberOfShares}
            onChange={this.handleBuyChange}
          />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default Portfolio;
