const React = require('react');
const FriendEntry = require('./FriendEntry');
const UserCard = require('../user/UserCard')

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
    // {_.values(this.props.friends).map ((friend, index) => (
    //     <FriendEntry data={friend} key={index} />
    //   )
    // )}

    
    return (
    <div>
      <h4>Friends on Github</h4>
      <div className="main-friends-view carousel">
           {_.values(this.props.friends).map((friend, index) => (
              <UserCard className="carousel-item" user={friend} key={index} />
            )
          )}
      </div>
    </div>
    );  
  }
  
}

module.exports = FriendList;