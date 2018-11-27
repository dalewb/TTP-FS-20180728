import React, { Component } from 'react';
import '../styles/transactions.css';

class Transactions extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],

    }
  }

// This is going to be a fetch to the backend for user's stocks info
componentDidMount() {
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

renderTransactions = () => {
  console.log('in renderTransactions, transactions are ', this.state.transactions);
  return this.state.transactions.map(trans => {
    return (
      <div key={trans.id} className="transaction-info">
        <p className="transaction-info__element_1">BUY</p>
        <p className="transaction-info__element_2">{trans.symbol}</p>
        <p className="transaction-info__element_3">{trans.number_of_shares} shares</p>
        <p className="transaction-info__element_4">@ ${parseFloat(trans.price).toFixed(2)}</p>
      </div>
    )
  })
}

  render() {
    return (
      <div>
        {this.renderTransactions()}
      </div>
    )
  }
}

export default Transactions;
