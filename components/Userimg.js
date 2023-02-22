import Image from 'next/image';
import styles from '../styles/userimg.module.css';

export default function Userimg({ img }) {
  return (
    <div className={styles.img_btn}>
      <Image src={img} alt="The Registrar" width={160} height={160} />
    </div>
  );
}
