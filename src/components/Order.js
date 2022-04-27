import React from 'react'
import { withRouter } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import ArticleCnt from '../containers/ArticleCnt'
import GroupForSmall from './singleComponent/GroupForSmall'
import SupplierSbarTitleCnt from '../containers/SupplierSbarTitleCnt'
import { userPath } from '../constants/path'
import ReactLoading from 'react-loading'

class Order extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = {
            count: '',
            shoppingCart: [],
            articles: [],
            suppliers: [],
            categories: [],
            //data for pagination
            current_page: 1,
            per_page: '',
            total: '',
            searchArtical: '',
            isLoading: true
        }
    }

    componentDidMount() {
        var storageCompany = JSON.parse(localStorage.getItem('company'))
        if(this.props.company.value !== undefined) {
            if(this.props.company.value === 'L001' || 
            this.props.company.value === 'V003'|| 
            this.props.company.value === 'D020' || 
            this.props.company === 'F030' ||
            this.props.company === 'M020'){
            this.props.getArticlesForCompany(this.props.company.value, this.state.current_page)
            this.props.getSuppliersForCompany(this.props.company.value)
        } else {
            this.props.getArticles(this.state.current_page)
            this.props.getAllGroups()
        }
        } else {
            if(storageCompany.value === 'L001' || 
                storageCompany.value === 'V003'|| 
                storageCompany.value === 'D020' || 
                storageCompany === 'F030' ||
                storageCompany === 'M020'){
                this.props.getArticlesForCompany(storageCompany.value, this.state.current_page)
                this.props.getSuppliersForCompany(storageCompany.value)
            } else {
                this.props.getArticles(this.state.current_page)
                this.props.getAllGroups()
            }

        }
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        if(nextProps.articles !== prevProps.articles && nextProps.articles !== undefined) {
            return {
                articles: nextProps.articles,
                current_page: nextProps.articles.current_page,
                per_page: nextProps.articles.per_page,
                total: nextProps.articles.total
            }
        } 
        if(nextProps.suppliers !== prevProps.suppliers && nextProps.suppliers !== undefined) {
            return {
                suppliers: nextProps.suppliers,
                isLoading: false
            }
        }
        if(nextProps.categories !== prevProps.categories && nextProps.categories !== undefined) {
            return {
                categories: nextProps.categories,
                isLoading: false
            }
        }
        return null
    }

    shoppingCart = () => {
        let path = userPath.shoppingCart
        this.props.history.push(path)
    }

    showGroup = (supplier_id) => {
        if(this.props.company.value !== undefined) {
            this.props.getCategoriesForSuppCmp(0, 0); 
            this.props.getCategoriesForSuppCmp(this.props.company.value, supplier_id)
        } else {
            var storageCompany = JSON.parse(localStorage.getItem('company'))
            localStorage.setItem('supplier_id', supplier_id)
            this.props.getCategoriesForSuppCmp(0, 0); 
            this.props.getCategoriesForSuppCmp(storageCompany.value, supplier_id)
        }

    }


    setActivePage = (current_page) => {
        if(this.props.company.value === 'L001' || 
            this.props.company.value === 'V003'|| 
            this.props.company.value === 'D020' ||
            this.props.company === 'F030' ||
            this.props.company === 'M020'){
            this.props.getArticlesForCompany(this.props.company.value, current_page)
        } else {
            this.props.getArticles(current_page)
        }
    }

    //get articles for group - small company
    articlesForGroup = (group_id) => {
        this.setState({
            current_page: 1
        })
        // console.log('this.state.current_page = ',this.state.current_page);
        // this.props.getArticlesForGroup(group_id,this.state.current_page)

        // ako se koristi paginacija, npr strana 5...Kada se odaberu novi proizovdi iz grupe, da se paginacija vrati na prvu stranu 
        this.props.getArticlesForGroup(group_id, 1)
        
    }

    change = (art) => {
        this.setState({
            searchArtical: art.target.value
        })
    }

    search = () => {
        if(this.props.company.value === 'L001' || 
            this.props.company.value === 'V003'|| 
            this.props.company.value === 'D020' || 
            this.props.company === 'F030' ||
            this.props.company === 'M020'){
            if(this.state.searchArtical.length > 0) {
                this.props.searchArticleForCmp(this.props.company.value, this.state.searchArtical, this.state.current_page)
            } else {
                this.props.getArticlesForCompany(this.props.company.value, this.state.current_page)
                this.props.getSuppliersForCompany(this.props.company.value)
            }
        } else {
            if(this.state.searchArtical.length > 0) {
                // console.log('> 0');
                this.props.searchAllArticles(this.state.searchArtical, this.state.current_page)
            } else {
                // console.log('else');
                this.props.getArticles(this.state.current_page)
                this.props.getAllGroups()
            }
        }
        this.setState({
            searchArtical: ''
        })
    }

    render() {

        var storageCompany = JSON.parse(localStorage.getItem('company'))
        var storageShop = JSON.parse(localStorage.getItem('shop'))

        return(
            <div>
                {
                    this.state.isLoading
                    ?
                    <div className="wrapper bckOrders">
                        <div style={{width:'50px', height:'50px', marginLeft:'45%', paddingTop:'50%'}}>
                            <ReactLoading type="spin"  style={{'textAlign':'left'}} />
                        </div>
                    </div>
                    :
                    <>
                    <nav className="navbar navStyle">
                        <div className="container-fluid" >
                            <div className="navbar-header">
                                <div className="input-group divSearch">
                                    <input className="form-control searchField" placeholder="Naziv" type="text" onChange={this.change}/>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text searchSpan " style={{'borderTopRightRadius':'5px', 'borderBottomRightRadius':'5px'}}> 
                                            <img className="imgStyle " src="s.png" alt="user" onClick={this.search}></img>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav navbar-right">
                                <li>
                                    <button className="btn headerBtn shadow" type="button" id="sidebarCollapse" onClick={() => {
                                        window.jQuery('#sidebar').toggleClass('active');
                                    }} >
                                    {/* <button className="btn headerBtn shadow" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" > */}
                                        <i className="fas fa-align-left"></i>
                                    </button>
                                </li>
                                <li>
                                    <button className="btn headerBtn shadow" type="button" onClick={() => this.shoppingCart()}>
                                        <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>




                    <div className="wrapper bckOrders">
                        <nav id="sidebar" className="navbarStyle" style={{'backgroundColor':'#fff1d8'}}>
                        {/* <nav id="collapseExample" className="collapse navbarStyle" style={{'minWidth': '54%'}}> */}
                            {/* <div className="sidebar-header">
                                <img src="logo.png" className="user-image logoSidebar" alt="user" />
                                <h6>MMS</h6>
                            </div> */}
                                <div className="form-group sbHeaderDetails ">
                                    <div className="input-group">
                                        <div className="input-group-prepend setSpanHeight">
                                            <span className="input-group-text noBorder"> 
                                                <img className="imgStyle setMarginSpan" src="c.png" alt="user"></img>
                                            </span>
                                        </div>
                                        <input className="form-control sidebarInput shadow" placeholder="Firma" 
                                            value={this.props.company.label !== undefined ? this.props.company.label : storageCompany.label} 
                                            disabled 
                                            style={{'backgroundColor':'white'}}
                                            />
                                    </div> 
                                </div>

                                <div className="form-group sidebarForm">
                                    <div className="input-group">
                                        <div className="input-group-prepend setSpanHeight">
                                            <span className="input-group-text noBorder"> 
                                                <img className="imgStyle setMarginSpan" src="shop.png" alt="user"></img>
                                            </span>
                                        </div>
                                        <input className="form-control sidebarInput shadow" placeholder="Objekat" 
                                            value={this.props.shop.label !== undefined ? this.props.shop.label : storageShop.label}
                                            disabled 
                                            style={{'backgroundColor':'white'}} 
                                            />
                                    </div> 
                                </div>
                                
                                <div className="form-group sbHeaderDetails " style={{'marginTop':'-14px'}}>
                                    <div className="input-group">
                                        <div className="input-group-prepend setSpanHeight">
                                            <span className="input-group-text noBorder"> 
                                                <img className="imgStyle setMarginSpan" src="dsc2.png" alt="user"></img>
                                            </span>
                                        </div>
                                        <input className="form-control sidebarInput shadow" placeholder="Firma" 
                                            value={this.props.company.discount !== undefined ? this.props.company.discount+"%" : storageCompany.discount+"%"} 
                                            disabled 
                                            style={{'backgroundColor':'white'}}
                                            />
                                    </div> 
                                </div>
                            {/* </div> */}
                            {/* className="list-unstyled components" */}
                            <ul className="list-unstyled" style={{'fontSize':'12px'}}>
                                <h6 className="titleCategory">Kategorije proizvoda</h6>
                                {/* <li className="active"> */}


                                {
                                    this.props.company.value !== undefined 
                                    ? 

                                    (this.props.company.value === 'L001' || 
                                    this.props.company.value === 'V003'|| 
                                    this.props.company.value === 'D020' ||
                                    this.props.company === 'F030') ?
                                        this.state.suppliers.map(supp => {
                                            return <SupplierSbarTitleCnt
                                                key={supp.id}
                                                supp_id={supp.supplier_id}
                                                supplier_name={supp.supplier_name}
                                                showGroup={() => this.showGroup(supp.supplier_id)}
                                                categories={this.state.categories}
                                                supplier_id={supp.supplier_id}
                                            />
                                        })
                                    :
                                    
                                    // add groups for small company
                                    this.props.allGroups.map(group => {
                                        return <GroupForSmall
                                            key={group.id}
                                            group_id={group.group_id}
                                            group_name={group.group_name}
                                            getArticles={() => this.articlesForGroup(group.group_id)}
                                        />
                                    })


                                    : 

                                    (storageCompany.value === 'L001' || 
                                    storageCompany.value === 'V003'|| 
                                    storageCompany.value === 'D020' ||
                                    storageCompany === 'F030') ?
                                        this.state.suppliers.map(supp => {
                                            return <SupplierSbarTitleCnt
                                                key={supp.id}
                                                supp_id={supp.supplier_id}
                                                supplier_name={supp.supplier_name}
                                                showGroup={() => this.showGroup(supp.supplier_id)}
                                                categories={this.state.categories}
                                                supplier_id={supp.supplier_id}
                                            />
                                        })
                                    :
                                    
                                    // add groups for small company
                                    this.props.allGroups.map(group => {
                                        return <GroupForSmall
                                            key={group.id}
                                            group_id={group.group_id}
                                            group_name={group.group_name}
                                            getArticles={() => this.articlesForGroup(group.group_id)}
                                        />
                                    })
                                }
                            </ul>
                        </nav>

                            <table className=" table table-striped col-sm-12"> 
                                <thead className="tableHeader">
                                    <tr className="sortCursor">
                                        <th className="thCartName">
                                            {/* <span className="fa fa-sort"></span> */}
                                            Naziv
                                        </th>
                                        <th className="thCart">
                                            {/* <span className="fa fa-sort"></span> */}
                                            Lager
                                        </th>
                                        <th className="thCart">
                                            <span className="fa fa-sort spanEuro"></span>
                                            &euro;
                                        </th>
                                        <th className="thCart">
                                            Kol.
                                        </th>
                                        <th className="thCart">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.articles.data !== undefined ?
                                        this.state.articles.data.map(article => {
                                            return <ArticleCnt
                                                    key={article.id}
                                                    id={article.article_id}
                                                    name={article.article_name}
                                                    count={article.count}
                                                    price={article.price}
                                                    tax={article.tax}
                                                />
                                        }) :
                                        (
                                            <tr>
                                                <td>Podaci se učitavaju!</td>
                                            </tr>
                                        ) 
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="pagination-sm">
                                            <Pagination 
                                                activePage={this.state.current_page} 
                                                itemsCountPerPage={this.state.per_page} 
                                                totalItemsCount={this.state.total} 
                                                pageRangeDisplayed={5}
                                                onChange={this.setActivePage}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                    </div>
                    </>
                }

                                        
            </div>
            
        )
    }
}

export default withRouter(Order)
