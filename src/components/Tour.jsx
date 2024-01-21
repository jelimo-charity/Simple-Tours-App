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

    // Check if readMore is true for the tour being removed, and reset it to false
    if (readMore && id === readMore) {
      setReadMore(false);
    }
  };

  return (
    <section>
      <div className="title">
        <h1>Our tours</h1>
        <div className="underline"></div>
      </div>

      <div className="contents">
        {tours.map((tour) => (
          <article key={tour.id} className='tourBox'>
            <img src={tour.image} width={400} alt={tour.name} />
            <div className='details'>
              <p className='name'>{tour.name}</p>
              <p className='price'>${tour.price}</p>
            </div>
            <div className="infos">
              <p>
                {readMore && tour.id === readMore
                  ? tour.info
                  : `${tour.info.substring(0, 200)}`}
                <button onClick={() => setReadMore(readMore === tour.id ? false : tour.id)}>
                  {readMore === tour.id ? 'show less' : 'read more'}
                </button>
              </p>
              <button className='deletebtn' onClick={() => removeTour(tour.id)}>Not Interested</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Tour;
