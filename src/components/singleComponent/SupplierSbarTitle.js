import React from 'react'
import { withRouter } from 'react-router-dom'
import CategoryForSupp from './CategoryForSupp'

class SupplierSbarTitle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    static getDerivedStateFromProps(nextProps, prevProps) {
        if(nextProps.categories !== prevProps.categories) {
            return {
                categories: nextProps.categories
            }
        }
        return null
    }

    getArticles = (company_id, supplier_id, group_id) => {
        var storageCompany = JSON.parse(localStorage.getItem('company'))
        this.props.getArticlesForGroupSuppCmp(storageCompany.value, supplier_id, group_id)
    }

    closeAllDropdowns = () => {
        const aElements = document.querySelectorAll('li.sidebar-category a');
        for (var i = 0; i < aElements.length; i++) {
            aElements[i].classList.remove('collapsed');
            aElements[i].setAttribute('aria-expanded', false);
        }

        const ulElements = document.querySelectorAll('li.sidebar-category ul');
        for (i = 0; i < ulElements.length; i++) {
            ulElements[i].classList.remove('show');
        }

    }

    render() {
        return (
            <li className="sidebar-category">
                {/* <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" */}
                <a href={`#homeSubmenu${this.props.supp_id}`} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"
                    onClick={() => {
                        this.props.showGroup(this.props.supp_id);
                        this.closeAllDropdowns();
                    }}> 
                        {this.props.supplier_name}
                </a>
                {/* <ul className="collapse list-unstyled" id="homeSubmenu"> */}
                <ul className="collapse list-unstyled" id={`homeSubmenu${this.props.supp_id}`}>
                {/* <ul className="collapse list-unstyled" id={`#homeSubmenu${this.props.supp_id}`}> */}
                    {
                        this.state.categories.length > 0 ?

                        this.state.categories.map(cat => {
                            return <CategoryForSupp 
                                key={cat.id}
                                group_id={cat.group_id}
                                group_name={cat.group_name}
                                getArticles={() => this.getArticles(this.props.company.value, this.props.supplier_id, cat.group_id)}
                            />
                        })
                        : ""
                    }
                </ul>
            </li>
        )
    }
}

export default withRouter(SupplierSbarTitle)