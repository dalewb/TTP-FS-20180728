class User < ApplicationRecord
  validates :email, presence: true
  validates :password, presence: true
  validates :name, presence: true

  has_many :transactions
end
