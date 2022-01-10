/* eslint-disable no-loop-func */
import $ from "jquery";
import swal from "sweetalert";
import {
  serverApi,
  connectedAccount,
  connectedNetwork,
  getCurrentUser,
  getHertzUserDetails,
} from "./allFunction";

export const showAllFarmPlans = () => {
  let html = "";
  let i = 0;
  getListOfAllFarmsPlan()
    .then((allFarmsPlans) => {
      for (let i = 0; i < allFarmsPlans.plan.length; i++) {
        html += `
                <div class="maintab table-responsive">
                    <table class="table table-condensed maintable" style="border-collapse: collapse;">
                        <tbody >
                            <tr class="accordion-toggle" >
                                <th style="text-align: left;" data-toggle="collapse" data-target="#demo${i}" id="showAllPlanList${i}" onclick='showAllPlanList("${
          allFarmsPlans.plan[i]
        }","${allFarmsPlans.multiplier[i]}","${allFarmsPlans.time[i]}","${i}")'>
                                    <div class="img pl-3 d-flex align-items-center">
                                        <img src="https://ramlogics.com/Defi_Hertz/wp-content/themes/twentytwenty/assets/images/htz-old.png" class="geeks" width="36" /> &nbsp; &nbsp;
                                        <h5 class="font-weight-bold">${allFarmsPlans.plan[
                                          i
                                        ].toUpperCase()}</h5> &nbsp; &nbsp; &nbsp; <span> <i class="fas fa-chevron-down vert-move"></i> </span>
                                    </div>
                                </th>
                                <th>
                                    <div class="d-flex box-2">
                                        <div class="col search_tabs">
                                            <h6 class="font-weight-normal float-right mb-0">Search</h6> 
                                        </div>
                                        <div class="col-4" id="">
                                            <input class="fnlkj_width" type="text" id="myInput${i}" onkeyup="myFunction('${i}')" placeholder="Search farm" title="Seach farm">
                                        </div> 
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <td colspan="6" class="hiddenRow">
                                    <div class="accordian-body collapse" id="demo${i}">
                                        <div class="tab-content" id="myTabContent2">
                                            <div class="tab-pane fade show active" id="home2" role="tabpanel" aria-labelledby="home-tab">
                                                <div class="card card-body">
                                                    <div class="table_view_plan w-100">
                                                        <table class="table table-condensed maintable table-hover" style="background-color: #fff0;" id="farmTable${i}">
                                                            <thead>
                                                                <tr>
                                                                    <th><span class="font-weight-normal">Farms</span></th>
                                                                    <th><span class="font-weight-normal">Multiplier</span></th>
                                                                    <th><span class="font-weight-normal">Time</span></th>
                                                                    <th><span class="font-weight-normal">Amount</span></th>
                                                                    <th><span class="font-weight-normal">Invest</span></th>
                                                                    <th><span class="font-weight-normal">Withdrawal</span></th>
                                                                    <th><span class="font-weight-normal">Invest</span></th>
                                                                    <th><span class="font-weight-normal">Time</span></th>
                                                                    <th><span class="font-weight-normal">Profit</span></th>
                                                                    <th><span class="font-weight-normal">Reward</span></th>
                                                                    <th><span class="font-weight-normal">Total Liquidity</span></th>
                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody id="showAllPlans${i}">

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>            
            `;
      }
      $("#allAvailableFarms").append(html);
    })
    .catch((err) => console.log(err));
};

