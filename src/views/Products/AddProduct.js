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
import Files from 'react-files';
import Select from 'react-select';
import Spinner from 'react-spinkit'

import Card from 'components/Card/Card.jsx';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';


import loading from './loading.svg'
import './products.css'
window.$ = $


class FormAddProduct extends Component {
    constructor(props) {
        super(props);
        this.vForm = this.refs.vForm;
        this.state = {
            isLoading : false,
            type_textError: null,
            type_numberError: null,

            name : '',
            catalog : null,
            price : null,
            quantity : null,
            content : '',
            sizes : [],

            fileImageServer: [],
            fileImage: [],
            type_fileimageError: '',

            fileColorServer : [],
            fileColor : [],
            type_fileColorError: '',
        }
    }

    handleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }

    handleSelectChange = async (data) => {
        await this.setState({
            catalog : data
        })

        console.log(this.state.catalog)
    }

    handleSizeChange = async (sizes, index, id) => {

        var obj = {};
        obj[index] = sizes;
        console.log(sizes, index, id)
        this.state.sizes[index][id] = sizes
        await this.setState({
            sizes : this.state.sizes
        })
       
        console.log(this.state.sizes)
    }

    findImageColor = (id, colors) => {
        for(let item of colors){
            if(id === item.public_id){
                return item.url
            }
        }
    }
    /////////////////// IMAGE //////////////////////////////
    onImageChange = (files) => {
        var { fileImage, type_fileimageError } = this.state;

        if(files.length > fileImage.length){
            const count = files.length - fileImage.length;
            var formData = new FormData();
            for(let i = 1; i<= count; i++){   
                 formData.append(i, files[files.length - i])
            }
             if (!type_fileimageError) {
                this.props.uploadImage(formData, 'image')
            }

        }
    
        this.setState({
            fileImage: files
        })
    }

    removeImage = (file, index) => {
        console.log(file)
        this.refs.imageRef.removeFile(file);

        this.state.fileImageServer.splice(index, 1)
      
        this.setState({
            type_fileimageError: '',
            fileImageServer : this.state.fileImageServer

        })
    }

    onImageError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message);
        this.setState({
            type_fileimageError: error.message

        })
    }

    /////////////////////// color ///////////////////
    onColorChange = (files) => {
        var { fileColor, type_fileColorError } = this.state
        if(files.length > fileColor.length){
            const count = files.length - fileColor.length;
            var formData = new FormData();
            for(let i = 1; i<= count; i++){   
                 formData.append(i, files[files.length - i])
            }
             if (!type_fileColorError) {
                this.props.uploadImage(formData, 'color')
            }

            this.setState({
                isLoading : true
            })
        }else{
            this.setState({
                isLoading: false
            })
        }

        this.setState({
            fileColor: files,
        })
    }

    removeColor =  (file, index) => {
        // xoa file local
        this.refs.colorRef.removeFile(file);

        var { fileColorServer, sizes } =this.state;

        // xoa file server
       this.state.fileColorServer.splice(index, 1)

        this.state.sizes.splice(index,1);
        this.setState({
            sizes : this.state.sizes
        })
           
         this.setState({
            type_fileColorError: '',
            fileColorServer : this.state.fileColorServer,
            isLoadingColor: false
        })

        console.log(this.state)
    }

    onColorError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message);
        this.setState({
            type_fileColorError: error.message,
            isLoadingColor : false
        })
    }
  
    ///////////////// lifeCile //////////////////////
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.images);
        console.log(nextProps.typeE)
        if (nextProps.images.length !== 0 && nextProps.typeE === 'image') {
            // let img = this.state.fileImageServer;
            // img.push(nextProps.images)
            this.setState({
                fileImageServer: [...this.state.fileImageServer, ...nextProps.images]
            })
        }else if(nextProps.images.length !== 0 && nextProps.typeE === 'color'){
            var sizes = [];
            const listSize = this.props.sizes;
            if(listSize.length!==0){
                 for(let item of listSize){
                   sizes.push({
                       label : item.name,
                       value : item.id
                   })
                }
            }
            var imgArr = [];
            for(let img of nextProps.images){
                var id = img.public_id;
                var obj = {};
                obj[id] = [sizes[0], sizes[1]];
                imgArr.push(obj);
            }
            if(!this.state.type_fileColorError){
                this.setState({
                    sizes : [...this.state.sizes, ...imgArr],
                    isLoading : false
                })
            }

            this.setState({
                fileColorServer: [...this.state.fileColorServer, ...nextProps.images]
            })
        }
        
    }

    componentWillUnmount(){
        this.props.resetAllAdd();
    }

    ////// Editor /////////////////
    handleModelChange = model => {
        this.setState({
            content: model
          });
    }


    ///////////////////// SUbmit //////////////////
    onSubmit = (event) => {
        event.preventDefault();
        
        console.log(this.state);
        this.props.addProduct(this.state);
    }

    render() {
        const { fileImageServer, 
            fileColorServer,
         } = this.state;

         const { message } = this.props;
         console.log(this.state.sizes)
         var catalog = [];
         var sizes = [];
         const list = this.props.catalog;
         if(list.length !== 0){
             const listChild = list.filter(item => item.id_parent !== 0)
             for(let item of listChild){
                 catalog.push({
                     label : item.name,
                     value : item.id
                 })
             }
         }
         const listSize = this.props.sizes;
         console.log(listSize)
         if(listSize.length!==0){
              for(let item of listSize){
                sizes.push({
                    label : item.name,
                    value : item.id
                })
             }
         }
        
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

        if(message.statusAddProduct === 1){
            return <Redirect to="/products/list" />
        }else{
                return (
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
                                                <FormGroup controlId="formHorizontalRequiredText">
                                                    <Col componentClass={ControlLabel} sm={2} >
                                                        Danh mục
                                                    </Col>
                                                    <Col sm={10}>
                                                    <Select 
                                                    placeholder="Chọn danh mục"
                                                        name="catalog"
                                                        value={this.state.catalog}
                                                        onChange={this.handleSelectChange}
                                                        options={catalog}
                                                        className="basic-single"
                                                        classNamePrefix="select"
                                                    />
                                                        {this.state.type_textError}
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup controlId="formHorizontalNumber">
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Tên sản phẩm
                                                    </Col>
                                                    <Col sm={10}>
                                                        <FormControl type="text"
                                                        onChange={this.handleChange}
                                                        name="name" />
                                                        {this.state.type_numberError}
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup controlId="formHorizontalNumber">
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Giá
                                                    </Col>
                                                    <Col sm={10}>
                                                        <FormControl type="number"
                                                        onChange={this.handleChange}
                                                        name="price"  />
                                                        {this.state.type_numberError}
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup controlId="formHorizontalNumber">
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Số lượng
                                                    </Col>
                                                    <Col sm={10}>
                                                        <FormControl type="number"
                                                        onChange={this.handleChange}
                                                        name="quantity"  />
                                                        {this.state.type_numberError}
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Hình ảnh sản phẩm
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
                                                                accepts={['image/png', '.jpg', '.jpeg']}
                                                                multiple
                                                                maxFiles={7}
                                                                maxFileSize={10000000}
                                                                minFileSize={0}
                                                                clickable
                                                            >Kéo thả file vào hoặc click để upload
                                                                </Files>
                                                            <div className={classnames('image-products', { 'not-img': this.state.fileImage.length === 0 })}>
                                                        
                                                                {this.state.fileImage.length !== 0 && this.state.fileImage.map((image, index) => {
                                                                    return <div key={image.id} onClick={() => this.removeImage(image, index)}>
                                                                        <img src={image.preview.url} />

                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>


                                                    </Col>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Màu sắc
                                                    </Col>
                                                    <Col sm={10}>
                                                        <div className='files-image'>
                                                            {this.state.type_fileColorError && <small className="text-danger">{this.state.type_fileimageError}</small>}
                                                            <Files
                                                                ref='colorRef'
                                                                name="color"
                                                                className='files-dropzone'
                                                                onChange={this.onColorChange}
                                                                onError={this.onColorError}
                                                                accepts={['image/png', '.jpg', '.jpeg']}
                                                                multiple
                                                                maxFiles={7}
                                                                maxFileSize={10000000}
                                                                minFileSize={0}
                                                                clickable
                                                            >Upload hình ảnh màu sắc
                                                                </Files>
                                                            <div className={classnames('image-products', { 'not-img': this.state.fileColor.length === 0 })}>
                                                                {this.state.fileColor.length !== 0 && this.state.fileColor.map((image, index) => {
                                                                    return <div key={image.id} onClick={() => this.removeColor(image, index)}>
                                                                        <img src={image.preview.url} />

                                                                    </div>
                                                                })}
                                                                
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Kích thước
                                                    </Col>
                                                    <Col sm={10}>
                                                        <div><i style={{fontSize : ".9em", color : "rgb(189, 188, 188)"}}>Upload màu sắc sản phẩm để chọn kích thước</i></div>
                                                        {
                                                        
                                                        this.state.sizes.map((size, index) => {
                                                            return <div className="pick-size-color">
                                                                    
                                                                <div><img alt=""
                                                                            src={this.findImageColor(lodash.keys(size)[0], fileColorServer)}
                                                                        />
                                                                </div>
                                                                {
                                                                    console.log(lodash.values(size)[0])
                                                                }
                                                                <div>
                                                                    <Select 
                                                                            isMulti
                                                                            name="size"
                                                                            defaultValue={[sizes[0], sizes[1]]}
                                                                            value={lodash.values(size)[0]}
                                                                            options={sizes}
                                                                            onChange={value => this.handleSizeChange(value, index,lodash.keys(size)[0] )}
                                                                            className="basic-multi-select"
                                                                            classNamePrefix="select"
                                                                        />
                                                                    </div>
                                                            </div>
                                                        })
                                                        }
                                                        {
                                                            
                                                            this.state.isLoading && <Spinner name="line-scale" color="olive" />
                                                        }
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Col componentClass={ControlLabel} sm={2}>
                                                        Mô tả
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
}

export default FormAddProduct;
