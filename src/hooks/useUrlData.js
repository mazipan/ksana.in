import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";

import { supabase } from "../libs/supabase";

export const useUrlData = async () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const response = Auth.useUser();

  const fetchData = async (u) => {
    if (u && u.id) {
      const { data, error } = await supabase
        .from("urls")
        .select("id,user_id,real_url,slug")
        .eq("user_id", u?.id || 0);

      console.log("url data", data, error);
      setData(data || null);
      setError(error || null);
    }
  };

  useEffect(() => {
    fetchData(response?.user || null);
  }, [response]);

  return { user: response.user || null, data, error };
};
