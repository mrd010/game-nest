import notFoundImage from '../assets/img/404.jpg';
import bgTemp from '../assets/img/404BgTemplate.png';
import { Link, useNavigation } from 'react-router-dom';

const ErrorPage = () => {
  const { state } = useNavigation();
  return (
    <div
      className="bg-repeat h-screen grid place-items-center content-center"
      style={{ backgroundImage: `url(${bgTemp})` }}
    >
      <img src={notFoundImage} alt="Cat says not found" width={626} height={589} />
      <Link
        to={'/'}
        className={`bg-gray-100 shadow-md grid text-amber-400 py-4 w-52 text-center rounded-full text-xl font-bold font-Lato relative overflow-hidden before:absolute before:size-full before:bg-[#3c2b34] before:top-0 before:left-0 before:-translate-x-full before:rounded-full before:transition-transform   before:duration-300 sm:text-lg ${state === 'idle' ? 'hover:before:translate-x-0' : 'before:translate-x-0'}`}
      >
        {state === 'idle' ? (
          <span className="inline-block h-8 z-10">Go Back To Home</span>
        ) : (
          <div className="mini-loader mx-auto grid h-8 items-center z-10"></div>
        )}
      </Link>
    </div>
  );
};

export default ErrorPage;
