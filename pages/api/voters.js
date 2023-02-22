import { MongoClient } from 'mongodb';

const url = process.env.DB_URL;
const client = new MongoClient(url);
const dbName = process.env.DBNAME;

export default function voters(req, res) {
  if (req.method === 'POST') {
    const { votes, user } = req.body;
    console.log(votes, user);
    (async () => {
      try {
        await client.connect();
        const db = client.db(dbName);

        for (let x in votes) {
          await db
            .collection('candidates')
            .updateOne(
              { position: x, matric: votes[x] },
              { $inc: { vote: 1 } }
            );
        }
        await db.collection('voters').insertOne({ user: user });
        return res.status(200).json({ message: 'Success' });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          message: 'Server trying to rest, Please try again soon.',
        });
      }
    })();
  }
}
