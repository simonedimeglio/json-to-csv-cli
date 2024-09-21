#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const Papa = require("papaparse");
const cliProgress = require("cli-progress");

// Define the version and description of the CLI tool
program.version("1.1.0").description("A CLI tool to convert JSON files to CSV");

// Define the command and its options
program
  .argument("<input>", "Input JSON file path")
  .argument("<output>", "Output CSV file path")
  .option("-d, --delimiter <char>", "CSV delimiter", ",")
  .option("-k, --key <string>", "JSON key to extract (for nested structures)")
  .option("-e, --encoding <encoding>", "File encoding (default: utf8)", "utf8")
  .option("-h, --headers", "Include headers in CSV output", false)
  .action((input, output, options) => {
    convertJsonToCsv(input, output, options);
  });

// Parse the command line arguments
program.parse(process.argv);

/**
 * Converts a JSON file to CSV format
 * @param {string} input - Path to the input JSON file
 * @param {string} output - Path to the output CSV file
 * @param {Object} options - Additional options (e.g., delimiter, key, encoding, headers)
 */
function convertJsonToCsv(input, output, options) {
  try {
    // Read the input JSON file
    const jsonString = fs.readFileSync(input, options.encoding);
    let jsonData = JSON.parse(jsonString);

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

    // Setup progress bar
    const progressBar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
    progressBar.start(jsonData.length, 0);

    // Convert JSON to CSV using PapaParse
    const csv = Papa.unparse(jsonData, {
      delimiter: options.delimiter,
      header: options.headers,
      complete: (results, file) => {
        progressBar.update(results.data.length);
      },
    });

    progressBar.stop();

    // Write the CSV data to the output file
    fs.writeFileSync(output, csv, { encoding: options.encoding });

    console.log(`Successfully converted ${input} to ${output}`);
  } catch (error) {
    handleError(error);
  }
}

/**
 * Handles errors in a more detailed manner
 * @param {Error} error - The error object
 */
function handleError(error) {
  console.error("An error occurred:");
  console.error(`Type: ${error.name}`);
  console.error(`Message: ${error.message}`);
  if (error.stack) {
    console.error("Stack trace:");
    console.error(error.stack);
  }
  process.exit(1);
}
