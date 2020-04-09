var letterGather = function(tecla){
	if (tecla > 96 && tecla < 123){
		tecla = String.fromCharCode(tecla).toUpperCase();
		if (chosenLetters.indexOf(tecla) < 0){
			letterChecker(Letras[Letras.indexOf(tecla)],word);
		}
	}
}

var main = function(){
	$(document).keypress(function(event) {
		if ($('#endGame').css('display')=='none'){
  			letterGather(event.which || event.keyCode);
  		}
	});
}
window.onload = main();
