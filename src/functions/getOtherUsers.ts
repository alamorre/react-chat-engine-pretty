import { ChatObject, PersonObject } from "react-chat-engine-advanced";

export const getOtherUsers = (
  chat: ChatObject,
  username: string
): PersonObject[] => {
  const otherMembers = chat.people.filter(
    (member) => member.person.username !== username
  );
  return otherMembers.map(member => member.person)
};

export const getChatTitle = (chat: ChatObject, username: string) => {
  const otherUsers = getOtherUsers(chat, username)
  if (otherUsers.length === 1) {
    return `${otherUsers[0].first_name} ${otherUsers[0].last_name}`;
  } else {
    var title = '';
    for (let i = 0; i < otherUsers.length; i++) {
      if (i === otherUsers.length - 1) {
        title += otherUsers[i].first_name;
      } else if (i === otherUsers.length - 2) {
        title += otherUsers[i].first_name + ' & ';
      } else {
        title += otherUsers[i].first_name + ', ';
      }
    }
    return title;
  }
};
