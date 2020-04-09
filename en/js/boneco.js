var updateBoneco = function (multi){
	var show = 10*multi;
	var height = 10*(multi-1);
	var animation = setInterval(function () {
		height = height + 1;
		$("#bonecoREL").css('height', String(height)+'%');
		if (height == show){
			clearInterval(animation);
		}
	},30);
}
var updateBonecoMul = function (multi, U){
	var show = 9*multi;
	var height = 9*(multi-1);
	var animation = setInterval(function () {
		height = height + 1;
		$("#bonecoREL"+U).css('height', String(height)+'%');
		if (height == show){
			clearInterval(animation);
		}
	},30);
}
