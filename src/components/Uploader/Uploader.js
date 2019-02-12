import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ImagesActions from "../../actions/images";

class Uploader extends Component {
  state = {
    file: "null",
    hashtags: ""
  };

  onFormSubmit = e => {
    // e.preventDefault();
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

  render() {
    let fileTitle = "Choose File";
    if (this.state.file) {
      fileTitle = this.state.file.name;
    }

    return (
      <div>
        <h1>Image Upload</h1>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <div className="input-group-prepend">
              <button
                onClick={this.onFormSubmit}
                className="btn btn-outline-secondary"
                type="button"
                id="inputGroupFileAddon03"
              >
                Button
              </button>
            </div>
          </div>
          <div className="custom-file">
            <input
              name="image-file"
              type="file"
              className="custom-file-input"
              onChange={this.onChange}
              id="inputGroupFile01"
              aria-describedby="inputGroupFileAddon01"
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              {fileTitle}
            </label>
          </div>
        </div>
        hashtags:
        <div className="input-group mb-3">
          <input
            onChange={this.handleHashtagChange}
            value={this.state.hashtags}
            type="text"
            name="hashtags"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        uploadImage: ImagesActions.uploadImage
      },
      dispatch
    )
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Uploader);
