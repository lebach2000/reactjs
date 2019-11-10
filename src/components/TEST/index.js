// import React, { Component } from 'react';
//
//     class Test extends React.Component {
//       constructor(props) {
//         super(props);
//         this.state = {
//           image:'',
//           uk: '',
//         };
//
//         this.getImage('lithuania');
//         this.getImage('uk');
//       }
//
//       getImage(image) {
//         let { state } = this;
//         storage.child(`${image}.png`).getDownloadURL().then((url) => {
//           state[image] = url;
//           this.setState(state);
//         }).catch((error) => {
//           // Handle any errors
//         });
//       }
//
//       render() {
//         return (
//           <div>
//             Hello Lithuania<br/>
//             <img src={this.state.lithuania} alt="Lithuanian flag"/>
//             <br/>
//             Hello United Kingdom<br/>
//             <img src={this.state.uk} alt="UK flag"/>
//           </div>
//         );
//       }
//     }
// export default Test;