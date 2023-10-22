import style from "./IconLoader.module.css";

const IconLoader = () => {
  return (
    <div>
      <div className={style.dotWave}>
        <div className={style.dotWaveDot}></div>
        <div className={style.dotWaveDot}></div>
        <div className={style.dotWaveDot}></div>
        <div className={style.dotWaveDot}></div>
      </div>
    </div>
  );
};

export default IconLoader;
