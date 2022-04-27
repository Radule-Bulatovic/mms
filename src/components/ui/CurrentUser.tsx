import React from 'react'

type Props = {
    user: string
}

const CurrentUser: React.FC<Props> = (props) => {
  return (
  <div className="form-group paddHome">
  <div className="input-group">
    <div className="input-group-prepend ">
      <span className="input-group-text whiteSpan">
        <img className="imgStyle" src="boy.png" alt="user"></img>
      </span>
    </div>
    <input
      className="form-control setFont inputHp"
      style={{ backgroundColor: "white", paddingTop: "7px" }}
      value={props.user}
      readOnly
    />
  </div>
</div>
  )
}

export default CurrentUser