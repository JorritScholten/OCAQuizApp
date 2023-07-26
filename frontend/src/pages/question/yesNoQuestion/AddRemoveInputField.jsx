import { useState } from "react";
import React from "react";
function AddRemoveInputField() {
  const [inputFields, setInputFields] = useState([
    {
      fullName: "",
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        fullName: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          {inputFields.map((name, index) => {
            const { tag } = name;
            return (
              <div className="row my-3" key={index}>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="tag">add tags: </label>
                    <input
                      type="text"
                      onChange={(evnt) => handleChange(index, evnt)}
                      value={tag}
                      name="tag"
                      className="form-control"
                      placeholder="tag"
                    />
                  </div>
                </div>

                <div className="col">
                  {inputFields.length !== 1 ? (
                    <button
                      className="btn btn-outline-danger"
                      onClick={removeInputFields}
                    >
                      remove
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="col-sm-12">
              <button
                className="btn btn-outline-success "
                onClick={addInputField}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4"></div>
    </div>
  );
}
export default AddRemoveInputField;
