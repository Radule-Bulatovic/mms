import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import DatePicker from "react-datepicker";
import moment from 'moment'
import { getUsers_request } from '../actions/user.action';
import Select from 'react-select'
import DailiReportStoreSurvey from './singleComponent/DailiReportStoreSurvey';
import ReactLoading from 'react-loading'

function DailyReportStoreSurvey(props) {
    const dispatch = useDispatch()

    const [selectedDate, changeStateDate] = useState(new Date())

    const users = useSelector((state) => state.reportReducer.users)
    const storesForComAndDate = useSelector((state) => state.storeSurveyReducer.storesForComAndDate)
    const storesForComAndDateAndCmpAndSop = useSelector((state) => state.storeSurveyReducer.storesForComAndDateAndCmpAndSop)

    const [selectedUser, changeSelectedUser] = useState("")
    const [companyName, changeCompanyName] = useState("")
    const [shopName, changeShopName] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingCompany, setIsLoadingCompany] = useState(false)
    const [isLoadingItems, setIsLoadingItems] = useState(false)

    useEffect(() => {
        // localStorage.removeItem('survey')
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
    }, [storesForComAndDate])

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingItems(false)
        }, 500)
    }, [storesForComAndDateAndCmpAndSop])

    const changeDate = (date) => {
        console.log(selectedUser)
        if(selectedUser !== "") {
            setIsLoadingCompany(true)
        }
        props.resetStoreSurveyValues()
        changeCompanyName("")
        changeShopName("")
        changeStateDate(date)
        if(selectedUser !== "") {
            let details = {
                date: moment(date).format('YYYY-MM-DD'),
                user: selectedUser.operater
            }
            props.getSSforComercAndDate(details)
        }
    }

    const handleChangeUser = (user) => {
        setIsLoadingCompany(true)
        props.resetStoreSurveyValues()
        changeCompanyName("")
        changeShopName("")
        changeSelectedUser(user)
        let details = {
            date: moment(selectedDate).format('YYYY-MM-DD'),
            user: user.operater
        }
        props.getSSforComercAndDate(details)
    }

    const showItems = (company_id, shop_id, date, company_name, shop_name) => {
        setIsLoadingItems(true)
        changeCompanyName(company_name)
        changeShopName(shop_name)
        // props.getItemsForInvoice(invoice_id)
        let details = {
            user: selectedUser.operater,
            company_id: company_id,
            shop_id: shop_id,
            date: date,
        }
        props.getSSforComercAndDateAndCmpAndShop(details)
    }

    return(
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
                    <div className="form-group dailyDataPicker xxxx" style={{'width':'230px'}}>
                        <Select 
                            options={users}
                            onChange={handleChangeUser}
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
                                    <th className="thAnalticalItem" style={{'width':'50%'}}>
                                        Datum
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{'fontSize':'13px'}}>
                                {
                                    storesForComAndDate.length > 0
                                    ?
                                    storesForComAndDate.map(item => {
                                        return <DailiReportStoreSurvey 
                                            key={item.id}
                                            company_name={item.company_name}
                                            datum={item.datum}
                                            shop_name={item.shop_name}
                                            showItems={() => showItems(item.company_id, item.shop_id, item.date, item.company_name, item.shop_name)}
                                        />
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

{
                        isLoadingItems === true
                        ?
                        <div style={{width:'50px', height:'50px', marginLeft:'45%', paddingTop:'10%'}}>
                            <ReactLoading type="spin"  style={{'textAlign':'left'}} />
                        </div>
                        :
                        <>

<h6 className="vendorShopsTitle">{ companyName }</h6>
                <h6 className="vendorShopsTitle" style={{'marginTop':'-20px'}}>{ shopName }</h6>
                {
                    storesForComAndDateAndCmpAndSop.length > 0
                    ?
                    <table className=" table table-striped col-sm-12 dailyTbl" style={{'marginBottom':'15px'}}> 
                        <tbody style={{'fontSize':'13px'}}>
                            {
                                storesForComAndDateAndCmpAndSop.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.anketa_name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    :
                    ""
                }
                        </>
}
                    

                
            </form>
            </>
        }
        </div>
    )
}

export default withRouter(DailyReportStoreSurvey)