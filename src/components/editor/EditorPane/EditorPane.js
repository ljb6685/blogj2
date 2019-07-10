import React, { Component } from 'react'
import styles from './EditorPane.scss'
import classNames from 'classnames/bind'
import CodeMirror from 'codemirror'
// Markdown syntax color
import 'codemirror/mode/markdown/markdown' 
// Code color inside markdown
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'
// CSS style for CodeMirror
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

const cx = classNames.bind(styles)

class EditorPane extends Component {
  editor = null // Editor ref
  CodeMirror = null // CodeMirror instance
  cursor = null // Cursor location of editor text  

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true, // Line number on leftside
      lineWrapping: true // Write next line for long texts
    });
    this.codeMirror.on('change', this.handleChangeMarkdown)
  }

// Show CodeMirror instance on the screen
  componentDidMount() {
    this.initializeEditor()
  }

  handleChange = (e) => {
    const { onChangeInput } = this.props
    const { value, name } = e.target
    onChangeInput({name, value})
  }

  handleChangeMarkdown = (doc) => {
    const { onChangeInput } = this.props
    this.cursor = doc.getCursor() // Save text cursor location
    onChangeInput({
      name: 'markdown',
      value: doc.getValue()
    })
  }

// Editor value will be changed, if markdown is change
// Prevent reset of cursor location
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this
      if(!codeMirror) return // If instance is not created...
      codeMirror.setValue(this.props.markdown)
      if(!cursor) return // If cursor is not existed...
      codeMirror.setCursor(cursor)
    }
  }

  render() {
    const { handleChange } = this
    const { tags, title } = this.props

    return (
      <div className={cx('editor-pane')}>
        <input 
          className={cx('title')} 
          placeholder="Please input subject"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx('code-editor')} ref={ref=>this.editor=ref}></div>
        <div className={cx('tags')}>
          <div className={cx('description')}>Tag</div>
          <input 
            name="tags"
            placeholder="Please input tag - divide with comma(,)"
            value={tags}
            onChange={handleChange}
          />
        </div>
      </div>
    )
  }
}

export default EditorPane