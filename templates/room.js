
if (Meteor.isClient) {

	Template.room.helpers({
		character: function(id){
			var character = Characters.findOne({_id: id});
			
			if(character)	
				return character.name;

		},
		formatTime: function(time){
			var d = new Date(time);

			return (d.getMonth() + 1) + '/' + d.getFullYear();
		}
	});

   Template.room.messages = function(){
		return Messages.find({roomId: RChat.user.roomId() });
	};

	Template.room.messages.character = function(){
		return 'TESTNAME';//
	};

	Template.room.events = {
		"click #btnSay": function(){
			var message = $('#message').val();

			RChat.rooms.addMessage(RChat.user.roomId(), RChat.user.characterId(), message);
		},
		"click .delete": function(){
			var ans = confirm('Delete message?');

			if(ans)
				RChat.rooms.deleteMessage(this._id);
		}

	}

}
