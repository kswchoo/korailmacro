
function macro() {
	alert("Now starting macro.");
	localStorage.setItem('macro', true);
	inqSchedule();
}

function macrostop() {
	alert("Now stopping macro.");
	localStorage.removeItem('macro');
}