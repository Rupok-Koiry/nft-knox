const countryInput = document.querySelector("#countryInput");
const stateInput = document.querySelector("#stateInput");
const cityInput = document.querySelector("#cityInput");

const countryDataList = document.querySelector("#countryDatalist");
const stateDataList = document.querySelector("#stateDatalist");
const cityDataList = document.querySelector("#cityDatalist");

let authToken;

const clearInputs = () => {
  stateDataList.textContent = "";
  cityDataList.textContent = "";
};
stateInput.addEventListener("change", async (event) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };
  const cities = await axios.get(
    `https://www.universal-tutorial.com/api/cities/${event.target.value}`,
    { headers }
  );
  clearInputs();
  cities.data.forEach((city) => {
    const option = `<option value="${city.city_name}">${city.city_name}</option> `;
    cityDataList.insertAdjacentHTML("beforeend", option);
  });
  const other_option = `<option value=" ">*Other</option> `;
  cityDataList.insertAdjacentHTML("beforeend", other_option);
});

countryInput.addEventListener("change", async (event) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };
  const states = await axios.get(
    `https://www.universal-tutorial.com/api/states/${event.target.value}`,
    { headers }
  );
  clearInputs();
  states.data.forEach((state) => {
    const option = `<option value="${state.state_name}">${state.state_name}</option> `;
    stateDataList.insertAdjacentHTML("beforeend", option);
  });
  const other_option = `<option value=" ">*Other</option> `;
  stateDataList.insertAdjacentHTML("beforeend", other_option);
});

const loadCountries = async (authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };
  const countries = await axios.get(
    "https://www.universal-tutorial.com/api/countries/",
    { headers }
  );
  countries.data.forEach((country) => {
    const option = `<option value="${country.country_name}">${country.country_name}</option> `;
    countryDataList.insertAdjacentHTML("beforeend", option);
  });
  const other_option = `<option value=" ">*Other</option> `;
  countryDataList.insertAdjacentHTML("beforeend", other_option);
};

const initApi = async () => {
  const headers = {
    Accept: "application/json",
    "api-token":
      "OFdfLDkFnoffanZk7kmYw6fuplcM3ZGyCzQjjJ8BzpalbAtpPIzukmSWD8wNND2cFZ4",
    "user-email": "koiry.rupok@gmail.com",
  };
  const response = await axios.get(
    "https://www.universal-tutorial.com/api/getaccesstoken",
    {
      headers,
    }
  );
  authToken = response.data.auth_token;
  loadCountries(response.data.auth_token);
};
initApi();
