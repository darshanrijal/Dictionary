import React, { useEffect, useState } from "react";

function Dictionary() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState();
  const [submit, setSubmit] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [audio, setAudio] = useState("");
  function handleWordChange(event) {
    setMeaning("");
    setSubmit(false);
    setWord(event.target.value);
    setIsCopied(false);
    setAudio("");
  }
  function copyFunction() {
    if (word != "" && meaning != "No definition found" && submit) {
      navigator.clipboard.writeText(meaning);
      setIsCopied(true);
    }
  }
  useEffect(() => {
    submit &&
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((data) => data.json())
        .then((res) => {
          if (res[0]?.meanings[0]?.definitions[0]?.definition) {
            setMeaning(res[0].meanings[0].definitions[0].definition);
          } else {
            setMeaning("No definition found");
          }
          if (res[0]?.phonetics[0]?.audio) {
            setAudio(res[0].phonetics[0].audio);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setMeaning("Error Fetching data");
        });
  }, [submit, word]);
  useEffect(
    () =>
      document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && word) {
          setSubmit(true);
        }
      }),
    document.addEventListener("keydown", (e) => {
      if (e.key === "/") {
        e.preventDefault();
        document.getElementById("wordInput").focus();
      }
    }),

    []
  );

  return (
    <>
      <main className="flex justify-center ">
        <div className="">
          <div className="container flex justify-center my-6 gap-3">
            <input
              value={word}
              onChange={handleWordChange}
              type="text"
              name="inputWord"
              id="wordInput"
              placeholder="Enter your word"
              className="border-black border-2 border-solid font-semibold p-2  rounded-xl selection:bg-green-400"
            />
            <button
              type="submit"
              className="  border-black border-solid p-2 bg-blue-300 hover:bg-blue-200 transition-all rounded-lg radio-canada-big hover:rounded-2xl"
              onClick={() => word && setSubmit(true)}
            >
              {submit && !meaning ? "Fetching..." : "Check"}
            </button>
          </div>
          <div className="flex justify-center items-center w-90 my-8 ">
            <p className="flex justify-center w-3/4">
              <span
                id="spantag"
                className="bg-blue-300 p-4 rounded-xl font-bold sm:w-max roboto-slab selection:bg-white"
              >
                {submit && word ? meaning : "Meaning shall appear here"}
                {!meaning && submit && word && (
                  <div className="loader min-w-min min-h-min"></div>
                )}
              </span>
            </p>
          </div>
          {audio && (
            <div className="flex justify-center items-center mb-10 mr-20">
              <span className="mx-4 font-semibold invisible lg:visible">
                Audio
              </span>
              <audio type="audio" src={audio} controls></audio>
            </div>
          )}
          <p className="text-center mt-4">
            {meaning != "Error Fetching data" && word && submit && meaning && (
              <span
                id="copy"
                className="mx-3 hover:cursor-pointer bg-green-500 p-3 rounded-xl hover:bg-green-400 transition-all"
                onClick={copyFunction}
              >
                <a className=" font-[Poppins] font-semibold">Copy meaning</a>
              </span>
            )}
          </p>
          {isCopied && (
            <p className="text-center mt-4 font-medium">Text copied</p>
          )}
          <div className="grid place-items-center my-10 invisible lg:visible">
            {" "}
            <code className="selection:bg-neutral-900 selection:text-white">
              Notes:"/" to focus on the input field <br /> &nbsp; &nbsp; &nbsp;
              Enter to submit
            </code>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dictionary;
