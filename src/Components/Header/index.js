import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { _2FAuthenticationModal } from "./_2FAuthenticationModal";
import { HertzModal } from "./HertzModal";
import { connect } from "react-redux";

import {
  SetContract,
  GetLoginDetails,
  TwoFactorAuthentication,
  is2FAvisableChanged,
} from "../../Redux/Actions";

function mapStateToProps(state) {
  return {
    account: state.account,
    htZbalance: state.htZbalance,
    is2FAvisable: state.is2FAvisable,
    contract: state.contract,
    metamaskBalance: state.metamaskBalance,
  };
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      _2FAcode: null,
      is2FAvisableChanged: false,
      hertzValue: {
        balance: 0,
      },
    };

    this.usernameChanged = this.usernameChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.Login = this.Login.bind(this);
    this.is2FAvisableChanged = this.is2FAvisableChanged.bind(this);
    this.CodeChange = this.CodeChange.bind(this);
  }

  //Two factor Aucthetication Code
  CodeChange(e) {
    this.setState({ _2FAcode: e.target.value });
  }

  //Change State of 2FA visable
  is2FAvisableChanged() {
    window.$("#HertzModalCenter").modal("hide");
    window.$("#ConnectModal").modal("hide");
    window.$(".modal-backdrop").remove();
  }

  //Password Change
  usernameChanged(e) {
    this.setState({ username: e.target.value });
  }

  //Password Change
  passwordChanged(e) {
    this.setState({ password: e.target.value });
  }

  //Login button
  async Login() {
    // {
    //   username: "ritik.chhipa@ramlogics.com",
    //   password: "Rit@9001586400",
    // }
    // = await this.getLoginResponse();
    await this.props.GetLoginDetails(this.state.username, this.state.password);
    // if (Value.error !== "User not found") {
    //   this.setState({ is2FAvisable: true, username: "", password: "" });
    // } else {
    //   document.getElementById("usernotfound").innerHTML = "User not found";
    //   document.getElementById("usernotfound").style.color = "red";
    //   this.setState({ username: "", password: "", code: null });
    // }
  }

  //Call Get Login Response API
  // async getLoginResponse(username, password) {
  //   let _data;
  //   await fetch("https://api.hertz-network.com" + "/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       localStorage.setItem("TOKEN_AUTH", data.token);
  //       _data = data;
  //     })
  //     .catch((error) => console.log(error));
  //   return _data;
  // }

  render() {
    return (
      <>
        <div
          className="section_bar sticky-top"
          style={{ backgroundColor: "#002853" }}
        >
          <div
            className="container-fluid px-md-2"
            style={{ overflowX: "hidden" }}
          >
            <div className="row">
              <div className="col-md-12 col-12">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <a
                    className="navbar-brand"
                    href="https://defi.hertz-network.com"
                  >
                    <img
                      src="https://defi.hertz-network.com/wp-content/themes/twentytwenty/assets/images/logo-with-rubik-text-2.png"
                      className="rubik_logo"
                      alt=""
                    ></img>
                  </a>
                  <button
                    className="navbar-toggler "
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul
                      className="navbar-nav mr-auto"
                      style={{ textAlign: "left" }}
                    >
                      <li className="nav-item active d-none">
                        <NavLink className="nav-link" to="/">
                          Home <span className="sr-only">(current)</span>
                        </NavLink>
                      </li>
                      <li className="nav-item d-none">
                        <a className="nav-link" href="#">
                          Swap
                        </a>
                      </li>

                      <li className="nav-item">
                        <NavLink className="nav-link " to="/">
                          Bridge
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link "
                          style={{ color: "#fff" }}
                          target="_blank"
                          href="https://ramlogics.com/Defi_Hertz/farm.html"
                        >
                          Trade
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          target="_blank"
                          style={{ color: "#fff" }}
                          href="https://ramlogics.com/Defi_Hertz/liquidity.html"
                        >
                          Liquidity
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          style={{ color: "#fff" }}
                          target="_blank"
                          href="https://ramlogics.com/Defi_Hertz/farm.html"
                        >
                          Farms
                        </a>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          style={{ color: "#fff" }}
                          to="/info"
                        >
                          Info
                        </NavLink>
                      </li>

                      <li className="nav-item d-none">
                        <a className="nav-link" href="#">
                          Bridge
                        </a>
                      </li>
                    </ul>
                    <div className="form-inline my-2 pl-md-3 pl-0">
                      <div className="haertxwallets d-flex align-items-center">
                        <div className="network_type_area">
                          <div
                            className={`mx-2 ${
                              this.props.htZbalance === 0
                                ? "text-danger"
                                : "text-success"
                            }`}
                            id="hertzAccount"
                          >
                            <span>Hertz</span> &nbsp;
                            <i className="fal fa-wallet"></i>
                            {this.props.htZbalance}
                          </div>
                        </div>
                        <div className="show_balance_area">
                          <div className="mx-2 text-white">
                            <span id="hertzBalance">Balance</span>
                          </div>
                        </div>
                        <div className="mx-2 bh65cx">
                          {/* <span id="walletAddress"> No Wallet Connect</span> */}
                          <span id="walletAddress">
                            {this.props.account === ""
                              ? "Username"
                              : this.props.account}
                          </span>
                        </div>
                      </div>

                      <div className="two_btn_area">
                        <div className={`BNB_0 mx-2 text-danger`}>
                          <div
                            className={` ${
                              this.props.metamaskBalance === 0
                                ? "text-danger"
                                : "text-success"
                            }`}
                            id="ethNetwork"
                          >
                            <span id="showNetworkType">HTZ-BEP20</span>&nbsp;
                            <i className="fal fa-wallet"></i>
                          </div>
                        </div>
                        <div className="BNB_0 mx-2">
                          <span id="showBalance">
                            {this.props.metamaskBalance}
                          </span>
                        </div>
                        <div className="mx-2 bh65cx">
                          {/* <span id="walletAddress"> No Wallet Connect</span> */}

                          <span id="walletAddress">
                            {this.props.contract === null
                              ? "Address"
                              : this.props.contract.address}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        id="btn-connect"
                        className="btn btn_Connect_light mx-2"
                        data-toggle="modal"
                        data-target="#ConnectModal"
                        onClick={() => window.$("#ConnectModal").modal("show")}
                      >
                        Connect to a wallet
                      </button>
                      <button
                        className="btn btn_Connect_light mx-2"
                        id="btn-disconnect"
                        onclick="onDisconnect()"
                        style={{ display: "none" }}
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <ConnectModal SetContract={this.props.SetContract} />
        <HertzModal
          usernameChanged={this.usernameChanged}
          passwordChanged={this.passwordChanged}
          login={this.Login}
          is2FAvisable={this.props.is2FAvisable}
          is2FAvisableChanged={this.props.is2FAvisableChanged}
          CodeChange={this.CodeChange}
          code={this.state._2FAcode}
          TwoFactorAuthentication={this.props.TwoFactorAuthentication}
        />
      </>
    );
  }
}

