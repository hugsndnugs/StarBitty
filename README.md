# Star Bitty - Star Citizen Hub

A comprehensive Star Citizen tools website for tracking ships, components, trading, and mining information.

## Features

- **Ships Database**: Browse, filter, and view detailed information about Star Citizen ships
- **Component Database**: Compare and analyze ship components
- **Loadout Builder**: Create and share ship loadouts
- **Trading Tools**: Find profitable trade routes
- **Mining Tools**: Calculate mining profits and find resources

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/star-bitty.git
cd star-bitty
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update with your API keys and configuration

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## UEX API Integration

The project uses the UEX API 2.0 for real Star Citizen data. To enable this feature:

1. Create an account on [UEX Corp](https://uexcorp.space/)
2. Create an app on the "My Apps" page to get your API token
3. Add your token to `.env.local`:
```
UEXCORP_API_TOKEN=your_token_here
```

API documentation: [UEX API Docs](https://uexcorp.space/api/documentation/)

### API Usage Notes

- The API has a limit of 86,400 requests per day (60 requests per minute)
- Authentication is done via Bearer Token
- For production, implement appropriate caching to reduce API calls

## Project Structure

- `/src/app`: Next.js app router pages and API routes
- `/src/components`: Reusable React components
- `/src/lib`: Utilities, models, and API clients
  - `/api`: API client for UEX API
  - `/models`: TypeScript interfaces for data models
- `/public`: Static assets

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is available as open source under the terms of the MIT License.

---

This is a fan-made tool and is not affiliated with Cloud Imperium Games or Roberts Space Industries.
