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
      transactions: [],
      currentValue: '',
      currentPortfolio: {},
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

  componentDidMount = () => {
    this.getTransactions()
    this.getPortfolioValue()
    this.timer = setInterval(() => this.getPortfolioValue(), 5000)
  }

  componentWillUnmount= () => {
    clearInterval(this.timer)
  }

  getTransactions = () => {
    fetch('http://localhost:3000/api/v1/transactions/')
      .then(res => res.json())
      .then(json => {
        const transactions = json.data.filter(transaction => {
          return transaction.user_id === JSON.parse(sessionStorage.getItem('user')).id
        })
        this.setState({
          transactions,
        })
      })
  }

  getAllStocks = () => {
    let stocks = {}
    this.state.transactions.forEach(transaction => {
      stocks[transaction.symbol] += transaction.price
    })
  }

  renderAllStocks = (currentPortfolio) => {
    return Object.entries(currentPortfolio).map(stock => {
      return (
        <div key={stock[0]}>
          <p>{stock[0]}</p>
          <p>{stock[1].totalShares} shares</p>
          <p>${(stock[1].price * stock[1].totalShares).toFixed(2)}</p>
        </div>
      )
    })
  }

  getAllPrices = (symbols, json) => {
    let currentPortfolio = {}
    let totalPrice = 0
    if (symbols.length > 0) {
      this.state.transactions.forEach(transaction => {
        totalPrice += (json[transaction.symbol].quote.latestPrice * transaction.number_of_shares)
        if (currentPortfolio[transaction.symbol]) {
          currentPortfolio[transaction.symbol] = {
            totalShares: currentPortfolio[transaction.symbol].totalShares + transaction.number_of_shares,
            price: json[transaction.symbol].quote.latestPrice
          }
        } else {
          currentPortfolio[transaction.symbol] = {
            totalShares: transaction.number_of_shares,
            price: json[transaction.symbol].quote.latestPrice
          }
        }
      })
    }
    this.setState({
      currentValue: totalPrice.toFixed(2),
      currentPortfolio,
    })
  }

  getCurrentPrice = (symbols) => {
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols.join(',')}&types=quote`)
      .then(res => res.json())
      .then(json => this.getAllPrices(symbols, json))
  }

  getPortfolioValue = () => {
    // const user = JSON.parse(sessionStorage.getItem('user'))
    console.log("Transactions are ", this.state.transactions)
    let symbols = []
    this.state.transactions.forEach(transaction => {
      symbols.push(transaction.symbol)
    })
    this.getCurrentPrice(symbols)
  }

  getStocks = () => {
    fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.searchSymbol}&types=quote`)
      .then(res => res.json())
      .then(data => {
        console.log('Data in fetch is ',data)
        if (Object.keys(data).length > 0) {
          console.log("valid")
          this.setState({
            stocks: data,
            stockSymbol: Object.keys(data)[0],
            currentPrice: Object.values(data)[0].quote.latestPrice,
            errors: '',
          })
        } else {
          this.setState({
            errors: "Invalid Ticker Symbol"
          })
        }
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
    }, this.getTransactions())
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
      symbol: this.state.stockSymbol,
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
        <p>Buy Stock</p>
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
        <button onClick={this.getPortfolioValue}>Get Current Portfolio Value</button>
        <p>${this.state.currentValue}</p>
        <p>All Stocks:</p>
        {this.renderAllStocks(this.state.currentPortfolio)}
      </div>
    )
  }
}

export default Portfolio;
