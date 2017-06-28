import React, { Component } from 'react';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

class MessageBoard extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let lat, lon;
    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      fetch(`https://localhost:9000/api/messages/${lat}/${lon}`, {
        method: 'GET'
      }).then(res => {
        // set messages state
        console.log(res.json());
      });
    });
  }
  render() {
    return (
      <div className="message-board">
        <div className="channels-users-sidebar inline-block">
          <ChannelList channels={dummyChannels} />
          <UserList users={dummyUsers} />
        </div>
        <div className="message-list-container inline-block">
          <MessageList messages={dummyMessages} />
        </div>
      </div>
    );
  }
}

export default MessageBoard;