//Connect Modal funcation
function ConnectModal(props) {
  return (
    <>
      <div
        class="modal fade"
        id="ConnectModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ConnectModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div
            class="modal-content"
            style={{
              background: "#0053ac",
              padding: "16px 0px",
              borderRadius: "23px",
              color: "#fff",
              letterSpacing: "1px",
            }}
          >
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Connect wallet
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="py-2">
                <HButton
                  type="button"
                  data-toggle="modal"
                  data-target="#HertzModalCenter"
                >
                  <span>Hertz Network</span>
                  <span class="d-grid">
                    <img
                      src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/HTZ-ERC-20-NEW.png"
                      class=""
                      alt="eth.png"
                      style={{ width: "32px" }}
                    ></img>
                  </span>
                </HButton>
              </div>
              <div class="py-2">
                <HButton
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModalCenterLonin"
                  onClick={props.SetContract}
                  data-dismiss="modal"
                >
                  <span>MetaMask</span>
                  <span class="d-grid">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/metamask.png"
                      }
                      class=""
                      alt="eth.png"
                      style={{ width: "32px" }}
                    ></img>
                  </span>
                </HButton>
              </div>
              <div class="py-2">
                <HButton
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModalCenterLonin"
                >
                  <span>Wallet Connect</span>
                  <span class="d-grid">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/walletconnect.png"
                      }
                      alt="eth.png"
                      style={{ width: "32px", borderRadius: "999px" }}
                    ></img>
                  </span>
                </HButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// HertzModal function
// const HertzModal = (props) => {
//   return (
//     <div
//       class="modal fade"
//       id="HertzModalCenter"
//       tabindex="-1"
//       role="dialog"
//       aria-labelledby="HertzModalCenter"
//       aria-hidden="true"
//     >
//       <div class="modal-dialog modal-dialog-centered" role="document">
//         <div
//           class="modal-content"
//           style={{
//             background: "#032b5b",
//             padding: "16px",
//             borderRadius: "23px",
//             color: "#fff",
//             letterSpacing: "1px",
//           }}
//         >
//           <div class="modal-header">
//             <h5 class="modal-title" id="exampleModalLongTitle">
//               {props.is2FAvisable ? "2FA Confirmation" : "Login"}
//             </h5>

