import {

} from '../actions/types';

const initialChatRoomState = {
  currentChatRoom: null,
  isPrivateChatRoom: false
}

export default function (state = initialChatRoomState, action) {
  switch (action.type) {
    default:
      return state;
  }
}