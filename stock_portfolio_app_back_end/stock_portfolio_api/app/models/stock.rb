class Stock < ApplicationRecord
  validates :symbol, presence: true
  validates :current_price, presence: true
  has_many :transactions
end
