import React from 'react'
import './style.css'

const Main = (props) => {
  const search = (s) => {
    props.setFilters({
      s,
      page: 1
    })
  }

  const load = () => {
    props.setFilters({
      ...props.filters,
      page: props.filters.page + 1
    })
  }

  let button;

  button = (
    <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-light mb-2' onClick={load}>Load More</button>
    </div>
  )
  return (
    <>
    <div className="container mt-4">
      <h1 className='text-center pb-4'>Anime</h1>

    <div className="col-md-12 mb-4 input-group">
      <input type="text" className='form-control' placeholder='Search' onChange={e =>search(e.target.value)}/>
    </div>

     
    <div className="container pt-3">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {
          props.products.map(item => (
            <div className="col">
          <div className="card shadow-sm">
            <img src={item.image_url} alt="" />

            <div className="card-body">
              <p className="card-text">{item.title}</p>
            </div>
          </div>
        </div>
          ))
        }
        </div>
        </div>
        </div>
        {button}
        </>
  )
}

export default Main
