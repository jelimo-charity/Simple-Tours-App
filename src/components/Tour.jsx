import React, { useState, useEffect } from 'react';
import './tour.css';

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    fetch("https://course-api.com/react-tours-project")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTours(data);
      });
  }, []);

  const removeTour = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
  };

  return (
    <div className='toursContainer'>
      <h1>Our Tours</h1>
      {tours.map((tour) => (
        <div key={tour.id} className='tourBox'>
          <div className='imageBox'>
            <img src={tour.image} width={400} alt={tour.name} />
          </div>
          <div className='details'>
            <p>{tour.name}</p>
            <p>${tour.price}</p>
            <div className="infos">
              <p>
                {readMore ? tour.info : `${tour.info.substring(0, 200)}`}
                <button onClick={() => setReadMore(!readMore)}>
                  {readMore ? 'show less' : 'read more'}
                </button>
              </p>
              <button onClick={() => removeTour(tour.id)}>Not Interested</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tour;
