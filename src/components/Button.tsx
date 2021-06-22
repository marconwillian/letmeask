import {ButtonHTMLAttributes} from 'react'

import '../styles/components/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button (props: ButtonProps){

    return (
        <button className="button" {...props} />
    )
}