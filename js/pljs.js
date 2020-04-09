"use strict";

var userPal = "";

var dash = function(pal){
	var out = '';
	var i=0;
	while (i<pal.length){
		out = out + '_';
		i++;
	};
	return out;
};
var letterPal = function(word, l){
	var z = 0;
	var out = "";
	//percorre a palavra dada
	for(var i=0; i < word.length; i++){
		if(word[i] === l){
			out = out + l;
		}
		//verifica letras inseridas anteriormente
		else if (userPal.indexOf(word[i]) != -1){
			out = out + word[i];
		}
		else{
			out = out + '_';
		}
	};
	userPal = out;
	return out;
};

var adivinha = function(){
	var pal = "gata";
	var res = "";
	alert("Categoria: Animal Doméstico\n"+pal.length+" letras");
	userPal = dash(pal);
	console.log(userPal);
	var i=0;

	

	while (i < 6){
		if (pal===res){
			alert("Parabens!");
			break;
		};
		var letra = prompt("Insira uma letra:");
		if (pal.indexOf(letra) != -1 ){
			res = letterPal(pal, letra);
			alert("Palavra: "+res);
		}
		else{
			alert("Tem "+(5-i)+" tentativas restantes!");
			i++;
		};
	};
};

window.onload=adivinha();
