//copyright
//All rights reserved, 2016, Hugo Curado (1), Diogo Brito (2), Miguel Azarpour (3)
//(1) hugofsvbc@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(2) fc#####@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(3) fc#####@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa


"use strict";

var users = [];

var userID = function(){
	users = getStorage('USERS');
	if (users.length != 0){
		console.log(users);
		var options = '';
		for (var x in users){
			 options=options+'<option value="'+x+'">'+users[x]+'</option>';
		};
		$("#user2").html(options);
		$("#user1").html(options);
	}
	else{
		$("#submit").addClass("w3-disabled");
		$("#submit").prop('disabled', true);
	}
};

var validateFormNorm = function(user1, user2){
	var cats1 = getStorage(users[user1]+'_CATS');
	var cats2 = getStorage(users[user2]+'_CATS');
	var cat1 = $('input[name="cats1"]:checked').val();
	var cat2 = $('input[name="cats2"]:checked').val();
	var status = true;
	if (cats1.length == 0 && cat1 == 'Al'){
		errorWriter(users[user1]+" doesn't have any theme chosen in his/her profile!", 'Please select a theme.');
		status = false;
	}
	else if (cats2.length == 0 && cat2 == 'Al'){
		errorWriter(users[user2]+" doesn't have any theme chosen in his/her profile!", 'Please select a theme.');
		status = false;
	}
	var mulData = [user1, cat1, user2, cat2]
	sessionStorage.setItem('mulDataNorm', mulData);
	return status
}

var validateFormSel = function(user1, user2){

	var Tema1 = $('input[name="Tema1"]').val();
	var Tema2 = $('input[name="Tema2"]').val();
	var Pal1 = $('input[name="Pal1"]').val().toUpperCase();;
	var Pal2 = $('input[name="Pal2"]').val().toUpperCase();;
	var mulData = [user1, Tema1, Pal1, user2, Tema2, Pal2];
	var status = true;
	if(mulData[0]=='' || mulData[1]=='' || mulData[2]=='' || mulData[3]==''){
		//caso não tenhã sido preenchidos mostra uma menssagem de erro
		errorWriter("Form poorly filled!", "Please fill out every field marked with: '*'.");
		status = false;
	}
	else if(/[^a-zA-Z ]/.test(Pal1)){
		errorWriter(users[user2]+' is not allowed to use special characters!', 'Please choose a new word.');
		status = false;
	}
	else if(/[^a-zA-Z ]/.test(Pal2)){
		errorWriter(users[user1]+' is not allowed to use special characters!', 'Please choose a new word.');
		status = false;
	}
	else{
		sessionStorage.setItem('mulDataSel', mulData);
	}
	return status
}

var validateForm = function(){
	var user1 = document.forms['MultiUpForm']['usename1'].value;
	var user2 = document.forms['MultiUpForm']['usename2'].value;
	var status = true;
	if(user1 != user2){
		if($("#normalF").prop('disabled')){
			status = validateFormNorm(user1, user2)
		}
		else{
			status = validateFormSel(user1, user2)
		}
	}
	else{
		errorWriter('Both Usernames are equal!', 'Please choose different Usernames.');
		status = false;
	}
	return status
};

$(document).ready(function() {
	sessionStorage.removeItem('mulDataNorm');
	sessionStorage.removeItem('mulDataSel');
    $("#escolh1, #escolh2").hide();
    $("#normalF").prop('disabled', true);
    userID();
});

$("#normalF").click(function() {
    $("#escolh1, #escolh2").hide();
    $("#normtema2, #normtema, .infoCats").show();
    $(this).prop('disabled', true);
    $("#escolha").prop('disabled', false);

});
$("#escolha").click(function() {
    $("#normtema2, #normtema, .infoCats").hide();
    $("#escolh1, #escolh2").show();
    $(this).prop('disabled', true);
    $("#normalF").prop('disabled', false);
});