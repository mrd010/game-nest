import notFoundImage from '../assets/img/404.jpg';
import bgTemp from '../assets/img/404BgTemplate.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div
      className="bg-repeat h-screen grid place-items-center content-center"
      style={{ backgroundImage: `url(${bgTemp})` }}
    >
      <img src={notFoundImage} alt="Cat says not found" />
      <Link
        to={'/home'}
        className="bg-gray-100 py-4 shadow-md grid text-amber-400 px-6 rounded-full text-xl font-bold font-Lato relative overflow-hidden before:absolute before:size-full before:bg-[#3c2b34] before:top-0 before:left-0 before:-translate-x-full before:rounded-full before:transition-transform hover:before:translate-x-0  before:duration-300 sm:text-lg sm:py-2 sm:px-4"
      >
        <span className="z-10 inline-block">Go Back To Home</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
