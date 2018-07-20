import React, { PureComponent } from 'react';

export default class Search extends PureComponent {

  render() {

    return (
    	<div>
	      	<input type="text" id = "search" placeholder="Search.." />
	      	<button type="submit" className="btn btn-secondary" onClick = {event => this.props.onTextChange(document.getElementById('search').value)}>Find</button>
      	</div>
    );
  }
}
