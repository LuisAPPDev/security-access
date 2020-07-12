import React, { useContext } from "react";
import { FirebaseContext } from "../firebase/context";
import EmployeeCard from "./employeeCard";
import styled from "styled-components";

const TitleColumn = styled.h4`
  color: #590004;
`;

const ListEmployees = () => {
  const { employees } = useContext(FirebaseContext);
  const employeesGranted = employees.filter(
    (employee) => employee.access === "granted"
  );
  const employeesDenied = employees.filter(
    (employee) => employee.access === "denied"
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 align-items-center d-flex flex-column text-center">
          <TitleColumn> Empleados con acceso permitido </TitleColumn>
          {employeesGranted.map((elm) => (
            <EmployeeCard
              key={elm.id}
              id={elm.id}
              img={elm.imageUrl}
              name={elm.name}
              access={elm.access}
              lastName={elm.lastName}
            />
          ))}
        </div>
        <div className="col-6 align-items-center d-flex flex-column text-center">
          <TitleColumn> Empleados con acceso denegado </TitleColumn>
          {employeesDenied.map((elm) => (
            <EmployeeCard
              key={elm.id}
              id={elm.id}
              img={elm.imageUrl}
              name={elm.name}
              access={elm.access}
              lastName={elm.lastName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListEmployees;
