const React = require('react');
const TimeAgo = require('../../../node_modules/react-timeago/timeago');
const Link = require('react-router').Link;

const FriendEntry = (props) => (
  <div className="row">
    <div className="col s12 m10">
      <div className="card white">
        <div className="card-content black-text" >
          <span className="card-title activator"><a className="cyan-text lighten-2" href={props.data.html_url} target="_blank">{props.data.title}</a><i className="material-icons right">more_vert</i></span>
          <div className="row">
            <div className="col sm 12">  
            </div>
          </div>
          <div className="row">
            <p className="left-align col s6"><span className="octicon octicon-calendar"></span> created <TimeAgo date={props.data.created_at} /></p>
          </div>
          <div className="row">
            <p className="left-align col s6">Login: {props.data.login} </p>
            <p className="right-align col s6">Url: <a>{props.data.html_url}</a></p>
          </div>
        </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">{props.data.name}<i className="material-icons right">close</i></span>
        <p>{props.data.bio}</p>
        <p>{props.data.location}</p>
      </div>
      </div>
    </div>
  </div>
);

module.exports = FriendEntry;

