import DataTable from "react-data-table-component";
import { AgChartsReact } from "ag-charts-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import ModalDashboard from "./ModalDashboard";
import axiosInstance from "../../axiosInstance";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
export default function OwnerDashBoard() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const todayDate = new Date().toISOString().split("T")[0];
  const [dateValue, setDateValue] = useState({
    to: todayDate,
    from: todayDate,
  });

  const [formError, setFormError] = useState({});
  function getData() {
    return [
      { asset: "Paid", amount: 0, yield: 3 },
      { asset: "Unpaid", amount: 0, yield: 4 },
      { asset: "Booked", amount: 0, yield: 0.75 },
      { asset: "Approved", amount: 0, yield: 4 },
    ];
  }
  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
      { id: "Jan", totalSum: 0 },
      { id: "Feb", totalSum: 0 },
      { id: "Mar", totalSum: 0 },
      { id: "Apr", totalSum: 0 },
      { id: "May", totalSum: 0 },
      { id: "Jun", totalSum: 0 },
      { id: "Jul", totalSum: 0 },
      { id: "Aug", totalSum: 0 },
      { id: "Sep", totalSum: 0 },
      { id: "Oct", totalSum: 0 },
      { id: "Nov", totalSum: 0 },
      { id: "Dec", totalSum: 0 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: "bar", xKey: "id", yKey: "totalSum" }],
  });
  const [options, setOptions] = useState({
    data: getData(),
    title: {
      text: "Booking Status",
    },
    subtitle: {
      text: "show the annual booking status",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        radiusKey: "yield",
        legendItemKey: "asset",
      },
    ],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:3060/api/today/bookings?from=${dateValue.from}&to=${dateValue.to}`
        );
        const result = await axios.get(
          "http://localhost:3060/api/bookings/calculate",
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        setChartOptions({ data: result?.data?.result });
        setBookings(response.data);
        const response2 = await axios.get(
          "http://localhost:3060/api/bookingStatus",
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        console.log("bookings", response2.data.bookings);
        console.log("total bookings", response2.data.response.length);
        setTotalBookings(response2?.data?.response?.length); 
        const approvedCount = response2.data.bookings.reduce((acc, cv) => {
          return (acc += cv?.approvedCount);
        }, 0);
        const unApproved = response2?.data?.response?.length - approvedCount;
        console.log("approved count", approvedCount);
        setOptions({
          data: [
            {
              asset: "Paid",
              amount: response2?.data?.bookings[1]?.count,
              yield: 5,
            },
            {
              asset: "Unpaid",
              amount: response2?.data?.bookings[0]?.count - unApproved,
              yield: 4,
            },
            // {
            //   asset: "Bookings",
            //   amount: response2.data.response.length,
            //   yield: 5,
            // },
            {
              asset: "unApproved",
              amount: unApproved,
              yield: 3,
            },
          ],
          title: {
            text: "Booking Status",
          },
          subtitle: {
            text: "Annual booking status",
          },
          series: [
            {
              type: "pie",
              angleKey: "amount",
              radiusKey: "yield",
              legendItemKey: "asset",
            },
          ],
        });
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
    })();
  }, []);

  const handleUpdate = (booking) => {
    const bookings1 = bookings.map((ele) => {
      if (ele._id == booking._id) {
        return booking;
      } else {
        return ele;
      }
    });
    setBookings(bookings1);
  };

  const handleChange = (e) => {
    setDateValue({ ...dateValue, [e.target.name]: e.target.value });
  };

  const error = {};

  const validateError = () => {
    if (dateValue.from === "") {
      error.fromValue = "To  Value Is required";
    }
    if (dateValue.to === "") {
      error.toValue = "From Value is required";
    } else if (
      format(new Date(dateValue.from), "dd/MM/yyyy") >
      format(new Date(dateValue.to), "dd/MM/yyyy")
    ) {
      error.toValue = "Must be equal to greater than FROM Value";
    }
  };

  const handleBookingSearch = async () => {
    validateError();
    if (Object.keys(error).length === 0) {
      try {
        try {
          const response = await axiosInstance.get(
            `http://localhost:3060/api/bookings?from=${dateValue.from}&to=${dateValue.to}`
          );
          setFormError({});
          setBookings(response.data);
        } catch (err) {
          console.log(err);
          alert(err.message);
        }
      } catch (err) {}
    } else {
      setFormError(error);
    }
  };

  const columns = [
    {
      name: "Booking id",
      selector: (row) => row.bookingId,
    },
    {
      name: "Customer Name",
      selector: (row) => row.userName,
    },
    {
      name: "CheckIn Date",
      selector: (row) => row.Date.checkIn.slice(0, 10),
    },
    {
      name: "CheckOut Date",
      selector: (row) => row.Date.checkOut.slice(0, 10),
    },
    {
      name: "No of Rooms",
      selector: (row) =>
        row.Rooms.reduce((acc, cv) => {
          return acc + cv.NumberOfRooms;
        }, 0),
    },
    {
      name: "No of Guests",
      selector: (row) => row.guests.adult + row.guests.children,
    },
    {
      name: "Amount",
      selector: (row) => row.totalAmount,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.isPaymentDone !== "true") {
          return row.status == "initiated"
            ? "To be Approved"
            : row.status == "approved"
            ? "Approved"
            : "Rejected";
        } else {
          return row.isPaymentDone == "true" ? "Payment Done" : "To be Paid";
        }
      },
    },
    {
      name: `CheckedIn|CheckedOut`,
      selector: (row) => `${row.isCheckedIn} / ${row.isCheckedOut}`,
    },
    {
      name: "Actions",
      selector: (row) => {
        if (row) {
          return (
            <>
              <ModalDashboard booking={row} handleUpdate={handleUpdate} />
            </>
          );
        }
      },
    },
  ];

  return (
    <>
    <div className="container-fluid">
      <div className="row my-2">
        <Col xs={12} md={6} className="m-auto">
          <Card
            style={{ width: "30rem" }}
            className="m-auto p-3"
            border="primary"
          >
            <Card.Body>
              <Card.Title>
                {" "}
                Date - {new Date().toString().slice(0, 16)}{" "}
              </Card.Title>{" "}
              <hr />
              {/* <h2>No of Bookings - {bookings.filter((ele) => {
                                return format(new Date(ele.createdAt), 'dd/MM/yyyy') == format(new Date(), 'dd/MM/yyyy')
                            }).length}</h2> */}
              <h2>No of Bookings - {bookings.length}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="m-auto">
          <Card
            style={{ width: "30rem" }}
            className="m-auto p-3"
            border="primary"
          >
            <Card.Body>
              <Card.Title> Total Bookings </Card.Title> <hr />
              <h2>Total No of Bookings - {bookings.length}</h2>
            </Card.Body>
          </Card>
        </Col>
      </div>
      <hr />
      <div className="row align-items-center">
        <div className="col-md-3 row align-items-center offset-md-1">
          <div className="col-auto">
            <label htmlFor="from">From</label>
          </div>
          <div className="col">
            <input
              name="from"
              type="date"
              className="form-control"
              value={dateValue.from}
              id="from"
              onChange={handleChange}
            />
          </div>
          {formError.fromValue && (
            <span className="text-danger">{formError.fromValue}</span>
          )}
        </div>
        <div className="col-md-3 row align-items-center">
          <div className="col-auto">
            <label htmlFor="to">To</label>
          </div>
          <div className="col">
            <input
              name="to"
              type="date"
              className={`form-control`}
              value={dateValue.to}
              id="to"
              min={dateValue.from}
              onChange={handleChange}
            />
            {formError.toValue && (
              <span className="text-danger">{formError.toValue}</span>
            )}
          </div>
        </div>

        <div className="col-2 ">
          <button className="btn btn-primary" onClick={handleBookingSearch}>
            Search
          </button>
        </div>
        <div className="col-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By BookingId....."
            className="form-control"
          />
        </div>
      </div>
      <hr />
      <div>
        <DataTable
          pagination
          columns={columns}
          data={
            search
              ? bookings.filter((ele) => ele.bookingId.includes(search))
              : bookings
          }
        />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1", height: "25%" }}>
          <AgChartsReact options={chartOptions} />
        </div>
        <div style={{ flex: "1", height: "25%" }}>
          <h6
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {" "}
            Total Bookings:{totalBookings}
          </h6>
          <AgChartsReact options={options} />
        </div>
      </div>
      </div>
    </>
  );
}
