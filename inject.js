
function macro() {
	alert("매크로를 시작합니다.\n트럼펫 소리가 나면 5분 안에 결재를 마쳐주셔야 합니다.");
	localStorage.setItem('macro', true);
	inqSchedule();
}

function macrostop() {
	alert("매크로를 중지합니다.\n조건을 변경하여 재조회하신 후 다시 시작하실 수 있습니다.");
	localStorage.removeItem('macro');
}