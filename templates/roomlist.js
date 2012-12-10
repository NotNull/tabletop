
if (Meteor.isClient) {

	Template.roomlist.rooms = function(){
		return RChat.rooms();
	};

	Template.roomlist.events = {
		"click #lnkCreateRoom": function(){
			$("#divCreateRoom").show();
		},
		"click #divCreateRoom .cancel": function(){
			$("#divCreateRoom").hide();
		},
		"click .create": function(){
			var name = $('#divCreateRoom .name').val();

			RChat.rooms.createRoom(name);
		},
		"click #rooms .selectRoom": function(){

			RChat.user.room(this._id);

			$("#tabs").tabs("option", "active", 0);

		}

	}

	
}
