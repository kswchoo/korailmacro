// http://www.letskorail.com/ebizprd/EbizPrdTicketPr21111_i1.do

function injectJs(srcFile) {
    var scr = document.createElement('script');
    scr.src = srcFile;
    document.getElementsByTagName('head')[0].appendChild(scr);
}

var dsturl1 = "http://www.letskorail.com/ebizprd/EbizPrdTicketPr21111_i1.do";
var dsturl2 = "http://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do";
if (document.URL.substring(0, dsturl1.length) == dsturl1 ||
	document.URL.substring(0, dsturl2.length) == dsturl2) {

	$(document).ready(function() {
		injectJs(chrome.extension.getURL('inject.js'));

		if (localStorage.getItem('macro') == "true") {
			$(".btn_inq").append('<a href="#" onclick="macrostop();" style="font-size:15px; margin-left:5px;"><img src="' + chrome.extension.getURL('btn_stop.png') + '"></a>');
			
		} else {
			$(".btn_inq").append('<a href="#" onclick="macro();" style="font-size:15px; margin-left:5px;"><img src="' + chrome.extension.getURL('btn_start.png') + '"></a>');
		}

		if (localStorage.getItem('macro') == "true") {
			if ($("#divResult").length != 0) {
				var rows = $('#divResult > table.tbl_h tr');

				var succeed = false;
				for (i = 1; i < rows.length; i++) {
					var columns = $(rows[i]).children('td');
					var specials = $(columns[5]).children("a");
					if (specials.length != 0) {
						for (j = 0; j < specials.length; j++) {
							img = $(specials[j]).children('img');
							src = $(img).attr('src');
							if (src == "/docs/2007/img/common/icon_apm_yes.gif") {
								location.href = $(specials[j]).attr('href');
								succeed = true;
								break;
							}
						}
						if (succeed == true) break;
					}
				}

				if (succeed == true) {
					localStorage.removeItem('macro');
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
