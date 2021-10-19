import React from 'react';

function AddLoaiChauCay(props) {
  return (
    <div className="box-add">
      <h3>Thêm loại chậu cây</h3>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Tên Loại chậu cây
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddLoaiChauCay;
