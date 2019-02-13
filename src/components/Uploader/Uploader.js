import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ImagesActions from "../../actions/images";
import Modal from "../UI/Modal/Modal";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      hashtags: ""
    };
  }

  componentDidMount() {
    this.props.actions.uploadImageInit();
  }

  onFormSubmit = e => {
    let hashtagString = this.state.hashtags;
    hashtagString = hashtagString.replace(/\s/g, "");
    if (hashtagString.charAt(0) === "#") {
      hashtagString = hashtagString.substr(1);
    }
    let hashtagArray = hashtagString.split("#");
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    formData.append("hashtags", hashtagArray);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    this.props.actions.uploadImage(formData, config);
  };

  onChange = e => {
    if (!e.target.files[0]) {
      this.setState({
        file: null
      });
    } else {
      this.setState({ file: e.target.files[0] });
    }
  };

  handleHashtagChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  closeUpload = () => {
    this.setState({ showModal: false });
    setTimeout(() => {
      this.props.history.push("/search");
    }, 500);
  };

  render() {
    let fileTitle = "Choose File";
    if (this.state.file) {
      fileTitle = this.state.file.name;
    }

    return (
      <div>
        <h1 className="display-4 text-center">Image Upload</h1>
        <div className="mx-auto">
          <div className="input-group mt-5">
            <div className="input-group-prepend">
              <div className="input-group-prepend">
                <button
                  disabled={this.state.file === null ? true : false}
                  onClick={this.onFormSubmit}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="inputGroupFileAddon03"
                >
                  UPLOAD
                </button>
              </div>
            </div>
            <div className="custom-file">
              <input
                name="image-file"
                type="file"
                className="darker_border custom-file-input"
                onChange={this.onChange}
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
              <label
                className="darker_border custom-file-label"
                htmlFor="inputGroupFile01"
              >
                {fileTitle}
              </label>
            </div>
          </div>
          <p className="mb-0 mt-3">
            Enter Hashtags that describe your pic in the best way
          </p>
          <div className="input-group mb-3">
            <input
              disabled={this.state.file === null ? true : false}
              style={{ borderRadius: "0.8rem" }}
              onChange={this.handleHashtagChange}
              value={this.state.hashtags}
              type="text"
              name="hashtags"
              className="darker_border form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder=""
            />
          </div>
          <Modal show={this.props.isSuccess}>
            <p>Image Uploaded Sucsessfully!</p>
            <button onClick={this.closeUpload}>CLOSE</button>
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSuccess: state.images.uploadImage.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        uploadImage: ImagesActions.uploadImage,
        uploadImageInit: ImagesActions.uploadImageInit
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Uploader, axios));
