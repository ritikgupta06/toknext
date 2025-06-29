import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    console.log("Generating Stream token for user:", req.user.id);
    const token = generateStreamToken(req.user.id);
    
    if (!token) {
      throw new Error("Failed to generate Stream token");
    }

    console.log("Stream token generated successfully");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error.message);
    res.status(500).json({ 
      message: "Failed to generate chat token", 
      error: error.message 
    });
  }
}
