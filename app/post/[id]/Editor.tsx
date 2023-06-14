import { Editor } from "@tiptap/react";
import React from "react";
type Props = {
  editor: Editor | null;
};

const EditorMenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        strike
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        code
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        h1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        h2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        h3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        h4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        h5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "text-white bg-teal-700 px-2 py-1 rounded-md"
            : "px-2 py-1 border border-gray-300 rounded-md"
        }
      >
        h6
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
    </div>
  );
};
export default EditorMenuBar;
