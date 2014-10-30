class CreateGames < ActiveRecord::Migration

  def change
  	create_table :games do |t|
  		t.time :time_taken
  		t.boolean :done, default: false

  		t.timestamps
  	end
  end
end
