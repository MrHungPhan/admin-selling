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

import img1 from 'assets/img/blog-1.jpg';
import img2 from 'assets/img/blog-2.jpg';
import img3 from 'assets/img/blog-3.jpg';
import img4 from 'assets/img/blog-4.jpg';
import img5 from 'assets/img/blog-5.jpg';

class ExtendedTables extends Component{
    render(){
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
            <Tooltip id="edit">Edit Post</Tooltip>
        );
        const removePost = (
            <Tooltip id="remove">Remove Post</Tooltip>
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
        const actionsPost = (
            <td className="td-actions">
                <OverlayTrigger placement="left" overlay={editPost}>
                    <Button simple icon bsStyle="success">
                        <i className="fa fa-edit"></i>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="left" overlay={removePost}>
                    <Button simple icon bsStyle="danger">
                        <i className="fa fa-times"></i>
                    </Button>
                </OverlayTrigger>
            </td>
        );
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
                                                <th className="text-center">Thumb</th>
                                                <th>Blog Title</th>
                                                <th className="th-description">Description</th>
                                                <th className="text-right">Date</th>
                                                <th className="text-right">Views</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="img-container">
                                                        <img alt="..." src={img1} />
                                                    </div>
                                                </td>
                                                <td className="td-name">
                                                    10 Things that all designers do
                                                </td>
                                                <td>Most beautiful agenda for the office, really nice paper and black cover. Most beautiful agenda for the office.</td>
                                                <td className="td-number">
                                                    30/08/2016
                                                </td>
                                                <td className="td-number">
                                                    1,225
                                                </td>
                                                { actionsPost }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="img-container">
                                                        <img alt="..." src={img2} />
                                                    </div>
                                                </td>
                                                <td className="td-name">
                                                    Back to School Offer
                                                </td>
                                                <td>Design is not just what it looks like and feels like. Design is how it works.</td>
                                                <td className="td-number">
                                                    17/07/2016
                                                </td>
                                                <td className="td-number">
                                                    49,302
                                                </td>
                                                { actionsPost }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="img-container">
                                                        <img alt="..." src={img3} />
                                                    </div>
                                                </td>
                                                <td className="td-name">
                                                    First Dribbble Meetup in Romania
                                                </td>
                                                <td>A groundbreaking Retina display. All-flash architecture. Fourth-generation Intel processors.</td>
                                                <td className="td-number">
                                                    23/06/2016
                                                </td>
                                                <td className="td-number">
                                                    1,799
                                                </td>
                                                { actionsPost }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="img-container">
                                                        <img alt="..." src={img4} />
                                                    </div>
                                                </td>
                                                <td className="td-name">
                                                    How we created our startup with 0$
                                                </td>
                                                <td>A desk is a generally wooded piece of furniture and a type of useful table often used in a school or office setting for various academic or professional activities ...</td>
                                                <td className="td-number">
                                                    30/08/2016
                                                </td>
                                                <td className="td-number">
                                                    23,030
                                                </td>
                                                { actionsPost }
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="img-container">
                                                        <img alt="..." src={img5} />
                                                    </div>
                                                </td>
                                                <td className="td-name">
                                                    To use or not to use Bootstrap
                                                </td>
                                                <td>The Office Chair adapts naturally to virtually every body and is a permanent fixture.</td>
                                                <td className="td-number">
                                                    10/05/2016
                                                </td>
                                                <td className="td-number">
                                                    13,763
                                                </td>
                                                { actionsPost }
                                            </tr>
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

export default ExtendedTables;
