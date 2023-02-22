import { MongoClient } from 'mongodb';

const url = process.env.DB_URL;
const client = new MongoClient(url);
const dbName = process.env.DBNAME;

export default async function Candidates(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    data['vote'] = 0;
    const { fname, lname, nick, matric, level, position, img } = data;

    // Pattern
    const string = /^[a-zA-Z]+$/;
    const matricPattern = /^[0-9]{4}\/(1|2)\/[0-9]{5}(AR|AE)$/;
    const numPat = /^[0-9]{3}$/;

    if (
      !string.test(fname) ||
      !string.test(lname) ||
      nick === '' ||
      position === ''
    ) {
      // Return error
      return res.status(400).json({ message: 'All fields are required' });
    } else if (!matricPattern.test(matric)) {
      // Return error
      return res.status(400).json({ message: 'Invalid matric number' });
    } else {
      (async () => {
        console.log('Na her!de');

        try {
          await client.connect();
          const db = client.db(dbName);
          const exist = await db
            .collection('candidates')
            .findOne({ matric: matric, position: position });
          if (exist) {
            return res.status(400).json({
              message: 'You are already nominated for this position!',
            });
          }
          await db.collection('candidates').insertOne(data);
          // Redirect to dashboard
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
}
