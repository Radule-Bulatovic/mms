import React from 'react'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { userPath } from '../constants/path'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        //restart schedule hist
        this.props.restartScheduleHistory()
        this.props.restartReportReducer()
        this.props.resetStoreSurveyValues()
        if(this.props.user.details !== undefined) {
            // localStorage.setItem('operater', this.props.user.details.operater)
            // localStorage.setItem('user_name', this.props.user.details.name)
            // localStorage.setItem('admin', this.props.user.details.admin)
            localStorage.setItem('user', JSON.stringify(this.props.user.details))
            this.props.restartStoreSurvey()
        } else {
            this.setState({
                user: localStorage.getItem("user_name")
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        let _user
        if(nextProps.user !== prevProps.user) {
            _user= nextProps.user.details
            return { 
                user: _user
            }
        }
        return null
    }

    vendorShops = () => {
        let path = userPath.vendorShops
        this.props.history.push(path)
    }

    dailyReport = () => {
        var storageUser = JSON.parse(localStorage.getItem('user'))
        if(parseInt(storageUser.admin) === 1) {
            let path = userPath.dailyReportAdmin
            this.props.history.push(path)
        } else {
            let path = userPath.dailyReport
            this.props.history.push(path)
        }
    }

    finance = () => {
        var user = JSON.parse(localStorage.getItem('user'))
        if(parseInt(user.admin) === 1){
            let path = userPath.finance
            this.props.history.push(path)
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Nemate pravo pristupa!',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }   

    storeSurvey = () => {
        var user = JSON.parse(localStorage.getItem('user'))
        if(parseInt(user.admin) === 1){
            let path = userPath.dailyReportStoreSurvey
            this.props.history.push(path)
        } else {
            let path = userPath.dailyReportStoreSurveyUser
            this.props.history.push(path)
            // Swal.fire({
            //     position: 'top-end',
            //     icon: 'error',
            //     title: 'Nemate pravo pristupa!',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
        }
    }

    schedule = () => {
        var user = JSON.parse(localStorage.getItem('user'))
        if(parseInt(user.admin) === 1){
            let path = userPath.scheduleAdmin
            this.props.history.push(path)
        } else {
            let path = userPath.schedule
            this.props.history.push(path)
        }
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('company')
        localStorage.removeItem('shop')
        localStorage.removeItem('cart')
        localStorage.removeItem('user')
        this.props.restartStoreSurvey()
        this.props.resetSelectedCompany()
        this.props.resetSelectedShop()
        let path = userPath.login
        this.props.history.push(path)
    }

    render() {
        var storageUser = JSON.parse(localStorage.getItem('user'))

        return(
            <div>
                <div className="col-sm-12 height-styleHome bck">
                    <div className="form-group paddHome">
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text whiteSpan"> 
                                    {/* <i className="fa fa-user"></i> */}
                                    <img className="imgStyle" src="boy.png" alt="user"></img>
                                </span>
                            </div>
                            <input className="form-control setFont inputHp" style={{'backgroundColor':'white', 'paddingTop':'7px'}} 
                                value={this.state.user !== undefined ? this.state.user.name : storageUser.name} 
                                readOnly/>
                        </div> 
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text whiteSpan"> 
                                    <img className="imgStyle" src="scart.png" alt="user"></img>
                                </span>
                            </div>
                            <button className="btn form-control btnHomePage" onClick={this.vendorShops}>Naručivanje</button>
                        </div> 
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text whiteSpan"> 
                                    <img className="imgStyle" src="stats.png" alt="user"></img>
                                </span>
                            </div>
                            <button className="btn form-control btnHomePage" onClick={this.dailyReport}>Dnevni pregled narudžbi</button>
                        </div> 
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text whiteSpan"> 
                                    <img className="imgStyle" src="storesurvey5.png" alt="storesurvey"></img>
                                </span>
                            </div>
                            <button className="btn form-control btnHomePage" onClick={this.storeSurvey}>Dnevni pregled anketi</button>
                        </div> 
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text whiteSpan"> 
                                    <img className="imgStyle" src="euro.png" alt="user"></img>
                                </span>
                            </div>
                            <button className="btn form-control btnHomePage" onClick={this.finance}>Finansije</button>
                        </div> 
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text whiteSpan"> 
                                    <img className="imgStyle" src="house.png" alt="user"></img>
                                </span>
                            </div>
                            <button className="btn form-control btnHomePage" onClick={this.schedule}>Raspored prodavnica</button>
                        </div> 
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend ">
                                <span className="input-group-text whiteSpan"> 
                                    <img className="imgStyle" src="logout.png" alt="user"></img>
                                </span>
                            </div>
                            <button className="btn form-control btnHomePage" onClick={this.logout}>Logout</button>
                        </div> 
                    </div>


                </div>
            </div>
        )
    }
}

export default withRouter(HomePage)
