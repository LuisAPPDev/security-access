import React from 'react';
import FirebaseProvider from "./firebase/context"
import NewEmployee from "./components/newEmployee"
import ListEmployees from "./components/listEmployees"

function App() {
  return (
    <FirebaseProvider>
    <NewEmployee/>
    <hr/>
    <ListEmployees/>
   </FirebaseProvider>
  );
}

export default App;
