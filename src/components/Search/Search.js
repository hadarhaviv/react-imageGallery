import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ImagesActions from "../../actions/images";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import "./Search.css";

class Search extends Component {
  state = {
    searchValue: "",
    timer: null
  };

  componentDidMount() {
    this.props.actions.getAllImages();
  }

  handleInputChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.searchImages();
      }
    );
  };

  searchImages = () => {
    if (
      !(
        this.state.searchValue.length === 1 &&
        this.state.searchValue.charAt(0) === "#"
      )
    ) {
      let searchStr = this.state.searchValue.replace(/#/g, "");
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.actions.getImagesByHashtag(searchStr);
      }, 500);
    }
  };

  render() {
    const myImages = this.props.images.map(image => {
      return (
        <div key={image._id} className="darker_border card col-4 m-3">
          {image.hashtags.map(hashtag => {
            return (
              <span key={`${image._id}_${hashtag}`} className="hashtag">
                #{hashtag}
              </span>
            );
          })}
          <img className="card-img-top" src={image.path} alt="Card cap" />
        </div>
      );
    });

    return (
      <div>
        <h1 className="display-4 text-center">My Gallery</h1>
        <div>
          <div className="input-group mb-3 mt-5">
            <input
              style={{ borderRadius: "0.8rem" }}
              type="text"
              value={this.state.searchValue}
              onChange={this.handleInputChange}
              name="searchValue"
              className="darker_border form-control"
              placeholder="Search For Hashtag"
              aria-label="Search For Hashtag"
              aria-describedby="basic-addon2"
            />
          </div>
        </div>
        <div className="row d-flex justify-content-between">{myImages}</div>
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
