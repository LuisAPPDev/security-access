import React, { useState, useContext } from "react";
import FileUploader from "react-firebase-file-uploader";
import { FirebaseContext } from "../firebase/context";
import Swal from "sweetalert2";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Error = styled.p`
  background-color: tomato;
  padding: 0.4rem 0;
  font-weight: 500;
  color: #fff;
  text-align: center;
  margin: 0.5rem 0;
  border-radius: 5px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

const Button = styled.button`
  background-color: ${props => props.bgColor};
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  color: ${props => props.colorText};
  font-size: 1.2rem;
  text-transform: uppercase;
  border-radius: 5px;
  font-weight: 500;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    transform: scale(0.98);
    border-color:${props => props.bgColor};
  }
`;

const Image = styled.img`
  width: 250px;
  object-fit: cover;
  height: 250px;
`;
const LabelInput = styled.label`
  margin-top: 16px !important;
  padding: 1rem 0.5rem;
  text-align: center;
  width: 70%;
  border: 1px solid #c5c5c5;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }
`;
export default function NewEmployee() {
  const initial_state = {
    name: "",
    lastName: "",
    access: "",
  };

  const {
    firebase,
    values,
    setValues,
    imageUrl,
    setImageUrl,
    idEmployee,
    setIdEmployee,
    setReload,
  } = useContext(FirebaseContext);
  const [errors, setErrors] = useState({});
  const { name, lastName, access } = values;

  const deleteEmployee = () => {
    firebase.db
      .collection("employees")
      .doc(idEmployee)
      .delete()
      .then(() => {
        Swal.fire("El empleado ha sido eliminado", "", "success");
        setErrors({});
        setValues(initial_state);
        setImageUrl("");
        setIdEmployee(null);
      })
      .catch((error) => {
        Swal.fire(
          "Hubo un error",
          "Póngase en contacto con el administrador",
          "error"
        );
      });
  }

  const formReset = () => {

    setValues(initial_state);
    setImageUrl("");
    setIdEmployee(null);
    setErrors({});

  }

  const createNewEmployee = () => {
    

    if (!idEmployee) {
    const employee = {
            name,
            lastName,
            access,
            imageUrl,
            createdAt: Date.now(),
          }

      firebase.db
        .collection("employees")
        .add(employee)
        .then(() => {
          Swal.fire("El empleado ha sido creado", "", "success");
          setErrors({});
          setValues(initial_state);
          setImageUrl("");
          setIdEmployee(null);
        })
        .catch((error) => {
          Swal.fire(
            "Huboooooo un error",
            "Póngase en contacto con el administrador",
            "error"
          );
        });
    } else {
      const employee = {
            name,
            lastName,
            access,
            imageUrl,
            
        }

      firebase.db
        .collection("employees")
        .doc(idEmployee)
        .update(employee)
        .then(() => {
          Swal.fire(
            "Los datos del empleado han sido actualizados",
            "",
            "success"
          );
          setIdEmployee(null);
          setErrors({});
          setValues(initial_state);
          setImageUrl("");
        })
        .catch((error) => {
          Swal.fire(
            "Huboaaaaaaa un error",
            "Póngase en contacto con el administrador",
            "error"
          )
        });
      setReload(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !lastName || !access || !imageUrl) {
      setErrors({
        ...errors,
        fields: "Los campos y la imagen son obligatorios",
      });
    } else {
      createNewEmployee();
    }
  };

  const handleUploadSuccess = (name) => {
    firebase.storage
      .ref("employees")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row row-hero align-items-center">
        <div className="col-md-6 d-flex align-items-center flex-column">
          {imageUrl ? (
            <Image width={200} src={imageUrl} alt="Employee Photo" />
          ) : (
            <Image width={200} src="/img/no-image.png" alt="No Image" />
          )}
          <LabelInput>
            Seleccionar imagen
            <FileUploader
              hidden
              accept="image/*"
              id="image"
              name="image"
              randomizeFilename
              storageRef={firebase.storage.ref("employees")}
              onUploadSuccess={handleUploadSuccess}
            />
          </LabelInput>
        </div>

        <div className="col-md-6">
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Nombre del empleado"
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Apellidos del empleado"
              name="lastName"
              type="text"
              value={lastName}
              onChange={handleChange}
              style={{ marginBottom: 10 }}
            />
            <select
              className="custom-select"
              value={access}
              required
              onChange={handleChange}
              name="access"
              style={{ backgroundColor: "#F3F3F3" }}
            >
              <option value="">Tipo de Acceso *</option>
              <option value={"granted"}>Permitido</option>
              <option value={"denied"}>Denegado</option>
            </select>

            <Button bgColor="#fcba04" colorText="#250001" type="submit">
              Guardar
            </Button>
          </form>
          {idEmployee && (
            <>
              <Button bgColor="#a50104" colorText="#f3f3f3" onClick={deleteEmployee}>Eliminar</Button>
              <Button bgColor="white" colorText="#250001" onClick={formReset}>Nuevo</Button>
            </>
          )}
          {errors.fields && <Error>{errors.fields}</Error>}
        </div>
      </div>
    </div>
  );
}
