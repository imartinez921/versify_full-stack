# app/controllers/static_pages_controller.rb

class StaticPagesController < ActionController::Base
  def root
    render :root
  end
end