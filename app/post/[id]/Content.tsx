"use client";
import { FormattedPost } from "@/app/types";
import React, { useState } from "react";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./Editor";
import { Editor } from "@tiptap/react";

type Props = {
  post: FormattedPost;
};

const Content = ({ post }: Props) => {
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
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: handleOnChangeContent,
    editable: isEditable,
  });
  const date = new Date(post?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formatedDate = date.toLocaleDateString("en-us", options);

  return (
    <div>
      <div>
        <h3>{`Home > ${post.category} > ${post.title}`}</h3>
      </div>
      <div className="flex">
        <h1>{post.category}</h1>
        <div>
          {isEditable ? (
            <div>
              <button onClick={handleCancelEdit}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
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
                  height="1em"
                  width="1em"
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
                className=""
                placeholder="Title"
                value={title}
                onChange={handleOnChangeTitle}
              />
            </div>
          ) : (
            <h3>{title}</h3>
          )}
          <div>
            <h1>{post.author}</h1>
            <h1>{formatedDate}</h1>
          </div>
          <div className="z-0 relative rounded-lg w-full h-96">
            <Image
              fill={true}
              style={{ objectFit: "cover" }}
              alt={post?.title}
              src={post?.img}
              sizes="(max-width:480px) 100vw,
          (max-width:768px) 75vw,
          (max-width:1060px) 50vw,
          33vw
          "
            />
          </div>
          <div className="mt-4 ">
            {isEditable && (
              <div className="pt-4 pb-4">
                <EditorMenuBar editor={editor} />
              </div>
            )}
            <EditorContent editor={editor} />
          </div>
          <div>
            {isEditable && (
              <div>
                <button type="submit">Submit</button>
              </div>
            )}
          </div>
        </>
      </form>
    </div>
  );
};

export default Content;
