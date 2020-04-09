"use strict";
//----------START Funções de Apoio----------
var divDados = function(data){
	var users = getStorage('USERS')
	console.log(data);
	//verifica o modo de jogo
	if (modo == 'Normal'){
		//user 1
		uti[0] = users[parseInt(data[0])];
		user[0] = getStorage(uti[0]);
		var cat1 = data[1];
		if (cat1 == 'Al'){
			//escolhe a palavra aleatoriamente a partir da categoria escolhida
			var cats_Form=getStorage(user[0][2]+'_CATS');
			cat1 = cat_picker(cats_Form);
		}
		categorie[0] = catsStr[parseInt(cat1)];
		word[0] = word_picker(cat1);
		//user 2
		uti[1] = users[parseInt(data[2])];
		user[1] = getStorage(uti[1]);
		var cat2 = data[3];
		if (cat2 == 'Al'){
			//escolhe a palavra aleatoriamente a partir da categoria escolhida
			var cats_Form=getStorage(user[1][2]+'_CATS');
			cat2 = cat_picker(cats_Form);
		}
		categorie[1] = catsStr[parseInt(cat2)];
		word[1] = word_picker(cat2);
	}
	else{
		//user 1
		uti[0] = users[parseInt(data[0])];
		user[0] = getStorage(uti[0]);
		categorie[0] = data[1];
		word[0] = data[2];
		//user 2
		uti[1] = users[parseInt(data[3])];
		user[1] = getStorage(uti[1]);
		categorie[1] = data[4];
		word[1] = data[5];
	}
	console.log(user);
}

var clock = function(lastTime, U){
	//coverte os minutos para segundos
  Min = lastTime;
  clockGen = setInterval(function () {
  	//a cada segundo subtrai 1
    Min = Min + 1;
    var result = hoursFormat(Min);
    $('#time'+U).html(result);
  },1000);//executa a cada segundo
}
var randomOnList = function (key){
	return Math.floor((Math.random() * (key.length - 1)) + 0);
}
var letters = function(U){
	var content = "";
	var j=0;
	//gera as letras de A a Z automaticamente
	for(var i=65; i < 91; i++){
		var lett = String.fromCharCode(i);
		Letras.push(lett);
		content = content + "<button type=\"button\" id=\"Letter-"+lett+U+"\"class=\"Letter w3-btn w3-round w3-small w3-deep-orange w3-hover-orange U"+U+"\" onclick=\"letterChecker(Letras["+j+"],word["+(U-1)+"], "+U+");\">"+lett+"</button>\n";
		j++;
	};
	//escreve para dentro de todos os elementos com classe buttonsGame os botões com as letras e o botão aleatório
	return content+"<button type=\"button\" id=\"Letter-rand"+U+"\"class=\"Letter w3-btn w3-round w3-small w3-deep-orange w3-hover-orange U"+U+"\" onclick=\"letter_random(word["+(U-1)+"], "+U+");\">&#8635</button>\n";
};
//muda o teclado do utilizador para utilizador
var changeKeyboard = function(U){
	if(U==1 && !win[1] && !perdeu[1]){
		clearInterval(clockGen);
		timeOri[0] = Min;
		$('button.U1').prop('disabled', true);
		$('button.U2').prop('disabled', false);
		Us = 2;
		for (var i in chosenLetters[1]){
			$('#Letter-'+chosenLetters[1][i]+'2').prop('disabled', true);
		}
		Min = 0;
		clock(timeOri[1], 2);
	}
	else if(!win[0] && !perdeu[0]){
		clearInterval(clockGen);
		timeOri[1] = Min;
		$('button.U2').prop('disabled', true);
		$('button.U1').prop('disabled', false);
		Us = 1;
		for (var i in chosenLetters[0]){
			$('#Letter-'+chosenLetters[0][i]+'1').prop('disabled', true);
		}
		Min = 0;
		clock(timeOri[0], 1)
	}
}
//escolhe letra ao acaso
var letter_random = function(w, U){
	//ver se letra escolhida já foi carregada
	var num = 65 + Math.floor((Math.random() * 24) + 0);
	var letterAl = String.fromCharCode(num);
	//verifica se letra gerada ja tinha sido escolhida
	if (chosenLetters[U-1].indexOf(letterAl) < 0){
		var answer = confirm("A letra Escolhida aleatóriamente é: "+letterAl+"\nAceita?");
		if (answer){
			letterChecker(letterAl, w, U);
		}
	}
	else{
		letter_random(w, U);
	}
}
var updateUser = function(U){
	if (user[U].length < 8){
		user[U].push(points[U]);
	}
	else{
		user[U][7]=parseInt(user[U][7])+points[U];
	}
	console.log(user[U]);
	writeStorage(user[U], user[U][2]);
}
//constroie interior de popUp de fim de jogo
var endConst = function(U){
	clearInterval(clockGen);
	timeOri[U-1] = Min;

	if (win[0]){
		$('#endGameTilte1').html('Ganhou! :)');
	}
	else{
		$('#endGameTilte1').html('Perdeu! :(');
	}
	if (win[1]){
		$('#endGameTilte2').html('Ganhou! :)');
	}
	else{
		$('#endGameTilte2').html('Perdeu! :(');
	}

	$('#resCat1').html(categorie[0]);
	$('#resCat2').html(categorie[1]);
	$('#resPal1').html(word[0]);
	$('#resPal2').html(word[1]);
	$('#resTempo1').html(hoursFormat(timeOri[0]));
	$('#resTempo2').html(hoursFormat(timeOri[1]));
	$('#resPontos1').html(points[0]);
	$('#resPontos2').html(points[1]);
	$('#resTentFalha1').html(erros[0]);
	$('#resTentFalha2').html(erros[1]);

	$("#endGame").css('display', 'block');

	atualizaPontos([uti[0], modo, categorie[0], word[0], points[0], timeOri[0]]);
	atualizaPontos([uti[1], modo, categorie[1], word[1], points[1], timeOri[1]]);
	updateUser(0);
	updateUser(1);
}

