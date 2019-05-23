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

class ListPost extends Component{

    removePost = (event, id) => {
        console.log(id);
        this.props.removePost(id)
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
            <Tooltip id="edit">Edit Post</Tooltip>
        );
        const removePost = (
            <Tooltip id="remove">Remove Post</Tooltip>
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
                        <Button onClick={e => this.removePost(e, id)} simple icon bsStyle="danger">
                            <i className="fa fa-times"></i>
                        </Button>
                    </OverlayTrigger>
                </td>
            );
        }

        const { posts } = this.props
        console.log(posts)
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                textCenter
                                title="List Posts"
                                category="Danh sách viết"
                                tableFullWidth
                                content={
                                    <Table responsive className="table-bigboy">
                                        <thead>
                                            <tr>  
                                                <th>ID</th>
                                                <th>Hình ảnh</th>
                                                <th className="text-center">Tiêu đề</th>
                                                <th className="th-description">ND ngắn gọn</th>
                                                <th >Ngày tạo</th>
                                                <th>Tác giả</th>
                                                <th >Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                posts.length !== 0 && posts.map(post => {
                                                   return  <tr>
                                                        <td>
                                                            { post.id}
                                                        </td>
                                                        <td>
                                                            <div className="img-container">
                                                                <img alt="..." src={post.image} />
                                                            </div>
                                                            </td>
                                                        <td>
                                                            { post.title }
                                                        </td>
                                                        <td>
                                                            { post.sumary }
                                                        </td>
                                                        <td>
                                                            { post.create_date.split('T')[0] }
                                                        </td>
                                                        <td>
                                                            { post.create_by }
                                                        </td>
                                                        <td>
                                                            { post.status ? "Hiển thị" : "Ẩn"}
                                                        </td>
                                                        { actionsPost(post.id)}
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

export default ListPost;
