import { useState } from "react";
import axios from "axios";

export default function PlanTrip() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(0);
  const [budget, setBudget] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(0);
  const [children, setChildren] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  //   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true);
    console.log({
      destination,
      days,
      budget,
      familyMembers,
      children,
      currentLocation,
    });
    axios
      .post("/api/planner", {
        destination,
        days,
        budget,
        familyMembers,
        children,
        currentLocation,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
    // navigate("/login");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Destination: </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Current Location: </label>
          <input
            type="text"
            value={currentLocation}
            onChange={(e) => {
              setCurrentLocation(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Days: </label>
          <input
            type="number"
            value={days}
            onChange={(e) => {
              setDays(e.target.value);
            }}
          />
        </div>
        <div>
          <label>
            Budget <b> $ </b>:{" "}
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Number of Family Members : </label>
          <input
            type="number"
            value={familyMembers}
            onChange={(e) => {
              setFamilyMembers(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Number of Children : </label>
          <input
            type="number"
            value={children}
            onChange={(e) => {
              setChildren(e.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {isOpen ? (
          !data ? (
            <div>
              {" "}
              <h2> Loading...</h2>{" "}
            </div>
          ) : (
            data.map((value) => {
              return (
                <div>
                  <p>Name : {value.name}</p>
                  <p>Location : {value.location}</p>
                  <p>Description : {value.description} </p>
                  <p>Price: {value.price} </p>
                </div>
              );
            })
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
