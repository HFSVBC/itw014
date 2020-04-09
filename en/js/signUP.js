//copyright
//All rights reserved, 2016, Hugo Curado (1), Diogo Brito (2), Miguel Azarpour (3)
//(1) hugofsvbc@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(2) fc#####@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(3) fc#####@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa

"use strict";

function checkForData(data){
	//verifica se os campos obrigatorios foram preenchidos
	if(data[0]=='' || data[1]=='' || data[2]=='' || data[3]==''){
		//caso não tenhã sido preenchidos mostra uma menssagem de erro
		errorWriter("Formulário mal preenchido!", "Por favor preencha todos os campos marcados com: '*'.");
		return false;
	}
	//caso tenham sido preenchidos corretamente esconde / mantem escondida a
	//a menssagem de erro
	$("#error").css('display', "none");
	return true;
}
function dataRetrival() {
	//Recolhe o Primeiro nome do utilizador
	var firstName = $('input[name="fName"]').val();
	//Recolhe o Segundo nome do utilizador
    var lastName = $('input[name="lName"]').val();
    //Recolhe o nome de utilizador
    var username = $('input[name="username"]').val();
    //Recolhe o email do utilizador
    var email = $('input[name="email"]').val();
    //Recolhe a faixa etária do utilizador
    var age = $('#age :selected').val();
    //Recolhe o idioma do utilizador
    var language = $('input[name="language"]:checked').val();
    //Recolhe as categorias preferidas do utilizador e separas pelo caracter '&'
    var categories = ($('input[name="cats"]:checked').serialize()).split('&');
    //cria um array para guardar as categorias
    var catsArray = [];
    //corre o primeiro array
    for(var x in categories){
    	//guarda as categorias no segundo array retirando o 'cats='
    	catsArray.push(categories[x].slice(5));
    }
    //Recolhe o modo de jogo em que o utilizador prefere jogar
    var mode = $('#mode :selected').val();

    //guarda todos os dados num array
    return [[firstName, lastName, username, email, age, language, mode, 0], catsArray];
}
var validateForm = function() {
	//guarda os dados submetidos pelo utilizador noa array data
   	var data = dataRetrival();
   	var cats_array = data[1]
   	data = data[0]
   	//verifica se os campos obrigatorios foram preenchidos com o auxilio da função
   	//checkFormData
   	if(checkForData(data)){

   		if(getStorage(data[2]).length == 0){
   			//caso o nome de utilizador já esteja tomado esconde / mantem escondida a
			//a menssagem de erro
   			$("#error").css('display', "none");
   			//Mostra a menssagem de sucesso
			$("#sucesso").css('display', "block");
			if (data[5] == "portugues") {
				$("#errorP > a").attr("href", "../play.html");
			}
			if (data[5] == "espanhol") {
				$("#errorP > a").attr("href", "../es/play.html");
			}
			//desativa o botão de submissão para que o utilizador não possa submeter
			//o formulário mais do que uma vez craiando dados duplicados
	   		$("#submit").addClass("w3-disabled");
	   		writeStorage(data, data[2]);
	   		if (cats_array[0].length != 0){
	   			writeStorage(cats_array, data[2]+'_CATS');
	   		}
	   		//acrescenta utilizador ao setion storage USERS
	   		var users = getStorage('USERS')
	   		users.push(data[2])
	   		writeStorage(users, 'USERS');
	   	}
	   	else{
   			errorWriter("Nome de utilizador já tomado!", "Por favor escolha outro nome de utilizador.");
	   	}   		
	}
	return false;
}

var verBrowser = function(){	
	if (typeof(Storage) === "undefined") {
		errorWriter("O seu Browser não suporta Local Storage!", "Por favor atualize o seu browser para continuar");
		$('.w3-input').prop('disabled', true);
	}
}

window.onload = verBrowser();