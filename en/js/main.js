"use strict";

function openModal(id){
	$('#'+id).css('display', 'block');
}
function closeModal(id){
	$('#'+id).css('display', 'none');
}

function errorWriter(header, subhead){
	$("#errorH3").html(header);
	$("#errorP").html(subhead);
	$("#error").css('display', 'block');
}
function hoursFormat(time){
	var seconds = (time % 60).toString();
	//verifica se o valor dos segundos é menor que 10 e adiciona o 0 antes do valor
	if (seconds < 10){
		seconds = '0' + seconds
	}
  var minutes = (parseInt(time / 60)).toString()
  //verifica se o valor dos minutos é menor que 10 e adiciona o 0 antes do valor
	if (minutes < 10){
		minutes = '0' + minutes
	}
	return minutes + ':' + seconds; //formarts time into 00:00 
}
function writeStorage(data, name){
	localStorage.setItem(name, data);
}

var getStorage = function(name){
	//recolhe todas as storage gravadas e guardas num array
	var data = localStorage.getItem(name);
	//se a storage existir retorna-a
	if(data != null){
		data = data.split(',');
		var d = []
		for(var x in data){
			d.push(data[x]);
		}
		return d;
	}
	//se não existir devolve true
	return [];
}

var getStorageSessi = function(name){
	//recolhe todas as storage gravadas e guardas num array
	var data = sessionStorage.getItem(name);
	//se a storage existir retorna-a
	if(data != null){
		data = data.split(',');
		var d = []
		for(var x in data){
			d.push(data[x]);
		}
		return d;
	}
	//se não existir devolve true
	return [];
}

var atualizaPontos = function(lista){
	if (getStorage("POINTS") == []) {
		writeStorage(lista, "POINTS");
	} else {
		var x = getStorage("POINTS");
		x.push(lista);
		writeStorage(x, "POINTS");
	}
}
