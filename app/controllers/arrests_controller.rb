require 'csv'

class ArrestsController < ApplicationController
  def index
    @arrests = []

    datafile = Rails.root + 'db/HCPDArrestData.csv'

    CSV.foreach(datafile, headers: true) do |row|

        arrest = Arrest.new
        arrest.booking_number = row.to_h["BOOKING_NUMBER"]
        arrest.name = row.to_h["NAME"]
        arrest.sex = row.to_h["SEX"]
        arrest.race = row.to_h["RACE"]
        arrest.dob = row.to_h["DOB"]
        arrest.arrest_date = row.to_h["ARREST_DATE"]
        arrest.booking_date = row.to_h["BOOKING_DATE"]
        arrest.address_number = row.to_h["ADDRESS_NUMBER"]
        arrest.address_prefix = row.to_h["ADDRESS_PREFIX"]
        arrest.address_street = row.to_h["ADDRESS_STREET"]
        arrest.address_suffix = row.to_h["ADDRESS_SUFFIX"]
        arrest.address_ali = row.to_h["ADDRESS_ALI"]
        arrest.address_city = row.to_h["ADDRESS_CITY"]
        arrest.address_state = row.to_h["ADDRESS_STATE"]
        arrest.address_zip = row.to_h["ADDRESS_ZIP"]
        arrest.charge_code = row.to_h["CHARGE_CODE"]
        arrest.charge_wording = row.to_h["CHARGE_WORDING"]
        arrest.charge_level = row.to_h["CHARGE_LEVEL"]
        arrest.case_number = row.to_h["CASE_NUMBER"]
        arrest.disposition = row.to_h["DISPOSITION"]

        @arrests << arrest
    end

  end

  def show
  end
end
