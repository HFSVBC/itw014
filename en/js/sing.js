"use strict";
//----------START Funções de Apoio----------
var randomOnList = function (key){
	return Math.floor((Math.random() * (key.length - 1)) + 0);
}
var letters = function(){
	var content = "";
	var j=0;
	//gera as letras de A a Z automáticamente
	for(var i=65; i < 91; i++){
		var lett = String.fromCharCode(i);
		Letras.push(lett);
		content = content + "<button type=\"button\" id=\"Letter-"+lett+"\"class=\"Letter w3-btn w3-round w3-small w3-deep-orange w3-hover-orange\" onclick=\"letterChecker(Letras["+j+"],word);\">"+lett+"</button>\n";
		j++;
	};
	//escreve para dentro de todos os elementos com classe buttonsGame os botões com as letras e o botão aleatório
		$('.buttonsGame').html(content+"<button type=\"button\" id=\"Letter-rand\"class=\"Letter w3-btn w3-round w3-small w3-deep-orange w3-hover-orange\" onclick=\"letter_random(word);\">&#8635</button>\n");
};
//cria o relogio
var clock = function(timeMin){
	//coverte os minutos para segundos
    Min = 60 * timeMin;
    clockGen = setInterval(function () {
    	//a cada segundo subtrai 1
	    Min = Min - 1;
	    //retira de Min o valor dos segundos e converte para string
	    var seconds = (Min % 60).toString();
	    //verifica se o valor dos segundos é menor que 10 e adiciona o 0 antes do valor
	    if (seconds < 10){
	    	seconds = '0' + seconds
	    }
	   	//cria a variavel com o valor do relogio a escrever
	    var result = '0' + (parseInt(Min / 60)).toString() + ':' + seconds; //formart seconds into 00:00 
	    document.getElementById('time').innerHTML = result;
	    //verifica se o relogio atingio os 0 segundos e 0 minutos e torna a variavel timeOut Verdadeira
	    if (Min == 0){
	    	timeOut = true;
	    	//para a execução do relogio
	    	clearInterval(clockGen);
	    }
    },1000);//executa a cada segundo
}
//escolhe letra ao acaso
var letter_random = function(w){
	//ver se letra escolhida já foi carregada
	var num = 65 + Math.floor((Math.random() * 24) + 0);
	var letterAl = String.fromCharCode(num);
	//verifica se letra gerada ja tinha sido escolhida
	if (chosenLetters.indexOf(letterAl) < 0){
		var answer = confirm("The randomly chosen letter is: "+letterAl+"\nDo you accept?");
		if (answer){
			letterChecker(letterAl, w);
		}
	}
	else{
		letter_random(w);
	}
}
//constroie interior de popUp de fim de jogo
var endConst = function(){
	$('#resCat').html(categorie);
	$('#resPal').html(word);
	tempo = clockInitial*60 - Min;
	var minutos = '0' + (parseInt(tempo / 60)).toString();
	var segundos = tempo % 60;
	if (segundos < 10){
		segundos = '0' + segundos.toString();
	}
	$('#resTempo').html(minutos + ':' + segundos);
	$('#resPontos').html(points);
	$('#resTentFalha').html(x);
	$('#resMode').html(mod);
}
var updateUser = function(){
	if (user.length < 8){
		user.push(points);
	}
	else{
		user[7]=parseInt(user[7])+points;
	}
	console.log(user);
	writeStorage(user, user[2]);
}
//Mostra a janela de Game Over
var gameOver = function (){
	endConst();
	updateUser();
	$('#endGameTilte').html('Perdeu :(');
	
	$("#endGame").css('display', 'block');
	atualizaPontos([user[2], mod, categorie, word, points, tempo]);
}
//Mostra a janela de Jogo Ganho
var gameWin = function (){
	endConst();
	updateUser();
	$('#endGameTilte').html('Parabéns!!!! :)');
	$('#endGameSubTilte').html('Ganhou esta ronda!');
	
	$("#endGame").css('display', 'block');
	atualizaPontos([user[2], mod, categorie, word, points, tempo]);
}
var getUserName = function(id){
	
	var users = getStorage('USERS');
	return users[id];
}
var getUserData = function(){

	var url = window.location.href.split('?');
	url = url[1].split('&');
	console.log(url);
	var username = (url[0].split('='))[1];
	var cate = (url[1].split('='))[1];
	var mode = (url[2].split('='))[1];

	return [username, cate, mode];
}
//----------END Funções de Apoio----------


