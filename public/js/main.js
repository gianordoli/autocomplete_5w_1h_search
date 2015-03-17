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
				printResults(words);
				// console.log(_.toArray(words));
				// printResults(_.toArray(words));
            }
        });		
	}

	// Show search results
	function printResults(data){
		console.log('Called printResults.')
		// console.log(data);
		$('#results-container').empty();
		$('#loader-container').remove();

		var height = document.body.clientHeight;

		_.each(data, function(value, key, list){
			// console.log(value);
			var wordDiv = $('<div class="word-container"></div>')
						   .appendTo('#results-container');
			
			// var word = $('<div class="word"></div>')
			// 			// .css('top', )
			// 			.appendTo(wordDiv);

			_.each(value, function(value, key, list){
			
				var predictionsByDayDiv = $('<div class="predictions-container">'+formatDateMMDDYYY(value.date)+'</div>')
										   .appendTo(wordDiv);
			
				var predictionsUl = $('<ul></ul>')
									 .appendTo(predictionsByDayDiv);

				_.each(value.results, function(value, key, list){
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