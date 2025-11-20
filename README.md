# Firebase Studio - CpsSpeedTest

This is a Next.js starter project built in Firebase Studio. It's a feature-rich web application with various skill-based games, a blog, and a leaderboard system powered by Firebase Firestore.

## Running Locally

To run this project on your local machine, please follow these steps.

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) version 20.x or higher installed on your computer.

### 2. Install Dependencies

Navigate to the root directory of the project in your terminal and run the following command to install all the necessary packages:

```bash
npm install
```

### 3. Set Up Environment Variables

The application requires a Firebase Service Account Key to connect to Firestore for the leaderboard functionality.

1.  **Create the file**: In the root directory of the project, create a new file named `.env.local`.

2.  **Add the Firebase Key**: Open the `.env.local` file and add the following line. You will need to replace `YOUR_BASE64_ENCODED_KEY_HERE` with your actual Base64 encoded Firebase service account key.

    ```
    FIREBASE_SERVICE_ACCOUNT_KEY=YOUR_BASE64_ENCODED_KEY_HERE
    ```

    **Important**: The key must be a single, long string of text with no line breaks. If you have the JSON file for your service account, you need to convert its content to a Base64 string first.

### 4. Run the Development Server

Once the dependencies are installed and your environment variable is set, you can start the local development server with this command:

```bash
npm run dev
```

This will start the application, typically on `http://localhost:9002`. Open this URL in your web browser to see the application running.

That's it! The application should now be running locally on your machine.
