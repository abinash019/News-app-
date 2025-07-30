import React from 'react'

const NewsIteams = (props) => {

  let { title, description, imageUrl, newsUrl, aurther, date, source } = props;
  return (
    <div className='my-3'><div className="card" >
      <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%' }}>{source}</span>
      <img src={imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-body-secondary">by {!aurther ? "unknown" : aurther} on {new Date(date).toUTCString()}</small></p>
        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark mb-3">Read More</a>
      </div>
    </div>

    </div>
  )

}

export default NewsIteams






