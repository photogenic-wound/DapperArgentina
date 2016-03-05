const React = require('react');
const TicketSearch = require('./TicketSearch');
const TicketEntry = require('./TicketEntry');


class FriendList extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidUpdate () {
    //Anytime the component renders, scroll to the top of the ticket list
    $('.main-ticket-view')[0].scrollTop = 0;
  }
  render () {
    
    //for really clean scrolling, we could do something like below to calculate the max height and then set the max height css 
    // var maxHeight = $(window).height() - $('.navbar').outerHeight() - margin * 2;
    
    return (
    <div>
      <h4>Friends on Github</h4>
      <div className="main-friends-view">
          {_values(this.state.friends).map ((friend, index) => (
              <FriendEntry data={friend} key={index} />
            )
          )}
      </div>
    </div>
    );  
  }
  
}

module.exports = FriendList;