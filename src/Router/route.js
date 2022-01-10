import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout2 from "../Container/Layout2";
import Layout1 from "../Container/Layout1";
import SwapTradePage from "../pages/SwapTradePage";
import TradePage from "../pages/TradePage";
import FramsPage from "../pages/FarmsPage";
export default function Routers() {
  return (
    <>
      <Switch>
        {/* <Route path="/swap" component={SwapTradePage} /> */}
        <Route path="/l1/:path?" excat>
          <Layout2>
            <Switch>
              <Route path="/l1/farm" component={FramsPage} />
              <Route path="/l1/trade" component={TradePage} />
            </Switch>
          </Layout2>
        </Route>

        {/* Layout 1  */}
        <Route>
          <Layout1>
            <Switch>
              <Route path="/" excat component={SwapTradePage} />
            </Switch>
          </Layout1>
        </Route>
      </Switch>
    </>
  );
}

// https://codesandbox.io/s/react-router-v5-multiple-layout-forked-xb7rx?file=/src/router/index.js
