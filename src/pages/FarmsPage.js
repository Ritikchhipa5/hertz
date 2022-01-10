import React, { Component } from "react";

export default class FramsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {/* Main Funciton of FARM  */}
        <main class="all_section_main_div">
          <section class="farms_main_div">
            <div class="container">
              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="farm_heading py-lg-3 py-md-3 py-sm-3 py-3">
                    <div class="index_logo">
                      <a
                        class="navbar-brand"
                        href="https://defi.hertz-network.com"
                      >
                        <img
                          src="https://defi.hertz-network.com/wp-content/themes/twentytwenty/assets/images/logo-with-rubik-text-2.png"
                          class="w-25"
                          alt=""
                        ></img>
                      </a>
                    </div>
                    <h2 class="font-weight-normal">Farms</h2>

                    <div id="qrcode"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="frams_tab_le">
            <div class="container-fluid px-md-5 px-3">
              <div class="row">
                <div class="col-md-12" id="allAvailableFarms"></div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}
