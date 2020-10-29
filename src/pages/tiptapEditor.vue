<template>
  <div>
    <div class="editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="manubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            Bold
          </button>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            Italic
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            Strike
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            underline
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            code
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            paragraph
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            bullet_list
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            ordered_list
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            blockquote
          </button>
    
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            code_block
          </button>
    
          <button
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            horizontal_rule
          </button>
    
          <button
            class="menubar__button"
            @click="commands.undo"
          >
            undo
          </button>
    
          <button
            class="menubar__button"
            @click="commands.redo"
          >
            redo
          </button>
          <button
            class="menubar__button"
            @click="showImagePrompt(commands.image)"
          >
            image
          </button>
          
        </div>
      </editor-menu-bar>
      <editor-content class="editor__content" :editor="editor" />
    </div>
    
    <div class="actions">
      <button class="button" @click="clearContent">
        Clear Content
      </button>
      <button class="button" @click="setContent">
        Set Content
      </button>
    </div>
    
    <div class="export">
      <h3>HTML</h3>
      <pre><code>{{ html }}</code></pre>
    </div>
    
  </div>
</template>

<script>
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Image,
  } from 'tiptap-extensions'
  export default {
    components: {
      EditorContent,
      EditorMenuBar,
    },
    data() {
      return {
        editor: new Editor({
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History(),
            new Image(),
          ],
          content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
          <img src="https://66.media.tumblr.com/dcd3d24b79d78a3ee0f9192246e727f1/tumblr_o00xgqMhPM1qak053o1_400.gif" />
        `,
          onUpdate: ({ getJSON, getHTML }) => {
            this.json = getJSON()
            this.html = getHTML()
          },
        }),
        html: 'Update content to see changes',
      }
    },
    beforeDestroy() {
      this.editor.destroy()
    },
    methods:{
      clearContent() {
        this.editor.clearContent(true)
        this.editor.focus()
      },
      setContent() {
        // you can pass a json document
        this.editor.setContent({
          type: 'doc',
          content: [{
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is some inserted text. 👋',
              },
            ],
          }],
        }, true)
        // HTML string is also supported
        // this.editor.setContent('<p>This is some inserted text. 👋</p>')
        this.editor.focus()
      },
      showImagePrompt(command) {
        const src = prompt('Enter the url of your image here')
        if (src !== null) {
          command({ src })
        }
      },
    }
  }
</script>

<style>
  .editor {
    position: relative;
    max-width: 30rem;
    margin: 0 auto 5rem auto;
  }
  .editor__content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
  .editor__content * {
    caret-color: currentColor;
  }
  .editor__content pre {
    padding: 0.7rem 1rem;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 0.8rem;
    overflow-x: auto;
  }
  .editor__content pre code {
    display: block;
  }
  .editor__content p code {
    display: inline-block;
    padding: 0 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
  }
  .editor__content ul, .editor__content ol {
    padding-left: 1rem;
  }
  .editor__content li > p, .editor__content li > ol, .editor__content li > ul {
    margin: 0;
  }
  .editor__content a {
    color: inherit;
  }
  .editor__content blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
    padding-left: 0.8rem;
    font-style: italic;
  }
  .editor__content blockquote p {
    margin: 0;
  }
  .editor__content img {
    max-width: 100%;
    border-radius: 3px;
  }
  .editor__content table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
  }
  .editor__content table td, .editor__content table th {
    min-width: 1em;
    border: 2px solid gray;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }
  .editor__content table td > *, .editor__content table th > * {
    margin-bottom: 0;
  }
  .editor__content table th {
    font-weight: bold;
    text-align: left;
  }
  .editor__content table .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }
  .editor__content table .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
  }
  .editor__content .tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
  }
  .editor__content .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  .menubar {
    margin-bottom: 1rem;
    transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  }
  .menubar.is-hidden {
    visibility: hidden;
    opacity: 0;
  }
  .menubar.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }
  .menubar__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
  }
  .menubar__button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .menubar__button.is-active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .menubar span button {
    font-size: 13.3333px;
  }
  .actions {
    max-width: 30rem;
    margin: 0 auto 2rem auto;
  }
  .export {
    max-width: 30rem;
    margin: 0 auto 2rem auto;
  }
  .export pre {
    padding: 1rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.8);
  }
  .export code {
    display: block;
    white-space: pre-wrap;
  }
</style>
