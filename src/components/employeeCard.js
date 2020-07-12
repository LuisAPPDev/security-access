import React, { useContext } from "react";
import { FirebaseContext } from "../firebase/context";

export default function EmployeeCard(props) {
  const { setValues, setImageUrl, setIdEmployee } = useContext(FirebaseContext);
  const { name, lastName, img, id, access } = props;

  return (
    <div
      className="card"
      style={{ maxWidth: "18rem", marginTop: "1rem" }}
      onClick={() => {
        setValues({ name, lastName, access });
        setIdEmployee(id);
        setImageUrl(img);
      }}
    >
      <img
        src={img}
        className="card-img-top"
        style={{ height: "14rem", objectFit: "cover" }}
        alt={name}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h5 className="card-title">{lastName}</h5>
      </div>
    </div>
  );
}
