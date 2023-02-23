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
    const patt = /^(2014|2015|2016|2017|2018)\/(1|2)\/[0-9]{5}[A-Z]{2}$/;
    if (patt.test(matric)) {
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
              (matric === '2016/1/59660EM' || matric === '2016/1/58905AE') &&
              voter !== null
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
