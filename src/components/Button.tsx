import {ButtonHTMLAttributes} from 'react'; // importanta dodas  as props de um tag html

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps){
  return(
    <button className="button" {...props}/>
  )
}