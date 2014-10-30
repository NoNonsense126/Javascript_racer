class User < ActiveRecord::Base
  has_many :games, through: :users_in_games
  has_many :users_in_games
end
