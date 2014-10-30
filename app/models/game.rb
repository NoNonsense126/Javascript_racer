class Game < ActiveRecord::Base
  has_many :users, through: :users_in_games
  has_many :users_in_games
end
