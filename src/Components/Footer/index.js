import React, { Component } from "react";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <footer className="footer_bottom">
          <div className="container-fluid px-md-5 px-3 py-md-4 py-3">
            <div className="row">
              <div className="col-md-4 col-12">
                <div className="footer_logo">
                  <a href="https://ramlogics.com/Defi_Hertz">
                    <img
                      src="https://defi.hertz-network.com/wp-content/themes/twentytwenty/assets/images/logo-with-rubik-text-2.png"
                      className="rubik_logo"
                      alt=""
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-md-8 col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="footer_menu">
                      <ul className="list-unstyled d-flex">
                        <li className="px-2">
                          <a href="https://t.me/hertznetwork" target="_blank">
                            <span className="icon-hover">
                              <i className="fab fa-telegram-plane"></i>
                            </span>
                            &nbsp; Telegram
                          </a>
                        </li>
                        <li className="px-2">
                          <a
                            href="https://twitter.com/hertz_network"
                            target="_blank"
                          >
                            <span className="icon-hover">
                              <i className="fab fa-twitter"></i>
                            </span>
                            &nbsp; Twitter
                          </a>
                        </li>
                        <li className="px-2">
                          <a
                            href="https://www.facebook.com/groups/hertznetwork"
                            target="_blank"
                          >
                            <span className="icon-hover">
                              <i className="fab fa-facebook"></i>
                            </span>
                            &nbsp; Facebook
                          </a>
                        </li>
                        <li className="px-2">
                          <a
                            href="https://www.youtube.com/HertzNetwork"
                            target="_blank"
                          >
                            <span className="icon-hover">
                              <i className="fab fa-youtube"></i>
                            </span>
                            &nbsp; Youtube
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="footer_menu">
                      <ul className="list-unstyled d-flex">
                        <li className="px-2">
                          <a
                            href="https://www.reddit.com/r/hertznetwork/"
                            target="_blank"
                          >
                            <span className="icon-hover">
                              <i className="fab fa-reddit-alien"></i>
                            </span>
                            &nbsp; Reddit
                          </a>
                        </li>
                        <li className="px-2">
                          <a
                            href="https://www.reddit.com/user/hertznetwork "
                            target="_blank"
                          >
                            <span className="icon-hover">
                              <i className="fab fa-reddit-alien"></i>
                            </span>
                            &nbsp; Reddit User
                          </a>
                        </li>
                        <li className="px-2">
                          <a
                            href="https://hertznetwork.medium.com/"
                            target="_blank"
                          >
                            <span className="icon-hover">
                              <img
                                src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/HTZ-NEW.png"
                                width="15"
                              ></img>
                              &nbsp; Hertznetwork
                            </span>
                          </a>
                        </li>
                        <li className="px-2">
                          <a
                            href="https://bitcointalk.org/index.php?topic=5336221.0"
                            target="_blank"
                          >
                            <span className="icon-hover">
                              <i className="fab fa-bitcoin"></i>
                            </span>
                            &nbsp; Bitcointalk
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-12">
                <div className="copy_area text-center text-white">
                  <h6 className="font-weight-normal pt-4">
                    Copyright 2021 © All rights Reserved.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
