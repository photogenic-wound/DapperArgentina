const React = require('react');
const NavBar = require('./nav/NavBar'); 
const Issues = require('../js/issues');
const Repos = require('../js/repos'); 
const Users = require('../js/users');
const Pulls = require('../js/pulls');
const FavedRepos = require('../js/favedRepos');
const Friends = require('../js/friends');

const linksList = [
  {name: "new tickets", url: '/'},
  {name: "repos", url: '/repos'},
  {name: "getting started", url: '/resources'},
  {name: "pull requests", url: '/pulls'},
  {name: "friends", url: '/friends'}
];

const App = class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      route: '/',
      reposToRender: [],
      ticketsToRender: [],
      reposToRender: [],
      numberOfRepos: 0,
      numberOfTickets: 0,
      languages: [],
      favedRepos: {},
      friends: {},
      pulls: [],
    };
  }

  getFriends() {
    Friends.getFriendsFromApi(friends => this.setState({friends}));
  }

  getUser(){
    Users.getUserFromApi((result) => {
      this.setState({user:result});
    }, (result) => {
      console.log("Err",result)
    })
  }
  
  getIssues(searchTerm, language){
    //Fetch issues;
    Issues.getIssues((data) => {
      this.setState({
        numberOfTickets: data.length,
        ticketsToRender: data.slice(0,199)
      });
    }, console.log, searchTerm, language);
  }
  
  getRepos(searchTerm, language){
    //Fetch repos;
    //refactor to exclude 'self/this' with es6 syntax?
    Repos.getRepos((data) => {
      this.setState({
        numberOfRepos: data.length,
        reposToRender: data.slice(0,199)
      });
    }, console.log, searchTerm, language);
  }

  getFavedRepos() {
    FavedRepos.getFavedReposFromApi((data) => {
      this.setState({
        favedRepos: data
      });
    }, console.log)
  }

  setLanguages () {
    //We should only run this once per component rendering (ie. componentDidMount)
    //Multiple calls to material_select screws up the rendering
    Repos.getLanguages((languages) => {
      this.setState({
        languages: languages
      });
    });
  }

  getPulls () {
    Pulls.getPullsFromApi((result) => {
      this.setState({pulls:result});
    }, (result) => {
      console.log("Err",result)
    })

  }

  componentWillMount() {
    this.getIssues();
    this.getRepos();
    this.setLanguages();
    this.getUser();
    this.getFavedRepos();
    this.getPulls();
  }

  render () {
    window.statePeek = this.state;
    return (
    <div className='app-shell grey lighten-2'>
      <NavBar user={this.state.user} links={linksList}/>
      <div className="row">
        <div className="main col-md-12 container">
          {React.cloneElement(this.props.children, {
              route: this.state.route,
              reposToRender: this.state.reposToRender,
              ticketsToRender: this.state.ticketsToRender,
              reposToRender: this.state.reposToRender,
              numberOfRepos: this.state.numberOfRepos,
              numberOfTickets: this.state.numberOfTickets,
              languages: this.state.languages,
              getIssues: this.getIssues.bind(this),
              getRepos: this.getRepos.bind(this),
              getFavedRepos: this.getFavedRepos.bind(this),
              user: this.state.user,
              favedRepos: this.state.favedRepos,
              friends: this.state.friends,
              pulls: this.state.pulls,
              favorites: { "results": [
                {
                  "name":"test name 1",
                  "org_name":"org test name 1",
                  "html_url":"#",
                  "description":"test description 1",
                  "language":"javascript"
                },
                {
                  "name":"test name 2",
                  "org_name":"org test name 2",
                  "html_url":"#",
                  "description":"test description 2",
                  "language":"javascript"
                },
                {
                  "name":"test name 3",
                  "org_name":"org test name 3",
                  "html_url":"#",
                  "description":"test description 3",
                  "language":"javascript"
                },
                {
                  "name":"test name 4",
                  "org_name":"org test name 4",
                  "html_url":"#",
                  "description":"test description 4",
                  "language":"javascript"
                }
              ]}
          })}
        </div>
      </div>
    </div>
    );
  }

};
module.exports = App;
