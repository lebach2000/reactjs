import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      namedish: '',
      img:'',
      title:'',
      price: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .messages()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let messages = [];
          snapshot.forEach(doc =>
            messages.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            messages: messages.reverse(),
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeText = event => {
    this.setState({ namedish: event.target.value });
  };
  onChangePrice = event => {
    this.setState({ price: event.target.value });
  };
  onChangeCategory = event => {
    this.setState({ category: event.target.value });
  };
  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };
  onChangeImg = event => {
    this.setState({ img: event.target.value });
  };


  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().add({
      category: this.state.category,
      namedish: this.state.namedish,
      price: this.state.price,
      img:this.state.img,
      title:this.state.title,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ namedish: '', price: '', catgory: '' ,img:'',title:''});

    event.preventDefault();
  };

  // onEditMessage = (message, text) => {
  //   const { uid, ...messageSnapshot } = message;
  //
  //   this.props.firebase.message(message.uid).update({
  //     ...messageSnapshot,
  //     text,
  //     editedAt: this.props.firebase.fieldValue.serverTimestamp(),
  //   });
  // };

  // onRemoveMessage = uid => {
  //   this.props.firebase.message(uid).delete();
  // };
  //
  // onNextPage = () => {
  //   this.setState(
  //     state => ({ limit: state.limit + 5 }),
  //     this.onListenForMessages,
  //   );
  // };

  render() {
    const { category, namedish, price,title,img } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {/*{messages && (*/}
            {/*  <MessageList*/}
            {/*  authUser={authUser}*/}
            {/*  messages={messages}*/}
            {/*  onEditMessage={this.onEditMessage}*/}
            {/*  onRemoveMessage={this.onRemoveMessage}*/}
            {/*  />*/}
            {/*)}*/}
            {/*<form*/}
            {/*  onSubmit={event =>*/}
            {/*    this.onCreateMessage(event, authUser)*/}
            {/*  }*/}
            {/*>*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    value={category}*/}
            {/*    onChange={this.onChangeCategory}*/}
            {/*  />*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    value={namedish}*/}
            {/*    onChange={this.onChangeText}*/}
            {/*  />*/}
            {/*  <input*/}
            {/*    type="text"*/}
            {/*    value={number}*/}
            {/*    onChange={this.onChangeNumber}*/}
            {/*  />*/}
            {/*  <button type="submit">Send</button>*/}
            {/*</form>*/}
            <form className="container" onSubmit={event =>
              this.onCreateMessage(event, authUser)
            }>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Category:
                </label>
                <div className="col-sm-5">
                  <input
                    placeholder="Category"
                    type="text"
                    className="form-control"
                    value={category}
                    onChange={this.onChangeCategory}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Name :
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={namedish}
                    onChange={this.onChangeText}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Image :
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image"
                    value={img}
                    onChange={this.onChangeImg}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Title :
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
                  Price :
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                    onChange={this.onChangePrice}
                  />
                </div>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(CreateProduct);
