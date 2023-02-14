import React, {useState}  from 'react'
import development from "../../utilities/Constants";
import AddManufacturer from "./AddManufacturer";
import UpdateManufacturer from "./UpdateManufacturer";

export default function Manufacturer() {
    const [manufacturers, setManufacturer] = useState([]);
    const [showingAddNewManufacturerForm, setShowingAddNewManufacturerForm] = useState(false);
    const [manufacturerCurrentlyBeingUpdated, setManufacturerCurrentlyBeingUpdated] = useState(null);
  
    function getManufacturers(){
      const url = development.API_URL_GET_ALL_MANUFACTURERS;
      fetch(url, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(manufacturersFromServer => {
        console.log(manufacturersFromServer);
        setManufacturer(manufacturersFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    }
  
    function deleteManufacturer(manufacturerID){
      const url = development.API_URL_DELETE_MANUFACTURER_BY_ID+'/'+manufacturerID;
      console.log(url);
      fetch(url, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(responseFromServer => {
        console.log(responseFromServer);
        onManufacturerDeleted(manufacturerID);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    }
  
    return (
      <div className = "container">
        <div className="row min-vh-100">
          <div className="col d-flex flex-column justify-content-center align-items-center">
            {(showingAddNewManufacturerForm === false && manufacturerCurrentlyBeingUpdated === null) && (
                <div className="mt-2">
                  <button onClick={() => setShowingAddNewManufacturerForm(true)} className="btn btn-primary btn-lg w-100 mt-4">Add Manufacturer</button>
                </div>
            )}
  
            {getManufacturers()}
  
            {(manufacturers.length > 0 && showingAddNewManufacturerForm === false && manufacturerCurrentlyBeingUpdated === null)&&renderManufacturerTable()}
  
            {showingAddNewManufacturerForm && <AddManufacturer onManufacturerAdded={onManufacturerAdded}/>}
  
            {manufacturerCurrentlyBeingUpdated !== null && <UpdateManufacturer manufacturer={manufacturerCurrentlyBeingUpdated} onManufacturerUpdated={onManufacturerUpdated}/>}
  
          </div>
        </div>
      </div>
    );
  
    function renderManufacturerTable(){
      return(
        <div className="table-responsive mt-5">
          <table className="table table-bordered border-dark">
            <thead>
              <tr>
                <th scope="col">ManufacturerID</th>
                <th scope="col">ManufacturerName</th>
                <th scope="col">ManufacturerEmail</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map((manufacturer) => (
                <tr key={manufacturer.manufacturerID}>
                  <th scope="row">{manufacturer.manufacturerID}</th>
                  <td>{manufacturer.manufacturerName}</td>
                  <td>{manufacturer.manufacturerEmail}</td>
                  <td>
                    <button onClick={()=> setManufacturerCurrentlyBeingUpdated(manufacturer)} className="btn btn-primary btn-lg mx-3 my-3">Update</button>
                    <button onClick={()=> {if(window.confirm('Are you sure you want to delete '+manufacturer.manufacturerName+'?'))deleteManufacturer(manufacturer.manufacturerID)}} className="btn btn-secondary btn-lg mx-3 my-3">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  
    function onManufacturerAdded(addedManufacturer){
      setShowingAddNewManufacturerForm(false);
  
      if(addedManufacturer === null){
        return;
      }
      alert('Manufacturer successfully added. After clicking OK, your new manufacturer '+addedManufacturer.manufacturerName+'will show up in the table below.');
  
      getManufacturers();
    }
  
    function onManufacturerUpdated(updatedManufacturer){
      setManufacturerCurrentlyBeingUpdated(null);
      if(updatedManufacturer === null){
        return;
      }
  
      let manufacturersCopy = [...manufacturers];
      // eslint-disable-next-line
      const index = manufacturersCopy.findIndex((manufacturersCopyManufacturer, currentIndex)=>{
        if(manufacturersCopyManufacturer.manufacturerID === updatedManufacturer.manufacturerID){
          return true;
        }
      });
  
      if(index !== -1){
        manufacturersCopy[index] = updatedManufacturer;
      }
  
      setManufacturer(manufacturersCopy);
  
      alert("Manufacturer successfully updated. After clicking OK, look for the post with the name"+updatedManufacturer.manufacturerName+" in the table below to see the updates.");
    }
  
    function onManufacturerDeleted(deletedManufacturerID){
      let manufacturersCopy = [...manufacturers];
      // eslint-disable-next-line
      const index = manufacturersCopy.findIndex((manufacturersCopyManufacturer, currentIndex)=>{
        if(manufacturersCopyManufacturer.manufacturerID === deletedManufacturerID){
          return true;
        }
      });
  
      if(index !== -1){
        manufacturersCopy.splice(index,1);
      }
  
      setManufacturer(manufacturersCopy);
  
      alert("Manufacturer successfully deleted.");
    }
}
