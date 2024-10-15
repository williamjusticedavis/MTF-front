import React, { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import EditSite from './EditSite';
import { fetchAllSites } from '../server/app'; // יבוא הפונקציה שמבצעת את קריאת ה-API
import DeleteSite from './DeleteSite';

interface Site {
  id: string;
  name: string;
  status: string;
  location: string;
  space: string;
  center: string;
  role: string;
  permission: string;
  userStatus: string;
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

  // הצגת טעינה
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
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Status Side</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Location</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Space</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">National Center</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Role</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Permission</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Status User</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id}>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.name}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.status}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.location}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.space}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.center}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.role}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.permission}</td>
              <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.userStatus}</td>
              <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                {<DeleteSite siteId={site.id} onDelete={() => console.log('Deleted', site.id)} />}
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
