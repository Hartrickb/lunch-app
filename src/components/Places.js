import { GridItem } from '@chakra-ui/react';

const places = [
  {
      "location": {
          "lat": 35.7405003,
          "long": -78.77691159999999,
          "address": "411 Colonades Way, Cary, NC 27518, United States",
          "distance": 0.0099
      },
      "name": "Chick-fil-A",
      "ratings": {
          "rating": 4.4,
          "numberOfRatings": 1270
      },
      "price": 1,
      "scores": {
          "price": 1,
          "rating": 3.52,
          "numberOfRatings": 1.8704,
          "distance": 1.6852,
          "total": 8.0756
      }
  },
  {
    "location": {
        "lat": 35.738664,
        "long": -78.777683,
        "address": "310 Colonades Way, Cary, NC 27518, United States",
        "distance": 0.0089
    },
    "name": "Shake Shack",
    "ratings": {
        "rating": 4.1,
        "numberOfRatings": 943
    },
    "price": 2,
    "scores": {
        "price": 0.5,
        "rating": 3.28,
        "numberOfRatings": 1.3888,
        "distance": 1.717,
        "total": 6.8858
    }
  },
  {
      "location": {
          "lat": 35.7392575,
          "long": -78.77746739999999,
          "address": "316 Colonades Way Suite 206-C, Cary, NC 27518, United States",
          "distance": 0.0092
      },
      "name": "MOD Pizza",
      "ratings": {
          "rating": 4.4,
          "numberOfRatings": 373
      },
      "price": 1,
      "scores": {
          "price": 1,
          "rating": 3.52,
          "numberOfRatings": 0.5493,
          "distance": 1.7075,
          "total": 6.7768
      }
  },
  {
      "location": {
          "lat": 35.7381034,
          "long": -78.7774178,
          "address": "575 New Waverly Pl #106, Cary, NC 27518, United States",
          "distance": 0.008
      },
      "name": "Enrigo Italian Bistro",
      "ratings": {
          "rating": 4.5,
          "numberOfRatings": 586
      },
      "price": 2,
      "scores": {
          "price": 0.5,
          "rating": 3.6,
          "numberOfRatings": 0.863,
          "distance": 1.7456,
          "total": 6.7086
      }
  }
]

const Places = () => {
  return (
    <>
      {places.map((place) => (
        <GridItem colSpan={2}>
          <h2>{place.name}</h2>
        </GridItem>
      ))}
    </>
  )
}

export default Places
