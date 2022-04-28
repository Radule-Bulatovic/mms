import React from 'react'
import ReactLoading from "react-loading";

const Loader: React.FC= () => (
    <div style={{width:'50px', height:'50px', marginLeft:'40%', marginTop:'20%'}}>
      <ReactLoading type="spin" />
    </div>
  )


export default Loader;