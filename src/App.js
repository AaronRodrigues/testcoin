import React, { Component } from 'react';
import RewardsCoinBase from '../build/contracts/RewardsCoinBase.json';
import getWeb3 from './utils/getWeb3';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: false,
      owner: '',
      newOwner: '',
      instance: null,
    };

    this.setWeb3 = this.setWeb3.bind(this);
    this.setAccounts = this.setAccounts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    getWeb3
      .then(results => {
        this.setWeb3(results);
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  setWeb3(results) {
    this.setState({ web3: results.web3 });
    this.setAccounts(results.web3.eth);
    this.initContract();
  }

  setAccounts(eth) {
    eth.getAccounts((err, accounts) => {
      if (accounts.length > 0) this.setState({ accounts });
    });
  }

  initContract(accounts) {
    const contract = require('truffle-contract');
    const simpleStorage = contract(RewardsCoinBase);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    simpleStorage
      .deployed()
      .then(instance => {
        this.setState({ instance });
        return instance.contractOwner();
      })
      .then(owner => {
        this.setState({ owner });
      });
  }

  changeOwner(owner, newOwner) {
    console.log(this.state.instance);
    this.state.instance
      .transferOwnership(newOwner, {
        from: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
        gas: 999999,
      })
      .then(res => {
        console.log(res);
      });
    // this.state.instance
    //   .upgrade(owner, { from: owner, gas: 999999 })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(err => console.log(err));
    // console.log(this.state.instance);
    // this.state.web3.eth.call({
    //   to: this.state.instance.address,
    //   data: this.state.instance.upgrade(newOwner),
    // });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.changeOwner(this.state.owner, this.state.newOwner);
  }

  handleChange(event) {
    this.setState({ newOwner: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.accounts ? (
          <div>
            <h1>Logged in user: {this.state.accounts}</h1>
            <h2>Owner: {this.state.owner}</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input type="text" value={this.state.newOwner} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        ) : (
          <h1>Please login to Metamask</h1>
        )}
      </div>
    );
  }
}

// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
// import './App.css'

// class App extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       storageValue: 0,
//       web3: null
//     }
//   }

//   componentWillMount() {
//     // Get network provider and web3 instance.
//     // See utils/getWeb3 for more info.

//     getWeb3
//     .then(results => {
//       this.setState({
//         web3: results.web3
//       })

//       // Instantiate contract once web3 provided.
//       this.instantiateContract()
//     })
//     .catch(() => {
//       console.log('Error finding web3.')
//     })
//   }

//   instantiateContract() {
//     /*
//      * SMART CONTRACT EXAMPLE
//      *
//      * Normally these functions would be called in the context of a
//      * state management library, but for convenience I've placed them here.
//      */

//     const contract = require('truffle-contract')
//     const simpleStorage = contract(SimpleStorageContract)
//     simpleStorage.setProvider(this.state.web3.currentProvider)

//     // Declaring this for later so we can chain functions on SimpleStorage.
//     var simpleStorageInstance

//     // Get accounts.
//     this.state.web3.eth.getAccounts((error, accounts) => {
//       simpleStorage.deployed().then((instance) => {
//         simpleStorageInstance = instance

//         // Stores a given value, 5 by default.
//         return simpleStorageInstance.set(5, {from: accounts[0]})
//       }).then((result) => {
//         // Get the value from the contract to prove it worked.
//         return simpleStorageInstance.get.call(accounts[0])
//       }).then((result) => {
//         // Update state with the result.
//         return this.setState({ storageValue: result.c[0] })
//       })
//     })
//   }

//   render() {
//     return (
//       <div className="App">
//         <nav className="navbar pure-menu pure-menu-horizontal">
//             <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
//         </nav>

//         <main className="container">
//           <div className="pure-g">
//             <div className="pure-u-1-1">
//               <h1>Good to Go!</h1>
//               <p>Your Truffle Box is installed and ready.</p>
//               <h2>Smart Contract Example</h2>
//               <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
//               <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
//               <p>The stored value is: {this.state.storageValue}</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }

// export default App
