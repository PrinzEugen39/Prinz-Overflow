import React from "react";

interface IVotes {
  type: "question" | "answer";
  id: string;
}

const Votes = ({ type, id }: IVotes) => {
  return <div>Votes</div>;
};

export default Votes;
