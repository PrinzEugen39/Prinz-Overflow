// RIGHT SIDEBAR
export const hotQuestions = [
  {
    id: 1,
    title: "How do I debug a Node.js API running on Vercel?",
  },
  {
    id: 2,
    title: "How do I make my Next.js app faster?",
  },
  {
    id: 3,
    title: "How do I deploy my Next.js app to AWS?",
  },
  {
    id: 4,
    title: "How do I add styled-components to my Next.js app?",
  },
  {
    id: 5,
    title: "How do I add Redux to my Next.js app?",
  },
];

export const popularTags = [
  { id: 1, name: "React", totalQuestion: 10 },
  { id: 2, name: "JavaScript", totalQuestion: 8 },
  { id: 3, name: "Next.js", totalQuestion: 6 },
  { id: 4, name: "TypeScript", totalQuestion: 4 },
  { id: 5, name: "CSS", totalQuestion: 7 },
];

// HOME QUESTION
export const questions = [
  {
    _id: 1,
    title: "What is the difference between React and Vue.js?",
    tags: [
      { _id: 1, name: "javascript" },
      { _id: 2, name: "frontend" },
    ],
    author: {
      _id: 2,
      name: "Alice",
      picture: "/assets/images/auth-dark.png",
    },
    upvotes: 4278,
    views: 52339,
    answers: [],
    createdAt: new Date("2023-12-18"),
  },
  {
    _id: 2,
    title: "How do I style components in React?",
    tags: [
      { _id: 3, name: "react" },
      { _id: 4, name: "css" },
    ],
    author: {
      _id: 3,
      name: "Bob",
      picture: "/assets/images/auth-dark.png",
    },
    upvotes: 25,
    views: 780,
    answers: [],
    createdAt: new Date("2024-04-11"),
  },
];
