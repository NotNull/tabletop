if (Meteor.isClient) {

	Template.main.rendered = function(){
		$('#tabs').tabs();
		
		if(RChat.userId() == null){
			$('#tabs').tabs('disable', 1);
			$('#tabs').tabs('disable', 2);
		}
	};

}
