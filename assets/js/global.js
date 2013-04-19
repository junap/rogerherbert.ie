var site =
{
	init: function()
	{
		if (window.innerWidth > 767)
		{
			site.loadPanels();
		};
	},

	loadPanels: function()
	{
		$('article > div').each(function()
		{
			var type = $(this).attr('data-type');
			var service = $(this).attr('data-service');
			var query = $(this).attr('data-query');

			panel = $('<div/>')
			  .addClass('panel ' + type)
			  .append('<div class="arrow"/>')
			  .appendTo($(this));

			api.init(service, query, panel);
		});
	}
};

var api = 
{
	init: function(service, query, element)
	{
		switch(service)
		{
			case 'avatar':
				avatar.init(query, element);
				break;
		
			case 'googlemaps':
				googlemaps.init(query, element);
				break;
			
			case 'twitter':
				twitter.init(query, element);
				break;
			
			case 'github':
				github.init(query, element);
				break;
				
			case 'podcasts':
				podcasts.init(query, element);
				break;
				
			case 'books':
				books.init(query, element);
				break;
			
			default:
				break;
		}
	}
};

var avatar =
{
	init: function(img_url, element)
	{
		$(element).append('<div style="background-image: url(/assets/images/avatar.jpg); background-size: cover; height: 300px;" class="stuff"></div>');
	}
};

var googlemaps = 
{
	init: function(query, element)
	{
		$(element).append('<div style="background-image: url(https://maps.googleapis.com/maps/api/staticmap?sensor=false&size=600x600&zoom=5&maptype=terrain&markers=' + encodeURIComponent(query) + '); background-size: cover; height: 300px;" class="stuff"></div>');
	}
};

var twitter =
{
	init: function(user, element)
	{
		$.getScript('https://platform.twitter.com/widgets.js');
		$(element).append('<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/' + user + '" data-widget-id="318009668242898944" height="600" data-chrome="nofooter noborders">Tweets by @' + user + '</a>');
	}
};

var github =
{
	init: function(user, element)
	{
		$.getJSON('https://api.github.com/users/' + user + '/repos').done(function(data) 
		{
			var repos = [];

			$.each(data, function(key, item) 
			{
				var li_class = (item.fork) ? ' class="fork"' : '';
				repos.push('<li'+ li_class +'><h3><a href="'+ item.html_url +'">'+ item.name +'</a></h3><p>'+ item.description +'</p></li>');
			});
			
			$(element).append($('<ul/>').html(repos.join('')));
		});
	}
};

var podcasts =
{
	init: function(id_str, element)
	{
		$.getJSON('https://itunes.apple.com/lookup?callback=?&country=IE&id=' + id_str).done(function(data)
		{
			var channels = [];

			$.each(data.results, function(key, item) 
			{
				channels.push('<li style="background-image: url('+ item.artworkUrl60 +');"><h3><a href="'+ item.collectionViewUrl +'">'+ item.collectionName +'</a></h3><p>'+ item.primaryGenreName +'</p></li>');
			});
			
			$(element).siblings('ul').remove();
			$(element).append($('<ul/>').html(channels.join('')));
		});
	}
};

var books =
{
	init: function(user, element)
	{
		list = $(element).siblings('ul');
		$(element).append(list);
	}
};
