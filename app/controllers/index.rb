enable :sessions

get '/' do
  # Look in app/views/index.erb
  @game_list = Game.last(10)
  erb :home
end

