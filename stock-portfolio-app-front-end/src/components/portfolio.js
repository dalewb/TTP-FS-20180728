import React, { Component } from 'react';
import '../styles/portfolio.css';

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

  componentDidMount = () => {
    this.getTransactions()
    setTimeout(() => this.getPortfolioValue(), 100)
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
          numberOfShares: 0,
          searchSymbol: '',
        }, this.getPortfolioValue())
      })
  }

  getAllStocks = () => {
    let stocks = {}
    this.state.transactions.forEach(transaction => {
      stocks[transaction.symbol] += transaction.price
    })
  }

  getStockColor = (first, second) => {
    let renderColor = "black"
    if (first < second) {
      renderColor = "green"
    } else if (first > second) {
      renderColor = "red"
    } else {
      renderColor = "grey"
    }
    return renderColor
  }

  renderAllStocks = (currentPortfolio) => {
    return Object.entries(currentPortfolio).map(stock => {
      let renderColor = this.getStockColor(stock[1].openPrice, stock[1].price)
      console.log("Open price: ", stock[1].openPrice)
      console.log("Price: ", stock[1].price)
      console.log("Render color: ", renderColor)
      console.log("---------------");
      return (
        <div key={stock[0]} className="stock-info__container">
          <div className="stock-info">
            <p className="stock-info__element" style={{color: renderColor}}>{stock[0]}</p>
            <p className="stock-info__element">{stock[1].totalShares} shares</p>
            <p className="stock-info__element" style={{color: renderColor}}>${(stock[1].price * stock[1].totalShares).toFixed(2)}</p>
          </div>
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
            price: json[transaction.symbol].quote.latestPrice,
            openPrice: json[transaction.symbol].quote.open
          }
        } else {
          currentPortfolio[transaction.symbol] = {
            totalShares: transaction.number_of_shares,
            price: json[transaction.symbol].quote.latestPrice,
            openPrice: json[transaction.symbol].quote.open
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

  getSymbols = () => {
    let symbols = []
    this.state.transactions.forEach(transaction => {
      symbols.push(transaction.symbol)
    })
    if (this.state.stockSymbol) {
      symbols.push(this.state.stockSymbol)
    }
    return symbols
  }

  getPortfolioValue = () => {
    this.getCurrentPrice(this.getSymbols())
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
    return Object.entries(this.state.stocks).map(stock => {
      let renderColor = this.getStockColor(stock[1].quote.open, stock[1].quote.latestPrice)
      return (
        <div key={stock[1].quote.symbol} className="stock-portfolio__stocks">
          <p className="stock-portfolio__stocks-element">Symbol: {stock[1].quote.symbol}</p>
          <p className="stock-portfolio__stocks-element">Open Price: ${stock[1].quote.open}</p>
          <p className="stock-portfolio__stocks-element">Current Price: ${stock[1].quote.latestPrice}</p>
          <p className="stock-portfolio__stocks-element" style={{color: renderColor}}>Price Difference: ${(stock[1].quote.latestPrice - stock[1].quote.open).toFixed(2)}</p>
        </div>
      )
    })
  }

  updateUser = (json) => {
    sessionStorage.setItem("user", JSON.stringify(json.data))
    this.setState({
      user: JSON.parse(sessionStorage.getItem("user")),
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
      console.log(this.state.user)
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
      .then(json => this.changeUserAccount(transactionCost))
  }

  makePurchase = () => {
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
      .then(json => this.createTransaction(json.data))
  }

  handleSearchChange = (e) => {
    this.setState({
      searchSymbol: e.target.value
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault()
    if (this.state.searchSymbol) {
      this.setState({
        errors: ''
      })
      this.getStocks()
    } else {
      this.setState({
        errors: "Please enter a ticker symbol"
      })
    }
  }

  handleBuyChange = (e) => {
    this.setState({
      numberOfShares: e.target.value,
      errors: ''
    })
  }

  handleBuySubmit = (e) => {
    e.preventDefault()
    if (this.state.numberOfShares > 0 && this.state.stockSymbol) {
      this.setState({
        errors: '',
      })
      this.makePurchase()
    } else if (this.state.numberOfShares < 1) {
      this.setState({
        errors: "You must buy at least 1 share"
      })
    } else if (!this.state.searchSymbol) {
      this.setState({
        errors: "Please search for a company"
      })
    }
  }

  getPortfolioDelta = () => {
    let renderColor = this.getStockColor((5000 - this.state.user.account), this.state.currentValue)
    let delta = (this.state.currentValue - (5000 - this.state.user.account)).toFixed(2)
    if (this.state.currentValue)  {
      return <span style={{color: renderColor}}>${delta}</span>
    }
  }

  render() {
    return (
      <div>
        <h2 className="stock-portfolio__heading">Portfolio:  {this.state.currentValue ? <span>{"$" + this.state.currentValue}</span> : null}</h2>
        <div className="stock-portfolio__container">
          <div className="stock-portfolio__search">
            <h3 className="stock-portfolio__heading">Account: ${parseInt(this.state.user.account).toFixed(2)}</h3>
            <div>{this.renderStocks()}</div>
            <form onSubmit={this.handleSearchSubmit}>
              <label className="stock-portfolio__label">Search for a company</label>
              <input
                type="text"
                value={this.state.searchSymbol}
                onChange={this.handleSearchChange}
                className="stock-portfolio__input"
              />
            <input type="submit" value="Search" className="stock-submitButton"/>
            </form>
            <form onSubmit={this.handleBuySubmit} className="stock-portfolio__form">
              <label className="stock-portfolio__label">Number of Shares: </label>
                <input
                  type="number"
                  min={0}
                  value={this.state.numberOfShares}
                  onChange={this.handleBuyChange}
                  className="stock-portfolio__input"
                />
              <input type="submit" value="Buy" className="stock-submitButton"/>
            </form>
            {this.state.errors.length > 0 && <p className="transaction__error-message">{this.state.errors}</p>}
          </div>
          <div className="stock-portfolio__display">
            <h3>Portfolio Delta: {this.getPortfolioDelta()}</h3>
            {this.renderAllStocks(this.state.currentPortfolio)}
          </div>
        </div>
      </div>
    )
  }
}

export default Portfolio;
