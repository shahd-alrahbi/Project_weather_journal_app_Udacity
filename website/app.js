
// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// /* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=ee8a4c9cdc25c9c5ca214c96e6d02fc8&units=metric";

// the URL of the server to post data
const server = "http://127.0.0.1:8080";



const generateData = () => { 
  //get value after click on the button
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeatherData return promise
  getWeatherData(zip).then((data) => {
    if (data) {
      const {
        main: { temp },
      } = data;

      const info = {
        newDate,
        temp: Math.round(temp), 
        feelings,
      };

      postData(server + "/add", info);

      updatingUI();
    }
  });
};


document.getElementById("generate").addEventListener("click", generateData);

//Function to GET Web API Data
const getWeatherData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();

    if (data.cod != 200) {
      // display the error message on UI
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

//Function to GET Project Data and updating UI by this data
const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();

    document.getElementById("date").innerHTML = savedData.newDate;
    document.getElementById("temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("content").innerHTML = savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
