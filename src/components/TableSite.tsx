import React, { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import EditSite from './EditSite';
import { fetchAllSites } from '../server/app';

interface Site {
  _id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  creationDate: Date;
  lastUpdated: Date;
}

const TableSide: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      setLoading(true);
      try {
        const sitesData = await fetchAllSites();
        if (sitesData.length === 0) {
          setError('No sites found');
        } else {
          setSites(sitesData);
          setError(null);
        }
      } catch (err) {
        setError('Error fetching sites');
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <SyncLoader color="#87ab65" margin={6} size={30} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Name</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Address</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Coordinates</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Last Updated</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site._id}>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.name}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.address}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                {site.coordinates[1].toFixed(6)}, {site.coordinates[0].toFixed(6)}
              </td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                {new Date(site.lastUpdated).toLocaleString()} 
              </td>
              <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                <EditSite site={site} />
              </td>
            </tr>
          ))}
          {sites.length === 0 && (
            <tr>
              <td colSpan={5} className="py-2 px-4 text-center text-xs sm:text-base">
                No sites found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSide;