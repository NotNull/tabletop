
if (Meteor.isClient) {

	Template.characterlist.characters = function(){
		return RChat.user.characters();
	};

	Template.characterlist.events = {
		"click #lnkCreateCharacter": function(){
			$("#divCreateCharacter").show();
		},
		"click #btnCancel": function(){
			$("#divCreateCharacter").hide();
		},
		"click #btnCreateCharacter": function(){
			var name = $('#name').val();

			if(!RChat.user.characterExists(name))
				RChat.user.createCharacter(name);
			else
				alert('Character already exists');
		},
		"click .selectCharacter": function(){

			RChat.user.character(this._id);

		}

	}

	
}
