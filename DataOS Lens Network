DataOS Lens provides a PgWire Protocol (https://www.postgresql.org/docs/current/protocol.html) compatible semantic layer that enables SQL querying through a sophisticated network architecture. 

> Network Flow Diagram

```mermaid
graph LR
    A[PG Clients] -->|TCP/6432| B[Kong<br/>Gateway]
    B -->|TCP/6432<br/>PgWire Protocol| C[Postern<br/><Transparent Proxy>]
    C -->|TCP/5432| D[DataOS Lens]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
```

#### Kong (Gateway)

Kong serves as the entry point for DataOS Lens database connections, functioning as a "lightweight, fast, and flexible cloud-native API gateway" (https://developer.konghq.com/). In the Lens architecture, Kong specifically handles PgWire protocol connections on port 6432, receiving client connections and forwarding them to Postern for further processing.

You have 3 configuration params, related to connection management: 

| Parameter | Purpose | Use Case |
|-----------|---------|----------|
| `connect_timeout` | Connection establishment to Postern | Quickly detect unavailable instances |
| `send_timeout` | Query data transmission to Postern | Handle varying query complexity |
| `read_timeout` | Response waiting from Postern | Accommodate complex analytical queries |

You can define them via Service Annotations:
```yaml
serviceAnnotations:
    konghq.com/connect-timeout: "300000" # 5 minutes - plenty of time to connect
    konghq.com/read-timeout: "300000"    # 5 minutes - good for most queries
    konghq.com/send-timeout: "300000"    # 5 minutes - handles large result sets
```

#### Postern (Transparent Proxy)
Think of Postern as your smart traffic controller! It sits between Kong and your Lens instances, making sure your database connections get routed to exactly the right place.

Here's how Postern makes your life easier:
- **Smart routing**: When you connect with a database name like "sales-lens" in your connection string, Postern knows exactly which Lens instance to send you to
- **Transparent operation**: Once connected, it just passes everything through - you won't even know it's there
- **Connection management**: Handles the backend connection to Lens so you don't have to worry about it
- **Kubernetes-aware**: Automatically adapts when Kubernetes does its pod shuffling magic

**What this means for you:**
Your PowerBI or Tableau just connects using a database name, and Postern figures out all the routing complexity behind the scenes. It's like having GPS for your database connections!

**The only time you might see issues** is during Kubernetes pod restarts (when the platform is updating or scaling), but even then, your client tools will typically just reconnect automatically. It's pretty resilient! 

#### Lens (DataOS Semantic Engine)
This is where the magic happens! Lens is the heart of your DataOS semantic setup - it's the component that actually processes your SQL queries and turns them into meaningful results.

Here's what Lens does for you:
- **Accepts PgWire connections**: It speaks the same language as PostgreSQL, so your favorite tools (PowerBI, Tableau, psql, etc.) just work
- **Processes SQL queries**: Takes your SQL and figures out how to execute it across your data sources
- **Manages sessions**: Keeps track of who's connected and what they're doing
- **Handles authentication**: Works with DataOS security to make sure only authorized users can access data

Lens is distributed across three components that work together:
- **API component**: Handles the incoming connections and authentication
- **Worker**: Does the heavy lifting of query processing 
- **Router**: Figures out how to best execute your queries across data sources

**Timeout Configuration:**
Lens gives you control over two important timeouts that you'll want to tune based on your use case. These environment variables need to be applied to all three Lens components (api, worker, and router):

```yaml
LENS2SQL_QUERY_TIMEOUT: 3600      # 1 hour - perfect for those heavy analytical queries
LENS2SQL_AUTH_EXPIRE_SECS: 86400  # 24 hours - keeps you logged in for the whole workday
```

**Pro tip**: If you're running long analytical queries, you might want to bump up that query timeout. For interactive dashboards, the defaults usually work great!

### PgWire Connection Flow (Port: 6432)

```mermaid
sequenceDiagram
    participant C as PG Client
    participant K as Kong
    participant P as Postern
    participant H as Heimdall
    participant L as Lens
    
    C->>K: TCP SYN (Port: 6432)
    K->>P: TCP Stream Forward
    P->>C: PgWire Protocol Handshake
    C->>P: Authentication Request
    P->>H: Validate Credentials
    H->>P: Auth Response
    P->>L: Establish Backend Connection
    L->>P: Connection Ready
    P->>C: Authentication OK
```

### PgWire Query Execution Flow (Port: 6432)

```mermaid
sequenceDiagram
    participant C as PG Client
    participant P as Postern
    participant L as Lens
    
    C->>P: SQL Query
    P->>L: Forward Query
    L->>L: Parse & Optimize
    L->>L: Execute Query
    L->>P: Result Set
    P->>C: Forward Results
```

## Connection Management & Timeouts
