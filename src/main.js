$(document).ready (() =>
{
	Rx.Observable.fromEvent($('#textInput'), 'keyup')
		.map (e => e.target.value)
		.filter (text => text.length > 2)
		.throttle (500)
		.distinctUntilChanged()
		.flatMapLatest(text => Rx.Observable.fromPromise (
			$.ajax({
				url: 'http://en.wikipedia.org/w/api.php',
				dataType: 'jsonp',
				data: {
					action: 'opensearch',
					format: 'json',
					search: encodeURI(text)
				}
			}).promise()))
		.subscribe(
			data =>
			{
				$('#results')
					.empty()
					.append ($.map (data[1], val => $('<li>').text (val)));
	    	},
	    	e => { $('#results').empty().text (e); })
});