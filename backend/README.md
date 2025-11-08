# BluPrint Backend

A TypeScript Express.js API for the BluPrint construction project management application.

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Setup

1. **Start the application**:

   ```bash
   docker-compose up -d
   ```

2. **Verify everything is working**:
   ```bash
   curl http://localhost:3000/health
   # Should return: {"status":"ok"}
   ```

## 🚀 Core API Endpoints

### Base URL: `http://localhost:3000`

### 🔍 **1. Search Products** - `GET /api/search`

Search and filter products with various criteria.

**Query Parameters:**

- `q` - Search term (searches name, category, vendor)
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter

**Examples:**

```bash
# Search for LED products
curl "http://localhost:3000/api/search?q=LED"

# Search Tools under $50
curl "http://localhost:3000/api/search?category=Tools&maxPrice=50"

# Search with multiple filters
curl "http://localhost:3000/api/search?q=smart&minPrice=10&maxPrice=30"
```

**Response:**

```json
{
  "results": [
    {
      "id": 1,
      "name": "LED Light Strip",
      "price": 25.99,
      "category": "Lighting",
      "vendor": "TechSupply Co",
      "rating": 4.5
    }
  ],
  "total": 1,
  "query": { "q": "LED" }
}
```

### ⚖️ **2. Compare Products** - `POST /api/compare`

Compare multiple products with metrics analysis.

**Request Body:**

```json
{
  "productIds": [1, 2, 3]
}
```

**Example:**

```bash
curl -X POST http://localhost:3000/api/compare \
  -H "Content-Type: application/json" \
  -d '{"productIds":[1,2]}'
```

**Response:**

```json
{
  "products": [...],
  "metrics": {
    "priceRange": {"min": 15.99, "max": 25.99},
    "avgRating": "4.3",
    "categories": ["Lighting", "Electronics"],
    "vendors": ["TechSupply Co", "SmartHome Inc"]
  }
}
```

### 🛒 **3. Cart Management**

#### Get Cart - `GET /api/cart`

```bash
curl http://localhost:3000/api/cart
```

**Response:**

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "product": {...},
      "subtotal": 51.98
    }
  ],
  "total": 64.97,
  "itemCount": 3
}
```

#### Add to Cart - `POST /api/cart`

```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

#### Update Cart Item - `PUT /api/cart/:productId`

```bash
curl -X PUT http://localhost:3000/api/cart/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'
```

#### Remove from Cart - `DELETE /api/cart/:productId`

```bash
curl -X DELETE http://localhost:3000/api/cart/1
```

### 🏗️ **4. Projects Management**

#### List Projects - `GET /api/projects`

```bash
curl http://localhost:3000/api/projects
```

**Response:**

```json
{
  "projects": [
    {
      "id": 1,
      "name": "Kitchen Renovation",
      "description": "Complete kitchen makeover",
      "items": [1, 2],
      "createdAt": "2024-10-15",
      "itemCount": 2,
      "products": [...]
    }
  ],
  "total": 2
}
```

#### Get Project Details - `GET /api/projects/:id`

```bash
curl http://localhost:3000/api/projects/1
```

**Response includes `totalCost` calculation.**

#### Create Project - `POST /api/projects`

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bathroom Remodel",
    "description": "Modern bathroom update",
    "items": [1, 3]
  }'
