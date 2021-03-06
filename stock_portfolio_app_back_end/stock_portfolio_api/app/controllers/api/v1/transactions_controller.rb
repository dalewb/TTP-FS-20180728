class Api::V1::TransactionsController < ApplicationController
  def index
    transactions = Transaction.all
    render json: {status: 'SUCCESS', message: 'Loaded transactions', data: transactions}, status: :ok
  end

  def show
    transaction = Transaction.find(params[:id])
    render json: {status: 'SUCCESS', message: 'Loaded transaction', data: transaction}, status: :ok
  end

  def create
    transaction = Transaction.new(transaction_params)
    if transaction.save
      render json: {status: 'SUCCESS', message: 'Saved transaction', data: transaction}, status: :ok
    else
      render json: {status: 'ERROR', message: 'Transaction not saved', data: transaction.errors}, status: :unprocessable_entity
    end
  end

  # def destroy
  #   transaction = Transaction.find(params[:id])
  #   transaction.destroy
  #   render json: {status: 'SUCCESS', message: 'Deleted transaction', data: transaction}, status: :ok
  # end

  private

  def transaction_params
    params.permit(:symbol, :price, :number_of_shares, :transaction_id, :stock_id)
  end
end
