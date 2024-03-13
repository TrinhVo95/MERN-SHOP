import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-banner bg-no-repeat bg-cover">
      {/* Layer */}
      <div className="bg-gradient-to-r from-white/80 to-white/0">
        {/* container */}
        <div className="max-w-screen-xl mx-auto px-4">
          {/* Layout */}
          <div className="flex justify-center items-center h-banner lg:justify-start">
            {/* content box */}
            <div className="text-white text-center lg:text-left">
              <div className="mb-6">
                <h1 className="font-bold text-4xl lg:text-6xl mb-4">
                  Technology for your convenience
                </h1>
                <p className="text-base lg:text-xl">
                  For your job, study or housework, everything you need is here
                </p>
              </div>
              {/* Shop button */}
              <Link to="/products" className="btn btn-primary">
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
