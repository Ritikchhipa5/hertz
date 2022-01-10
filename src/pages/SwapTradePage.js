import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdWatchLater } from "react-icons/md";
import {
  GetAccount,
  TradeFromTO,
  SetSwap,
  TransferHertzToUser,
  GetsufficientBalance,
  ClaimHertz,
  TranscationStatus,
  SwapCurrency,
  ApproveCondition,
  ApproversCheck,
  SwapClaimHertz,
  HertzSwap,
} from "../Redux/Actions/index";

// map state to props
function mapStateToProps(state) {
  return {
    account: state.account,
    isSwapDisabled: state.isSwapDisabled,
    tradeValue: state.tradeValue,
    htZbalance: state.htZbalance,
    isSufficientBalance: state.isSufficientBalance,
    contract: state.contract,
    isClaimReward: state.isClaimReward,
    isTradeDisabled: state.isTradeDisabled,
    isApproved: state.isApproved,
    TradeSymbol: state.TradeSymbol,
    metamaskBalance: state.metamaskBalance,
    isContractSwap: state.isContractSwap,
    htzSwapContract: state.htzSwapContract,
    htzContract: state.htzContract,
    isClaimRewardVisible: state.isClaimRewardVisible,
    isSwapCurrerncyDisabled: state.isSwapCurrerncyDisabled,
  };
}

// TradePage class start here

class TradePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: this.props.htZbalance,
      transactions: null,
    };
    this.SwapClick = this.SwapClick.bind(this);
    this.tradeValueChange = this.tradeValueChange.bind(this);
    this.claimHertz = this.claimHertz.bind(this);
    this.transcationStatus = this.transcationStatus.bind(this);
  }

  tradeValueChange(e) {
    let string = this.props.htZbalance;
    let balance =
      this.props.TradeSymbol.from === "HTZ"
        ? parseFloat(string.match(/([0-9]+\.[0-9]+)/g, ""))
        : this.props.metamaskBalance;
    console.log(balance);
    // if (this.state.balance >= e.target.value && e.target.value > 0) {
    if (balance >= e.target.value && e.target.value > 0) {
      this.props.TradeFromTO(e.target.value);
      this.props.TradeSymbol.from === "HTZ"
        ? this.props.SetSwap(false)
        : this.props.ApproveCondition(true);
    } else {
      this.props.TradeSymbol.from === "HTZ"
        ? this.props.SetSwap(true)
        : this.props.ApproveCondition(false);
      this.props.TradeFromTO(e.target.value);
    }

    if (balance < e.target.value && e.target.value > 0) {
      this.props.GetsufficientBalance(false);
    } else {
      this.props.GetsufficientBalance(true);
    }
  }

  async transcationStatus() {
    console.log(await this.props.TranscationStatus());

    this.setState({ transactions: await this.props.TranscationStatus() });
  }
  SwapClick() {
    console.log("Done");

    this.props.TransferHertzToUser(
      this.props.account,
      "ramlogicsabh",
      "HTZ",
      this.props.tradeValue
    );
  }

  async claimHertz() {
    console.log(this.props.tradeValue);

    this.props.ClaimHertz(this.props.contract, this.props.tradeValue);
  }
  render() {
    return (
      <>
        <Section>
          <Container>
            <Wrapper>
              {/* //Heading Container */}
              <HeadingWrapper>
                <img
                  src="https://defi.hertz-network.com/wp-content/themes/twentytwenty/assets/images/logo-with-rubik-text-2.png"
                  alt=""
                  width="75%"
                ></img>
                <hr style={{ borderColor: "#26c5eb" }} />
              </HeadingWrapper>

              {/* Main container  */}

              <MainWrapper>
                <RowWrapper>
                  {/* <div data-toggle="modal" data-target="#exampleModalCenter">
                    <div
                      style={{
                        color: "#26c5eb",
                        cursor: "pointer",
                      }}
                    >
                      <IoMdSettings size={25} />
                    </div>
                  </div> */}
                  <div class="col">
                    <div>
                      <h5 style={{ fontWeight: "bold", color: "#26c5eb" }}>
                        HTZ Bridge
                      </h5>
                    </div>
                  </div>
                  <div
                    data-toggle="modal"
                    data-target="#TranscationModalCenter"
                  >
                    <div
                      style={{
                        color: "#6698cd",
                      }}
                    >
                      <MdWatchLater size={25} />
                    </div>
                  </div>
                </RowWrapper>
                <FarmWrapper>
                  <div style={{ display: "flex", fontWeight: "bold" }}>
                    Your Swap
                  </div>
                  <InputContainer>
                    <div>
                      <RowWrapper>
                        <span>From</span>
                        <small></small>
                      </RowWrapper>
                      {this.props.isTradeDisabled ? (
                        <RowInputWrapper>
                          <div
                            style={{
                              display: "flex",
                              maxWidth: "173px",
                              width: "100%",
                            }}
                          >
                            {this.props.tradeValue}
                          </div>
                          <button>
                            {/* <span id="symbolImage1">
                             <img src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/HTZ-NEW.png"></img>
                           </span> */}
                            &nbsp;
                            <span id="currencySymbol1">
                              {this.props.TradeSymbol.from}
                            </span>{" "}
                            &nbsp;
                            {/* <i className="far fa-angle-down"></i> */}
                          </button>
                        </RowInputWrapper>
                      ) : (
                        <RowInputWrapper>
                          <input
                            type="text"
                            id="fromBalance"
                            placeholder="0.0"
                            onChange={(e) => this.tradeValueChange(e)}
                            value={this.props.tradeValue}
                          ></input>
                          <button>
                            {/* <span id="symbolImage1">
                            <img src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/HTZ-NEW.png"></img>
                          </span> */}
                            &nbsp;
                            <span id="currencySymbol1">
                              {this.props.TradeSymbol.from}
                            </span>
                            &nbsp;
                            {/* <i className="far fa-angle-down"></i> */}
                          </button>
                        </RowInputWrapper>
                      )}
                    </div>
                  </InputContainer>

                  {/* Swap icon  */}

                  <div>
                    <div>
                      <FaArrowAltCircleDown
                        size={20}
                        style={{
                          color: "#26c5eb",
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "999px",
                        }}
                        onClick={
                          this.props.isSwapCurrerncyDisabled
                            ? null
                            : () => {
                                this.props.SwapCurrency(
                                  this.props.TradeSymbol.to,
                                  this.props.TradeSymbol.from
                                );
                              }
                        }
                      />
                    </div>
                  </div>

                  {/* Input Container  */}
                  <InputContainer>
                    <div>
                      <RowWrapper>
                        <span>To (estimated)</span>
                        <small></small>
                      </RowWrapper>
                      <RowInputWrapper>
                        <div
                          // type="text"
                          // id="fromBalance"
                          placeholder="0.0"
                          style={{
                            display: "flex",
                            maxWidth: "173px",
                            width: "100%",
                          }}
                        >
                          {this.props.tradeValue}
                        </div>
                        <button>
                          {/* <span id="symbolImage1">
                            <img src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/HTZ-NEW.png"></img>
                          </span> */}
                          &nbsp;
                          <span id="currencySymbol1">
                            {" "}
                            {this.props.TradeSymbol.to}
                          </span>{" "}
                          &nbsp;
                          {/* <i className="far fa-angle-down"></i> */}
                        </button>
                      </RowInputWrapper>
                    </div>
                  </InputContainer>

                  {/* //Fees Container */}
                  {/* <FeesContainer>
                    <div
                      style={{
                        color: "#682a30",
                        fontWeight: "bold",
                        display: this.props.isSufficientBalance
                          ? "none"
                          : "block",
                      }}
                    >
                      Insuficient Balance
                    </div>

                    <div>
                      <div class="d-flex justify-content-between flex-direction-row">
                        <p class="mb-1">Swap Fees</p>
                        <p class="mb-1" id="Fees">
                          0
                        </p>
                      </div>
                      <div class="d-flex justify-content-between flex-direction-row">
                        <p class="mb-1">Price Impact</p>
                        <p class="mb-1" id="tokenPriceImpact">
                          0
                        </p>
                      </div>
                      <div class="d-flex justify-content-between flex-direction-row">
                        <p class="mb-1">Price</p>
                        <p class="mb-1" id="tokenPrice">
                          0
                        </p>
                      </div>
                    </div>
                  </FeesContainer> */}

                  {/* HTZ->BEP20 button */}
                  <SwapButtonWrapper>
                    <div className="swap_tab_04 md-3 py-3">
                      <div
                        className="form_area_btn"
                        style={{ display: "flex" }}
                      >
                        <>
                          {this.props.isSwapDisabled.visible ? (
                            <button
                              className="btn_outline_light w-100"
                              style={{
                                backgroundColor: this.props.isSwapDisabled
                                  .condition
                                  ? "white"
                                  : "#26c5eb",
                                color: this.props.isSwapDisabled.condition
                                  ? "grey"
                                  : "black",
                                fontWeight: "bold",
                                cursor: this.props.isSwapDisabled.condition
                                  ? "default"
                                  : "pointer",
                              }}
                              id="swappingBtn"
                              disabled={this.props.isSwapDisabled.condition}
                              onClick={
                                this.props.isSwapDisabled.condition
                                  ? null
                                  : this.props.isSwapDisabled.SwapSymbol ===
                                    "HTZ"
                                  ? this.SwapClick
                                  : () => alert("Swap is called")
                              }
                            >
                              SWAP
                            </button>
                          ) : null}
                        </>

                        {this.props.isClaimReward ? (
                          <button
                            className="btn_outline_light w-100"
                            style={{
                              backgroundColor:
                                this.props.contract === null
                                  ? "grey"
                                  : "#26c5eb",
                              margin: "0 20px",
                            }}
                            onClick={
                              this.props.contract === null
                                ? null
                                : this.claimHertz
                            }
                          >
                            Claim HTZ-BEP20
                          </button>
                        ) : null}
                      </div>

                      {/* BEP20->HTZ button */}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div>
                          {this.props.isApproved.isVisible ? (
                            <button
                              className="btn_outline_light w-100"
                              style={{
                                backgroundColor: this.props.isApproved.condition
                                  ? "#26c5eb"
                                  : "grey",
                                cursor: this.props.isApproved.condition
                                  ? "pointer"
                                  : "default",
                              }}
                              onClick={
                                // this.props.isApproved.condition
                                true
                                  ? () =>
                                      this.props.ApproversCheck(
                                        this.props.htzContract,
                                        this.props.tradeValue
                                      )
                                  : null
                              }
                            >
                              Approve
                            </button>
                          ) : null}
                        </div>

                        {this.props.isApproved.isApprovedSwap &&
                        this.props.isApproved.isVisible ? (
                          <div>
                            <button
                              className="btn_outline_light w-100"
                              style={{
                                backgroundColor: this.props.isApproved.success
                                  ? "#26c5eb"
                                  : "grye",
                                cursor: this.props.isApproved.success
                                  ? "pointer"
                                  : "default",

                                margin: "0 10px",
                              }}
                              id="swappingBtn"
                              disabled={!this.props.isApproved.success}
                              // onClick={this.SwapClick}
                              onClick={
                                this.props.isApproved.success
                                  ? () =>
                                      this.props.HertzSwap(
                                        this.props.htzSwapContract,
                                        this.props.tradeValue
                                      )
                                  : () => alert("success is failed ")
                              }
                            >
                              SWAP
                            </button>
                          </div>
                        ) : null}

                        {this.props.isApproved.isClaimVisible ? (
                          <div>
                            <button
                              className="btn_outline_light w-100"
                              style={{
                                backgroundColor: this.props.isApproved.isClaim
                                  ? "#26c5eb"
                                  : "grey",
                                cursor: this.props.isApproved.isClaim
                                  ? "pointer"
                                  : "default",
                                marginLeft: "20px",
                              }}
                              id="swappingBtn"
                              disabled={!this.props.isApproved.isClaim}
                              // onClick={this.SwapClick}
                              onClick={
                                this.props.isApproved.isClaim
                                  ? () =>
                                      this.props.SwapClaimHertz(
                                        this.props.account,
                                        this.props.tradeValue
                                      )
                                  : () => alert("success is failed ")
                              }
                            >
                              Claim HTZ
                            </button>
                          </div>
                        ) : null}
                      </div>

                      {/* <button onClick={this.props.TranscationStatus}>
                        Click me{" "}
                      </button> */}
                    </div>
                  </SwapButtonWrapper>
                </FarmWrapper>
              </MainWrapper>
            </Wrapper>
          </Container>
          {/* <SlippingModal /> */}
          <TranscationModal
            transcationStatus={this.transcationStatus}
            transactions={this.state.transactions}
          />
        </Section>
      </>
    );
  }
}

