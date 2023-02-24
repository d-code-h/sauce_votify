import React, { useState } from 'react';
import { WidgetLoader } from 'react-cloudinary-upload-widget';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Logo from '../public/main-logo-preview.png';
import Sauce from '../public/logo-preview.png';
import Brand from '../public/brand.png';
import Sponsor from '../public/sponsor.png';

import styles from '../styles/candidates.module.css';
// components
import Cloudinary from '../components/Cloudinary';

export default function Candidates() {
  const router = useRouter();
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [nick, setnick] = useState('');
  const [matric, setmatric] = useState('');
  const [faculty, setfaculty] = useState('');
  const [position, setposition] = useState('');
  // const [active, setactive] = useState(false);
  const [error, setError] = useState('');
  const [img, setimg] = useState('');
  const [registered, setregistered] = useState(false);

  const [fn, setfn] = useState(false);
  const [ln, setln] = useState(false);
  const [nn, setnn] = useState(false);
  const [mt, setmt] = useState(false);
  const [submit, setsubmit] = useState(false);
  const handleEvent = (i) => {
    `set${i}`(true);
  };
  const handleBlur = (i) => {
    inputs[i] === '' && `set${i}`(false);
  };
  const inputs = [fname, lname, nick, matric];
  const labels = [setfn, setln, setnn, setmt];
  const handleChange = (i) => {
    inputs[i] === '' && labels[i](false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data['fname'] = fname.trim();
    data['lname'] = lname.trim();
    data['nick'] = nick.trim();
    data['matric'] = matric.trim().toUpperCase();
    data['faculty'] = faculty.trim();
    data['position'] = position.trim();
    data['img'] = img;
    if (
      (data.fname === '' ||
        data.lname === '' ||
        data.nick === '' ||
        data.faculty === '' ||
        data.position === '',
      data.matric === '')
    ) {
      setError('All fields are required');
      setsubmit(false);
      setTimeout(() => {
        setError('');
      }, 3000);
    } else if (data.img === '') {
      setError('Please upload a passport');
      setsubmit(false);
      setTimeout(() => {
        setError('');
      }, 3000);
    } else {
      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const d = await res.json();
      if (res.status === 200) {
        setregistered(true);
      } else {
        setError(d.message);
        setsubmit(false);
        imeout(() => {
          setError('');
        }, 3000);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sauce 500 - Candidate</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/main-logo-preview.png" />
      </Head>
      <WidgetLoader />
      <main className={!registered ? styles.main : styles.main_voted}>
        <div
          className={registered ? styles.overlay_normal : styles.overlay}
        ></div>
        <div className={styles.can_cont}>
          <div>
            <section>
              <div
                className={!registered ? styles.content : styles.content_center}
              >
                <div className={styles.content_hero}>
                  <Image
                    className={
                      registered
                        ? styles.content_hero_img_reg
                        : styles.content_hero_img
                    }
                    src={Logo}
                    width={160}
                    height={150}
                    alt="Sauce"
                  />
                  <h1 className={styles.heading}> AWARD NOMINATION</h1>
                </div>

                {!registered ? (
                  <div className={styles.before_reg}>
                    <Cloudinary img={img} setimg={setimg} />
                    <section className={styles.full__width}>
                      {error !== '' && <p className={styles.error}>{error}</p>}
                      <form
                        className={styles.form}
                        action="/api/register"
                        method="POST"
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <div
                          className={
                            img !== ''
                              ? styles.input_group_first
                              : styles.input_group
                          }
                        >
                          <input
                            className={styles.input}
                            autoComplete="off"
                            name="fname"
                            type="text"
                            required=""
                            value={fname}
                            onChange={(e) => setfname(e.target.value)}
                            onFocus={() => setfn(true)}
                            onBlur={() => handleChange(0)}
                          />
                          <label
                            className={fn ? styles.label_active : styles.label}
                          >
                            First Name
                          </label>
                        </div>
                        <div className={styles.input_group}>
                          <input
                            className={styles.input}
                            autoComplete="off"
                            name="lname"
                            type="text"
                            required=""
                            value={lname}
                            onChange={(e) => setlname(e.target.value)}
                            onFocus={() => setln(true)}
                            onBlur={() => handleChange(1)}
                          />
                          <label
                            className={ln ? styles.label_active : styles.label}
                          >
                            Last Name
                          </label>
                        </div>

                        <div className={styles.input_group}>
                          <input
                            className={styles.input}
                            autoComplete="off"
                            name="nick"
                            type="text"
                            required=""
                            value={nick}
                            onChange={(e) => setnick(e.target.value)}
                            onFocus={() => setnn(true)}
                            onBlur={() => handleChange(2)}
                          />
                          <label
                            className={nn ? styles.label_active : styles.label}
                          >
                            Nickname
                          </label>
                        </div>

                        <div className={styles.position}>
                          <select
                            name="faculty"
                            id="faculty"
                            className={styles.position_select}
                            value={faculty}
                            onChange={(e) => setfaculty(e.target.value)}
                          >
                            <option value="" disabled>
                              Faculty
                            </option>
                            <option value="sict">SICT</option>
                            <option value="saat">SAAT</option>
                            <option value="semt">SEMT</option>
                            <option value="sls">SLS</option>
                            <option value="seet">SEET</option>
                            <option value="sps">SPS</option>
                            <option value="set">SET</option>
                            <option value="sipet">SIPET</option>
                            <option value="sste">SSTE</option>
                          </select>
                        </div>
                        <div className={styles.input_group}>
                          <input
                            className={styles.input}
                            autoComplete="off"
                            name="matric"
                            type="text"
                            required=""
                            value={matric}
                            onChange={(e) => setmatric(e.target.value)}
                            onFocus={() => setmt(true)}
                            onBlur={() => handleChange(3)}
                          />
                          <label
                            className={mt ? styles.label_active : styles.label}
                          >
                            Matric Number
                          </label>
                        </div>
                        <div className={styles.position}>
                          <select
                            name="position"
                            className={styles.position_select}
                            value={position}
                            onChange={(e) => setposition(e.target.value)}
                          >
                            <option value="" disabled>
                              Category
                            </option>
                            <option value="face of 100">face of 100</option>
                            <option value="face of 200">face of 200</option>
                            <option value="face of 300">face of 300</option>
                            <option value="face of 400">face of 400</option>
                            <option value="final year student of the year">
                              final year student of the year
                            </option>
                            <option value="campus face of Gk">
                              campus face of Gk
                            </option>
                            <option value="campus face of bosso">
                              campus face of bosso
                            </option>
                            <option value="face of Semt">face of Semt </option>
                            <option value="face of Saat">face of saat </option>
                            <option value="face of Sste">face of Sste </option>
                            <option value="face of SIpet">
                              face of SIpet{' '}
                            </option>
                            <option value="face of Sps">face of Sps </option>
                            <option value="face of Sls">face of Sls </option>
                            <option value="face of seet">face of seet </option>
                            <option value="face of sict">face of sict</option>
                            <option value="face of Set">face of Set </option>
                            <option value="Sportsman of the year">
                              Sportsman of the year{' '}
                            </option>
                            <option value="cool Calm and Collected">
                              cool Calm and Collected{' '}
                            </option>
                            <option value="Best wardrobe male">
                              Best wardrobe male{' '}
                            </option>
                            <option value="Best wardrobe female">
                              Best wardrobe female{' '}
                            </option>
                            <option value="Model of the year male">
                              Model of the year male{' '}
                            </option>
                            <option value="Model of the Year female">
                              Model of the Year female{' '}
                            </option>
                            <option value="Photographer of the year">
                              Photographer of the year
                            </option>
                            <option value="Entrepreneur of the year">
                              Entrepreneur of the year{' '}
                            </option>
                            <option value="best clique">best clique</option>
                            <option value="sportswoman of the year">
                              sportswoman of the year{' '}
                            </option>
                            <option value="Best couple">Best couple </option>
                            <option value="Hourglass">Hourglass</option>
                            <option value="mr ebony">mr ebony </option>
                            <option value="Miss ebony">Miss ebony </option>
                            <option value="most social">most social </option>
                            <option value="Comedian of the year">
                              Comedian of the year{' '}
                            </option>
                            <option value="Dj of the year">
                              Dj of the year{' '}
                            </option>
                            <option value="Most popular male">
                              Most popular male
                            </option>
                            <option value="Most popular female">
                              Most popular female{' '}
                            </option>
                            <option value="Slim shady">Slim shady </option>
                            <option value="OAP of the year (searchfm )">
                              OAP of the year (searchfm ){' '}
                            </option>
                            <option value="Artist of the year">
                              Artist of the year{' '}
                            </option>
                            <option value="Content creator of the year">
                              Content creator of the year{' '}
                            </option>
                            <option value="Vibrant Statement">
                              Vibrant Statement{' '}
                            </option>
                            <option value="Faculty President of Year (19/20)">
                              Faculty President of Year (19/20){' '}
                            </option>
                            <option value="Most political">
                              Most political{' '}
                            </option>
                            <option value="Mr sauce">Mr sauce </option>
                            <option value="Miss Sauce">Miss Sauce </option>
                            <option value="Scholar of the year">
                              Scholar of the year{' '}
                            </option>
                            <option value="Big Bold and Beautiful">
                              Big Bold and Beautiful{' '}
                            </option>
                            <option value="Graphic designer or the year">
                              Graphic designer or the year
                            </option>
                            <option value="Most expensive">
                              Most expensive{' '}
                            </option>
                            <option value="Techpreneur of the Year">
                              Techpreneur of the Year
                            </option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className={!submit ? styles.btn : styles.btn_click}
                          onClick={() => setsubmit(true)}
                        >
                          {!submit ? 'Register' : 'Loading...'}
                        </button>
                      </form>

                      <div className={styles.sponsored}>
                        <h4>Sponsored By:</h4>
                        <marquee behavior="" direction="">
                          <Image
                            src={Sauce}
                            width={80}
                            height={80}
                            alt="Sauce"
                          />
                          <Image
                            className={styles.spons}
                            src={Brand}
                            width={80}
                            height={80}
                            alt="Sauce"
                          />
                          <Image
                            className={styles.sponsor}
                            src={Sponsor}
                            width={100}
                            height={100}
                            alt="Sauce"
                          />
                        </marquee>
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className={styles.after_reg}>
                    <p>Nomination Successful!</p>
                    <p>Thank you!!!</p>
                    <p className={styles.emoji}>&#128151;</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
