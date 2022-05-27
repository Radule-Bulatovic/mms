import { companyConstants } from "../constants/company.constants";

const initialState = {
  companies: [],
  shopsVendor: [],
  shops: [],
  selectedCompany: [],
  selectedShop: [],
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case companyConstants.GETCOMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companyConstants.GETCOMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload,
      };
    case companyConstants.GETCOMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case companyConstants.GETSHOPSFORCOMPANY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companyConstants.GETSHOPSFORCOMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        shops: action.payload,
      };
    case companyConstants.GETSHOPSFORCOMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case companyConstants.ADDCOMPANY_SUCCESS:
      return {
        ...state,
        selectedCompany: action.payload,
      };
    case companyConstants.ADDSHOP_SUCCESS:
      return {
        ...state,
        selectedShop: action.payload,
      };
    case companyConstants.GETSHOPSFORUSER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companyConstants.GETSHOPSFORUSER_SUCCESS:
      return {
        ...state,
        loading: false,
        shopsVendor: action.payload,
      };
    case companyConstants.GETSHOPSFORUSER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case companyConstants.RESETSELECTEDCOMPANY_SUCCESS:
      return {
        ...state,
        selectedCompany: [],
      };
    case companyConstants.RESETSELECTEDSHOP_SUCCESS:
      return {
        ...state,
        selectedShop: [],
      };
    default:
      return state;
  }
}
