$( document ).ready(function() {
    $("#post-status").click(function(){
    	chrome.runtime.sendMessage({action: "POST_STATUS"}, function(response) {});
    });

    $("#like-post").click(function(){
    	chrome.runtime.sendMessage({action: "LIKE_POST", postid : $("#post-text").val()}, function(response) {});
    });
});