//searchbar handler
$(function(){
	var searchField = $('#query');
	var icon = $('#search-btn');
	
	//Focus Handler
	$(searchField).on('focus',function(){
		$(this).animate({
			width:'100%'
		},400);
		$(icon).animate({
			right:'1px'
		},400);
	});
	
	//Blur Event Handler
	$(searchField).on('blur',function(){
	if(searchField.val() === ''){
		$(searchField).animate({
			width:'45%'
		},400,function(){}); 
		$(icon).animate({
			right:'385px'
		},400,function(){});
	}
	});
	
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
})

function search(){
	//clrear results
	$('#results').html('');
	$('#buttons').html('');
	
	//Get form input
	q =$('#query').val();
	
	//Run GET Request on API
	$.get("https://www.googleapis.com/youtube/v3/search",{
		part:'snippet , id',
		q:q,
		type:'video',
		key:'AIzaSyCFqxyXbud19AnMq2rpKN2H3AINnA7wVgo'
	},
	function(data){
		var nextPageToken = data.nextPageToken;
		var prevPageToken = data.prevPageToken;
			console.log(data);
			
			$ .each(data.items, function(i, item){
				//Get Output
				var output = getOutput(item);
				
				//Display Results
				$('#results').append(output);
			});
			
			var buttons = getButtons(prevPageToken, nextPageToken);
			
			//Display Buttons
			$('#buttons').append(buttons);
			function getButtons(prevPageToken, nextPageToken)
			{
				if(!prevPageToken){
					var btnoutput = '<div class="button-container">'+'<button id="next-button" class="padding-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
					'onclick="nextPage();">Next Page</button></div>';
				}
				else{
					var btnoutput = '<div class="button-container">'+'<button id="next-button" class="padding-button" data-token="'+prevPageToken+'" data-query="'+q+'" ' +
					'onclick="prevPage();">Previous Page</button></div>'
				+ '<div class="button-container">'+'<button id="next-button" class="padding-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
					'onclick="nextPage();">Next Page</button></div>';
				
				}
				return btnoutput;
			}
	}
	);
}

//Build Output
function getOutput(item)
{
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	//Build Otput String
	var output = '<li>'+'<div class="list-left">'+'<img src="'+thumb+'">'+'</div>'+'<div class="list-right">'+'<h3 ><a class="fancybox fancybox.iframe"  href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+
	'<small>By <span class="cTitle">'+channelTitle+'</span> on'+videoDate+'</small>'+
	'<p>'+description+'</p>'+
	'</div>' +
	'</li>'+
	'<div class="clearfix"></div>'+
	'';
	
	return output;
}


//Next Page Function
function nextPage()
{	var token = $('#next-button').data('token');
var q = $('#next-button').data('query');
	
	//clear results
	$('#results').html('');
	$('#buttons').html('');
	
	//Get form input
	q =$('#query').val();
	
	//Run GET Request on API
	$.get("https://www.googleapis.com/youtube/v3/search",{
		part:'snippet , id',
		q:q,
		pageToken: token,
		type:'video',
		key:'AIzaSyCFqxyXbud19AnMq2rpKN2H3AINnA7wVgo'
	},
	function(data){
		var nextPageToken = data.nextPageToken;
		var prevPageToken = data.prevPageToken;
			console.log(data);
			
			$ .each(data.items, function(i, item){ 
				//Get Output
				var output = getOutput(item);
				
				//Display Results
				$('#results').append(output);
			});
			
			var buttons = getButtons(prevPageToken, nextPageToken);
			
			//Display Buttons
			$('#buttons').append(buttons);
			function getButtons(prevPageToken, nextPageToken)
			{
				if(!prevPageToken){
					var btnoutput = '<div class="button-container">'+'<button id="next-button" class="padding-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
					'onclick="nextPage();">Next Page</button></div>';
				}
				else{
					var btnoutput = '<div class="button-container">'+'<button id="prev-button" class="padding-button" data-token="'+prevPageToken+'" data-query="'+q+'" ' +
					'onclick="prevPage();">Previous Page</button></div>'
				+'<div class="button-container">'+'<button id="next-button" class="padding-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
					'onclick="nextPage();">Next Page</button></div>';
				
				}
				return btnoutput;
			}
	}
	);
}


//Previous Page Function
function prevPage()
{	var token = $('#prev-button').data('token');
var q = $('#prev-button').data('query');
	
	//clear results
	$('#results').html('');
	$('#buttons').html('');
	
	//Get form input
	q =$('#query').val();
	
	//Run GET Request on API
	$.get("https://www.googleapis.com/youtube/v3/search",{
		part:'snippet , id',
		q:q,
		pageToken: token,
		type:'video',
		key:'AIzaSyCFqxyXbud19AnMq2rpKN2H3AINnA7wVgo'
	},
	function(data){
		var nextPageToken = data.nextPageToken;
		var prevPageToken = data.prevPageToken;
			console.log(data);
			
			$ .each(data.items, function(i, item){ 
				//Get Output
				var output = getOutput(item);
				
				//Display Results
				$('#results').append(output);
			});
			
			var buttons = getButtons(prevPageToken, nextPageToken);
			
			//Display Buttons
			$('#buttons').append(buttons);
			function getButtons(prevPageToken, nextPageToken)
			{
				if(!prevPageToken){
					var btnoutput = '<div class="button-container">'+'<button id="next-button" class="padding-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
					'onclick="nextPage();">Next Page</button></div>';
				}
				else{
					var btnoutput = '<div class="button-container">'+'<button id="prev-button" class="padding-button" data-token="'+prevPageToken+'" data-query="'+q+'" ' +
					'onclick="prevPage();">Previous Page</button></div>'
				+'<div class="button-container">'+'<button id="next-button" class="padding-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
					'onclick="nextPage();">Next Page</button></div>';
				
				}
				return btnoutput;
			}
	}
	);
}

