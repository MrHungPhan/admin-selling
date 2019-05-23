import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions/actionsType'

import FormAddProduct from '../../views/Products/AddProduct'

class FormAddProductContainer extends Component {
    state = {  }
    uploadImage = (files, type) => {
        console.log(files);
        this.props.uploadImage(files, type)
    }

    componentWillMount(){
        console.log(this.props.match)
        this.props.getCatalogSelect()
        this.props.getStyle()
    }



    render() { 
        console.log(this.props.message)
        return <FormAddProduct 
            uploadImage={this.uploadImage}
            images={this.props.images}
            typeE={this.props.typeE}
            catalog={this.props.catalog}
            sizes ={this.props.sizes}
            message = {this.props.message}

            addProduct={this.props.addProduct}
            resetAllAdd={this.props.resetAllAdd}
        />;
    }
}

const mapStateToProps = state => {
    return {
        images : state.products.images,
        typeE : state.products.typeE,
        catalog : state.products.catalog,
        sizes : state.products.style,
        message : state.message
    }
}
 
const mapdispatchToProps = (dispatch, props) => {
    return {
      uploadImage : (files, type) => {
          dispatch(actions.uploadImage(files, type))
      },

      getCatalogSelect : () => {
          dispatch(actions.getCatalog())
      },

      getStyle : () => {
          dispatch(actions.getStyle())
      },

      addProduct :  (data) => {
          dispatch(actions.addProduct(data))
      },

      resetAllAdd : () => {
          dispatch(actions.resetAllAdd())
      }
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(FormAddProductContainer);