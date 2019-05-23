import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Form, FormGroup, FormControl, ControlLabel
} from 'react-bootstrap';
import lodash from 'lodash'
import classnames from 'classnames'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import $ from 'jquery';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { Redirect } from 'react-router-dom'
import { Input } from 'reactstrap'
import Files from 'react-files';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Radio from 'elements/CustomRadio/CustomRadio.jsx';

window.$ = $


class FormAddPost extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
           title : '',
           sumary : '',
           content : '',
           create_by : '',
           status : true,

           fileImage : [],
           fileImageServer : [],
           type_fileimageError : '',

        }
    }

    handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = name === "status" ?(target.value ==="true" ? true : false ) : target.value;
        console.log(name, value)
        this.setState({
            ...this.state,
            [name] : value
        }, () => {
            console.log('post - ', this.state)
        })
    }

    handleModelChange = async model => {
        await this.setState({
            content : model
        })
        console.log('post - ', this.state)
    }

    /////////////////// IMage //////////////////

    onImageChange = files => {
        var { fileImage, type_fileimageError } = this.state;

        if(files.length > fileImage.length){
            const count = files.length - fileImage.length;
            var formData = new FormData();
            for(let i = 1; i<= count; i++){   
                 formData.append(i, files[files.length - i])
            }
             if (!type_fileimageError) {
                this.props.uploadImage(formData)
            }

        }
    
        this.setState({
            fileImage: files
        })
    }

    removeImage = (file) => {
        console.log(file)
        this.refs.imageRef.removeFile(file);
         
        this.setState({
            type_fileimageError: '',
            fileImageServer : []

        })
    }

    onImageError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message);
        this.setState({
            type_fileimageError: error.message

        })
    }
    ///////////////////////////////////
    componentWillReceiveProps(nextProps){
        if (nextProps.images.length !== 0) {
            this.setState({
                fileImageServer: [...this.state.fileImageServer, ...nextProps.images]
            })
        }
    }
    
    ///////////////////// SUbmit //////////////////
    onSubmit = (event) => {
        event.preventDefault();
        
        console.log(this.state);
        this.props.addPost(this.state);
    }

    render() {   
        const config = {
            imageUploadURL: 'https://api.cloudinary.com/v1_1/dxvmlrh16/image/upload',
            imageUploadParams: {
                'api_key': '898996513592412',
                'upload_preset': 'quzvrvjx'
            },
            imageUploadMethod: 'POST',
            events: {
                'froalaEditor.image.uploaded': (e, editor, response) => {
                    response = JSON.parse(response);
                    editor.image.insert(response.secure_url, true, null, editor.image.get(), null)
                    return false
                }
            }
        }
        if(this.props.message.statusAddPost === 1)
                return <Redirect to='/post/list' />
        else    return (
                <div className="main-content">
                    <Grid fluid>
                        <Row>

                            <Col md={12}>
                                <Form horizontal onSubmit={this.onSubmit}>
                                    <Card
                                        title={
                                            <legend>Thêm mới</legend>
                                        }
                                        content={
                                            <div>
                                                <FormGroup controlId="formHorizontalNumber">
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Tiêu đề
                                                    </Col>
                                                    <Col sm={10}>
                                                        <FormControl type="text"
                                                        onChange={this.handleChange}
                                                        name="title" />    
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Hình ảnh
                                                    </Col>
                                                    <Col sm={10}>
                                                        <div className='files-image'>
                                                            {this.state.type_fileimageError && <small className="text-danger">{this.state.type_fileimageError}</small>}
                                                            <Files
                                                                ref='imageRef'
                                                                name="image"
                                                                className='files-dropzone'
                                                                onChange={this.onImageChange}
                                                                onError={this.onImageError}
                                                                accepts={['image/png', '.jpg']}
                                                                multiple={false}
                                                                maxFileSize={10000000}
                                                                minFileSize={0}
                                                                clickable
                                                            >Kéo thả file vào hoặc click để upload
                                                                </Files>
                                                            <div className={classnames('image-products', { 'not-img': this.state.fileImage.length === 0 })}>
                                                        
                                                                {this.state.fileImage.length !== 0 && this.state.fileImage.map(image => {
                                                                    return <div key={image.id} onClick={() => this.removeImage(image)}>
                                                                        <img src={image.preview.url} />

                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>


                                                    </Col>
                                                </FormGroup>
                                                <FormGroup controlId="formHorizontalNumber">
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Tóm tắt ND
                                                    </Col>
                                                    <Col sm={10}>
                                                    <Input type="textarea"
                                                     name="sumary"
                                                      id="exampleText"
                                                      onChange ={this.handleChange}
                                                      />
                   
                                                    </Col>
                                                </FormGroup>
                                        
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Nội dung
                                                    </Col>
                                                    <Col sm="10">
                                                    <FroalaEditor
                                                        model={this.state.content}
                                                        onModelChange={this.handleModelChange}
                                                        config={config}
                                                        />
                                                        {/* <FroalaEditorView
                                                            model={this.state.content}
                                                        /> */}
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup controlId="formHorizontalNumber">
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Tác giả
                                                    </Col>
                                                    <Col sm={10}>
                                                        <FormControl type="text"
                                                        onChange={this.handleChange}
                                                        name="create_by" />
                                                       
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Trạng thái
                                                </ControlLabel>
                                                <Col sm={3}>
                                                    <Radio
                                                        name="status"
                                                        option={true}
                                                        onChange={this.handleChange}
                                                        number="1"
                                                        checked={this.state.status === true}
                                                        label="Hiển thị"
                                                    />
                                                </Col>
                                                <Col sm={3}>
                                                    <Radio
                                                        name="status"
                                                        option={false}
                                                        onChange={this.handleChange}
                                                        number="2"
                                                        checked={this.state.status === false}
                                                        label="Không hiển thị"
                                                    />
                                                </Col>
                                            </FormGroup>
                                            </div>
                                        }
                                        ftTextCenter
                                        legend={
                                            <Button fill bsStyle="info" type="submit" >Thêm mới</Button>
                                        }
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        
        
    }
}

export default FormAddPost;
