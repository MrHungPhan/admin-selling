import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions/actionsType'

import FormAddPost from '../../views/Post/AddPost'

class FormAddPostContainer extends PureComponent {
    state = {  }
   

    render() { 
        console.log(this.props.message)
        return <FormAddPost
          addPost={this.props.addPost}
          uploadImage={this.props.uploadImage}
          images={this.props.images}
          message={this.props.message}
        />;
    }
}

const mapStateToProps = state => {
    return {
        images : state.posts.images,
        message : state.message
    }
}
 
const mapdispatchToProps = (dispatch, props) => {
    return {
        addPost : (data) => {
            dispatch(actions.addPost(data))
        },
        uploadImage : (data) => {
            dispatch(actions.uploadImagePost(data))
        }
    }
}
export default connect(mapStateToProps, mapdispatchToProps)(FormAddPostContainer);