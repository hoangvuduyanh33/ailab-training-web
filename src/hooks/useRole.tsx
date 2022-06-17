import { useState, useEffect } from "react";
import { fetchRole } from "src/utils/services";

export function useRole(username: string) {
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    fetchRole(username).then((data) => {
      setRole(data);
    })
  }, [])
  return role; 
}