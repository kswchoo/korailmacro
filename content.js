// http://www.letskorail.com/ebizprd/EbizPrdTicketPr21111_i1.do

function injectJs(srcFile) {
    var scr = document.createElement('script');
    scr.src = srcFile;
    document.getElementsByTagName('head')[0].appendChild(scr);
}

function redirectPage(href) {
	if (href.indexOf("javascript:") == 0) {
		href = "window.showModalDialog=window.showModalDialog || function(url, arg, opt) {window.open(url, arg, opt);};window.confirm=function (str) {return true;};infochk=function(a,b){infochk2(a,b);};" + href.substring(11, href.length);
		location.href = "javascript:" + href;
	} else {
		location.href = href;
	}
}

var dsturl1 = "http://www.letskorail.com/ebizprd/EbizPrdTicketPr21111_i1.do";
var dsturl2 = "http://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do";
if (document.URL.substring(0, dsturl1.length) == dsturl1 ||
	document.URL.substring(0, dsturl2.length) == dsturl2) {

	$(document).ready(function() {
		injectJs(chrome.extension.getURL('inject.js'));

		var coachSelected = JSON.parse(localStorage.getItem('coachSelected'));
		var firstSelected = JSON.parse(localStorage.getItem('firstSelected'));
		if (coachSelected == null) coachSelected = [];
		if (firstSelected == null) firstSelected = [];
		console.log("coach:" + coachSelected);
		console.log("first:" + firstSelected);

		if (localStorage.getItem('macro') == "true") {
			$(".btn_inq").append('<a href="#" onclick="macrostop();" style="font-size:15px; margin-left:5px;"><img src="' + chrome.extension.getURL('btn_stop.png') + '"></a>');
			
		} else {
			$(".btn_inq").append('<a href="#" onclick="macro();" style="font-size:15px; margin-left:5px;"><img src="' + chrome.extension.getURL('btn_start.png') + '"></a>');
		}

		// 테이블에 "매크로" 버튼을 삽입한다.
		if ($("#divResult").length != 0) {
			var rows = $('#divResult > table.tbl_h tr');
			for (i = 1; i < rows.length; i++) {
				var columns = $(rows[i]).children('td');
				var first = $(columns[4]);
				var coach = $(columns[5]);
				if (coach.children().length > 0) {
					coach.append($("<p class='p5'></p>"));
					var checkbox = $("<label></label>").html('<input type="checkbox" name="checkbox" class="coachMacro" value="' + i + '">매크로');
					checkbox.children('input').prop('checked', coachSelected.indexOf(i+"") > -1);
					coach.append(checkbox);
				}
				if (first.children().length > 0) {
					first.append($("<p class='p5'></p>"));
					var checkbox = $("<label></label>").html('<input type="checkbox" name="checkbox" class="firstMacro" value="' + i + '">매크로');
					checkbox.children('input').prop('checked', firstSelected.indexOf(i+"") > -1);
					first.append(checkbox);
				}
			}
		}

		if (localStorage.getItem('macro') == "true") {

			// Restore preferences
			$("#peop01").val(localStorage.getItem('peop01'));
			$("#peop02").val(localStorage.getItem('peop02'));
			$("#peop03").val(localStorage.getItem('peop03'));
			$("#obs13").val(localStorage.getItem('obs13'));
			$("#obs46").val(localStorage.getItem('obs46'));
			$("#seat01").val(localStorage.getItem('seat01'));
			$("#seat02").val(localStorage.getItem('seat02'));
			$("#seat03").val(localStorage.getItem('seat03'));

			if ($("#divResult").length != 0) {
				var rows = $('#divResult > table.tbl_h tr');

				var succeed = false;
				for (i = 1; i < rows.length; i++) {
					var columns = $(rows[i]).children('td');

					var first = $(columns[4]);
					var coach = $(columns[5]);

					if (coachSelected.indexOf(i+"") > -1) {
						var coachSpecials = coach.children("a");
						if (coachSpecials.length != 0) {
							for (j = 0; j < coachSpecials.length; j++) {
								img = $(coachSpecials[j]).children('img');
								src = $(img).attr('src');
								if (src == "/docs/2007/img/common/icon_apm_bl.gif" || src == "/docs/2007/img/common/icon_apm_rd.gif") {
									redirectPage($(coachSpecials[j]).attr('href'));
									succeed = true;
									break;
								}
							}
							if (succeed == true) break;
						}
					}

					if (firstSelected.indexOf(i+"") > -1) {
						var firstSpecials = first.children("a");
						if (firstSpecials.length != 0) {
							for (j = 0; j < firstSpecials.length; j++) {
								img = $(firstSpecials[j]).children('img');
								src = $(img).attr('src');
								if (src == "/docs/2007/img/common/icon_apm_bl.gif" || src == "/docs/2007/img/common/icon_apm_rd.gif") {
									redirectPage($(coachSpecials[j]).attr('href'));
									succeed = true;
									break;
								}
							}
							if (succeed == true) break;
						}
					}
				}

				if (succeed == true) {
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
					chrome.extension.sendMessage({type: 'playSound'}, function(data) { });
				} else {
					// 모두 실패한 경우
					setTimeout(function() { 
					location.href = "javascript:inqSchedule();";
					}, 500);
				}
			} else {
				// 결과폼이 없는 경우 (오류 화면 발생?)
				history.go(-1);
			}
		}
	});

}
