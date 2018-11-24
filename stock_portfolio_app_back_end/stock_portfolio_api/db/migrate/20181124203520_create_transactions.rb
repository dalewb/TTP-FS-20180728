class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.decimal :price
      t.integer :number_of_shares

      t.timestamps
    end
  end
end
