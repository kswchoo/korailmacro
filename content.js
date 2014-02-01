// http://www.korail.com/servlets/pr.pr21100.sw_pr21111_i1Svt

function injectJs(srcFile) {
    var scr = document.createElement('script');
    scr.src = srcFile;
    document.getElementsByTagName('head')[0].appendChild(scr);
}

var dsturl = "http://www.korail.com/servlets/pr.pr21100.sw_pr21111_i1Svt";
if (document.URL.substring(0, dsturl.length) == dsturl) {

	$(document).ready(function() {

	injectJs(chrome.extension.getURL('inject.js'));
		if (localStorage.getItem('macro') == "true") {
			$("#nkhsch").append('<a href="#" onclick="macrostop();" style="font-size:15px; color:stop;"><img src="' + chrome.extension.getURL('macrostop.gif') + '"></a>');
			
		} else {
			$("#nkhsch").append('<a href="#" onclick="macro();" style="font-size:15px; color:green;"><img src="' + chrome.extension.getURL('macro.gif') + '"></a>');
		}

		if (localStorage.getItem('macro') == "true") {
			var rows = $('#divResult > table.list-view tr');

			var succeed = false;
			for (i = 1; i < rows.length; i++) {
				var columns = $(rows[i]).children('td');
				var specials = $(columns[5]).children("a");
				if (specials.length != 0) {
					for (j = 0; j < specials.length; j++) {
						img = $(specials[j]).children('img');
						src = $(img).attr('src');
						if (src == "/2007/img/common/icon_apm_yes.gif") {
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
			} else {
				// 모두 실패한 경우
				setTimeout(function() { 
				location.href = "javascript:inqSchedule();";
				}, 500);
				
			}
		}
	});

}
