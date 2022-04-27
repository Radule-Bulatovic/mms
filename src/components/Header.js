import React from 'react'

export default class Header extends React.Component {
    render(){
        return(
            <header>
                {/* mmsHeader */}
                <div className="headerBck mmsHeader">
                    <img src="logo.png" className="user-image" alt="user" style={{'height':'40px', 'marginBottom':'5px'}} />
                    {/* <div className="yellowHeader">MMS Podgorica</div> */}
                </div>
            </header>
        )
    }
}