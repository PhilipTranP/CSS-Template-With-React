import React, { Component } from 'react';
import './assets/css/main.css';
import ImageItem from './Components/ImageItem';
import Footer from './Components/Footer';
import { parseString } from 'xml2js';
import ImageModal from './Components/ImageModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: true,
      images: [],
      showContactPanel: false,
      showImageModal: false
    }
  }
  toggleContactPanel() {
    this.setState({ showContactPanel: !this.state.showContactPanel });
    console.log(this.state.showContactPanel);
  }



  // clicking on an image should ensure the contact panel is closed
  imageClicked(index) {
    if (this.state.showContactPanel) {
      this.toggleContactPanel();
    }
    else {
      this.setState({
        showImageModal: !this.state.showImageModal,
        imageToShow: index
      });
      console.log(this.state.showImageModal);
    }
  }

  closeImageModal() {
    this.setState({ showImageModal: false });
  }

  componentWillMount() {
    let that = this;
    fetch(`http://thecatapi.com/api/images/get?format=xml&results_per_page=20`, {
      method: 'GET',
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        parseString(response, (err, response) => {
          if (err) {
            return;
          }
          else {
            that.setState({
              images: response.response.data["0"].images["0"].image,
              imageToShow: 1,
              showImageModal: true
            });
            return;
          }
        })
      });
  }

  render() {
    return (
      <div id="wrapper">
        <header id="header">
          <h1><a href="index.html"><strong>Multiverse</strong> by HTML5 UP</a></h1>
          <nav>
            <ul>
              <li
                onClick={this.toggleContactPanel.bind(this)}>
                <a href="#footer" className="icon fa-info-circle">
                  About
              </a>
              </li>
            </ul>
          </nav>
        </header>

        <div id="main">
          {
            this.state.images.map((image, index) => (
              <ImageItem
                key={index}
                src={image.url[0]}
                source_url={image.source_url[0]}
                duration={index}
                test={false}
                onClick={this.imageClicked.bind(this, index)}
                blur={this.state.showImageModal}
              />
            ))
          }
        </div>
        <Footer
          show={this.state.showContactPanel}
          close={this.toggleContactPanel.bind(this)}
        />

        <ImageModal
          show={this.state.showImageModal}
          imageToShow={this.state.imageToShow}
          images={this.state.images}
          closeCallback={this.closeImageModal.bind(this)} />

      </div>
    );
  }
}

export default App;
