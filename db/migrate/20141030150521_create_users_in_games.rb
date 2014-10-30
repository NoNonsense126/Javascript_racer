class CreateUsersInGames < ActiveRecord::Migration
  def change
  	create_table :users_in_games do |t|
	  	t.integer :game_id
	  	t.integer :user_id
	  	t.integer :player_number
	  	t.boolean :won?
	  	t.integer :final_index

	  	t.timestamps
	  end
  end
end
