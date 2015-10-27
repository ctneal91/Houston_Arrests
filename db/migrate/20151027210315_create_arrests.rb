class CreateArrests < ActiveRecord::Migration
  def change
    create_table :arrests do |t|
      t.integer :booking_number
      t.string :name
      t.string :sex
      t.string :race
      t.date :dob
      t.string :arrest_date
      t.string :booking_date
      t.string :address_number
      t.string :address_prefix
      t.string :address_street
      t.string :address_suffix
      t.string :address_ali
      t.string :address_city
      t.string :address_state
      t.integer :address_zip
      t.integer :charge_code
      t.string :charge_wording
      t.string :charge_level
      t.string :case_number
      t.string :disposition

      t.timestamps null: false
    end
  end
end
