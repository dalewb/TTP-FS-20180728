class Transaction < ApplicationRecord
    validates :price, presence: true
    validates :number_of_shares, presence: true

    belongs_to :user
    belongs_to :stock
end
