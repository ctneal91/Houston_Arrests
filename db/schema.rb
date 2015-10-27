# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151027210315) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "arrests", force: :cascade do |t|
    t.integer  "booking_number"
    t.string   "name"
    t.string   "sex"
    t.string   "race"
    t.date     "dob"
    t.string   "arrest_date"
    t.string   "booking_date"
    t.string   "address_number"
    t.string   "address_prefix"
    t.string   "address_street"
    t.string   "address_suffix"
    t.string   "address_ali"
    t.string   "address_city"
    t.string   "address_state"
    t.integer  "address_zip"
    t.integer  "charge_code"
    t.string   "charge_wording"
    t.string   "charge_level"
    t.string   "case_number"
    t.string   "disposition"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

end
