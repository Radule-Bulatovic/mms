import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import DatePicker from "react-datepicker";
import moment from 'moment'
import { getUsers_request } from '../actions/user.action';
import Select from 'react-select'
import DailyReportItemAdmin from './singleComponent/DailyReportItemAdmin';
import ItemsForInvoice from './singleComponent/ItemsForInvoice';
import ReactLoading from 'react-loading'

function DailyReportAdmin(props) {
    const dispatch = useDispatch()

    const [selectedDate, changeStateDate] = useState(new Date())

    const users = useSelector((state) => state.reportReducer.users)
    const invoices = useSelector((state) => state.reportReducer.invoices)
    const items = useSelector((state) => state.reportReducer.items)

    const [selectedUser, changeSelectedUser] = useState("")
    const [companyName, changeCompanyName] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingCompany, setIsLoadingCompany] = useState(false)
    const [isLoadingItems, setIsLoadingItems] = useState(false)


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
        // if(invoices !== undefined) {
        //     if(users.length > 0) {
        //         setIsLoadingCompany(false)
        //     }
        // }
        setTimeout(() => {
            setIsLoadingCompany(false)
        }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoices])

    useEffect(() => {
        if(items !== undefined) {
            if(items.length > 0) {
                setIsLoadingItems(false)
            }
        }
    }, [items])

    const changeDate = (date) => {
        if(selectedUser !== "") {
            setIsLoadingCompany(true)
        }
        changeStateDate(date)
        if(selectedUser !== "") {
            let details = {
                date: moment(date).format('YYYY-MM-DD'),
                user: selectedUser.operater,
                page: 1
            }
            props.getInvoicesForDate(details)
        }
    }

    const handleChangeUser = (user) => {
        setIsLoadingCompany(true)
        changeSelectedUser(user)
        let details = {
            date: moment(selectedDate).format('YYYY-MM-DD'),
            user: user.operater
        }
        props.getInvoicesForDate(details)
    }

    const showItems = (invoice_id, company_name) => {
        setIsLoadingItems(true)
        changeCompanyName(company_name)
        props.getItemsForInvoice(invoice_id)
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
                                    <th className="thAnalticalItem" style={{'width':'10%'}}>
                                        Br.Rač
                                    </th>
                                    <th className="thAnalticalItem" style={{'width':'30%'}}>
                                        Datum
                                    </th>
                                </tr>
                            </thead>
                                <tbody style={{'fontSize':'13px'}}>
                                {
                                    invoices.length > 0
                                    ?
                                    invoices.map( (item, index) => {
                                        return <DailyReportItemAdmin
                                                key={index}
                                                id={item.id}
                                                company_name={item.company_name}
                                                shop_name={item.shop_name}
                                                status={item.status}
                                                invoice_id={item.invoice_id}
                                                latitude={item.latitude}
                                                longitude={item.longitude}
                                                date={item.sdat}
                                                showItems={() => showItems(item.id, item.company_name)}
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
                        
                        <h6 className="vendorShopsTitle">
                        {
                            items.length > 0 ? companyName : ""
                        }
                    </h6> 
                    {
                        items.length > 0 ? 
                        
                        <table className=" table table-striped col-sm-12 dailyTbl"> 
                        <thead className="tableHeader">
                            <tr className="sortCursor">
                                <th className="thAnalticalItem" style={{'width':'70%'}} >
                                    Artikal
                                </th>
                                <th className="thAnalticalItem" style={{'width':'10%'}}>
                                    Kol.
                                </th>
                                <th className="thAnalticalItem" style={{'width':'10%'}}>
                                    Cijena
                                </th>
                                <th className="thAnalticalItem" style={{'width':'10%'}}>
                                    %
                                </th>
                            </tr>
                        </thead>
                        <tbody style={{'fontSize':'13px'}}>
                        {
                                items !== undefined ?
                                items.map( (item, index) => {
                                    return <ItemsForInvoice
                                            key={index}
                                            item={item.name}
                                            quantity={item.quantity}
                                            price={item.price}
                                            discount={item.discount}
                                        />
                                }) :
                                (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                ) 
                            }
                        </tbody>
                    </table>
                         : ""
                    } 
                    
                        </>
                    }
                </form>
                </>
            }
            </div>
        </div>
    )
}

export default withRouter(DailyReportAdmin)