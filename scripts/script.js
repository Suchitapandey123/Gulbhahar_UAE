/**
 * Replace image base URL inside images (array of arrays)
 *
 * Usage:
 * 1. Update OLD_BASE and NEW_BASE
 * 2. Run: node replace-image-base-url.js
 */

const { MongoClient } = require("mongodb");

// 🔧 CHANGE THESE
const MONGO_URI = "mongodb://localhost:27017"; // update if needed
const DB_NAME = "testing";
const COLLECTION_NAME = "productv2";

const OLD_BASE = "https://d21ojmskh8ksuv.cloudfront.net";
const NEW_BASE = "https://https://d21ojmskh8ksuv.cloudfront.net";
// const S3_URL = 'https://d21ojmskh8ksuv.cloudfront.net/public/banner-image.jpg';
//         const CF_URL = 'https://https://d21ojmskh8ksuv.cloudfront.net/public/banner-image.jpg';

async function run() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const cursor = collection.find({ images: { $exists: true } });

    let updatedCount = 0;

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      let changed = false;

      const newImages = doc.images.map(group =>
        group.map(url => {
          if (typeof url === "string" && url.startsWith(OLD_BASE)) {
            changed = true;
            return url.replace(OLD_BASE, NEW_BASE);
          }
          return url;
        })
      );

      if (changed) {
        await collection.updateOne(
          { _id: doc._id },
          { $set: { images: newImages } }
        );
        updatedCount++;
      }
    }

    console.log(`🎉 Done. Updated ${updatedCount} documents.`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

run();


