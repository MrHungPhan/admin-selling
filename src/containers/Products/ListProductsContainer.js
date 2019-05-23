import React , { Component  } from "react";
import ListProduct from '../../views/Products/ListProducts';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionsType'
import { NotificationContainer } from 'react-notifications'

import Alert from '../../components/Alert/Alert';

class ListProductContainer extends Component {
    
    componentDidMount(){
        this.props.getProducts();
    }

    removeProduct = (id) => {
        this.props.removeProduct(id)
    }

    componentWillUnmount(){
    }

    render() { 
        const {stateProducts, message} = this.props;
        const { products } = stateProducts
        console.log(products)
        return <div>
             <ListProduct 
            products={products}
            removeProduct= {this.removeProduct}
            message={message}
        />
         {
         message.statusAddProduct === 1 && <Alert type="success" 
                                                            message={message.messAddProduct}
                                                            resetMessage={this.props.resetMessAdd}
                                                            />
        }
        {
           message.messRemoveProduct && <Alert type="success" 
                                                    message={message.messRemoveProduct}
                                                    resetMessage={this.props.resetMessRemove}
            />
        }
        <NotificationContainer />

        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        stateProducts : state.products,
        message : state.message
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getProducts : () => {
            dispatch(actions.getProducts())
        },

        resetMessAdd : () => {
            dispatch(actions.resetMessAdd())
        },

        removeProduct : (id) => {
            dispatch(actions.removeProduct(id))
        },

        resetMessRemove : () => {
            dispatch(actions.resetMessRemove())
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ListProductContainer);