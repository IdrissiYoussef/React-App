import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/razer.webp"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">New Products Daily</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Discover a diverse range of premium hardware and software solutions tailored to elevate your digital experience.
              Shop now for cutting-edge technology essentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
