import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import sunny from "../img/sunny.jpg";
import rainy from "../img/rainy.jpg";
import Haze from "../img/Haze.jpg";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faWind,
  faCompass,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const apiKey = "9dbd7e3d24e45d5119f8e383e87b4415";
const cityName = "Delhi";

const imgArr = [sunny, rainy, Haze];

function Mausam() {
  const [weatherData, setWeatherData] = useState();
  const [search, setSearch] = useState();
  const classes = useStyles();

  const [weather, setWeather] = useState(1);

  const celcius = (K) => {
    const cel = Math.round(K - 273.15);
    return cel;
  };

  const retriveData = async (city) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    return response.data;
  };

  useEffect(() => {
    console.log("Page Refershed");
    const getdata = async () => {
      const data = await retriveData(cityName);
      if (data) {
        setWeatherData(data);
      }
    };
    getdata();
  }, []);

  let temp = "No data fetched";
  let cname = "Delhi";
  let pressure = "";
  let wind = "";
  let humidity = "";
  let visibility = "";
  let name = "Delhi";
  let country = "IN";
  let description = "";

  if (weatherData) {
    temp = weatherData.main.temp;
    cname = weatherData.name;
    pressure = weatherData.main.pressure;
    wind = weatherData.wind.speed;
    humidity = weatherData.main.humidity;
    visibility = weatherData.visibility;
    name = weatherData.name;
    country = weatherData.sys.country;
    description = weatherData.weather[0].main;
  }

  useEffect(() => {
    if (weatherData) {
      if (weatherData.cod == 200) {
        if (weatherData.weather[0].main == "Clear") {
          setWeather(0);
        } else if (weatherData.weather[0].main == "Clouds") {
          setWeather(1);
        } else if (weatherData.weather[0].main == "Haze") {
          setWeather(2);
        }
        console.log(weatherData.weather[0].main);
      }
    }
  }, [weatherData]);

  const searchHandler = (searchName) => {
    async function getdata() {
      const res = await retriveData(searchName);
      if (res) {
        setWeatherData(res);
      }
    }
    getdata();
  };

  const handler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchHandler(search);
    }
  };

  return (
    <div
      style={{
        height: "700px",
        width: "100%",
        backgroundImage: `url(${imgArr[weather]})`,
      }}
      className={classes.container}
    >
      <Paper
        sx={{
          width: "470px",
          height: "450px",
          marginTop: "2rem",
          background: "rgba(0, 0, 0, 0.6)",
        }}
        className={classes.paper}
      >
        <div>
          <div className={classes.search}>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: 400,
                marginBottom: "2rem",
                background: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                type="text"
                onChange={(event) => setSearch(event.target.value)}
                // onSubmit={searchHandler(search)}
                onKeyPress={(event) => {
                  handler(event);
                }}
              />
              <IconButton
                sx={{ p: "10px" }}
                onClick={() => searchHandler(search)}
              >
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </Paper>
          </div>

          {/* Country name */}

          <div className={classes.text}>
            <h2>
              {name},&nbsp;{country}
            </h2>
          </div>

          {/* Temp */}

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className={classes.temp}>
              <div className={classes.celcius}>{celcius(temp)}</div>
              <div className={classes.degree}>&#x2103; </div>
            </div>
            <h3 style={{ color: "#F5F5F5", fontSize: "1.5rem" }}>
              {description}
            </h3>
          </div>

          {/* Other Data */}
             <div style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              color: "#fff",
            }}>
           
           

          <div
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              color: "#fff",
            }}
          >
            <Paper sx={{background:"rgba(0, 0, 0, 0.4)", margin:"0 1.5rem",paddingTop:"1rem ",paddingBottom:"0"}}>
            <div style={{ display: "flex", justifyContent: "space-around"  }}>
              <Box sx={{ display: "flex" }}>
                <div style={{ width: "3rem" }}>
                  <FontAwesomeIcon
                    icon={faCompass}
                    style={{ fontSize: "1.5rem", padding: "10px 0" ,color:"#fff" }}
                  />
                </div>

                <div className={classes.box}>
                  <span className={classes.value}>{pressure}&nbsp;mbar</span>{" "}
                  <br />
                  <span className={classes.title}>Pressure</span>
                </div>
              </Box>
              <Box sx={{ display: "flex" }}>
                <div style={{ width: "3rem" }}>
                  <FontAwesomeIcon
                    icon={faWind}
                    style={{ fontSize: "1.5rem", padding: "10px 0",color:"#fff" }}
                  />
                </div>

                <div className={classes.box}>
                  <span className={classes.value}>{wind}km/h</span> <br />
                  <span className={classes.title}>Wind Speed</span>
                </div>
              </Box>
            </div>

           

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom:"1.5rem",
                marginTop:"2rem",
                paddingBottom:"1rem"
              }}
            >
              <Box sx={{ display: "flex" }}>
                <div style={{ width: "3rem" }}>
                  <FontAwesomeIcon
                    icon={faDroplet}
                    style={{ fontSize: "1.5rem", padding: "10px 0",color:"#fff" }}
                  />
                </div>
                <div className={classes.box}>
                  <span className={classes.value}>{humidity}%</span> <br />
                  <span className={classes.title}>Humidity</span>
                </div>
              </Box>

              <Box sx={{ display: "flex" }}>
                <div style={{ width: "3rem" }}>
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    style={{ fontSize: "1.25rem", padding: "10px 0" ,color:"#fff"}}
                  />
                </div>

                <div className={classes.box}>
                  <span className={classes.value}>{visibility}m</span>
                  <br />
                  <span className={classes.title}>Visibility</span>
                </div>
              </Box>
            </div>
            </Paper>
          </div>
          
           </div>
        </div>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles({
  text: {
    color: "#fff",
    display: "flex",
    justifyContent: "center",
  },

  paper: {
    // opacity:0.5,
    position: "fixed",
    "&:hover": {
      //  opacity:"0.7"
    },
  },

  input: {
    height: "1.5rem",
    width: "70%",
    //  opacity:0.2,
  },

  container: {
    // background: "#7FFFD4",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    aspectRatio: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  search: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },

  temp: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: "#FF8C00",
    fontSize: "1.5rem",
  },

  celcius: {
    fontSize: "5rem",
    fontWeight: "600",
  },

  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },

  box: {
    width: "7rem",
  },

  title: {
    fontSize: "14  px",
    color:"#fff",
  },

  value: {
    color: "#FFD700",
  },
});

export default Mausam;
