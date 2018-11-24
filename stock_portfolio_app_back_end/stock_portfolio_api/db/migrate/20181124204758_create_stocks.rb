class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.decimal :current_price

      t.timestamps
    end
  end
end
