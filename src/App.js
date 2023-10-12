import { useSelector } from 'react-redux';
import './App.css';
import { useGetAllQuery, useAddDataTodoMutation, useUpdateDataTodoMutation, useDeleteDatatodoMutation } from './services/api';
import { useState } from 'react';
function App() {
  const { data, error, isLoading, isFetchingg, isSuccess } = useGetAllQuery()
  console.log(useSelector((state) => state))
  console.log(data?.data)
  const [values, setValues] = useState({
    name: "",
    age: null,
    place: ""
  })
  const [action, setAction] = useState("")
  const [addData] = useAddDataTodoMutation()
  const [updateData] = useUpdateDataTodoMutation()
  const [deteleData] = useDeleteDatatodoMutation()

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    addData(values)
    if (isSuccess === true) {
      setValues({
        name: "",
        age: null,
        place: ""
      })
    }
    console.log(values)
  }
  const handleEdit = (v, i) => {
    setValues(v)
    setAction("update")
  }
  const updateSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    updateData(values)
    if (isSuccess === true) {
      setValues({
        name: "",
        age: "",
        place: ""
      })
      console.log(values.age)
    }
    setAction("")
  }

  const handleDelete = (v, i) => {
    deteleData(v)
  }
  return (
    <div className="App">
      <from>
        <input type="text" value={values.name} name="name" id="name" onChange={(e) => handleChnage(e)} />
        <input type="number" value={values.age} name="age" id="age" onChange={(e) => handleChnage(e)} />
        <input type="text" value={values.place} name="place" id="place" onChange={(e) => handleChnage(e)} />
        {action === "update" ? <button onClick={(e) => updateSubmit(e)}>update</button> : <button onClick={(e) => handleClick(e)}>Submit</button>}

      </from>
      {isLoading && <p>Loading...</p>}
      {isFetchingg && <p>Fetching...</p>}

      {isSuccess && <p>Success...</p>}
      {error && <p>Somthing went Wrong...</p>}
      <table style={{ width: "100%" }}>
        <tr>
          <td>S.No</td>
          <td>Name</td>
          <td>Age</td>
          <td>Place</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
        {data?.data?.map((v, i) => {
          return (
            <tr key={i}>
              <td>{i}</td>
              <td>{v?.name}</td>
              <td>{v?.age}</td>
              <td>{v?.place}</td>
              <td>
                <button onClick={() => handleEdit(v, i)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(v, i)}>Delete</button>
              </td>
            </tr>
          )
        })}

      </table>


    </div>
  );
}

export default App;
