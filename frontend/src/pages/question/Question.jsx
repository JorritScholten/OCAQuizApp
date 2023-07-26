import React, { useState } from "react";
import Header from "../../components/header";
export default function Question() {
  const typeOptions = ["Yes/No", "Multiple choice", "Multiple selection"];
  const [typeChoice, setTypeChoice] = useState(typeOptions[1]);

  return (
    <div className="w-screen flex flex-col">
      <Header title="Question" />
      <h1 className="self-center">Create a question</h1>
      <div className="bg-slate-100 flex flex-col gap-2 m-2 p-2">
        <div className="flex flex-row gap-2 content-evenly">
          {typeOptions.map((typeOption) => {
            if (typeChoice === typeOption) {
              return (
                <div
                  className="bg-green-300 w-full place-self-center text-center"
                  key={typeOption}
                >
                  {typeOption}
                </div>
              );
            } else {
              return (
                <button
                  className="bg-slate-300 w-full place-self-center text-center"
                  key={typeOption}
                  onClick={() => setTypeChoice(typeOption)}
                >
                  {typeOption}
                </button>
              );
            }
          })}
        </div>
        <div className="w-full px-2">
          {typeChoice === typeOptions[0] ? (
            <div>yes/no question undefined</div>
          ) : null}
          {typeChoice === typeOptions[1] ? (
            <div>choice question undefined</div>
          ) : null}
          {typeChoice === typeOptions[2] ? (
            <div>selection question undefined</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
