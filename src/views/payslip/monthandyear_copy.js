<>   <div className="d-flex justify-content-center  ">
<div className="card" style={{ width: '100%', height: "800px" }}>
  <div className="card-header" style={{ backgroundColor: '#19334D' }}>
    <h3 style={{ textAlign: 'center', color: '#ffffff' }}>Salary Slip</h3>
  </div>
  <div className="row" style={{ marginTop: '10px' }}>
    <div className="col-3"></div>
    <div className="col-2" style={{ textAlign: 'center' }}>
      <label> Select Month : </label>
    </div>
    <div className="col-2">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        // value={monthAndYear.month}
        // onChange={handleInputChange}
        name="month"
        options={options} />
      <div className="col-5"></div>
    </div>
  </div>

  <div className="row" style={{ marginTop: '10px' }}>
    <div className="col-3"></div>
    <div className="col-2" style={{ textAlign: 'center' }}>
      <label> Select Year : </label>
    </div>
    <div className="col-2">
      <YearPicker
        className="form-control w-100"
        name="year"
        onChange={(e) => handleChange(e)} />

      <div className="col-5"></div>
    </div>
  </div>
  <div className="row" style={{ marginTop: '10px' }}>
    <div className="col-3"></div>
    <div className="col-2" style={{ textAlign: 'center' }}>
      {/* <label> Select Year : </label> */}
    </div>
    <div className="col-2">
      <span style={{ textAlign: 'center', color: 'red' }}>{error}</span>
      <div className="col-5"></div>
    </div>
  </div>
  <div className="row" style={{ marginTop: '10px' }}>
    <div className="col-3"></div>
    <div className="col-2" style={{ textAlign: 'center' }}>
      {/* <label> Select Year : </label> */}
    </div>
    <div className="col-2">
      <button className="btn  btn-info btn-block" onClick={() => save()}>
        Save
      </button>
      <div className="col-5"></div>
    </div>
  </div>
</div>
</div>
</>