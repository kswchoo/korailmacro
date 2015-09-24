
function macro() {
	coachSelected = [].map.call(document.querySelectorAll('.coachMacro:checked'), function (select) {
		return select.value;
	});
	firstSelected = [].map.call(document.querySelectorAll('.firstMacro:checked'), function (select) {
		return select.value;
	});

	if (coachSelected.length == 0 && firstSelected.length == 0) {
		alert("매크로를 실행하기 위해서는 예매하기 위한 열차 1개 이상을 선택하십시오.");
	} else {
		alert("매크로를 시작합니다.\n트럼펫 소리가 나면 5분 안에 결재를 마쳐주셔야 합니다.");

		localStorage.setItem('macro', true);
		localStorage.setItem('coachSelected', JSON.stringify(coachSelected));
		localStorage.setItem('firstSelected', JSON.stringify(firstSelected));

		// 인원 설정값 저장
		localStorage.setItem('peop01', document.getElementById('peop01').value);
		localStorage.setItem('peop02', document.getElementById('peop02').value);
		localStorage.setItem('peop03', document.getElementById('peop03').value);
		localStorage.setItem('obs13', document.getElementById('obs13').value);
		localStorage.setItem('obs46', document.getElementById('obs46').value);
		localStorage.setItem('seat01', document.getElementById('seat01').value);
		localStorage.setItem('seat02', document.getElementById('seat02').value);
		localStorage.setItem('seat03', document.getElementById('seat03').value);
		inqSchedule();
	}
}

function macrostop() {
	alert("매크로를 중지합니다.\n조건을 변경하여 재조회하신 후 다시 시작하실 수 있습니다.");
	localStorage.removeItem('macro');
	localStorage.removeItem('coachSelected');
	localStorage.removeItem('firstSelected');
	localStorage.removeItem('peop01');
	localStorage.removeItem('peop02');
	localStorage.removeItem('peop03');
	localStorage.removeItem('obs13');
	localStorage.removeItem('obs46');
	localStorage.removeItem('seat01');
	localStorage.removeItem('seat02');
	localStorage.removeItem('seat03');

	inqSchedule();
}