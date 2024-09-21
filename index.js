#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const Papa = require("papaparse");

// Define the version and description of the CLI tool
program.version("1.0.0").description("A CLI tool to convert JSON files to CSV");

// Define the command and its options
program
  .argument("<input>", "Input JSON file path")
  .argument("<output>", "Output CSV file path")
  .option("-d, --delimiter <char>", "CSV delimiter", ",")
  .option("-k, --key <string>", "JSON key to extract (for nested structures)")
  .action((input, output, options) => {
    convertJsonToCsv(input, output, options);
  });

// Parse the command line arguments
program.parse(process.argv);

/**
 * Converts a JSON file to CSV format
 * @param {string} input - Path to the input JSON file
 * @param {string} output - Path to the output CSV file
 * @param {Object} options - Additional options (e.g., delimiter, key)
 */
function convertJsonToCsv(input, output, options) {
  try {
    // Read the input JSON file
    let jsonData = JSON.parse(fs.readFileSync(input, "utf8"));

    // If a key is specified, extract that part of the JSON
    if (options.key) {
      const keys = options.key.split(".");
      for (const key of keys) {
        if (jsonData && typeof jsonData === "object" && key in jsonData) {
          jsonData = jsonData[key];
        } else {
          throw new Error(`Key "${options.key}" not found in JSON structure`);
        }
      }
    }

    // Ensure jsonData is an array
    if (!Array.isArray(jsonData)) {
      jsonData = [jsonData];
    }

    // Convert JSON to CSV using PapaParse
    const csv = Papa.unparse(jsonData, {
      delimiter: options.delimiter,
    });

    // Write the CSV data to the output file
    fs.writeFileSync(output, csv);

    console.log(`Successfully converted ${input} to ${output}`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}
