import React from 'react'

type Props = {
    clickHandler: () => void,
    icon: string,
    alt: string,
    text: string
}

const IconButton: React.FC<Props>= (props) => (
    <div className="form-group">
        <div className="input-group">
            <div className="input-group-prepend ">
                <span className="input-group-text whiteSpan"> 
                    <img className="imgStyle" src={props.icon} alt={props.alt}></img>
                </span>
            </div>
            <button className="btn form-control btnHomePage" onClick={props.clickHandler}>{props.text}</button>
        </div> 
    </div>
  )
export default IconButton;