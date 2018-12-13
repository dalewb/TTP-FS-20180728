import React, { Component } from 'react';
import Modal from 'react-modal';
import '../styles/sellStocks.css';

class SellStocks extends Component {
  state = {
    renderModal: false,
    numberOfShares: 0,
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

  handleNumChange = (e) => {
    console.log("props are ", this.props);
    this.setState({
      numberOfShares: e.target.value,
    })
  }

  handleSellSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.numberOfShares)
    this.setState({
      renderModal: false
    })
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.getNumOfShares(this.props.stock)}
          className="button"
        >
          Sell
        </button>
        <Modal
          isOpen={this.state.renderModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal"
        >
        <div className="modal-contents">
          <h2>Hello</h2>
          <div>I am a modal</div>
          <form
            className="modal-contents__form"
            onSubmit={this.handleSellSubmit}
          >
            <input
              type="number"
              min={0}
              max={this.props.stock[1].totalShares}
              value={this.state.numberOfShares}
              onChange={this.handleNumChange}
              className="modal-contents__form-input"
            />
            <input type="submit" value="Sell" className="button"/>
          </form>
        </div>
        </Modal>
      </div>
    )
  }
}

export default SellStocks;
