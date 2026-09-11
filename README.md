
# ⛏️ GoldDigger

GoldDigger is a real-time web application built with Node.js that simulates buying gold commodities. It streams simulated price fluctuations using Server-Sent Events (SSE)


---

## 📽️ Demo Video
From the demo we can see that new data isn't available from the start, this is to simulate the delay that occurs when first joining a stream of data.
[DemoVideo.webm](https://github.com/user-attachments/assets/0445fc5c-9864-4220-ae0b-6cdcd39974fd)

## 🛠️ Tech Stack & Architecture

### Backend
* **Node.js (ES Modules):** Native HTTP server for routing and static file delivery.
* **Server-Sent Events (SSE):** Real-time unidirectional price updates.

### Frontend
* **Vanilla JavaScript (ES6+):** Dynamic UI state manipulation, form dialogs, and dynamic styling.
* **`EventSource` API:** Consumes price streams from the backend.
* **HTML5 & CSS3:** Semantic structure with native `<dialog>` modals and custom CSS variables.

---

## ⚡ How It Works

1. **Price Stream:** The browser opens an `EventSource` connection to `/price-stream`. The server sends a price payload every 2 seconds with simulated market fluctuations.
2. **Transaction Handler:** When a user buys gold, the browser sends a `POST` request to `/save-transaction` containing the transaction details.
3. **Data Persistence:** The server appends the new transaction to `transactions.json`.

---

## 🚀 Running Locally

### Prerequisites
* Node.js (v20.6.0+ recommended)
* npm

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/GoldDigger.git](https://github.com/your-username/GoldDigger.git)
cd GoldDigger

```

### 2. Install dependencies

```bash
npm install

```

### 3. Start Development Mode

Run the server using `nodemon` for auto-reloading during development:

```bash
npm run dev

```

Server running at: `http://localhost:8000`

---

## 📂 Project Structure

```text
.
├── public/                 # Static frontend assets
│   ├── index.html          # Main HTML structure
│   ├── index.js            # Client-side UI logic & EventSource handler
│   └── styles.css          # App styling & responsive design
├── receipts/               # Directory where generated PDF receipts are stored
├── utils/                  # Backend utilities
│   ├── generatePDF.js      # PDFKit receipt generator logic
│   ├── setDataRes.js       # HTTP response content-type helper
│   └── updatePrice.js      # SSE price streaming interval logic
├── server.js               # Node.js HTTP server & routing logic
├── transactions.json       # Persistent storage for purchase logs
└── package.json            # Dependencies & startup scripts

```


