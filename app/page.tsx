"use client";

import {useState} from "react";
import styled from "styled-components";

type WeatherData = {
  currentConditions:{
    temp: number;
    conditions: string;
  }
}
const PageContainer = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: lightgrey;
padding: 20px;
`;

const Title = styled.h1`
font-size: 35px;
color: darkblue;
margin-bottom: 8px;
`;

const SearchInput = styled.input`
  font-size: 16px;
  padding: 10px 15px;
border: 1px solid lightgray;
border-radius: 8px;
`;

const SearchButton = styled.button`
padding: 10px 15px;
`;
export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  async function handleButton() {
    if (city == ""){
      console.log("Please enter city.");
      return;
    }

    try {
      const response = await fetch(`/api/weather?city=${city}`);

      if(!response.ok)
      {
        console.log("Failed to get weather.");
        return;
      }
      const data = await response.json();

      setWeather(data);
    } catch {
      console.log("Something went wrong!");
    }
  }
  return (
    <PageContainer>
      <Title>Weather Forecast</Title>
      <a href="/about">About Us</a>
      <p>Search for a city.</p>

      <SearchInput
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        />

      <SearchButton onClick={handleButton}>
        Search Weather
      </SearchButton>

      {weather != null ?(
          <div>
            <h2>Current Weather</h2>
            <p>Temperature: {weather.currentConditions.temp}°F</p>
            <p>Conditions: {weather.currentConditions.conditions}</p>
          </div>
      ) : null}
    </PageContainer>
  );
};