```

#### Update Project - `PUT /api/projects/:id`

```bash
curl -X PUT http://localhost:3000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Project Name", "items": [1, 2, 3]}'
```

## 📊 Mock Data

### Products (5 items)

```json
[
  {
    "id": 1,
    "name": "LED Light Strip",
    "price": 25.99,
    "category": "Lighting",
    "vendor": "TechSupply Co",
    "rating": 4.5
  },
  {
    "id": 2,
    "name": "Smart Switch",
    "price": 15.99,
    "category": "Electronics",
    "vendor": "SmartHome Inc",
    "rating": 4.2
  },
  {
    "id": 3,
    "name": "USB-C Cable",
    "price": 12.99,
    "category": "Cables",
    "vendor": "CablePro",
    "rating": 4.8
  },
  {
    "id": 4,
    "name": "Power Drill",
    "price": 89.99,
    "category": "Tools",
    "vendor": "ToolMaster",
    "rating": 4.6
  },
  {
    "id": 5,
    "name": "Screwdriver Set",
    "price": 29.99,
    "category": "Tools",
    "vendor": "ToolMaster",
    "rating": 4.3
  }
]
```

### Projects (2 items)

```json
[
  {
    "id": 1,
    "name": "Kitchen Renovation",
    "description": "Complete kitchen makeover",
    "items": [1, 2],
    "createdAt": "2024-10-15"
  },
  {
    "id": 2,
    "name": "Home Office Setup",
    "description": "Setting up a productive workspace",
    "items": [2, 3],
    "createdAt": "2024-10-20"
  }
]
```

### Initial Cart Items

```json
[
  { "productId": 1, "quantity": 2 },
  { "productId": 3, "quantity": 1 }
]
```

## 🔧 Development Info

### Health Check Endpoints

- `GET /` - Returns: "Server is up and running!"
- `GET /health` - Returns: `{"status":"ok"}`
- `GET /ping` - Returns: `{"message":"pong"}`

### Server Details

- **Port**: 3000
- **Environment**: Development with hot reload
- **TypeScript**: Full TypeScript support
- **Docker**: Runs in node:20-alpine container

## � API Status

| Feature | Endpoint | Status | Description |
|---------|----------|---------|-------------|
| Search | `GET /api/search` | ✅ Working | Product search with filters |
| Compare | `POST /api/compare` | ✅ Working | Product comparison with metrics |
| Cart | `GET/POST/PUT/DELETE /api/cart` | ✅ Working | Full cart CRUD operations |
| Projects | `GET/POST/PUT /api/projects` | ✅ Working | Project management |
| Health | `GET /health` | ✅ Working | Server health check |

## 🔄 Next Steps

### Database Integration (Future)
Currently using mock data in memory. To connect to PostgreSQL:

1. **Install database client:**
   ```bash
   npm install pg @types/pg
   ```

2. **Replace mock data** in `src/server.ts` with database queries
3. **Add database connection** configuration
4. **Create database tables** matching the mock data structure

### PostgreSQL Commands (When Connected)
```bash
# View database tables
docker exec bluprnt-db psql -U app -d bluprnt_dev -c "\dt"

# Query products
docker exec bluprnt-db psql -U app -d bluprnt_dev -c "SELECT * FROM products;"
```

## 🔧 Development Commands

### Container Management
```bash
# View running containers
docker-compose ps

# Restart backend container
docker-compose restart backend

# View backend logs
docker-compose logs --tail=20 backend

# Start all services
docker-compose up -d
```

### Development Server
```bash
# The server runs automatically in Docker with hot reload
# Check logs: docker-compose logs backend

# If running locally (optional):
npm run dev
npm run build
npm start
```

## 🛠️ Troubleshooting

### Database Connection Issues

**Check if containers are running:**

```bash
docker ps --filter "name=bluprnt"
```

**Check database connectivity:**

```bash
docker exec bluprnt-db psql -U app -d appdb -c "SELECT NOW();"
```

**Restart containers:**

```bash
docker-compose restart
```

### Container Issues

**View container logs:**

```bash
# Backend logs
docker logs bluprnt-backend

# Database logs
docker logs bluprnt-db
```

**Enter container for debugging:**

```bash
# Backend container
docker exec -it bluprnt-backend sh

# Database container
docker exec -it bluprnt-db bash
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts                # Application entry point
│   └── server.ts               # Express server with all endpoints & mock data
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This documentation
```

## 📚 Tech Stack

- **Runtime**: Node.js 20 (Alpine)
- **Framework**: Express.js 4.19.2
- **Language**: TypeScript 5.9.3
- **Development**: ts-node-dev for hot reload
- **Container**: Docker with docker-compose
- **Data**: Mock data (in-memory, ready for database integration)

## 🚧 Development Roadmap

### ✅ Completed
- [x] Core API endpoints (search, compare, cart, projects)
- [x] Mock data structures
- [x] TypeScript Express setup
- [x] Docker containerization
- [x] Hot reload development environment

### 🔄 Next Steps
- [ ] Connect to PostgreSQL database
- [ ] Add input validation middleware  
- [ ] Implement user authentication
- [ ] Add comprehensive error handling
- [ ] Create unit tests
- [ ] Add API documentation (OpenAPI/Swagger)
- [ ] Implement logging framework

## �️ Troubleshooting

### Common Issues

**Check container status:**
```bash
docker-compose ps
```

**View logs:**
```bash
docker-compose logs backend
```

**Restart services:**
```bash
docker-compose restart backend
```

**Test endpoints:**
```bash
curl http://localhost:3000/health
# Should return: {"status":"ok"}
```
