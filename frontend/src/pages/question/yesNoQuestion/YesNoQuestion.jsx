import React from "react";
import { useState } from "react";

export default function YesNoQuestion() {
  // const [type] = "YESNO";
  const [title, setTitle] = useState("");
  // const [answer1, setAnswer1] = useState("");
  const [isCorrect1, setIsCorrect1] = useState(Boolean);
  // const [answer2, setAnswer2] = useState("");
  const [isCorrect2, setIsCorrect2] = useState(Boolean);
  const [referenceToBook, setReferenceToBook] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/v1/question", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          type: "YESNO",
          title: title,
          answers: [
            {
              answer: "Yes",
              isCorrect: isCorrect1,
            },
            {
              answer: "No",
              isCorrect: isCorrect1,
            },
          ],
          referenceToBook: referenceToBook,
          tags: [
            {
              name: name1,
            },
            {
              name: name2,
            },
            {
              name: name3,
            },
          ],
        }),
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        // setType("");
        setTitle("");
        // setAnswer1("");
        setIsCorrect1(Boolean);
        // setAnswer2("");
        setIsCorrect2(Boolean);
        setName1("");
        setName2("");
        setName3("");

        // setMessage("Yes/No question created successfully");
      } else {
        // setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen flex flex-col">
      <h1 className="self-center">Create a question</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <label htmlFor="title">
          Question:
          <input
            type="text"
            value={title}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="isCorrect">
          Yes:
          <input
            type="checkbox"
            value={isCorrect1}
            id="isCorrect"
            onChange={(e) => setIsCorrect1(e.target.value)}
          />
        </label>

        <label htmlFor="isCorrect">
          No:
          <input
            type="checkbox"
            value={isCorrect2}
            id="IsCorrect2"
            onChange={(e) => setIsCorrect2(e.target.value)}
          />
        </label>
        <label htmlFor="ReferenceToBook">
          Reference to book:
          <input
            type="text"
            value={referenceToBook}
            id="ReferenceToBook"
            onChange={(e) => setReferenceToBook(e.target.value)}
          />
        </label>
        <label htmlFor="name1">
          Tag:
          <input
            type="text"
            value={name1}
            id="name1"
            onChange={(e) => setName1(e.target.value)}
          />
        </label>
        <label htmlFor="name2">
          Tag:
          <input
            type="text"
            value={name2}
            id="name2"
            onChange={(e) => setName2(e.target.value)}
          />
        </label>
        <label htmlFor="name3">
          Tag:
          <input
            type="text"
            value={name3}
            id="name3"
            onChange={(e) => setName3(e.target.value)}
          />
        </label>

        <button type="submit">Create</button>

        {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
      </form>
    </div>
  );
}

// function CreateYesNo() {
//   return (
//     <form
//       className="grid w-full md:justify-start justify-center bg-slate-200"
//       method="post"
//       encType="multipart/form-data"
//     >
//       <h2>Yes/No question</h2>
//       <label htmlFor="title">
//         Question:
//         <input
//           type="text"
//           id="title"
//           // The question must start with a capital letter and end with a full stop or question mark.
//           pattern="[A-Z]{1}[ \S]+[.?]{1}"
//           required
//         />
//       </label>

//       <label htmlFor="answer">
//         Answer:
//         <input
//           type="text"
//           id="answer"
//           // REGEX
//           pattern=""
//           required
//         />
//       </label>

//       <label htmlFor="name">
//         tag:
//         <input
//           type="text"
//           id="name"
//           // REGEX
//           pattern=""
//         />
//       </label>

//       <label htmlFor="name">
//         tag:
//         <input
//           type="text"
//           id="name"
//           // REGEX
//           pattern=""
//         />
//       </label>

//       <label htmlFor="name">
//         tag:
//         <input
//           type="text"
//           id="name"
//           // REGEX
//           pattern=""
//         />
//       </label>
//       <button type="submit" id="type" value="yesno" className="bg-blue-300">
//         Submit
//       </button>
//     </form>
//   );
// }
