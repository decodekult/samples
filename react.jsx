// -------------------
// App.jsx
// -------------------

import { useEffect, useState } from "react";
import Grader from './Grader';

const App = () => {
  const queryArgs = new URLSearchParams(window.location.search);
  const userId = queryArgs.get('id');
  
  const [userData, setUserData] = useState();
  const [userVotes, setUserVotes] = useState();
  const [userGrade, setUserGrade] = useState();
  
  useEffect(() => {
    fetch('https://users.data.api?userId=' . userId)
        .then((data) => {
          setUserData(data);
          setUserVotes(data.votes);
          setUserGrade(data.grade);
        });
  }, [ userId, setUserGrade, setUserVotes ]);
  
  return (
    <Grader
      userData={userData}
      userVotes={userVotes}
      setUserVotes={setUserVotes}
      userGrade={userGrade}
      setUserGrade={setUserGrade}
    />
  );
};

export default App;

// -------------------
// Grader.jsx
// -------------------

import { useState } from "react";

const Grader = ({
  userData,
  userVotes,
  setUserVotes,
  userGrade,
  setUserGrade
}) => {
  const [hasVoted, setHasVoted] = useState(false);
  
  const castVote = (grade) => {
    setHasVoted(true);
    setUserVotes(userVotes + 1);
    setUserGrade((userGrade + grade) / userVotes);
  };
   
  return (
    <div>
      <span>Hello, this is {userData.name}!</span>
      {!hasVoted && (
        <div>
          Grade me!
          {[1, 2, 3, 4, 5].map((grade) => (
            <button onClick={castVote(grade)}>{grade}</button>
          ))}
        </div>
      )}
      {hasVoted && (
        <div>
          Grade: {userGrade}/5 ({userVotes} votes)
        </div>
      )}
    </div>
  );
};

export default Grader;
