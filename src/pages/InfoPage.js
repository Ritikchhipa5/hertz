import React from "react";
export default function InfoPage(props) {
  return (
    <>
      <div
        style={{ position: "relative", top: "0", bottom: "0", height: "100vh" }}
      >
        <iframe
          src="https://ramlogics.com/info.php"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            overflow: "scroll",
          }}
          title="Iframe Example"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
