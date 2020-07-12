import React, { createContext, useState, useEffect } from "react";
import firebase from "./firebase";

export const FirebaseContext = createContext();

const initial_state = {
  name: "",
  lastName: "",
  access: "",
};

const FirebaseProvider = (props) => {
  const [values, setValues] = useState(initial_state);
  const [imageUrl, setImageUrl] = useState("");
  const [employees, setEmployees] = useState([]);
  const [idEmployee, setIdEmployee] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getEmployees = () => {
      firebase.db
        .collection("employees")
        .orderBy("createdAt", "asc")
        .onSnapshot(handleSnapshot);
    };
    getEmployees();
    // eslint-disable-next-line
  }, [reload]);

  function handleSnapshot(snapshot) {
    const employees = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setEmployees(employees);
  }

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        employees,
        values,
        setValues,
        imageUrl,
        setImageUrl,
        setIdEmployee,
        idEmployee,
        setReload,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
export default FirebaseProvider;
