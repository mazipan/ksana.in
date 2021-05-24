import { useEffect, useState } from "react";

import { supabase } from "../libs/supabase";

export const useUrlData = (user = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (u) => {
    if (u && u.id) {
      const { data, error } = await supabase
        .from("urls")
        .select("id,user_id,real_url,slug")
        .eq("user_id", u.id);

      setData(data || []);
      setError(error || null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user]);

  return {
    data,
    error,
  };
};
