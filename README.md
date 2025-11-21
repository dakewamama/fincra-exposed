# Fincra Payout API Wrapper

A production-ready NestJS REST API that wraps Fincra's Payout API. This service enables businesses to send money (payouts) to recipients across multiple countries and currencies with a clean, type-safe interface.

## Features

- **Business Operations**: Get business details and wallet balances
- **Payouts**: Create, track, and list payouts (bank transfers, mobile money)
- **Wallet-to-Wallet**: Internal transfers between Fincra wallets
- **Beneficiary Management**: Save, list, update, and delete recipients
- **Reference Data**: Banks, mobile money providers, currencies, countries
- **Rates & Quotes**: Real-time exchange rates and locked-rate quotes
- **Type Safety**: Full TypeScript support with interfaces and enums
- **Validation**: Request validation using class-validator with detailed error messages
- **Error Handling**: Consistent error responses with global exception filter
- **Health Check**: Service health monitoring endpoint
- **Environment Validation**: Schema-based configuration validation with Joi

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Integration Guide](#integration-guide)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Roadmap](#roadmap)

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Fincra API credentials ([Get them here](https://fincra.com))

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/dakewamama/fincra-exposed.git
cd fincra-exposed/fincra-payout
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
FINCRA_API_KEY=your_fincra_api_key_here
FINCRA_BASE_URL=https://sandboxapi.fincra.com
PORT=3002
NODE_ENV=development
```

**Getting API Keys:**
- Sandbox: Use Fincra's test environment
- Production: Switch `FINCRA_BASE_URL` to `https://api.fincra.com`

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FINCRA_API_KEY` | Your Fincra API key | - | Yes |
| `FINCRA_BASE_URL` | Fincra API base URL | - | Yes |
| `PORT` | Server port | `3002` | No |
| `NODE_ENV` | Environment (development, production, test) | `development` | No |

### Switching Environments

**Sandbox (Testing):**
```env
FINCRA_BASE_URL=https://sandboxapi.fincra.com
FINCRA_API_KEY=sandbox_test_key_xyz
NODE_ENV=development
```

**Production:**
```env
FINCRA_BASE_URL=https://api.fincra.com
FINCRA_API_KEY=live_key_xyz
NODE_ENV=production
```

## Running the API

### Development Mode
```bash
npm run start:dev
```
Server runs on `http://localhost:3002` with hot reload.

### Production Mode
```bash
npm run build
npm run start:prod
```

### Docker (Optional)
```bash
docker build -t fincra-payout .
docker run -p 3002:3002 --env-file .env fincra-payout
```

## API Endpoints

### Health Check

#### Get Service Status
```bash
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "info": {
    "fincra-wrapper": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "fincra-wrapper": {
      "status": "up"
    }
  }
}
```

### Business & Wallets

#### Get Business Details
```bash
GET /fincra/business
```

**Response:**
```json
{
  "status": true,
  "message": "Business retrieved successfully",
  "data": {
    "id": "business-id-123",
    "name": "Your Business",
    "email": "contact@business.com",
    "country": "NG",
    "currency": "NGN",
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Get Wallet Balances
```bash
GET /fincra/wallets/:businessId
```

**Response:**
```json
{
  "status": true,
  "data": [
    {
      "currency": "NGN",
      "availableBalance": 500000.00,
      "ledgerBalance": 500000.00
    },
    {
      "currency": "USD",
      "availableBalance": 1000.00,
      "ledgerBalance": 1000.00
    }
  ]
}
```

### Payouts

#### Create Payout
```bash
POST /fincra/payouts
Content-Type: application/json
```

**Request:**
```json
{
  "business": "business-id-123",
  "sourceCurrency": "NGN",
  "destinationCurrency": "NGN",
  "amount": 10000,
  "description": "Salary payment",
  "customerReference": "PAY-001",
  "beneficiary": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "type": "individual",
    "accountHolderName": "John Doe",
    "accountNumber": "1234567890",
    "country": "NG",
    "bankCode": "044"
  },
  "paymentDestination": "bank_account"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Payout created successfully",
  "data": {
    "id": "payout-xyz",
    "reference": "FINCRA-REF-123",
    "customerReference": "PAY-001",
    "status": "pending",
    "amount": 10000,
    "sourceCurrency": "NGN",
    "destinationCurrency": "NGN",
    "fee": 50,
    "totalAmount": 10050,
    "paymentDestination": "bank_account",
    "createdAt": "2025-11-21T12:00:00.000Z"
  }
}
```

#### List Payouts
```bash
GET /fincra/payouts?page=1&perPage=10&status=successful
```

**Query Parameters:**
- `page`: Page number (optional)
- `perPage`: Results per page (optional)
- `status`: Filter by status - `pending`, `processing`, `successful`, `failed`, `cancelled` (optional)

#### Get Payout by Reference
```bash
GET /fincra/payouts/:reference
GET /fincra/payouts/by-customer-reference/:customerReference
```

#### Wallet-to-Wallet Transfer
```bash
POST /fincra/payouts/wallet-to-wallet
Content-Type: application/json
```

**Request:**
```json
{
  "business": "business-id-123",
  "customerReference": "W2W-001",
  "amount": 5000,
  "currency": "NGN",
  "description": "Internal transfer",
  "recipientEmail": "recipient@example.com"
}
```

### Beneficiaries

#### Create Beneficiary
```bash
POST /fincra/beneficiaries
Content-Type: application/json
```

**Request:**
```json
{
  "business": "business-id-123",
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "type": "individual",
  "accountHolderName": "Jane Doe",
  "accountNumber": "9876543210",
  "country": "NG",
  "currency": "NGN",
  "paymentDestination": "bank_account",
  "bankCode": "044"
}
```

**Valid Types:**
- `individual`: Personal accounts
- `corporate`: Business accounts

**Valid Payment Destinations:**
- `bank_account`: Bank transfers
- `mobile_money_wallet`: Mobile money

#### List Beneficiaries
```bash
GET /fincra/beneficiaries/business/:businessId?page=1&perPage=20
```

#### Get Beneficiary
```bash
GET /fincra/beneficiaries/:beneficiaryId
```

#### Update Beneficiary
```bash
PATCH /fincra/beneficiaries/:beneficiaryId
Content-Type: application/json
```

**Request:**
```json
{
  "email": "newemail@example.com",
  "firstName": "Updated Name"
}
```

#### Delete Beneficiary
```bash
DELETE /fincra/beneficiaries/:beneficiaryId
```

### Reference Data

#### List Banks
```bash
GET /fincra/banks?country=NG&currency=NGN&type=bank
```

**Query Parameters:**
- `country`: Two-letter country code (e.g., NG, GH, KE)
- `currency`: Three-letter currency code (e.g., NGN, USD)
- `type`: `bank` or `mobile_money`

**Response:**
```json
{
  "status": true,
  "data": [
    {
      "id": "bank-001",
      "name": "Access Bank",
      "code": "044",
      "type": "bank",
      "country": "NG",
      "currency": "NGN"
    }
  ]
}
```

#### Get Supported Currencies
```bash
GET /fincra/currencies
```

**Response:**
```json
{
  "status": true,
  "data": [
    {
      "code": "NGN",
      "name": "Nigerian Naira",
      "symbol": "₦"
    },
    {
      "code": "USD",
      "name": "US Dollar",
      "symbol": "$"
    }
  ]
}
```

#### Get Supported Countries
```bash
GET /fincra/countries
```

**Response:**
```json
{
  "status": true,
  "data": [
    {
      "code": "NG",
      "name": "Nigeria",
      "currency": "NGN"
    },
    {
      "code": "GH",
      "name": "Ghana",
      "currency": "GHS"
    }
  ]
}
```

### Rates & Quotes

#### Get Exchange Rate
```bash
GET /fincra/rates?sourceCurrency=USD&destinationCurrency=NGN
```

**Response:**
```json
{
  "status": true,
  "data": {
    "sourceCurrency": "USD",
    "destinationCurrency": "NGN",
    "rate": 1580.50,
    "inverseRate": 0.00063
  }
}
```

#### Create Quote (Locked Rate)
```bash
POST /fincra/quotes
Content-Type: application/json
```

**Request:**
```json
{
  "business": "business-id-123",
  "sourceCurrency": "USD",
  "destinationCurrency": "NGN",
  "amount": 1000
}
```

**Response:**
```json
{
  "status": true,
  "data": {
    "id": "quote-xyz",
    "business": "business-id-123",
    "sourceCurrency": "USD",
    "destinationCurrency": "NGN",
    "sourceAmount": 1000,
    "destinationAmount": 1580500,
    "rate": 1580.50,
    "fee": 5.00,
    "expiresAt": "2025-11-21T13:00:00Z",
    "createdAt": "2025-11-21T12:00:00Z"
  }
}
```

## Integration Guide

### Using with Your Frontend

**React Example:**
```javascript
const createPayout = async (payoutData) => {
  const response = await fetch('http://localhost:3002/fincra/payouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payoutData)
  });
  
  const result = await response.json();
  
  if (result.statusCode >= 400) {
    throw new Error(result.message);
  }
  
  return result.data;
};

// Usage
try {
  const payout = await createPayout({
    business: 'business-id-123',
    sourceCurrency: 'NGN',
    destinationCurrency: 'NGN',
    amount: 10000,
    description: 'Payment',
    customerReference: 'PAY-001',
    beneficiary: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      type: 'individual',
      accountHolderName: 'John Doe',
      accountNumber: '1234567890',
      country: 'NG',
      bankCode: '044'
    },
    paymentDestination: 'bank_account'
  });
  
  console.log('Payout created:', payout.reference);
} catch (error) {
  console.error('Failed:', error.message);
}
```

### Dynamic Form Options

Fetch supported options to populate form dropdowns:
```javascript
// Fetch options on component mount
const [countries, setCountries] = useState([]);
const [currencies, setCurrencies] = useState([]);
const [banks, setBanks] = useState([]);

