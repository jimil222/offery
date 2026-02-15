# 🏷️ Offery - Intelligent Price Tracker

Offery is a modern, automated price tracking application that helps users monitor product prices across various e-commerce websites. It scrapes product data in real-time and sends email notifications when price drops are detected.

![Offery Dashboard](/placeholder-image.png)

## ✨ Features

- **Real-Time Price Scraping**: Uses **Firecrawl** to extract accurate product details (Name, Price, Image) from URL links.
- **Automated Cron Jobs**: Scheduled background tasks check for price changes periodically.
- **Email Notifications**: Instant alerts via **Resend** when a tracked product's price drops.
- **Price History Visualization**: Interactive charts using **Recharts** to visualize price trends over time.
- **User Authentication**: Secure login and signup powered by **Supabase Auth**.
- **Responsive Design**: Beautiful UI built with **Tailwind CSS** and **Lucide React**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Web Scraping**: [Firecrawl](https://firecrawl.dev/)
- **Email Service**: [Resend](https://resend.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Lucide Icons
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed
- A Supabase project
- API Keys for Firecrawl and Resend

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jimil222/offery.git
    cd offery
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following:

    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

    # Firecrawl (Scraping)
    FIRECRAWL_API_KEY=your_firecrawl_api_key

    # Resend (Emails)
    RESEND_API_KEY=your_resend_api_key
    RESEND_FROM_EMAIL=onboarding@resend.dev # or your verified domain

    # App Config
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    CRON_SECRET=your_custom_cron_secert
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔄 Cron Job Setup (for Price Checks)

To automate price checks, you can use **Supabase Cron Integrations** or the `pg_cron` extension:

1.  Go to your **Supabase Dashboard** -> **Integrations**.
2.  Enable **Cron** (or use the SQL editor).
3.  Create a new job:
    - **Schedule**: `0 * * * *` (Every hour)
    - **HTTP Method**: `POST`
    - **URL**: `https://your-project.vercel.app/api/cron/check-prices`
    - **HTTP Headers**:
      ```json
      {
        "Authorization": "Bearer <YOUR_CRON_SECRET>"
      }
      ```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
