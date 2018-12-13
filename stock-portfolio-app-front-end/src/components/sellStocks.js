import React, { Component } from 'react';
import Modal from 'react-modal';
import '../styles/portfolio.css';

class SellStocks extends Component {
  state = {
    renderNumOfShares: false
  }

  getNumOfShares = () => {
    this.setState({
      renderNumOfShares: true
    })
  }

  getTransactions = () => {
    fetch('http://localhost:3000/api/v1/transactions/')
      .then(res => res.json())
      .then(json => console.log("Backend transactions are ", json.data))
  }

  renderNumOfSharesInput = () => {
    console.log("Rendering input");
    return (
      <form>
        <input
          type="number"
        />
      </form>
    )
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.getNumOfShares(this.props.stock)}
          className="stock-submitButton"
        >
          Sell
        </button>
        {this.state.renderNumShares && this.renderNumOfSharesInput()}
      </div>
    )
  }
}

export default SellStocks;