//Slipping modal for setting_modal

// function SlippingModal() {
//   return (
//     <>
//       <div
//         class="modal fade"
//         id="exampleModalCenter"
//         tabindex="-1"
//         role="dialog"
//         aria-labelledby="exampleModalCenterTitle"
//         aria-hidden="true"
//       >
//         <div class="modal-dialog modal-dialog-centered" role="document">
//           <div
//             class="modal-content"
//             style={{
//               background: "#0053ac",
//               padding: "16px 0px",
//               borderRadius: "23px",
//               color: "#fff",
//               letterSpacing: "1px",
//             }}
//           >
//             <div class="modal-header">
//               <h5 class="modal-title" id="exampleModalLongTitle">
//                 Setting
//               </h5>
//               <button
//                 type="button"
//                 class="close"
//                 data-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <i className="fal fa-times-circle text-white"></i>
//               </button>
//             </div>
//             <div class="modal-body">
//               <div class="setting_modal">
//                 {/* <!--<p>Swaps & Liquidity</p>--> */}
//                 <h6>Slippage Tolerance</h6>
//                 <div class="row">
//                   <div class="col">
//                     <div class="setting_modal_area">
//                       <button
//                         type="button"
//                         class="btn btn_Connect_light w-100 slippagePercentage"
//                         data-value="0.1"
//                       >
//                         0.1%
//                       </button>
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="setting_modal_area">
//                       <button
//                         type="button"
//                         class="btn btn_Connect_light w-100 slippagePercentage"
//                         data-value="0.5"
//                       >
//                         0.5%
//                       </button>
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="setting_modal_area">
//                       <button
//                         type="button"
//                         class="btn btn_Connect_light w-100 slippagePercentage"
//                         data-value="1.0"
//                       >
//                         1.0%
//                       </button>
//                     </div>
//                   </div>
//                   <div class="col">
//                     <div class="setting_modal_area d-flex align-items-center">
//                       <input
//                         type="text"
//                         class="form-control text-white w-100"
//                         placeholder="0.10"
//                         id="slippage"
//                       ></input>
//                       <span class="pl-1">%</span>
//                     </div>
//                   </div>
//                 </div>
//                 <p
//                   class="text-danger py-3 font-weight-bold"
//                   id="slippageError"
//                 ></p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

