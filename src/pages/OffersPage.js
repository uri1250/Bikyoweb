import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // your firebase config
import Slider from "react-slick";

// required slick-carousel css (install package below)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* import the custom CSS you just created */
import "./Offers.css";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "offers"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    fetchOffers();
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 600,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="offers-page">
      <div className="offers-wrapper">
        <Slider {...settings}>
          {offers.map((offer) => (
            <div key={offer.id} className="offers-slide">
              <div className="offer-card">
                <div className="offer-image-wrap">
                  <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="offer-image"
                  />
                  {/* {offer.discount && (
                    <span className="discount-badge">{offer.discount}</span>
                  )} */}
                </div>

                {/* <div className="offer-content">
                  <p className="offer-description">{offer.description}</p>
                </div> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Offers;
