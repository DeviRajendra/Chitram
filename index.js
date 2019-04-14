$(document).ready(()=>{
	
	$('#button2').click(function() {
        //changing placeholder when clicked on name
        $('#title').attr('placeholder', 'Enter the IMDB id...')
        // removing the year searchbar 
        $('#year').css('display', 'none')
        // removing the active from other selected tabs and active the current one
        $('#button1').removeClass('selected')
        $('#button3').removeClass('selected')
        $(this).addClass('selected')
	$('.content').css({'display':'none'});
        $('input').val('')
	})

	$('#button1').click(function() {
        //changing placeholder when clicked on name
        $('#title').attr('placeholder', 'Enter the Title...')
        // removing the year searchbar 
        $('#year').css('display', 'none')
        // removing the active from other selected tabs and active the current one
        $('#button2').removeClass('selected')
        $('#button3').removeClass('selected')
        $(this).addClass('selected')
	$('.content').css({'display':'none'});
        $('input').val('')
	
    	})

	$('#button3').click(function(){
	$('#title').attr('placeholder','Enter the Title...')
	$('#year').css({'display':'block'})
	$('#button1').removeClass('selected')
        $('#button2').removeClass('selected')
        $(this).addClass('selected')
	$('.content').css({'display':'none'});
        $('input').val('')
	})
	
	

	$('#searchButton').click(function(){
		getMovieDetails();
	})

	$('input').keypress(function(event){
		if(event.which==13){
			getMovieDetails();		
		}
		
	}) 

	let getMovieDetails = () =>{
	$('.content').css({'display':'none'});
	let input1 = document.getElementsByTagName("input")
	let link=null;
	if($('#button2').hasClass('selected')){
		link=`https://www.omdbapi.com/?i=${input1[0].value}&apikey=fcd1c38c`
	}
	else if($('#button1').hasClass('selected')){
		link=`https://www.omdbapi.com/?t=${input1[0].value}&apikey=fcd1c38c`	
	}
	else if($('#button3').hasClass('selected')){
		link=`https://www.omdbapi.com/?t=${input1[0].value}&y=${input1[1].value}&apikey=fcd1c38c`
	}
	else{
		alert("Try again")
	}
	
	$.ajax({
	   type:'GET',
	   datatype:'json',
	   url:link,
	   success:(data)=>{
		if(data.Response=="True"){
		$('.details').css({"display":"block"})
		
		$('#nomovie').css({"display":"none"})
		if(data.Poster=="N/A")
			{
			$('.poster').attr('src','notavailable.jpg')
			}//if
		    else{
			$('.poster').attr('src',data.Poster)
			}
		let status;
		if(data.Ratings !== null && data.Ratings !== undefined && data.Ratings.length != 0) {
		for(let x of data.Ratings){if(x.Source=="Rotten Tomatoes"){status=x.Value;break;} else {status='N/A';}}}
		else{status='N/A'}


		$('.movieTitle').html(`<h4 style="display:inline">${data.Title}</h4>
		<span class="text-muted">(${data.Year})</span>
		<span class="text-info"><h4 style="display:inline; text-transform: capitalize;">${data.Type}</h4></span>              
		<p class="text-muted">Released on ${data.Released}</p> 
		<img src="clock.jpg" width="40" height="40"> - ${data.Runtime}<br>
		<p style="display:inline; text-transform: capitalize;">${data.Type}</p> available in <h4 style="display:inline">${data.Language}</h4><br>
		Made in <h4 style="display:inline">${data.Country}</h4><br>
		Genre: <h4 style="display:inline">${data.Genre}`);
		
		$('.ratings').html(`<img src="imdb.jpg" class="mb-2 imdbRating" width="80" height="40"> - <h4 style="display:inline">${data.imdbRating}</h4>/10(${data.imdbVotes})<br>
		<img src="rottentomatos.png" class="mb-2 rotten" width="80" height="40" > - <h4 style="display:inline">${status}</h4><br>
		<img src="metacitric.png" class="mb-2 metacitric" width="80" height="40" > - <h4 style="display:inline">${data.Metascore}</h4><br>
		Rated: <h4 style="display:inline">${data.Rated}`);	
		
		$('.story').html(`<h4>Plot: </h4><h4 class="text-muted">${data.Plot}</h4>`);

		if(data.Director!=null || data.Director!= undefined){$('.director').html(`<h4 style="display:inline" >Directed By:</h4><span> ${data.Director}</span>`)}else{$('.director').html(`<h4 style="display:inline" >Directed By:</h4>N/A`)}
		if(data.Actors!=null || data.Actors!= undefined ){$('.actors').html(`<h4 style="display:inline" >Cast:</h4><span> ${data.Actors}</span>`)}else{$('.actors').html(`<h4 style="display:inline" >Cast:</h4>N/A`)}
		if(data.Writer!=null || data.Writer!= undefined){$('.writer').html(`<h4 style="display:inline" >Writer:</h4><span> ${data.Writer}</span>`)}else{$('.writer').html(`<h4 style="display:inline" >Writer:</h4>N/A`)}
		if(data.Production!=null || data.Production!= undefined ){$('.production').html(`<h4 style="display:inline">Production:</h4> ${data.Production}`)}else{$('.production').html(`<h4 style="display:inline">Production:</h4> N/A`)}
		if(data.Website!=null || data.Website!= undefined ){$('.website').html(`<h4 style="display:inline" >Website:</h4><span> ${data.Website}</span>`)}else{$('.website').html(`<h4 style="display:inline" >Website:</h4> N/A`)}
		if(data.BoxOffice!=null || data.BoxOffice!=undefined ){$('.boxoffice').html(`<h4 style="display:inline" >BoxOffice:</h4><span> ${data.BoxOffice}</span>`)}else{$('.boxoffice').html(`<h4 style="display:inline" >BoxOffice:</h4> N/A`)}
		if(data.DVD!=null || data.DVD!= undefined ){$('.dvd').html(`<h4 style="display:inline" >DVD:</h4><span> ${data.DVD}</span>`)}else{$('.dvd').html(`<h4 style="display:inline" >DVD:</h4> N/A`)}
		if(data.Awards!=null || data.Awards!= undefined){$('.awards').html(`<h4 style="display:inline" >Awards: </h4><span> ${data.Awards}</span>`)}else{$('.awards').html(`<h4 style="display:inline" >Awards:</h4> N/A`)}
		if(data.imdbID!=null || data.imdbID!= undefined){$('.IMDBid').html(`<h4 style="display:inline" >IMDB id: </h4><span> ${data.imdbID}</span>`)}else{$('.IMDBid').html(`<h4 style="display:inline" >IMDB id:</h4> N/A`)}
		
			

		}//if
		
		
				
		else{
		$('.details').css({"display":"none"})
		$('#nomovie').css({"display":"block"})
		}
	   	 
	},//success

	timeout: 5000,
	
	error : (jqXHR, error)   =>  {
		if(error==='timeout'){
			alert('Failed timeout')
		}
		else{
			alert("uncaught error")
		}
	},//error

	beforeSend:()=> {
		$('#loading').css({"display":"block"})

	},//before send

	complete:()=>{
		$('#loading').css({'display':'none'})
	}

	})//ajax call
	
	}//get movie details

	



})