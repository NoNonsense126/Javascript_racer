get '/games' do
  # Look in app/views/index.erb
  current_game = Game.find_by(id: session[:game_id])
  @user1 = current_game.users.first.name
  @user2 = current_game.users[1].name
  erb :game
end

post '/games' do
	new_game = Game.create
	player1 = params[:player1]
	player2 = params[:player2]
	session[:game_id] = new_game.id
	puts session
	if User.exists?(name: player1)
		@user1 = User.find_by(name: player1)
	else
		@user1 = User.create(name: player1)
	end
	if User.exists?(name: player2)
		@user2 = User.find_by(name: player2)
	else
		@user2 = User.create(name: player2)
	end
	new_game.users << @user1 
	UsersInGame.last.update(player_number: 1)
	new_game.users << @user2
	UsersInGame.last.update(player_number: 2)
	redirect '/games'
end

get '/won' do
	game = Game.find_by(id: session[:game_id])
	game.update(time_taken: params[:time], done: true)
	if params[:won] == 'player1'
		specific_instance = UsersInGame.find_by(player_number: 1, game_id: session[:game_id])
		specific_instance.update(won?: true, final_index: params[:player1])
		specific_instance = UsersInGame.find_by(player_number: 2, game_id: session[:game_id])
		specific_instance.update(won?: false, final_index: params[:player2])
	else
		specific_instance = UsersInGame.find_by(player_number: 1, game_id: session[:game_id])
		specific_instance.update(won?: false, final_index: params[:player1])
		specific_instance = UsersInGame.find_by(player_number: 2, game_id: session[:game_id])
		specific_instance.update(won?: true, final_index: params[:player2])
	end
	@game_id = game.id
	erb :endgame
end