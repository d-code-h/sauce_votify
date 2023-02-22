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
    const patt = /^[0-9]{4}\/(1|2)\/[0-9]{5}(AR|AE)$/;
    if (patt.test(matric)) {
      console.log(matric);
      (async () => {
        try {
          await client.connect();
          const db = client.db(process.env.DBNAME);

          const voter = await db.collection('voters').findOne({ user: matric });
          if (voter !== null && matric !== '2018/1/69686AE') {
            console.log('Seen');
            console.log('I can not see this');

            return res
              .status(400)
              .json({ message: 'User already voted. Thank you!' });
          } else {
            if (matric === '2018/1/69686AE' && voter !== null) {
              console.log('I can see this');
              return res.status(200).json({ matric: matric, post: 'Admin' });
            }
            // if (voter !== null)
            return res.status(200).json({ matric: matric });
          }
        } catch (err) {
          console.log(err);
          console.log('Seen');
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
