import React, { Component } from 'react';

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
      <div key={trans.id}>
        <p>Stock: {trans.symbol}</p>
        <p>Price: {trans.price}</p>
        <p>Number of Shares: {trans.number_of_shares}</p>
        <p>Total Value: {trans.price * trans.number_of_shares}</p>
        <p>Time: {trans.updated_at}</p>
      </div>
    )
  })
}

  render() {
    return (
      <div>
        {this.renderTransactions()}
        <form>
          <input
            type="text"

          />
        </form>
      </div>
    )
  }
}

export default Transactions;
