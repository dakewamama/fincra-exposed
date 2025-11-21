# Fincra Payout API Wrapper

A production-ready NestJS REST API that wraps Fincra's Payout API. This service enables businesses to send money (payouts) to recipients across multiple countries and currencies with a clean, type-safe interface.

## Features

- ✅ **Business Operations**: Get business details and wallet balances
- ✅ **Payouts**: Create, track, and list payouts (bank transfers, mobile money)
- ✅ **Wallet-to-Wallet**: Internal transfers between Fincra wallets
- ✅ **Beneficiary Management**: Save, list, update, and delete recipients
- ✅ **Reference Data**: Banks, mobile money providers, currencies
- ✅ **Rates & Quotes**: Real-time exchange rates and locked-rate quotes
- ✅ **Type Safety**: Full TypeScript support with interfaces
- ✅ **Validation**: Request validation using class-validator
- ✅ **Error Handling**: Consistent error responses

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Integration Guide](#integration-guide)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Architecture](#architecture)

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Fincra API credentials ([Get them here](https://fincra.com))

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd fincra-payout
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
```

**Getting API Keys:**
- Sandbox: Use Fincra's test environment
- Production: Switch `FINCRA_BASE_URL` to `https://api.fincra.com`

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FINCRA_API_KEY` | Your Fincra API key | - | Yes |
| `FINCRA_BASE_URL` | Fincra API base URL | `https://sandboxapi.fincra.com` | Yes |
| `PORT` | Server port | `3002` | No |

### Switching Environments

**Sandbox (Testing):**
```env
FINCRA_BASE_URL=https://sandboxapi.fincra.com
FINCRA_API_KEY=sandbox_test_key_xyz
```

**Production:**
```env
FINCRA_BASE_URL=https://api.fincra.com
FINCRA_API_KEY=live_key_xyz
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
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "country": "NG",
    "currency": "NGN",
    "status": "active"
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
    "fee": 50,
    "totalAmount": 10050
  }
}
```

#### List Payouts
```bash
GET /fincra/payouts?page=1&perPage=10&status=successful
```

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

#### List Beneficiaries
```bash
GET /fincra/beneficiaries/business/:businessId?page=1&perPage=20
```

#### Get/Update/Delete Beneficiary
```bash
GET /fincra/beneficiaries/:beneficiaryId
PATCH /fincra/beneficiaries/:beneficiaryId
DELETE /fincra/beneficiaries/:beneficiaryId
```

### Reference Data

#### List Banks
```bash
GET /fincra/banks?country=NG&currency=NGN&type=bank
```

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
    "rate": 1580.50,
    "sourceAmount": 1000,
    "destinationAmount": 1580500,
    "fee": 5.00,
    "expiresAt": "2025-11-21T13:00:00Z"
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
    networks:
      - app-network

  your-app:
    build: ./your-app
    depends_on:
      - fincra-api
    environment:
      - FINCRA_SERVICE_URL=http://fincra-api:3002
```

## Testing

### Running Tests
```bash
# All tests
npm test

# Specific test file
npm test -- fincra.service.spec

# With coverage
npm run test:cov

# Watch mode
npm run test:watch
```

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

### Testing Workflow

1. **Unit Tests**: Test service methods in isolation
2. **Integration Tests**: Test controller endpoints
3. **Manual Tests**: Verify with real Fincra API
4. **End-to-End**: Test full payout workflow

## Error Handling

### Error Response Format

All errors follow this structure:
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
    "amount must be a number",
    "email must be an email",
    "bankCode should not be empty"
  ],
  "error": "Bad Request"
}
```

## Architecture

### Project Structure
```
src/
├── fincra/
│   ├── dto/                    # Request validation schemas
│   │   ├── create-payout.dto.ts
│   │   ├── create-beneficiary.dto.ts
│   │   ├── wallet-to-wallet.dto.ts
│   │   └── create-quote.dto.ts
│   ├── interfaces/             # Response type definitions
│   │   ├── business.interface.ts
│   │   ├── wallet.interface.ts
│   │   ├── payout.interface.ts
│   │   ├── beneficiary.interface.ts
│   │   ├── reference.interface.ts
│   │   └── quote.interface.ts
│   ├── fincra.controller.ts   # REST endpoints
│   ├── fincra.service.ts      # Business logic & API calls
│   ├── fincra.module.ts       # Module definition
│   └── *.spec.ts              # Tests
├── app.module.ts
└── main.ts
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
Client
```

### Key Design Decisions

1. **DTO Validation**: All inputs validated before reaching service layer
2. **Type Safety**: Full TypeScript coverage with interfaces
3. **Error Transformation**: Fincra errors wrapped in consistent format
4. **No Mocks**: Tests use real API (with placeholders until keys added)
5. **Separation of Concerns**: Controller → Service → External API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code structure
- Add tests for new features
- Update this README with new endpoints
- Keep DTOs in sync with Fincra API changes

## License

MIT

## Support

- Fincra API Docs: https://docs.fincra.com
- Issues: Open a GitHub issue
- Email: support@yourcompany.com

## Roadmap

- [ ] Add Swagger/OpenAPI documentation
- [ ] Add rate limiting
- [ ] Add request/response logging
- [ ] Add webhook handlers
- [ ] Add bulk payout operations
- [ ] Add retry logic for failed payouts

---

Built with ❤️ using NestJS and TypeScript
