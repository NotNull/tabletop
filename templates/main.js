if (Meteor.isClient) {

	Template.main.rendered = function(){
		$('#tabs').tabs();
	};

}