useEffect(() => {
  async function fetchOptions() {
    const [countriesRes, currenciesRes] = await Promise.all([
      fetch('http://localhost:3002/fincra/countries'),
      fetch('http://localhost:3002/fincra/currencies')
    ]);
    
    setCountries((await countriesRes.json()).data);
    setCurrencies((await currenciesRes.json()).data);
  }
  
  fetchOptions();
}, []);

// Fetch banks when country changes
useEffect(() => {
  if (selectedCountry) {
    fetch(`http://localhost:3002/fincra/banks?country=${selectedCountry}`)
      .then(r => r.json())
      .then(data => setBanks(data.data));
  }
}, [selectedCountry]);
```

### Using with Another Backend Service

**Node.js/Express Example:**
```javascript
const axios = require('axios');

const fincraClient = axios.create({
  baseURL: 'http://localhost:3002/fincra',
  timeout: 30000
});

// Create payout
const payout = await fincraClient.post('/payouts', {
  business: 'business-id',
  amount: 10000,
  // ... other fields
});

// Get wallet balance
const wallets = await fincraClient.get('/wallets/business-id');

// List payouts with filters
const payouts = await fincraClient.get('/payouts', {
  params: {
    page: 1,
    perPage: 20,
    status: 'successful'
  }
});
```

### Using as a Microservice

Add to your `docker-compose.yml`:
```yaml
services:
  fincra-api:
    build: ./fincra-payout
    ports:
      - "3002:3002"
    environment:
      - FINCRA_API_KEY=${FINCRA_API_KEY}
      - FINCRA_BASE_URL=${FINCRA_BASE_URL}
      - NODE_ENV=production
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3002/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  your-app:
    build: ./your-app
    depends_on:
      - fincra-api
    environment:
      - FINCRA_SERVICE_URL=http://fincra-api:3002
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Testing

