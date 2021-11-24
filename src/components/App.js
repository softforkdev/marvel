import React, { useEffect, useState } from "react";
import CardSection from "./CardSection";
import http from "../utils/http";

function App() {
  const [items, setItems] = useState([]);

  const [totalRequests, setTotalRequests] = useState(0);
  const [temp, setTemp] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let data;
    try {
      data = JSON.parse(localStorage.getItem("data"));
    } catch (e) {}
    if (data && data.length > 0) {
      setItems(data);
    } else {
      //fetch data
      const limit = 100;
      http
        .get(`/characters?apikey=${process.env.REACT_APP_API_KEY}`, {
          params: {
            limit: limit,
            offset: 0,
          },
        })
        .then(function (response) {
          const totalRequests_ = Math.ceil(response.data.data.total / limit);
          setTotalRequests(totalRequests_);

          //function to update component state
          const updateTemp = (array) => {
            const dataToSave = array.map((r) => {
              return {
                id: r.id,
                name: r.name,
                description: r.description,
                thumbnail: r.thumbnail,
                series: r.series,
                stories: r.stories,
                events: r.events,
              };
            });
            setTemp((temp) => [...temp, ...dataToSave]);
            setCount((count) => count + 1);
          };

          if (response?.data?.data?.results) {
            updateTemp(response.data.data.results);
          }
          let numRequest = 1;

          while (numRequest < totalRequests_) {
            http
              .get(`/characters?apikey=${process.env.REACT_APP_API_KEY}`, {
                params: {
                  limit: limit,
                  offset: limit * numRequest,
                },
              })
              .then(function (response) {
                if (response?.data?.data?.results) {
                  updateTemp(response.data.data.results);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            numRequest += 1;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (count === totalRequests && temp && temp.length > 0) {
      localStorage.setItem("data", JSON.stringify(temp));
      setItems(temp);
    }
  }, [count, temp, totalRequests]);

  return <CardSection items={items} />;
}

export default App;