//TranscationModal for check status of transaction

const TranscationModal = (props) => {
  return (
    <>
      <div
        class="modal fade"
        id="TranscationModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="TranscationModalCenterTitle"
        aria-hidden="true"
        onFocus={props.transcationStatus}
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
                All Transactions
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  &times;<i className="fal fa-times-circle text-white"></i>
                </span>
              </button>
            </div>
            <div class="modal-body" style={{ height: "500px" }}>
              <div class=" mt-3 table-responsive" style={{ height: "100%" }}>
                <h5 id="totalSwappingAmount"></h5>
                <Table className="table table-condensed">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount</th>
                      <th>TxnId</th>
                      <th>Balanace</th>
                      <th>Memo</th>
                    </tr>
                  </thead>
                  <tbody id="swappingDetails" style={{ height: "100%" }}>
                    {false ? (
                      <tr>
                        <td colspan="7" class="text-center">
                          Please select pair
                        </td>
                      </tr>
                    ) : (
                      <>
                        {props.transactions === null ? (
                          "Loading"
                        ) : (
                          <>
                            {props.transactions.map((data, key) => (
                              <tr>
                                <td colspan="7" class="text-center" key={key}>
                                  <th>{data.from}</th>
                                  <th>{data.to}</th>
                                  <th>{data.amount}</th>
                                  <th>{data.txid}</th>
                                  <th>{data.balance}</th>
                                  <th>{data.memo}</th>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = styled.div`
  padding: 100px 0 0 0;
  margin: 0 auto;
  min-height: 100vh;
  background-image: url("../images/bg1.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Container = styled.div``;

const Wrapper = styled.div`
  max-width: 400px;
  background: #0053ac;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
`;

const HeadingWrapper = styled.div`
  background: transparent;
  padding: 14px 0;
  margin-bottom: 0 ;
}
`;
const MainWrapper = styled.div``;
const RowWrapper = styled.div`
  display: flex;
`;
const FarmWrapper = styled.div`
  color: #fff;
`;
const InputContainer = styled.div`
  background-color: #033163;
  border-radius: 10px;
  padding: 15px;
  margin: 1rem 0;
  border-radius: 24px;
  input {
    background: transparent;
    border: none;
    outline: none;
    ::placeholder {
      color: #fff;
      font-weight: bold;
    }
  }
  button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
  }
`;
const RowInputWrapper = styled.div`
  display: flex;
  padding: 13px 0.75rem;
  background-color: #fff0;
  border: 1px solid #26c5eb;
  margin-bottom: 1rem;
  justify-content: space-around;
  input {
    color: #fff;
  }
  span {
    color: #fff;
    font-weight: bold;
  }
`;

const FeesContainer = styled.div``;
const SwapButtonWrapper = styled.div``;
const Table = styled.table`
  border: 1px solid #01193247;
  th {
    border: 1px solid #01193247;
    background: #26c5eb !important;
    color: #fff;
  }
`;

const mapDispatchToProps = {
  GetAccount: GetAccount,
  TradeFromTO: TradeFromTO,
  SetSwap: SetSwap,
  GetsufficientBalance: GetsufficientBalance,
  TransferHertzToUser: TransferHertzToUser,
  ClaimHertz: ClaimHertz,
  TranscationStatus: TranscationStatus,
  SwapCurrency: SwapCurrency,
  ApproveCondition: ApproveCondition,
  ApproversCheck: ApproversCheck,
  HertzSwap: HertzSwap,
  SwapClaimHertz: SwapClaimHertz,
};
export default connect(mapStateToProps, mapDispatchToProps)(TradePage);
