import React, { Component } from 'react';

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class TablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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

  // onChangeText = event => {
  //   this.setState({ text: event.target.value });
  // };
  //
  // onCreateMessage = (event, authUser) => {
  //   this.props.firebase.messages().add({
  //     text: this.state.text,
  //     userId: authUser.uid,
  //     createdAt: this.props.firebase.fieldValue.serverTimestamp(),
  //   });
  //
  //   this.setState({ text: '' });
  //
  //   event.preventDefault();
  // };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).update({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

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
    const { messages } = this.state;
    function myFunction() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("myInput");
      // filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
    return (
      <div>
        <div id="wrapper">
          <div id="content-wrapper">
            <div className="container-fluid">
              <div className="card mb-3">
                <div className="card-header">
                  <i className="fas fa-table"/>
                  Data Table Example
                </div>
                <div className="card-body mb-3">
                  <div className="table-responsive">
                    <input
                      type="text"
                      id="myInput"
                      onKeyUp={myFunction()}
                      placeholder="Search for names.."
                      title="Type in a name"
                    />
                    <table
                      id="myTable"
                      className="table table-bordered"
                      width="100%"
                      cellSpacing={0}
                    >
                      <thead className="text-center">
                      <tr>
                        <th>Cartegory</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Title</th>
                        <th>Image</th>
                      </tr>
                      </thead>
                      <tbody className="text-center">
                      {messages.map(message => (
                        <tr  key={message.uid}>
                          <td>{message.category}</td>
                          <td>{message.namedish}</td>
                          <td>{message.price}</td>
                          <td>{message.title}</td>
                          <td><img style={img} src={message.img} alt=""/></td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const img =
  {
    width: 100,
    height: 100,
  };

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(TablePage);

// export default withFirebase(TablePage)
