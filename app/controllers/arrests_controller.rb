class ArrestsController < ApplicationController
  def index
    @arrests = Arrest.all
  end

  def show
    @arrest = Arrest.find params[:id]
  end
end
