import { MongoClient } from 'mongodb';

const url = process.env.DB_URL;
const client = new MongoClient(url);
const dbName = process.env.DBNAME;

export default async function Candidates(req, res) {
  const position =
    req.query.pid === 'Faculty President of Year'
      ? 'Faculty President of Year (19/20)'
      : req.query.pid;
  if (req.method === 'GET') {
    (async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const candidates = await db
          .collection('candidates')
          .find({ position: position })
          .sort({ vote: -1 })
          .toArray();
        if (candidates.length > 0) {
          return res.status(200).json({ candidates });
        } else {
          return res.status(400).json({ message: 'No candidate' });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          message: 'Something went wrong. Please try again later.',
        });
      }
    })();
  }
}
