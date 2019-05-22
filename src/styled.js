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
    


`
