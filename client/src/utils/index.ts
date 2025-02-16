import { Comment } from "../types/comment";

export const capitalizeText = (text?: string) => {
  return !text || typeof text !== "string"
    ? ""
    : text[0].toUpperCase() + text.slice(1);
};

export const serverError = () => "Server Error. We are working to resolve this";

export const chats = [
  {
    name: "chat:1_2",
    text: "Hey, how's it going?",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Hey! I'm doing well, how about you?",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Not too bad, just working on some projects.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "That sounds cool! What kind of projects?",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "I'm building a new feature for my app.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Nice! What does it do?",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "It's a real-time chat feature with WebSockets.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "That sounds awesome! Are you using Phoenix Channels?",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Yep! Phoenix Channels for the backend and React for the frontend.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "That's a solid stack. Do you need help testing it?",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "That would be great! I need to check if messages sync properly.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "I'll send a few messages and let you know what happens.",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Awesome, thanks! Just make sure to test different cases.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "No problem! I'll try sending fast messages too.",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Great idea! Also, try refreshing mid-conversation.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Got it. I'll also check what happens if I disconnect.",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Perfect! Let me know what you find.",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Just sent a bunch of messages. Everything looks smooth!",
    sender_id: 2,
    receiver_id: 1,
    sender: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
    receiver: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
  },
  {
    name: "chat:1_2",
    text: "Awesome! Thanks for testing it out!",
    sender_id: 1,
    receiver_id: 2,
    sender: {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice@example.com",
    },
    receiver: {
      first_name: "Bob",
      last_name: "Smith",
      email: "bob@example.com",
    },
  },
];
