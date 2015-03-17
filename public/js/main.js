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
            }
        });		
	}



	// A function where we keep all user's interaction listener (buttons, etc)
	function attachEvents() {

	}

	// Show loading
	function callLoader(){
		$('#results-container').empty();
		var loaderContainer = $('<div id="loader-container"></div>')
		var loader = $('<span class="loader"></span>');
		$(loaderContainer).append(loader);
		$('body').append(loaderContainer)
	}

	// Show search results
	function printResults(data){
		console.log('Called printResults.')
		// console.log(data);
		$('#results-container').empty();
		$('#loader-container').remove();

		_.each(data, function(value, key, list){
			console.log(value);
			var wordDiv = $('<div class="word-container">'+key+'</div>')
						   .appendTo('#results-container');
			
			_.each(value, function(value, key, list){
			
				var predictionsByDayDiv = $('<div class="predictions-container">'+value.date+'</div>')
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

	// Capitalize first letter of any String
	String.prototype.capitalizeFirstLetter = function() {
    	return this.charAt(0).toUpperCase() + this.slice(1);
	}
}

app.init();