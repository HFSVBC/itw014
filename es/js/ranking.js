//copyright
//All rights reserved, 2016, Hugo Curado (1), Diogo Brito (2), Miguel Azarpour (3)
//(1) hugofsvbc@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(2) fc#####@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
//(3) fc48759@alunos.fc.ul.pt, ITW, LTI, Faculdade de Ciências, Universidade de Lisboa
"use strict";

function sort(vetor, key) {
	return vetor.sort(function(a, b){return b[key]-a[key]});
}

function divisaoVetores(vetor) {
	var v = [];
	while (vetor.length > 0) {
		v.push(vetor.splice(0,6));
	}
	return v;
}

function getUsers() {
	var out = [];
	var users = getStorage('USERS');
	for (var user in users) {
		out.push(getStorage(users[user]));
	}
	return out;
}

function getPoints() {
	var out = getStorage('POINTS');
	out = divisaoVetores(out);
	return out.reverse();
}

function constPontuacaoJogo(vetor) {
	var out = "";
	for (var x = 0; x < vetor.length; x++) {
		out += "<tr class='w3-hover-deep-orange'><td>" + vetor[x][0] + "</td><td class='capitalize'>" + vetor[x][1]+ "</td><td class='capitalize'>" + vetor[x][2]+ "</td><td>" + vetor[x][3]+ "</td><td>" + vetor[x][4]+ "</td><td>" + hoursFormat(vetor[x][5]) + "</td></tr>"
	}
	return out;
}

function constUsersJogo(vetor) {
	var out = "";
	for (var x = 0; x < vetor.length; x++) {
		out += "<tr class='w3-hover-deep-orange'><td>" + vetor[x][2] + "</td><td>" + vetor[x][0]+' '+vetor[x][1]+ "</td><td>" + vetor[x][4]+ "</td><td>" + vetor[x][7] + "</td></tr>"
	}
	return out;
}

function constPodium(vetor) {
	$("#um").html("<h2>" + vetor[0][2] + "</h2>");
	if (vetor.length > 1){
		$("#dois").html("<h2>" + vetor[1][2] + "</h2>");
	}
	if (vetor.length > 2){
		$("#tres").html("<h2>" + vetor[2][2] + "</h2>");
	}
}

var mudaTabela = function () {
    var button = $("#mudaTabela");
    if (button.html() === "Ver por Jugador") {
        button.html("Ver por Juego");
        $("#tabelaJogo").css('display', 'none');
        $("#tabelaJogador").css('display', 'table');
    } else {
        button.html("Ver por Jugador");
        $("#tabelaJogo").css('display', 'table');
        $("#tabelaJogador").css('display', 'none');
    }
};

function main () {
	var users = getUsers();
		users = sort(users, 7);
		console.log(users);
		var points = getPoints();
		if (points.length == 0){
			errorWriter("No hay juegos fueron jugados!", "Puede jugar <a href='play.html'>aquí</a>");
		}
		else{
			$("#rankingBody").html(constPontuacaoJogo(points));
			$("#playersBody").html(constUsersJogo(users));
			constPodium(users);
		}
		$("#tabelaJogador").css("display", "none");
}


window.onload = main();