//----------START Variáveis Globais----------
var tempo = 0;
var height = 0;
var user = [];
var mod = '';
var chameProx = 0;
var chosenLetters = ['0'];
var clockGen = 0;
var timeOut = false;
var word = '';
var categorie = '';
var points = 0;
var clockInitial = 0;
var Min = 0;
var Letras = [];
var gapes_ori = "";
var x = 0;
var y =0;
var z = 0;
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
var spaces = function(word, l){
	z = 0 //contador de espaços entre palavras
	var out = "";
	//percorre a palavra dada
	for(var i=0; i < word.length; i++){
		//no caso de serem duas palavras acrescenta um espaço quadrupulo
		if (word[i]===' '){
			out = out + '&ensp;&ensp;';
			z++
		}
		//se a letra escolhida esta na palavra acrescenta ao resultado final
		else if(word[i] === l){
			out = out + l+' ';
			y++;//contador de letras inseridas
		}
		//verifica se a letra já tinha sido escolhida anteriormente
		else if (gapes_ori.indexOf(word[i]) >= 0){
			out = out + word[i]+' ';
		}
		//acrescenta espaço vazio
		else{
			out = out + '_ ';
		}
	}
	gapes_ori = out
	return out
}
//Verifica se a letra escolhida está na palavra
function letterChecker (letter, w){
	$("#Letter-"+letter).prop('disabled', true);
	if (timeOut==true){
		gameOver();
	}
	else if (w.indexOf(letter) >= 0){
		var gapes = spaces(word, letter);
		$("#wordSpaces").html(gapes);
		points = points + 50;
		if (w.length == y+z && timeOut==false){
			gameWin();
			clearInterval(clockGen);
		}
	}
	else{
		//document.getElementById("boneco_"+x).style.display = "block";
		if (points > 0 && (points - 20) > 0){
			points = points - 20;
		}
		else if (points > 0 && (points-20) < 0){
			points = 0;
		}
		x++;
		height = updateBoneco(x);
		if (x == 6) {
			gameOver();
			clearInterval(clockGen);
		}
	}
	$("#pointsSing").html(points);
	chosenLetters = chosenLetters + letter;
}
//----------GAME INITIALIZER----------
var gameStarter = function(){

	//gets user data from url
	var data = getUserData();
	console.log(data);
	//passa nome de utilizador para a var user
	user = getStorage(getUserName(data[0]));
	console.log(user);
	//definição da categoria/tema
	var cat = data[1];
	if (cat=='Al'){
		var cats_Form=getStorage(user[2]+'_CATS');
		console.log(cats_Form);
		cat = cat_picker(cats_Form);
	}
	categorie = catsStr[parseInt(cat)]; //verificado
	$('#catgorie').html(categorie);

	//escolhe a palavra aleatoriamente a partir da categoria escolhida
	word = word_picker(cat);//verificado
	$('#wordSpaces').html(spaces(word, ''));//verificada
	//comentar
	letters();//verificado

	//vai buscar o modo
	mod = data[2];
	if(mod == 'df'){
		mod = user[6];
	}
	switch(mod){
		case 'facil':
			clockInitial = 1.5;
        	break;
		case 'medio':
			clockInitial = 1.0;
        	break;
		case 'dificil':
			clockInitial = 0.5;
        	break;
	}
	clock(clockInitial);//verificado
	//controla o valor da variavel timeOut
	var controlTimeOut = setInterval(function () {
		//se timeOut for verdadeira ativa o fim do jogo como game over e para o controlo
		if (timeOut==true){
			gameOver();
			clearInterval(controlTimeOut);
		}
	},500);//verifica a cada 0.5 segundos
}
//executa o gameStarter quado a pagina acaba de carregar
window.onload = gameStarter();

