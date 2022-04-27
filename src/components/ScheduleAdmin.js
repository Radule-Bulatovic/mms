import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import DatePicker from "react-datepicker";
import Select from 'react-select'
import { getUsers_request } from '../actions/user.action';
import moment from 'moment';
import ReactLoading from 'react-loading'

function ScheduleAdmin(props) {
    const dispatch = useDispatch()

    const users = useSelector((state) => state.reportReducer.users)

    const sheduleHist = useSelector((state) => state.scheduleReducer.sheduleHist)

    const [selectedDate, changeStateDate] = useState()
    const [finalDate, changeFinalDate] = useState("")
    const [fullDate, changeFullDate] = useState("")
    const [user, changeUser] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingCompany, setIsLoadingCompany] = useState(false)

    useEffect(() => {
        localStorage.removeItem('survey')
        dispatch(getUsers_request())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(users !== undefined) {
            if(users.length > 0) {
                setIsLoading(false)
            }
        }
    }, [users])

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingCompany(false)
        }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheduleHist])


    const changeDate = (date) => {
        if(user !== ""){
            setIsLoadingCompany(true)
        }
        let _fullDate = moment(date).format('YYYY-MM-DD')
        let _date = date+""
        let _finalDate = _date.substring(0,2)
        //set full date for second query in laravel
        changeFullDate(_fullDate)
        //set date for data-picker
        changeStateDate(date)
        //set date for submit form
        changeFinalDate(_finalDate)
        if(user !== undefined) {
            if(parseInt(user.operater) > 0) {
                //pozvati funkciju
                let details = {
                    operater: user.operater,
                    date: _finalDate,
                    fullDate: _fullDate
                }
                props.checkScheduleDetails(details)
            }
        }
    }

    const hanleChangeUser = (user) => {
        if(fullDate !== ""){
            setIsLoadingCompany(true)
        }
        changeUser(user)
        if(finalDate.length > 0) {
            //pozvati funkciju
            let details = {
                operater: user.operater,
                date: finalDate,
                fullDate: fullDate
            }
            props.checkScheduleDetails(details)
        }
    }

    return(
        <div>
            <div className="col-sm-12 height-styleFinance bckOrders">
            {
                isLoading === true
                ?
                    <div style={{width:'50px', height:'50px', marginLeft:'45%', paddingTop:'20%'}}>
                        <ReactLoading type="spin"  style={{'textAlign':'left'}} />
                    </div>
                :
                <>
                <form name="checkForm" className="setOpacity banacecheckForm">
                    <div className="box-body">
                        <div className="form-group setColor">
                            <h6 className="vendorShopsTitle">Datum:</h6>
                        </div>
                        <div className="form-group dailyDataPicker" >
                            <DatePicker className="form-control"
                                placeholderText="Izaberite datum" 
                                onChange={changeDate}
                                selected={selectedDate}
                            />
                        </div>
                        <div className="form-group setColor">
                            <h6 className="vendorShopsTitle">Komerc.</h6>
                        </div>
                        <div className="form-group dailyDataPicker" style={{'width':'230px'}}>
                            <Select 
                                options={users}
                                onChange={hanleChangeUser}
                                selected={user}
                            />
                        </div>
                    </div>
                    {
                        isLoadingCompany === true
                        ?
                        <div style={{width:'50px', height:'50px', marginLeft:'45%', paddingTop:'10%'}}>
                            <ReactLoading type="spin"  style={{'textAlign':'left'}} />
                        </div>
                        :
                        <>
                            <table className=" table table-striped col-sm-12 dailyTbl" style={{'marginBottom':'15px'}}> 
                                <thead className="tableHeader">
                                    <tr className="sortCursor">
                                        <th className="thAnalticalItem" style={{'width':'50%'}} >
                                            Kupac
                                        </th>
                                        <th className="thAnalticalItem" style={{'width':'50%'}}>
                                            Objekat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{'fontSize':'13px'}}>
                                    {
                                        sheduleHist.length > 0
                                        ?
                                        sheduleHist.map((item, index) => {
                                            return (
                                                <tr key={index} >
                                                    {/* <td>{item.kupac}</td>
                                                    <td>{item.kup_obj}</td> */}
                                                    <td>{item.kupac_naziv}</td>
                                                    <td>{item.kup_obj_naziv}</td>
                                                    <td className={item.visibility === false ? "scheduleRed" : "scheduleGreen"}>{item.visibility}</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td>Nema podataka!</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                </form>
                </>
            }
            </div>
        </div>
    )
}   

export default withRouter(ScheduleAdmin)