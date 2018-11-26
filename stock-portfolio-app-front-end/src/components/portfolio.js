import React, { Component } from 'react';

class Portfolio extends Component {

  constructor() {
    super()
    this.state = {
      user: JSON.parse(sessionStorage.getItem("user")),
      stocks: {},
      searchSymbol: '',
      numberOfShares: 0,
      currentPrice: 0,
      stockSymbol: '',
      errors: ''
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
          stockSymbol: Object.keys(data)[0],
          currentPrice: Object.values(data)[0].quote.latestPrice,
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

  updateUser = (json) => {
    sessionStorage.setItem("user", JSON.stringify(json.data))
    this.setState({
      user: JSON.parse(sessionStorage.getItem("user"))
    })
  }

  changeUserAccount = (amount) => {
    const bodyData = JSON.stringify({
      account: (this.state.user.account - amount)
    })
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: bodyData
    })
      .then(res => res.json())
      .then(json => this.updateUser(json))
  }

  createTransaction = (data) => {
    const transactionCost = data.current_price * this.state.numberOfShares
    if (this.state.user.account < transactionCost) {
      alert("You do not have enough money in your account for this transaction")
      return
    }
    const bodyData = JSON.stringify({
      user_id: this.state.user.id,
      stock_id: data.id,
      price: data.current_price,
      number_of_shares: this.state.numberOfShares,
    })
    fetch("http://localhost:3000/api/v1/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: bodyData
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.changeUserAccount(transactionCost))
  }

  makePurchase = () => {
    // debugger
    const bodyData = JSON.stringify({
      symbol: this.state.stockSymbol,
      current_price: this.state.currentPrice
    })
    fetch("http://localhost:3000/api/v1/stocks/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: bodyData
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.createTransaction(json.data))
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
      numberOfShares: e.target.value,
      errors: ''
    })
  }

  handleBuySubmit = (e) => {
    e.preventDefault()
    if (this.state.numberOfShares > 0) {
      this.setState({
        errors: ''
      })
      this.makePurchase()
    } else {
      this.setState({
        errors: "You must buy at least 1 share"
      })
    }
  }

  render() {
    return (
      <div>
        <h3>Portfolio</h3>
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
          <label>
            Number of Shares:
            <input
              type="number"
              min={0}
              value={this.state.numberOfShares}
              onChange={this.handleBuyChange}
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        {this.state.errors.length > 0 && <p>{this.state.errors}</p>}
        {console.log(this.state.user)}
      </div>
    )
  }
}

export default Portfolio;
