// Recommended order for your solution:
// 1. Install the dotenv package.
// 2. Add a dotenv file, put the API key in dotenv and print it.
// 3. Install the node-fetch package.
// 4. Create a method that calls the API to get temperature using node-fetch.
// 5. Install the commander package.
// 6. Create a basic commander skeleton without the actions implementation (just the metadata and commands configuration).
// 7. Implement the first command, including the optional arguments.
// 8. BONUS - Implement the second command.

// Commander usage example for your reference:
import chalk from "chalk";
import fetch from "node-fetch";
import { Command } from "commander";
import dotenv from "dotenv";
const program = new Command();

dotenv.config();

const apiKey = process.env.API_KEY;
console.log(`API Key: ${apiKey}`);

async function getTemp(city, scale) {
  if (scale === "f") scale = "imperial";
  else scale = "metric";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${scale}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

program.name("weather").description("The best CLI weather").version("1.0.0");

program
  .command("get-temp")
  .description("Get Temperatures ")
  .argument("<city>", "city")
  .option("-s, --scale <string>", "Scale", "c")
  .action((city, options) => {
    getTemp(city, options.scale).then((data) =>
      console.log(`It's ${data.main.temp} degrees in ${data.name}`)
    );
  });

program.parse();
