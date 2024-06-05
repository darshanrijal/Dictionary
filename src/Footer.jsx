import React from "react";
import dictionaryImg from "./assests/dictionary.png";
import githubImg from "./assests/github.svg";
function Footer() {
  return (
    <>
      <div className="flex justify-end bottom-0 absolute right-0 p-4 invisible md:visible">
        <div className=" flex flex-col gap-6">
          <div className="flex gap-2">
            <code>Api Used:</code>
            <a href="https://dictionaryapi.dev/">
              <img
                src={dictionaryImg}
                alt="free dictionary api"
                className="h-6 hover:h-8 transition-all"
              />
            </a>
          </div>
          <div className="flex gap-2">
            <code>Github:</code>
            <a href="https://github.com/darshanrijal/dist">
              <img
                src={githubImg}
                alt="Github"
                className="h-6 hover:h-8 transition-all"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
