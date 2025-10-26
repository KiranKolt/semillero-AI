import { useState } from 'react';
import VRScene from '../components/VRScene';

const HomePage = () => {
  const [inVR, setInVR] = useState(false);

  const handleEnterVR = () => {
    setInVR(true);
  };

  if (inVR) {
    return <VRScene />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">Semillero VR</h1>
        <p className="text-2xl mb-12 text-gray-300">Experiencia inmersiva en realidad virtual</p>
        <button
          onClick={handleEnterVR}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🥽 Entrar en VR
        </button>
        <p className="text-gray-400 mt-8 text-sm">
          Compatible con Oculus/Meta Quest
        </p>
      </div>
    </div>
  );
};

export default HomePage;

