import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

let streamClient = null;

// Initialize Stream client only if credentials are available
if (apiKey && apiSecret) {
  streamClient = StreamChat.getInstance(apiKey, apiSecret);
  console.log("Stream Chat client initialized successfully");
} else {
  console.warn("⚠️  Stream API credentials are missing. Chat functionality will be disabled.");
  console.warn("   Please add STREAM_API_KEY and STREAM_API_SECRET to your .env file");
}

export const upsertStreamUser = async (userData) => {
  if (!streamClient) {
    console.warn("Stream client not initialized - skipping user upsert");
    return userData;
  }
  
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};

export const generateStreamToken = (userId) => {
  if (!streamClient) {
    throw new Error("Stream API credentials are not configured. Please add STREAM_API_KEY and STREAM_API_SECRET to your .env file");
  }
  
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};
