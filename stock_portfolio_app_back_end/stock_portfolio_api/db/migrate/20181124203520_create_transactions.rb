class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :symbol
      t.decimal :price
      t.integer :number_of_shares
      t.integer :user_id
      t.integer :stock_id

      t.timestamps
    end
  end
end