### Running Tests
```bash
# All tests
npm test

# Specific test file
npm test -- fincra.service.spec

# E2E tests
npm run test:e2e

# With coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Results

The test suite includes:
- **Unit Tests**: 18 service method tests (hitting real Fincra API)
- **E2E Tests**: 3 integration tests
- **Validation Tests**: Request body validation

Expected behavior:
- Tests with placeholder API keys will return 401 errors (this is correct)
- With real API keys, tests will hit actual Fincra endpoints

### Manual Testing with Real API

1. **Get API credentials** from Fincra dashboard
2. **Update `.env`** with real keys
3. **Get your business ID:**
```bash
curl http://localhost:3002/fincra/business
```

4. **Test wallet balance:**
```bash
curl http://localhost:3002/fincra/wallets/YOUR_BUSINESS_ID
```

5. **Test payout creation:**
```bash
curl -X POST http://localhost:3002/fincra/payouts \
  -H "Content-Type: application/json" \
  -d '{
    "business": "YOUR_BUSINESS_ID",
    "sourceCurrency": "NGN",
    "destinationCurrency": "NGN",
    "amount": 1000,
    "description": "Test payout",
    "customerReference": "TEST-001",
    "beneficiary": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "type": "individual",
      "accountHolderName": "Test User",
      "accountNumber": "1234567890",
      "country": "NG",
      "bankCode": "044"
    },
    "paymentDestination": "bank_account"
  }'
```

6. **Test validation:**
```bash
curl -X POST http://localhost:3002/fincra/payouts \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Testing Workflow

1. **Unit Tests**: Verify service methods work correctly
2. **E2E Tests**: Test full request/response cycle
3. **Manual Tests**: Verify with real Fincra API
4. **Integration Tests**: Test in your application context

## Error Handling

### Error Response Format

