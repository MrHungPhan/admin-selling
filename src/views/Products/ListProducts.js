import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Table,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import { Link } from 'react-router-dom'

class ListProduct extends Component{

    removeProduct = (event, id) => {
        this.props.removeProduct(id);
    }
    
    render(){
        const { products } = this.props
        const view = (
            <Tooltip id="view">View Profile</Tooltip>
        );
        const edit = (
            <Tooltip id="edit">Edit Profile</Tooltip>
        );
        const remove = (
            <Tooltip id="remove">Remove</Tooltip>
        );
        const editPost = (
            <Tooltip id="edit">Edit Product</Tooltip>
        );
        const removePost = (
            <Tooltip id="remove">Remove Product</Tooltip>
        );
        const actions = (
            <td className="td-actions text-right">
                <OverlayTrigger placement="top" overlay={edit}>
                    <Button simple bsStyle="success" bsSize="xs">
                        <i className="fa fa-edit"></i>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={remove}>
                    <Button simple bsStyle="danger" bsSize="xs">
                        <i className="fa fa-times"></i>
                    </Button>
                </OverlayTrigger>
            </td>
        );
        const actionsPost = (id) => {
                return (
                <td className="td-actions">
                    <OverlayTrigger placement="left" overlay={editPost}>
                    <Link to={"/products/edit/"+id}>
                        <Button simple icon bsStyle="success">
                            <i className="fa fa-edit"></i>
                        </Button>
                    </Link>
                        
                    </OverlayTrigger>
                    <OverlayTrigger
                    placement="left" overlay={removePost}>
                        <Button onClick={e => this.removeProduct(e, id)} simple icon bsStyle="danger">
                            <i className="fa fa-times"></i>
                        </Button>
                    </OverlayTrigger>
                </td>
            );
        }
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                textCenter
                                title="List Products"
                                category="Danh sách sản phẩm"
                                tableFullWidth
                                content={
                                    <Table responsive className="table-bigboy">
                                        <thead>
                                            <tr>  
                                                <th>ID</th>
                                                <th className="text-center">Ảnh</th>
                                                <th className="th-description">Tên sản phẩm</th>
                                                <th >Giá</th>
                                                <th>Sô lượng</th>
                                                <th >Danh mục</th>
                                                <th>Ngày tạo</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                               products.length !==0 && products.map(item => {
                                                    const { product, nameCatalog } = item
                                                    return  <tr>
                                                                <td >
                                                                 {product.id}
                                                            </td>
                                                            <td>
                                                                <div className="img-container">
                                                                    <img alt="..." src={product.image} />
                                                                </div>
                                                            </td>
                                                            
                                                            <td>{product.name}</td>
                                                            <td >
                                                                {product.price}
                                                            </td>
                                                            <td >
                                                                {product.quantity}
                                                            </td>
                                                            <td >
                                                                {nameCatalog}
                                                            </td>
                                                            <td >
                                                                {product.create_time.split('T')[0]}
                                                            </td>
                                                            { actionsPost(product.id) }
                                                    </tr>
                                                })
                                            }
                                           
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ListProduct;
