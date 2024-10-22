import React, { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import EditSite from './EditSite';
import { fetchAllSites } from '../server/app';
import DeleteSite from './DeleteSite';

interface Site {
  _id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  status: string;
  creationDate: Date;
}

const TableSide: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ניהול מצב טעינה
  const [error, setError] = useState<string | null>(null); // ניהול שגיאות

  useEffect(() => {
    const fetchSites = async () => {
      setLoading(true); // התחלת טעינה
      try {
        const sitesData = await fetchAllSites(); // קריאה לפונקציית API
        if (sitesData.length === 0) {
          setError('No sites found'); // במידה ואין נתונים
        } else {
          setSites(sitesData); // עדכון ה-state עם הנתונים
          setError(null); // אפס את השגיאה
        }
      } catch (err) {
        setError('Error fetching sites'); // טיפול בשגיאה במידה ויש בעיה בבקשה
      } finally {
        setLoading(false); // סיום טעינה בכל מקרה
      }
    };

    fetchSites(); // הפעלת הפונקציה בעת טעינת הקומפוננטה
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <SyncLoader color="#87ab65" margin={6} size={30} />
      </div>
    );
  }

  // הצגת הודעת שגיאה במידה וישנה שגיאה
  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  // הצגת הטבלה עם הנתונים
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Name</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">address</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">coordinates</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">status</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">creation Date</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site._id}>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.name}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.address}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.coordinates}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.status}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                {new Date(site.creationDate).toLocaleDateString()}
              </td>

              <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                {<DeleteSite siteId={site._id} onDelete={() => console.log('Deleted', site._id)} />}
                <EditSite />
              </td>
            </tr>
          ))}
          {sites.length === 0 && (
            <tr>
              <td colSpan={9} className="py-2 px-4 text-center text-xs sm:text-base">
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