All errors follow this consistent structure:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": {
    "message": "Invalid account number"
  },
  "timestamp": "2025-11-21T12:00:00.000Z"
}
```

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| 400 | Bad Request - Validation failed | Check request body against DTOs |
| 401 | Unauthorized - Invalid API key | Verify `FINCRA_API_KEY` in `.env` |
| 404 | Not Found - Resource doesn't exist | Check IDs and references |
| 422 | Unprocessable - Business logic error | Review Fincra's error message |
| 500 | Internal Server Error | Check logs, contact support |

### Validation Errors

Request body validation provides detailed feedback:
```json
{
  "statusCode": 400,
  "message": [
    "amount must be a number conforming to the specified constraints",
    "amount must be greater than or equal to 1",
    "email must be an email",
    "bankCode should not be empty",
    "type must be one of the following values: individual, corporate"
  ],
  "error": "Bad Request",
  "timestamp": "2025-11-21T12:00:00.000Z"
}
```

## Architecture

### Project Structure
```
src/
├── common/
│   └── filters/
│       └── http-exception.filter.ts    # Global exception handling
├── config/
│   └── configuration.ts                # Environment validation schema
├── fincra/
│   ├── dto/                            # Request validation schemas
│   │   ├── create-payout.dto.ts
│   │   ├── create-beneficiary.dto.ts
│   │   ├── wallet-to-wallet.dto.ts
│   │   └── create-quote.dto.ts
│   ├── enums/                          # Type-safe enumerations
│   │   └── index.ts                    # BeneficiaryType, PaymentDestination, PayoutStatus
│   ├── interfaces/                     # Response type definitions
│   │   ├── business.interface.ts
│   │   ├── wallet.interface.ts
│   │   ├── payout.interface.ts
│   │   ├── beneficiary.interface.ts
│   │   ├── reference.interface.ts
│   │   ├── quote.interface.ts
│   │   └── error.interface.ts
│   ├── fincra.controller.ts           # REST endpoints
│   ├── fincra.service.ts              # Business logic & API calls
│   ├── fincra.module.ts               # Module definition
│   ├── fincra.controller.spec.ts      # Controller tests
│   └── fincra.service.spec.ts         # Service tests
├── health/
│   ├── health.controller.ts           # Health check endpoint
│   └── health.module.ts
├── app.module.ts                       # Root module
└── main.ts                             # Application entry point
```

### Data Flow
```
Client Request
    ↓
Controller (Validation via DTOs)
    ↓
Service (Business Logic)
    ↓
Axios HTTP Client (+ API Key)
    ↓
Fincra API
    ↓
Response (Typed via Interfaces)
    ↓
Global Exception Filter (on errors)
    ↓
Client Response
```

### Key Design Decisions

1. **DTO Validation**: All inputs validated before reaching service layer
   - Uses `class-validator` decorators
   - Provides detailed error messages
   - Includes `@Min()` for amounts, `@IsEnum()` for types

2. **Type Safety**: Full TypeScript coverage
   - Interfaces for all API responses
   - Enums for constant values (BeneficiaryType, PaymentDestination, PayoutStatus)
   - No `any` types in production code

3. **Error Transformation**: Fincra errors wrapped in consistent format
   - Global exception filter for uniform responses
   - Typed error responses with `FincraErrorResponse` interface
   - Detailed error context with timestamps

4. **Environment Validation**: Schema-based configuration with Joi
   - Validates all required environment variables on startup
   - Prevents app from starting with invalid config

5. **Separation of Concerns**: Controller → Service → External API
   - Controllers handle HTTP concerns
   - Services contain business logic
   - Clean separation for testing

6. **Health Monitoring**: Built-in health check endpoint
   - Monitor service availability
   - Integrate with container orchestration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code structure and patterns
- Add tests for new features
- Update this README with new endpoints
- Keep DTOs in sync with Fincra API changes
- Use TypeScript interfaces and enums for type safety
- Follow NestJS best practices

## License

MIT

## Support

- **Fincra API Docs**: https://docs.fincra.com
- **Issues**: Open a GitHub issue
- **Repository**: https://github.com/dakewamama/fincra-exposed

## Roadmap

- [ ] Add Swagger/OpenAPI documentation
- [ ] Add rate limiting middleware
- [ ] Add request/response logging
- [ ] Add webhook signature verification
- [ ] Add bulk payout operations
- [ ] Add retry logic for failed payouts
- [ ] Add payout cancellation endpoint
- [ ] Add transaction history endpoint
- [ ] Add caching for reference data (banks, currencies)
- [ ] Add request idempotency

---

**Built with NestJS and TypeScript**

**Project Status**: Production Ready ✅

**Test Coverage**: 21 tests (18 unit + 3 e2e)

**API Endpoints**: 19 total
