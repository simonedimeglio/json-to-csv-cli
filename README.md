# JSON to CSV CLI Tool

A simple command-line interface (CLI) tool to convert JSON files to CSV format. This tool is particularly useful for data analysts, developers, and anyone working with data transformation tasks.

## Features

- Convert JSON files to CSV format
- Handle nested JSON structures
- Customize CSV delimiter
- Easy to use command-line interface

## Installation

To install the JSON to CSV CLI tool globally on your system, run:

```bash
npm install -g json-to-csv-cli
```

## Usage

The basic syntax for using the tool is:

```bash
json-to-csv <input_json_file> <output_csv_file> [options]
```

### Options

- `-d, --delimiter <char>`: Specify the CSV delimiter (default: ',')
- `-k, --key <string>`: JSON key to extract (for nested structures)
- `-h, --help`: Display help information
- `-V, --version`: Display version information

### Examples

1. Basic conversion:

   ```bash
   json-to-csv input.json output.csv
   ```

2. Using a custom delimiter:

   ```bash
   json-to-csv input.json output.csv -d ";"
   ```

3. Extracting nested data:

   ```bash
   json-to-csv input.json output.csv -k "users"
   ```

4. Combining options:
   ```bash
   json-to-csv input.json output.csv -d ";" -k "data.users"
   ```

## Development

To set up the project for development:

1. Clone the repository:

   ```bash
   git clone https://github.com/simonedimeglio/json-to-csv-cli.git
   cd json-to-csv-cli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make your changes and test them:
   ```bash
   node index.js test-data.json output.csv -k users
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Commander.js](https://github.com/tj/commander.js/) for CLI argument parsing
- [PapaParse](https://www.papaparse.com/) for CSV parsing and generation

## Contact

Simone Di Meglio - [Your Email or GitHub Profile]

Project Link: [https://github.com/simonedimeglio/json-to-csv-cli](https://github.com/simonedimeglio/json-to-csv-cli)