// GET LIST OF ALL LIST FUNCTION
export default async function getListOfAllFarmsPlan() {
  return new Promise(async (resolve, reject) => {
    let fetchURL = await fetch(`${serverApi.apiHost}/get-all-farm-plans`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let response = await fetchURL.json();
    console.log(response.result);
    if (response.code === 1) {
      resolve(response.result);
    } else if (response.code === 0) {
      reject(response.result);
    }
  });
}

// SHOW PLAN LIST WITH USER DETAILS MAIN FUNCTION
window.showAllPlanList = function showAllPlanList(
  planName,
  multiplier,
  time,
  i
) {
  let html = "";
  let j = 0;
  let hertzAccount = $("#account").val();
  console.log(hertzAccount);

  if (
    hertzAccount != (null || "" || undefined) &&
    connectedAccount != (null || "" || undefined)
  ) {
    getLiquidityPairsOnFarms()
      .then((pairResult) => {
        console.log(pairResult[0].address_type_2);
        for (let j = 0; j < pairResult.length; j++) {
          let symbol1 = pairResult[j].pair_symbols.split("_")[0];
          let symbol2 = pairResult[j].pair_symbols.split("_")[1];
          let addressType1 = pairResult[j].address_type_1;
          let addressType2 = pairResult[j].address_type_2;

          let addressType = `${addressType1}_${addressType2}`;
          let pair = `${symbol1}_${symbol2}`;
          // etherirum

          if (connectedNetwork == 97 || connectedNetwork == 56) {
            if (addressType !== "ethereum" && addressType !== "ether") {
              if (addressType === "binance_hertz") {
                let t = 0;
                getCurrentUser()
                  .then((currentUserAddress) => {
                    getHertzUserDetails()
                      .then((hertzUserDetails) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          currentUserAddress,
                          hertzUserDetails.userHertzAddress
                        )
                          .then((farmedResults) => {
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                                <tr>
                                                    <td>
                                                        <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span>${multiplier} X</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="total_$doller"><span>${time} days</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${pair}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px;">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${pair}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                    </td>                                        
                                                    <td>
                                                        <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                    </td>                                        
                                                                                            
                                                </tr>
                                                `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                                <tr>
                                                    <td>
                                                        <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div> 
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span>${multiplier} X</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="total_$doller"><span>${time} days</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                    </td>                                        
                                                    <td>
                                                        <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                    </td>                                        
                                                                                            
                                                </tr>
                                                `;
                            } else {
                              html += `
                                                <tr>
                                                    <td>
                                                        <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div> 
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span>${multiplier} X</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="total_$doller"><span>${time} days</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                                                            
                                                </tr>
                                                `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "hertz_binance") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails) => {
                    getCurrentUser()
                      .then((currentUserAddress) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          hertzUserDetails.userHertzAddress,
                          currentUserAddress
                        )
                          .then((farmedResults) => {
                            console.log(farmedResults);
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>                                       
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>                                        
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>                                        
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                                            
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                                                   
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "hertz_hertz") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails1) => {
                    getHertzUserDetails()
                      .then((hertzUserDetails2) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          hertzUserDetails1.userHertzAddress,
                          hertzUserDetails2.userHertzAddress
                        )
                          .then((farmedResults) => {
                            console.log(farmedResults);

                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails1.userHertzAddress
                              }', '${
                                hertzUserDetails2.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                    
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                                     
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails1.userHertzAddress
                              }', '${
                                hertzUserDetails2.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                    
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                                     
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                                                    
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "binance-coin_hertz") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails) => {
                    getCurrentUser()
                      .then((currentUserAddress) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          currentUserAddress,
                          hertzUserDetails.userHertzAddress
                        )
                          .then((farmedResults) => {
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                               
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span><span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span><span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                    
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span><span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                     
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "hertz_binance-coin") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails) => {
                    getCurrentUser()
                      .then((currentUserAddress) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          hertzUserDetails.userHertzAddress,
                          currentUserAddress
                        )
                          .then((farmedResults) => {
                            console.log(farmedResults);
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${pair}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${pair}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                   
                                                                                    
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              }
            }
          }
          // binance
          if (connectedNetwork == 3 || connectedNetwork == 1) {
            if (addressType !== "binance-coin" && addressType !== "binance") {
              if (addressType === "ethereum_hertz") {
                let t = 0;

                getCurrentUser()
                  .then((currentUserAddress) => {
                    getHertzUserDetails()
                      .then((hertzUserDetails) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          currentUserAddress,
                          hertzUserDetails.userHertzAddress
                        )
                          .then((farmedResults) => {
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                                <tr>
                                                    <td>
                                                        <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span>${multiplier} X</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="total_$doller"><span>${time} days</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${pair}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px;">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${pair}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                    </td>                                        
                                                    <td>
                                                        <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                    </td>                                        
                                                                                            
                                                </tr>
                                                `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                                <tr>
                                                    <td>
                                                        <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div> 
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span>${multiplier} X</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="total_$doller"><span>${time} days</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                    </td>                                        
                                                    <td>
                                                        <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                    </td>                                        
                                                                                            
                                                </tr>
                                                `;
                            } else {
                              html += `
                                                <tr>
                                                    <td>
                                                        <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div> 
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span>${multiplier} X</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="total_$doller"><span>${time} days</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                            <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                    </td>
                                                    <td>
                                                        <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                    </td>
                                                                                            
                                                </tr>
                                                `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "hertz_ethereum") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails) => {
                    getCurrentUser()
                      .then((currentUserAddress) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          hertzUserDetails.userHertzAddress,
                          currentUserAddress
                        )
                          .then((farmedResults) => {
                            console.log(farmedResults);
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>                                       
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>                                        
                                                        <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>                                        
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                                            
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                                                   
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "hertz_hertz") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails1) => {
                    getHertzUserDetails()
                      .then((hertzUserDetails2) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          hertzUserDetails1.userHertzAddress,
                          hertzUserDetails2.userHertzAddress
                        )
                          .then((farmedResults) => {
                            console.log(farmedResults);

                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails1.userHertzAddress
                              }', '${
                                hertzUserDetails2.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                    
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                                     
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails1.userHertzAddress
                              }', '${
                                hertzUserDetails2.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                    
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                                     
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                                                    
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "ether_hertz") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails) => {
                    getCurrentUser()
                      .then((currentUserAddress) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          currentUserAddress,
                          hertzUserDetails.userHertzAddress
                        )
                          .then((farmedResults) => {
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>                               
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span><span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${currentUserAddress}', '${
                                hertzUserDetails.userHertzAddress
                              }')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span><span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                    
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span><span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                     
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else if (addressType === "hertz_ether") {
                let t = 0;

                getHertzUserDetails()
                  .then((hertzUserDetails) => {
                    getCurrentUser()
                      .then((currentUserAddress) => {
                        getUserAllFarms(
                          planName,
                          pair,
                          hertzUserDetails.userHertzAddress,
                          currentUserAddress
                        )
                          .then((farmedResults) => {
                            console.log(farmedResults);
                            if (
                              farmedResults.activeFarmResult.activeFarmResult1
                                .length > 0 &&
                              farmedResults.activeFarmResult.activeFarmResult2
                                .length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.activeFarmResult.deadline
                              );

                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.activeFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.activeFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.activeFarmResult.profitPercentage
                              }%</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.activeFarmResult.rewardAmount1
                              } </span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else if (
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult1.length > 0 &&
                              farmedResults.inActiveFarmResult
                                .inActiveFarmResult2.length > 0
                            ) {
                              t = getTimeRemaining(
                                farmedResults.inActiveFarmResult.deadline
                              );
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${pair}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${pair}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" onclick="withdrawUserFarm('${planName}','${pair}','${addressType}','${
                                hertzUserDetails.userHertzAddress
                              }', '${currentUserAddress}')">harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">${
                                farmedResults.inActiveFarmResult.amount1
                              } ${symbol1.toUpperCase()} <br> ${
                                farmedResults.inActiveFarmResult.amount2
                              } ${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}"> ${
                                t.days < 0 ? "0" : t.days
                              }  days ${
                                t.hours < 0 ? "0" : t.hours
                              } : hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">${
                                farmedResults.inActiveFarmResult
                                  .profitPercentage
                              }%</span></div>
                                                </td>                                    
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> ${
                                farmedResults.inActiveFarmResult.rewardAmount1
                              } </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                    
                                                                                   
                                            </tr>
                                            `;
                            } else {
                              html += `
                                            <tr>
                                                <td>
                                                    <div class="20_plan_area d-flex">
                                                        <div class="d-flex">
                                                            <div class="col-auto p-0">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_1
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                            <div class="col-auto pr-1">
                                                                <img src="${
                                                                  pairResult[j]
                                                                    .token_image_2
                                                                }" width="30" class="token_img_ss">
                                                            </div>
                                                        </div>  
                                                    <span class="text_skyblue">${symbol1.toUpperCase()}<br>${symbol2.toUpperCase()}</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span>${multiplier} X</span></div>
                                                </td>
                                                <td>
                                                    <div class="total_$doller"><span>${time} days</span></div>
                                                </td>
                                                <td>
                                                    <div class="day_90day d-flex align-items-center justify-content-center flex-column">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmFirstAmountUpdate('${symbol1}_${symbol2}','${j}${i}')" id="first_farm_Amt${j}${i}" placeholder="Enter ${symbol1.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <input type="number" class="form-control farms_place" onkeyup="farmSecondAmountUpdate('${symbol2}_${symbol1}','${j}${i}')" id="second_farm_Amt${j}${i}" placeholder="Enter ${symbol2.toUpperCase()} Amount" style="margin-bottom:10px">
                                                        <label class="text-danger" id="errorMessage${j}${i}" style=" padding: 0 !important; margin: 0 !important; display: inline; "></label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="submit" id="buy_btn${j}${i}" class="btn v-btn" onclick="investFarm('${planName}','${multiplier}','${time}','${pair}','${addressType}','${j}${i}')">Invest</button></div>
                                                </td>
                                                <td>
                                                    <div class="buy_now_table"><button type="button" id="harvest${j}${i}" class="btn v-btn" disabled>harvest</button></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="invested_amount${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="remaining_time${j}">0 days 0 hours</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="profit${j}">0</span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table"><span id="reward${j}"> 0 </span></div>
                                                </td>
                                                <td>
                                                    <div class="12_x_table d-grid"><span id="poolAmount1${j}">${Number(
                                farmedResults.firstPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol1.toUpperCase()}</span> <span class="divider"> <i class="fal fa-horizontal-rule text-white"></i></span> <span id="poolAmount2${j}">${Number(
                                farmedResults.secondPoolAmount
                              ).toFixed(
                                4
                              )} ${symbol2.toUpperCase()}</span></div>
                                                </td>                                   
                                                                                    
                                            </tr>
                                            `;
                            }
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              }
            }
          }
        }
        $(`#showAllPlans${i}`).html(
          `<tr><td colspan="11">Fetching..</td></tr>`
        );
        setTimeout(() => {
          $(`#showAllPlans${i}`).html(html);
        }, 4000);
      })
      .catch((err) => console.log(err));
  } else {
    swal({
      title: `Please connect to a wallet`,
      button: false,
    });
  }
};

// NEW FARM FUCTIONS
async function getLiquidityPairsOnFarms() {
  return new Promise((resolve, reject) => {
    fetch(`${serverApi.apiHost}/get-liquidity-pairs`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 1) {
          resolve(result.result);
        } else {
          reject("Pair not found");
        }
      });
  });
}

// GET USER ALL FARMS DETAILS
async function getUserAllFarms(plan, pair, address1, address2) {
  return new Promise((resolve, reject) => {
    let data = {
      address1: address1,
      address2: address2,
      pair: pair,
      plan: plan,
    };

    fetch(`${serverApi.apiHost}/get-user-farm-details`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.code === 1) {
          resolve(result.result);
        } else {
          reject(false);
        }
      })
      .catch((err) => reject(err));
  });
}

// Time function for remaining time
const getTimeRemaining = (endtime) => {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};