//             <button type="button" data-dismiss="modal" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div>
//             {props.is2FAvisable ? (
//               <_2FAuthenticationModal
//                 is2FAvisableChanged={props.is2FAvisableChanged}
//                 CodeChange={props.CodeChange}
//                 code={props.code}
//                 TwoFactorAuthentication={props.TwoFactorAuthentication}
//               />
//             ) : (
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "100%",
//                   flexDirection: "column",
//                 }}
//               >
//                 <img src="https://hertz-network.com/wp-content/uploads/elementor/thumbs/HTZ-logo-only-blue-white-p4p2ldidtq3ndb8678kf2snlwefybhkycazbj9e3gk.png"></img>
//                 <h2
//                   style={{
//                     color: "white",
//                     fontSize: "26px",
//                     fontWeight: "500",
//                   }}
//                 >
//                   Login
//                 </h2>
//                 <input
//                   placeholder="Username"
//                   onChange={(e) => props.usernameChanged(e)}
//                   style={{
//                     borderRadius: " 6px",
//                     border: "1px solid #26c5ebc9",
//                     width: "280px",
//                     height: " 30px",
//                     marginBottom: "15px",
//                     padding: "0px 0px 0px 10px",
//                     color: "#000",
//                     fontFamily: '"Rubik", sans-serif',
//                   }}
//                 ></input>
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   onChange={(e) => props.passwordChanged(e)}
//                   style={{
//                     borderRadius: " 6px",
//                     border: "1px solid #26c5ebc9",
//                     width: "280px",
//                     height: " 30px",
//                     marginBottom: "15px",
//                     padding: "0px 0px 0px 10px",
//                     color: "#000",
//                     fontFamily: '"Rubik", sans-serif',
//                   }}
//                 ></input>
//                 <div
//                   style={{
//                     display: "flex",
//                     margin: "10px 0px 0px",
//                     width: "290px",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <button
//                     onClick={props.login}
//                     style={{
//                       backgroundColor: "#1ea2c1",
//                       border: "none",
//                       borderRadius: "6px",
//                       width: "45%",
//                       color: "white",
//                       height: "30px",
//                       margin: " 0px 0px",
//                       fontFamily: "'Rubik', sans-serif",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Login
//                   </button>
//                   <button
//                     style={{
//                       backgroundColor: "#1ea2c1",
//                       border: "none",
//                       borderRadius: "6px",
//                       width: "45%",
//                       color: "white",
//                       height: "30px",
//                       margin: " 0px 0px",
//                       fontFamily: "'Rubik', sans-serif",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Register
//                   </button>
//                 </div>
//                 <div style={{ color: "white", margin: "15px 0px 0px" }}>
//                   &nbsp;
//                 </div>
//                 <div id="usernotfound"></div>
//                 <div
//                   style={{
//                     textDecoration: "underline",
//                     color: "white",
//                     marginTop: "10px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Forgot your password?
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Two factor Authentication function
// const _2FAuthenticationModal = (props) => {
//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100%",
//           flexDirection: "column",
//           padding: "10px",
//         }}
//       >
//         <img src="https://hertz-network.com/wp-content/uploads/elementor/thumbs/HTZ-logo-only-blue-white-p4p2ldidtq3ndb8678kf2snlwefybhkycazbj9e3gk.png"></img>
//         <h2
//           style={{
//             color: "white",
//             fontSize: "26px",
//             fontWeight: "500",
//             padding: "10px",
//           }}
//         >
//           2FA Confirmation
//         </h2>
//         <input
//           placeholder="2FA Code"
//           style={{
//             borderRadius: "6px",
//             border: "1px solid #26c5ebc9",
//             width: "300px",
//             height: " 30px",
//             marginBottom: "15px",
//             padding: "0px 0px 0px 20px",
//             color: "#000",
//             fontFamily: '"Rubik", sans-serif',
//           }}
//           onChange={(e) => props.CodeChange(e)}
//         ></input>
//         <div
//           style={{
//             display: "flex",
//             margin: "10px 0px 0px",
//             width: "290px",
//             justifyContent: "space-between",
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: "#1ea2c1",
//               border: "none",
//               borderRadius: "6px",
//               width: "45%",
//               color: "white",
//               height: "30px",
//               margin: " 0px 0px",
//               fontFamily: "'Rubik', sans-serif",
//               cursor: "pointer",
//             }}
//             onClick={async () => {
//               props.TwoFactorAuthentication(props.code);
//             }}
//           >
//             Confirm
//           </button>
//           <button
//             style={{
//               backgroundColor: "#1ea2c1",
//               border: "none",
//               borderRadius: "6px",
//               width: "45%",
//               color: "white",
//               height: "30px",
//               margin: " 0px 0px",
//               fontFamily: "'Rubik', sans-serif",
//               cursor: "pointer",
//             }}
//             onClick={props.is2FAvisableChanged}
//           >
//             Cancel
//           </button>
//         </div>
//         <div style={{ margin: "15px 0px 0px", color: "white" }}></div>
//       </div>
//     </>
//   );
// };

// styled componets Section
const HButton = styled.button`
  width: 100%;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  transition: 0.5s;
  border: none;
  font-weight: bold;
`;
const NavLink = styled(Link)`
  color: #fff !important;
  :hover {
    color: #26c5eb !important;
  }
`;
const mapDispatchToProps = {
  SetContract: SetContract,
  GetLoginDetails: GetLoginDetails,
  TwoFactorAuthentication: TwoFactorAuthentication,
  is2FAvisableChanged: is2FAvisableChanged,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);

// ritik.chhipa@ramlogics.com
// Rit@9001586400
