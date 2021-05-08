import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import Menu from './Menu.jsx'
import StarterKit from '@tiptap/starter-kit'

import 'remixicon/fonts/remixicon.css'
import './Editor.scss';

const Editor = ({onChange = () => {}, content = '<p></p>'}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link
    ],
    onUpdate() {
      onChange(this.getHTML())
    },
    content: content
  })

  return (
    <div>
      <Menu editor={editor}/>
      <EditorContent editor={editor}/>
    </div>
  );
}

export default Editor;
