var navigation = {

	width: '',

	height: '',

	setup: function(width, height){
		navigation.width = width;
		navigation.height = height;
	},

	showHideArrows: function(currDiv){
		console.log('Called showHideArrows.');

		// UP
		if($('.container').scrollTop() <= 0){
			$('#up').css('display', 'none');
		}		
		// DOWN
		else if($('.container').scrollTop() >= $('#results-container').height() - navigation.height){
			$('#down').css('display', 'none');
		}
		// MIDDLE
		else{
			$('#up').css('display', 'inline-block');
			$('#down').css('display', 'inline-block');
		}

		// LEFT/RIGHT
		var currScrollLeft = $('#'+currDiv).scrollLeft();
		var maxScrollLeft = ($('#'+currDiv).children().length - 1) * navigation.width;
		
		// LEFT		
		if(currScrollLeft <= 0){
			$('#left').css('display', 'none');
			$('#right').css('display', 'inline-block');
		}
		// RIGHT
		else if(currScrollLeft >= maxScrollLeft){
			$('#left').css('display', 'inline-block');
			$('#right').css('display', 'none');
		}
		// CENTER
		else{
			$('#left').css('display', 'inline-block');
			$('#right').css('display', 'inline-block');
		}

	},

	checkKey: function(e) {

	    e = e || window.event;

	    // up arrow
	    if (e.keyCode == '38') {
			navigation.checkUpDown('up');
		}

	    // down arrow
	    else if (e.keyCode == '40') {
			navigation.checkUpDown('down');
	    }

        // left arrow
	    else if (e.keyCode == '37') {
  			checkLeftRight('left');
	    }

	    // right arrow
	    else if (e.keyCode == '39') {
	    	checkLeftRight('right');
	    }
	},	

	checkUpDown: function(arrow){
		if(arrow == 'up'){
			if($('.container').scrollTop() > 0){
				currDiv --;
				moveUpDown();
			}			
		}else if(arrow == 'down'){
			if($('.container').scrollTop() < $('#results-container').height() - navigation.height){
				currDiv ++;
				moveUpDown();
			}
		}
	},

	moveUpDown: function(){
		isMoving = true;
		// console.log('move');
        $('.container').animate({
			scrollTop: navigation.height*currDiv
		}, 500, function(){
			isMoving = false;
			showHideArrows();
		});		
	},

	checkLeftRight: function(arrow){	
		var currScrollLeft = $('#'+currDiv).scrollLeft();
		var maxScrollLeft = ($('#'+currDiv).children().length - 1) * navigation.width;
		if((arrow == 'left' && currScrollLeft > 0) ||
		   (arrow == 'right' && currScrollLeft < maxScrollLeft)){
			moveLeftRight(arrow);
		}
	},

	moveLeftRight: function(arrow){
		var direction = (arrow == 'left') ? (-1) : (1);
		isMoving = true;
		var currScrollLeft = $('#'+currDiv).scrollLeft();
		$('#'+currDiv).animate({
			scrollLeft: currScrollLeft + (navigation.width * direction)
		}, 500, function(){
			isMoving = false;
			showHideArrows();
		});	 		
	}
};