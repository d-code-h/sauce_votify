import { MongoClient } from 'mongodb';
const url = process.env.DB_URL;
const client = new MongoClient(url);

export default async function handler(req, res) {
  if (
    req.method === 'POST' &&
    req.body.matric !== undefined &&
    req.body.matric !== ''
  ) {
    let matric = req.body.matric.toUpperCase().trim();
    const patt = /^[0-9]{4}\/(1|2)\/[0-9]{5}[A-Z]{2}$/;

    // Close voting pool
    if (patt.test(matric)) {
      if (
        matric !== '2016/1/59660EM' &&
        matric !== '2016/1/58905AE' &&
        matric !== '2016/1/60952CS'
      ) {
        return res
          .status(400)
          .json({ message: 'Sorry.. Voting period exceeeded!' });
      }
      (async () => {
        try {
          await client.connect();
          const db = client.db(process.env.DBNAME);

          const voter = await db.collection('voters').findOne({ user: matric });
          if (
            voter !== null &&
            matric !== '2016/1/59660EM' &&
            matric !== '2016/1/58905AE'
          ) {
            return res
              .status(400)
              .json({ message: 'User already voted. Thank you!' });
          } else {
            if (
              ((matric === '2016/1/59660EM' || matric === '2016/1/58905AE') &&
                voter !== null) ||
              matric === '2016/1/60952CS'
            ) {
              return res.status(200).json({ matric: matric, post: 'Admin' });
            }

            return res.status(200).json({ matric: matric });
          }
        } catch (err) {
          console.log(err);
          return res
            .status(400)
            .json({ message: 'Something went wrong! Please try again.' });
        }
      })();
    } else {
      return res.status(400).json({ message: 'Invalid matric number' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid matric number' });
  }
}
