import Styled from 'styled-components'
export const Heading = Styled.h1`
    font-weight:4px bold
    color: white
  text-shadow: 2px 2px 4px #000000
`
export const Container = Styled.div`
    display:flex
    flex-direction:row
    margin:auto
    justify-content:space-around
`
export const Column = Styled.div`
    display:flex
    flex-direction:column
    margin-top:30px
    width:600px
`
export const Row = Styled.div`
    display:flex
    flex-direction:row
    margin:10px
`
export const RuleInput = Styled.input`
    padding:10px
    width:auto
    background:black
    font-weight:4px bold
    color:white
    text-shadow:2px 2px 4px #000000
`
export const RuleLabel = Styled.label`
`
export const Button = Styled.button`
`

export const StyleInput = Styled.textarea`
    margin:4px
    padding:9px
    font-size:20px
    border:solid grey 1px
    background:black
    color:green
    font-style:italic
`
export const Document = Styled.div`
    display:flex
    width:550px
    height:800px
    padding:10px
    border:1px solid black
`

export const Markup = Styled.div`
    height:100%
    width:100%
    color:blue
    font-size:18px
    line-height:18px
    font-family:monospace
    white-space:pre-wrap
    ${({customStyles})=>customStyles }
`
export const Editor = Styled.textarea`
    position:absolute
    margin:0
    padding:0
    border:0
    width:550px
    height:800px
    color:transparent
    z-index:1
    outline:0
    background-color: transparent
    font-size: 18px
    line-height: 18px
    font-family:monospace
    caret-color:black
    


`
