import { Widget } from 'react-cloudinary-upload-widget';
import { BsPlusLg } from 'react-icons/bs';
// components
import Userimg from '../components/Userimg';

// styles
import styles from '../styles/cloudinary.module.css';
export default function Cloudinary({ img, setimg }) {
  // .envs
  const cloudName = process.env.CLOUDNAME;
  const folder = process.env.CLOUDFOLDER;
  const dropbox = process.env.DROPBOX;
  const instagram = process.env.INSTAGRAM;

  // handlers
  const successCallBack = (success) => {
    setimg(success.info.secure_url);
  };
  const failureCallBack = (error) => {
    console.log(error);
  };
  return (
    <Widget
      sources={['local', 'camera', 'dropbox']}
      sourceKeys={{
        dropboxAppKey: dropbox,
        instagramClientId: instagram,
      }}
      resourceType={'image'}
      cloudName={cloudName}
      uploadPreset={'yhxaw4ez'}
      buttonText={
        img === '' ? (
          <div className={styles.img_cont}>
            <BsPlusLg className={styles.upload_icon} />
            <p className={styles.upload}>Upload a Passport</p>
          </div>
        ) : (
          <Userimg img={img} />
        )
      }
      style={{
        color: '#000',
        border: 'none',
        display: 'block',
        width: '150px',
        backgroundColor: '#20202020',
        borderRadius: '4px',
        height: '150px',
        margin: 'auto',
      }}
      folder={folder}
      cropping={false}
      multiple={true}
      autoClose={false}
      onSuccess={(response) => successCallBack(response)}
      onFailure={(error) => failureCallBack(error)}
      logging={false}
      customPublicId={'sample'}
      eager={'w_400,h_300,c_pad|w_260,h_200,c_crop'}
      use_filename={false}
      widgetStyles={{
        palette: {
          window: '#737373',
          windowBorder: '#FFFFFF',
          tabIcon: '#FF9600',
          menuIcons: '#D7D7D8',
          textDark: '#DEDEDE',
          textLight: '#FFFFFF',
          link: '#0078FF',
          action: '#FF620C',
          inactiveTabIcon: '#B3B3B3',
          error: '#F44235',
          inProgress: '#0078FF',
          complete: '#20B832',
          sourceBg: '#909090',
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
            active: true,
          },
        },
      }}
      destroy={true}
    />
  );
}
