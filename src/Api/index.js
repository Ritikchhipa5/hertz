import React, { useState } from "react";

// Get Token Details when user login
const BASE_URL = "https://api.hertz-network.com";

//Two factor Authentication
export async function do2FAuthentication(_code) {
  let _data;
  await fetch(BASE_URL + "/2fa/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("TOKEN_AUTH")}`,
    },
    body: JSON.stringify({
      code: _code,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        _data = data;
      } else {
        _data = { error: false };
      }
    });
  return _data;
}

//  Transfer HERTZ to user account and
export async function transferHertzToUser(
  accountFrom,
  address,
  symbol,
  amount
) {
  let _data;
  await fetch(
    BASE_URL +
      `/v1/transfer?account=${accountFrom}&to=${address}&amount=${amount}&symbol=${symbol.toUpperCase()}&memo=Testing`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("TOKEN_AUTH")}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => (_data = data));
  return _data;
}

// Get Account Details of login user
export const getAccount = async () => {
  let _data;
  await fetch(BASE_URL + `/accounts/accounts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN_AUTH")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => (_data = data[0]));
  return _data;
};

//Transfer Token to other account

export const transferToken = async (data) => {
  let _data;
  _data = await fetch(BASE_URL + `/accounts/transfer`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN_AUTH")}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log({ heading: "Failed", body: "Please enable 2FA." });
    });
};

export const getLoginResponse = async (username, password) => {
  let _data;
  await fetch("https://api.hertz-network.com" + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("TOKEN_AUTH", data.token);
      _data = data;
    })
    .catch((error) => console.log(error));
  return _data;
};

export async function getTransactionhistory() {
  let _data;
  await fetch(BASE_URL + "/v1/transactions?account=ramlogicsrit&symbol=HTZ", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN_AUTH")}`,
    },
  })
    .then((data) => data.json())
    .then((value) => (_data = value))
    .catch((err) => console.log(err));
  return _data;
}

export async function transferHertzFromAdminToUser(address, symbol, amount) {
  let _data;
  await fetch(
    BASE_URL +
      `/v1/transfer?account=ramlogicsabh&to=${address}&amount=${amount}&symbol=${symbol.toUpperCase()}&memo=Testing`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("TOKEN_AUTH")}`,
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiaGlzaGVrLnNheGVuYUByYW1sb2dpY3MuY29tIiwiaWF0IjoxNjQwMDg1ODQxfQ.dTmudO0I5vC1WxEwSumvXAm5xYZ85rkxVZ1EWsj61Z0"}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => (_data = data));
  return _data;
}