//----------END Funções de Apoio----------


//----------START Variáveis Globais----------
var height = 0;
var user = [[], []];
var uti = [[], []]
var chameProx = 0;
var chosenLetters = [[], []];
var clockGen;
var word = ['', ''];
var categorie = ['', ''];
var points = [0, 0];
var Min = 0;
var timeOri = [0, 0];
var Letras = [];
var gapes_ori = ["", ""];
var erros = [0, 0];
var LetrasCertas = [0, 0];
var espacos = [0, 0];
var win = [false, false];
var perdeu = [false, false];
var Us;
var modo = 'Normal'
//----------END Variáveis Globais----------
//escolhe categoria aleatoriamente da categoria escolhida
var cat_picker = function(list){
	return randomOnList(list);
}
//escolhe palavra aleatoriamente da categoria escolhida
var word_picker = function(cat){
	var categotia = cats[cat]
	//escolhe um index aleatoriamente da lista dada por cats[cat]
	var index = randomOnList(categotia);
	return categotia[index]
}
//cria os espaços em branco, acrescenta as letras escolhidas corretamente
var spaces = function(word, l, U){
	espacos[U-1] = 0 //contador de espaços entre palavras
	var out = "";
	//percorre a palavra dada
	for(var i=0; i < word.length; i++){
		//no caso de serem duas palavras acrescenta um espaço quadrupulo
		if (word[i]===' '){
			out = out + '&ensp;&ensp;';
			espacos[U-1]++
		}
		//se a letra escolhida esta na palavra acrescenta ao resultado final
		else if(word[i] === l){
			out = out + l+' ';
			LetrasCertas[U-1]++;//contador de letras inseridas
		}
		//verifica se a letra já tinha sido escolhida anteriormente
		else if (gapes_ori[U-1].indexOf(word[i]) >= 0){
			out = out + word[i]+' ';
		}
		//acrescenta espaço vazio
		else{
			out = out + '_ ';
		}
	}
	gapes_ori[U-1] = out
	return out
}
function letterChecker (letter, w, U){
	$("button#Letter-"+letter+U+".U"+U).prop('disabled', true);
	if (w.indexOf(letter) >= 0){
		var gapes = spaces(word[U-1], letter, U);
		$("#wordSpaces"+U).html(gapes);
		points[U-1] += 50;
		if (w.length == LetrasCertas[U-1]+espacos[U-1]){
			win[U-1] = true;
			endConst(U);
		}
		else{
			changeKeyboard(U);
		}
	}
	else{
		//document.getElementById("boneco_"+x).style.display = "block";
		if (points[U-1] > 0 && (points[U-1] - 20) > 0){
			points[U-1] -=  20;
		}
		else if (points[U-1] > 0 && (points[U-1]-20) < 0){
			points[U-1] = 0;
		}
		erros[U-1]++;
		height = updateBonecoMul(erros[U-1], U);
		if (erros[U-1] == 6) {
			perdeu[U-1] = true;
			if ((win[0]==true && win[1]==true) || (perdeu[0]==true && perdeu[1]==true) || (win[0]==true && perdeu[1]==true) || (perdeu[0]==true && win[1]==true)){
				endConst(U);
			}
			$('button.'+U).prop('disabled', true);
		}
		changeKeyboard(U);
	}
	$("#points"+U).html(points[U-1]);
	chosenLetters[U-1] += letter;
}
$(document).ready(function () {
	$('#buttonsGame1').html(letters(1));
	$('#buttonsGame2').html(letters(2));

	//recolhe os dados do formulario 
	var data = getStorageSessi('mulDataNorm')
	if (data.length == 0){
		data = getStorageSessi('mulDataSel')
		modo = 'Escolhe o Tema'
	}
	//guarda os dados nas variaveis adequadas
	divDados(data);
	console.log(word);
	$('.Jog1').html(uti[0]);
	$('.Jog2').html(uti[1]);

	$('#categoria1').html(categorie[0]);
	$('#wordSpaces1').html(spaces(word[0], '', 1));//verificada

	$('#categoria2').html(categorie[1]);
	$('#wordSpaces2').html(spaces(word[1], '', 2));//verificada

	$('button.U2').prop('disabled', true);
	Us = 1;
	clock(timeOri[0], 1);

});
