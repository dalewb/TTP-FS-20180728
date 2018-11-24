class Transaction < ApplicationRecord
    validates :price, presence: true
    validates :number_of_shares, presence: true
end
