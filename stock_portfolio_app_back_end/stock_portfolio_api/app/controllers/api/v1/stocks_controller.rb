class Api::V1::StocksController < ApplicationController
  def index
    stocks = Stock.all
    render json: status: 'SUCCESS', message: 'Loaded stocks', data: stocks}, status: :ok
  end

  def show
    stock = Stock.find(params[:id])
    render json: {status: 'SUCCESS', message: 'Loaded stock', data: stock}, status: :ok
  end

  def create
    stock = Stock.new(stock_params)
    if stock.save
      render json: {status: 'SUCCESS', message: 'Saved stock', data: stock}, status: :ok
    else
      render json: {status: 'ERROR', message: 'Stock not saved', data: stock.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    stock = Stock.find(params[:id])
    stock.destroy
    render json: {status: 'SUCCESS', message: 'Deleted stock', data: stock}, status: :ok
  end

  private

  def stock_params
    params.permit(:symbol, :current_price)
  end
end
