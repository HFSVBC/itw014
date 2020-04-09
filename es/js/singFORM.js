//copyright
//All rights reserved, 2016, Hugo Curado (1), Diogo Brito (2), Miguel Azarpour (3)
//(1) hugofsvbc@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(2) fc#####@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(3) fc#####@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa

"use strict";

var validateForm = function(){
	var user = document.forms['SignUpForm']['usename'].value;
	var cats = getStorage(users[user]+'_CATS');
	var cat = $('input[name="cats"]:checked').val();
	if (cats.length == 0 && cat == 'Al'){
		errorWriter('Não tem nenhum tema definido no seu perfil!', 'Por favor selecione um tema.');
		return false;
	};
};
var userID = function(){
	users = getStorage('USERS');
	if (users.length != 0){
		console.log(users);
		var options = '';
		for (var x in users){
			 options=options+'<option value="'+x+'">'+users[x]+'</option>';
		};
		$("#user").html(options);
	}
	else{
		$("#submit").addClass("w3-disabled");
		$("#submit").prop('disabled', true);
	}
};
var users = [];
window.onload = userID();