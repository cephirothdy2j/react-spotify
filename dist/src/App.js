var AlbumThumb = React.createClass({displayName: "AlbumThumb",
	render : function() {
		var style = {
			overflow : {
				overflow: 'hidden',
				textOverflow:'ellipsis',
				whiteSpace:'nowrap'
			}
		};
		return (
			React.createElement("div", {className: "col-xs-6 col-sm-4 col-md-3"}, 
				React.createElement("div", {className: "thumbnail"}, 
					React.createElement("img", {src: this.props.imageUrl}), 
					React.createElement("div", {className: "caption"}, 
						React.createElement("p", {style: style.overflow}, this.props.name)
					)
				)
			)
		)
	}
});

var AlbumsList = React.createClass({displayName: "AlbumsList",
	render : function() {
		var albums = [];
        	if(this.props.albums) {
        		this.props.albums.forEach(function(album) {
	        		albums.push(React.createElement(AlbumThumb, {imageUrl: album.imageUrl, name: album.name}));
	        	}.bind(this));
        	}
	        return (
	        	React.createElement("div", {className: "container"}, 
	        		React.createElement("div", {className: "row"}, 
	        			albums
	    			)
				)
	        );
	}
});

var ArtistHeader = React.createClass({displayName: "ArtistHeader",
	render : function() {
		return (
				React.createElement("div", null, 
					React.createElement("div", {className: "container"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "text-center col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"}, 
								React.createElement("img", {className: "img-responsive", src: this.props.artistimg})
							)
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "text-center col-xs-12"}, 
								React.createElement("h1", null, this.props.artistname)
							)
						)
					), 
					React.createElement("hr", null)
				)
		)
	}
});

var Search = React.createClass({displayName: "Search",
    handleChange: function() {
        this.props.handleValueChange(
            this.refs.searchInput.value
        );
    },
	handleSubmit : function(e) {
		e.preventDefault();
		return this.props.onSubmit(this.refs.searchInput.getDOMNode().value);
	},
	render : function() {
		return (
			React.createElement("div", {className: "navbar navbar-default"}, 
			  React.createElement("div", {className: "container"}, 
			  	React.createElement("br", null), 
				React.createElement("form", {className: "form-horizontal", onSubmit: this.handleSubmit}, 
				  React.createElement("div", {className: "form-group"}, 
				    React.createElement("div", {className: "col-xs-9 col-sm-8 col-sm-offset-1"}, 
				      React.createElement("input", {value: this.props.search, onChange: this.handleChange, ref: "searchInput", type: "text", className: "form-control", placeholder: "Search for an artist ..."})
				    ), 
				    React.createElement("div", {className: "col-xs-3 col-sm-2"}, 
				      React.createElement("button", {type: "submit", className: "btn btn-default btn-block"}, "Search")
				    )
				  )
				)
			  )
		  )
		)
	}
});


var App = React.createClass({displayName: "App",
	getInitialState : function() {
		return {
			search : '',
			artist : {}
		}
	},
	handleValueChange : function(search) {
		this.setState({search: search});
	},
	getArtist : function(query) {
		var self = this;
	    $.get('/api/search?s='+query, function(result) {
			if (self.isMounted()) {
				console.log(result);
				self.setState({
					search : query,
					artist : result
				});		
    		}
	    });
	},
	render : function() {
		return (
			React.createElement("div", null, 
				React.createElement(Search, {search: this.state.search, onUserInput: this.handleValueChange, onSubmit: this.getArtist}), 
				React.createElement(ArtistHeader, {artistname: this.state.artist.name, artistimg: this.state.artist.imageUrl}), 
				React.createElement(AlbumsList, {albums: this.state.artist.albums})
			)
		)
	}
});

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
React.render(React.createElement(App, null), document.getElementById('app'));





