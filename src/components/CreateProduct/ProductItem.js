// import React, { Component } from 'react';
//
// class ProductItem extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       editMode: false,
//       editText: this.props.message.text,
//     };
//   }
//
//   onToggleEditMode = () => {
//     this.setState(state => ({
//       editMode: !state.editMode,
//       editText: this.props.message.text,
//     }));
//   };
//
//   onChangeEditText = event => {
//     this.setState({ editText: event.target.value });
//   };
//
//   onSaveEditText = () => {
//     this.props.onEditMessage(this.props.message, this.state.editText);
//
//     this.setState({ editMode: false });
//   };
//
//   render() {
//     const { authUser, message, onRemoveMessage } = this.props;
//     const { editMode, editText } = this.state;
//
//     return (
//         <div className="row">
//           <div className="col-sm-2 text-center table-bordered">{message.category}</div>
//           <div className="col-sm-2 text-center table-bordered">{message.namedish}</div>
//           <div className="col-sm-2 text-center table-bordered">{message.price}</div>
//           <div className="col-sm-2 text-center table-bordered">{message.title}</div>
//           <div className="col-sm-2 text-center table-bordered"><img style={img} src={message.img} alt=""/></div>
//           <div className="col-sm-2 text-center table-bordered"></div>
//         </div>
//
//     );
//   }
// }
//
// const img =
//   {
//     width: 100,
//     height: 100,
//   };
// export default ProductItem;
