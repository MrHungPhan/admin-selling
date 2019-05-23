import React , { PureComponent  } from "react";
import ListPost from '../../views/Post/ListPost';
import { connect } from 'react-redux';
import * as actions from '../../actions/actionsType'
import { NotificationContainer } from 'react-notifications'

import Alert from '../../components/Alert/Alert'


class ListPostContainer extends PureComponent {
    
    componentDidMount(){
        this.props.getPosts();
    }

    componentWillUnmount(){
        
    }

    render() { 
        const { postsState, messages } = this.props
        console.log(messages)
        return <div>
             <ListPost 
                posts={postsState.posts}
                removePost={this.props.removePost}
        />
        {
         messages.statusAddPost === 1 && <Alert type="success" 
                                                            message={messages.messAddPost}
                                                            resetMessage={this.props.resetMessAddPost}
                                                            />
        }
        {
           messages.messRemovePost && <Alert type="success" 
                                                    message={messages.messRemovePost}
                                                    resetMessage={this.props.resetMessRemovePost}
            />
        }
         <NotificationContainer/>
        </div>;
    }
}


const mapStateToProps = (state) => {
    return {
        postsState : state.posts,
        messages : state.message
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getPosts : () => {
            dispatch(actions.getPosts())
        },

        resetMessAddPost : () => {
            dispatch(actions.resetMessAddPost())
        },

        removePost : (id) => {
            dispatch(actions.removePost(id))
        },

        resetMessRemovePost : () => {
            dispatch(actions.resetMessRemovePost())
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ListPostContainer);