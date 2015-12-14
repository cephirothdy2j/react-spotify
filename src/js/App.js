// AlbumThumb is iterated over in AlbumsList
var AlbumThumb = React.createClass({
	render : function() {
		var style = {
			overflow : {
				overflow: 'hidden',
				textOverflow:'ellipsis',
				whiteSpace:'nowrap'
			}
		};
		return (
			<div className="col-xs-6 col-sm-4 col-md-3">
				<div className="thumbnail">
					<img src={this.props.imageUrl} /> 
					<div className="caption">
						<p style={style.overflow}>{this.props.name}</p>
					</div>
				</div>
			</div>
		)
	}
});

var AlbumsList = React.createClass({
	render : function() {
		var albums = [];
        	if(this.props.albums) {
        		this.props.albums.forEach(function(album) {
	        		albums.push(<AlbumThumb imageUrl={album.imageUrl} name={album.name} />);
	        	}.bind(this));
        	}
	        return (
	        	<div className="container">
	        		<div className="row">
	        			{albums}
	    			</div>
				</div>
	        );
	}
});

var ArtistHeader = React.createClass({
	render : function() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="text-center col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
							<img className="img-responsive" src={this.props.artistimg} />
						</div>
					</div>
					<div className="row">
						<div className="text-center col-xs-12">
							<h1>{this.props.artistname}</h1>
						</div>
					</div>
				</div>
				<hr />
			</div>
		)
	}
});

var Search = React.createClass({
    handleChange: function() {
    	// change the value of the input field as we change its value ... Yes this is dumb but it's a React requirement.
        this.props.handleValueChange(
            this.refs.searchInput.value
        );
    },
	handleSubmit : function(e) {
		// take the value of the input field and submit it to Spotify to search
		e.preventDefault();
		return this.props.onSubmit(this.refs.searchInput.getDOMNode().value);
	},
	render : function() {
		return (
			<div className="navbar navbar-default">
			  <div className="container">
			  	<br />
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <div className="col-xs-9 col-sm-8 col-sm-offset-1">
				      <input value={this.props.search} onChange={this.handleChange} ref="searchInput" type="text" className="form-control" placeholder="Search for an artist ..." />
				    </div>
				    <div className="col-xs-3 col-sm-2">
				      <button type="submit" className="btn btn-default btn-block">Search</button>
				    </div>
				  </div>
				</form>
			  </div>
		  </div>
		)
	}
});


var App = React.createClass({
	getInitialState : function() {
		return {
			search : '',
			artist : {}
		}
	},
	handleValueChange : function(search) {
		// on change of the input field, save the value to the wrapper element's state
		this.setState({search: search});
	},
	getArtist : function(query) {
		// get an artist from the Spotify API. This is called on submit of the search field.
		var self = this;
		// surprisingly this is just a normal jQuery GET operation.
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
			<div>
				<Search search={this.state.search} onUserInput={this.handleValueChange} onSubmit={this.getArtist} />
				<ArtistHeader artistname={this.state.artist.name} artistimg={this.state.artist.imageUrl} /> 
				<AlbumsList albums={this.state.artist.albums} />
			</div>
		)
	}
});

React.render(<App />, document.getElementById('app'));





