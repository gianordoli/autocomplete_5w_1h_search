/* Your code starts here */

var app = {};

app.init = function() {

	callLoader();
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
				var words = _.groupBy(response, function(value, index, list){
					return value.word;
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
		
		var width = window.innerWidth;
		var height = window.innerHeight;

		_.each(data, function(item, index, list){
			// console.log(item.length);
			var wordDiv = $('<div class="word-container"></div>')
						   .appendTo('#results-container')
						   .css({
						   	 'top': index*height,
						   	 'width': (item.length)*width
						   });
			
			var word = $('<div class="word">'+item[0].word+'</div>')
						.css('top', index*height)
						.appendTo('#results-container');

			_.each(item, function(item, index, list){
			
				var predictionsByDayDiv = $('<div class="predictions-container">'+formatDateMMDDYYY(item.date)+'</div>')
										   .appendTo(wordDiv);
			
				var predictionsUl = $('<ul></ul>')
									 .appendTo(predictionsByDayDiv);

				_.each(item.results, function(value, key, list){
					var li = $('<li>'+value+'</li>')
							  .appendTo(predictionsUl);
				});
			});
		});
	}

	// A function where we keep all user's interaction listener (buttons, etc)
	function attachEvents() {

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

	// Capitalize first letter of any String
	String.prototype.capitalizeFirstLetter = function() {
    	return this.charAt(0).toUpperCase() + this.slice(1);
	}
}

app.init();