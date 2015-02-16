
function macro() {
	alert("매크로를 시작합니다.");
	localStorage.setItem('macro', true);
	inqSchedule();
}

function macrostop() {
	alert("매크로를 중지합니다.");
	localStorage.removeItem('macro');
}