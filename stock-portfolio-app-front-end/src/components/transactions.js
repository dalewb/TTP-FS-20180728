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
      this.setState({
        transactions: json.data,
      })
    })
}

renderTransactions = () => {
  console.log('in renderTransactions');
  return this.state.transactions.map(trans => {
    return <p key={trans.id}>{trans.stock_id}</p>
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
