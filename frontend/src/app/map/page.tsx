import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../../components/MapView'), { ssr: false });

const HomePage = () => {
    return (
        <main>
            <MapView />
        </main>
    );
};

export default HomePage;
