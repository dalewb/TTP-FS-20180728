class Api::V1::UsersController < ApplicationController

  def show
    user = User.find(params[:id])
    render json: {status: 'SUCCESS', message: 'Loaded user', data: user}, status: :ok
  end
  
end
