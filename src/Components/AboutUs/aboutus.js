import aboutus from "../../Images/aboutus.jpg";
import hands from "../../Images/hands.jpg";
import friends from "../../Images/friends.jpg";
import pic3 from "../../Images/pic3.jpg";
import { Image, Row, Col } from "react-bootstrap";
import React from "react";
import { AgChartsReact } from "ag-charts-react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AboutUs() {
  const [options, setOptions] = useState({
    title: {
      text: "Annual Resorts Registration",
    },
    data: [
      {
        month: "Jan",
        resort: 200,
      },
      {
        month: "Feb",
        resort: 300,
      },
      {
        month: "Mar",
        resort: 350,
      },
      {
        month: "Apr",
        resort: 400,
      },
    ],
    series: [
      {
        type: "line",
        xKey: "month",
        yKey: "resort",
        yName: "Resort",
      },
    ],
  });
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://resortifybackend.onrender.com/api/propertyStats"
      );
      console.log(response.data);
      setOptions({
        title: {
          text: "Annual Resorts Registration",
        },
        data: response.data,
        series: [
          {
            type: "line",
            xKey: "month",
            yKey: "resort",
            yName: "Resort",
          },
        ],
      });
    })();
  }, []);
  return (
    <div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Image
          src={pic3}
          style={{
            width: "90%",
            height: "600px",
            margin: "10px auto",
          }}
        />
      </div>

      <div style={{ margin: "0px 70px 0px 70px" }}>
        <Row
          style={{
            wordSpacing: "5px",
            lineHeight: "30px",
            margin: "10px",
            fontSize: "20px",
          }}
        >
          Welcome to Resortify, your premier platform for seamless and
          unforgettable vacation experiences. Designed with your wanderlust in
          mind, our app is your gateway to discovering and booking the perfect
          resort getaway, tailored to your preferences and desires.
        </Row>
        <Row style={{ margin: "20px 0px" }}>
          <Col className="col-md-6" style={{ wordSpacing: "5px" }}>
            <div style={{ lineHeight: "40px" }}>
              <h3 style={{ marginTop: "20px" }}> Our Mission </h3> <br />
              At Resortify, our mission is simple: to empower travelers like you
              to embark on unforgettable journeys with ease and confidence. We
              are committed to providing a user-friendly platform that connects
              you with a curated selection of top-rated resorts around the
              world, ensuring that every aspect of your vacation planning
              process is seamless and stress-free.
            </div>
          </Col>
          <Col className="col-md-6">
            <Image src={aboutus} style={{ height: "100%", width: "100%" }} />
          </Col>
        </Row>
        <Row style={{ margin: "30px 0px" }}>
          <Col md={6}>
            <AgChartsReact options={options} />
          </Col>
          <Col
            className="col-md-6"
            style={{
              wordSpacing: "5px",
              lineHeight: "30px",
            }}
          >
            <div>
              <h3>Discover Your Dream Resort</h3>
              <p>
                With our extensive database of resorts, ranging from luxury
                beachfront retreats to charming countryside escapes and
                everything in between, finding your ideal destination has never
                been easier. Explore detailed descriptions, vibrant photos, and
                real-time availability to discover the resort that perfectly
                matches your preferences and budget.
              </p>
              <br />
              <h3>Personalized Recommendations</h3>
              <p>
                Let our app be your personal concierge, offering tailored
                recommendations based on your interests, travel style, and past
                booking history. Whether you're seeking a romantic getaway, a
                family-friendly resort, or an adventure-filled retreat, our
                intelligent algorithm will help you find the perfect match for
                your next vacation.
              </p>
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "50px 0px" }}>
          <Col
            className="col-md-6"
            style={{
              wordSpacing: "5px",
              lineHeight: "30px",
            }}
          >
            <div>
              <h3>Seamless Booking Process</h3>
              <p>
                Booking your dream resort is just a few taps away with our
                intuitive booking process. Enjoy hassle-free reservations,
                secure payment options, and instant confirmation, giving you
                peace of mind and confidence in your travel plans.
              </p>
              <br />
              <h3>24/7 Customer Support</h3>
              <p>
                Your satisfaction is our top priority. Our dedicated customer
                support team is available around the clock to assist you with
                any questions, concerns, or special requests you may have
                before, during, or after your stay. Whether you need help
                modifying your reservation, or seeking local recommendations,
                we're here to ensure that your vacation experience exceeds your
                expectations.
              </p>
            </div>
          </Col>
          <Col className="col-md-6">
            <Image src={friends} style={{ height: "100%", width: "100%" }} />
          </Col>
        </Row>
        <Row style={{ margin: "50px 0px" }}>
          <Col className="col-md-6">
            <Image src={hands} style={{ height: "100%", width: "100%" }} />
          </Col>
          <Col
            className="col-md-6"
            style={{
              wordSpacing: "5px",
              lineHeight: "30px",
            }}
          >
            <div>
              <h3>Trust and Transparency</h3>
              <p>
                We believe in transparency and integrity in everything we do.
                With Resortify, you can book with confidence, knowing that all
                resort listings are verified and vetted to meet our high
                standards of quality and reliability. We also offer transparent
                pricing, so you can rest assured that you're getting the best
                value for your money.
              </p>
              <br />
              <h3>Join the Resortify Community</h3>
              <p>
                Join thousands of satisfied travelers who have discovered their
                dream resorts through Resortify. Whether you're planning a
                romantic getaway, a family vacation, or a solo adventure, let us
                help you turn your travel dreams into reality. Download our app
                today and embark on your next unforgettable journey with
                Resortify.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
