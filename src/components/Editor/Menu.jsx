import React from 'react';

import './Editor.scss';

const Menu = ({editor}) => {
  if (!editor) {
    return null
  }
  const setLink = () => {
    const url = window.prompt('URL')
    editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="menu">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <i className="ri-bold"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <i className="ri-italic"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <i className="ri-strikethrough"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <i className="ri-code-view"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <i className="ri-h-1"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <i className="ri-h-2"></i>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <i className="ri-list-unordered"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <i className="ri-list-ordered"></i>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <i className="ri-double-quotes-l"></i>
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <i className="ri-separator"></i>
      </button>
      <button onClick={setLink}>
        <i className="ri-links-line"></i>
      </button>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <i className="ri-arrow-go-back-line"></i>
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <i className="ri-arrow-go-forward-line"></i>
      </button>
    </div>
  )
}

export default Menu;
