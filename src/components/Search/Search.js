import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ImagesActions from "../../actions/images";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: ""
  };

  componentDidMount() {
    this.props.actions.getAllImages();
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchImages = () => {
    this.props.actions.getImagesByHashtag(this.state.searchValue);
  };
  render() {
    const myImages = this.props.images.map(image => {
      return (
        <div key={image._id} className="card col-4 mt-3">
          <img className="card-img-top" src={image.path} alt="Card cap" />
        </div>
      );
    });

    return (
      <div>
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              value={this.state.searchValue}
              onChange={this.handleInputChange}
              name="searchValue"
              className="form-control"
              placeholder="Search For Hashtag"
              aria-label="Search For Hashtag"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                onClick={this.searchImages}
                className="btn btn-outline-secondary"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row">{myImages}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.images.images || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getAllImages: ImagesActions.getAllImages,
        getImagesByHashtag: ImagesActions.getImagesByHashtag
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Search, axios));
