class Mode < ActiveRecord::Base
  attr_accessible :name
  
  ### ASSOCIATIONS:
  
  has_many :matches
  
end
