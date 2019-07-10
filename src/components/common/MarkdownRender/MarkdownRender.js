import React, { Component } from 'react'
import styles from './MarkdownRender.scss'
import classNames from 'classnames/bind'
import marked from 'marked'

// prism code - http://prismjs.com/#languages-list
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-css.min.js'

const cx = classNames.bind(styles)

class MarkdownRender extends Component {
  state = {
    html: ''
  }

  renderMarkdown = () => {
    const { markdown } = this.props
    if(!markdown) {
      this.setState({ html : '' })
      return
    }
    this.setState({
      html: marked(markdown, {
        breaks: true, // Use enter key to go next line
        sanitize: true
      })
    })
  }

// This is for serverside rendering
  constructor(props) {
    super(props);
    const { markdown } = props
    this.state = {
      html: markdown ? marked(props.markdown, { breaks: true, sanitize: true }) : ''
    }
  }

// If markdown value is changed, call renderMarkdown
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown()
    }
    // If state is changed, excute code highlight
    if(prevState.html !== this.state.html) {
      Prism.highlightAll()
    }
  }

  componentDidMount() {
    Prism.highlightAll()
  }
  
  render() {
    const { html } = this.state
    const markup = {
      __html: html
    }
    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
    )
  }
}

export default MarkdownRender