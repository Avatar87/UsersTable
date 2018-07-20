import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
require("bootstrap-less/bootstrap/bootstrap.less");

import Loading from '../components/Loading';
import Search from '../components/Search';

class Row extends PureComponent {
static propTypes = {
  user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
  }).isRequired
  };

  render() {
  const { user } = this.props;
    return (
      <div className="row" onClick = {event => this.props.onSelect(user)}>
        <div>{user.id}</div>
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>    
        <div>{user.phone}</div>    
      </div>
    );
  }
}

export default class UserListContainer extends PureComponent {

constructor(props) {
  super(props);

  this.state = {
    users: [],
    loading: false,
    shouldHide: true,
    filterString: '',
    userdata: '',
    activePage: 1,
    itemsCountPerPage: 50
  }
    this.compareByAsc.bind(this);
    this.compareByDesc.bind(this);
    this.sortBy.bind(this);

}

handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
  }

compareByAsc(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

compareByDesc(key) {
    return function (a, b) {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    };
  }
 
sortBy = (key, event) => {
    let arrayCopy = [...this.state.users];
    let caption = event.target.innerHTML;
    if (caption.search('▼') !== -1) {
     arrayCopy.sort(this.compareByAsc(key));
     this.setState({users: arrayCopy});
     event.target.innerHTML = caption.slice(0, -1) + '▲';
    }
     else if (caption.search('▼') == -1) {
     arrayCopy.sort(this.compareByDesc(key));
     this.setState({users: arrayCopy});
     event.target.innerHTML = caption.slice(0, -1) + '▼';
     }   
  }


handleSendClick1 = (event) => {

  this.setState({ loading: true });
   fetch('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
    .then((response) => response.json())
    .then((users) => {
      this.setState({
         users,
         loading: false,
         shouldHide: false
      })

    })
    .catch(() => {
         this.setState({
         users: [],
         loading: false,
         shouldHide: false
      });
    });  
    event.preventDefault();
  }


handleSendClick2 = (event) => {

  this.setState({ loading: true });
   fetch('http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
    .then((response) => response.json())
    .then((users) => {
      this.setState({
         users,
         loading: false,
         shouldHide: false
      })
    })
    .catch(() => {
         this.setState({
         users: [],
         loading: false,
         shouldHide: false
      });
    });
    event.preventDefault();
  }

    render() {
    let indexOfLastTodo = this.state.activePage * this.state.itemsCountPerPage;
    let indexOfFirstTodo = indexOfLastTodo - this.state.itemsCountPerPage;
    let renderedUsers = this.state.users.slice(indexOfFirstTodo, indexOfLastTodo);
    const { users, loading, shouldHide, userdata } = this.state;
    const rows = renderedUsers.filter(user => Object.values(user).toString().toLowerCase().includes(this.state.filterString.toLowerCase())).map((user, idx) => <Row key = {idx} user = {user} onSelect={ data => this.setState({userdata: data})}/>)

    return (
      <Fragment>
          <div className = "text-center">
            <h4> Choose data set </h4>
            <div className = "buttons">
              <button type="submit" className="btn btn-primary" onClick={this.handleSendClick1}>Small</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSendClick2}>Big</button>
            </div>
            <Search onTextChange={text => this.setState({filterString: text})}/ >
            { loading ? <Loading /> : ''}
          </div> 
        <div className = {this.state.shouldHide ? 'hidden' : ''}>
          <div className="table">
            <div className="header">
              <div onClick={(event) => this.sortBy('id', event)}>ID &#9660;</div>
              <div onClick={(event) => this.sortBy('firstName', event)}>Firstname &#9660;</div>
              <div onClick={(event) => this.sortBy('lastName', event)}>Lastname &#9660;</div>
              <div onClick={(event) => this.sortBy('email', event)}>email &#9660;</div>
              <div onClick={(event) => this.sortBy('phone', event)}>Phone &#9660;</div>
            </div>
            <div className="body">
               {rows}
            </div>
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.itemsCountPerPage}
              totalItemsCount={this.state.users.length}
              pageRangeDisplayed={5}
              onChange={::this.handlePageChange.bind(this)}
            />
            <div className = {this.state.userdata == '' ? 'hidden' : 'text-center'}>
              Выбран пользователь <b> {this.state.userdata ? this.state.userdata.firstName : 'No user specified'} {this.state.userdata.lastName} </b><br/>
              Описание:<br/><br/>
              <textarea value = {this.state.userdata ? this.state.userdata.description: 'No user specified'}></textarea><br/><br/>
              Адрес проживания: <b> {this.state.userdata.address && this.state.userdata.address.streetAddress ? this.state.userdata.address.streetAddress : 'No address specified'} </b><br/>
              Город: <b> {this.state.userdata.address && this.state.userdata.address.streetAddress ? this.state.userdata.address.city : 'No address specified'}</b><br/>
              Провинция/штат: <b> {this.state.userdata.address && this.state.userdata.address.streetAddress ? this.state.userdata.address.state : 'No address specified'} </b><br/>
              Индекс: <b> {this.state.userdata.address && this.state.userdata.address.streetAddress ? this.state.userdata.address.zip : 'No address specified'} </b>
            </div>
          </div>        
        </div>
      </Fragment>
    ); 
  }
}

