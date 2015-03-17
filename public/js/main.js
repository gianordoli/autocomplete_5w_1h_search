/* Your code starts here */

var app = {};

app.init = function() {

	var width = window.innerWidth;
	var height = window.innerHeight;
	var currDiv = 0;
	var isMoving = false;

	callLoader();
	attachEvents();
	loadData();

	/*------------------ FUNCTIONS ------------------*/	

	// Loading the list of domais/countries and services from the server
	function loadData(){
        $.post('/start', {}, function(response) {
            // console.log(response);
            if(response.error){
            	throw response.error	
            }else{
				// console.log(response);
				// remove HOW
				var words = _.reject(response, function(value, index, list){
					return value.word == 'how';
				});

				// group by word (WHY, HOW,...)
				words = _.groupBy(words, function(value, index, list){
					// console.log(value.word);
					return value.word;
				});

				// Sort by date
				_.each(words, function(item, index, list){
					// console.log(item);
					_.sortBy(item, function(it, i, list) {
						return it.date;
					})
					item.reverse();
				});

				// console.log(words);
				// printResults(words);
				// console.log(_.toArray(words));
				printResults(_.toArray(words));
            }
        });		
	}

	// Show search results
	function printResults(data){
		console.log('Called printResults.')
		// console.log(data);
		$('#results-container').empty();
		$('#loader-container').remove();

		_.each(data, function(item, index, list){
			// console.log(item.length);
			var wordDiv = $('<div id="'+index+'" class="word-container"></div>')
						   .appendTo('#results-container');
			
			var word = $('<div class="word"><h1>'+item[0].word+'</h1></div>')
						.css('top', index*height)
						.appendTo('#titles-container');

			_.each(item, function(item, index, list){
				// console.log(index);
				var predictionsByDayDiv = $('<div class="predictions-container"><p>'+formatDateMMDDYYY(item.date)+'</p></div>')
										   .appendTo(wordDiv);
			
				var predictionsUl = $('<ul></ul>')
									 .appendTo(predictionsByDayDiv);

				_.each(item.results, function(value, key, list){
					var query = 'https://google.com/#q='+replaceSpaces(value);					
					var li = $('<li><a href="'+query+'">'+value+'</a></li>')
							  .appendTo(predictionsUl);
				});
			});
		});
	}

	// A function where we keep all user's interaction listener (buttons, etc)
	function attachEvents() {
		document.onkeydown = checkKey;
	}

	function checkKey(e) {
		
		if(!isMoving){

		    e = e || window.event;
		    // up arrow
		    if (e.keyCode == '38') {
				if($('.container').scrollTop() > 0){
					currDiv --;
					moveUpDown('up');
				}
			}

		    // down arrow
		    else if (e.keyCode == '40') {
				if($('.container').scrollTop() < $('#results-container').height() - height){
					currDiv ++;
					moveUpDown('down');
				}
		    }

	        // left arrow
		    else if (e.keyCode == '37') {
				isMoving = true;
				var currScrollLeft = $('#'+currDiv).scrollLeft();
				$('#'+currDiv).animate({
					scrollLeft: currScrollLeft - width
				}, 500, function(){
					isMoving = false;
				});	       
		    }

		    // right arrow
		    else if (e.keyCode == '39') {
		    	isMoving = true;
				var currScrollLeft = $('#'+currDiv).scrollLeft();
				$('#'+currDiv).animate({
					scrollLeft: currScrollLeft + width
				}, 500, function(){
					isMoving = false;
				});
		    }
		}		
	}	

	var moveUpDown = function(direction){
		// console.log('move');
		isMoving = true;
        $('.container').animate({
			scrollTop: height*currDiv
		}, 500, function(){
			isMoving = false;
		});
	}

	/*-------------------- AUXILIAR FUNCTIONS --------------------*/

	// Formats UTC date to MM/DD/YYYY
	function formatDateMMDDYYY(date){
		var newDate = new Date(date);
		var monthString = newDate.getMonth() + 1;
		if (monthString < 10) monthString = '0' + monthString;
		var dateString = newDate.getDate();
		var yearString = newDate.getFullYear();
		return monthString + '/' + dateString + '/' + yearString;
	}	

	// Show loading
	function callLoader(){
		$('#results-container').empty();
		var loaderContainer = $('<div id="loader-container"></div>')
		var loader = $('<span class="loader"></span>');
		$(loaderContainer).append(loader);
		$('body').append(loaderContainer)
	}

	var replaceSpaces = function(query){
		while(query.indexOf(' ') > -1){
			query = query.replace(' ', '+') 
		}
		return query;
	}
}

app.init();