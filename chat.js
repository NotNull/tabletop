(function(){

	var root = this;


	var _ = root._;
	var $ = root.jQuery;

	var RChat = root.RChat = _.extend(Meteor, {});
	RChat.VERSION = 0.01;

	var Users = root.Users = RChat.users;
	var Characters = root.Characters = new RChat.Collection("characters");
	var Messages = root.Messages = new RChat.Collection("messages");
	var Rooms = root.Rooms = new RChat.Collection("rooms");
	var Permissions = root.Permissions = new RChat.Collection("permissions");
	var Groups = root.Groups = new RChat.Collection("groups");

	RChat.log = function(msg){
		console.log(msg);

        $( "<div>" )
            .appendTo( document.body )
            .text( msg )
            .addClass( "notification ui-state-default ui-corner-bottom" )
            .position({
                my: "center top",
                at: "center top",
                of: window
            })
            .show({
                effect: "blind"
            })
            .delay( 1000 )
            .hide({
                effect: "blind",
                duration: "slow"
            }, function() {
                $( this ).remove();
            });

		
	}

	RChat.commands = {
		kick: function(characterId, reason){
			if(RChat.user.canDo('kick')){
				return characterId + ' was kicked!';
			}
			
			return 'Cannot use this action';
		},
		ban: function(characterId, reason){
			if(RChat.user.canDo('ban')){
				
			}
		},
		unban: function(characterId){
			if(RChat.user.canDo('unban')){
			
			}
		},
		set: function(value){
			if(RChat.user.canDo('set')){
				RChat.user.group(2);

				return RChat.user.groupId();
			}
		},
		mute: function(characterId){

		},
		unmute: function(characterId){

		},
		whisper: function(characterId){

		},
		create: function(what){
			
		}

	};

	RChat.parser = function(message){
		message = message.toString();
		if(message){
			if(message.length > 0){
				if(message[0] == '/'){//is a command
					var command = message.slice(1, message.length);
			
					switch (command.toLowerCase())
					{
						case 'kick':
							return RChat.commands.kick(RChat.user.characterId());
						case 'set':
							return RChat.commands.set(message);
						default:
							return 'Unknown command';
					}
				}
			}
		}
	};

	RChat.rooms = function(){
		return Rooms.find();
	};

	RChat.rooms = _.extend(RChat.rooms, {
		createRoom: function(name){
			Rooms.insert({
				name: name
			});
		},
		addMessage: function(roomId, characterId, message){
			if(!roomId)
				RChat.log('No connected room');
			else if(!characterId)
				RChat.log('No selected character');
			else{
				//message = RChat.parser(message);
				
				RChat.log(message);

				Messages.insert({
					roomId: roomId,
					characterId: characterId,
					message: message,
					time: new Date()
				});
			}
		},
		deleteMessage: function(id){
			Messages.remove({_id: id});
		}

	});

	RChat.user = _.extend(RChat.user, {
		canDo: function(action){
			return true;
		},
		characters: function(){
			return Characters.find({userId: RChat.userId()});
		},
		character: function(id){
			if(id){
				var character = Characters.findOne({_id: id});

				if(character){

					Session.set('characterId', id);

					RChat.user.group(character.groupId);
				}
			}
			else
				return Characters.find({_id: RChat.user.characterId() });
		},
		characterId: function(){
			return Session.get('characterId');
		},
		room: function(id){
			if(id){
				var room = Rooms.findOne({_id: id});
				if(room){
					Session.set('roomId', id);
					$('#tabs .roomTab').text(room.name);
				}
			}
			else
				return Rooms.find({_id: RChat.user.roomId()});
		},
		roomId: function(){
			return Session.get('roomId');
		},
		group: function(id){
			if(id){
				var group = Groups.findOne({_id: id});
				if(group){
					Session.set('groupId', id);
					
					Users.update({_id: RChat.userId()}, { 'profile.groupId': id });
				}
			}
			else
				return Groups.find({_id: RChat.user.groupId() });

		},
		groupId: function(){
			return Session.get('groupId');
		},
		createCharacter: function(name){
			if(!RChat.user.characterExists(name)){
				
				var group = Groups.findOne({}, {sort: 'level'});

				if(group){
					Characters.insert({
						userId: RChat.userId(),
						name: name
					});
				}

			}
		},
		updateCharacter: function(name){
			Characters.update({
				userId: RChat.userId(),
				name: name
			});
		},
		deleteCharacter: function(id){
			Characters.remove({
				_id: id
			});
		},
		getCharacter: function(id){
			Characters.find({
				_id: id
			});
		},
		characterExists: function(name){
			if(Characters.findOne({name: name}) == null)
				return false;

			return true;
		}

	});


}).call(this);
