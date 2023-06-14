"use client";
import { FormattedPost } from "@/app/types";
import React, { useState } from "react";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./Editor";
import { Editor } from "@tiptap/react";
import axios from "axios";
type Props = {
  post: FormattedPost;
};

const Content = ({ post }: Props) => {
  const [role, setRole] = useState<string>("I am helpful assistant");
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(post.title);
  const [titleError, setTitleError] = useState<string>("");
  const [tempTitle, setTempTitle] = useState<string>(title);

  const [content, setContent] = useState<string>(post.content);
  const [contentError, setContentError] = useState<string>("");
  const [tempContent, setTempContent] = useState<string>(content);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validation checks

    if (title === "") setTitleError("this field is required");
    if (editor?.isEmpty) setContentError("this field is required");
    if (title == "" || editor?.isEmpty) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/${post.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      }
    );
    const data = await response.json();
    handleIsEditable(false);
    setTempTitle("");
    setTempContent("");
    setTitle(data.title);
    setContent(data.content);
    editor?.commands.setContent(data.content);
  };
  const handleIsEditable = (bool: boolean) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  };
  const handleOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError("");
    setContent((editor as Editor).getHTML());
  };
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitleError("");
    setTitle(e.target.value);
  };
  const handleEnableEdit = () => {
    handleIsEditable(!isEditable);
    setTempTitle(title);
    setTempContent(editor?.getHTML() || "");
  };
  const handleCancelEdit = () => {
    handleIsEditable(!isEditable);
    setTitle(tempTitle);
    editor?.commands.setContent(tempContent);
  };
  const postAiContent = async () => {
    editor?.chain().focus().setContent("generating ai contnet").run();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/openai`,
      { title: title, role: role }
    );

    const data = response.data;
    console.log(data.content);
    editor?.chain().focus().setContent(data.content).run();
    setContent(data.content);
  };
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: handleOnChangeContent,
    editable: isEditable,
    editorProps: {
      attributes: {
        class: " leading-8 focus:outline-none w-full max-w-full",
      },
    },
  });
  const date = new Date(post?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formatedDate = date.toLocaleDateString("en-us", options);

  return (
    <div className="flex gap-4 flex-col pb-8">
      <div className="">
        <h3 className=" font-semibold text-teal-700 text-lg mt-2 rounded-md flex justify-start ">{`Home > ${post.category} > ${post.title}`}</h3>
      </div>
      <div className="flex justify-between">
        <h1 className=" text-white bg-teal-700 w-fit rounded-md text-md flex justify-start items-center px-2 py-1">
          {post.category}
        </h1>
        <div>
          {isEditable ? (
            <div className="h-4 w-4">
              <button onClick={handleCancelEdit}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div>
              <button onClick={handleEnableEdit}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 576 512"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border w-full border-gray-300  p-2 hover:border-teal-600 hover:transition-colors rounded-md resize-none overflow-hidden transition-colors focus:outline-none"
                placeholder="Title"
                value={title}
                onChange={handleOnChangeTitle}
              />
            </div>
          ) : (
            <h3 className="text-black font-semibold text-2xl">{title}</h3>
          )}
          <div className="flex w-fit justify-center items-center">
            <h1 className="text-gray-500 font-semibold text-sm">
              {post.author}
            </h1>
            <h1 className="ml-4 text-gray-500 font-semibold text-sm">
              {formatedDate}
            </h1>
          </div>
          <div className="z-0 relative rounded-lg w-full  pt-4">
            <img className="rounded-lg h-96  bg-cover  " src={post?.img} />
          </div>
          <div>
            {isEditable && (
              <div className="pt-4">
                <h1 className="text-black font-semibold text-lg">
                  Generate your blogs with the help of{" "}
                  <span className="text-teal-600">AI,</span> Just enter what you
                  want in the below prompt.
                </h1>
                <div className="pt-4 flex">
                  <div>
                    <input
                      onChange={(e) => setRole(e.target.value)}
                      type="text"
                      value={role}
                      className="border border-gray-300 w-fit p-2 hover:border-teal-600 hover:transition-colors rounded-md  transition-colors focus:outline-none"
                    />
                  </div>
                  <button
                    className="ml-6 text-teal-700"
                    onClick={postAiContent}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.17 3.83c-.27-.27-.47-.55-.63-.88-.16-.31-.27-.66-.34-1.02-.58.33-1.16.7-1.73 1.13-.58.44-1.14.94-1.69 1.48-.7.7-1.33 1.81-1.78 2.45H3L0 10h3l2-2c-.34.77-1.02 2.98-1 3l1 1c.02.02 2.23-.64 3-1l-2 2v3l3-3v-3c.64-.45 1.75-1.09 2.45-1.78.55-.55 1.05-1.13 1.47-1.7.44-.58.81-1.16 1.14-1.72-.36-.08-.7-.19-1.03-.34a3.39 3.39 0 0 1-.86-.63zM16 0s-.09.38-.3 1.06c-.2.7-.55 1.58-1.06 2.66-.7-.08-1.27-.33-1.66-.72-.39-.39-.63-.94-.7-1.64C13.36.84 14.23.48 14.92.28 15.62.08 16 0 16 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4 text-gray-700 text-md font-medium my-4 border border-gray-300 rounded-md p-2 outline-none">
              {isEditable && (
                <div className="pt-4 pb-4 outline-none">
                  <EditorMenuBar editor={editor} />
                </div>
              )}
              <EditorContent className="outline-none" editor={editor} />
            </div>
          </div>

          <div>
            {isEditable && (
              <div>
                <button
                  className=" text-white bg-teal-700 w-fit rounded-md text-md flex justify-start items-center px-2 py-1"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </>
      </form>
    </div>
  );
};

export default Content;
