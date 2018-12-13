import React, { Component } from 'react';
import Modal from 'react-modal';
import '../styles/sellStocks.css';

class SellStocks extends Component {
  state = {
    renderModal: false
  }

  getNumOfShares = () => {
    this.setState({
      renderModal: true
    })
  }

  getTransactions = () => {
    fetch('http://localhost:3000/api/v1/transactions/')
      .then(res => res.json())
      .then(json => console.log("Backend transactions are ", json.data))
  }

  closeModal = () => {
    this.setState({
      renderModal: false
    })
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.getNumOfShares(this.props.stock)}
          className="sell-button"
        >
          Sell
        </button>
        <Modal
          isOpen={this.state.renderModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <h2>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default SellStocks;
