import React, { Component } from 'react'
import {Markup, Editor, Container, Column, StyleInput, Button,Heading} from './styled'
import 'bulma/css/bulma.css'
import hljs from 'highlight.js'
import {rando, getRandomPoem} from './utilis'
// hightllight.js are use to convert text in to markup :)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      editor:"",
      name0:"",
      begin0:"",
      end0:"",
      style0:"",
      rules:1
    }
 }

  handleChange = (event) => {

    const {name,value} = event.target

    this.setState({
      [name]: value
    })

  }
   /**
   * in rule getter contains the creating rules part on every time click on button
   * new rule will be genrated
   * because we use loop to run evry time on specif condition according to the user respose
   */
  get rules() {
    let {rules} = this.state
    let array = []
    let fields = ['name','begin','end']
    for(let i = 0; i < rules; i++){
      array.push(
        <div className="row" key={i} >
            <div  className="column" >
              {fields.map( (field,index) => {
                return(
                  <div  key={index} className="column" >
                      <div className="field">
                        <div className="control" >
                          <input
                            className="input is-primary "
                            placeholder={field}
                            value={this.state[`${field}${i}`]}
                            onChange={this.handleChange}
                            name={`${field}${i}`}
                          />
                        </div>
                      </div>
                  </div >
                )
              })}
            </div>

            <div className="field">
              <div className="control">
                  <StyleInput
                  cols="30"
                  rows="10"
                  placeholder="add css style on the base of 'begin' and 'end'
                              firstly enter a text on 'Enter a text to design portion'
                              then select letter from it,like 'Kashif' then in input fields
                              type in begin field 'ka' and end field 'if' then try to write style
                              in this portion like color:red then kashif color change to red.
                              so let's try to do :)
                  "
                  className="textarea is-primary "
                  value={this.state[`style${i}`]}
                  onChange={this.handleChange}
                  name={`style${i}`}
                />
              </div>
            </div>
        </div>

      )
    }
    return array
  }

  /*

  in this case whe click on new field the display each of field display on the screen
  when click the rule button the increment fields by 1

  */
  newFields = () => {
    this.setState( (prevState) => {
      let {rules} = prevState
      let fields = ['name','begin','end','style']
      let inputValues = {}
      fields.forEach( (field) => {
        inputValues = {
          ...inputValues,
          [`${field}${rules}`]:''
        }
      })
      rules++
      return {
        rules,
        ...inputValues
      }

    })
  }

  // this function converyt in to markup

  convertToMarkup = ( text = "" ) => {
    return {
      __html:hljs.highlightAuto(text).value
    }
  }

  language = (newRules) => {
    return () => ({
      contains: [
        ...newRules
      ]
    })
  }

  // this can be use to register language
  registerLanguage = (state) => {
    let {rules} = state
    let ruleObjects = []
    for(let i = 0; i < rules; i++ ){
      let newRule = {
        className: state[`name${i}`],
        begin: state[`begin${i}`],
        end:  state[`end${i}`]
      }
      let {className,begin,end} = newRule
      if(
        className.length > 1 &&
        begin.length > 1 &&
        end.length > 1
      ) {
        begin = new RegExp(begin)
        end = new RegExp(end)
        ruleObjects.push(newRule)
      }
    }
    hljs.registerLanguage('language',this.language(ruleObjects))
    hljs.configure({
      languages: ['language']
    })
  }

  componentWillUpdate(nextProps,nextState){
    this.registerLanguage(nextState)
  }

  prepareStyles = () => {
    let {rules} = this.state
    let styles = []
    for (let i = 0; i < rules; i++) {
      styles.push(`
        .hljs-${this.state['name' + i]} {
          ${this.state['style' + i]}
        }
      `)
    }

    let newStyles = "".concat(styles).replace(",", "")

    while (newStyles.includes('random')) {
      newStyles = newStyles.replace('random', rando.color())
    }

    return newStyles
  }


  getRandomText = async () => {
    try {
      let poem = await getRandomPoem()
      this.handleChange({
        target:{
          name:'editor',
          value:poem
        }
      })
    } catch (error) {
      console.log("getRandomPoem error",error)
    }
  }

  render(){
    const {editor} = this.state
    const {handleChange,rules,newFields,convertToMarkup,prepareStyles,getRandomText } = this
  return (
    <Container>
      <Column>
      <Heading className="title is-centered " >Welcome to the Browser styling App</Heading>
        {rules}
        <Button
          onClick={newFields}
          className="button is-primary"
        >
          New Rule
        </Button>
      </Column>
      <Column>
        <Button
          onClick ={getRandomText}
          className="button is-primary is-small"
        >
          Random Text
        </Button>
          <Editor
            cols="40"
            rows="80"
            name={"editor"}
            onChange={handleChange}
            value={editor}
            placeholder="kashif"
            className="textarea is-primary"
          />
          <Markup
            customStyles = {prepareStyles}
            dangerouslySetInnerHTML={convertToMarkup(editor) }
          />
        
      </Column>
    </Container>
  );
}
}

export default App;
