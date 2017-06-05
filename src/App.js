import React, { Component } from 'react';
import logo from './logo.svg';
import './assets/css/main.css';
import ImageItem from './Components/ImageItem';
import { parseString } from 'xml2js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: []
    }
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
        console.log(response)
        parseString(response, (err, response) => {
          if (err) {
            console.log('xml parsing error');
            return;
          }
          else {
            console.log(response);
            debugger;
            that.setState({ cats: response.response.data["0"].images["0"].image })
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
              <li><a href="#footer" className="icon fa-info-circle">About</a></li>
            </ul>
          </nav>
        </header>

        <div id="main">
          {this.state.cats.map((cat, index) => (
            <ImageItem
              key={index}
              src={cat.url[0]}
              source_url={cat.source_url[0]}
            />
          ))}
        </div>

        <footer id="footer" className="panel">
          <div className="inner split">
            <div>
              <section>
                <h2>Magna feugiat sed adipiscing</h2>
                <p>Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum eget quis orci mattis aliquet. Maecenas fringilla et ante at lorem et ipsum. Dolor nulla eu bibendum sapien. Donec non pharetra dui. Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum.</p>
              </section>
              <section>
                <h2>Follow me on ...</h2>
                <ul className="icons">
                  <li><a className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                  <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                  <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                  <li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
                  <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                  <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                </ul>
              </section>
              <p className="copyright">
                &copy; Unttled. Design: <a href="http://html5up.net">HTML5 UP</a>.
								</p>
            </div>
            <div>
              <section>
                <h2>Get in touch</h2>
                <form method="post" action="#">
                  <div className="field half first">
                    <input type="text" name="name" id="name" placeholder="Name" />
                  </div>
                  <div className="field half">
                    <input type="text" name="email" id="email" placeholder="Email" />
                  </div>
                  <div className="field">
                    <textarea name="message" id="message" rows="4" placeholder="Message"></textarea>
                  </div>
                  <ul className="actions">
                    <li><input type="submit" value="Send" className="special" /></li>
                    <li><input type="reset" value="Reset" /></li>
                  </ul>
                </form>
              </section>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
