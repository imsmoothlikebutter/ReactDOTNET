import React, {useState} from 'react'
import development from '../../utilities/Constants'

export default function AddManufacturer(props) {
  const initialFormData = Object.freeze({
      manufacturerName: "Manufacturer X",
      manufacturerEmail: "ManufacturerX@gmail.com"
    });
  
  const [formData, setFormData] = useState(initialFormData);



  const handleChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const manufacturerToAdd = {
        manufacturerID: 0,
        manufacturerName: formData.manufacturerName,
        manufacturerEmail: formData.manufacturerEmail
    };

    const url = development.API_URL_ADD_MANUFACTURER;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(manufacturerToAdd)
    })
    .then(response => response.json())
    .then(responseFromServer => {
        console.log(responseFromServer)
    })
    .catch((error)=>{
        console.log(error)
        alert(error);
    });

    props.onManufacturerAdded(manufacturerToAdd);
  };

  return (
    <form className='w-100 px-5'>
        <h1 className='mt-5'>Add new manufacturer</h1>
        <div className = "mt-5">
            <label className='h3 form-label'>Manufacturer Name</label>
            <input vale={FormData.manufacturerName} name="manufacturerName" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className = "mt-4">
            <label className='h3 form-label'>Manufacturer Email</label>
            <input vale={FormData.manufacturerEmail} name="manufacturerEmail" type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-primary btn-lg w-100 mt-5">Submit</button>
        <button onClick={() => props.onManufacturerAdded(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
    </form>
  );
}
